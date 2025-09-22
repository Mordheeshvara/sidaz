"use client"

import * as React from "react"
import {
  LayoutGrid,
  Smartphone,
  CloudOff,
  Grid2x2,
  Gamepad2,
  Zap,
  Settings,
  Shield,
  Palette,
  type LucideIcon,
} from "lucide-react"

export type ServiceItem = {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export type ServicesSectionProps = {
  className?: string
  title?: string
  subtitle?: string
  services?: ServiceItem[]
}

export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ")
}

const defaultServices: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description:
      "High-performance websites and web apps with modern stacks, accessibility, and delightful UX.",
    icon: LayoutGrid,
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    description:
      "Native-quality iOS and Android apps with smooth interactions and offline-first experiences.",
    icon: Smartphone,
  },
  {
    id: "cloud",
    title: "Cloud Solutions",
    description:
      "Scalable cloud architectures, API platforms, and DevOps pipelines optimized for reliability.",
    icon: CloudOff,
  },
  {
    id: "ai-ml",
    title: "AI & ML",
    description:
      "Intelligent features powered by applied ML, vector search, and end-to-end model integration.",
    icon: Grid2x2,
  },
  {
    id: "game-dev",
    title: "Game Development",
    description:
      "Immersive and high-performance games with engaging graphics, smooth mechanics, and cross-platform support.",
    icon: Gamepad2,
  },
  {
    id: "end-to-end",
    title: "End-to-End Development",
    description:
      "From concept to deployment, complete product lifecycle development with quality assurance.",
    icon: Zap,
  },
  {
    id: "custom-tech",
    title: "Custom Tech Solutions",
    description:
      "Tailored solutions built to meet unique business challenges and drive digital transformation.",
    icon: Settings,
  },
  {
    id: "blockchain",
    title: "Blockchain",
    description:
      "Secure decentralized apps, smart contracts, and blockchain integrations for next-gen businesses.",
    icon: Shield,
  },
  {
    id: "ui-ux",
    title: "UI / UX Design",
    description:
      "Beautiful, accessible, and user-centered designs with delightful interactions and usability.",
    icon: Palette,
  },
]

export default function ServicesSection({
  className,
  title = "Services",
  subtitle = "End-to-end product development across web, mobile, cloud, and AI—engineered for performance, reliability, and beautiful user experiences.",
  services = defaultServices,
}: ServicesSectionProps) {
  return (
    <section
      aria-labelledby="services-heading"
      className={cn("w-full max-w-full", className)}
    >
      <div className="w-full max-w-full">
        <header className="mb-8 sm:mb-10">
          <h2
            id="services-heading"
            className="font-heading text-2xl sm:text-3xl md:text-4xl tracking-tight"
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-3xl">
              {subtitle}
            </p>
          ) : null}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
          {services.map((svc) => {
            const Icon = svc.icon
            return (
              <article
                key={svc.id}
                aria-label={svc.title}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 transition-all duration-300 ease-out"
              >
                {/* Glow background */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                >
                  <div className="h-full w-full bg-[radial-gradient(120px_120px_at_20%_10%,rgba(155,140,255,0.25),transparent),radial-gradient(160px_160px_at_80%_90%,rgba(107,110,249,0.2),transparent)]" />
                </div>

                {/* Card border glow */}
                <div className="absolute inset-0 rounded-2xl ring-0 ring-primary/0 transition-all duration-300 group-hover:ring-2 group-hover:ring-primary/40" aria-hidden="true" />

                <div className="relative p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="relative">
                        <span className="absolute -inset-1 rounded-xl bg-primary/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                        <div className="relative grid h-12 w-12 place-items-center rounded-xl border border-primary/25 bg-muted/60 text-primary shadow-[0_0_0_1px_rgba(155,140,255,0.15)] transition-transform duration-300 group-hover:scale-[1.03]">
                          <Icon aria-hidden="true" className="h-6 w-6" />
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-heading text-base sm:text-lg md:text-xl leading-snug">
                        {svc.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground break-words">
                        {svc.description}
                      </p>
                    </div>
                  </div>

                  {/* Subtle lift on hover */}
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-border/80 to-transparent" aria-hidden="true" />
                </div>

                {/* Card hover motion */}
                <div className="pointer-events-none absolute inset-0 scale-[1.0] transition-transform duration-300 group-hover:scale-[1.01]" aria-hidden="true" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}