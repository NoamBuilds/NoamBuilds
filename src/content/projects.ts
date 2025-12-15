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
        summary: "AI-powered productivity app with smart reminders and agent-driven project planning.",
        description: `NudgeMe is a productivity application that helps users break down complex goals into manageable tasks using AI-driven planning.

The app features:
- Smart reminders that adapt to your progress
- AI agent that creates structured project plans through conversational interface
- Progress tracking with streaks and daily goals
- Visual project roadmaps with phase/task breakdown
- Built with Expo (React Native) for cross-platform mobile experience

The AI agent asks clarifying questions to understand your project context, then generates a detailed, phased plan you can edit and track over time.`,
        techStack: ["Expo", "React Native", "Supabase", "LangChain", "TypeScript"],
        thumbnailImage: "/projects/nudgeme/thumbnail.png",
        images: [
            "/projects/nudgeme/screen-1.png",
            "/projects/nudgeme/screen-2.png",
            "/projects/nudgeme/screen-3.png",
            "/projects/nudgeme/screen-4.png",
            "/projects/nudgeme/screen-5.png",
        ],
        demoLink: undefined, // Add if you have a live demo
        githubLink: "private", // Special value to show "Private repo" button
        featured: true,
        order: 1,
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
            "/projects/rekem/screen-1.png",
            "/projects/rekem/screen-2.png",
            "/projects/rekem/screen-3.png",
        ],
        demoLink: undefined, // Add if you have a live demo
        githubLink: "private",
        featured: true,
        order: 2,
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
        thumbnailImage: "/projects/platformer/thumbnail.gif",
        images: [
            "/projects/platformer/game1.gif",
            "/projects/platformer/game2.gif",
            "/projects/platformer/game3.gif",
            "/projects/platformer/game4.gif",
        ],
        demoLink: undefined,
        githubLink: "https://github.com/moanzx/Platformer",
        featured: true,
        order: 3,
    },
    // Add more projects here later
];

// Helper functions
export const getFeaturedProjects = () =>
    projects.filter(p => p.featured).sort((a, b) => a.order - b.order);

export const getProjectById = (id: string) =>
    projects.find(p => p.id === id);

