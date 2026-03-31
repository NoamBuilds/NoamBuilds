import { NextRequest, NextResponse } from "next/server";

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, appId, referrer, utm } = body;

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

        const apiKey = process.env.LOOPS_API_KEY;
        if (!apiKey) {
            console.error("LOOPS_API_KEY is not set");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // Build source string with UTM context
        const source = [
            "waitlist",
            utm?.source,
            utm?.medium,
            utm?.campaign,
        ].filter(Boolean).join(" / ");

        const loopsResponse = await fetch("https://app.loops.so/api/v1/contacts/create", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.toLowerCase().trim(),
                source,
                ...(referrer && { referrer }),
            }),
        });

        if (!loopsResponse.ok) {
            const loopsData = await loopsResponse.json().catch(() => ({}));

            // Loops returns this message for duplicate contacts
            if (loopsData.message?.includes("already") || loopsResponse.status === 409) {
                return NextResponse.json(
                    { message: "You're already on the list! We'll be in touch soon.", alreadyExists: true },
                    { status: 200 }
                );
            }

            console.error("Loops API error:", loopsResponse.status, loopsData);
            return NextResponse.json(
                { error: "Failed to join waitlist. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "You're on the list! Check your inbox for a welcome email." },
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
