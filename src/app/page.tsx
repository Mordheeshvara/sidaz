"use client";

import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const handleGetStarted = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewPortfolio = () => {
    // Scroll to portfolio/projects section
    const portfolioSection = document.getElementById('projects') || document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection 
        id="hero"
        onPrimaryClick={handleGetStarted}
        onSecondaryClick={handleViewPortfolio}
      />
      <div className="container mx-auto px-4 py-16">
        <ContactSection id="contact" />
      </div>
      <Footer />
    </main>
  );
}
