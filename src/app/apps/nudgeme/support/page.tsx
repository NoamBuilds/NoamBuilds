import Link from "next/link";
import AnimatedElement from "@/components/AnimatedElement";
import { siteConfig } from "@/content/site";

export const metadata = {
    title: "Support — NudgeMe",
    description: "Get help with NudgeMe. Contact details, common questions, and account support.",
};

export default function NudgeMeSupportPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-3xl mx-auto">
                    <AnimatedElement>
                        <p className="text-sm uppercase tracking-wider text-primary mb-4">
                            NudgeMe
                        </p>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Support
                        </h1>
                        <p className="text-xl text-foreground/70 mb-16">
                            Need help with NudgeMe? You&apos;re in the right place.
                        </p>
                    </AnimatedElement>

                    <AnimatedElement delay={100}>
                        <section className="mb-16 p-8 bg-dark-grey border border-white/10">
                            <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
                            <ul className="space-y-3 text-lg text-foreground/80">
                                <li>
                                    <strong>Email:</strong>{" "}
                                    <a className="text-primary underline" href={`mailto:${siteConfig.links.email}`}>
                                        {siteConfig.links.email}
                                    </a>
                                </li>
                                <li>
                                    <strong>Contact form:</strong>{" "}
                                    <Link className="text-primary underline" href="/contact">
                                        noambuilds.com/contact
                                    </Link>
                                </li>
                            </ul>
                            <p className="mt-6 text-foreground/60">
                                We typically reply within 2 business days.
                            </p>
                        </section>
                    </AnimatedElement>

                    <AnimatedElement delay={200}>
                        <section className="mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8">Common questions</h2>
                            <div className="space-y-8 text-foreground/80 leading-relaxed">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">
                                        Pip isn&apos;t responding to my messages.
                                    </h3>
                                    <p>
                                        Check that you&apos;re online. If the issue persists, Pip&apos;s backend may be temporarily unavailable — please email us and we&apos;ll look into it.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">
                                        How do I delete my account?
                                    </h3>
                                    <p>
                                        Email{" "}
                                        <a className="text-primary underline" href={`mailto:${siteConfig.links.email}`}>
                                            {siteConfig.links.email}
                                        </a>{" "}
                                        from the address you signed up with. We&apos;ll permanently delete your account and all associated data within 30 days.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">
                                        My streak reset and I think it&apos;s a bug.
                                    </h3>
                                    <p>
                                        Streaks are evaluated daily at midnight UTC. If you completed a task yesterday but the streak shows broken, email us your account email and a rough time of the missed day so we can investigate.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">
                                        How do I turn off push notifications?
                                    </h3>
                                    <p>
                                        Open the Settings tab inside NudgeMe to disable nudges, or use your phone&apos;s system settings (Settings → NudgeMe → Notifications) to turn them off entirely.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">
                                        I want to change the goal Pip planned for me.
                                    </h3>
                                    <p>
                                        Open the journey, tap the plan editor, and reorder, edit, or delete tasks freely. You can also start a new chat with Pip to regenerate the whole roadmap if the goal has shifted.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </AnimatedElement>

                    <AnimatedElement delay={300}>
                        <section className="text-foreground/60">
                            <p>
                                Looking for our{" "}
                                <Link className="text-primary underline" href="/apps/nudgeme/privacy">
                                    Privacy Policy
                                </Link>
                                ?
                            </p>
                        </section>
                    </AnimatedElement>
                </div>
            </main>
        </div>
    );
}
