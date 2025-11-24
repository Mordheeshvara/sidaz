
"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lightbulb, Target } from "lucide-react";

export interface AboutSectionProps {
  className?: string;
  style?: React.CSSProperties;
  mission?: string;
  vision?: string;
  values?: string[];
}

function cx(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

// Define the MilestoneItem type
type MilestoneItem = {
  year: string;
  title: string;
  description: string;
};

const defaultMilestones: MilestoneItem[] = [
  {
    year: "2019",
    title: "SIDAZ Founded",
    description: "Established as an innovative design and engineering studio focused on digital transformation.",
  },
  {
    year: "2020",
    title: "50+ Successful Projects",
    description: "Delivered exceptional digital solutions with emphasis on user experience and technical excellence.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Built a world-class distributed team across multiple continents, accelerating delivery capabilities.",
  },
  {
    year: "2023",
    title: "Platform Innovation",
    description: "Launched our proprietary development platform serving 100k+ users worldwide.",
  },
  {
    year: "2025",
    title: "AI-Powered Solutions",
    description: "Integrated next-generation AI tools to revolutionize development processes and client outcomes.",
  },
];

export default function AboutSection({
  className,
  style,
  mission = "At SIDAZ, we design and engineer meaningful digital products that feel effortless, empower people, and stand the test of time through innovative technology solutions.",
  vision = "A future where technology seamlessly integrates with human needs, creating beautifully simple, accessible, and impactful digital experiences.",
  values = [
    "Innovation over convention: we embrace cutting-edge technologies and creative solutions.",
    "Human-centered design: accessible, inclusive, and intuitive experiences for everyone.",
    "Excellence in execution: consistent delivery of high-quality, reliable solutions.",
  ],
}: AboutSectionProps) {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const graphicRef = React.useRef<HTMLDivElement | null>(null);

  // Smooth tilt interaction for the right graphic
  const handlePointerMove = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (x - 0.5) * 16; // deg
    const rotateX = (0.5 - y) * 16; // deg
    setTilt({ x: rotateX, y: rotateY });
  }, []);
  const resetTilt = React.useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <section
      aria-label="About us"
      className={cx(
        "w-full max-w-full",
        "rounded-[var(--radius)]",
        "bg-card/60 backdrop-blur-xl",
        "border border-border",
        "shadow-[0_0_0_1px_rgba(155,140,255,0.05),0_20px_60px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.02)]",
        "p-5 sm:p-6 md:p-8",
        "relative overflow-hidden",
        className
      )}
      style={style}
    >
      {/* Animated Background Layers */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </motion.div>
      {/* Decorative, subtle purple gradients */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Two-column content */}
      <div className="relative z-10 grid w-full grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: Mission, Vision, Values */}
        <div className="min-w-0 order-2 lg:order-1">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading tracking-tight">
              About Us
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Our mission, vision, and values shape everything we build.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <section aria-labelledby="mission-title" className="rounded-lg bg-secondary/40 border border-border p-3 sm:p-4 lg:p-5">
              <h3 id="mission-title" className="text-base sm:text-lg lg:text-xl font-semibold">
                Mission
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-foreground/90">
                {mission}
              </p>
            </section>

            <section aria-labelledby="vision-title" className="rounded-lg bg-secondary/40 border border-border p-3 sm:p-4 lg:p-5">
              <h3 id="vision-title" className="text-base sm:text-lg lg:text-xl font-semibold">
                Vision
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-foreground/90">
                {vision}
              </p>
            </section>

            <section aria-labelledby="values-title" className="rounded-lg bg-secondary/40 border border-border p-3 sm:p-4 lg:p-5">
              <h3 id="values-title" className="text-base sm:text-lg lg:text-xl font-semibold">
                Values
              </h3>
              <ul className="mt-2 list-disc pl-4 sm:pl-5 space-y-2 text-sm sm:text-base">
                {values.map((v, i) => (
                  <li key={i} className="text-foreground/90 leading-relaxed">{v}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Right: Founder Section */}
        <div className="min-w-0 order-1 lg:order-2">
          <motion.div
            ref={graphicRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
            className={cx(
              "group relative aspect-[4/3] w-full max-w-md mx-auto lg:max-w-none",
              "rounded-lg sm:rounded-xl border border-border bg-secondary/40",
              "overflow-hidden cursor-pointer touch-manipulation"
            )}
            style={{
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 200ms ease",
              willChange: "transform",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.0, 0.0, 0.2, 1.0] as const }}
          >
            {/* Founder Image Circle */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative h-32 w-32 sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-48 lg:w-48 xl:h-64 xl:w-64">
                {/* Animated Glow Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(155,140,255,0.45),rgba(155,140,255,0.12)_60%,transparent_70%)] blur-[1px] z-0"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Rotating Gradient Border */}
                <div className="absolute inset-0 animate-[spin_14s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,rgba(155,140,255,0.8),transparent_40%,rgba(155,140,255,0.9),transparent_80%,rgba(155,140,255,0.8))] z-[1]" />

                {/* Inner Border */}
                <div className="absolute inset-2 sm:inset-3 rounded-full border-2 border-primary/60 shadow-[0_0_30px_rgba(155,140,255,0.4)_inset] z-[2]" />

                {/* BACKGROUND BOX - Behind Image */}
                <div className="absolute inset-3 sm:inset-4 rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 z-[3]" />

                {/* Founder Image - Forward Layer */}
                <motion.div
                  className="absolute inset-3 sm:inset-4 rounded-full overflow-hidden border-2 border-primary/30 z-[10]"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Image
                    src="/images/founder-sara.png"
                    alt="Founder - Sarathy"
                    fill
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 176px, (max-width: 1024px) 192px, 256px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110 relative z-[11]"
                    quality={100}
                  />
                  {/* Image Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[12]" />
                </motion.div>

                {/* Outer Glow */}
                <div className="absolute inset-0 scale-110 rounded-full bg-[radial-gradient(closest-side,transparent,transparent,rgba(107,110,249,0.25))] mix-blend-screen z-[13]" />
              </div>
            </div>

            {/* Floating Accent Elements with Content */}
            <div className="absolute inset-0">
              {/* Top-left box: Innovation First */}
              <motion.div
                className="absolute left-3 sm:left-6 top-3 sm:top-6 h-16 w-24 sm:h-20 sm:w-32 md:h-24 md:w-40 rounded-lg bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md border border-primary/30 shadow-[0_10px_30px_-10px_rgba(155,140,255,0.4)] overflow-hidden group/box"
                animate={{
                  y: [-2, 2, -2],
                  x: [-1, 1, -1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover/box:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-2 sm:p-3">
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-400 mb-1" />
                  </motion.div>
                  <p className="text-[8px] sm:text-[10px] md:text-xs font-bold text-white text-center leading-tight">Innovation</p>
                  <p className="text-[7px] sm:text-[9px] md:text-[10px] text-primary/80 text-center font-semibold">First</p>
                </div>
              </motion.div>

              {/* Bottom-right box: Client Success */}
              <motion.div
                className="absolute right-3 sm:right-6 bottom-4 sm:bottom-8 h-20 w-28 sm:h-24 sm:w-40 md:h-28 md:w-48 rounded-lg bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md border border-primary/30 shadow-[0_10px_30px_-10px_rgba(155,140,255,0.4)] overflow-hidden group/box"
                animate={{
                  y: [2, -2, 2],
                  x: [1, -1, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover/box:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-2 sm:p-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 360]
                    }}
                    transition={{
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-green-400 mb-1.5" />
                  </motion.div>
                  <p className="text-[9px] sm:text-xs md:text-sm font-bold text-white text-center leading-tight">Client</p>
                  <p className="text-[8px] sm:text-[10px] md:text-xs text-green-400/80 text-center font-semibold">Success</p>
                </div>
              </motion.div>
              <motion.div
                className="absolute left-1/2 top-1/2 h-16 w-16 sm:h-24 sm:w-24 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-lg border border-primary/30 bg-primary/10 shadow-[0_0_40px_rgba(155,140,255,0.25)]"
                animate={{
                  rotate: [45, 50, 45],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Accent glow and focus ring on hover */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-lg sm:rounded-xl ring-0 ring-primary/0 transition-all duration-300 group-hover:ring-2 group-hover:ring-primary/30"
            />
          </motion.div>

          {/* Founder Description */}
          <motion.div
            className="mt-4 sm:mt-6 space-y-2 sm:space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="text-center lg:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">Sarathy</h3>
              <p className="text-sm sm:text-base text-primary font-semibold">Founder & Visionary</p>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-center lg:text-left">
              From a spark of innovation to a global digital powerhouse. Sarathy founded SIDAZ with a singular vision: to bridge the gap between cutting-edge technology and human-centered design. What began as a passion project in 2024 has evolved into a transformative force, empowering businesses worldwide with scalable, intelligent solutions that don't just meet expectations—they redefine them.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-2">
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
              <span className="text-xs text-primary/80 font-medium">Building Tomorrow, Today</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}