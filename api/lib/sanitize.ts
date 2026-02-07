/**
 * Shared sanitization and validation utilities for API endpoints.
 */

/** Sanitize a string input: trim, truncate, strip dangerous characters. */
export function sanitizeString(input: unknown, maxLength: number = 500): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .slice(0, maxLength)
    // Decode HTML entities that could bypass tag stripping
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    // Strip HTML/SVG tags
    .replace(/<\/?[a-z][^>]*>/gi, "")
    // Strip dangerous URL schemes
    .replace(/javascript\s*:/gi, "")
    .replace(/vbscript\s*:/gi, "")
    .replace(/data\s*:[^,]*,/gi, "")
    // Strip event handlers (on* attributes)
    .replace(/\bon\w+\s*=\s*["'`]?[^"'`>]*/gi, "");
}

/**
 * RFC 5321-compatible email validation.
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

/** Maximum number of tracked IPs to prevent unbounded memory growth. */
const MAX_RATE_LIMIT_ENTRIES = 10_000;

/** In-memory rate limiter keyed by IP with automatic cleanup. */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

/** Periodically clean up expired entries to prevent memory leaks. */
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}

// Run cleanup every 5 minutes in long-running environments
let cleanupInterval: ReturnType<typeof setInterval> | null = null;
if (typeof setInterval !== "undefined" && !cleanupInterval) {
  cleanupInterval = setInterval(cleanupExpiredEntries, 5 * 60_000);
  // Don't prevent process from exiting
  if (cleanupInterval && typeof cleanupInterval === "object" && "unref" in cleanupInterval) {
    cleanupInterval.unref();
  }
}

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
    // Evict oldest entries if map is too large
    if (rateLimitMap.size >= MAX_RATE_LIMIT_ENTRIES) {
      cleanupExpiredEntries();
      // If still too large after cleanup, remove oldest entries
      if (rateLimitMap.size >= MAX_RATE_LIMIT_ENTRIES) {
        const keysToDelete = Array.from(rateLimitMap.keys()).slice(0, 1000);
        for (const k of keysToDelete) rateLimitMap.delete(k);
      }
    }
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
