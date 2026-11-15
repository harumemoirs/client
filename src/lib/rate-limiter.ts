import { neon } from "@neondatabase/serverless";

const RATE_LIMIT_WINDOW_SECONDS = 15 * 60; // 15 minutes
const MAX_REQUESTS = 5;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime?: Date;
  retryAfter?: number; // seconds until next request allowed
}

/**
 * Check if an IP address has exceeded the rate limit using Neon PostgreSQL
 * @param ip - Client IP address
 * @param identifier - Unique identifier for the endpoint (e.g., 'contact', 'newsletter')
 * @param databaseUrl - Optional PostgreSQL connection URL
 * @returns RateLimitResult indicating if request is allowed
 */
export async function checkRateLimit(
  ip: string,
  identifier: string,
  databaseUrl?: string
): Promise<RateLimitResult> {
  const dbUrl = databaseUrl || process.env.DATABASE_URL;
  if (!dbUrl) {
    // Fail open if no database URL configured
    return { allowed: true, remaining: MAX_REQUESTS };
  }

  try {
    const sql = neon(dbUrl);
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_SECONDS * 1000);

    // Clean up expired entries for this IP & identifier
    await sql`
      DELETE FROM rate_limits 
      WHERE ip = ${ip} AND identifier = ${identifier} AND created_at < ${windowStart};
    `;

    // Count requests in current window
    const countResult = await sql`
      SELECT COUNT(*)::int as count, MIN(created_at) as oldest 
      FROM rate_limits 
      WHERE ip = ${ip} AND identifier = ${identifier} AND created_at >= ${windowStart};
    `;

    const requestCount = countResult[0]?.count || 0;
    const oldestTimestamp = countResult[0]?.oldest ? new Date(countResult[0].oldest) : null;

    if (requestCount >= MAX_REQUESTS) {
      console.log(`[Rate Limit] BLOCKED - IP: ${ip}, Identifier: ${identifier}, Count: ${requestCount}/${MAX_REQUESTS}`);
      const resetTime = oldestTimestamp
        ? new Date(oldestTimestamp.getTime() + RATE_LIMIT_WINDOW_SECONDS * 1000)
        : new Date(Date.now() + RATE_LIMIT_WINDOW_SECONDS * 1000);
      const retryAfter = Math.max(1, Math.ceil((resetTime.getTime() - Date.now()) / 1000));

      return {
        allowed: false,
        remaining: 0,
        resetTime,
        retryAfter,
      };
    }

    console.log(`[Rate Limit] ALLOWED - IP: ${ip}, Identifier: ${identifier}, Count: ${requestCount}/${MAX_REQUESTS}`);

    // Record this request
    await sql`
      INSERT INTO rate_limits (ip, identifier) 
      VALUES (${ip}, ${identifier});
    `;

    return {
      allowed: true,
      remaining: MAX_REQUESTS - requestCount - 1,
    };
  } catch (error) {
    console.error("Rate limit check error:", error);
    // On error, allow the request (fail open)
    return {
      allowed: true,
      remaining: MAX_REQUESTS,
    };
  }
}

/**
 * Get the client IP address from the request
 * @param request - Next.js Request object
 * @returns Client IP address
 */
export function getClientIp(request: Request): string {
  const headers = request.headers;
  
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  return "unknown";
}
