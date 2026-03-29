import { notFound } from "next/navigation";
import Image from "next/image";
import { Apple, Play, CheckCircle2 } from "lucide-react";
import { apps, getAppById } from "@/content/apps";
import { siteConfig } from "@/content/site";
import AnimatedElement from "@/components/AnimatedElement";
import ProjectGallery from "@/components/ProjectGallery";
import WaitlistForm from "@/components/WaitlistForm";
import type { Metadata } from "next";

// --- STATIC GENERATION ---
export async function generateStaticParams() {
    return apps.map((app) => ({ slug: app.id }));
}

// --- DYNAMIC METADATA ---
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const app = getAppById(slug);
    if (!app) return { title: "App Not Found" };

    const metaTitle = app.id === "nudgeme"
        ? "NudgeMe - Your Goals, Actually Done"
        : `${app.title} - ${app.tagline}`;
    const metaDescription = app.id === "nudgeme"
        ? "Describe any goal to Kit, your AI companion. Get a personalized plan in minutes. Stay on track with smart nudges and daily streaks. Join the waitlist."
        : app.summary;

    return {
        title: metaTitle,
        description: metaDescription,
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            images: [app.thumbnailImage],
        },
    };
}

// --- PAGE COMPONENT ---
export default async function AppLandingPage({ params }: Props) {
    const { slug } = await params;
    const app = getAppById(slug);

    if (!app) notFound();

    // JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: app.title,
        description: app.summary,
        applicationCategory: app.category || "SoftwareApplication",
        operatingSystem: app.platforms || "Cross-platform",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        author: { "@type": "Person", name: "Noam", url: siteConfig.url },
        image: `${siteConfig.url}${app.thumbnailImage}`,
        url: `${siteConfig.url}/apps/${app.id}`,
    };

    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* ============================================
                HERO SECTION
                ============================================ */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Status badge */}
                        <AnimatedElement>
                            <span className={`inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full mb-8 ${app.status === "live" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                                app.status === "beta" ? "bg-primary/20 text-primary border border-primary/30" :
                                    "bg-white/10 text-white/70 border border-white/20"
                                }`}>
                                {app.status === "coming-soon" ? "Coming Soon" : app.status === "beta" ? "Beta" : "Available Now"}
                            </span>
                        </AnimatedElement>

                        {/* Headline */}
                        <AnimatedElement delay={100}>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                                {app.tagline}
                            </h1>
                        </AnimatedElement>

                        {/* Subheadline */}
                        <AnimatedElement delay={200}>
                            <p className="text-xl md:text-2xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                                {app.summary}
                            </p>
                        </AnimatedElement>

                        {/* CTA - inline waitlist form or store buttons */}
                        <AnimatedElement delay={300}>
                            {app.waitlistEnabled ? (
                                <div className="max-w-md mx-auto mb-16">
                                    <WaitlistForm appId={app.id} ctaLabel={app.ctaLabel} />
                                </div>
                            ) : (
                                <div className="flex flex-wrap justify-center gap-4 mb-16">
                                    {app.appStoreLink && (
                                        <a
                                            href={app.appStoreLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-6 py-4 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all"
                                        >
                                            <Apple className="mr-2 w-5 h-5" />
                                            App Store
                                        </a>
                                    )}
                                    {app.playStoreLink && (
                                        <a
                                            href={app.playStoreLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-6 py-4 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all"
                                        >
                                            <Play className="mr-2 w-5 h-5" />
                                            Google Play
                                        </a>
                                    )}
                                </div>
                            )}
                        </AnimatedElement>

                        {/* Hero Image/Video */}
                        <AnimatedElement delay={400}>
                            <div className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/10">
                                {app.thumbnailImage.endsWith('.mp4') || app.thumbnailImage.endsWith('.webm') ? (
                                    <video
                                        src={app.thumbnailImage}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Image
                                        src={app.thumbnailImage}
                                        alt={app.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                )}
                            </div>
                        </AnimatedElement>
                    </div>
                </div>
            </section>

            {/* ============================================
                PROBLEM SECTION
                ============================================ */}
            {app.problem && (
                <section className="py-20 md:py-32 px-6 md:px-12">
                    <div className="max-w-3xl mx-auto">
                        <AnimatedElement>
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                                {app.problemHeading || "The Problem"}
                            </h2>
                        </AnimatedElement>
                        <AnimatedElement delay={100}>
                            <div className="space-y-6 text-xl md:text-2xl text-foreground/80 leading-relaxed text-center">
                                {app.problem.includes("\n") ? (
                                    app.problem.split("\n\n").map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))
                                ) : (
                                    <p>{app.problem}</p>
                                )}
                            </div>
                        </AnimatedElement>
                    </div>
                </section>
            )}

            {/* ============================================
                SOLUTION SECTION
                ============================================ */}
            {app.solution && (
                <section className="py-20 md:py-32 px-6 md:px-12 bg-dark-grey">
                    <div className="max-w-3xl mx-auto text-center">
                        <AnimatedElement>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">
                                {app.solutionHeading || "The Solution"}
                            </h2>
                        </AnimatedElement>
                        <AnimatedElement delay={100}>
                            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
                                {app.solution}
                            </p>
                        </AnimatedElement>
                    </div>
                </section>
            )}

            {/* ============================================
                DEMO SECTION
                ============================================ */}
            {app.id === "nudgeme" && (
                <section className="py-16 md:py-24 px-6 md:px-12">
                    <div className="max-w-lg mx-auto">
                        <AnimatedElement>
                            <div className="rounded-[2.5rem] border-[8px] border-white/10 overflow-hidden shadow-2xl shadow-primary/10 bg-black">
                                <Image
                                    src="/apps/nudgeme/chat.jpg"
                                    alt="NudgeMe chat with Kit"
                                    width={390}
                                    height={844}
                                    className="w-full"
                                />
                            </div>
                        </AnimatedElement>
                    </div>
                </section>
            )}

            {/* ============================================
                HOW IT WORKS SECTION
                ============================================ */}
            {app.howItWorks && app.howItWorks.length > 0 && (
                <section className="py-24 px-6 md:px-12 bg-dark-grey">
                    <div className="max-w-6xl mx-auto">
                        <AnimatedElement>
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                                How it works
                            </h2>
                        </AnimatedElement>

                        <div className="grid md:grid-cols-3 gap-12">
                            {app.howItWorks.map((item, index) => (
                                <AnimatedElement key={index} delay={100 * index}>
                                    <div className="text-center">
                                        <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                                            <span className="text-3xl font-bold text-primary">{index + 1}</span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold mb-4">{item.step}</h3>
                                        <p className="text-foreground/80 leading-relaxed">{item.description}</p>
                                    </div>
                                </AnimatedElement>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ============================================
                FEATURES SECTION
                ============================================ */}
            {app.features && app.features.length > 0 && (
                <section className="py-24 px-6 md:px-12">
                    <div className="max-w-5xl mx-auto">
                        <AnimatedElement>
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                                What's inside
                            </h2>
                        </AnimatedElement>

                        <div className="grid md:grid-cols-2 gap-8">
                            {app.features.map((feature, index) => (
                                <AnimatedElement key={index} delay={80 * index}>
                                    <div className="flex gap-4 p-8 rounded-xl bg-white/[0.08] border border-white/[0.15] hover:border-primary/30 transition-colors">
                                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                            <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </AnimatedElement>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ============================================
                SCREENSHOTS SECTION
                ============================================ */}
            {app.images && app.images.length > 0 && (
                <section className="py-24 px-6 md:px-12 bg-dark-grey">
                    <div className="max-w-6xl mx-auto">
                        <AnimatedElement>
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                                See it in action
                            </h2>
                        </AnimatedElement>

                        <AnimatedElement delay={200}>
                            <ProjectGallery images={app.images} projectTitle={app.title} />
                        </AnimatedElement>
                    </div>
                </section>
            )}

            {/* ============================================
                SOCIAL PROOF SECTION
                ============================================ */}
            {app.waitlistEnabled && (
                <section className="py-16 md:py-20 px-6 md:px-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <AnimatedElement>
                            <p className="text-xl md:text-2xl text-foreground/50 italic">
                                Currently in private beta. Join the waitlist and be one of the first to try it.
                            </p>
                        </AnimatedElement>
                    </div>
                </section>
            )}

            {/* ============================================
                FINAL CTA / WAITLIST SECTION
                ============================================ */}
            {app.waitlistEnabled && (
                <section id="waitlist" className="relative py-24 md:py-32 px-6 md:px-12 bg-dark-grey border-t border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
                    <div className="relative max-w-2xl mx-auto text-center">
                        <AnimatedElement>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                {app.ctaHeading || `Ready to try ${app.title}?`}
                            </h2>
                            <p className="text-xl text-foreground/70 mb-12">
                                {app.ctaSubtitle || (app.status === "beta"
                                    ? "Join the beta and be among the first to experience it."
                                    : app.status === "coming-soon"
                                        ? "Sign up to get notified when we launch."
                                        : "Get started today. It's free.")}
                            </p>

                            <WaitlistForm appId={app.id} ctaLabel={app.ctaLabel} />
                        </AnimatedElement>
                    </div>
                </section>
            )}
        </div>
    );
}
