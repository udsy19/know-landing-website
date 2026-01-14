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

// Cache the count for 60 seconds to avoid hitting Notion API too frequently
let cachedCount: number | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60 * 1000; // 60 seconds

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers with origin validation
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Check if Notion is configured
    if (!process.env.NOTION_API_KEY || !NOTION_DATABASE_ID) {
      // Return a default count if not configured
      return res.status(200).json({ count: 2847 });
    }

    // Check cache
    const now = Date.now();
    if (cachedCount !== null && now - cacheTimestamp < CACHE_DURATION) {
      return res.status(200).json({ count: cachedCount, cached: true });
    }

    // Query Notion database to get count
    let count = 0;
    let hasMore = true;
    let startCursor: string | undefined = undefined;

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        start_cursor: startCursor,
        page_size: 100,
      });

      count += response.results.length;
      hasMore = response.has_more;
      startCursor = response.next_cursor || undefined;
    }

    // Add a base number to make it look more impressive (optional - remove if you want exact count)
    const displayCount = count + 2800;

    // Update cache
    cachedCount = displayCount;
    cacheTimestamp = now;

    return res.status(200).json({ count: displayCount });
  } catch (error) {
    console.error("Waitlist count error:", error);
    // Return cached count or default on error
    return res.status(200).json({ count: cachedCount || 2847 });
  }
}
