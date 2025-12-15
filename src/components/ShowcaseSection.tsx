import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import AnimatedElement from "./AnimatedElement";

// Generic item shape that both Apps and Projects can map to
export type ShowcaseItem = {
    id: string;
    title: string;
    summary: string;
    techStack: string[];
    thumbnailImage: string;
    // Actions
    primaryAction: {
        label: string;
        href: string;
    };
    githubLink?: string | "private"; // "private" shows special button
    demoLink?: string;
    // Optional badge
    badge?: string; // e.g., "Beta", "Coming soon"
};

type ShowcaseSectionProps = {
    title: string;
    highlightedWord?: string; // Word to highlight in primary color
    viewAllLabel?: string;
    viewAllHref?: string;
    items: ShowcaseItem[];
    limit?: number; // Max items to show
    minSlots?: number; // Fill remaining with "Coming soon" if fewer items
    comingSoonText?: string;
};

export default function ShowcaseSection({
    title,
    highlightedWord,
    viewAllLabel = "View all",
    viewAllHref,
    items,
    limit = 3,
    minSlots = 0,
    comingSoonText = "More coming soon",
}: ShowcaseSectionProps) {
    // Limit items
    const displayItems = items.slice(0, limit);

    // Calculate how many "coming soon" placeholders we need
    const placeholderCount = Math.max(0, minSlots - displayItems.length);

    // Split title to highlight word
    const renderTitle = () => {
        if (!highlightedWord || !title.includes(highlightedWord)) {
            return title;
        }
        const parts = title.split(highlightedWord);
        return (
            <>
                {parts[0]}
                <span className="text-primary">{highlightedWord}</span>
                {parts[1]}
            </>
        );
    };

    return (
        <section className="py-32 px-6 md:px-12 bg-dark-grey relative">
            {/* Top border gradient */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="max-w-[120rem] mx-auto">
                {/* Section header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <AnimatedElement>
                        <h2 className="text-5xl md:text-7xl font-bold">{renderTitle()}</h2>
                    </AnimatedElement>
                    {viewAllHref && (
                        <AnimatedElement delay={200}>
                            <Link
                                href={viewAllHref}
                                className="group flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors mt-6 md:mt-0"
                            >
                                <span className="text-sm uppercase tracking-widest">{viewAllLabel}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </AnimatedElement>
                    )}
                </div>

                {/* Items grid */}
                <div className="flex flex-col gap-32">
                    {displayItems.map((item, index) => (
                        <AnimatedElement key={item.id}>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/10 pt-12 group hover:border-primary/50 transition-colors">
                                {/* Left: Item info */}
                                <div className="lg:col-span-5 flex flex-col justify-between h-full order-2 lg:order-1">
                                    <div>
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-primary text-xs">0{index + 1}</span>
                                            <div className="h-[1px] w-12 bg-white/20"></div>
                                            {item.badge ? (
                                                <span className="text-primary text-xs uppercase px-2 py-0.5 border border-primary/30 rounded">
                                                    {item.badge}
                                                </span>
                                            ) : (
                                                <span className="text-foreground/50 text-xs uppercase">
                                                    {item.techStack[0]}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-4xl font-bold mb-6 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-foreground/70 text-lg leading-relaxed mb-8 font-light">
                                            {item.summary}
                                        </p>

                                        {/* Tech stack tags */}
                                        <div className="flex flex-wrap gap-3 mb-12">
                                            {item.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 border border-white/10 rounded-full text-xs text-foreground/60"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex flex-wrap gap-4">
                                        <Link href={item.primaryAction.href}>
                                            <button className="px-6 py-3 bg-primary text-black font-bold hover:bg-primary/90 transition-all">
                                                {item.primaryAction.label}
                                                <ArrowRight className="inline ml-2 w-4 h-4" />
                                            </button>
                                        </Link>
                                        {item.githubLink && (
                                            item.githubLink === "private" ? (
                                                <button
                                                    className="flex items-center justify-center px-6 py-3 border border-white/20 hover:border-primary hover:text-primary transition-colors cursor-default"
                                                    title="Code available on request"
                                                >
                                                    <Github className="w-5 h-5 mr-2" />
                                                    Private
                                                </button>
                                            ) : (
                                                <a
                                                    href={item.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center px-6 py-3 border border-white/20 hover:border-primary hover:text-primary transition-colors"
                                                >
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )
                                        )}
                                        {item.demoLink && (
                                            <a
                                                href={item.demoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center px-6 py-3 border border-white/20 hover:border-primary hover:text-primary transition-colors"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Right: Item image */}
                                <div className="lg:col-span-7 order-1 lg:order-2">
                                    <div className="relative aspect-[16/9] overflow-hidden border border-white/10 group-hover:border-primary/30 transition-colors">
                                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                                        <Image
                                            src={item.thumbnailImage}
                                            alt={item.title}
                                            fill
                                            className="object-cover grayscale-[25%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimatedElement>
                    ))}

                    {/* Coming soon placeholders */}
                    {Array.from({ length: placeholderCount }).map((_, i) => (
                        <AnimatedElement key={`placeholder-${i}`} delay={100 * (displayItems.length + i)}>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/10 pt-12">
                                <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-primary/50 text-xs">0{displayItems.length + i + 1}</span>
                                        <div className="h-[1px] w-12 bg-white/10"></div>
                                        <span className="text-foreground/30 text-xs uppercase">Coming soon</span>
                                    </div>
                                    <h3 className="text-4xl font-bold mb-6 text-foreground/20">
                                        {comingSoonText}
                                    </h3>
                                    <p className="text-foreground/30 text-lg">
                                        Follow along for updates on the next project.
                                    </p>
                                </div>
                                <div className="lg:col-span-7 order-1 lg:order-2">
                                    <div className="relative aspect-[16/9] overflow-hidden border border-white/5 bg-white/5 flex items-center justify-center">
                                        <span className="text-foreground/20 text-2xl font-bold">?</span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </div>
        </section>
    );
}

