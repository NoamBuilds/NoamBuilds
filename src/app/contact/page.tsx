import { Mail, Github, Linkedin } from "lucide-react";
import AnimatedElement from "@/components/AnimatedElement";
import NeonGridBackground from "@/components/NeonGridBackground";
import { siteConfig } from "@/content/site";

export const metadata = {
    title: "Contact",
    description: "Get in touch with NoamBuilds for collaborations, projects, or opportunities.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
                <NeonGridBackground />
                <div className="max-w-[100rem] mx-auto text-center relative z-10">
                    <AnimatedElement>
                        <h1 className="text-6xl md:text-8xl font-bold mb-6">
                            Get in <span className="text-primary">Touch</span>
                        </h1>
                        <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-12">
                            Whether you have a project idea, a job opportunity, or just want to connect, I'd love to hear from you.
                        </p>
                    </AnimatedElement>

                    {/* Contact Options */}
                    <AnimatedElement delay={100}>
                        <div className="flex flex-col items-center gap-8 mb-24">
                            <a
                                href={`mailto:${siteConfig.links.email}`}
                                className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-bold text-white transition-all duration-300 bg-transparent border border-white hover:bg-white hover:text-black"
                            >
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                                <span className="relative flex items-center gap-3 text-xl">
                                    <Mail className="w-6 h-6" /> {siteConfig.links.email}
                                </span>
                            </a>
                            <p className="text-foreground/50 text-sm">
                                This is a placeholder page — we'll add a proper contact form or more context later.
                            </p>
                        </div>
                    </AnimatedElement>

                    {/* Social Links */}
                    <AnimatedElement delay={200}>
                        <h2 className="text-3xl font-bold mb-8">Connect with me</h2>
                        <div className="flex justify-center gap-12">
                            <a
                                href={siteConfig.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground/50 hover:text-primary transition-colors transform hover:scale-110 duration-300"
                            >
                                <Github className="w-12 h-12" />
                            </a>
                            <a
                                href={siteConfig.links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground/50 hover:text-primary transition-colors transform hover:scale-110 duration-300"
                            >
                                <Linkedin className="w-12 h-12" />
                            </a>
                        </div>
                    </AnimatedElement>
                </div>
            </main>
        </div>
    );
}

