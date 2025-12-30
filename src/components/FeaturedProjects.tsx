import { getFeaturedProjects } from "@/content/projects";
import { getFeaturedApps } from "@/content/apps";
import ShowcaseSection, { ShowcaseItem } from "./ShowcaseSection";

export default function FeaturedProjects() {
    const projects = getFeaturedProjects();
    const apps = getFeaturedApps();

    // Get IDs of apps already shown in FeaturedApps section
    const appIds = new Set(apps.map((app) => app.id));

    // Filter out projects that share an ID with featured apps (to avoid duplicates on homepage)
    const filteredProjects = projects.filter((project) => !appIds.has(project.id));

    // Map projects to ShowcaseItem shape
    const items: ShowcaseItem[] = filteredProjects.map((project) => ({
        id: project.id,
        title: project.title,
        summary: project.summary,
        techStack: project.techStack,
        thumbnailImage: project.thumbnailImage,
        primaryAction: {
            label: "Case Study",
            href: `/projects/${project.id}`,
        },
        githubLink: project.githubLink,
        demoLink: project.demoLink,
    }));

    return (
        <ShowcaseSection
            title="Selected Works"
            highlightedWord="Works"
            viewAllLabel="View all projects"
            viewAllHref="/projects"
            items={items}
            limit={3}
            minSlots={0}
        />
    );
}
