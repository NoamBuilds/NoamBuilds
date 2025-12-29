// App data model (for marketing landing pages)
export type App = {
    id: string;
    title: string;
    tagline: string; // Short hook (headline)
    summary: string; // 1-2 sentence description

    // Marketing content
    problem?: string; // What pain does this solve?
    solution?: string; // How does your app solve it?
    howItWorks?: { step: string; description: string }[]; // 3 simple steps
    features: { title: string; description: string }[]; // User-benefit focused

    // Media
    thumbnailImage: string;
    images: string[]; // Screenshots

    // Status & CTAs
    status: "live" | "beta" | "coming-soon";
    ctaLabel?: string;
    waitlistEnabled: boolean;
    appStoreLink?: string;
    playStoreLink?: string;

    // Display
    featured: boolean;
    order: number;

    // SEO
    category?: string;
    platforms?: string;
};

export const apps: App[] = [
    {
        id: "nudgeme",
        title: "NudgeMe",
        tagline: "Turn big goals into daily wins",
        summary: "AI-powered productivity that breaks down your ambitions into actionable steps with smart reminders that actually work.",

        problem: "You have big goals but struggle to make consistent progress. Traditional to-do apps don't understand your projects, and you lose momentum.",
        solution: "NudgeMe uses AI to understand your goals, create realistic plans, and nudge you at the right moments to keep moving forward.",

        howItWorks: [
            { step: "Tell it your goal", description: "Chat naturally about what you want to achieve" },
            { step: "Get a real plan", description: "AI breaks it into phases, tasks, and milestones" },
            { step: "Stay on track", description: "Smart reminders adapt to your progress and schedule" },
        ],

        features: [
            { title: "Conversational Planning", description: "Just describe your goal,  the AI handles the breakdown into actionable tasks" },
            { title: "Adaptive Reminders", description: "Notifications that learn your patterns and nudge you when you're most likely to act" },
            { title: "Visual Roadmaps", description: "See your entire project at a glance with phases, dependencies, and progress" },
            { title: "Streak & Progress", description: "Daily goals and streaks keep you motivated without overwhelming you" },
        ],

        thumbnailImage: "/apps/nudgeme/thumbnail.png",
        images: [
            "/apps/nudgeme/home.jpg",
            "/apps/nudgeme/chat.jpg",
            "/apps/nudgeme/plan.jpg",
            "/apps/nudgeme/roadmap.jpg",
        ],

        status: "beta",
        ctaLabel: "Join the Waitlist",
        waitlistEnabled: true,
        featured: true,
        order: 1,
        category: "ProductivityApplication",
        platforms: "iOS, Android",
    },
    {
        id: "panic-poll",
        title: "PanicPoll",
        tagline: "Fast decisions from people you trust",
        summary: "Poll your inner circle and get real answers in minutes,  not hours of back-and-forth in group chats.",

        problem: "You need quick input on a decision but group chats are chaos, and you don't want to bug people individually. By the time everyone responds, the moment has passed.",
        solution: "PanicPoll lets you create focused polls for your trusted contacts. They respond with one tap, you see results instantly, and nobody's inbox explodes.",

        howItWorks: [
            { step: "Create your circle", description: "Import contacts and organize them into groups (family, team, advisors)" },
            { step: "Launch a poll", description: "Ask your question, add options or images, set urgency" },
            { step: "Get answers fast", description: "Push notifications bring responses in, you watch results live and save them to history" },
        ],

        features: [
            { title: "Private Circles", description: "Organize contacts into trusted groups,  family, team, close friends, advisors" },
            { title: "Rich Polls", description: "Yes/No, A/B comparisons, multiple choice,  attach images for visual decisions" },
            { title: "Instant Notifications", description: "Recipients get a push, tap to vote, done. No app-hopping required" },
            { title: "Decision History", description: "Every poll saved and searchable,  reference past decisions anytime" },
        ],

        thumbnailImage: "/apps/panicpoll/thumbnail.mp4",
        images: [],

        status: "beta",
        ctaLabel: "Join PanicPoll Beta",
        waitlistEnabled: true,
        featured: true,
        order: 2,
        category: "Social",
        platforms: "iOS, Android",
    },
];

// Helper functions
export const getFeaturedApps = () =>
    apps.filter((a) => a.featured).sort((a, b) => a.order - b.order);

export const getAppById = (id: string) =>
    apps.find((a) => a.id === id);
