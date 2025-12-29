// Project data model
export type Project = {
    id: string; // URL-safe slug
    title: string;
    summary: string; // Short description for cards
    description: string; // Full description for detail page
    techStack: string[]; // Array of technologies
    thumbnailImage: string; // Path to thumbnail (in /public)
    images: string[]; // Additional images for detail page
    demoLink?: string; // Optional live demo URL
    githubLink?: string; // Optional GitHub URL (or "private")
    featured: boolean; // Show on homepage?
    order: number; // Display order (lower = first)
};

export const projects: Project[] = [
    {
        id: "nudgeme",
        title: "NudgeMe",
        summary: "AI-powered productivity app with conversational project planning, smart reminders, and visual roadmaps.",
        description: `NudgeMe is a mobile productivity companion that uses AI to help users break down complex goals into actionable tasks.

**Core Features:**
- AI agent that creates structured project plans through natural conversation
- Smart reminders that adapt based on user progress and behavior
- Visual project roadmaps with phase/task breakdown
- Progress tracking with streaks and daily goals
- Cross-platform mobile experience (iOS & Android)

**Technical Architecture:**
- Expo Router for file-based navigation and deep linking
- React Native with TypeScript for type-safe mobile development
- Supabase for auth, database, and real-time subscriptions
- LangChain for AI agent orchestration and structured outputs
- Custom state management for offline-first experience

**Engineering Highlights:**
- Designed conversational UI patterns for AI interactions
- Implemented adaptive reminder scheduling based on user patterns
- Built reusable component library for consistent mobile UX
- Row-level security policies for multi-tenant data isolation`,
        techStack: ["Expo", "React Native", "TypeScript", "Supabase", "LangChain", "Postgres"],
        thumbnailImage: "/apps/nudgeme/thumbnail.png",
        images: [
            "/apps/nudgeme/home.jpg",
            "/apps/nudgeme/chat.jpg",
            "/apps/nudgeme/plan.jpg",
            "/apps/nudgeme/roadmap.jpg",
        ],
        demoLink: "/apps/nudgeme",
        githubLink: "private",
        featured: true,
        order: 1,
    },
    {
        id: "panic-poll",
        title: "PanicPoll",
        summary: "Real-time polling app for crowdsourcing fast decisions from trusted contacts with push notifications and rich media support.",
        description: `PanicPoll solves the "who should I ask?" problem when you're on a deadline. Users sync contacts, build private circles, and launch rich decision requests with images, urgency flags, and multiple vote types.

**Core Features:**
- Real contact syncing with private circles and member management
- Decision composer with images, urgency levels, and multiple vote formats (Yes/No, A/B, multi-choice)
- Push notifications to alert recipients and track responses in real-time
- Inbox + History tabs for active polls and archived decisions
- Demo mode for seeding sample data and marketing screenshots

**Technical Architecture:**
- Expo Router for navigation with deep linking support
- React Native with TypeScript for cross-platform mobile
- Supabase for auth, Postgres database, and file storage
- Supabase Edge Functions for serverless push notification delivery
- Firebase Cloud Messaging (FCM) for cross-platform push
- Expo Notifications for local and remote notification handling

**Engineering Highlights:**
- Designed contact sync flow with privacy-first approach
- Built real-time voting updates with Supabase subscriptions
- Implemented push notification pipeline: Edge Function → FCM → device
- Row-level security for circle membership and poll visibility
- Attachment handling with Supabase Storage and signed URLs`,
        techStack: ["Expo Router", "React Native", "TypeScript", "Supabase", "Postgres", "Edge Functions", "FCM", "Expo Notifications"],
        thumbnailImage: "/apps/panicpoll/thumbnail.mp4",
        images: [],
        demoLink: "/apps/panic-poll",
        githubLink: "private",
        featured: true,
        order: 2,
    },
    {
        id: "rekem",
        title: "Rekem",
        summary: "Fullstack transport event manager web app, built during IBM internship.",
        description: `Rekem is a web-based management system for organizing and tracking armored vehicle transport events for reserve IDF battalions.
    
    The system includes:
    - Full CRUD control over events and transport data through a secure web interface
    - Google OAuth integration for user authentication
    - Admin tools for managing multiple battalion-related operations
    - Responsive UI optimized for both desktop and mobile use
    - Built during a professional internship under IBM mentorship
    
    The platform was designed with real operational needs in mind, balancing reliability, user experience, and system maintainability.`,
        techStack: ["React", "Node.js", "Express", "PostgreSQL", "JavaScript"],
        thumbnailImage: "/projects/rekem/thumbnail.png",
        images: [
            "/projects/rekem/screen-1.jpg",
            "/projects/rekem/screen-2.jpg",
            "/projects/rekem/screen-3.png",
        ],
        demoLink: undefined, // Add if you have a live demo
        githubLink: "private",
        featured: true,
        order: 3,
    },
    {
        id: "platformer",
        title: "2D Platformer Engine",
        summary: "Complete 2D game engine with visual level editor, physics systems, AI enemies, and particle effects built in Python/Pygame.",
        description: `A complete 2D platformer engine built in Python using Pygame. It includes a visual level editor, modular architecture, responsive physics, AI, and rendering systems. This project demonstrates solid software design and integration of multiple systems into a single cohesive game.

**Gameplay Systems:**
- Smooth player movement with gravity and velocity-based physics
- Separate X/Y collision handling for glitch-free responsiveness
- Enemy AI with edge detection, ranged attacks
- Projectile mechanics with trajectory calculation and impact detection
- Game state logic including victory/defeat, restart, and health systems

**Level Editor & Engine Architecture:**
- Visual level editor with grid snapping, layer switching, and categorized hotbar
- Multi-layer tilemap engine with collision toggles
- Automatic tile variance calculation for seamless tile connections
- JSON-based save/load system for levels and configurations
- Component-based architecture with factory patterns for entity instantiation
- Dynamic asset discovery

**Visual & Rendering Systems:**
- Sprite animation system with per-entity states (idle, run, jump, etc.)
- Smooth camera scrolling with easing and parallax background layers
- Particle systems with blending, physics, and mathematical distribution
- Multi-layer rendering with correct depth ordering
- Surface caching for efficient tile rendering

**Technical Highlights:**
- Dynamic Object Oriented design for modularity and reusability
- Grid-based spatial indexing for fast lookups and optimized collision
- State machines drive animations, game logic, and UI behavior
- JSON used across levels, assets, and animation configurations
- Organized structure across core systems: editor, gameplay, rendering, UI`,
        techStack: ["Python", "Pygame", "JSON", "Object Oriented", "Dynamic Architecture"],
        thumbnailImage: "/projects/platformer/thumbnail.mp4",
        images: [
            "/projects/platformer/Game1.gif",
            "/projects/platformer/Editor1.gif",
            "/projects/platformer/Camera1.gif",
        ],
        demoLink: undefined,
        githubLink: "https://github.com/moanzx/Platformer",
        featured: true,
        order: 4,
    },
    // Add more projects here later
];

// Helper functions
export const getFeaturedProjects = () =>
    projects.filter(p => p.featured).sort((a, b) => a.order - b.order);

export const getProjectById = (id: string) =>
    projects.find(p => p.id === id);

