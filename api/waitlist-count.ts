import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isRateLimited, getClientIp } from "./lib/sanitize";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

const ALLOWED_ORIGINS = [
  "https://useknow.io",
  "https://www.useknow.io",
  "https://know-silk.vercel.app",
  "http://localhost:5173",
  "http://localhost:5175",
  "http://localhost:3000",
];

// Cache the count for 60 seconds
let cachedCount: number | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60_000;

interface NotionQueryResponse {
  results: unknown[];
  has_more: boolean;
  next_cursor: string | null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  // Rate limiting: 30 reads per minute per IP
  const ip = getClientIp(req.headers as Record<string, string | string[] | undefined>);
  if (isRateLimited(ip, 30, 60_000)) {
    return res.status(429).json({ error: "Too many requests" });
  }

  try {
    if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
      return res.status(200).json({ count: 0 });
    }

    // Check cache
    const now = Date.now();
    if (cachedCount !== null && now - cacheTimestamp < CACHE_DURATION) {
      return res.status(200).json({ count: cachedCount, cached: true });
    }

    // Query Notion for actual count
    let count = 0;
    let hasMore = true;
    let startCursor: string | undefined = undefined;

    while (hasMore) {
      const body: { page_size: number; start_cursor?: string } = { page_size: 100 };
      if (startCursor) body.start_cursor = startCursor;

      const response = await fetch(
        `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${NOTION_API_KEY}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) throw new Error(`Notion API error: ${response.status}`);

      const data: NotionQueryResponse = await response.json();
      count += data.results.length;
      hasMore = data.has_more;
      startCursor = data.next_cursor || undefined;
    }

    // Update cache with real count
    cachedCount = count;
    cacheTimestamp = now;

    return res.status(200).json({ count });
  } catch (error) {
    console.error("Waitlist count error:", error);
    return res.status(200).json({ count: cachedCount || 0 });
  }
}
