"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, Sparkles } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";
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
    >
      <Image
        src="/logo.png"
        alt="SIDAZ Logo"
        width={80}
        height={48}
        className="w-full h-full object-contain"
        priority
        sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
        style={{
          filter: 'drop-shadow(0 4px 12px rgba(155, 140, 255, 0.5))',
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Throttled scroll handler for active section detection
    let timeoutId: NodeJS.Timeout | null = null;

    const onScrollTopCheck = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        timeoutId = null;
        const headerLine = scrollOffset;
        const sectionIds = links.map((l) => l.id);

        // Optimized: Only query elements once per check
        const sections = sectionIds
          .map((id) => document.getElementById(id))
          .filter((el): el is HTMLElement => !!el);

        let current: HTMLElement | null = null;
        let currentTop = -Infinity;

        // Find the section currently in view
        for (const s of sections) {
          const rect = s.getBoundingClientRect();
          // Check if section is roughly in view (top is above header line)
          if (rect.top - headerLine <= 100) {
            if (rect.top > currentTop) {
              currentTop = rect.top;
              current = s;
            }
          }
        }

        const targetId = current?.id || links[0]?.id;
        if (targetId && targetId !== activeId) setActiveId(targetId);
      }, 100); // Check every 100ms instead of every frame
    };

    window.addEventListener("scroll", onScrollTopCheck, { passive: true });
    // Initial check
    onScrollTopCheck();

    return () => {
      window.removeEventListener("scroll", onScrollTopCheck);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [links, activeId, scrollOffset]);

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
        <motion.button
          key={item.id}
          onClick={() => {
            handleScrollTo(item.id);
            if (onClick) onClick();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={clsx(
            "relative inline-flex items-center justify-center h-10 px-6 rounded-full",
            "text-sm font-medium transition-all duration-300 touch-manipulation",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60",
            isActive
              ? "text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_20px_rgba(124,58,237,0.5)]"
              : "text-gray-300 hover:text-white hover:bg-white/5"
          )}
          aria-current={isActive ? "page" : undefined}
          aria-label={`Go to ${item.label}`}
        >
          <span className="min-w-0 truncate relative z-10">{item.label}</span>
          {isActive && (
            <motion.span
              layoutId="activeNav"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
              initial={false}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </motion.button>
      );
    },
    [activeId, handleScrollTo]
  );

  return (
    <motion.header
      role="navigation"
      aria-label="Primary"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={clsx(
        "fixed top-0 inset-x-0 z-50",
        "backdrop-blur-md", // Reduced blur for performance
        "border-b transition-all duration-300 will-change-transform",
        scrolled
          ? "border-purple-500/30 bg-slate-950/90"
          : "border-purple-500/10 bg-slate-950/60",
        className || ""
      )}
      style={style}
    >
      {/* Animated Background Gradients - Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -top-20 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container w-full max-w-full relative z-10">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left: Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 rounded-lg p-1 -m-1 min-w-0 flex-shrink-0"
            aria-label="Go to homepage"
          >
            {logo ?? <GlassLogo />}
            <div className="flex flex-col min-w-0 hidden xs:flex">
              <span className="font-heading text-xs sm:text-sm md:text-base tracking-tight bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent truncate">
                SIDAZ
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-xs text-purple-300/70 -mt-0.5 truncate flex items-center gap-1">
                <Sparkles className="w-2 h-2" />
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
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Open menu"
                  className="lg:hidden h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 flex items-center justify-center"
                >
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-purple-200" aria-hidden="true" />
                </motion.button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[90vw] max-w-sm bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 backdrop-blur-md border-l border-purple-500/30 p-0 flex flex-col"
                aria-label="Mobile menu"
              >
                {/* Mobile Menu Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                </div>

                <div className="p-4 border-b border-purple-500/20 flex-shrink-0 relative z-10">
                  <div className="flex items-center gap-3">
                    {logo ?? <GlassLogo />}
                    <div className="flex flex-col min-w-0">
                      <span className="font-heading text-base tracking-tight bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                        SIDAZ
                      </span>
                      <span className="text-xs text-purple-300/70 -mt-0.5 flex items-center gap-1">
                        <Sparkles className="w-2 h-2" />
                        Design & Engineering
                      </span>
                    </div>
                  </div>
                </div>
                <nav className="p-2 flex-1 overflow-y-auto relative z-10">
                  <ul className="flex flex-col space-y-1">
                    {links.map((item, index) => {
                      const isActive = activeId === item.id;
                      return (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <SheetClose asChild>
                            <button
                              onClick={() => handleScrollTo(item.id)}
                              className={clsx(
                                "w-full text-left",
                                "flex items-center justify-between gap-2",
                                "px-4 py-4 rounded-lg",
                                "transition-all duration-300 touch-manipulation",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60",
                                isActive
                                  ? "text-white bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30"
                                  : "text-gray-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 hover:text-white"
                              )}
                              aria-current={isActive ? "page" : undefined}
                              aria-label={`Go to ${item.label}`}
                            >
                              <span className="text-base font-medium">{item.label}</span>
                              <ChevronRight className="h-4 w-4 opacity-70" aria-hidden="true" />
                            </button>
                          </SheetClose>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Glowing Bottom Border - Optimized */}
      <motion.div
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent will-change-transform"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.header>
  );
}