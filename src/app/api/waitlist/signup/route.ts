import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Resend } from "resend";
import crypto from "crypto";

// Lazy-initialize Resend (only when route is called, not at build time)
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Normalize email: lowercase + trim
function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

// Generate a secure random token
function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Hash a token for storage (we never store the raw token)
function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, appId, referrer, utm } = body;

    // Validate required fields
    if (!email || !appId) {
      return NextResponse.json(
        { error: "Email and appId are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const emailNormalized = normalizeEmail(email);
    const supabase = createServerSupabaseClient();

    // Check if already signed up
    const { data: existing } = await supabase
      .from("waitlist_signups")
      .select("id, status")
      .eq("email_normalized", emailNormalized)
      .eq("app_id", appId)
      .single();

    if (existing) {
      if (existing.status === "confirmed") {
        return NextResponse.json(
          { message: "You're already on the waitlist!", alreadyConfirmed: true },
          { status: 200 }
        );
      }
      // Already pending - resend confirmation
      // Generate new token
      const token = generateToken();
      const tokenHash = hashToken(token);

      await supabase
        .from("waitlist_signups")
        .update({
          confirm_token_hash: tokenHash,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      // Send confirmation email
      await sendConfirmationEmail(email, appId, token);

      return NextResponse.json(
        { message: "Confirmation email resent! Check your inbox.", resent: true },
        { status: 200 }
      );
    }

    // New signup
    const token = generateToken();
    const tokenHash = hashToken(token);

    const { error: insertError } = await supabase.from("waitlist_signups").insert({
      email,
      email_normalized: emailNormalized,
      app_id: appId,
      status: "pending",
      confirm_token_hash: tokenHash,
      referrer: referrer || null,
      utm_source: utm?.source || null,
      utm_medium: utm?.medium || null,
      utm_campaign: utm?.campaign || null,
      utm_content: utm?.content || null,
      utm_term: utm?.term || null,
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save signup" },
        { status: 500 }
      );
    }

    // Send confirmation email
    await sendConfirmationEmail(email, appId, token);

    return NextResponse.json(
      { message: "Check your email to confirm your spot!", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

async function sendConfirmationEmail(email: string, appId: string, token: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://noambuilds.com";
  const confirmUrl = `${siteUrl}/api/waitlist/confirm?token=${token}`;

  // Friendly app name
  const appNames: Record<string, string> = {
    nudgeme: "NudgeMe",
  };
  const appName = appNames[appId] || appId;

  const resend = getResendClient();
  await resend.emails.send({
    from: "NoamBuilds <waitlist@noambuilds.com>",
    to: email,
    subject: `Confirm your spot on the ${appName} waitlist`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #00FF96; margin-bottom: 24px;">Almost there! 🎉</h1>
        <p style="color: #333; font-size: 16px; line-height: 1.6;">
          Thanks for signing up for the <strong>${appName}</strong> waitlist!
        </p>
        <p style="color: #333; font-size: 16px; line-height: 1.6;">
          Click the button below to confirm your email and secure your spot:
        </p>
        <div style="margin: 32px 0;">
          <a href="${confirmUrl}" style="display: inline-block; background-color: #00FF96; color: #000; font-weight: bold; padding: 16px 32px; text-decoration: none; font-size: 16px;">
            Confirm My Spot
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          If you didn't sign up for this, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="color: #999; font-size: 12px;">
          NoamBuilds · Building apps, sharing the journey.
        </p>
      </div>
    `,
  });
}

