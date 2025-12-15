"use client";

import { siteConfig } from "@/content/site";
import {
    Mail,
    Github,
    Linkedin,
    Instagram,
    Facebook,
    Youtube,
} from "lucide-react";

// Custom X (Twitter) icon since Lucide doesn't have the new X logo
function XIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

// Custom TikTok icon
function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    );
}

// Custom Threads icon
function ThreadsIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.88-.73 2.082-1.168 3.59-1.304 1.217-.11 2.334-.068 3.32.09.09-.715.05-1.373-.127-1.946-.262-.849-.79-1.497-1.528-1.873-.812-.414-1.89-.608-3.206-.578-1.202.026-2.25.303-3.116.823-1.008.604-1.706 1.49-2.076 2.634l-1.973-.546c.49-1.54 1.437-2.767 2.816-3.647 1.263-.806 2.748-1.227 4.416-1.254 1.678-.036 3.103.24 4.238.82 1.22.624 2.093 1.6 2.522 2.822.346.984.452 2.103.315 3.322 1.075.564 1.922 1.356 2.481 2.356.745 1.333 1.07 3.143.238 5.106-.987 2.327-2.964 3.477-5.882 3.662l.004.008zm-2.197-5.705c-.236 0-.473.012-.715.037-1.036.094-1.855.381-2.435.854-.543.443-.81.979-.775 1.553.037.636.396 1.188 1.01 1.553.577.343 1.32.49 2.148.426 1.404-.075 2.387-.566 2.923-1.46.396-.661.614-1.593.647-2.769-.79-.128-1.703-.194-2.803-.194z" />
        </svg>
    );
}

type SocialLinksProps = {
    size?: "sm" | "md" | "lg";
    showLabels?: boolean;
    className?: string;
    // Which links to show (defaults to all)
    include?: ("github" | "linkedin" | "instagram" | "tiktok" | "facebook" | "youtube" | "x" | "threads")[];
};

const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
};

export default function SocialLinks({
    size = "md",
    showLabels = false,
    className = "",
    include,
}: SocialLinksProps) {
    const iconClass = sizeClasses[size];
    const { links } = siteConfig;

    const allLinks = [
        // { key: "email", href: `mailto:${links.email}`, icon: Mail, label: "Email" },
        { key: "github", href: links.github, icon: Github, label: "GitHub" },
        { key: "linkedin", href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
        { key: "instagram", href: links.instagram, icon: Instagram, label: "Instagram" },
        { key: "tiktok", href: links.tiktok, icon: TikTokIcon, label: "TikTok" },
        { key: "facebook", href: links.facebook, icon: Facebook, label: "Facebook" },
        { key: "youtube", href: links.youtube, icon: Youtube, label: "YouTube" },
        { key: "x", href: links.x, icon: XIcon, label: "X" },
        { key: "threads", href: links.threads, icon: ThreadsIcon, label: "Threads" },
    ];

    const linksToShow = include
        ? allLinks.filter(link => include.includes(link.key as typeof include[number]))
        : allLinks;

    return (
        <div className={`flex flex-wrap items-center gap-6 ${className}`}>
            {linksToShow.map(({ key, href, icon: Icon, label }) => (
                <a
                    key={key}
                    href={href}
                    target={key === "email" ? undefined : "_blank"}
                    rel={key === "email" ? undefined : "noopener noreferrer"}
                    className="text-foreground/50 hover:text-primary transition-colors transform hover:scale-110 duration-300"
                    aria-label={label}
                    title={label}
                >
                    {showLabels ? (
                        <span className="flex items-center gap-2">
                            <Icon className={iconClass} />
                            <span className="text-sm">{label}</span>
                        </span>
                    ) : (
                        <Icon className={iconClass} />
                    )}
                </a>
            ))}
        </div>
    );
}
