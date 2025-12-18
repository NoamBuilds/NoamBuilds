import Image from "next/image";
import AnimatedElement from "@/components/AnimatedElement";
import SocialLinks from "@/components/SocialLinks";
import { siteConfig } from "@/content/site";

export const metadata = {
    title: "About",
    description: "About NoamBuilds — background, skills, and what I build.",
};

const skillGroups = [
    {
        category: "Languages",
        skills: ["JavaScript/TypeScriptP", "Python", "SQL", "Java", "C++/C"],
    },
    {
        category: "Frameworks",
        skills: ["React", "React Native", "Node.js", "Express", "Pygame"],
    },
    {
        category: "Databases",
        skills: ["PostgreSQL", "MongoDB", "Supabase"],
    },
    {
        category: "AI/Agents",
        skills: ["Cursor", "LangChain", "Prompt Engineering"],
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-[100rem] mx-auto">
                    {/* Header */}
                    <AnimatedElement>
                        <h1 className="text-5xl md:text-7xl font-bold mb-16">
                            About <span className="text-primary">Me</span>
                        </h1>
                    </AnimatedElement>

                    {/* Bio Section */}
                    <AnimatedElement delay={100}>
                        <section className="mb-24">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
                                {/* Profile Image */}
                                <div className="lg:col-span-1">
                                    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto lg:mx-0 border rounded-full border-white/10 overflow-hidden">
                                        <Image
                                            src="/brand/ProfilePhotoWide.png"
                                            alt={siteConfig.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="mt-6 flex justify-center lg:justify-start">
                                        <SocialLinks
                                            size="md"
                                            include={["github", "linkedin", "email"]}
                                        />
                                    </div>
                                </div>

                                {/* Bio Text */}
                                <div className="lg:col-span-3">
                                    <div className="max-w-4xl">
                                        <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-6">
                                            I&apos;m a 5th-year B.Sc. Data & Information Engineering student,
                                            with a strong focus on fullstack development.
                                        </p>
                                        <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-6">
                                            I specialize in building end-to-end systems that solve real problems, from
                                            fullstack web applications to automation pipelines and AI-powered workflows.
                                        </p>
                                        <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
                                            My approach combines solid engineering fundamentals with a product mindset,
                                            ensuring that what I build is not just technically sound, but actually useful.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </AnimatedElement>

                    {/* Skills Section */}
                    <section className="mb-24">
                        <AnimatedElement>
                            <h2 className="text-4xl md:text-5xl font-bold mb-12">
                                Skills
                            </h2>
                        </AnimatedElement>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {skillGroups.map((group, index) => (
                                <AnimatedElement key={group.category} delay={100 + index * 80}>
                                    <div className="h-full bg-dark-grey border border-white/10 p-8 hover:border-primary/50 transition-colors">
                                        <h3 className="text-2xl font-semibold text-primary mb-6">
                                            {group.category}
                                        </h3>
                                        <ul className="space-y-3">
                                            {group.skills.map((skill) => (
                                                <li
                                                    key={skill}
                                                    className="text-foreground/70 text-base flex items-center"
                                                >
                                                    <span className="w-2 h-2 bg-primary/50 mr-3 flex-shrink-0"></span>
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </AnimatedElement>
                            ))}
                        </div>
                    </section>

                    {/* What I'm Looking For */}
                    {/* <AnimatedElement delay={200}>
                        <section className="bg-dark-grey border-l-4 border-primary p-8 md:p-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                What I&apos;m Looking For
                            </h2>
                            <p className="text-xl text-foreground/80 leading-relaxed mb-4">
                                I&apos;m actively seeking junior developer, internship, or student developer roles
                                where I can contribute to meaningful projects and continue growing as an engineer.
                            </p>
                            <p className="text-xl text-foreground/80 leading-relaxed">
                                I&apos;m particularly interested in backend-heavy roles, full-stack positions, or
                                opportunities working with data pipelines, automation, and AI integrations.
                            </p>
                        </section>
                    </AnimatedElement> */}
                </div>
            </main>
        </div>
    );
}
