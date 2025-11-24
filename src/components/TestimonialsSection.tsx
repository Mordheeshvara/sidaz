"use client";

import React from "react";
import { ArrowBigRight, Quote, User } from "lucide-react";
import clsx from "clsx";
import { Button } from "./ui/button";

type Testimonial = {
  id: string;
  name: string;
  company: string;
  photoUrl: string;
  rating?: number; // 0-5
  text: string;
};

type TestimonialsSectionProps = {
  className?: string;
  testimonials?: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number; // ms
  initialIndex?: number;
  ariaLabel?: string;
};

function useSlidesPerView() {
  const [spv, setSpv] = React.useState(4); // Default to 4 for 2x2 grid

  React.useEffect(() => {
    const updateSlidesPerView = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      // Use 4 testimonials (2x2 grid) for screens >= 640px (sm breakpoint)
      // Use 1 testimonial (single column) for mobile < 640px
      if (width >= 640) {
        setSpv(4); // 2x2 grid layout
      } else {
        setSpv(1); // Single column on mobile
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  return spv;
}

function chunkIntoPages<T>(items: T[], size: number): T[][] {
  if (size <= 0) return [items];
  // Force exactly 3 pages of 4 testimonials each for 2x2 grid
  if (size === 4) {
    const pages: T[][] = [];
    for (let i = 0; i < items.length; i += 4) {
      const chunk = items.slice(i, i + 4);
      if (chunk.length > 0) {
        pages.push(chunk);
      }
    }
    return pages;
  }
  // Fallback for mobile (size === 1)
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  // Page 1 - 4 testimonials
  {
    id: "t1",
    name: "Sarah Chen",
    company: "TechFlow Solutions",
    photoUrl: "", // Will use fallback user icon
    rating: 5,
    text:
      "Working with SIDAZ transformed our digital presence completely. Their attention to detail and innovative approach delivered results beyond our expectations.",
  },
  {
    id: "t2",
    name: "Marcus Rodriguez",
    company: "InnovateLab",
    photoUrl: "", // Will use fallback user icon
    rating: 5,
    text:
      "The team's expertise in modern web technologies is exceptional. They delivered a scalable solution that perfectly matches our business needs.",
  },
  {
    id: "t3",
    name: "Emily Watson",
    company: "Digital Dynamics",
    photoUrl: "", // Will use fallback user icon
    rating: 4,
    text:
      "Professional, reliable, and incredibly talented. The user experience they created is intuitive and engaging for all our clients.",
  },
  {
    id: "t4",
    name: "David Kim",
    company: "NextGen Ventures",
    photoUrl: "", // Will use fallback user icon
    rating: 5,
    text:
      "From concept to deployment, every phase was handled with precision. The final product exceeded our performance benchmarks significantly.",
  },
  // Page 2 - 4 testimonials
  {
    id: "t5",
    name: "Jessica Park",
    company: "Creative Studios",
    photoUrl: "", // Will use fallback user icon
    rating: 5,
    text:
      "Outstanding design aesthetics combined with robust functionality. They brought our vision to life with elegant solutions and seamless integration.",
  },
  {
    id: "t6",
    name: "Alex Thompson",
    company: "Future Systems",
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=640&auto=format&fit=crop",
    rating: 4,
    text:
      "Excellent communication throughout the project. The development process was transparent, and the results speak for themselves.",
  },
  {
    id: "t7",
    name: "Maria Garcia",
    company: "Startup Hub",
    photoUrl: "", // Will use fallback user icon
    rating: 5,
    text:
      "SIDAZ delivered a cutting-edge solution that revolutionized our workflow. The team's dedication to quality is unmatched in the industry.",
  },
  {
    id: "t8",
    name: "James Wilson",
    company: "Tech Innovators",
    photoUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=640&auto=format&fit=crop",
    rating: 5,
    text:
      "Incredible attention to detail and user experience. The final product exceeded all our expectations and delivered measurable business results.",
  },
  // Page 3 - 4 testimonials
  {
    id: "t9",
    name: "Lisa Anderson",
    company: "Growth Partners",
    photoUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=640&auto=format&fit=crop",
    rating: 5,
    text:
      "Working with SIDAZ was a game-changer for our business. Their innovative solutions and professional approach made all the difference.",
  },
  {
    id: "t10",
    name: "Robert Davis",
    company: "Enterprise Solutions",
    photoUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?q=80&w=640&auto=format&fit=crop",
    rating: 4,
    text:
      "The development quality and project management were outstanding. They delivered on time and exceeded our technical requirements.",
  },
  {
    id: "t11",
    name: "Amanda Foster",
    company: "Digital Strategy",
    photoUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=640&auto=format&fit=crop",
    rating: 5,
    text:
      "SIDAZ transformed our digital presence with modern design and flawless functionality. Highly recommend their services to any business.",
  },
  {
    id: "t12",
    name: "Michael Brown",
    company: "Innovation Labs",
    photoUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=640&auto=format&fit=crop",
    rating: 5,
    text:
      "Exceptional team that combines technical expertise with creative vision. The results speak for themselves - outstanding quality and performance.",
  },
];

export default function TestimonialsSection({
  className,
  testimonials = DEFAULT_TESTIMONIALS,
  autoplay = true,
  autoplayInterval = 5000,
  initialIndex = 0,
  ariaLabel = "Client testimonials",
}: TestimonialsSectionProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const spv = useSlidesPerView();
  const pages = React.useMemo(() => chunkIntoPages(testimonials, spv), [testimonials, spv]);
  const pageCount = pages.length || 1;

  const [page, setPage] = React.useState(() => {
    const start = Math.min(Math.max(0, Math.floor(initialIndex / Math.max(spv, 1))), pageCount - 1);
    return isFinite(start) ? start : 0;
  });

  React.useEffect(() => {
    // Reset page when slides per view changes
    setPage(0);
  }, [spv]);

  const goTo = React.useCallback(
    (idx: number) => {
      setPage(((idx % pageCount) + pageCount) % pageCount);
    },
    [pageCount]
  );

  const next = React.useCallback(() => goTo(page + 1), [goTo, page]);
  const prev = React.useCallback(() => goTo(page - 1), [goTo, page]);

  // Autoplay with hover/focus pause
  const isPausedRef = React.useRef(false);

  React.useEffect(() => {
    if (!autoplay || pageCount <= 1) return;
    const id = window.setInterval(() => {
      if (!isPausedRef.current) {
        next();
      }
    }, Math.max(2000, autoplayInterval));
    return () => window.clearInterval(id);
  }, [autoplay, autoplayInterval, next, pageCount]);

  const onMouseEnter = () => {
    isPausedRef.current = true;
  };
  const onMouseLeave = () => {
    isPausedRef.current = false;
  };

  return (
    <section
      aria-label={ariaLabel}
      className={clsx(
        "relative w-full",
        "rounded-[calc(var(--radius)*1.25)]",
        "bg-background",
        className
      )}
    >
      {/* Subtle purple accent background elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      >
        <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,var(--chart-1)_0%,transparent_70%)] opacity-20 blur-2xl" />
        <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,var(--chart-4)_0%,transparent_70%)] opacity-10 blur-3xl" />
      </div>

      <div
        ref={containerRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" // Perfect centering and responsive padding
      >
        {/* Header - Centered */}
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
            Read what our customers say
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Real feedback from teams we've partnered with.
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="mb-6 sm:mb-8 flex items-center justify-center gap-3">
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={prev}
            disabled={page === 0}
            aria-label="Previous testimonials"
            className={clsx(
              "group h-12 w-12 rounded-full border-2 transition-all duration-300",
              "border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800",
              "text-zinc-400 hover:text-white",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
            )}
          >
            <ArrowBigRight className="h-5 w-5 rotate-180 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={next}
            disabled={page === pageCount - 1}
            aria-label="Next testimonials"
            className={clsx(
              "group h-12 w-12 rounded-full border-2 transition-all duration-300",
              "border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800",
              "text-zinc-400 hover:text-white",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
            )}
          >
            <ArrowBigRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Button>
        </div>

        {/* Slider */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Testimonials carousel"
          className={clsx(
            "relative w-full overflow-hidden",
            "rounded-xl",
            "px-2 sm:px-4 lg:px-6 py-8", // Reduced padding to fit cards better
            "flex justify-center items-center min-h-[650px]" // Adjusted height for better fit
          )}
        >
          <div
            className="flex w-full transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `translateX(-${page * 100}%)`, width: `${pageCount * 100}%` }}
          >
            {pages.map((group, pageIndex) => (
              <div
                key={`page-${pageIndex}`}
                className="w-full shrink-0 flex justify-center items-center" // Center each page content
                aria-hidden={pageIndex !== page}
                role="group"
                aria-roledescription="slide"
                aria-label={`Page ${pageIndex + 1} of ${pageCount}`}
              >
                <div
                  className={clsx(
                    "grid items-stretch justify-items-stretch", // Stretch to fill grid cells
                    // Explicit 2x2 grid for desktop
                    "grid-cols-1 gap-4", // Mobile: single column with tight spacing
                    "sm:grid-cols-2 sm:grid-rows-2 sm:gap-6", // Desktop: 2x2 grid with optimal spacing
                    "lg:gap-8", // Slightly larger gaps on big screens
                    "max-w-6xl w-full", // Wider container to fit cards better
                    "mx-auto px-2 sm:px-4" // Minimal padding to maximize card space
                  )}
                  style={{
                    // Ensure grid has proper height for 2x2 layout
                    minHeight: group.length === 4 ? '580px' : 'auto'
                  }}
                >
                  {group.map((t) => (
                    <TestimonialCard key={t.id} t={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        {/* Perfect Page Indicators - Exactly 3 dots for 3 pages */}
        {pageCount > 1 && (
          <div className="flex flex-col items-center gap-6 mt-8"> {/* Enhanced spacing */}
            {/* Page Dots */}
            <div className="flex items-center justify-center gap-4"> {/* Larger gap between dots */}
              {Array.from({ length: pageCount }).map((_, i) => {
                const active = i === page;
                return (
                  <button
                    key={`dot-${i}`}
                    type="button"
                    aria-label={`Go to page ${i + 1}`}
                    aria-current={active ? "true" : undefined}
                    onClick={() => goTo(i)}
                    className={clsx(
                      "h-3 w-3 rounded-full transition-all duration-300",
                      "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2",
                      active
                        ? "bg-purple-500 scale-110 shadow-lg shadow-purple-500/30"
                        : "bg-zinc-600 hover:bg-zinc-500 hover:scale-105"
                    )}
                  />
                );
              })}
            </div>
            
            {/* Page Counter */}
            <div className="text-sm text-zinc-500 font-medium">
              Page {page + 1} of {pageCount}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <article
      className={clsx(
        "group relative min-w-0 break-words",
        "w-full", // Full width within grid cell
        "h-full min-h-[260px] max-h-[280px] flex flex-col", // Optimized height for perfect fit
        "rounded-lg", // Slightly smaller radius for better fit
        "bg-zinc-900/95 backdrop-blur-sm", // Solid dark background
        "border border-zinc-800/60",
        "p-4 lg:p-5", // Reduced padding for better space utilization
        "shadow-[0_4px_20px_rgba(0,0,0,0.25)]", // Professional shadow
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_6px_30px_rgba(0,0,0,0.4)]", // Reduced hover translation
        "hover:border-zinc-700/80",
        "hover:bg-zinc-900", // Solid hover background
        "overflow-hidden" // For the glow effects
      )}
    >
      {/* Purple Glow Background - Same as Services */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      >
        <div className="h-full w-full bg-[radial-gradient(120px_120px_at_20%_10%,rgba(155,140,255,0.25),transparent),radial-gradient(160px_160px_at_80%_90%,rgba(107,110,249,0.2),transparent)]" />
      </div>

      {/* Purple Border Glow - Same as Services */}
      <div className="absolute inset-0 rounded-lg ring-0 ring-primary/0 transition-all duration-300 group-hover:ring-2 group-hover:ring-primary/40" aria-hidden="true" />

      {/* Card Hover Motion - Same as Services */}
      <div className="pointer-events-none absolute inset-0 scale-[1.0] transition-transform duration-300 group-hover:scale-[1.01]" aria-hidden="true" />
      {/* Main Layout: Profile picture left, content right */}
      <div className="flex gap-3 mb-4"> {/* Reduced gap and margin */}
        {/* Circular Profile Picture with Purple Glow Effect */}
        <div className="relative h-12 w-12 shrink-0">
          {/* Purple Glow Behind Profile Picture */}
          <span className="absolute -inset-1 rounded-full bg-primary/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
          
          <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-purple-500/50 bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]">
            {!imageError && t.photoUrl ? (
              <>
                <img
                  src={t.photoUrl}
                  alt={`${t.name} portrait`}
                  className={clsx(
                    "h-full w-full object-cover object-center transition-opacity duration-300",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-800">
                    <User className="h-6 w-6 text-zinc-300" /> {/* Smaller icon */}
                  </div>
                )}
              </>
            ) : (
              /* Enhanced Fallback User Icon */
              <div className="flex items-center justify-center w-full h-full">
                <User className="h-6 w-6 text-zinc-300 drop-shadow-sm" /> {/* Smaller icon */}
              </div>
            )}
            {/* Elegant accent border */}
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
          </div>
        </div>
        
        {/* Testimonial Text Block - Left Aligned */}
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm leading-relaxed text-zinc-200 text-left line-clamp-3"> {/* Smaller text and fewer lines */}
            "{t.text}"
          </p>
        </div>
      </div>

      {/* Client Info - Left Aligned with Profile Picture */}
      <div className="mt-auto">
        <h3 className="text-sm font-bold text-white leading-tight mb-1 text-left">{t.name}</h3>
        <p className="text-xs text-zinc-400 leading-tight font-medium text-left">{t.company}</p>
      </div>

      {/* Subtle background enhancement */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-lg bg-gradient-to-br from-zinc-800/5 to-zinc-900/10 pointer-events-none"
      />
    </article>
  );
}

function StarRating({ rating = 5 }: { rating: number }) {
  const max = 5;
  const r = Math.max(0, Math.min(max, rating));
  const items = Array.from({ length: max }).map((_, i) => {
    const filled = i + 1 <= Math.floor(r);
    const half = !filled && i < r && r < i + 1;
    return { filled, half, i };
  });
  return (
    <div className="flex items-center gap-1" aria-label={`${r} out of 5 stars`} role="img">
      {items.map(({ filled, half, i }) => (
        <span key={i} className="inline-flex h-4 w-4">
          <StarIcon
            className={clsx(
              "h-4 w-4 drop-shadow-[0_0_6px_rgba(155,140,255,0.55)]",
              filled || half ? "text-[var(--primary)]" : "text-muted-foreground/40"
            )}
            filled={filled}
            half={half}
          />
        </span>
      ))}
    </div>
  );
}

function StarIcon({
  className,
  filled,
  half,
}: {
  className?: string;
  filled?: boolean;
  half?: boolean;
}) {
  // Inline SVG star to avoid external icon dependencies; allows half-fill.
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
    >
      <defs>
        <linearGradient id="half-grad" x1="0" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M12 3.5l2.89 5.86 6.47.94-4.68 4.56 1.11 6.46L12 18.77l-5.79 3.05 1.11-6.46L2.64 10.3l6.47-.94L12 3.5z"
        fill={filled ? "currentColor" : half ? "url(#half-grad)" : "none"}
      />
      {!filled && (
        <path
          d="M12 3.5l2.89 5.86 6.47.94-4.68 4.56 1.11 6.46L12 18.77l-5.79 3.05 1.11-6.46L2.64 10.3l6.47-.94L12 3.5z"
          fill="none"
        />
      )}
    </svg>
  );
}