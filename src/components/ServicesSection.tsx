"use client"

import * as React from "react"
import {
  LayoutGrid,
  Smartphone,
  Cloud,
  BrainCircuit,
  Code2,
  Rocket,
  ShieldCheck,
  Palette,
  type LucideIcon,
  CheckCircle2,
  Cpu,
  Globe,
  Layers
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export type ServiceItem = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  technologies: string[]
  features: string[]
  gradient: string
}

export type ServicesSectionProps = {
  className?: string
  title?: string
  subtitle?: string
  services?: ServiceItem[]
}

const defaultServices: ServiceItem[] = [
  {
    id: "web-solutions",
    title: "Enterprise Web Solutions",
    description:
      "Scalable, high-performance web applications engineered for complex business needs. We build robust digital platforms that drive growth.",
    icon: Globe,
    technologies: ["React", "Next.js", "Node.js", "TypeScript"],
    features: ["Microservices Architecture", "Progressive Web Apps (PWA)", "SEO Optimization", "High Availability"],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "mobile-engineering",
    title: "Mobile Engineering",
    description:
      "Native-quality cross-platform mobile experiences. We deliver fluid, offline-first applications that users love.",
    icon: Smartphone,
    technologies: ["Flutter", "React Native", "iOS", "Android"],
    features: ["Offline-first Architecture", "Real-time Sync", "Native Performance", "Biometric Security"],
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture",
    description:
      "Secure, scalable cloud infrastructure designed for reliability. We optimize your deployment for speed, cost, and uptime.",
    icon: Cloud,
    technologies: ["AWS", "Azure", "Docker", "Kubernetes"],
    features: ["Serverless Computing", "CI/CD Pipelines", "Auto-scaling", "Cost Optimization"],
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    id: "ai-systems",
    title: "AI & Intelligent Systems",
    description:
      "Next-generation applications powered by applied AI. We integrate machine learning to automate workflows and unlock insights.",
    icon: BrainCircuit,
    technologies: ["Python", "TensorFlow", "OpenAI", "LangChain"],
    features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "Automated Agents"],
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "blockchain",
    title: "Blockchain Solutions",
    description:
      "Decentralized applications and smart contracts for the Web3 era. We build secure, transparent, and immutable systems.",
    icon: ShieldCheck,
    technologies: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts"],
    features: ["DeFi Protocols", "NFT Marketplaces", "Tokenomics", "Security Audits"],
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    id: "product-design",
    title: "Product Design & Strategy",
    description:
      "User-centric design that bridges business goals with user needs. We craft intuitive interfaces that delight and convert.",
    icon: Palette,
    technologies: ["Figma", "Motion", "User Research", "Prototyping"],
    features: ["Design Systems", "User Journey Mapping", "Interactive Prototypes", "Accessibility (a11y)"],
    gradient: "from-rose-500/20 to-orange-500/20",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.0, 0.0, 0.2, 1.0] as const,
    },
  },
}

export default function ServicesSection({
  className,
  title = "Our Expertise",
  subtitle = "We deliver end-to-end software solutions, combining engineering excellence with design thinking to solve complex business challenges.",
  services = defaultServices,
}: ServicesSectionProps) {
  return (
    <section
      aria-labelledby="services-heading"
      className={cn("w-full max-w-full py-24 relative overflow-hidden", className)}
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <Cpu className="w-4 h-4" />
            <span>Engineering Services</span>
          </div>
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60"
          >
            {title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((svc) => {
            const Icon = svc.icon
            return (
              <motion.article
                key={svc.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative h-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-colors duration-500 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.15)]"
              >
                {/* Gradient Background on Hover */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                  svc.gradient
                )} />

                <div className="relative p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-500">
                    <Icon className="w-7 h-7 text-white group-hover:text-primary transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {svc.title}
                  </h3>

                  <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                    {svc.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                      {svc.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium text-zinc-400 bg-white/5 border border-white/5 rounded-md group-hover:border-white/10 group-hover:text-zinc-300 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                    {svc.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}