// Centralized site configuration
// Change these values to update links/text across the entire site

export const siteConfig = {
    name: "NoamBuilds",
    title: "NoamBuilds — Full-Stack Developer & System Architect",
    description: "Building robust full-stack applications with React, Expo, Supabase, and AI-driven workflows.",
    url: "https://noambuilds.com",

    // Social links
    links: {
        email: "noambuilds@gmail.com",
        github: "https://github.com/NoamBuilds",
        linkedin: "https://www.linkedin.com/company/noambuilds/",
    },

    // Navigation items
    nav: [
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ],

    // Skills for marquee
    skills: [
        "React",
        "Expo",
        "Supabase",
        "Full-Stack",
        "LangChain",
        "SQL",
        "Cursor",
    ],

    // Philosophy section
    philosophy: {
        label: "HOW I WORK",
        description: "I like moving quickly and shipping real features. I use tools like Cursor to iterate fast, but I keep the codebase organized and easy to change—so adding the next feature doesn’t turn into a rewrite.",
        headline: "I build fullstack products fast without sacrificing clean, maintainable code.",
        cards: [
            {
                title: "Full-Stack Shipping",
                description: "Taking a feature from idea → working product: frontend, backend, database, and deployment. I move fast with cursor and other AI tools, but I keep things structured so the app stays easy to extend.",
                icon: "rocket",
            },
            {
                title: "Backend Systems",
                description: "Building reliable backends and APIs: auth, data models, validation, performance, and production patterns. I mainly use Supabase today for its ease of use, scalability and features, and I’m also comfortable working with traditional databases (SSMS, MongoDB, etc.).",
                icon: "database",
            },
            {
                title: "UI & Motion",
                description: "Modern UI with real interaction and animation, not just static screens. I care about smooth flows, micro-interactions, and the kind of polish that makes an app feel alive.",
                icon: "wand-sparkles",
            },
            {
                title: "AI Workflows + Automation",
                description: "Adding AI where it creates real value: LLM features, agent-like flows, and smart automation. Also building ETL-style pipelines to move/transform data between systems when needed.",
                icon: "workflow",
            },
        ],
    },
};

