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
  "http://localhost:3000",
];

interface WaitlistEntry {
  email: string;
  name: string;
  company: string;
  linkedin?: string;
  reason: string;
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
    const parsed = new URL(url);
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

    const { email, name, company, linkedin, reason } = req.body as WaitlistEntry;

    // Validate and sanitize required fields
    const sanitizedEmail = sanitizeString(email, 254).toLowerCase();
    const sanitizedName = sanitizeString(name, 100);
    const sanitizedCompany = sanitizeString(company, 200);
    const sanitizedLinkedin = linkedin ? sanitizeString(linkedin, 200) : undefined;
    const sanitizedReason = sanitizeString(reason, 1000);

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
      return res.status(400).json({ error: "Please tell us why you want to try [know]" });
    }
    if (sanitizedLinkedin && !isValidLinkedInUrl(sanitizedLinkedin)) {
      return res.status(400).json({ error: "Please provide a valid LinkedIn URL" });
    }

    // Check if Notion is configured
    if (!process.env.NOTION_API_KEY || !NOTION_DATABASE_ID) {
      console.error("Notion not configured");
      return res.status(500).json({ error: "Service not configured" });
    }

    const entry: WaitlistEntry = {
      email: sanitizedEmail,
      name: sanitizedName,
      company: sanitizedCompany,
      linkedin: sanitizedLinkedin,
      reason: sanitizedReason,
    };

    await storeInNotion(entry);

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

async function storeInNotion(entry: WaitlistEntry) {
  const timestamp = new Date().toISOString();

  await notion.pages.create({
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
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
    },
  });
}
