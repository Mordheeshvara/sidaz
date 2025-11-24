"use client";

import React from "react";
import Image from "next/image";
import { Github, AppWindow, FolderKanban, Grid2x2Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  images: string[]; // Unsplash URLs only
  links?: {
    github?: string;
    demo?: string;
  };
};

interface PortfolioSectionProps {
  projects?: Project[];
  initialFilter?: Category;
  className?: string;
}

const defaultProjects: Project[] = [
  {
    id: "p1",
    title: "Study Sync",
    category: "Mobile",
    description:
      "A comprehensive learning management ecosystem streamlining academic operations for colleges.",
    challenge: "The college faced inefficiencies in tracking student attendance, managing assignments, and disseminating real-time notices, leading to communication gaps and administrative overhead.",
    solution: "We engineered a robust Flutter-based mobile platform integrated with Firebase for real-time data synchronization. The architecture supports role-based access control for students, faculty, and admins, ensuring secure and targeted information flow.",
    results: [
      "40%: Admin Workload Reduced",
      "95%: Student Engagement",
      "0ms: Real-time Latency"
    ],
    features: ["Real-time Notifications", "Assignment Submission", "Attendance Tracking", "Resource Library"],
    tech: ["Flutter", "Dart", "Firebase", "Cloud Functions"],
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1920&auto=format&fit=crop",
    ],
    links: {
      demo: "#",
    },
  },
  {
    id: "p2",
    title: "HR Management Portal",
    category: "Web",
    description:
      "An intelligent recruitment and workforce management platform for modern HR teams.",
    challenge: "Manual resume screening and disjointed applicant tracking processes were causing long hiring cycles and lost talent opportunities.",
    solution: "We developed a scalable Next.js web application with a MongoDB backend. The system features an automated Kanban-style tracking board and resume parsing capabilities to streamline the entire recruitment lifecycle.",
    results: [
      "50%: Faster Hiring Cycle",
      "10k+: Resumes Managed",
      "100%: Workflow Automation"
    ],
    features: ["Kanban Applicant Tracking", "Resume Parsing", "Job Posting Management", "Interview Scheduling"],
    tech: ["Next.js", "React", "Node.js", "MongoDB"],
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1920&auto=format&fit=crop",
    ],
    links: {
      demo: "#",
    },
  },
  {
    id: "p3",
    title: "Blood Donation App",
    category: "Mobile",
    description:
      "A life-saving network connecting donors with hospitals in real-time.",
    challenge: "Critical delays in finding specific blood types during emergencies due to lack of a centralized donor database.",
    solution: "We built a geolocation-based Flutter app that instantly notifies nearby eligible donors. The system uses real-time database triggers to match requests with donors and provides navigation support to the nearest hospital.",
    results: [
      "5k+: Donors Connected",
      "60%: Faster Response",
      "20+: Hospital Partners"
    ],
    features: ["Geolocation Matching", "Emergency Broadcasts", "Donor History", "Hospital Integration"],
    tech: ["Flutter", "Dart", "Firebase", "Google Maps API"],
    images: [
      "https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1920&auto=format&fit=crop",
    ],
    links: {
      demo: "#",
    },
  },
  {
    id: "p4",
    title: "TPMS Integrated App",
    category: "Mobile",
    description:
      "IoT-enabled tire pressure monitoring solution for industrial mining fleets.",
    challenge: "Frequent tire failures in mining dump trucks were causing expensive downtime and safety hazards.",
    solution: "We implemented an IoT-integrated mobile solution that reads sensor data from tires in real-time. The app analyzes pressure and temperature trends to predict failures before they happen, alerting maintenance teams instantly.",
    results: [
      "30%: Downtime Reduction",
      "$500k: Annual Savings",
      "100%: Safety Compliance"
    ],
    features: ["Real-time Sensor Data", "Predictive Maintenance Alerts", "Fleet Dashboard", "Offline Mode"],
    tech: ["Flutter", "IoT Protocols", "Bluetooth LE", "Data Visualization"],
    images: [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618401-fbd6c4c8ac75?q=80&w=1920&auto=format&fit=crop",
    ],
    links: {
      demo: "#",
    },
  },
  {
    id: "p5",
    title: "Global Breast Feeding Clinic",
    category: "Web",
    description:
      "A global digital health platform empowering mothers with expert lactation support.",
    challenge: "Lack of accessible, verified professional guidance for breastfeeding mothers worldwide.",
    solution: "We created a content-rich Next.js platform optimized for global accessibility. It features a custom CMS for medical professionals to publish articles, a community forum, and appointment booking for lactation consultants.",
    results: [
      "50+: Countries Reached",
      "1k+: Expert Articles",
      "500+: Virtual Consults"
    ],
    features: ["Expert Content CMS", "Virtual Consultations", "Community Forum", "Multi-language Support"],
    tech: ["Next.js", "React", "Tailwind CSS", "Sanity CMS"],
    images: [
      "/images/team/gbc-logo.png"
    ],
    links: {
      demo: "https://www.globalbreastfeedingclinic.com/",
    },
  },
];

const categories: Category[] = ["All", "Web", "Mobile"];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function PortfolioSection({
  projects = defaultProjects,
  initialFilter = "All",
  className,
}: PortfolioSectionProps) {
  const [active, setActive] = React.useState<Category>(initialFilter);
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState<Project | null>(null);
  const [slide, setSlide] = React.useState(0);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  function openProject(p: Project) {
    setCurrent(p);
    setSlide(0);
    setOpen(true);
  }

  function closeProject() {
    setOpen(false);
    // Dialog will unmount content by default; no need to clear current immediately
  }

  function nextSlide() {
    if (!current) return;
    setSlide((s) => (s + 1) % current.images.length);
  }

  function prevSlide() {
    if (!current) return;
    setSlide((s) => (s - 1 + current.images.length) % current.images.length);
  }

  React.useEffect(() => {
    if (!open) {
      // defer clearing to avoid focus trap issues
      const t = setTimeout(() => setCurrent(null), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <section
      className={classNames(
        "w-full max-w-full py-20 relative overflow-hidden",
        "text-foreground",
        className
      )}
      aria-label="Portfolio projects"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <FolderKanban className="w-4 h-4" />
            <span>Engineering Excellence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
            Featured Case Studies
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore how we transform complex challenges into scalable, high-performance software solutions. Each project represents our commitment to engineering quality and user experience.
          </p>
        </div>

        {/* Filter & Grid */}
        <div className="flex flex-col items-center mb-12">
          <nav
            aria-label="Project categories"
            className="flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            {categories.map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={classNames(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary text-white shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)]"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <article
              key={p.id}
              onClick={() => openProject(p)}
              className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.15)]"
            >
              {/* Image Background */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-primary bg-primary/10 border border-primary/20 rounded-full uppercase tracking-wider">
                    {p.category}
                  </span>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {p.title}
                  </h3>

                  <p className="text-sm text-zinc-400 line-clamp-2 mb-6 group-hover:text-zinc-300 transition-colors duration-300">
                    {p.description}
                  </p>

                  {/* Tech Stack Preview */}
                  <div className="flex flex-wrap gap-2 mb-6 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 delay-100">
                    {p.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs text-zinc-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 3 && (
                      <span className="text-xs text-zinc-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                        +{p.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 delay-200">
                    <span>View Case Study</span>
                    <AppWindow className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={classNames(
            "max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto overflow-x-hidden p-0 gap-0",
            "border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl",
            "shadow-2xl"
          )}
        >
          {current ? (
            <div className="flex flex-col">
              {/* Modal Header Image */}
              <div className="relative w-full h-[300px] sm:h-[400px] bg-black">
                <Image
                  src={current.images[slide]}
                  alt={current.title}
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10">
                  <span className="px-3 py-1 text-xs font-bold text-primary bg-primary/10 border border-primary/20 rounded-full uppercase tracking-wider mb-4 inline-block">
                    {current.category} Solution
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-bold text-white mb-2">
                    {current.title}
                  </h2>
                </div>

                {/* Image Navigation */}
                {current.images.length > 1 && (
                  <div className="absolute bottom-6 right-6 flex gap-2">
                    <button onClick={prevSlide} className="p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-primary hover:border-primary transition-all">
                      ‹
                    </button>
                    <button onClick={nextSlide} className="p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-primary hover:border-primary transition-all">
                      ›
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">
                  {/* Challenge & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        The Challenge
                      </h4>
                      <p className="text-zinc-400 leading-relaxed text-base">
                        {current.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        The Solution
                      </h4>
                      <p className="text-zinc-400 leading-relaxed text-base">
                        {current.solution}
                      </p>
                    </div>
                  </div>

                  {/* Key Results */}
                  <div className="bg-[#111] rounded-3xl p-8 border border-white/5 shadow-inner">
                    <h4 className="text-xl font-bold text-white mb-8">Key Results & Impact</h4>
                    <div className="flex flex-col md:flex-row flex-wrap justify-start gap-8 md:gap-16">
                      {current.results.map((result, idx) => {
                        const [metric, label] = result.includes(":") ? result.split(":") : [result, ""];
                        return (
                          <div
                            key={idx}
                            className={classNames(
                              "relative",
                              idx > 0 ? "pl-8 border-l-2 border-primary/40" : "pl-0"
                            )}
                          >
                            {label ? (
                              <div className="flex flex-col">
                                <span className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">{metric}</span>
                                <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider leading-relaxed">{label}</span>
                              </div>
                            ) : (
                              <p className="text-sm text-zinc-300 font-medium leading-relaxed">
                                {result}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Features List */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-6">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {current.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-base text-zinc-400 group/feature">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 group-hover/feature:shadow-[0_0_8px_rgba(139,92,246,0.6)] transition-shadow" />
                          <span className="leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-10">
                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-xl font-bold text-white uppercase tracking-wider mb-6">Technologies</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {current.tech.map((t) => (
                        <span key={t} className="px-4 py-2 text-sm font-medium text-zinc-300 bg-[#1a1a1a] border border-white/10 rounded-full hover:border-primary/50 hover:text-white transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col gap-4">
                    {current.links?.demo && (
                      <a
                        href={current.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col items-center justify-center gap-2 w-full py-6 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_0_30px_-5px_rgba(139,92,246,0.6)] hover:shadow-[0_0_40px_-5px_rgba(139,92,246,0.8)] hover:-translate-y-1 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <AppWindow className="w-6 h-6 mb-1" />
                        <span className="leading-none">View Live</span>
                        <span className="leading-none">Project</span>
                      </a>
                    )}
                    {current.links?.github && (
                      <a
                        href={current.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white/5 text-white font-bold text-lg border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-0.5"
                      >
                        <Github className="w-5 h-5" />
                        View Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}