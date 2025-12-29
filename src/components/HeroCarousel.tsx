"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide = {
    media: string;
    title: string;
    href: string;
    type: "image" | "video";
};

const slides: Slide[] = [
    {
        media: "/projects/platformer/thumbnail.mp4",
        title: "2D Platformer Engine",
        href: "/projects/platformer",
        type: "video",
    },
    {
        media: "/apps/nudgeme/thumbnail.png",
        title: "NudgeMe",
        href: "/apps/nudgeme",
        type: "image",
    },
    {
        media: "/projects/rekem/thumbnail.png",
        title: "Rekem",
        href: "/projects/rekem",
        type: "image",
    },
];

export default function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goToNext = useCallback(() => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
            setIsTransitioning(false);
        }, 500); // Match CSS transition duration
    }, []);

    // Auto-advance every 5 seconds
    useEffect(() => {
        const interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    }, [goToNext]);

    const currentSlide = slides[currentIndex];

    return (
        <div className="absolute inset-0 w-full h-full">
            {/* Background Media */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"
                    }`}
            >
                {currentSlide.type === "video" ? (
                    <video
                        key={currentSlide.media}
                        src={currentSlide.media}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <Image
                        key={currentSlide.media}
                        src={currentSlide.media}
                        alt={currentSlide.title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
            </div>

            {/* Gradient Overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

            {/* Current Project Badge - Bottom Left */}
            <Link
                href={currentSlide.href}
                className="absolute bottom-8 left-6 md:left-12 z-20 group"
            >
                <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:border-primary/50 transition-all">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                        {currentSlide.title}
                    </span>
                </div>
            </Link>

            {/* Slide Indicators - Bottom Right */}
            <div className="absolute bottom-8 right-6 md:right-12 z-20 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setIsTransitioning(true);
                            setTimeout(() => {
                                setCurrentIndex(index);
                                setIsTransitioning(false);
                            }, 500);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                ? "bg-primary w-6"
                                : "bg-white/30 hover:bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
