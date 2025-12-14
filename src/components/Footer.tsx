import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/content/site";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-dark-grey">
            <div className="max-w-[120rem] mx-auto px-6 md:px-12 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Left: Brand */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <Link href="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
                            {siteConfig.name}
                        </Link>
                        <p className="text-md text-foreground/50">
                            Building apps. Sharing the journey.
                        </p>
                    </div>

                    {/* Center: Copyright */}
                    <div className="border-white/5 text-center text-sm text-foreground/30">
                        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                    </div>

                    {/* Right: Social Icons */}
                    <div className="flex gap-6">
                        <a
                            href={`mailto:${siteConfig.links.email}`}
                            className="text-foreground/50 hover:text-primary transition-colors"
                            aria-label="Email"
                        >
                            <Mail className="w-10 h-10" />
                        </a>
                        <a
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/50 hover:text-primary transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="w-10 h-10" />
                        </a>
                        <a
                            href={siteConfig.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/50 hover:text-primary transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-10 h-10" />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}

