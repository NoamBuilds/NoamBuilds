import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { projects, getProjectById } from "@/content/projects";
import AnimatedElement from "@/components/AnimatedElement";
import ProjectGallery from "@/components/ProjectGallery";
import MarkdownContent from "@/components/MarkdownContent";
import type { Metadata } from "next";

// --- STATIC GENERATION ---
// This tells Next.js which slugs to pre-render at build time
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.id,
    }));
}

// --- DYNAMIC METADATA ---
// Each project page gets its own title/description for SEO
type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectById(slug);

    if (!project) {
        return { title: "Project Not Found" };
    }

    return {
        title: project.title,
        description: project.summary,
        openGraph: {
            title: project.title,
            description: project.summary,
            images: [project.thumbnailImage],
        },
    };
}

// --- PAGE COMPONENT ---
export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const project = getProjectById(slug);

    // 404 if project doesn't exist
    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-[100rem] mx-auto">
                    {/* Back Button */}
                    <AnimatedElement>
                        <Link
                            href="/projects"
                            className="inline-flex items-center text-foreground/70 hover:text-primary transition-colors mb-12"
                        >
                            <ArrowLeft className="mr-2 w-4 h-4" />
                            Back to Projects
                        </Link>
                    </AnimatedElement>

                    {/* Header */}
                    <AnimatedElement delay={100}>
                        <div className="mb-12">
                            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6">
                                {project.title}
                            </h1>

                            <p className="text-2xl text-foreground/70 mb-8 max-w-4xl">
                                {project.summary}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                {project.githubLink && project.githubLink !== "private" && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-primary text-black font-bold hover:bg-primary/90 transition-all"
                                    >
                                        <Github className="mr-2 w-5 h-5" />
                                        View on GitHub
                                    </a>
                                )}
                                {project.githubLink === "private" && (
                                    <span className="inline-flex items-center px-6 py-3 border border-white/20 text-foreground/50">
                                        <Github className="mr-2 w-5 h-5" />
                                        Private Repository
                                    </span>
                                )}
                                {project.demoLink && (
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-black transition-all"
                                    >
                                        <ExternalLink className="mr-2 w-5 h-5" />
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </AnimatedElement>

                    {/* Hero Image/Video */}
                    <AnimatedElement delay={200}>
                        <div className="mb-24 border border-white/10 overflow-hidden">
                            {project.thumbnailImage.endsWith('.mp4') || project.thumbnailImage.endsWith('.webm') ? (
                                <video
                                    src={project.thumbnailImage}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-auto object-cover"
                                />
                            ) : (
                                <Image
                                    src={project.thumbnailImage}
                                    alt={project.title}
                                    width={1920}
                                    height={1080}
                                    className="w-full h-auto object-cover"
                                    unoptimized={project.thumbnailImage.endsWith(".gif")}
                                />
                            )}
                        </div>
                    </AnimatedElement>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
                        {/* Left: Full Description */}
                        <AnimatedElement delay={300} className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-foreground mb-6">
                                About the Project
                            </h2>
                            <MarkdownContent content={project.description} />
                        </AnimatedElement>

                        {/* Right: Tech Stack */}
                        <AnimatedElement delay={400}>
                            <h2 className="text-3xl font-bold text-foreground mb-6">
                                Tech Stack
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-4 py-2 bg-white/5 border border-white/10 text-foreground/80 text-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </AnimatedElement>
                    </div>

                    {/* Screenshot Gallery */}
                    {project.images && project.images.length > 0 && (
                        <AnimatedElement delay={500}>
                            <h2 className="text-3xl font-bold text-foreground mb-8">
                                Screenshots
                            </h2>
                            <ProjectGallery
                                images={project.images}
                                projectTitle={project.title}
                            />
                        </AnimatedElement>
                    )}
                </div>
            </main>
        </div>
    );
}

