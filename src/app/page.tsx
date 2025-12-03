"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import BackgroundEffects from "@/components/BackgroundEffects";

// Lazy load below-the-fold sections
const ServicesSection = dynamic(() => import("@/components/ServicesSection"), { ssr: true });
const AboutSection = dynamic(() => import("@/components/AboutSection"), { ssr: true });
const PortfolioSection = dynamic(() => import("@/components/PortfolioSection"), { ssr: true });
const TeamSection = dynamic(() => import("@/components/TeamSection"), { ssr: true });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

// Loading skeleton for smooth initial paint
function LoadingSkeleton() {
  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-violet-300 text-sm animate-pulse">Loading SIDAZ...</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      {/* 2D Background Effects */}
      <BackgroundEffects />

      <main className="min-h-screen bg-transparent relative z-10 contain-section">
        <Navigation />

        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <div id="about" className="scroll-mt-20 gpu-accelerate">
          <AboutSection />
        </div>

        {/* Services Section */}
        <div id="services" className="scroll-mt-20 gpu-accelerate">
          <ServicesSection />
        </div>

        {/* Portfolio Section */}
        <div id="portfolio" className="scroll-mt-20 gpu-accelerate">
          <PortfolioSection />
        </div>

        {/* Team Section */}
        <div id="team" className="scroll-mt-20 gpu-accelerate">
          <TeamSection />
        </div>

        {/* Contact Section */}
        <div id="contact" className="scroll-mt-20 gpu-accelerate">
          <ContactSection />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </Suspense>
  );
}
