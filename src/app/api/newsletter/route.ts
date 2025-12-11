import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

const mongo = new MongoClient(process.env.MONGODB_URI!);

export async function POST(req: Request) {
  try {
    // Check rate limit first
    const clientIp = getClientIp(req);
    const rateLimitResult = await checkRateLimit(clientIp, "newsletter", mongo);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: `Too many requests. Please try again in ${rateLimitResult.retryAfter} seconds.`,
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimitResult.retryAfter?.toString() || "900",
          },
        }
      );
    }

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Forward to external newsletter API
    const externalApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v2/newsletter/subscribe`;
    
    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: errorData.message || "Failed to subscribe to newsletter",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  } finally {
    await mongo.close();
  }
}
