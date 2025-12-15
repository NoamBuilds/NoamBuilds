import { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { apps } from "@/content/apps";
import { projects } from "@/content/projects";

/**
 * Sitemap for SEO — auto-generated from content files.
 * 
 * Next.js will serve this at /sitemap.xml
 * 
 * What this includes:
 * - Static pages (home, apps list, projects list, about, contact)
 * - Dynamic app pages (/apps/[slug])
 * - Dynamic project pages (/projects/[slug])
 * 
 * Priority guide:
 * - 1.0 = homepage (most important)
 * - 0.8 = main sections (apps/projects lists)
 * - 0.6 = detail pages (individual apps/projects)
 * - 0.5 = secondary pages (about/contact)
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/apps`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];

    // Dynamic app pages
    const appPages: MetadataRoute.Sitemap = apps.map((app) => ({
        url: `${baseUrl}/apps/${app.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    // Dynamic project pages
    const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...appPages, ...projectPages];
}

