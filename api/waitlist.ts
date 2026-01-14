import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";
import { Client } from "@notionhq/client";

// Initialize Notion client (optional - will skip if not configured)
const notion = process.env.NOTION_API_KEY
  ? new Client({ auth: process.env.NOTION_API_KEY })
  : null;

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

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

  // Only allow POST
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

    const entry: WaitlistEntry = {
      email: email.toLowerCase().trim(),
      name: name.trim(),
      company: company.trim(),
      linkedin: linkedin?.trim() || undefined,
      reason: reason.trim(),
    };

    const timestamp = new Date().toISOString();

    // Store in Postgres (required) and Notion (optional)
    const tasks: Promise<void>[] = [storeInPostgres(entry, timestamp)];

    // Only add Notion if configured
    if (notion && NOTION_DATABASE_ID) {
      tasks.push(storeInNotion(entry, timestamp));
    }

    const results = await Promise.allSettled(tasks);

    // Check Postgres result (required)
    const postgresResult = results[0];
    if (postgresResult.status === "rejected") {
      console.error("Postgres error:", postgresResult.reason);
      return res.status(500).json({ error: "Failed to save your submission. Please try again." });
    }

    // Log Notion error if it failed (but don't fail the request)
    if (results[1]?.status === "rejected") {
      console.error("Notion error (non-fatal):", (results[1] as PromiseRejectedResult).reason);
    }

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

async function storeInPostgres(entry: WaitlistEntry, timestamp: string) {
  // Create table if not exists
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      linkedin VARCHAR(500),
      reason TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Insert (ignore if duplicate email)
  await sql`
    INSERT INTO waitlist (email, name, company, linkedin, reason, created_at)
    VALUES (${entry.email}, ${entry.name}, ${entry.company}, ${entry.linkedin || null}, ${entry.reason}, ${timestamp})
    ON CONFLICT (email) DO UPDATE SET
      name = ${entry.name},
      company = ${entry.company},
      linkedin = ${entry.linkedin || null},
      reason = ${entry.reason}
  `;
}

async function storeInNotion(entry: WaitlistEntry, timestamp: string) {
  if (!notion || !NOTION_DATABASE_ID) {
    throw new Error("Notion not configured");
  }

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
      "Work Status": {
        status: { name: "Not started" },
      },
    },
  });
}
