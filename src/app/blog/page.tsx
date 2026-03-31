import Link from "next/link";
import { blogArticles } from "@/content/blog";
import AnimatedElement from "@/components/AnimatedElement";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Articles on AI goal planning, personal productivity, and building better habits.",
    openGraph: {
        title: "Blog | NoamBuilds",
        description: "Articles on AI goal planning, personal productivity, and building better habits.",
    },
};

export default function BlogIndexPage() {
    return (
        <div className="min-h-screen bg-background">
            <section className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-3xl mx-auto">
                    <AnimatedElement>
                        <h1 className="text-5xl md:text-7xl font-bold mb-16">
                            Blog
                        </h1>
                    </AnimatedElement>

                    <div className="space-y-12">
                        {blogArticles.filter((a) => a.slug === "habit-tracker-vs-goal-planner").map((article, index) => (
                            <AnimatedElement key={article.slug} delay={100 * index}>
                                <Link
                                    href={`/blog/${article.slug}`}
                                    className="block group"
                                >
                                    <article className="p-8 rounded-xl bg-white/[0.04] border border-white/10 hover:border-primary/30 transition-colors">
                                        <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                                            {article.title}
                                        </h2>
                                        <p className="text-foreground/60 text-lg mb-4">
                                            {article.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-foreground/40">
                                            <span>{article.author}</span>
                                            <span>&middot;</span>
                                            <time dateTime={article.publishDate}>
                                                {new Date(article.publishDate).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </time>
                                        </div>
                                    </article>
                                </Link>
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
