import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { getFeaturedProjects } from "@/content/projects";
import AnimatedElement from "./AnimatedElement";

export default function FeaturedProjects() {
    const projects = getFeaturedProjects();

    return (
        <section className="py-32 px-6 md:px-12 bg-dark-grey relative">
            {/* Top border gradient */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="max-w-[120rem] mx-auto">
                {/* Section header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <AnimatedElement>
                        <h2 className="text-5xl md:text-7xl font-bold">
                            Selected <span className="text-primary">Works</span>
                        </h2>
                    </AnimatedElement>
                    <AnimatedElement delay={200}>
                        <Link
                            href="/projects"
                            className="group flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors mt-6 md:mt-0"
                        >
                            <span className="text-sm uppercase tracking-widest">View All Projects</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </AnimatedElement>
                </div>

                {/* Projects grid */}
                <div className="flex flex-col gap-32">
                    {projects.map((project, index) => (
                        <AnimatedElement key={project.id}>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/10 pt-12 group hover:border-primary/50 transition-colors">
                                {/* Left: Project info */}
                                <div className="lg:col-span-5 flex flex-col justify-between h-full order-2 lg:order-1">
                                    <div>
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-primary text-xs">0{index + 1}</span>
                                            <div className="h-[1px] w-12 bg-white/20"></div>
                                            <span className="text-foreground/50 text-xs uppercase">
                                                {project.techStack[0]}
                                            </span>
                                        </div>

                                        <h3 className="text-4xl font-bold mb-6 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-foreground/70 text-lg leading-relaxed mb-8 font-light">
                                            {project.summary}
                                        </p>

                                        {/* Tech stack tags */}
                                        <div className="flex flex-wrap gap-3 mb-12">
                                            {project.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 border border-white/10 rounded-full text-xs text-foreground/60"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-6">
                                        <Link href={`/projects/${project.id}`}>
                                            <button className="px-6 py-3 border border-white/20 hover:bg-primary hover:text-black hover:border-primary transition-all">
                                                Case Study
                                            </button>
                                        </Link>
                                        {project.githubLink && (
                                            project.githubLink === "private" ? (
                                                <button
                                                    className="flex items-center justify-center px-6 py-3 border border-white/20 hover:border-primary hover:text-primary transition-colors cursor-default"
                                                    title="Code available on request"
                                                >
                                                    <Github className="w-5 h-5 mr-2" />
                                                    Private
                                                </button>
                                            ) : (
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center px-6 py-3 border border-white/20 hover:border-primary hover:text-primary transition-colors"
                                                >
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )
                                        )}
                                        {project.demoLink && (
                                            <a
                                                href={project.demoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center px-6 py-3 border border-white/20 hover:border-primary hover:text-primary transition-colors"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Right: Project image */}
                                <div className="lg:col-span-7 order-1 lg:order-2">
                                    <div className="relative aspect-[16/9] overflow-hidden border border-white/10 group-hover:border-primary/30 transition-colors">
                                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                                        <Image
                                            src={project.thumbnailImage}
                                            alt={project.title}
                                            fill
                                            className="object-cover grayscale-25 group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </div>
        </section>
    );
}

