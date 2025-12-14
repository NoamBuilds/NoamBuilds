"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-sm">
                <div className="max-w-[120rem] mx-auto px-4 md:px-6 py-4 md:py-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl md:text-4xl text-foreground font-bold tracking-tight hover:text-primary transition-colors"
                    >
                        {siteConfig.name}
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-12">
                        {siteConfig.nav.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-xl font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-foreground/70"}`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu - Separate from navbar, full screen overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Background overlay - same as navbar */}
                    <div className="absolute inset-0 top-[10px] bg-background/80 backdrop-blur-sm border-b border-white/10" />

                    {/* Menu content */}
                    <div className="relative z-50 flex flex-col items-center gap-8 pt-28 px-6">
                        {siteConfig.nav.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-2xl font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-foreground"}`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

