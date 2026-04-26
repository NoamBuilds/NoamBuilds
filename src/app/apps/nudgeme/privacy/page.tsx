import Link from "next/link";
import AnimatedElement from "@/components/AnimatedElement";
import { siteConfig } from "@/content/site";

export const metadata = {
    title: "Privacy Policy — NudgeMe",
    description:
        "How NudgeMe collects, uses, and protects information when you use the app.",
};

const LAST_UPDATED = "April 26, 2026";

export default function NudgeMePrivacyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-3xl mx-auto">
                    <AnimatedElement>
                        <p className="text-sm uppercase tracking-wider text-primary mb-4">
                            NudgeMe
                        </p>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-foreground/60 mb-16">
                            Last updated: {LAST_UPDATED}
                        </p>
                    </AnimatedElement>

                    <AnimatedElement delay={100}>
                        <div className="prose prose-invert max-w-none space-y-12 text-foreground/80 leading-relaxed">
                            <section>
                                <p className="text-lg">
                                    This Privacy Policy explains how NudgeMe (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, and protects information when you use the NudgeMe mobile app. We&apos;re an indie product. We don&apos;t sell your data, we don&apos;t share it for advertising, and we collect the minimum we need to make the app work.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                    Information we collect
                                </h2>
                                <p className="mb-4">When you create an account and use NudgeMe, we collect:</p>
                                <ul className="list-disc pl-6 space-y-3">
                                    <li>
                                        <strong>Account info</strong> — your email address and, if you sign in with Google or Apple, your name and avatar URL.
                                    </li>
                                    <li>
                                        <strong>Goals and tasks</strong> — the journeys, phases, and tasks you create, plus the messages you exchange with Pip, our AI companion.
                                    </li>
                                    <li>
                                        <strong>Push notification token</strong> — an opaque identifier issued by Apple or Google so we can send you nudges. We can&apos;t reverse this into a phone number or device identity.
                                    </li>
                                    <li>
                                        <strong>Usage events</strong> — anonymized records of how you use the app (e.g. &quot;task completed&quot;, &quot;plan submitted&quot;) linked to your account so we can fix bugs and improve the product.
                                    </li>
                                </ul>
                                <p className="mt-4">
                                    We do <strong>not</strong> collect your location, contacts, photos, health data, microphone, or camera. NudgeMe doesn&apos;t request those permissions.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                    How we use it
                                </h2>
                                <ul className="list-disc pl-6 space-y-3">
                                    <li>
                                        <strong>To run the app</strong> — store your goals, mark tasks complete, calculate streaks, deliver push reminders.
                                    </li>
                                    <li>
                                        <strong>To generate plans with Pip</strong> — messages you send to Pip are forwarded to Anthropic&apos;s Claude API to produce the response. Anthropic does not use API inputs to train their models, per their API terms.
                                    </li>
                                    <li>
                                        <strong>To improve NudgeMe</strong> — usage events are reviewed in aggregate to find bugs and prioritize features.
                                    </li>
                                </ul>
                                <p className="mt-4">
                                    We don&apos;t sell your data, share it for advertising, or use it for any purpose beyond running NudgeMe.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                    Who processes your data
                                </h2>
                                <p className="mb-4">NudgeMe relies on these sub-processors:</p>
                                <ul className="list-disc pl-6 space-y-3">
                                    <li>
                                        <strong>Supabase</strong> — database, authentication, and edge functions.{" "}
                                        <a className="text-primary underline" href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
                                            supabase.com/privacy
                                        </a>
                                    </li>
                                    <li>
                                        <strong>Anthropic</strong> — Claude API powers Pip&apos;s responses.{" "}
                                        <a className="text-primary underline" href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">
                                            anthropic.com/legal/privacy
                                        </a>
                                    </li>
                                    <li>
                                        <strong>PostHog</strong> — anonymized product analytics.{" "}
                                        <a className="text-primary underline" href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">
                                            posthog.com/privacy
                                        </a>
                                    </li>
                                    <li>
                                        <strong>Expo</strong> — push notification delivery.{" "}
                                        <a className="text-primary underline" href="https://expo.dev/privacy-explained" target="_blank" rel="noopener noreferrer">
                                            expo.dev/privacy-explained
                                        </a>
                                    </li>
                                    <li>
                                        <strong>Apple / Google</strong> — sign-in providers (only if you choose those options).
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                    Your rights
                                </h2>
                                <ul className="list-disc pl-6 space-y-3">
                                    <li>View, edit, or delete your goals and account info at any time inside the app.</li>
                                    <li>
                                        Delete your account and all associated data by emailing{" "}
                                        <a className="text-primary underline" href={`mailto:${siteConfig.links.email}`}>
                                            {siteConfig.links.email}
                                        </a>
                                        . We&apos;ll process the request within 30 days.
                                    </li>
                                    <li>Request a copy of your data by emailing the same address.</li>
                                </ul>
                                <p className="mt-4">
                                    If you&apos;re in the EU or UK, you also have rights under GDPR (access, rectification, erasure, portability, objection). Email us to exercise them.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                    Children
                                </h2>
                                <p>
                                    NudgeMe is not directed at children under 13. We don&apos;t knowingly collect data from children under 13. If you believe a child has signed up, contact us and we&apos;ll delete the account.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                    Changes to this policy
                                </h2>
                                <p>
                                    We&apos;ll update this page when anything material changes and bump the &quot;Last updated&quot; date above. Significant changes will also be communicated in-app.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                    Contact
                                </h2>
                                <p>
                                    Questions? Email{" "}
                                    <a className="text-primary underline" href={`mailto:${siteConfig.links.email}`}>
                                        {siteConfig.links.email}
                                    </a>{" "}
                                    or visit our{" "}
                                    <Link className="text-primary underline" href="/contact">
                                        contact page
                                    </Link>
                                    .
                                </p>
                            </section>
                        </div>
                    </AnimatedElement>
                </div>
            </main>
        </div>
    );
}
