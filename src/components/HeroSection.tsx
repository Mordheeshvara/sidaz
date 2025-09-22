"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  heading = "We Build Scalable Software Solutions",
  subheading = "Custom applications, modern web platforms, and enterprise-grade systems engineered for reliability, performance, and growth.",
  primaryLabel = "Get Started",
  secondaryLabel = "View Portfolio",
  primaryHref,
  secondaryHref,
  onPrimaryClick,
  onSecondaryClick,
}: HeroSectionProps) {
  // Respect reduced motion preferences for entrance/scroll indicator
  const [reduceMotion, setReduceMotion] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduceMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
      mq.addEventListener?.("change", handler);
      return () => mq.removeEventListener?.("change", handler);
    }
  }, []);

  return (
    <section
      id={id}
      className={cn(
        "relative w-full min-h-[100svh] overflow-hidden",
        "bg-background",
        "isolate",
        "flex items-center justify-center",
        className
      )}
      aria-label="Hero section"
    >
      {/* Decorative background layers */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "opacity-50 sm:opacity-60"
        )}
      >
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(139,92,246,0.15)_0%,rgba(139,92,246,0.25)_30%,transparent_70%)] sm:bg-[radial-gradient(120%_60%_at_50%_-10%,rgba(139,92,246,0.25),transparent_60%)]" />
        {/* Bottom glow */}
        <div
          className={cn(
            "absolute -bottom-20 sm:-bottom-40 left-1/2 h-[300px] w-[500px] sm:h-[420px] sm:w-[720px] -translate-x-1/2 rounded-full blur-3xl",
            "bg-[radial-gradient(closest-side,var(--ring),transparent_70%)]",
            reduceMotion ? "" : "animate-[pulse_8s_ease-in-out_infinite]"
          )}
          style={{ opacity: 0.20 }}
        />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] sm:opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:30px_30px] sm:[background-size:40px_40px] [mask-image:radial-gradient(70%_50%_at_50%_40%,black,transparent)] sm:[mask-image:radial-gradient(80%_60%_at_50%_40%,black,transparent)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
        <div
          className={cn(
            "flex w-full max-w-4xl flex-col items-center text-center",
            "will-change-transform",
            reduceMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 motion-safe:animate-[fade-in-up_700ms_cubic-bezier(.21,1,.21,1)_100ms_forwards]"
          )}
        >
          <h1
            className={cn(
              "font-heading font-bold",
              "text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
              "leading-[1.1] tracking-tight",
              "bg-clip-text text-transparent",
              "px-2 sm:px-4"
            )}
            style={{
              backgroundImage:
                "linear-gradient(92deg, var(--ring) 0%, var(--primary) 45%, color-mix(in oklab, var(--primary) 85%, white) 100%)",
              textShadow:
                "0 0 24px color-mix(in oklab, var(--primary) 28%, transparent), 0 0 48px color-mix(in oklab, var(--ring) 22%, transparent)",
            }}
          >
            {heading}
          </h1>

          <p className="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-[--foreground]/80 leading-relaxed px-4 sm:px-6">
            {subheading}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none px-4 sm:px-0">
            {primaryHref ? (
              <Button size="lg" variant="glow" asChild aria-label={primaryLabel} className="w-full sm:w-auto min-w-[140px] h-12 sm:h-11 text-base sm:text-sm">
                <Link href={primaryHref}>{primaryLabel}</Link>
              </Button>
            ) : (
              <Button size="lg" variant="glow" onClick={onPrimaryClick} aria-label={primaryLabel} className="w-full sm:w-auto min-w-[140px] h-12 sm:h-11 text-base sm:text-sm">
                {primaryLabel}
              </Button>
            )}

            {secondaryHref ? (
              <Button
                size="lg"
                variant="outline"
                asChild
                aria-label={secondaryLabel}
                className="w-full sm:w-auto min-w-[140px] h-12 sm:h-11 text-base sm:text-sm"
              >
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={onSecondaryClick}
                aria-label={secondaryLabel}
                className="w-full sm:w-auto min-w-[140px] h-12 sm:h-11 text-base sm:text-sm"
              >
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pointer-events-none absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2">
          <div
            className={cn(
              "mx-auto h-8 w-4 sm:h-9 sm:w-5 rounded-full border border-[--border] bg-transparent/20 backdrop-blur-sm",
              "relative flex items-start justify-center",
              "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),0_0_24px_rgba(107,110,249,0.15)]",
              "transition-opacity duration-300 hover:opacity-80"
            )}
          >
            <div
              className={cn(
                "mt-1.5 sm:mt-2 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[--ring]",
                reduceMotion ? "" : "animate-[scroll-dot_2s_ease-in-out_infinite]",
                "opacity-60"
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}