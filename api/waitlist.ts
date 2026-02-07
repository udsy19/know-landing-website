import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Client } from "@notionhq/client";
import { sanitizeString, isValidEmail, isRateLimited, getClientIp } from "./lib/sanitize";
import { setCorsHeaders } from "./lib/cors";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!;

interface WaitlistEntry {
  email: string;
  name: string;
  company: string;
  linkedin?: string;
  reason: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

function isValidLinkedInUrl(url: string): boolean {
  if (!url) return true;
  try {
    let normalized = url.trim();
    if (!normalized.startsWith("https://") && !normalized.startsWith("http://")) {
      normalized = "https://" + normalized;
    }
    const parsed = new URL(normalized);
    // Only allow HTTPS LinkedIn URLs
    if (parsed.protocol !== "https:") return false;
    return parsed.hostname === "linkedin.com" || parsed.hostname === "www.linkedin.com";
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  setCorsHeaders(req.headers.origin, res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Rate limiting: 5 submissions per minute per IP
  const ip = getClientIp(req.headers as Record<string, string | string[] | undefined>);
  if (isRateLimited(ip, 5, 60_000)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const body = req.body as Record<string, unknown>;

    const sanitizedEmail = sanitizeString(body.email, 254).toLowerCase();
    const sanitizedName = sanitizeString(body.name, 100);
    const sanitizedCompany = sanitizeString(body.company, 200);
    const sanitizedReason = sanitizeString(body.reason, 1000);
    let sanitizedLinkedin = body.linkedin ? sanitizeString(body.linkedin, 200) : undefined;
    if (sanitizedLinkedin && !sanitizedLinkedin.startsWith("http://") && !sanitizedLinkedin.startsWith("https://")) {
      sanitizedLinkedin = "https://" + sanitizedLinkedin;
    }

    // Validate
    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    if (!sanitizedName || sanitizedName.length < 2) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!sanitizedCompany || sanitizedCompany.length < 1) {
      return res.status(400).json({ error: "Company is required" });
    }
    if (!sanitizedReason || sanitizedReason.length < 10) {
      return res.status(400).json({ error: "Please write a bit more (at least 10 characters)" });
    }

    const finalLinkedin = sanitizedLinkedin && isValidLinkedInUrl(sanitizedLinkedin)
      ? sanitizedLinkedin
      : undefined;

    if (!process.env.NOTION_API_KEY || !NOTION_DATABASE_ID) {
      console.error("Notion not configured");
      return res.status(500).json({ error: "Service not configured" });
    }

    const entry: WaitlistEntry = {
      email: sanitizedEmail,
      name: sanitizedName,
      company: sanitizedCompany,
      linkedin: finalLinkedin,
      reason: sanitizedReason,
      referrer: sanitizeString(body.referrer, 500),
      utmSource: sanitizeString(body.utmSource, 100),
      utmMedium: sanitizeString(body.utmMedium, 100),
      utmCampaign: sanitizeString(body.utmCampaign, 100),
    };

    await storeInNotion(entry, ip);

    return res.status(200).json({ success: true, message: "You're on the list!" });
  } catch (error) {
    console.error("Waitlist error:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}

async function storeInNotion(entry: WaitlistEntry, ip: string) {
  const timestamp = new Date().toISOString();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const properties: any = {
    Name: { title: [{ text: { content: entry.name } }] },
    Email: { rich_text: [{ text: { content: entry.email } }] },
    Company: { rich_text: [{ text: { content: entry.company } }] },
    LinkedIn: { url: entry.linkedin || null },
    Reason: { rich_text: [{ text: { content: entry.reason } }] },
    "Sign Up": { date: { start: timestamp } },
  };

  try {
    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        ...properties,
        "Referrer": { rich_text: [{ text: { content: entry.referrer || "" } }] },
        "UTM Source": { rich_text: [{ text: { content: entry.utmSource || "" } }] },
        "UTM Medium": { rich_text: [{ text: { content: entry.utmMedium || "" } }] },
        "UTM Campaign": { rich_text: [{ text: { content: entry.utmCampaign || "" } }] },
        "IP Address": { rich_text: [{ text: { content: ip } }] },
      },
    });
  } catch {
    // Fallback if extra columns don't exist
    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties,
    });
  }
}
