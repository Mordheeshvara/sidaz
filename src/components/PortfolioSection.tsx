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
      "StudySync is a Flutter-based mobile app built for students and faculty of the College with comprehensive learning management features.",
    tech: ["Flutter", "Dart", "Firebase", "Mobile App"],
    images: [
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop",
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
      "It allows HR managers to post jobs, track applicants through different stages of the hiring pipeline, and manage resumes efficiently.",
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
      "This Flutter-based app connects donors, hospitals, and NGOs to streamline the blood donation process.",
    tech: ["Flutter", "Dart", "Firebase", "Real-time Database"],
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
      "This project focuses on enhancing safety, efficiency, and cost reduction in the mining industry, particularly for dump trucks.",
    tech: ["Flutter", "IoT Integration", "Real-time Monitoring", "Mobile App"],
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
      title: "GBC - Global Breast Feeding Clinic",
      category: "Web",
      description:
        "A professional web platform dedicated to supporting and educating mothers worldwide about the importance of breastfeeding. Features include expert resources, community forums, and interactive tools to empower families and healthcare professionals.",
      tech: ["Next.js", "React", "Tailwind CSS", "Content Management"],
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
        "w-full max-w-full",
        "text-foreground",
        className
      )}
      aria-label="Portfolio projects"
    >
      <div className="w-full max-w-full">
        {/* APP DEVELOPMENT Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FolderKanban className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-xs sm:text-sm uppercase tracking-wide text-muted-foreground">
              Portfolio
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading mb-2">
            APP DEVELOPMENT
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Innovative mobile and web applications built with modern technologies to solve real-world problems.
          </p>
        </div>
        
        <div className="mb-6 flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-card/40">
            <Grid2x2Plus className="size-4 text-muted-foreground" aria-hidden />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Filter
            </span>
          </div>

          <nav
            aria-label="Project categories"
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => {
              const isActive = active === cat;
              return (
                <Button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  variant={isActive ? "default" : "secondary"}
                  size="sm"
                  className="relative gap-2"
                  aria-pressed={isActive}
                >
                  {cat === "All" ? (
                    <FolderKanban className="size-4" aria-hidden />
                  ) : null}
                  <span>{cat}</span>
                </Button>
              );
            })}
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
                        <article
              key={p.id}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:border-primary/30 backdrop-blur supports-[backdrop-filter]:bg-card/30"
            >
              <button
                type="button"
                onClick={() => openProject(p)}
                className="block h-full w-full text-left transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label={`View details for ${p.title}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={p.images[0]}
                    alt={`${p.title} cover`}
                    width={400}
                    height={300}
                    className="h-full w-full object-contain p-8 transition duration-500 group-hover:scale-[1.04] bg-neutral-900 mx-auto"
                    style={{ borderRadius: 'inherit', backgroundColor: '#18181b' }}
                    priority={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-background/0 to-background/20 opacity-40" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-primary/10" />
                    <div className="absolute inset-0 backdrop-blur-[1px]" />
                  </div>
                </div>

                <div className="relative p-4">
                  {/* APP DEVELOPMENT Label */}
                  <div className="mb-3">
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">
                      {p.id === "p5" || p.id === "p2" ? "WEBSITE DEVELOPMENT" : "APP DEVELOPMENT"}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-foreground leading-tight">
                      {p.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {p.description}
                  </p>

                  {/* Explore More Button */}
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    <AppWindow className="h-4 w-4" />
                    <span className="text-sm font-medium">Explore More</span>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          aria-describedby="project-dialog-description"
          className={classNames(
            "max-w-3xl",
            "border border-border/60 bg-card/70 backdrop-blur-xl supports-[backdrop-filter]:bg-card/50",
            "shadow-[0_0_1px_1px_rgba(107,110,249,0.15),0_20px_60px_-15px_rgba(0,0,0,0.6)]"
          )}
        >
          {current ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  {current.title}
                </DialogTitle>
                <DialogDescription id="project-dialog-description" className="text-sm text-muted-foreground">
                  {current.category} project
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-5">
                <div className="relative w-full overflow-hidden rounded-lg border border-border/60">
                  <div className="relative aspect-[16/9] w-full bg-muted/40">
                    <Image
                      src={current.images[slide]}
                      alt={`${current.title} screenshot ${slide + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      style={{ borderRadius: 'inherit' }}
                      priority={false}
                    />
                    {current.images.length > 1 ? (
                      <>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/60 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-between p-2">
                          <button
                            type="button"
                            onClick={prevSlide}
                            aria-label="Previous screenshot"
                            className="rounded-full border border-border/60 bg-background/60 px-3 py-2 text-sm backdrop-blur hover:bg-background/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            onClick={nextSlide}
                            aria-label="Next screenshot"
                            className="rounded-full border border-border/60 bg-background/60 px-3 py-2 text-sm backdrop-blur hover:bg-background/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            ›
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border/60 bg-background/60 px-2 py-1 backdrop-blur">
                          {current.images.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setSlide(i)}
                              aria-label={`Go to slide ${i + 1}`}
                              className={classNames(
                                "h-1.5 w-3 rounded-full transition",
                                i === slide ? "bg-primary" : "bg-muted"
                              )}
                            />
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <h4 className="mb-2 text-base font-semibold">Overview</h4>
                    <p className="text-sm text-muted-foreground break-words">
                      {current.description}
                    </p>
                  </div>

                  <div className="md:col-span-1">
                    <h4 className="mb-2 flex items-center gap-2 text-base font-semibold">
                      <FolderKanban className="size-4 text-primary" aria-hidden />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {current.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {(current.links?.github || current.links?.demo) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {current.links?.github ? (
                      <a
                        href={current.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-secondary px-3 py-2 text-sm text-secondary-foreground transition hover:bg-secondary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <Github className="size-4" aria-hidden />
                        View on GitHub
                      </a>
                    ) : null}
                    {current.links?.demo ? (
                      <a
                        href={current.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border-2 border-purple-500 bg-transparent px-3 py-2 text-sm text-purple-500 transition hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <AppWindow className="size-4" aria-hidden />
                        Live Demo
                      </a>
                    ) : null}
                  </div>
                )}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}