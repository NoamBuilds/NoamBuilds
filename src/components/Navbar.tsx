"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-sm">
            <div className="max-w-[120rem] mx-auto px-6 md:px-4 py-8 flex items-center">
                {/* Logo */}
                <Link href="/" className="text-4xl text-foreground font-bold tracking-tight hover:text-primary transition-colors">
                    {siteConfig.name}
                </Link>

                {/* Nav Links */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-12">
                    {siteConfig.nav.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-xl font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-foreground/70"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

