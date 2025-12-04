"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Sparkles, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  category: "Web" | "Mobile";
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: "1",
    title: "Study Sync",
    category: "Mobile",
    description: "Comprehensive learning management ecosystem streamlining academic operations with real-time Firebase sync.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    tags: ["Flutter", "Firebase", "Real-time"],
    link: "#",
    featured: true
  },
  {
    id: "2",
    title: "HR Portal",
    category: "Web",
    description: "Intelligent recruitment platform with automated Kanban tracking and resume parsing.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop",
    tags: ["Next.js", "MongoDB", "AI"],
    link: "#"
  },
  {
    id: "3",
    title: "Blood Link",
    category: "Mobile",
    description: "Life-saving network connecting donors with hospitals using geolocation.",
    image: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=1200&auto=format&fit=crop",
    tags: ["Flutter", "Google Maps", "Firebase"],
    link: "#"
  },
  {
    id: "4",
    title: "MineSafe IoT",
    category: "Mobile",
    description: "IoT-enabled tire pressure monitoring for mining fleets with predictive alerts.",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200&auto=format&fit=crop",
    tags: ["Flutter", "IoT", "Bluetooth LE"],
    link: "#"
  },
  {
    id: "5",
    title: "Lactation Hub",
    category: "Web",
    description: "Global digital health platform for breastfeeding support with virtual consultations.",
    image: "/images/team/gbc-logo.png",
    tags: ["Next.js", "Sanity CMS", "Tailwind"],
    link: "https://www.globalbreastfeedingclinic.com/"
  }
];

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Web" | "Mobile">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { setModalOpen, setPortfolioInView } = useModal();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPortfolioInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setPortfolioInView]);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative w-full min-h-screen py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 25% 25%, rgba(102, 51, 153, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)
        `
      }}
    >

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Our Work</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Featured <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 font-extrabold">
              Projects
            </span>
          </h2>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A showcase of our technical expertise and creative solutions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-16">
          {["All", "Web", "Mobile"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as any)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                selectedCategory === category
                  ? "bg-white text-black border-white shadow-lg shadow-white/10"
                  : "bg-zinc-900/50 text-zinc-400 border-white/10 hover:bg-zinc-800 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              layoutId={`project-${project.id}`}
              key={project.id}
              onClick={() => handleOpenModal(project)}
              className={cn(
                "group relative rounded-3xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/5", // Opaque
                "hover:border-white/20" // Removed heavy shadows
              )}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 4}
                  quality={85}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-8 relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 text-xs font-medium text-amber-300">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs font-medium text-zinc-500 bg-black/20 border border-white/5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal with Shared Layout Animation */}
      <AnimatePresence onExitComplete={() => setModalOpen(false)}>
        {selectedProject && (
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
              layoutId={`project-${selectedProject.id}`}
              className="relative w-full max-w-4xl bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 z-10 flex flex-col max-h-[90vh] will-change-transform" // Removed shadow-2xl, added will-change
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }} // Apple-style ease
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 md:h-80 w-full shrink-0">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              </div>

              <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl md:text-4xl font-bold text-white">
                          {selectedProject.title}
                        </h3>
                        <span className="px-3 py-1 text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full">
                          {selectedProject.category}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 text-xs font-medium text-zinc-300 bg-white/5 rounded-full border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2"
                        >
                          <span>Visit Site</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-xl text-zinc-300 leading-relaxed mb-8">
                      {selectedProject.description}
                    </p>

                    <h4 className="text-lg font-bold text-white mb-4">Project Overview</h4>
                    <p className="text-zinc-400 leading-relaxed">
                      This project represents a significant milestone in our development journey. We utilized cutting-edge technologies to deliver a solution that is not only robust and scalable but also provides an exceptional user experience. The architecture was designed with performance and security in mind, ensuring that it can handle high traffic loads while maintaining data integrity.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}