"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Code2 } from "lucide-react";
import { TextDecode } from "@/components/ui/TextDecode";

export interface HeroSectionProps {
  id?: string;
  className?: string;
  heading?: string;
  subheading?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function HeroSection({
  id,
  className,
  heading = "Building the Future of Digital Solutions",
  subheading = "We engineer scalable, high-performance software that transforms businesses. From concept to code, we deliver excellence.",
  primaryLabel = "Let's Get Started",
  secondaryLabel = "View Our Work",
  primaryHref,
  secondaryHref,
  onPrimaryClick,
  onSecondaryClick,
}: HeroSectionProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id={id}
      className={cn(
        "relative w-full min-h-[100svh] overflow-hidden",
        "bg-gradient-to-br from-slate-950 via-violet-950/10 to-slate-950",
        "isolate",
        "flex items-center justify-center",
        className
      )}
      aria-label="Hero section"
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-cyan-500/10 animate-gradient" />

        {/* Floating Particles */}
        <motion.div
          className="absolute top-[10%] left-[10%] w-64 h-64 bg-violet-500/20 rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        {/* Badge */}


        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 will-change-transform"
        >
          Redefining <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-400 animate-gradient-x">
            Digital Excellence
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Transforming visionary ideas into world-class digital experiences.
          Precision engineering meets American design aesthetics.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative px-8 py-4 rounded-full bg-violet-600 text-white font-semibold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {secondaryHref ? (
            <Link href={secondaryHref}>
              <button className="group inline-flex items-center justify-center w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-full border-2 border-violet-500/30 text-violet-300 hover:bg-violet-500/10 hover:border-violet-500/50 backdrop-blur-sm transition-all duration-300">
                {secondaryLabel}
                <Code2 className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:rotate-12" />
              </button>
            </Link>
          ) : (
            <button
              onClick={onSecondaryClick}
              className="group inline-flex items-center justify-center w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-full border-2 border-violet-500/30 text-violet-300 hover:bg-violet-500/10 hover:border-violet-500/50 backdrop-blur-sm transition-all duration-300"
            >
              {secondaryLabel}
              <Code2 className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:rotate-12" />
            </button>
          )}
        </motion.div>


      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-xs text-violet-400 uppercase tracking-widest font-semibold">Scroll</span>
        <motion.div
          className="w-[2px] h-16 bg-gradient-to-b from-violet-500 to-transparent"
          animate={{
            scaleY: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section >
  );
}