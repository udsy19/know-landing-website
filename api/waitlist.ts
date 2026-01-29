import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!;

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://useknow.io",
  "https://www.useknow.io",
  "https://know-silk.vercel.app",
  "http://localhost:5173",
  "http://localhost:5175",
  "http://localhost:3000",
];

interface WaitlistEntry {
  email: string;
  name: string;
  company: string;
  linkedin?: string;
  reason: string;
  // Browser fingerprint data
  userAgent?: string;
  language?: string;
  platform?: string;
  screenResolution?: string;
  timezone?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

// Sanitize string input to prevent injection attacks
function sanitizeString(input: string, maxLength: number = 500): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ""); // Remove potential HTML tags
}

// Validate LinkedIn URL format
function isValidLinkedInUrl(url: string): boolean {
  if (!url) return true; // Optional field
  try {
    // Auto-prepend https:// if no protocol is provided
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = "https://" + normalizedUrl;
    }
    const parsed = new URL(normalizedUrl);
    return parsed.hostname === "linkedin.com" || parsed.hostname === "www.linkedin.com";
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers with origin validation
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400"); // Cache preflight for 24 hours

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Ensure request body exists and is valid JSON
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const {
      email,
      name,
      company,
      linkedin,
      reason,
      userAgent,
      language,
      platform,
      screenResolution,
      timezone,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
    } = req.body as WaitlistEntry;

    // Validate and sanitize required fields
    const sanitizedEmail = sanitizeString(email, 254).toLowerCase();
    const sanitizedName = sanitizeString(name, 100);
    const sanitizedCompany = sanitizeString(company, 200);
    // Normalize LinkedIn URL - add https:// if missing
    let sanitizedLinkedin = linkedin ? sanitizeString(linkedin, 200) : undefined;
    if (sanitizedLinkedin && !sanitizedLinkedin.startsWith("http://") && !sanitizedLinkedin.startsWith("https://")) {
      sanitizedLinkedin = "https://" + sanitizedLinkedin;
    }
    const sanitizedReason = sanitizeString(reason, 1000);

    // Sanitize fingerprint data
    const sanitizedUserAgent = sanitizeString(userAgent || "", 500);
    const sanitizedLanguage = sanitizeString(language || "", 20);
    const sanitizedPlatform = sanitizeString(platform || "", 50);
    const sanitizedScreenResolution = sanitizeString(screenResolution || "", 20);
    const sanitizedTimezone = sanitizeString(timezone || "", 50);
    const sanitizedReferrer = sanitizeString(referrer || "", 500);
    const sanitizedUtmSource = sanitizeString(utmSource || "", 100);
    const sanitizedUtmMedium = sanitizeString(utmMedium || "", 100);
    const sanitizedUtmCampaign = sanitizeString(utmCampaign || "", 100);

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
    // LinkedIn is optional - if invalid, just ignore it instead of erroring
    const finalLinkedin = sanitizedLinkedin && isValidLinkedInUrl(sanitizedLinkedin)
      ? sanitizedLinkedin
      : undefined;

    // Check if Notion is configured
    if (!process.env.NOTION_API_KEY || !NOTION_DATABASE_ID) {
      console.error("Notion not configured");
      return res.status(500).json({ error: "Service not configured" });
    }

    // Get IP address from request headers
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
      || req.headers["x-real-ip"] as string
      || "unknown";

    const entry: WaitlistEntry = {
      email: sanitizedEmail,
      name: sanitizedName,
      company: sanitizedCompany,
      linkedin: finalLinkedin,
      reason: sanitizedReason,
      userAgent: sanitizedUserAgent,
      language: sanitizedLanguage,
      platform: sanitizedPlatform,
      screenResolution: sanitizedScreenResolution,
      timezone: sanitizedTimezone,
      referrer: sanitizedReferrer,
      utmSource: sanitizedUtmSource,
      utmMedium: sanitizedUtmMedium,
      utmCampaign: sanitizedUtmCampaign,
    };

    await storeInNotion(entry, ip);

    return res.status(200).json({
      success: true,
      message: "You're on the list!",
    });
  } catch (error) {
    console.error("Waitlist error:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function storeInNotion(entry: WaitlistEntry, ip: string) {
  const timestamp = new Date().toISOString();

  // Base properties (required columns)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const properties: any = {
    Name: {
      title: [{ text: { content: entry.name } }],
    },
    Email: {
      rich_text: [{ text: { content: entry.email } }],
    },
    Company: {
      rich_text: [{ text: { content: entry.company } }],
    },
    LinkedIn: {
      url: entry.linkedin || null,
    },
    Reason: {
      rich_text: [{ text: { content: entry.reason } }],
    },
    "Sign Up": {
      date: { start: timestamp },
    },
  };

  // Try to add fingerprint data - these columns are optional
  // If they don't exist in Notion, the API will ignore them
  try {
    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        ...properties,
        "User Agent": { rich_text: [{ text: { content: entry.userAgent || "" } }] },
        "Language": { rich_text: [{ text: { content: entry.language || "" } }] },
        "Platform": { rich_text: [{ text: { content: entry.platform || "" } }] },
        "Screen": { rich_text: [{ text: { content: entry.screenResolution || "" } }] },
        "Timezone": { rich_text: [{ text: { content: entry.timezone || "" } }] },
        "Referrer": { rich_text: [{ text: { content: entry.referrer || "" } }] },
        "UTM Source": { rich_text: [{ text: { content: entry.utmSource || "" } }] },
        "UTM Medium": { rich_text: [{ text: { content: entry.utmMedium || "" } }] },
        "UTM Campaign": { rich_text: [{ text: { content: entry.utmCampaign || "" } }] },
        "IP Address": { rich_text: [{ text: { content: ip } }] },
      },
    });
  } catch (error) {
    // If fingerprint columns fail, try with just base properties
    console.log("Fingerprint columns may not exist, trying base properties only");
    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties,
    });
  }
}
