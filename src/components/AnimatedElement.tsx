"use client";

import { useEffect, useRef } from "react";

// Scroll-triggered fade-in animation wrapper
// Elements fade in + slide up when they enter viewport

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds before animation starts
};

export default function AnimatedElement({ 
  children, 
  className = "", 
  delay = 0 
}: AnimatedElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // IntersectionObserver watches when element enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.add("is-visible");
          }, delay);
          observer.unobserve(element); // Only animate once
        }
      },
      { threshold: 0.1 } // Trigger when 10% of element is visible
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`${className} animate-reveal`}>
      {children}
    </div>
  );
}

