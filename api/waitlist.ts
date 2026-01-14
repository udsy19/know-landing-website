import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!;

interface WaitlistEntry {
  email: string;
  name: string;
  company: string;
  linkedin?: string;
  reason: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, name, company, linkedin, reason } = req.body as WaitlistEntry;

    // Validate required fields
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!company || company.trim().length < 1) {
      return res.status(400).json({ error: "Company is required" });
    }
    if (!reason || reason.trim().length < 10) {
      return res.status(400).json({ error: "Please tell us why you want to try [know]" });
    }

    // Check if Notion is configured
    if (!process.env.NOTION_API_KEY || !NOTION_DATABASE_ID) {
      console.error("Notion not configured");
      return res.status(500).json({ error: "Service not configured" });
    }

    const entry: WaitlistEntry = {
      email: email.toLowerCase().trim(),
      name: name.trim(),
      company: company.trim(),
      linkedin: linkedin?.trim() || undefined,
      reason: reason.trim(),
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
