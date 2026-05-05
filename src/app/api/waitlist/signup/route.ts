import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/waitlist/signup
 *
 * Forwards waitlist signups to Loops, tagged with a `source` string
 * (`appId` + UTM params) for attribution and assigned to a per-app
 * Mailing List so welcome Loops can be triggered with list-scoped filters
 * instead of "any new contact" (which fires across every app's signups).
 *
 * **Two-call pattern** to handle existing contacts. If the email is brand
 * new in the Loops account, `POST /contacts/create` is enough — passes
 * `mailingLists` and we're done. If the email already exists (e.g. the
 * user signed up to a sibling app first — `../EventSnap` waitlist), the
 * create call returns 409; we follow up with `PUT /contacts/update` to
 * add them to the right Mailing List without disturbing their existing
 * source / list memberships. Mirrors `../EventSnap/site/app/api/waitlist/signup/route.ts`.
 *
 * Env:
 * - `LOOPS_API_KEY` — required.
 * - `LOOPS_NUDGEME_LIST_ID` — optional but expected for nudgeme signups.
 *   Without it, nudgeme contacts still get created in Loops but won't be
 *   assigned to the nudgeme Mailing List, so the welcome Loop won't fire
 *   (its trigger is filtered on the list). Log a warn so the missing-env
 *   case doesn't fail silently.
 */

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Map known appIds to their Mailing List env var. Add a row when a new
// noambuilds app starts collecting signups; the env var must exist on
// Vercel (Production + Preview) before the row is added.
const MAILING_LIST_ENV_BY_APP_ID: Record<string, string> = {
    nudgeme: "LOOPS_NUDGEME_LIST_ID",
};

function getMailingListIdForApp(appId: string): string | undefined {
    const envName = MAILING_LIST_ENV_BY_APP_ID[appId];
    if (!envName) return undefined;
    return process.env[envName];
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

        const listId = getMailingListIdForApp(appId);
        if (!listId) {
            // appId is recognized but its env var is missing — log loud so
            // we notice in Vercel logs. appId not in the map at all = this
            // is intentional (catch-all signup with no list assignment).
            const envName = MAILING_LIST_ENV_BY_APP_ID[appId];
            if (envName) {
                console.warn(
                    `[waitlist] ${envName} is not set — ${appId} signups will reach Loops but won't be assigned to the ${appId} mailing list, so the welcome Loop won't fire`
                );
            }
        }

        // Build source string with UTM context
        const source = [
            "waitlist",
            appId,
            utm?.source,
            utm?.medium,
            utm?.campaign,
        ].filter(Boolean).join(" / ");

        const normalizedEmail = email.toLowerCase().trim();
        const mailingLists = listId ? { [listId]: true } : undefined;
        const loopsHeaders = {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        };

        // First attempt: create a new contact. Pass mailingLists so a
        // brand-new contact lands in the per-app list immediately.
        const createResponse = await fetch("https://app.loops.so/api/v1/contacts/create", {
            method: "POST",
            headers: loopsHeaders,
            body: JSON.stringify({
                email: normalizedEmail,
                source,
                ...(referrer && { referrer }),
                ...(mailingLists && { mailingLists }),
            }),
        });

        if (createResponse.ok) {
            return NextResponse.json(
                { message: "You're on the list! Check your inbox for a welcome email." },
                { status: 200 }
            );
        }

        const createData = await createResponse.json().catch(() => ({}));
        const isDuplicate =
            createResponse.status === 409 ||
            (typeof createData?.message === "string" && createData.message.includes("already"));

        if (!isDuplicate) {
            console.error("Loops create error:", createResponse.status, createData);
            return NextResponse.json(
                { error: "Failed to join waitlist. Please try again." },
                { status: 500 }
            );
        }

        // Existing contact: add them to this app's Mailing List via update.
        // Don't touch `source` here — preserve their original-attribution
        // (e.g. someone who signed up to a sibling app first should keep
        // that app's source) while still landing in this app's list.
        if (mailingLists) {
            const updateResponse = await fetch("https://app.loops.so/api/v1/contacts/update", {
                method: "PUT",
                headers: loopsHeaders,
                body: JSON.stringify({
                    email: normalizedEmail,
                    mailingLists,
                }),
            });

            if (!updateResponse.ok) {
                const updateData = await updateResponse.json().catch(() => ({}));
                console.error(
                    "Loops update (add-to-mailing-list) failed for existing contact:",
                    updateResponse.status,
                    updateData
                );
                // Don't fail the whole request — the contact exists in
                // Loops and the user's UX is "already on the list". The
                // list-assignment failure is logged for backfill.
            }
        }

        return NextResponse.json(
            { message: "You're already on the list! We'll be in touch soon.", alreadyExists: true },
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
