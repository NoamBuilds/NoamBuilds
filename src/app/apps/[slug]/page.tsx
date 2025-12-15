import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Apple, Play } from "lucide-react";
import { apps, getAppById } from "@/content/apps";
import AnimatedElement from "@/components/AnimatedElement";
import ProjectGallery from "@/components/ProjectGallery";
import WaitlistForm from "@/components/WaitlistForm";
import type { Metadata } from "next";

// --- STATIC GENERATION ---
export async function generateStaticParams() {
    return apps.map((app) => ({
        slug: app.id,
    }));
}

// --- DYNAMIC METADATA ---
type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const app = getAppById(slug);

    if (!app) {
        return { title: "App Not Found" };
    }

    return {
        title: app.title,
        description: app.tagline,
        openGraph: {
            title: `${app.title} — ${app.tagline}`,
            description: app.summary,
            images: [app.thumbnailImage],
        },
    };
}

// --- PAGE COMPONENT ---
export default async function AppDetailPage({ params }: Props) {
    const { slug } = await params;
    const app = getAppById(slug);

    if (!app) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="pt-32 pb-24 px-6 md:px-12 bg-dark-grey">
                <div className="max-w-[100rem] mx-auto">
                    {/* Back Button */}
                    <AnimatedElement>
                        <Link
                            href="/apps"
                            className="inline-flex items-center text-foreground/70 hover:text-primary transition-colors mb-12"
                        >
                            <ArrowLeft className="mr-2 w-4 h-4" />
                            All Apps
                        </Link>
                    </AnimatedElement>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: App Info */}
                        <div>
                            <AnimatedElement>
                                {/* Status Badge */}
                                <span
                                    className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider mb-6 ${app.status === "live"
                                        ? "bg-green-500 text-black"
                                        : app.status === "beta"
                                            ? "bg-primary text-black"
                                            : "bg-white/20 text-white"
                                        }`}
                                >
                                    {app.status === "coming-soon" ? "Coming Soon" : app.status}
                                </span>

                                <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
                                    {app.title}
                                </h1>

                                <p className="text-2xl md:text-3xl text-primary mb-6">
                                    {app.tagline}
                                </p>

                                <p className="text-xl text-foreground/70 mb-8 max-w-xl">
                                    {app.summary}
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    {app.waitlistEnabled && (
                                        <a
                                            href="#waitlist"
                                            className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold text-lg hover:bg-primary/90 transition-all"
                                        >
                                            {app.ctaLabel || "Join Waitlist"}
                                        </a>
                                    )}
                                    {app.appStoreLink && (
                                        <a
                                            href={app.appStoreLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-6 py-4 border border-white/20 hover:border-primary hover:text-primary transition-all"
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
                                            className="inline-flex items-center px-6 py-4 border border-white/20 hover:border-primary hover:text-primary transition-all"
                                        >
                                            <Play className="mr-2 w-5 h-5" />
                                            Play Store
                                        </a>
                                    )}
                                </div>
                            </AnimatedElement>
                        </div>

                        {/* Right: Hero Image */}
                        <AnimatedElement delay={200}>
                            <div className="relative aspect-video overflow-hidden border border-white/10">
                                <Image
                                    src={app.thumbnailImage}
                                    alt={app.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </AnimatedElement>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            {app.features && app.features.length > 0 && (
                <section className="py-24 px-6 md:px-12 bg-background">
                    <div className="max-w-[100rem] mx-auto">
                        <AnimatedElement>
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                                Key Features
                            </h2>
                            <p className="text-center text-foreground/50 mb-16 max-w-2xl mx-auto">
                                Everything you need to get started
                            </p>
                        </AnimatedElement>

                        {/* Equal-height cards grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                            {app.features.map((feature, index) => (
                                <AnimatedElement key={index} delay={80 * index} className="h-full">
                                    <div className="h-full p-8 border border-white/10 bg-dark-grey hover:border-primary/50 transition-colors flex flex-col">
                                        {/* Simple number accent */}
                                        <span className="text-primary text-sm font-mono mb-4">
                                            0{index + 1}
                                        </span>
                                        <p className="text-lg text-foreground/90 leading-relaxed">
                                            {feature}
                                        </p>
                                    </div>
                                </AnimatedElement>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Screenshots Section */}
            {app.images && app.images.length > 0 && (
                <section className="py-24 px-6 md:px-12 bg-dark-grey">
                    <div className="max-w-[100rem] mx-auto">
                        <AnimatedElement>
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                                Screenshots
                            </h2>
                        </AnimatedElement>

                        <AnimatedElement delay={200}>
                            <ProjectGallery
                                images={app.images}
                                projectTitle={app.title}
                            />
                        </AnimatedElement>
                    </div>
                </section>
            )}

            {/* Tech Stack */}
            {app.techStack && app.techStack.length > 0 && (
                <section className="py-24 px-6 md:px-12 bg-background">
                    <div className="max-w-[100rem] mx-auto text-center">
                        <AnimatedElement>
                            <h2 className="text-4xl md:text-5xl font-bold mb-12">
                                Built With
                            </h2>
                        </AnimatedElement>

                        <AnimatedElement delay={100}>
                            <div className="flex flex-wrap justify-center gap-4">
                                {app.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-6 py-3 bg-white/5 border border-white/10 text-lg text-foreground/80"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </AnimatedElement>
                    </div>
                </section>
            )}

            {/* Waitlist Section */}
            {app.waitlistEnabled && (
                <section id="waitlist" className="py-24 px-6 md:px-12 bg-dark-grey">
                    <div className="max-w-2xl mx-auto text-center">
                        <AnimatedElement>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Get Early Access
                            </h2>
                            <p className="text-xl text-foreground/70 mb-12">
                                Be the first to know when {app.title} launches.
                            </p>

                            <WaitlistForm appId={app.id} ctaLabel={app.ctaLabel} />
                        </AnimatedElement>
                    </div>
                </section>
            )}
        </div>
    );
}

