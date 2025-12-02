"use client";

import React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Instagram, Mail, ArrowRight, Sparkles, Send, Globe, MapPin, Phone } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import AnimatedLogo from "@/components/AnimatedLogo";

type FooterLink = {
  label: string;
  href: string;
};

const defaultNav: FooterLink[] = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

const defaultServices = [
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "Cloud Solutions",
  "AI Integration",
  "Blockchain",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-black border-t border-white/5 pt-20 pb-10">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-500/5 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <AnimatedLogo size="md" showParticles={true} />
            </Link>
            <p className="text-zinc-400 leading-relaxed max-w-sm">
              Crafting award-winning digital experiences that merge art with technology. We build the future, pixel by pixel.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/company/sidaz/",
                  color: "#0A66C2",
                  className: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30"
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/sida.technologies/?hl=en",
                  color: "#E4405F",
                  className: "hover:text-[#E4405F] hover:border-[#E4405F]/30"
                },
                {
                  icon: Mail,
                  href: "sidaztechnologies@gmail.com",
                  color: "#10b981",
                  className: "hover:text-violet-500 hover:border-violet-500/30"
                }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3, color: social.color }}
                  className={`w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 transition-colors hover:bg-white/5 ${social.className}`}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Column (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-white mb-6 text-lg">Company</h3>
            <ul className="space-y-4">
              {defaultNav.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-violet-400 transition-colors flex items-center gap-2 group text-sm font-medium"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-white mb-6 text-lg">Services</h3>
            <ul className="space-y-4">
              {defaultServices.map((service) => (
                <li key={service} className="text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer text-sm font-medium">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-white mb-6 text-lg">Contact</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <MapPin className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                <span>
                  No.10, rangasamy nagar extenion,thattanchavady,
                  Villianur,pondicherry 605110
                </span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Phone className="w-5 h-5 text-violet-500 shrink-0" />
                <span>+91 95143 32052</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Mail className="w-5 h-5 text-violet-500 shrink-0" />
                <span>sidaztechnologies@gmail.com </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm font-medium">
            © {currentYear} SIDAZ Technologies. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-medium text-zinc-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}