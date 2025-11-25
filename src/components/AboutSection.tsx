"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Lightbulb, Target, Award, TrendingUp, Users, Globe, ArrowRight, Star, Sparkles, Heart, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AboutSectionProps {
  className?: string;
}

const timeline = [
  { year: "2024", title: "The Spark", description: "Conceptualization of SIDAZ. Extensive market research and core team formation." },
  { year: "2025", title: "The Launch", description: "Official incorporation and launch of operations. Establishing our global headquarters." },
  { year: "Future", title: "Global Impact", description: "Scaling our innovations to empower businesses worldwide." },
];

const stats = [
  { label: "Ideation", value: "2024", suffix: "" },
  { label: "Launch", value: "2025", suffix: "" },
  { label: "Vision", value: "∞", suffix: "" },
  { label: "Passion", value: "100", suffix: "%" },
];

// Counter Component
const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function AboutSection({ className }: { className?: string }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className={cn("relative w-full py-32 overflow-hidden bg-slate-950", className)}>
      {/* Background Elements - Gold/Amber Theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950 via-[#1a1500] to-slate-950" />
        <motion.div
          style={{ y }}
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Our Story</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight"
          >
            Born in 2024. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">
              Launching the Future in 2025.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 leading-relaxed"
          >
            SIDAZ isn't just a company; it's a movement. Conceived in 2024 with a vision to redefine digital excellence, we are hitting the ground running in 2025. We blend American design principles with cutting-edge technology to build brands that don't just exist—they dominate.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {/* Mission Card - Large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-zinc-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-amber-500/30 transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Target className="w-32 h-32 text-amber-500" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                To empower businesses with digital solutions that are as beautiful as they are functional. We strip away the noise to deliver pure, high-impact results that drive growth and engagement.
              </p>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-amber-500/30 transition-colors duration-500"
          >
            <div className="grid grid-cols-2 gap-8">
              {stats.slice(0, 2).map((stat, i) => (
                <div key={i}>
                  <p className="text-4xl font-bold text-white mb-1">{stat.value}{stat.suffix}</p>
                  <p className="text-sm text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
              {stats.slice(2, 4).map((stat, i) => (
                <div key={i}>
                  <p className="text-4xl font-bold text-white mb-1">{stat.value}{stat.suffix}</p>
                  <p className="text-sm text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-amber-500/30 transition-colors duration-500"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6">
              <Lightbulb className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-zinc-400 leading-relaxed">
              To be the global standard for digital craftsmanship, where every pixel serves a purpose and every interaction tells a story.
            </p>
          </motion.div>

          {/* Values Card - Large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-zinc-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-amber-500/30 transition-colors duration-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Passion</h4>
                <p className="text-sm text-zinc-400">We love what we do, and it shows in every line of code.</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Excellence</h4>
                <p className="text-sm text-zinc-400">Good enough is never enough. We aim for perfection.</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Partnership</h4>
                <p className="text-sm text-zinc-400">We don't just work for you; we work with you.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">Our Journey</h3>
            <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />

            <div className="space-y-24">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={cn(
                    "relative flex items-center justify-between",
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  )}
                >
                  {/* Content */}
                  <div className={cn("w-[45%]", index % 2 === 0 ? "text-right" : "text-left")}>
                    <span className="text-5xl font-bold text-white/5 absolute -top-10 select-none pointer-events-none transition-colors group-hover:text-amber-500/10">
                      {item.year}
                    </span>
                    <h4 className="text-2xl font-bold text-white mb-2 relative z-10">{item.title}</h4>
                    <p className="text-zinc-400 leading-relaxed relative z-10">{item.description}</p>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 border-4 border-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] z-10" />

                  {/* Empty Space for Balance */}
                  <div className="w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Founder Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 relative p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 text-center overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <Star className="w-8 h-8 text-amber-400 mx-auto mb-6" />
          <blockquote className="text-2xl md:text-3xl font-light italic text-zinc-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            "We don't just write code; we write the future. Every line is a promise of quality, every pixel a commitment to excellence."
          </blockquote>
          <div className="flex flex-col items-center relative z-10">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.3)] mb-8 overflow-hidden group">
              <div className="absolute inset-0 rounded-full border-4 border-amber-500/50 animate-pulse-glow-emerald opacity-50" />
              <Image
                src="/images/founder-sara.png"
                alt="Founder"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <cite className="text-3xl font-bold text-white not-italic mb-2">Sarathy</cite>
            <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">Founder</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}