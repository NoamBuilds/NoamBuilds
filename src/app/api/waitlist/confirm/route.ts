import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import crypto from "crypto";

// Hash a token for lookup
function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/?error=invalid_token", request.url));
  }

  const tokenHash = hashToken(token);
  const supabase = createServerSupabaseClient();

  // Find signup by token hash
  const { data: signup, error: findError } = await supabase
    .from("waitlist_signups")
    .select("id, app_id, status, email, referrer, utm_source, utm_medium, utm_campaign")
    .eq("confirm_token_hash", tokenHash)
    .single();

  if (findError || !signup) {
    return NextResponse.redirect(new URL("/?error=invalid_token", request.url));
  }

  if (signup.status === "confirmed") {
    // Already confirmed, just redirect
    return NextResponse.redirect(
      new URL(`/apps/${signup.app_id}?confirmed=already`, request.url)
    );
  }

  // Confirm the signup
  const { error: updateError } = await supabase
    .from("waitlist_signups")
    .update({
      status: "confirmed",
      confirmed_at: new Date().toISOString(),
      confirm_token_hash: null, // Clear the token after use
      updated_at: new Date().toISOString(),
    })
    .eq("id", signup.id);

  if (updateError) {
    console.error("Confirm error:", updateError);
    return NextResponse.redirect(new URL("/?error=confirm_failed", request.url));
  }

  // Add confirmed contact to Loops for drip campaign
  if (process.env.LOOPS_API_KEY && signup.email) {
    try {
      await fetch("https://app.loops.so/api/v1/contacts/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.LOOPS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signup.email,
          source: [
            "waitlist",
            signup.utm_source,
            signup.utm_medium,
            signup.utm_campaign,
          ].filter(Boolean).join(" / "),
          ...(signup.referrer && { referrer: signup.referrer }),
        }),
      });
    } catch (err) {
      console.error("Loops API error:", err);
    }
  }

  // Success! Redirect to the app page with success indicator
  return NextResponse.redirect(
    new URL(`/apps/${signup.app_id}?confirmed=1`, request.url)
  );
}

