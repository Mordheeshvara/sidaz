"use client";

import React from 'react';
import Link from 'next/link';
import { Linkedin, Contact, Layers2, Columns4, Instagram, Mail, ArrowRight, Sparkles } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";

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
        "relative w-full overflow-hidden",
        "bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950",
        className
      )}
      aria-labelledby="site-footer-heading"
    >
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-50, 50, -50],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Glowing Top Border */}
      <div className="relative">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
        <motion.div
          className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-500"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container relative z-10 w-full max-w-full py-16 sm:py-20">
        {/* Header Section with Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h2
                id="site-footer-heading"
                className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-tight bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent"
              >
                {companyName}
              </h2>
              <p className="mt-2 text-base sm:text-lg text-emerald-200/80 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {tagline}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid with Glassmorphic Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Company Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative rounded-2xl bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 p-6 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <h3 className="font-heading text-sm uppercase tracking-wider text-emerald-300 mb-4 flex items-center gap-2">
              <Layers2 className="w-4 h-4" />
              Company
            </h3>
            <p className="text-sm leading-relaxed text-gray-300 mb-4 relative z-10">
              SIDAZ combines strategic thinking, innovative design, and expert engineering to build fast, accessible, and visually stunning digital experiences.
            </p>
            <ul className="space-y-3 relative z-10">
              <li className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-300 transition-colors">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20">
                  <Layers2 className="h-3.5 w-3.5 text-emerald-400" />
                </span>
                {address}
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-300 transition-colors group/link"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 group-hover/link:bg-emerald-500/30">
                    <Mail className="h-3.5 w-3.5 text-emerald-400" />
                  </span>
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone.replace(/[^\\d+]/g, "")}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-300 transition-colors"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20">
                    <Contact className="h-3.5 w-3.5 text-emerald-400" />
                  </span>
                  {phone}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative rounded-2xl bg-gradient-to-br from-teal-500/10 via-transparent to-emerald-500/10 p-6 backdrop-blur-sm border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <h3 className="font-heading text-sm uppercase tracking-wider text-teal-300 mb-4 flex items-center gap-2">
              <Columns4 className="w-4 h-4" />
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2 relative z-10">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="group/link flex items-center gap-2 text-sm text-gray-400 hover:text-teal-300 transition-all duration-200"
                  >
                    <ArrowRight className="w-3 h-3 text-teal-400 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all duration-200" />
                    <span className="group-hover/link:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative rounded-2xl bg-gradient-to-br from-amber-500/10 via-transparent to-emerald-500/10 p-6 backdrop-blur-sm border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <h3 className="font-heading text-sm uppercase tracking-wider text-amber-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Services
            </h3>
            <ul className="space-y-2 relative z-10">
              {services.map((svc, index) => (
                <motion.li
                  key={svc}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  className="flex items-start gap-2 text-sm text-gray-400 hover:text-amber-300 transition-colors group/item cursor-pointer"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-md bg-amber-500/20 group-hover/item:bg-amber-500/30 transition-colors">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  </span>
                  <span className="group-hover/item:translate-x-1 transition-transform duration-200">{svc}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative rounded-2xl bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/10 p-6 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <h3 className="font-heading text-sm uppercase tracking-wider text-emerald-300 mb-4 flex items-center gap-2">
              <Contact className="w-4 h-4" />
              Connect With Us
            </h3>
            <p className="text-sm text-gray-300 mb-6 relative z-10">
              Follow us on social media and stay updated with our latest projects and insights.
            </p>

            {/* Animated Social Icons */}
            <div className="flex gap-3 relative z-10">
              <motion.a
                href="https://www.linkedin.com/company/sidaz"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="group/social relative p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-6 w-6 text-blue-300 group-hover/social:text-blue-200 transition-colors relative z-10" />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl"
                  animate={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.a>

              <motion.a
                href="https://www.instagram.com/sida.technologies/?hl=en"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group/social relative p-4 rounded-xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20 hover:from-pink-500/30 hover:via-purple-500/30 hover:to-orange-500/30 border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6 text-pink-300 group-hover/social:text-pink-200 transition-colors relative z-10" />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-pink-500/20 blur-xl"
                  animate={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </motion.a>

              <motion.a
                href="mailto:sidaztechnologies@gmail.com"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="group/social relative p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 hover:from-emerald-500/30 hover:to-teal-600/30 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300"
                aria-label="Send us an email"
              >
                <Mail className="h-6 w-6 text-emerald-300 group-hover/social:text-emerald-200 transition-colors relative z-10" />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-xl"
                  animate={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Animated Divider */}
        <motion.div
          className="relative mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <motion.div
            className="absolute inset-0 h-px bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-500"
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <p className="text-sm text-gray-400">
            © 2025 <span className="text-emerald-300 font-semibold">{companyName}</span>. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <li>
              <Link
                href="/#privacy"
                className="text-gray-400 hover:text-emerald-300 transition-colors relative group/link"
              >
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-400 group-hover/link:w-full transition-all duration-300" />
              </Link>
            </li>
            <li className="text-gray-600">•</li>
            <li>
              <Link
                href="/#terms"
                className="text-gray-400 hover:text-emerald-300 transition-colors relative group/link"
              >
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-400 group-hover/link:w-full transition-all duration-300" />
              </Link>
            </li>
            <li className="text-gray-600">•</li>
            <li>
              <Link
                href="/#contact"
                className="text-gray-400 hover:text-emerald-300 transition-colors relative group/link"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-400 group-hover/link:w-full transition-all duration-300" />
              </Link>
            </li>
          </ul>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;