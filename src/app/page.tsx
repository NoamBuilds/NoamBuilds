"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import NeonGridBackground from "@/components/NeonGridBackground";
import AnimatedElement from "@/components/AnimatedElement";
import SkillsMarquee from "@/components/SkillsMarquee";
import PhilosophySection from "@/components/PhilosophySection";
import FeaturedApps from "@/components/FeaturedApps";
import FeaturedProjects from "@/components/FeaturedProjects";
import ImageBreak from "@/components/ImageBreak";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  // Parallax effect: track scroll position
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll into Y position and opacity
  const yHero = useTransform(scrollYProgress, [0, 0.4], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <NeonGridBackground />

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Text content */}
          <motion.div
            className="lg:col-span-8"
            style={{ y: yHero, opacity: opacityHero }}
          >
            <AnimatedElement>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-primary"></div>
                <span className="text-primary font-medium tracking-widest text-sm uppercase">
                  Fullstack Developer
                </span>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8">
                NOAM<br />
                <span className="text-stroke">BUILDS</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl leading-relaxed mb-12 border-l-2 border-primary/30 pl-6">
                Building fullstack applications,
                intelligent automation pipelines, and AI-driven workflows and agents that solve real problems.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="flex flex-wrap gap-6">
                <Link href="/projects">
                  {/* <button className="bg-primary text-black hover:bg-primary/90 h-14 px-8 text-lg font-bold border border-primary transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                    Explore Work <ArrowRight className="inline ml-2 w-5 h-5" />
                  </button> */}
                </Link>
                <Link href="/contact">
                  <button className="h-14 px-8 text-lg font-bold border border-white/20 hover:bg-white/5 hover:text-primary hover:border-primary transition-colors">
                    Initiate Contact
                  </button>
                </Link>
              </div>
            </AnimatedElement>
          </motion.div>

          {/* Right: Brand image */}
          <motion.div
            className="hidden lg:block lg:col-span-4 relative h-[600px] w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="absolute inset-0 overflow-hidden">
              {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-30 mix-blend-overlay"></div> */}
              <Image
                src="/brand/SocialProfileImage.jpg"
                alt="NoamBuilds brand illustration"
                fill
                className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-700"
                priority
              />

            </div>
          </motion.div>
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
