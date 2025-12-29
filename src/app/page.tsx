"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import AnimatedElement from "@/components/AnimatedElement";
import SkillsMarquee from "@/components/SkillsMarquee";
import PhilosophySection from "@/components/PhilosophySection";
import FeaturedApps from "@/components/FeaturedApps";
import FeaturedProjects from "@/components/FeaturedProjects";
import ImageBreak from "@/components/ImageBreak";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO SECTION - Full bleed carousel */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        {/* Background Carousel */}
        <HeroCarousel />

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <AnimatedElement>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-primary"></div>
                <span className="text-primary font-medium tracking-widest text-sm uppercase">
                  Fullstack Developer
                </span>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter mb-6">
                NOAM<br />
                <span className="text-stroke">BUILDS</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="text-lg md:text-xl text-foreground/90 max-w-xl leading-relaxed mb-10">
                Shipping fullstack apps, AI workflows, and products that solve real problems — from idea to live users.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="flex flex-wrap gap-4">
                <Link href="/projects">
                  <button className="bg-primary text-black hover:bg-primary/90 h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                    View Projects <ArrowRight className="inline ml-2 w-5 h-5" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold border border-white/20 bg-black/30 backdrop-blur-sm hover:bg-white/10 hover:text-primary hover:border-primary transition-colors">
                    Get in Touch
                  </button>
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Skills Marquee */}
      <SkillsMarquee />

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Featured Apps (primary) */}
      <FeaturedApps />

      {/* Featured Projects (secondary) */}
      <FeaturedProjects />

      {/* Big Image Break */}
      <ImageBreak
        imageSrc="/brand/SocialCoverImage.png"
        text={["BUILD", "SHIP", "REPEAT"]}
      />

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
}
