"use client";

import { siteConfig } from "@/content/site";

export default function SkillsMarquee() {
    // Skills with separators as completely separate elements
    // Pattern: [Skill] [///] [Skill] [///] [Skill] [///] ...
    // Each element has equal padding = separator is perfectly centered between skills
    const SkillsWithSeparators = ({ keyPrefix }: { keyPrefix: string }) => (
        <>
            {siteConfig.skills.map((skill, i) => (
                <div key={`${keyPrefix}-${i}`} className="flex items-center">
                    {/* Skill */}
                    <span className="text-4xl md:text-6xl font-bold text-white/10 hover:text-primary/80 transition-colors cursor-default whitespace-nowrap px-6 md:px-10">
                        {skill}
                    </span>
                    {/* Separator - same padding on both sides = centered between skills */}
                    <span className="text-primary text-2xl">///</span>
                </div>
            ))}
        </>
    );

    return (
        <section className="py-12 border-y border-white/5 bg-dark-grey/50 backdrop-blur-sm overflow-hidden">
            <div className="marquee-container">
                <div className="marquee-content">
                    {/* Group 1 */}
                    <SkillsWithSeparators keyPrefix="a" />
                    {/* Group 2 - exact duplicate for seamless loop */}
                    <SkillsWithSeparators keyPrefix="b" />
                </div>
            </div>
        </section>
    );
}
