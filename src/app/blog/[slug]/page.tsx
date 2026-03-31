import { notFound } from "next/navigation";
import { blogArticles, getBlogArticleBySlug } from "@/content/blog";
import { siteConfig } from "@/content/site";
import AnimatedElement from "@/components/AnimatedElement";
import BlogContent from "@/components/BlogContent";
import type { Metadata } from "next";

// --- STATIC GENERATION ---
export async function generateStaticParams() {
    return blogArticles.map((a) => ({ slug: a.slug }));
}

// --- DYNAMIC METADATA ---
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const article = getBlogArticleBySlug(slug);
    if (!article) return { title: "Article Not Found" };

    return {
        title: article.metaTitle,
        description: article.metaDescription,
        openGraph: {
            title: article.ogTitle,
            description: article.ogDescription,
            images: [article.ogImage],
            url: article.ogUrl,
            type: "article",
        },
        alternates: {
            canonical: `${siteConfig.url}/blog/${article.slug}`,
        },
    };
}

// --- PAGE COMPONENT ---
export default async function BlogArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = getBlogArticleBySlug(slug);

    if (!article) notFound();

    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(article.jsonLd) }}
            />

            <article className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <AnimatedElement>
                        <header className="mb-12">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                {article.headline}
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-foreground/50 text-sm">
                                <span>By {article.author}</span>
                                <span>&mdash;</span>
                                <span>{article.authorCredential}</span>
                            </div>
                            <time
                                dateTime={article.publishDate}
                                className="block mt-2 text-foreground/40 text-sm"
                            >
                                Published: {new Date(article.publishDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </header>
                    </AnimatedElement>

                    {/* Body */}
                    <AnimatedElement delay={100}>
                        <BlogContent content={article.content} />
                    </AnimatedElement>

                    {/* CTA */}
                    <AnimatedElement delay={200}>
                        <div className="mt-16 p-6 rounded-xl border border-white/10 bg-white/[0.04]">
                            <p className="text-foreground/70 text-lg leading-relaxed mb-4">
                                <strong className="font-bold text-foreground">NudgeMe</strong> is an AI goal planner that turns your goals into a structured roadmap in seconds. Currently in beta on iOS and Android.
                            </p>
                            <a
                                href="https://noambuilds.com/apps/nudgeme"
                                className="inline-block text-primary font-semibold hover:underline"
                            >
                                Join the waitlist &rarr;
                            </a>
                        </div>
                    </AnimatedElement>
                </div>
            </article>
        </div>
    );
}
