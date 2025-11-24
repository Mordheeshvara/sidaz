import Navigation from "../src/components/Navigation";
import HeroSection from "../src/components/HeroSection";
import AboutSection from "../src/components/AboutSection";
import ServicesSection from "../src/components/ServicesSection";
import PortfolioSection from "../src/components/PortfolioSection";
import TeamSection from "../src/components/TeamSection";
import ContactSection from "../src/components/ContactSection";
import Footer from "../src/components/Footer";

const NAV_LINKS = [
	{ id: "home", label: "Home" },
	{ id: "about", label: "About" },
	{ id: "services", label: "Services" },
	{ id: "portfolio", label: "Portfolio" },
	{ id: "team", label: "Team" },
	{ id: "contact", label: "Contact" },
];

export default function Page() {
	return (
		<div className="relative min-h-svh w-full bg-background text-foreground">
			{/* Global ambient background accents for the dark/purple aesthetic */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
			>
				<div
					className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-3xl opacity-60"
					style={{
						background:
							"radial-gradient(closest-side, rgba(155,140,255,0.18), rgba(155,140,255,0))",
					}}
				/>
				<div
					className="absolute -bottom-20 right-10 h-72 w-72 rounded-full blur-3xl opacity-60"
					style={{
						background:
							"radial-gradient(closest-side, rgba(107,110,249,0.16), transparent)",
					}}
				/>
			</div>

			{/* Fixed navigation */}
			<Navigation links={NAV_LINKS} scrollOffset={80} />

			<main className="relative pt-16">
				{/* Hero */}
				<div id="home" className="relative">
					<HeroSection
						id="hero"
						heading="Innovative Digital Solutions by SIDAZ"
						subheading="We design and engineer cutting-edge web applications, scalable software platforms, and modern digital experiences that drive business growth."
						secondaryLabel="View Portfolio"
						secondaryHref="#portfolio"
						className="bg-transparent"
					/>
				</div>

				{/* Content sections with consistent vertical rhythm */}
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* About */}
					<div
						id="about"
						className="scroll-mt-20 py-12 sm:py-16 md:py-20 lg:py-24"
					>
						<AboutSection className="w-full" />
					</div>

					{/* Services */}
					<div
						id="services"
						className="scroll-mt-20 py-12 sm:py-16 md:py-20 lg:py-24"
					>
						<ServicesSection className="w-full" />
					</div>

					{/* Portfolio */}
					<div
						id="portfolio"
						className="scroll-mt-20 py-12 sm:py-16 md:py-20 lg:py-24"
					>
						<PortfolioSection className="w-full" />
					</div>

					{/* Team */}
					<div
						id="team"
						className="scroll-mt-20 py-12 sm:py-16 md:py-20 lg:py-24"
					>
						<TeamSection className="w-full" />
					</div>

					{/* Contact */}
					<div
						id="contact"
						className="scroll-mt-20 py-12 sm:py-16 md:py-20 lg:py-24"
					>
						<ContactSection className="w-full" />
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}