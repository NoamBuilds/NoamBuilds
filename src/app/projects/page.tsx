"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { projects } from "@/content/projects";
import AnimatedElement from "@/components/AnimatedElement";

export default function ProjectsPage() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Extract all unique tags from projects
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        projects.forEach((project) => {
            project.techStack.forEach((tech) => tags.add(tech));
        });
        return Array.from(tags).sort();
    }, []);

    // Filter projects based on selected tags
    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) return projects;
        return projects.filter((project) =>
            selectedTags.some((tag) => project.techStack.includes(tag))
        );
    }, [selectedTags]);

    const handleTagToggle = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
    };

    const clearFilters = () => setSelectedTags([]);

    return (
        <div className="min-h-screen bg-background">
            <main className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-[120rem] mx-auto">
                    {/* Header */}
                    <AnimatedElement>
                        <div className="mb-16">
                            <h1 className="text-6xl md:text-8xl font-bold mb-6">
                                Projects
                            </h1>
                            <p className="text-xl text-foreground/70 max-w-3xl">
                                A collection of full-stack applications, tools, and experiments I&apos;ve built.
                            </p>
                        </div>
                    </AnimatedElement>

                    {/* Filter Tags */}
                    {allTags.length > 0 && (
                        <AnimatedElement delay={100}>
                            <div className="flex flex-wrap gap-3 mb-16">
                                {selectedTags.length > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-4 py-2 text-sm border border-primary text-primary hover:bg-primary hover:text-black transition-all"
                                    >
                                        Clear filters
                                    </button>
                                )}
                                {allTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagToggle(tag)}
                                        className={`px-4 py-2 text-sm transition-all duration-200 border ${selectedTags.includes(tag)
                                            ? "bg-primary text-black border-primary"
                                            : "bg-transparent text-foreground/70 border-white/20 hover:border-primary/50"
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </AnimatedElement>
                    )}

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredProjects.map((project, index) => (
                            <AnimatedElement key={project.id} delay={100 * (index % 4)}>
                                <div className="group border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden h-full flex flex-col">
                                    {/* Image/Video */}
                                    <div className="relative aspect-video overflow-hidden bg-dark-grey">
                                        {project.thumbnailImage.endsWith('.mp4') || project.thumbnailImage.endsWith('.webm') ? (
                                            <video
                                                src={project.thumbnailImage}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="absolute inset-0 w-full h-full object-cover group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-500"
                                            />
                                        ) : (
                                            <Image
                                                src={project.thumbnailImage}
                                                alt={project.title}
                                                fill
                                                className="object-cover group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-500"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h2>

                                        <p className="text-foreground/70 text-sm mb-4 line-clamp-2 flex-1">
                                            {project.summary}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.techStack.slice(0, 7).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-1 bg-white/5 border border-white/10 text-xs text-foreground/60"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 7 && (
                                                <span className="px-2 py-1 text-xs text-foreground/40">
                                                    +{project.techStack.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            <Link href={`/projects/${project.id}`} className="flex-1">
                                                <button className="w-full px-4 py-3 bg-primary text-black font-bold hover:bg-primary/90 transition-all text-sm">
                                                    Case Study
                                                    <ArrowRight className="inline ml-2 w-4 h-4" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedElement>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <AnimatedElement>
                            <div className="text-center py-16">
                                <p className="text-foreground/50 text-lg">
                                    No projects found for the selected filters.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 text-primary hover:underline"
                                >
                                    Clear filters
                                </button>
                            </div>
                        </AnimatedElement>
                    )}
                </div>
            </main>
        </div>
    );
}

