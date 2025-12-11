import { MongoClient } from "mongodb";

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds
const MAX_REQUESTS = 5;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime?: Date;
  retryAfter?: number; // seconds until next request allowed
}

/**
 * Check if an IP address has exceeded the rate limit
 * @param ip - Client IP address
 * @param identifier - Unique identifier for the endpoint (e.g., 'contact', 'newsletter')
 * @param mongoClient - MongoDB client instance
 * @returns RateLimitResult indicating if request is allowed
 */
export async function checkRateLimit(
  ip: string,
  identifier: string,
  mongoClient: MongoClient
): Promise<RateLimitResult> {
  try {
    await mongoClient.connect();
    const db = mongoClient.db("rate_limiting");
    const collection = db.collection("requests");

    const now = new Date();
    const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW);

    // Clean up old entries for this IP and identifier
    await collection.deleteMany({
      ip,
      identifier,
      timestamp: { $lt: windowStart },
    });

    // Count requests in current window
    const requestCount = await collection.countDocuments({
      ip,
      identifier,
      timestamp: { $gte: windowStart },
    });

    if (requestCount >= MAX_REQUESTS) {
      console.log(`[Rate Limit] BLOCKED - IP: ${ip}, Identifier: ${identifier}, Count: ${requestCount}/${MAX_REQUESTS}`);
      
      // Find the oldest request to calculate when the limit resets
      const oldestRequest = await collection
        .find({ ip, identifier })
        .sort({ timestamp: 1 })
        .limit(1)
        .toArray();

      if (oldestRequest.length > 0) {
        const resetTime = new Date(
          oldestRequest[0].timestamp.getTime() + RATE_LIMIT_WINDOW
        );
        const retryAfter = Math.ceil(
          (resetTime.getTime() - now.getTime()) / 1000
        );

        return {
          allowed: false,
          remaining: 0,
          resetTime,
          retryAfter,
        };
      }

      return {
        allowed: false,
        remaining: 0,
      };
    }

    console.log(`[Rate Limit] ALLOWED - IP: ${ip}, Identifier: ${identifier}, Count: ${requestCount}/${MAX_REQUESTS}, Remaining: ${MAX_REQUESTS - requestCount - 1}`);

    // Record this request
    await collection.insertOne({
      ip,
      identifier,
      timestamp: now,
    });

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
  // Check various headers that might contain the real IP
  const headers = request.headers;
  
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
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

  // Fallback to a default (this shouldn't happen in production)
  return "unknown";
}
