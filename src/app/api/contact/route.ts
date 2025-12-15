import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name is too long" },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long (max 5000 characters)" },
        { status: 400 }
      );
    }

    const resend = getResendClient();

    // Send email to yourself
    await resend.emails.send({
      from: "NoamBuilds Contact <contact@noambuilds.com>",
      to: "noambuilds@gmail.com",
      replyTo: email,
      subject: `New contact from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #00FF96; margin-bottom: 24px;">New Contact Form Submission</h1>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <h2 style="color: #333; margin-bottom: 12px;">Message:</h2>
          <div style="background: #fff; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6; white-space: pre-wrap; margin: 0;">
              ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
          <p style="color: #999; font-size: 12px;">
            This message was sent from the NoamBuilds contact form.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Message sent successfully!", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

