import { NextResponse } from "next/server";
import { Resend } from "resend";
import { neon } from "@neondatabase/serverless";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req: Request) {
  try {
    // 1. Check rate limit
    const clientIp = getClientIp(req);
    const rateLimitResult = await checkRateLimit(clientIp, "contact");

    if (!rateLimitResult.allowed) {
      console.log(
        `[Contact API] Rate limit exceeded for IP: ${clientIp}, retryAfter: ${rateLimitResult.retryAfter}s`
      );
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

    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    // 2. Save submission to Neon PostgreSQL (if DATABASE_URL is configured)
    if (process.env.DATABASE_URL) {
      try {
        const sql = neon(process.env.DATABASE_URL);
        await sql`
          INSERT INTO contact_submissions (name, email, subject, message, ip)
          VALUES (${name}, ${email}, ${subject || "No Subject"}, ${message}, ${clientIp});
        `;
      } catch (dbError) {
        console.error("Database save warning:", dbError);
        // Continue even if database save fails so email is still delivered
      }
    }

    // 3. Send email notification via Resend
    if (resend) {
      await resend.emails.send({
        to: "harumemoirs@gmail.com",
        from: process.env.EMAIL_FROM || "Haru Memoirs Contact <contact@harumemoirs.in>",
        subject: `New contact form submission: ${subject || "No Subject"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              This email was sent from your website's contact form.
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
