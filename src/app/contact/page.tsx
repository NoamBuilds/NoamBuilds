"use client";

import { useState } from "react";
import { Mail, Send, Loader2, Check } from "lucide-react";
import AnimatedElement from "@/components/AnimatedElement";
import NeonGridBackground from "@/components/NeonGridBackground";
import SocialLinks from "@/components/SocialLinks";
import { siteConfig } from "@/content/site";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === "loading") return;

        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setStatus("error");
                setErrorMessage(data.error || "Something went wrong");
                return;
            }

            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        } catch {
            setStatus("error");
            setErrorMessage("Network error. Please try again.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
                <NeonGridBackground />

                <div className="max-w-[100rem] mx-auto relative z-10">
                    {/* Header */}
                    <AnimatedElement>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            Get In <span className="text-primary">Touch</span>
                        </h1>
                        <p className="text-xl text-foreground/70 mb-16 max-w-3xl">
                            I&apos;m always open to discussing new opportunities, collaborations, or just chatting
                            about tech. Feel free to reach out!
                        </p>
                    </AnimatedElement>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Left: Contact Info */}
                        <AnimatedElement delay={100}>
                            <div>
                                <h2 className="text-3xl font-semibold mb-8">
                                    Contact Information
                                </h2>

                                {/* Email Card */}
                                <a
                                    href={`mailto:${siteConfig.links.email}`}
                                    className="flex items-center gap-4 text-foreground/70 hover:text-primary transition-colors duration-200 group mb-8"
                                >
                                    <div className="w-14 h-14 bg-dark-grey border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors duration-200">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-foreground/50">Email</p>
                                        <p className="text-lg">{siteConfig.links.email}</p>
                                    </div>
                                </a>

                                {/* Social Links Section */}
                                <div className="mt-12 p-8 bg-dark-grey border border-white/10">
                                    <h3 className="text-xl font-semibold mb-6">
                                        Connect with me
                                    </h3>
                                    <SocialLinks size="lg" include={["linkedin", "github", "x"]} />
                                </div>
                            </div>
                        </AnimatedElement>

                        {/* Right: Contact Form */}
                        <AnimatedElement delay={200}>
                            <div>
                                <h2 className="text-3xl font-semibold mb-8">
                                    Send a Message
                                </h2>

                                {status === "success" ? (
                                    <div className="p-8 bg-dark-grey border border-primary/30 text-center">
                                        <div className="flex justify-center mb-4">
                                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                                                <Check className="w-8 h-8 text-primary" />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
                                        <p className="text-foreground/70">
                                            Thanks for reaching out. I&apos;ll get back to you soon.
                                        </p>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="mt-6 text-primary hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm text-foreground/70 mb-2">
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                disabled={status === "loading"}
                                                className="w-full px-4 py-4 bg-dark-grey border border-white/10 text-foreground focus:outline-none focus:border-primary disabled:opacity-50 transition-colors"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm text-foreground/70 mb-2">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                disabled={status === "loading"}
                                                className="w-full px-4 py-4 bg-dark-grey border border-white/10 text-foreground focus:outline-none focus:border-primary disabled:opacity-50 transition-colors"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm text-foreground/70 mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                disabled={status === "loading"}
                                                rows={6}
                                                className="w-full px-4 py-4 bg-dark-grey border border-white/10 text-foreground focus:outline-none focus:border-primary disabled:opacity-50 resize-none transition-colors"
                                                placeholder="Your message..."
                                            />
                                        </div>

                                        {errorMessage && (
                                            <p className="text-red-400 text-sm">{errorMessage}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="w-full py-4 bg-primary text-black font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                        >
                                            {status === "loading" ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </AnimatedElement>
                    </div>
                </div>
            </main>
        </div>
    );
}
