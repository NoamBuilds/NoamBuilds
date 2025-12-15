import Link from "next/link";
import { ArrowRight, Mail, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/content/site";
import NeonGridBackground from "./NeonGridBackground";
import AnimatedElement from "./AnimatedElement";

export default function ContactCTA() {
    return (
        <section className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
            <NeonGridBackground />

            <div className="max-w-[120rem] mx-auto text-center relative z-10">
                <AnimatedElement>
                    <p className="text-primary font-medium tracking-widest uppercase mb-8">
                        Ready to collaborate?
                    </p>
                    <h2 className="text-5xl md:text-8xl font-bold mb-12 leading-tight">
                        Let&apos;s build something<br />
                        <span className="text-stroke">extraordinary.</span>
                    </h2>
                </AnimatedElement>

                <AnimatedElement delay={200}>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-24">
                        {/* Email button */}
                        <a
                            href={`mailto:${siteConfig.links.email}`}
                            className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-bold text-white transition-all duration-300 bg-transparent border border-white hover:bg-white hover:text-black"
                        >
                            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                            <span className="relative flex items-center gap-3 text-xl">
                                <Mail className="w-6 h-6" /> {siteConfig.links.email}
                            </span>
                        </a>

                        {/* Contact page button */}
                        <Link href="/contact">
                            <button className="h-auto py-6 px-12 text-xl bg-primary text-black hover:bg-primary/90 font-bold transition-colors">
                                Contact Form <ArrowRight className="inline ml-2 w-5 h-5" />
                            </button>
                        </Link>
                    </div>
                </AnimatedElement>

                <AnimatedElement delay={300}>
                    <div className="flex justify-center gap-12">
                        <a
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/50 hover:text-primary transition-colors transform hover:scale-110 duration-300"
                            aria-label="GitHub"
                        >
                            <Github className="w-12 h-12" />
                        </a>
                        <a
                            href={siteConfig.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/50 hover:text-primary transition-colors transform hover:scale-110 duration-300"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-12 h-12" />
                        </a>
                    </div>
                </AnimatedElement>
            </div>
        </section>
    );
}

