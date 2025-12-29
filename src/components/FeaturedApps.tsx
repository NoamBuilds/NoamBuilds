import { getFeaturedApps } from "@/content/apps";
import ShowcaseSection, { ShowcaseItem } from "./ShowcaseSection";

export default function FeaturedApps() {
    const apps = getFeaturedApps();

    // Map apps to ShowcaseItem shape
    const items: ShowcaseItem[] = apps.map((app) => ({
        id: app.id,
        title: app.title,
        summary: app.summary,
        techStack: [], // Apps don't show tech stack on homepage
        thumbnailImage: app.thumbnailImage,
        primaryAction: {
            label: "Learn more",
            href: `/apps/${app.id}`,
        },
        githubLink: undefined,
        demoLink: app.appStoreLink || app.playStoreLink,
        badge: app.status === "beta" ? "Beta" : app.status === "coming-soon" ? "Coming soon" : undefined,
    }));

    return (
        <ShowcaseSection
            title="Featured Apps"
            highlightedWord="Apps"
            viewAllLabel="View all apps"
            viewAllHref="/apps"
            items={items}
            limit={3}
            minSlots={2}
            comingSoonText="Next app shipping soon"
        />
    );
}
