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
                                    This Privacy Policy explains how NudgeMe (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, and protects information when you use the NudgeMe mobile app. We&apos;re an indie product based in <strong>Israel</strong>. We don&apos;t sell your data, we don&apos;t share it for advertising, and we collect the minimum we need to make the app work.
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
                                        <strong>Usage events</strong> — anonymized records of how you use the app (e.g. &quot;task completed&quot;, &quot;plan submitted&quot;) linked to your account so we can fix bugs and improve the product. <strong>The text content of messages you type into the app is never sent to our analytics provider.</strong>
                                    </li>
                                    <li>
                                        <strong>Diagnostic data</strong> — IP address and basic device info (model, OS version) collected automatically by our hosting providers when you connect to the Service.
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
                                        <strong>Supabase</strong> — authentication, database, and edge functions (push notification delivery runs through here too).{" "}
                                        <a className="text-primary underline" href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
                                            supabase.com/privacy
                                        </a>
                                    </li>
                                    <li>
                                        <strong>Anthropic</strong> — Claude AI powers Pip&apos;s responses.{" "}
                                        <a className="text-primary underline" href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">
                                            anthropic.com/legal/privacy
                                        </a>
                                    </li>
                                    <li>
                                        <strong>PostHog (EU-hosted)</strong> — product analytics. Events are tied to your account ID and email, but the content of messages you type into the app is not sent to PostHog.{" "}
                                        <a className="text-primary underline" href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">
                                            posthog.com/privacy
                                        </a>
                                    </li>
                                    <li>
                                        <strong>Expo</strong> — push notification routing.{" "}
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
                                    International data transfers
                                </h2>
                                <p>
                                    NudgeMe is operated from Israel, and our sub-processors run servers in the EU and United States. By using NudgeMe, you consent to your information being processed in jurisdictions whose data-protection laws may differ from your own. We take reasonable steps to ensure your data is treated securely and in line with this Privacy Policy regardless of where it&apos;s stored.
                                </p>
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
                                    Retention
                                </h2>
                                <p>
                                    We retain your account data and content for as long as your account is active. Once you delete your account, we permanently remove it (and all associated journeys, tasks, and messages) within 30 days. Aggregated, non-identifying usage events may be retained longer for product analytics.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                    Security
                                </h2>
                                <p>
                                    We use industry-standard encryption in transit (HTTPS/TLS) and rely on Supabase&apos;s row-level security to ensure that one user can&apos;t read another user&apos;s data. No method of transmission or storage is 100% secure, and we can&apos;t guarantee absolute security — but we take reasonable steps to protect your data and we&apos;ll notify you if we ever become aware of a breach affecting your account.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                    Legal disclosures
                                </h2>
                                <p>
                                    We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g. a court or government agency), or where we believe in good faith that disclosure is necessary to comply with a legal obligation, protect the rights or safety of NudgeMe&apos;s users or the public, or investigate fraud or wrongdoing related to the Service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                    Children
                                </h2>
                                <p>
                                    NudgeMe is not directed at children under 13. We don&apos;t knowingly collect data from children under 13. If you believe a child has signed up, contact us and we&apos;ll delete the account. If your country requires parental consent for processing personal data of older minors, please contact us before signing up so we can meet that requirement.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                    Links to other sites
                                </h2>
                                <p>
                                    NudgeMe may link out to third-party sites (e.g. our sub-processors&apos; privacy policies). We don&apos;t control those sites and aren&apos;t responsible for their content or privacy practices — review their policies separately.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                    Changes to this policy
                                </h2>
                                <p>
                                    We&apos;ll update this page when anything material changes and bump the &quot;Last updated&quot; date above. Significant changes will also be communicated in-app or by email.
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
