"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion"
import {
  Smartphone,
  Cloud,
  BrainCircuit,
  ShieldCheck,
  Palette,
  Globe,
  ArrowUpRight,
  Code2,
  Cpu,
  Zap,
  Layers
} from "lucide-react"
import { cn } from "@/lib/utils"

// --- Types ---
type ServiceItem = {
  id: string
  title: string
  description: string
  icon: React.ElementType
  colSpan: number // 1, 2, or 3 for bento grid
  gradient: string
  tags: string[]
}

const services: ServiceItem[] = [
  {
    id: "deep-ai",
    title: "Deep AI Development",
    description: "Advanced neural networks, custom LLMs, and predictive modeling. We build sophisticated AI systems that solve complex cognitive problems.",
    icon: BrainCircuit,
    colSpan: 2,
    gradient: "from-violet-600/20 to-indigo-600/20",
    tags: ["LLMs", "Neural Networks", "NLP", "Computer Vision"]
  },
  {
    id: "ai-tools",
    title: "AI Tools Development",
    description: "Custom AI-powered utilities and automation agents that streamline workflows and enhance productivity.",
    icon: Zap,
    colSpan: 1,
    gradient: "from-fuchsia-600/20 to-pink-600/20",
    tags: ["Automation", "Agents", "RAG"]
  },
  {
    id: "saas",
    title: "SaaS & Web Platforms",
    description: "Scalable, multi-tenant SaaS architectures built for global scale. We engineer subscription-based platforms with enterprise-grade security.",
    icon: Globe,
    colSpan: 2,
    gradient: "from-cyan-600/20 to-blue-600/20",
    tags: ["Next.js", "Multi-tenant", "Stripe", "Auth0"]
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    description: "Native-quality cross-platform experiences. Fluid animations and offline-first architecture.",
    icon: Smartphone,
    colSpan: 1,
    gradient: "from-emerald-600/20 to-teal-600/20",
    tags: ["Flutter", "React Native", "iOS"]
  },
  {
    id: "blockchain",
    title: "Blockchain Solutions",
    description: "Secure smart contracts, DeFi protocols, and decentralized applications (dApps).",
    icon: ShieldCheck,
    colSpan: 1,
    gradient: "from-orange-600/20 to-red-600/20",
    tags: ["Solidity", "Web3", "Smart Contracts"]
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    description: "Serverless architectures and Kubernetes orchestration for zero-downtime deployments.",
    icon: Cloud,
    colSpan: 1,
    gradient: "from-rose-600/20 to-purple-600/20",
    tags: ["AWS", "Kubernetes", "Docker"]
  },
  {
    id: "design",
    title: "Product Design",
    description: "User-centric UI/UX design that drives engagement and conversion.",
    icon: Palette,
    colSpan: 1,
    gradient: "from-amber-600/20 to-yellow-600/20",
    tags: ["Figma", "Design Systems", "Prototyping"]
  }
]

// --- Components ---

function Card({ service, index }: { service: ServiceItem; index: number }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative rounded-3xl overflow-hidden transition-all duration-500 glass-premium hover-lift-glow",
        service.colSpan === 2 ? "md:col-span-2" : "md:col-span-1"
      )}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Gradient Background */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br",
        service.gradient
      )} />

      <div className="relative h-full p-8 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <service.icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
          </div>
          <ArrowUpRight className="w-6 h-6 text-zinc-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
        </div>

        {/* Content */}
        <div className="mt-auto">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
            {service.title}
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6 group-hover:text-zinc-200 transition-colors duration-300">
            {service.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-full group-hover:text-white group-hover:border-white/20 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection({ className }: { className?: string }) {
  const containerRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={containerRef} className={cn("relative py-32 overflow-hidden", className)}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fuchsia-500/5 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <Cpu className="w-4 h-4" />
            <span>Our Expertise</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Engineering <br />
            <span className="text-shimmer font-extrabold">
              The Impossible
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 leading-relaxed"
          >
            We don't just write code; we architect digital ecosystems. From high-frequency trading platforms to AI-driven consumer apps, we build the technology that powers the future.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}