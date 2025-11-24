"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import Image from "next/image";

type NavItem = {
  id: string;
  label: string;
};

export interface NavigationProps {
  className?: string;
  style?: React.CSSProperties;
  links?: NavItem[];
  logo?: React.ReactNode;
  /**
   * Offset used when scrolling to anchors to account for the fixed header height
   */
  scrollOffset?: number;
}

const DEFAULT_LINKS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

function GlassLogo() {
  return (
    <div
      aria-hidden="true"
      className="relative inline-flex items-center justify-center h-8 w-16 sm:h-10 sm:w-20 md:h-12 md:w-24 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        background: 'transparent',
      }}
    >
      {/* SIDAZ Logo */}
      <Image
        src="/logo.png"
        alt="SIDAZ Logo"
        width={80}
        height={48}
        className="w-full h-full object-contain"
        priority
        sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3))',
        }}
      />
    </div>
  );
}

export default function Navigation({
  className,
  style,
  links = DEFAULT_LINKS,
  logo,
  scrollOffset = 80,
}: NavigationProps) {
  const [activeId, setActiveId] = useState<string>(links[0]?.id ?? "");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Observe sections to update active link on scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const onScrollTopCheck = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const headerLine = scrollOffset;
        // Sections list each tick to avoid stale refs across route updates
        const sectionIds = links.map((l) => l.id);
        const sections = sectionIds
          .map((id) => document.getElementById(id))
          .filter((el): el is HTMLElement => !!el);

        // 1) Hard guard: keep Home while About hasn't crossed header line yet
        const aboutEl = document.getElementById("about");
        const homeId = sectionIds[0];
        if (aboutEl && homeId) {
          const aboutTop = aboutEl.getBoundingClientRect().top;
          if (aboutTop - headerLine > 1) {
            if (activeId !== homeId) setActiveId(homeId);
            return;
          }
        }

        // 2) General deterministic pick: last section whose top <= header line
        let current: HTMLElement | null = null;
        let currentTop = -Infinity;
        let next: HTMLElement | null = null;
        let nextTop = Infinity;
        for (const s of sections) {
          const top = s.getBoundingClientRect().top;
          if (top - headerLine <= 1) {
            if (top > currentTop) {
              currentTop = top;
              current = s;
            }
          } else if (top < nextTop) {
            nextTop = top;
            next = s;
          }
        }
        const targetId = (current ?? next)?.id;
        if (targetId && targetId !== activeId) setActiveId(targetId);
      });
    };

    window.addEventListener("scroll", onScrollTopCheck, { passive: true });
    window.addEventListener("resize", onScrollTopCheck, { passive: true });
    // Initial check in case we mount at or near the top
    onScrollTopCheck();

    return () => {
      window.removeEventListener("scroll", onScrollTopCheck);
      window.removeEventListener("resize", onScrollTopCheck);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [links, activeId, scrollOffset]);

  // Observe sections to update active link on scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sectionIds = links.map((l) => l.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Compute the section anchored at/above the header line for deterministic highlighting
        const headerLine = scrollOffset;

        // Ensure Home stays active until About crosses the header line
        const aboutEl = document.getElementById("about");
        const homeId = sectionIds[0];
        if (aboutEl && homeId) {
          const aboutTop = aboutEl.getBoundingClientRect().top;
          if (aboutTop - headerLine > 1) {
            if (activeId !== homeId) setActiveId(homeId);
            return;
          }
        }

        let current: HTMLElement | null = null; // last section whose top is <= header line
        let currentTop = -Infinity;
        let next: HTMLElement | null = null; // first section below the header line
        let nextTop = Infinity;
        for (const s of sections) {
          const top = s.getBoundingClientRect().top;
          if (top - headerLine <= 1) {
            if (top > currentTop) {
              currentTop = top;
              current = s;
            }
          } else {
            if (top < nextTop) {
              nextTop = top;
              next = s;
            }
          }
        }
        const targetId = (current ?? next)?.id;
        if (targetId && targetId !== activeId) setActiveId(targetId);
      },
      {
        root: null,
        rootMargin: `-${scrollOffset + 1}px 0px -60% 0px`,
        threshold: [0.15, 0.3, 0.6],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [links, scrollOffset]);

  const handleScrollTo = useCallback(
    (id: string) => {
      if (typeof window === "undefined") return;
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const top = Math.max(absoluteTop - scrollOffset, 0);
      window.scrollTo({ top, behavior: "smooth" });
    },
    [scrollOffset]
  );

  const NavLink = useCallback(
    ({ item, onClick }: { item: NavItem; onClick?: () => void }) => {
      const isActive = activeId === item.id;
      return (
        <button
          key={item.id}
          onClick={() => {
            handleScrollTo(item.id);
            if (onClick) onClick();
          }}
          className={[
            "relative inline-flex items-center justify-center h-9 px-3 sm:px-4 rounded-lg",
            "text-sm font-medium transition-all duration-200 touch-manipulation",
            "text-foreground/80 hover:text-primary hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
            "active:scale-95 active:bg-muted/60",
            isActive ? "text-primary bg-muted/30" : "",
          ].join(" ")}
          aria-current={isActive ? "page" : undefined}
          aria-label={`Go to ${item.label}`}
        >
          <span className="min-w-0 truncate">{item.label}</span>
          <span
            className={[
              "pointer-events-none absolute inset-x-2 -bottom-1 h-0.5 rounded-full",
              "transition-all duration-200",
              isActive ? "opacity-100 scale-100" : "opacity-0 scale-75",
            ].join(" ")}
            style={{ background: "linear-gradient(90deg, rgba(139,92,246,0) 0%, rgba(139,92,246,0.9) 50%, rgba(139,92,246,0) 100%)" }}
            aria-hidden="true"
          />
        </button>
      );
    },
    [activeId, handleScrollTo]
  );

  return (
    <header
      role="navigation"
      aria-label="Primary"
      className={[
        "fixed top-0 inset-x-0 z-50",
        "backdrop-blur-xl",
        "border-b border-border/60",
        "bg-secondary/60",
        "supports-[backdrop-filter]:bg-secondary/40",
        className || "",
      ].join(" ")}
      style={style}
    >
      <div className="container w-full max-w-full">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left: Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-lg p-1 -m-1 min-w-0 flex-shrink-0"
            aria-label="Go to homepage"
          >
            {logo ?? <GlassLogo />}
            <div className="flex flex-col min-w-0 hidden xs:flex">
              <span className="font-heading text-xs sm:text-sm md:text-base tracking-tight text-foreground truncate">
                SIDAZ
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground -mt-0.5 truncate">
                Design & Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 min-w-0 flex-1 justify-center max-w-2xl mx-8">
            {links.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </nav>

          {/* Right: Mobile Menu */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="lg:hidden h-8 w-8 sm:h-9 sm:w-9 p-0"
                >
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[90vw] max-w-sm bg-secondary/95 backdrop-blur-xl border-l border-border/60 p-0 flex flex-col"
                aria-label="Mobile menu"
              >
                <div className="p-4 border-b border-border/60 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    {logo ?? <GlassLogo />}
                    <div className="flex flex-col min-w-0">
                      <span className="font-heading text-base tracking-tight text-foreground">
                        SIDAZ
                      </span>
                      <span className="text-xs text-muted-foreground -mt-0.5">
                        Design & Engineering
                      </span>
                    </div>
                  </div>
                </div>
                <nav className="p-2 flex-1 overflow-y-auto">
                  <ul className="flex flex-col space-y-1">
                    {links.map((item) => {
                      const isActive = activeId === item.id;
                      return (
                        <li key={item.id}>
                          <SheetClose asChild>
                            <button
                              onClick={() => handleScrollTo(item.id)}
                              className={[
                                "w-full text-left",
                                "flex items-center justify-between gap-2",
                                "px-4 py-4 rounded-lg",
                                "transition-colors touch-manipulation",
                                "text-foreground/90 hover:bg-muted/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                                "active:bg-muted/80",
                                isActive ? "text-primary bg-muted/60" : "",
                              ].join(" ")}
                              aria-current={isActive ? "page" : undefined}
                              aria-label={`Go to ${item.label}`}
                            >
                              <span className="text-base font-medium">{item.label}</span>
                              <ChevronRight className="h-4 w-4 opacity-70" aria-hidden="true" />
                            </button>
                          </SheetClose>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* Subtle top gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-16 h-24 opacity-60"
        style={{
          background:
            "radial-gradient(120px 20px at 80% 100%, rgba(139,92,246,0.35), rgba(139,92,246,0) 70%), radial-gradient(160px 24px at 20% 100%, rgba(124,58,237,0.25), rgba(124,58,237,0) 70%)",
        }}
      />
    </header>
  );
}