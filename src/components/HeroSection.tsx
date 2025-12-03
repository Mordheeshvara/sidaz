"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";

const textVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  }),
};

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const title1 = "We Build".split("");
  const title2 = "The Future".split("");

  return (
    <section
      ref={ref}
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="container mx-auto px-4 text-center z-10 will-change-transform"
        layoutId="hero-content"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-medium text-zinc-300">
            Crafting Digital Excellence Since 2024
          </span>
        </motion.div>

        {/* Main Heading with Staggered Reveal */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-8 overflow-hidden">
          <div className="flex justify-center overflow-hidden">
            {title1.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={textVariant}
                initial="hidden"
                animate="visible"
                className="block text-white"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <div className="flex justify-center overflow-hidden">
            {title2.map((char, i) => (
              <motion.span
                key={i}
                custom={i + title1.length}
                variants={textVariant}
                initial="hidden"
                animate="visible"
                className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          World-class software solutions powered by cutting-edge AI,
          stunning design, and engineering excellence.
        </motion.p>

        {/* CTA Buttons with Magnetic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton>
            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </MagneticButton>

          <MagneticButton>
            <button
              onClick={() => {
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full border-2 border-white/20 text-white font-bold text-lg hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all"
            >
              View Our Work
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}