import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import AnimatedElement from "@/components/AnimatedElement";
import { siteConfig } from "@/content/site";

export const metadata = {
    title: "About",
    description: "About NoamBuilds — background, skills, and what I build.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-[100rem] mx-auto">
                    <AnimatedElement>
                        <div className="mb-16">
                            <h1 className="text-6xl md:text-8xl font-bold mb-6">
                                About <span className="text-primary">Me</span>
                            </h1>
                            <p className="text-xl text-foreground/70 max-w-3xl">
                                This page is intentionally a scaffold for now — we'll fill it with a stronger story and proof points
                                later.
                            </p>
                        </div>
                    </AnimatedElement>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Left: Profile + links */}
                        <AnimatedElement delay={100} className="lg:col-span-1">
                            <div className="border border-white/10 bg-dark-grey p-8">
                                <div className="relative w-56 h-56 mx-auto lg:mx-0 border border-white/10 overflow-hidden mb-8">
                                    <Image
                                        src="/brand/SocialProfileImage.jpg"
                                        alt={siteConfig.name}
                                        fill
                                        className="object-cover"
                                        priority={false}
                                    />
                                </div>

                                <h2 className="text-3xl font-bold mb-2">{siteConfig.name}</h2>
                                <p className="text-foreground/60 mb-8">Full-Stack Developer & System Architect</p>

                                <div className="flex items-center gap-6">
                                    <a
                                        href={`mailto:${siteConfig.links.email}`}
                                        className="text-foreground/50 hover:text-primary transition-colors"
                                        aria-label="Email"
                                    >
                                        <Mail className="w-8 h-8" />
                                    </a>
                                    <a
                                        href={siteConfig.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground/50 hover:text-primary transition-colors"
                                        aria-label="GitHub"
                                    >
                                        <Github className="w-8 h-8" />
                                    </a>
                                    <a
                                        href={siteConfig.links.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground/50 hover:text-primary transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin className="w-8 h-8" />
                                    </a>
                                </div>
                            </div>
                        </AnimatedElement>

                        {/* Right: placeholder content */}
                        <AnimatedElement delay={200} className="lg:col-span-2">
                            <div className="border border-white/10 bg-dark-grey p-8">
                                <h2 className="text-4xl font-bold mb-6">My Story (placeholder)</h2>
                                <div className="text-foreground/70 text-lg leading-relaxed space-y-6">
                                    <p>
                                        We'll use this page to explain your background, what you're optimizing for (impact, speed,
                                        maintainability), and link out to the best proof (apps + projects).
                                    </p>
                                    <p>
                                        For now, it exists so SEO/sitemap can include it and the nav never 404s.
                                    </p>
                                </div>

                                <div className="h-px w-full bg-white/10 my-10" />

                                <h2 className="text-4xl font-bold mb-6">Skills</h2>
                                <div className="flex flex-wrap gap-3">
                                    {siteConfig.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-4 py-2 bg-white/5 border border-white/10 text-foreground/80"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </AnimatedElement>
                    </div>
                </div>
            </main>
        </div>
    );
}
