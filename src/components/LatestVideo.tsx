import { Youtube, ArrowUpRight } from "lucide-react";
import AnimatedElement from "./AnimatedElement";

const LATEST_VIDEO = {
    id: "Cp317GvDKLg",
    title: "I Built an App in 72 Hours to Stop Forgetting Plans",
    highlight: "72 Hours",
    blurb: "The full build story behind Event Snap. Three days from idea to a real app on a real phone.",
    youtubeUrl: "https://youtu.be/Cp317GvDKLg",
};

export default function LatestVideo() {
    return (
        <section className="py-32 px-6 md:px-12 relative">
            {/* Top border gradient */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <AnimatedElement>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[1px] w-12 bg-primary"></div>
                            <span className="text-primary font-medium tracking-widest text-sm uppercase">
                                Latest Vlog
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
                            {LATEST_VIDEO.title.split(LATEST_VIDEO.highlight).map((part, i, arr) => (
                                <span key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <span className="text-primary">{LATEST_VIDEO.highlight}</span>
                                    )}
                                </span>
                            ))}
                        </h2>
                    </AnimatedElement>

                    <AnimatedElement delay={150}>
                        <a
                            href={LATEST_VIDEO.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 mt-6 md:mt-0 text-foreground/70 hover:text-primary transition-colors"
                        >
                            <Youtube className="w-5 h-5" />
                            <span className="text-sm uppercase tracking-widest">Watch on YouTube</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </AnimatedElement>
                </div>

                <AnimatedElement delay={100}>
                    <p className="text-foreground/70 text-xl leading-relaxed max-w-3xl mb-12">
                        {LATEST_VIDEO.blurb}
                    </p>
                </AnimatedElement>

                {/* Embed */}
                <AnimatedElement delay={200}>
                    <div className="relative aspect-video w-full overflow-hidden border border-white/10 hover:border-primary/30 transition-colors shadow-2xl shadow-primary/10">
                        <iframe
                            src={`https://www.youtube.com/embed/${LATEST_VIDEO.id}?rel=0&modestbranding=1`}
                            title={LATEST_VIDEO.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                            style={{ border: "none" }}
                        />
                    </div>
                </AnimatedElement>
            </div>
        </section>
    );
}
