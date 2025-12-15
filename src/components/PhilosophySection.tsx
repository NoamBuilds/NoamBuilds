import { Rocket, Database, WandSparkles, Workflow } from "lucide-react";
import { siteConfig } from "@/content/site";
import AnimatedElement from "./AnimatedElement";

// Map icon names to Lucide components
const iconMap = {
    rocket: Rocket,
    database: Database,
    "wand-sparkles": WandSparkles,
    workflow: Workflow,
};

export default function PhilosophySection() {
    const { philosophy } = siteConfig;

    return (
        <section className="py-32 px-6 md:px-12 relative">
            <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left: Sticky sidebar */}
                <div className="lg:col-span-4">
                    <div className="sticky top-32">
                        <AnimatedElement>
                            <h2 className="text-4xl font-bold text-primary tracking-widest uppercase mb-4">
                                {philosophy.label}
                            </h2>
                            <div className="h-[1px] w-full bg-white/10 mb-8"></div>
                            <p className="text-foreground/50 text-xl leading-relaxed">
                                {philosophy.description}
                            </p>
                        </AnimatedElement>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-8 flex flex-col gap-24">
                    <AnimatedElement>
                        <h3 className="text-4xl md:text-6xl font-bold leading-tight">
                            {philosophy.headline.split("fast").map((part, i, arr) => (
                                <span key={i}>
                                    {part}
                                    {i < arr.length - 1 && <span className="text-primary">fast</span>}
                                </span>
                            ))}
                        </h3>
                    </AnimatedElement>

                    {/* Cards grid - items-stretch makes all cards same height */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        {philosophy.cards.map((card, index) => {
                            const Icon = iconMap[card.icon as keyof typeof iconMap];
                            return (
                                <AnimatedElement key={card.title} delay={100 * (index + 1)} className="h-full">
                                    <div className="h-full p-8 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 group cursor-default">
                                        <Icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                                        <h4 className="text-4xl font-bold mb-4">{card.title}</h4>
                                        <p className="text-foreground/60 text-lg leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                </AnimatedElement>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

