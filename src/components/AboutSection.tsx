"use client";

import * as React from "react";

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

        {/* Right: Interactive geometric graphic */}
        <div className="min-w-0 order-1 lg:order-2">
          <div
            ref={graphicRef}
            role="img"
            aria-label="Abstract geometric brand illustration"
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
          >
            {/* Orb layers */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative h-32 w-32 sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-48 lg:w-48 xl:h-64 xl:w-64">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(155,140,255,0.45),rgba(155,140,255,0.12)_60%,transparent_70%)] blur-[1px]" />
                <div className="absolute inset-0 animate-[spin_14s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,rgba(155,140,255,0.5),transparent_40%,rgba(155,140,255,0.6),transparent_80%,rgba(155,140,255,0.5))]" />
                <div className="absolute inset-2 sm:inset-3 rounded-full border border-primary/40 shadow-[0_0_30px_rgba(155,140,255,0.25)_inset]" />
                <div className="absolute inset-0 scale-110 rounded-full bg-[radial-gradient(closest-side,transparent,transparent,rgba(107,110,249,0.25))] mix-blend-screen" />
              </div>
            </div>

            {/* Floating panels to imply 3D */}
            <div className="absolute inset-0">
              <div className="absolute left-3 sm:left-6 top-3 sm:top-6 h-12 w-20 sm:h-16 sm:w-28 md:h-20 md:w-32 rounded-md bg-card/70 backdrop-blur-md border border-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-0.5" />
              <div className="absolute right-3 sm:right-6 bottom-4 sm:bottom-8 h-16 w-24 sm:h-20 sm:w-36 md:h-24 md:w-44 rounded-md bg-card/70 backdrop-blur-md border border-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out group-hover:translate-y-1 group-hover:-translate-x-0.5" />
              <div className="absolute left-1/2 top-1/2 h-16 w-16 sm:h-24 sm:w-24 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-lg border border-primary/30 bg-primary/10 shadow-[0_0_40px_rgba(155,140,255,0.25)] transition-transform duration-300 ease-out group-hover:scale-105" />
            </div>

            {/* Accent glow and focus ring on hover */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-lg sm:rounded-xl ring-0 ring-primary/0 transition-all duration-300 group-hover:ring-2 group-hover:ring-primary/30"
            />
          </div>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground text-center lg:text-left">
            An abstract, interactive graphic reflecting our system-first, design-led approach.
          </p>
        </div>
      </div>
    </section>
  );
}