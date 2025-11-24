"use client";

import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const handleGetStarted = () => {
    console.log('Get Started button clicked!');

    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      console.log('Contact section found:', contactSection);

      if (contactSection) {
        // Get the position and scroll with offset for navigation
        const elementPosition = contactSection.offsetTop;
        const offsetPosition = elementPosition - 80; // Account for navigation height

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        console.log('Scrolling to contact section at position:', offsetPosition);
      } else {
        console.error('Contact section not found!');
        // Fallback: scroll to bottom of page
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
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
        primaryHref="#contact"
        secondaryHref={undefined}
        onPrimaryClick={undefined}
        onSecondaryClick={handleViewPortfolio}
      />
      <div className="container mx-auto px-4 py-16">
        <ContactSection id="contact" />
      </div>
      <Footer />
    </main>
  );
}
