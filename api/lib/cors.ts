/**
 * Centralized CORS configuration for all API endpoints.
 * In production, only production origins are allowed.
 * In development, localhost origins are also allowed.
 */

const PRODUCTION_ORIGINS = [
  "https://useknow.io",
  "https://www.useknow.io",
  "https://know-silk.vercel.app",
];

const DEV_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5175",
  "http://localhost:3000",
];

const isDev = process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "development";

export const ALLOWED_ORIGINS = isDev
  ? [...PRODUCTION_ORIGINS, ...DEV_ORIGINS]
  : PRODUCTION_ORIGINS;

/** Set CORS headers on a Vercel response. */
export function setCorsHeaders(
  origin: string | undefined,
  res: { setHeader: (key: string, value: string) => void },
  methods: string = "POST, OPTIONS",
) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", methods);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
}
