"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ChevronRight, Sparkles } from "lucide-react";
import clsx from "clsx";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import Image from "next/image";
import AnimatedLogo from "@/components/AnimatedLogo";

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
    <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
      <Image
        src="/logo.png"
        alt="SIDAZ Logo"
        width={64}
        height={64}
        className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
        priority
      />
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(102, 51, 153, 0.3), transparent 70%)',
          filter: 'blur(12px)',
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
  const [scrolled, setScrolled] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const { scrollY } = useScroll();

  // OPTIMIZED: Use Framer Motion's optimized scroll handler
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrolled = latest > 20;
    if (isScrolled !== scrolled) setScrolled(isScrolled);
  });

  // OPTIMIZED: Use IntersectionObserver for active section detection instead of scroll listener
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Trigger when section is in middle of viewport
        threshold: 0,
      }
    );

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [links]);

  // OPTIMIZED: Dedicated observer for Services section to hide navbar
  useEffect(() => {
    const servicesSection = document.getElementById('services');
    if (!servicesSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsServicesVisible(entry.isIntersecting);
        });
      },
      {
        rootMargin: "0px", // Exact viewport intersection
        threshold: 0.1 // Trigger when 10% of services is visible
      }
    );

    observer.observe(servicesSection);
    return () => observer.disconnect();
  }, []);

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
              ? "text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_20px_rgba(102,51,153,0.5)]"
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
        "backdrop-blur-md supports-[backdrop-filter]:bg-black/20 bg-black/50",
        "border-b border-white/5 transition-all duration-300",
        isServicesVisible ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100",
        className || ""
      )}
      style={style}
    >
      {/* OPTIMIZED: Removed infinite background animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30" >
        <div className="absolute -top-20 left-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      </div >

      <div className="container w-full max-w-full relative z-10">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left: Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 rounded-lg p-1 ml-2 sm:ml-4 min-w-0 flex-shrink-0"
            aria-label="SIDAZ - Go to homepage"
          >
            {logo ?? <GlassLogo />}
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
                  className="lg:hidden h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-400/30 flex items-center justify-center"
                >
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-violet-200" aria-hidden="true" />
                </motion.button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[90vw] max-w-sm bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 backdrop-blur-md border-l border-violet-500/30 p-0 flex flex-col"
                aria-label="Mobile menu"
              >
                {/* Mobile Menu Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>

                <div className="p-4 border-b border-violet-500/20 flex-shrink-0 relative z-10">
                  <div className="flex items-center justify-center">
                    {logo ?? <GlassLogo />}
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
                                "active:scale-95",
                                isActive
                                  ? "text-white bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30"
                                  : "text-gray-300 hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-cyan-500/10 hover:text-white"
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
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent will-change-transform"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.header >
  );
}