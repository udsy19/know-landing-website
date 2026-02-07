import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Client } from "@notionhq/client";
import { sanitizeString, isValidEmail, isRateLimited, getClientIp } from "./lib/sanitize.js";
import { setCorsHeaders } from "./lib/cors.js";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const NOTION_FEEDBACK_DATABASE_ID = process.env.NOTION_FEEDBACK_DATABASE_ID!;

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

    const sanitizedName = sanitizeString(body.name, 100);
    const sanitizedEmail = sanitizeString(body.email, 254).toLowerCase();
    const sanitizedType = sanitizeString(body.type, 50);
    const sanitizedMessage = sanitizeString(body.message, 2000);

    if (!sanitizedName || sanitizedName.length < 2) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    if (!sanitizedMessage || sanitizedMessage.length < 10) {
      return res.status(400).json({ error: "Please write a bit more (at least 10 characters)" });
    }

    if (!process.env.NOTION_API_KEY || !NOTION_FEEDBACK_DATABASE_ID) {
      console.error("Notion feedback database not configured");
      return res.status(500).json({ error: "Service not configured" });
    }

    const timestamp = new Date().toISOString();

    await notion.pages.create({
      parent: { database_id: NOTION_FEEDBACK_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: sanitizedName } }] },
        Email: { rich_text: [{ text: { content: sanitizedEmail } }] },
        Type: { select: { name: sanitizedType || "Feedback" } },
        Message: { rich_text: [{ text: { content: sanitizedMessage } }] },
        "Submitted": { date: { start: timestamp } },
        "IP Address": { rich_text: [{ text: { content: ip } }] },
      },
    });

    return res.status(200).json({ success: true, message: "Thanks for your feedback!" });
  } catch (error) {
    console.error("Feedback error:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
