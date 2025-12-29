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
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <AnimatedElement>
                        <div className="text-center mb-16">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6">
                                Apps
                            </h1>
                            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                                Products I&apos;m building — from idea to launch.
                            </p>
                        </div>
                    </AnimatedElement>

                    {/* Apps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {apps.map((app, index) => (
                            <AnimatedElement key={app.id} delay={100 * index}>
                                <Link href={`/apps/${app.id}`} className="group block h-full">
                                    <div className="border border-white/10 hover:border-primary/50 rounded-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                                        {/* Image/Video */}
                                        <div className="relative aspect-video overflow-hidden bg-dark-grey">
                                            {app.thumbnailImage.endsWith('.mp4') || app.thumbnailImage.endsWith('.webm') ? (
                                                <video
                                                    src={app.thumbnailImage}
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <Image
                                                    src={app.thumbnailImage}
                                                    alt={app.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            )}
                                            {/* Status Badge */}
                                            <div className="absolute top-4 left-4 z-10">
                                                <span
                                                    className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${app.status === "live"
                                                        ? "bg-green-500/90 text-black"
                                                        : app.status === "beta"
                                                            ? "bg-primary/90 text-black"
                                                            : "bg-white/20 text-white backdrop-blur-sm"
                                                        }`}
                                                >
                                                    {app.status === "coming-soon" ? "Coming Soon" : app.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                                {app.title}
                                            </h2>

                                            <p className="text-foreground/60 mb-4 flex-1">
                                                {app.tagline}
                                            </p>

                                            {/* CTA hint */}
                                            <div className="flex items-center text-primary font-medium">
                                                Learn more
                                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
