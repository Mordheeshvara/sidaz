"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

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
        "bg-[#030303]",
        "isolate",
        "flex items-center justify-center",
        className
      )}
      aria-label="Hero section"
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Main Gradient Orb */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"
        />

        {/* Secondary Gradient Orb */}
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.0, 0.0, 0.2, 1.0] as const }}
          className="flex flex-col items-center text-center max-w-5xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-zinc-200">Engineering Excellence</span>
          </motion.div>

          {/* Heading */}
          <h1 className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-8 leading-[1.1]">
            Building the <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-500 animate-gradient-x">
              Future of Digital
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl text-lg sm:text-xl text-zinc-400 leading-relaxed mb-12">
            {subheading}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                console.log('🚀 BUTTON CLICKED - Starting scroll process');

                // Function to attempt scroll with retries
                const attemptScroll = (retryCount = 0) => {
                  const maxRetries = 5;

                  // Try multiple selectors
                  const selectors = ['#contact', '[id="contact"]', 'section[id="contact"]'];
                  let element = null;

                  for (const selector of selectors) {
                    element = document.querySelector(selector);
                    if (element) {
                      console.log('✅ Found element with selector:', selector);
                      break;
                    }
                  }

                  if (element) {
                    console.log('📍 Element found:', element);

                    // Get element position
                    const rect = element.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const targetPosition = rect.top + scrollTop - 80; // 80px offset for nav

                    console.log('📊 Scroll details:', {
                      currentScroll: scrollTop,
                      targetPosition: targetPosition,
                      elementTop: rect.top
                    });

                    // Perform scroll
                    window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                    });

                    console.log('✨ Scroll initiated successfully!');
                    return true;
                  } else {
                    console.warn(`⚠️ Element not found (attempt ${retryCount + 1}/${maxRetries})`);

                    // Retry after delay
                    if (retryCount < maxRetries) {
                      setTimeout(() => {
                        console.log(`🔄 Retrying... (${retryCount + 1}/${maxRetries})`);
                        attemptScroll(retryCount + 1);
                      }, 200);
                    } else {
                      console.error('❌ Failed to find contact section after all retries');
                      alert('Contact section not found. Please scroll down manually.');
                    }
                    return false;
                  }
                };

                // Start scroll attempt
                attemptScroll();
              }}
              className="group inline-flex items-center justify-center w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-200 cursor-pointer"
            >
              {primaryLabel}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {secondaryHref ? (
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all" asChild>
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            ) : (
              <Button size="lg" variant="outline" onClick={onSecondaryClick} className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden */}
      {/* <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-zinc-500 uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-500 to-transparent" />
      </motion.div> */}
    </section>
  );
}