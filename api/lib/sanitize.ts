/**
 * Shared sanitization and validation utilities for API endpoints.
 */

/** Sanitize a string input: trim, truncate, strip dangerous characters. */
export function sanitizeString(input: unknown, maxLength: number = 500): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .slice(0, maxLength)
    // Strip HTML tags and common XSS vectors
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "");
}

/**
 * RFC 5321–compatible email validation.
 * Checks structure, length limits, and TLD presence.
 */
export function isValidEmail(email: string): boolean {
  if (email.length > 254) return false;
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.length > 64) return false;
  if (!domain || domain.length > 253) return false;
  // Domain must have at least one dot and valid chars
  if (!/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(domain)) return false;
  // Local part: allow common characters
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false;
  return true;
}

/** In-memory rate limiter keyed by IP. */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

/**
 * Check rate limit for a given key (usually IP address).
 * Returns true if the request should be BLOCKED.
 */
export function isRateLimited(
  key: string,
  maxRequests: number = 10,
  windowMs: number = 60_000,
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count++;
  if (entry.count > maxRequests) return true;
  return false;
}

/** Get client IP from Vercel request headers. */
export function getClientIp(headers: Record<string, string | string[] | undefined>): string {
  const forwarded = headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  const realIp = headers["x-real-ip"];
  if (typeof realIp === "string") return realIp;
  return "unknown";
}
