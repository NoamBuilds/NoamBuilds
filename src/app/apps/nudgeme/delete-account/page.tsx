import Link from "next/link";
import AnimatedElement from "@/components/AnimatedElement";
import { siteConfig } from "@/content/site";

export const metadata = {
    title: "Delete Your NudgeMe Account",
    description:
        "How to permanently delete your NudgeMe account and all associated data.",
};

const DELETION_SUBJECT = encodeURIComponent("Delete my NudgeMe account");
const DELETION_BODY = encodeURIComponent(
    "Hi NudgeMe team,\n\nI'd like to permanently delete my NudgeMe account and all associated data.\n\nAccount email: [the email you signed up with]\n\nThanks."
);

export default function NudgeMeDeleteAccountPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-3xl mx-auto">
                    <AnimatedElement>
                        <p className="text-sm uppercase tracking-wider text-primary mb-4">
                            NudgeMe
                        </p>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Delete your account
                        </h1>
                        <p className="text-xl text-foreground/70 mb-16">
                            We&apos;ll permanently delete your NudgeMe account and all associated data within 30 days of receiving your request.
                        </p>
                    </AnimatedElement>

                    <AnimatedElement delay={100}>
                        <section className="mb-12 p-8 bg-dark-grey border border-white/10">
                            <h2 className="text-2xl font-bold mb-4">How to request deletion</h2>
                            <ol className="space-y-4 text-lg text-foreground/80 list-decimal pl-6">
                                <li>
                                    Email{" "}
                                    <a
                                        className="text-primary underline"
                                        href={`mailto:${siteConfig.links.email}?subject=${DELETION_SUBJECT}&body=${DELETION_BODY}`}
                                    >
                                        {siteConfig.links.email}
                                    </a>{" "}
                                    from the address you used to sign up.
                                </li>
                                <li>
                                    Use the subject line: <strong>&quot;Delete my NudgeMe account&quot;</strong>.
                                </li>
                                <li>
                                    We&apos;ll confirm receipt within 2 business days and complete the deletion within 30 days.
                                </li>
                            </ol>
                            <div className="mt-8">
                                <a
                                    href={`mailto:${siteConfig.links.email}?subject=${DELETION_SUBJECT}&body=${DELETION_BODY}`}
                                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black font-bold hover:bg-primary/90 transition-colors"
                                >
                                    Email deletion request
                                </a>
                            </div>
                        </section>
                    </AnimatedElement>

                    <AnimatedElement delay={200}>
                        <section className="mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">What gets deleted</h2>
                            <p className="mb-4 text-foreground/80">
                                When you delete your account, we permanently remove:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                                <li>Your account record (email, name, avatar URL).</li>
                                <li>All journeys, phases, tasks, and progress data.</li>
                                <li>All chat messages between you and Pip.</li>
                                <li>Your push notification token.</li>
                                <li>Streak history and notification settings.</li>
                            </ul>
                            <p className="mt-6 text-foreground/80">
                                We may retain limited aggregated and anonymized analytics events that cannot be linked back to you, and any records we&apos;re legally required to keep (e.g. fraud-prevention or tax records, where applicable).
                            </p>
                        </section>
                    </AnimatedElement>

                    <AnimatedElement delay={300}>
                        <section className="text-foreground/60">
                            <p>
                                See our{" "}
                                <Link className="text-primary underline" href="/apps/nudgeme/privacy">
                                    Privacy Policy
                                </Link>{" "}
                                for the full picture, or our{" "}
                                <Link className="text-primary underline" href="/apps/nudgeme/support">
                                    Support page
                                </Link>{" "}
                                for general help.
                            </p>
                        </section>
                    </AnimatedElement>
                </div>
            </main>
        </div>
    );
}
