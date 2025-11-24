"use client";

import React from 'react';
import Link from 'next/link';
import { Linkedin, Contact, Layers2, Columns4, Instagram, Facebook } from "lucide-react";
import clsx from "clsx";

type FooterLink = {
  label: string;
  href: string;
};

export interface FooterProps {
  className?: string;
  companyName?: string;
  tagline?: string;
  address?: string;
  email?: string;
  phone?: string;
  socials?: {
    linkedin?: string;
  };
  navLinks?: FooterLink[];
  services?: string[];
  currentYear?: number;
}

const defaultNav: FooterLink[] = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

const defaultServices = [
  "UI/UX Design",
  "Next.js Development",
  "Design Systems",
  "Performance Optimization",
  "Accessibility Audits",
  "Brand Identity",
];

const Footer: React.FC<FooterProps> = ({
  className,
  companyName = "SIDAZ",
  tagline = "Crafting delightful experiences with code and design.",
  address = "Worldwide • Remote-first",
  email = "sidaztechnologies@gmail.com",
  phone = "+91 9514332052",
  socials = { linkedin: "https://www.linkedin.com" },
  navLinks = defaultNav,
  services = defaultServices,
  currentYear,
}) => {
  const year = currentYear ?? new Date().getFullYear();

  return (
    <footer
      className={clsx(
        "relative w-full bg-background text-foreground",
        "border-t border-[--border]",
        className
      )}
      aria-labelledby="site-footer-heading"
    >
      {/* Purple glowing top divider */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[--primary] to-transparent opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-1/4 -top-2 h-6 blur-2xl"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 100%, rgba(155,140,255,0.45) 0%, rgba(155,140,255,0.12) 46%, rgba(155,140,255,0) 70%)",
          }}
        />
      </div>

      <div className="container w-full max-w-full py-14 sm:py-16">
        {/* Header row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2
              id="site-footer-heading"
              className="font-heading text-xl sm:text-2xl md:text-3xl tracking-tight"
            >
              {companyName}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground">
              {tagline}
            </p>
          </div>
        </div>

        {/* Soft divider */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[--border] to-transparent" />

        {/* Columns */}
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="min-w-0">
            <h3 className="font-heading text-sm uppercase tracking-wider text-muted-foreground">
              Company
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              SIDAZ combines strategic thinking, innovative design, and expert engineering to build fast, accessible, and visually stunning digital experiences powered by cutting-edge technology.
            </p>

            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-muted/60 ring-1 ring-[--border]">
                  <Layers2 className="h-3.5 w-3.5 text-[--primary]" aria-hidden="true" />
                </span>
                <span className="min-w-0 truncate">{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <a
                  className="min-w-0 truncate text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] rounded-sm"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  className="min-w-0 truncate text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] rounded-sm"
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  className="min-w-0 truncate text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] rounded-sm"
                  href="tel:+916784589345"
                >
                  +91 6784589345
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <nav className="min-w-0" aria-label="Quick navigation">
            <h3 className="font-heading text-sm uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              {navLinks.map((link) => (
                <li key={link.href} className="min-w-0">
                  <a
                    href={link.href}
                    className={clsx(
                      "group flex items-center gap-2 rounded-sm text-sm text-foreground/90",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring]"
                    )}
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-muted/60 ring-1 ring-[--border] transition-colors group-hover:ring-[--primary]">
                      <Columns4 className="h-3.5 w-3.5 text-muted-foreground group-hover:text-[--primary]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 truncate">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services overview */}
          <div className="min-w-0">
            <h3 className="font-heading text-sm uppercase tracking-wider text-muted-foreground">
              Services
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-2">
              {services.map((svc) => (
                <li key={svc} className="flex min-w-0 items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-md bg-muted/60 ring-1 ring-[--border]">
                    <Layers2 className="h-3.5 w-3.5 text-[--primary]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 break-words text-sm text-foreground/90">{svc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact quick card */}
          <div className="min-w-0">
            <h3 className="font-heading text-sm uppercase tracking-wider text-muted-foreground">
              Stay in Touch
            </h3>
            <div
              className={clsx(
                "mt-3 rounded-lg border border-[--border] bg-[--card] p-4",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
              )}
            >
              <p className="text-sm text-foreground/90 mb-4">
                Questions or collaborations? We&#39;re a message away.
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/sidaz"
                  className="p-3 rounded-lg bg-muted/20 hover:bg-primary/20 transition-all duration-200 group"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://www.instagram.com/sida.technologies/?hl=en"
                  className="p-3 rounded-lg bg-muted/20 hover:bg-primary/20 transition-all duration-200 group"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://facebook.com/sidaz"
                  className="p-3 rounded-lg bg-muted/20 hover:bg-primary/20 transition-all duration-200 group"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider with glow */}
        <div className="relative mt-12">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[--border] to-transparent" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-1/3 -top-2 h-5 blur-2xl"
            style={{
              background:
                "radial-gradient(50% 90% at 50% 100%, rgba(155,140,255,0.35) 0%, rgba(155,140,255,0.1) 45%, rgba(155,140,255,0) 70%)",
            }}
          />
        </div>

        {/* Bottom row */}
        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {year} {companyName}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <li>
              <Link
                href="/#privacy"
                className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] rounded-sm"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="text-muted-foreground">•</li>
            <li>
              <Link
                href="/#terms"
                className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] rounded-sm"
              >
                Terms of Service
              </Link>
            </li>
            <li className="text-muted-foreground">•</li>
            <li>
              <Link
                href="/#contact"
                className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] rounded-sm"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Ambient background glow accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -bottom-20 right-10 h-40 w-40 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(45% 45% at 50% 50%, rgba(155,140,255,0.18) 0%, rgba(155,140,255,0.06) 60%, rgba(155,140,255,0) 75%)",
          }}
        />
        <div
          className="absolute -top-10 left-10 h-32 w-56 rounded-[999px] blur-3xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(155,140,255,0.15) 0%, rgba(155,140,255,0.0) 100%)",
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;