"use client";

import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";

export default function HomePage() {
  return (
    <>
      {/* 2D Background Effects */}
      <BackgroundEffects />

      <main className="min-h-screen bg-slate-950 relative z-10 contain-section">
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
    </>
  );
}
