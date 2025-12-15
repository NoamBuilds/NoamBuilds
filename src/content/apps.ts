// App data model (for marketing/product pages)
export type App = {
    id: string; // URL-safe slug
    title: string;
    tagline: string; // Short marketing hook
    summary: string; // Slightly longer description
    features: string[]; // Key selling points (3-5)
    techStack: string[]; // Technologies used
    thumbnailImage: string; // Path to thumbnail (in /public)
    images: string[]; // Screenshots for landing page
    status: "live" | "beta" | "coming-soon"; // App status
    ctaLabel?: string; // Custom CTA label (default: "Join waitlist")
    ctaLink?: string; // Custom CTA link (default: /apps/[id])
    appStoreLink?: string; // iOS App Store
    playStoreLink?: string; // Google Play Store
    waitlistEnabled: boolean; // Show waitlist form?
    featured: boolean; // Show on homepage?
    order: number; // Display order (lower = first)
};

export const apps: App[] = [
    {
        id: "nudgeme",
        title: "NudgeMe",
        tagline: "Your AI-powered productivity companion",
        summary: "Break down complex goals into manageable tasks with AI-driven planning. Smart reminders that adapt to your progress.",
        features: [
            "AI agent creates structured project plans through conversation",
            "Smart reminders that adapt to your progress",
            "Visual project roadmaps with phase/task breakdown",
            "Progress tracking with streaks and daily goals",
            "Cross-platform mobile experience",
        ],
        techStack: ["Expo", "React Native", "Supabase", "LangChain", "TypeScript"],
        thumbnailImage: "/projects/nudgeme/thumbnail.png",
        images: [
            "/projects/nudgeme/screen-1.png",
            "/projects/nudgeme/screen-2.png",
            "/projects/nudgeme/screen-3.png",
        ],
        status: "beta",
        ctaLabel: "Join waitlist",
        waitlistEnabled: true,
        featured: true,
        order: 1,
    },
    // More apps will go here
];

// Helper functions
export const getFeaturedApps = () =>
    apps.filter((a) => a.featured).sort((a, b) => a.order - b.order);

export const getAppById = (id: string) =>
    apps.find((a) => a.id === id);

