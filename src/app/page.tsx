"use client";

import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const handleGetStarted = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const elementPosition = contactSection.offsetTop;
      const offsetPosition = elementPosition - 80;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleViewPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        id="home"
        primaryHref="#contact"
        secondaryHref="#portfolio"
        onPrimaryClick={undefined}
        onSecondaryClick={handleViewPortfolio}
      />

      {/* About Section */}
      <div id="about" className="scroll-mt-20">
        <AboutSection />
      </div>

      {/* Services Section */}
      <div id="services" className="scroll-mt-20">
        <ServicesSection />
      </div>

      {/* Portfolio Section */}
      <div id="portfolio" className="scroll-mt-20">
        <PortfolioSection />
      </div>

      {/* Team Section */}
      <div id="team" className="scroll-mt-20">
        <TeamSection />
      </div>

      {/* Contact Section */}
      <div id="contact" className="scroll-mt-20">
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
