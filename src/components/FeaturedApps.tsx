import { getFeaturedApps } from "@/content/apps";
import ShowcaseSection, { ShowcaseItem } from "./ShowcaseSection";

export default function FeaturedApps() {
    const apps = getFeaturedApps();

    // Map apps to ShowcaseItem shape
    const items: ShowcaseItem[] = apps.map((app) => ({
        id: app.id,
        title: app.title,
        summary: app.summary,
        techStack: app.techStack,
        thumbnailImage: app.thumbnailImage,
        primaryAction: {
            label: app.ctaLabel || "Learn more",
            href: app.ctaLink || `/apps/${app.id}`,
        },
        githubLink: undefined, // Apps don't show GitHub by default
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
            minSlots={2} // Show at least 2 slots (fills with "Coming soon" if needed)
            comingSoonText="Next app shipping soon"
        />
    );
}

