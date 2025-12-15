import { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

/**
 * Robots.txt for SEO — tells crawlers what they can access.
 * 
 * Next.js will serve this at /robots.txt
 * 
 * What this does:
 * - Allow all crawlers to index all pages
 * - Point them to the sitemap for efficient discovery
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
    };
}

