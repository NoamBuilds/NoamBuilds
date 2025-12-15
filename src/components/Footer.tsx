import Link from "next/link";
import { siteConfig } from "@/content/site";
import SocialLinks from "./SocialLinks";

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
                    <SocialLinks size="sm" />
                </div>
            </div>
        </footer>
    );
}
