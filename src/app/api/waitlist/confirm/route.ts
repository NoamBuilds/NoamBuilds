import { NextRequest, NextResponse } from "next/server";

// Legacy route — confirmation flow removed.
// Redirect old confirmation links to the app page gracefully.
export async function GET(request: NextRequest) {
    return NextResponse.redirect(
        new URL("/apps/nudgeme?confirmed=already", request.url)
    );
}
