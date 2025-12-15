import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { apps } from "@/content/apps";
import AnimatedElement from "@/components/AnimatedElement";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Apps",
    description: "Products and applications I'm building.",
};

export default function AppsPage() {
    return (
        <div className="min-h-screen bg-background">
            <main className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-[120rem] mx-auto">
                    {/* Header */}
                    <AnimatedElement>
                        <div className="mb-16">
                            <h1 className="text-6xl md:text-8xl font-bold mb-6">
                                Apps
                            </h1>
                            <p className="text-xl text-foreground/70 max-w-3xl">
                                Products I&apos;m building — from idea to launch.
                            </p>
                        </div>
                    </AnimatedElement>

                    {/* Apps Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {apps.map((app, index) => (
                            <AnimatedElement key={app.id} delay={100 * index}>
                                <div className="group border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden h-full flex flex-col">
                                    {/* Image */}
                                    <div className="relative aspect-video overflow-hidden bg-dark-grey">
                                        <Image
                                            src={app.thumbnailImage}
                                            alt={app.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Status Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span
                                                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${app.status === "live"
                                                    ? "bg-green-500 text-black"
                                                    : app.status === "beta"
                                                        ? "bg-primary text-black"
                                                        : "bg-white/20 text-white"
                                                    }`}
                                            >
                                                {app.status === "coming-soon" ? "Coming Soon" : app.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <h2 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                                            {app.title}
                                        </h2>

                                        <p className="text-primary text-lg mb-4">
                                            {app.tagline}
                                        </p>

                                        <p className="text-foreground/70 text-sm mb-6 flex-1">
                                            {app.summary}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {app.techStack.slice(0, 4).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-1 bg-white/5 border border-white/10 text-xs text-foreground/60"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <Link href={`/apps/${app.id}`}>
                                            <button className="w-full px-6 py-4 bg-primary text-black font-bold hover:bg-primary/90 transition-all text-sm">
                                                Learn More
                                                <ArrowRight className="inline ml-2 w-4 h-4" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </AnimatedElement>
                        ))}

                        {/* Coming Soon Placeholder (if only 1 app) */}
                        {apps.length === 1 && (
                            <AnimatedElement delay={200}>
                                <div className="border border-dashed border-white/20 h-full flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
                                    <p className="text-foreground/30 text-lg mb-2">More apps coming soon</p>
                                    <p className="text-foreground/20 text-sm">Stay tuned for new releases</p>
                                </div>
                            </AnimatedElement>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

