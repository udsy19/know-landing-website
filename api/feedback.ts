import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const NOTION_FEEDBACK_DATABASE_ID = process.env.NOTION_FEEDBACK_DATABASE_ID!;

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://useknow.io",
  "https://www.useknow.io",
  "https://know-silk.vercel.app",
  "http://localhost:5173",
  "http://localhost:5175",
  "http://localhost:3000",
];

interface FeedbackEntry {
  name: string;
  email: string;
  type: string;
  message: string;
}

// Sanitize string input to prevent injection attacks
function sanitizeString(input: string, maxLength: number = 500): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ""); // Remove potential HTML tags
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers with origin validation
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const { name, email, type, message } = req.body as FeedbackEntry;

    // Validate and sanitize
    const sanitizedName = sanitizeString(name, 100);
    const sanitizedEmail = sanitizeString(email, 254).toLowerCase();
    const sanitizedType = sanitizeString(type, 50);
    const sanitizedMessage = sanitizeString(message, 2000);

    if (!sanitizedName || sanitizedName.length < 2) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    if (!sanitizedMessage || sanitizedMessage.length < 10) {
      return res.status(400).json({ error: "Please write a bit more (at least 10 characters)" });
    }

    // Check if Notion is configured
    if (!process.env.NOTION_API_KEY || !NOTION_FEEDBACK_DATABASE_ID) {
      console.error("Notion feedback database not configured");
      return res.status(500).json({ error: "Service not configured" });
    }

    // Get IP address
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
      || req.headers["x-real-ip"] as string
      || "unknown";

    await storeInNotion({
      name: sanitizedName,
      email: sanitizedEmail,
      type: sanitizedType,
      message: sanitizedMessage,
    }, ip);

    return res.status(200).json({
      success: true,
      message: "Thanks for your feedback!",
    });
  } catch (error) {
    console.error("Feedback error:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}

async function storeInNotion(entry: FeedbackEntry, ip: string) {
  const timestamp = new Date().toISOString();

  await notion.pages.create({
    parent: { database_id: NOTION_FEEDBACK_DATABASE_ID },
    properties: {
      Name: {
        title: [{ text: { content: entry.name } }],
      },
      Email: {
        rich_text: [{ text: { content: entry.email } }],
      },
      Type: {
        select: { name: entry.type || "Feedback" },
      },
      Message: {
        rich_text: [{ text: { content: entry.message } }],
      },
      "Submitted": {
        date: { start: timestamp },
      },
      "IP Address": {
        rich_text: [{ text: { content: ip } }],
      },
    },
  });
}
