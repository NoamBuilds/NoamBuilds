// App data model (for marketing landing pages)
export type App = {
    id: string;
    title: string;
    tagline: string; // Short hook (headline)
    summary: string; // 1-2 sentence description

    // Marketing content
    problem?: string; // What pain does this solve?
    problemHeading?: string; // Custom heading for problem section
    solution?: string; // How does your app solve it?
    solutionHeading?: string; // Custom heading for solution section
    howItWorks?: { step: string; description: string }[]; // 3 simple steps
    features: { title: string; description: string }[]; // User-benefit focused

    // Bottom CTA overrides
    ctaHeading?: string;
    ctaSubtitle?: string;

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
        tagline: "Your goals, actually done.",
        summary: "Describe any goal to Pip, your AI companion. Get a step-by-step journey and daily nudges that keep you moving.",

        problemHeading: "Sound familiar?",
        problem: "You've tried Notion boards, habit trackers, and to-do lists. You start strong for a week, maybe two. Then the app goes quiet on your second home screen and the goal goes back on the \"someday\" pile.\n\nThe problem isn't motivation. It's that nothing helps you figure out what to do today to actually move forward.",

        solutionHeading: "One conversation. A real plan.",
        solution: "You talk to Pip about your goal in plain language, the way you'd explain it to a friend. Pip asks a smart question or two, then builds you a real plan: phases, milestones, and daily tasks sized to your life. No templates. No blank pages. Just a plan you'll actually follow.",

        howItWorks: [
            { step: "Describe your goal", description: "Tell Pip what you want to accomplish: learn guitar, get in shape, launch a side project, write a book. Talk naturally. Pip gets it." },
            { step: "Get your journey", description: "In under two minutes, Pip builds a personalized roadmap with phases, tasks, and milestones. Drag, edit, and make it yours." },
            { step: "Show up daily", description: "Pip sends you the right nudge at the right time. Complete one small task a day, build your streak, and watch your journey come to life." },
        ],

        features: [
            { title: "AI that actually plans", description: "Pip doesn't hand you a template. It listens to your goal, asks the right questions, and builds a plan from scratch: phases, tasks, and milestones tailored to you." },
            { title: "Nudges, not nagging", description: "Smart reminders that know what you're working on and when you're most likely to act. Context-aware, well-timed, and easy to ignore on a bad day." },
            { title: "Your journey, visualized", description: "A roadmap that fills in as you make progress. Phases, milestones, and a streak counter that makes showing up feel rewarding." },
            { title: "Built for real life", description: "Skip a day? Pip adjusts. Change direction? Pip replans. Your journey adapts to how your life actually works, not the other way around." },
        ],

        ctaHeading: "Ready to actually finish something?",
        ctaSubtitle: "Join the waitlist. We're inviting the next group of beta testers soon.",

        thumbnailImage: "/apps/nudgeme/thumbnail.png",
        images: [
            "/apps/nudgeme/home.jpg",
            "/apps/nudgeme/chat.jpg",
            "/apps/nudgeme/plan.jpg",
            "/apps/nudgeme/roadmap.jpg",
        ],

        status: "beta",
        ctaLabel: "Get Early Access",
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

        thumbnailImage: "/apps/panicpoll/thumbnail.png",
        images: [
            "/apps/panicpoll/thumbnail-demo.mp4",
            "/apps/panicpoll/circles.jpg",
            "/apps/panicpoll/inbox.jpg",
            "/apps/panicpoll/create.jpg",
            "/apps/panicpoll/mypolls.jpg",
        ],

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
