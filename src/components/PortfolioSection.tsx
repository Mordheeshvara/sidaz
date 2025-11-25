"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, AppWindow, FolderKanban, ArrowUpRight, Layers, Smartphone, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Category = "All" | "Web" | "Mobile";

export type Project = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  features: string[];
  tech: string[];
  images: string[];
  links?: {
    github?: string;
    demo?: string;
  };
  featured?: boolean;
};

const defaultProjects: Project[] = [
  {
    id: "p1",
    title: "Study Sync",
    category: "Mobile",
    description: "Comprehensive learning management ecosystem streamlining academic operations.",
    challenge: "Inefficient tracking of student attendance and assignments.",
    solution: "Robust Flutter-based mobile platform with real-time Firebase sync.",
    results: ["40% Admin Workload Reduced", "95% Student Engagement", "Real-time Sync"],
    features: ["Real-time Notifications", "Assignment Submission", "Attendance Tracking"],
    tech: ["Flutter", "Dart", "Firebase"],
    images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop"],
    links: { demo: "#" },
    featured: true
  },
  {
    id: "p2",
    title: "HR Portal",
    category: "Web",
    description: "Intelligent recruitment and workforce management platform.",
    challenge: "Manual resume screening causing long hiring cycles.",
    solution: "Scalable Next.js app with automated Kanban tracking.",
    results: ["50% Faster Hiring", "10k+ Resumes Managed", "Automated Workflow"],
    features: ["Kanban Tracking", "Resume Parsing", "Job Management"],
    tech: ["Next.js", "MongoDB", "Node.js"],
    images: ["https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1920&auto=format&fit=crop"],
    links: { demo: "#" }
  },
  {
    id: "p3",
    title: "Blood Link",
    category: "Mobile",
    description: "Life-saving network connecting donors with hospitals.",
    challenge: "Critical delays in finding blood donors during emergencies.",
    solution: "Geolocation-based app for instant donor matching.",
    results: ["5k+ Donors", "60% Faster Response", "20+ Hospitals"],
    features: ["Geolocation", "Emergency Broadcasts", "Donor History"],
    tech: ["Flutter", "Google Maps", "Firebase"],
    images: ["https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=1920&auto=format&fit=crop"],
    links: { demo: "#" }
  },
  {
    id: "p4",
    title: "MineSafe IoT",
    category: "Mobile",
    description: "IoT-enabled tire pressure monitoring for mining fleets.",
    challenge: "Frequent tire failures causing expensive downtime.",
    solution: "IoT mobile solution analyzing sensor data in real-time.",
    results: ["30% Downtime Reduction", "$500k Savings", "Safety Compliance"],
    features: ["Real-time Sensors", "Predictive Alerts", "Offline Mode"],
    tech: ["Flutter", "IoT", "Bluetooth LE"],
    images: ["https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1920&auto=format&fit=crop"],
    links: { demo: "#" }
  },
  {
    id: "p5",
    title: "Lactation Hub",
    category: "Web",
    description: "Global digital health platform for breastfeeding support.",
    challenge: "Lack of accessible professional lactation guidance.",
    solution: "Content-rich platform with virtual consultations.",
    results: ["50+ Countries", "1k+ Articles", "500+ Consults"],
    features: ["Expert CMS", "Virtual Consults", "Community Forum"],
    tech: ["Next.js", "Sanity CMS", "Tailwind"],
    images: ["/images/team/gbc-logo.png"],
    links: { demo: "https://www.globalbreastfeedingclinic.com/" }
  },
];

const categories: Category[] = ["All", "Web", "Mobile"];

// 3D Tilt Card Component
const ProjectCard = ({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x);
  const mouseY = useSpring(y);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative cursor-pointer rounded-3xl bg-zinc-900/50 border border-white/10 overflow-hidden",
        project.featured ? "md:col-span-2 md:row-span-2 h-[500px]" : "h-[300px]"
      )}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
      }}
    >
      {/* Background Image with Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center gap-2 mb-3">
            <span className={cn(
              "px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-md border",
              project.category === "Mobile"
                ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                : "bg-teal-500/10 text-teal-400 border-teal-500/20"
            )}>
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full uppercase tracking-wider backdrop-blur-md">
                Featured
              </span>
            )}
          </div>

          <h3 className={cn(
            "font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors",
            project.featured ? "text-4xl" : "text-2xl"
          )}>
            {project.title}
          </h3>

          <p className={cn(
            "text-zinc-400 line-clamp-2 mb-4 transition-colors group-hover:text-zinc-300",
            project.featured ? "text-lg" : "text-sm"
          )}>
            {project.description}
          </p>

          {/* Reveal on Hover */}
          <div className="flex flex-wrap gap-2 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="text-xs text-zinc-300 bg-white/10 px-2 py-1 rounded backdrop-blur-sm">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Arrow */}
        <div className="absolute top-6 right-6 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PortfolioSection({ className }: { className?: string }) {
  const [active, setActive] = React.useState<Category>("All");
  const [selected, setSelected] = React.useState<Project | null>(null);
  const [open, setOpen] = React.useState(false);

  const filtered = active === "All" ? defaultProjects : defaultProjects.filter(p => p.category === active);

  return (
    <section className={cn(
      "relative w-full py-32 overflow-hidden",
      "bg-gradient-to-b from-slate-950 via-[#001a1a] to-slate-950", // Teal/Cyan tinted dark background
      className
    )}>
      {/* Animated Background Elements - Cyan/Teal Theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-600/5 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6"
          >
            <Layers className="w-4 h-4" />
            <span>Our Work</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-400 to-cyan-600"
          >
            Digital Masterpieces
          </motion.h2>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                  active === cat ? "text-white" : "text-zinc-400 hover:text-white"
                )}
              >
                {active === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full shadow-lg shadow-cyan-500/25"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {cat === "Web" && <Globe className="w-3 h-3" />}
                  {cat === "Mobile" && <Smartphone className="w-3 h-3" />}
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          <AnimatePresence>
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => {
                  setSelected(project);
                  setOpen(true);
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-zinc-950 border-white/10 overflow-hidden">
          {selected && (
            <div className="flex flex-col md:flex-row h-[80vh] md:h-[600px]">
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative h-64 md:h-full bg-zinc-900">
                <Image
                  src={selected.images[0]}
                  alt={selected.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full uppercase">
                    {selected.category}
                  </span>
                </div>

                <h2 className="text-4xl font-bold text-white mb-4">{selected.title}</h2>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  {selected.description}
                </p>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Challenge</h4>
                    <p className="text-zinc-400">{selected.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Solution</h4>
                    <p className="text-zinc-400">{selected.solution}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.tech.map(t => (
                        <span key={t} className="px-3 py-1 text-xs text-zinc-300 bg-white/5 border border-white/10 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selected.links?.demo && (
                    <a
                      href={selected.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-1"
                    >
                      <span>View Live Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}