"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";

type WaitlistFormProps = {
    appId: string;
    ctaLabel?: string;
};

// Capture UTM params from URL
function getUtmParams() {
    if (typeof window === "undefined") return {};

    const params = new URLSearchParams(window.location.search);
    return {
        source: params.get("utm_source") || undefined,
        medium: params.get("utm_medium") || undefined,
        campaign: params.get("utm_campaign") || undefined,
        content: params.get("utm_content") || undefined,
        term: params.get("utm_term") || undefined,
    };
}

export default function WaitlistForm({ appId, ctaLabel = "Join Waitlist" }: WaitlistFormProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Check for confirmation status in URL
    useEffect(() => {
        if (typeof window === "undefined") return;
        const params = new URLSearchParams(window.location.search);
        const confirmed = params.get("confirmed");
        if (confirmed === "1" || confirmed === "already") {
            setIsConfirmed(true);
            setMessage(confirmed === "already"
                ? "You're already confirmed! 🎉"
                : "You're on the list! 🎉"
            );
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || status === "loading") return;

        setStatus("loading");
        setMessage("");

        try {
            const utm = getUtmParams();
            const referrer = typeof document !== "undefined" ? document.referrer : undefined;

            const response = await fetch("/api/waitlist/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, appId, referrer, utm }),
            });

            const data = await response.json();

            if (!response.ok) {
                setStatus("error");
                setMessage(data.error || "Something went wrong");
                return;
            }

            setStatus("success");
            setMessage(data.message);
            if (data.alreadyConfirmed) {
                setIsConfirmed(true);
            }
        } catch (error) {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    };

    // Already confirmed state
    if (isConfirmed) {
        return (
            <div className="flex flex-col items-center gap-4 p-6 border border-primary/30 bg-primary/5">
                <div className="flex items-center gap-2 text-primary text-xl font-bold">
                    <Check className="w-6 h-6" />
                    {message || "You're on the list!"}
                </div>
                <p className="text-foreground/60 text-sm">
                    We'll notify you when it's ready.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={status === "loading"}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 text-foreground text-lg focus:outline-none focus:border-primary disabled:opacity-50 transition-colors"
                    />
                </div>
                <button
                    type="submit"
                    disabled={status === "loading" || !email}
                    className="px-6 py-4 bg-primary text-black font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {status === "loading" ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            {ctaLabel}
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>

            {/* Status message */}
            {message && (
                <p
                    className={`mt-4 text-center text-sm ${status === "error" ? "text-red-400" : "text-primary"
                        }`}
                >
                    {message}
                </p>
            )}

            {/* Success state */}
            {status === "success" && !isConfirmed && (
                <p className="mt-2 text-center text-foreground/50 text-xs">
                    Check your inbox and confirm your email to secure your spot.
                </p>
            )}

            {/* Privacy note */}
            {status === "idle" && (
                <p className="mt-4 text-center text-foreground/40 text-xs">
                    No spam, just important updates. Unsubscribe anytime.
                </p>
            )}
        </form>
    );
}

