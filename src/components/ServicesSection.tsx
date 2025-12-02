"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Smartphone,
  Cloud,
  BrainCircuit,
  Globe,
  ArrowUpRight,
  Cpu,
  Zap,
  X,
  CheckCircle2,
  ShieldCheck,
  Palette,
  Database,
  Code2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useModal } from "@/context/ModalContext"

// --- Types ---
type ServiceItem = {
  id: string
  title: string
  description: string
  icon: React.ElementType
  colSpan: number
  gradient: string
  tags: string[]
  details: string
  features: string[]
}

// --- Data ---
const services: ServiceItem[] = [
  {
    id: "deep-ai",
    title: "Deep AI Development",
    description: "Advanced neural networks, custom LLMs, and predictive modeling. We build sophisticated AI systems that solve complex cognitive problems.",
    icon: BrainCircuit,
    colSpan: 2,
    gradient: "from-violet-600/20 to-indigo-600/20",
    tags: ["LLMs", "Neural Networks", "NLP", "Computer Vision"],
    details: "We specialize in pushing the boundaries of artificial intelligence. Our team architects custom Large Language Models (LLMs) tailored to your specific domain data, ensuring privacy and precision. From computer vision systems that automate quality control to predictive analytics that forecast market trends, we build AI that drives tangible business value.",
    features: [
      "Custom LLM Fine-tuning & RAG Pipelines",
      "Computer Vision & Image Recognition",
      "Predictive Analytics & Forecasting Models",
      "Natural Language Processing (NLP) Solutions"
    ]
  },
  {
    id: "ai-tools",
    title: "AI Tools Development",
    description: "Custom AI-powered utilities and automation agents that streamline workflows and enhance productivity.",
    icon: Zap,
    colSpan: 1,
    gradient: "from-fuchsia-600/20 to-pink-600/20",
    tags: ["Automation", "Agents", "RAG"],
    details: "Automate the mundane and empower your workforce with intelligent AI tools. We build autonomous agents that can handle complex workflows, from customer support triage to automated code generation. Our custom AI utilities integrate seamlessly into your existing stack.",
    features: [
      "Autonomous AI Agents",
      "Workflow Automation Bots",
      "Intelligent Document Processing",
      "Custom AI Copilots"
    ]
  },
  {
    id: "saas",
    title: "SaaS & Web Platforms",
    description: "Scalable, multi-tenant SaaS architectures built for global scale. We engineer subscription-based platforms with enterprise-grade security.",
    icon: Globe,
    colSpan: 2,
    gradient: "from-cyan-600/20 to-blue-600/20",
    tags: ["Next.js", "Multi-tenant", "Stripe", "Auth0"],
    details: "Building a SaaS product requires more than just code; it needs a robust, scalable foundation. We architect multi-tenant platforms that are secure, performant, and ready for global scale. From subscription management with Stripe to enterprise SSO with Auth0, we handle the complex infrastructure so you can focus on your product vision.",
    features: [
      "Multi-tenant Architecture",
      "Subscription & Billing Integration",
      "Enterprise SSO & Security",
      "Real-time Analytics Dashboards"
    ]
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    description: "Native-quality cross-platform experiences. Fluid animations and offline-first architecture.",
    icon: Smartphone,
    colSpan: 1,
    gradient: "from-violet-600/20 to-purple-600/20",
    tags: ["Flutter", "React Native", "iOS"],
    details: "Create mobile experiences that users love. We build cross-platform apps using Flutter and React Native that feel indistinguishable from native. Our focus on fluid animations, offline-first capabilities, and intuitive UX ensures high retention and engagement.",
    features: [
      "Cross-platform Development (Flutter/React Native)",
      "Offline-first Architecture",
      "High-performance Animations",
      "Native Device Feature Integration"
    ]
  },
  {
    id: "cloud-infra",
    title: "Cloud Infrastructure",
    description: "Robust, scalable, and secure cloud architectures. We optimize your infrastructure for performance and cost-efficiency.",
    icon: Cloud,
    colSpan: 1,
    gradient: "from-sky-600/20 to-blue-600/20",
    tags: ["AWS", "Azure", "Kubernetes", "Terraform"],
    details: "Your application is only as good as the infrastructure it runs on. We design and implement cloud-native architectures that are resilient, scalable, and secure. Whether you're migrating to the cloud or optimizing an existing deployment, we ensure your infrastructure can handle any load.",
    features: [
      "Cloud Migration & Strategy",
      "Serverless Architecture Design",
      "Kubernetes Orchestration",
      "DevOps & CI/CD Pipelines"
    ]
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    description: "Protecting your digital assets with enterprise-grade security solutions. We identify vulnerabilities before they become threats.",
    icon: ShieldCheck,
    colSpan: 1,
    gradient: "from-red-600/20 to-orange-600/20",
    tags: ["Pen Testing", "Audits", "Compliance", "SecOps"],
    details: "In today's digital landscape, security is paramount. We provide comprehensive security assessments, penetration testing, and compliance audits to ensure your data and applications are protected against evolving threats. We build security into every layer of your application.",
    features: [
      "Vulnerability Assessments & Pen Testing",
      "Security Compliance Audits",
      "Secure Code Review",
      "Incident Response Planning"
    ]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Crafting intuitive and engaging user experiences. We blend aesthetics with functionality to create products users love.",
    icon: Palette,
    colSpan: 1,
    gradient: "from-pink-600/20 to-rose-600/20",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
    details: "Great design is more than just pretty pixels; it's about solving problems. Our design team works closely with you to understand your users and create intuitive, engaging interfaces. From wireframes to high-fidelity prototypes, we ensure every interaction is meaningful.",
    features: [
      "User Research & Personas",
      "Wireframing & Prototyping",
      "Design Systems & Style Guides",
      "Usability Testing"
    ]
  },
  {
    id: "blockchain",
    title: "Blockchain Solutions",
    description: "Decentralized applications and smart contracts. We build transparent and secure blockchain solutions for the future web.",
    icon: Database,
    colSpan: 1,
    gradient: "from-emerald-600/20 to-teal-600/20",
    tags: ["Solidity", "Web3", "Smart Contracts", "DeFi"],
    details: "Explore the potential of decentralized technologies. We develop secure smart contracts, decentralized applications (dApps), and private blockchain solutions. Whether you're building a DeFi platform or a supply chain solution, we have the expertise to bring your vision to life.",
    features: [
      "Smart Contract Development",
      "dApp Development",
      "Tokenomics Design",
      "Blockchain Integration"
    ]
  },
  {
    id: "consulting",
    title: "Tech Consulting",
    description: "Strategic guidance for your digital transformation. We help you navigate the complex technology landscape.",
    icon: Code2,
    colSpan: 2,
    gradient: "from-amber-600/20 to-yellow-600/20",
    tags: ["Strategy", "Architecture", "Digital Transformation", "CTOaaS"],
    details: "Technology is constantly evolving, and making the right decisions can be challenging. Our consulting services provide you with the strategic guidance you need to navigate the complex technology landscape. We help you align your technology strategy with your business goals.",
    features: [
      "Technology Strategy & Roadmap",
      "Architecture Review & Optimization",
      "Digital Transformation Consulting",
      "Fractional CTO Services"
    ]
  }
]

// --- Components ---

function Card({ service, onClick }: { service: ServiceItem; onClick: () => void }) {
  return (
    <motion.div
      layoutId={`service-${service.id}`}
      onClick={onClick}
      className={cn(
        "group relative rounded-3xl overflow-hidden cursor-pointer",
        "bg-zinc-900 border border-white/5", // Opaque background = Fast
        "hover:border-white/20", // Removed heavy shadows
        service.colSpan === 2 ? "md:col-span-2" : "md:col-span-1"
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Static Gradient Hover Effect */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "bg-gradient-to-br", service.gradient
      )} />

      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="mb-6 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <service.icon className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
          {service.title}
        </h3>

        <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium text-zinc-500 bg-black/20 border border-white/5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection({ className }: { className?: string }) {
  const [selectedService, setSelectedService] = React.useState<ServiceItem | null>(null)
  const { setModalOpen, setServicesInView } = useModal();
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setServicesInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setServicesInView]);

  const handleOpenModal = (service: ServiceItem) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className={cn("relative py-32 overflow-hidden", className)}
      style={{
        background: `
          radial-gradient(circle at 0% 0%, rgba(102, 51, 153, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 100% 100%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)
        `
      }}
    >

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 text-sm font-medium mb-6">
            <Cpu className="w-4 h-4" />
            <span>Our Expertise</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 font-extrabold">
              The Impossible
            </span>
          </h2>

          <p className="text-xl text-zinc-400 leading-relaxed">
            We don't just write code; we architect digital ecosystems. From high-frequency trading platforms to AI-driven consumer apps, we build the technology that powers the future.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              service={service}
              onClick={() => handleOpenModal(service)}
            />
          ))}
        </div>
      </div>

      {/* Modal with Shared Layout Animation */}
      <AnimatePresence onExitComplete={() => setModalOpen(false)}>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/90" // No blur, faster
            />

            <motion.div
              layoutId={`service-${selectedService.id}`}
              className="relative w-full max-w-3xl bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 z-10 flex flex-col max-h-[90vh] will-change-transform" // Removed shadow-2xl, added will-change
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }} // Apple-style ease
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className={cn("h-32 w-full bg-gradient-to-b opacity-20 shrink-0", selectedService.gradient)} />

              <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                      <selectedService.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">
                        {selectedService.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedService.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 text-xs font-medium text-zinc-300 bg-white/5 rounded-full border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xl text-zinc-300 leading-relaxed mb-8">
                    {selectedService.details}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Key Features</h4>
                      <ul className="space-y-3">
                        {selectedService.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-zinc-300">
                            <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                      <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Why Choose Us?</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                        We don't just deliver code; we deliver outcomes. Our team integrates deeply with yours to ensure the solution we build drives real business growth.
                      </p>
                      <button
                        onClick={() => {
                          handleCloseModal();
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Start Project</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}