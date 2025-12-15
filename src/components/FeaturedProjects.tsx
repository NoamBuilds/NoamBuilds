import { getFeaturedProjects } from "@/content/projects";
import ShowcaseSection, { ShowcaseItem } from "./ShowcaseSection";

export default function FeaturedProjects() {
    const projects = getFeaturedProjects();

    // Map projects to ShowcaseItem shape
    const items: ShowcaseItem[] = projects.map((project) => ({
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
            minSlots={0} // No placeholders for projects
        />
    );
}

