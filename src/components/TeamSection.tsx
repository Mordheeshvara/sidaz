"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import { Linkedin, Instagram, Mail, BadgeCheck, Code2, Cpu, Zap, Terminal, Binary, Network, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  expandedDescription: string;
  contact: { email: string; linkedin: string; instagram: string };
  imageUrl: string;
  skills: string[]; // Changed from level-based to simple tags
};

const defaultMembers: TeamMember[] = [
  {
    id: "1",
    name: "Shruti",
    role: "Chief Executive Officer",
    bio: "Visionary leader transforming corporate strategy into sustainable market dominance.",
    expandedDescription: "As CEO, Shruti spearheads SIDAZ's strategic vision with exceptional leadership. She expertly navigates complex market dynamics while fostering innovation across all departments.",
    contact: { email: "shrutithamizhselvan@gmail.com", linkedin: "#", instagram: "#" },
    imageUrl: "/images/team/Shruti.jpeg",
    skills: ["Leadership", "Business Strategy", "AI Tools", "SaaS Model", "Innovation"]
  },
  {
    id: "5",
    name: "Arjun",
    role: "Chief Technology Officer",
    bio: "Architecting the future with cutting-edge technology stacks and scalable solutions.",
    expandedDescription: "Arjun drives SIDAZ's technology strategy. His expertise spans multiple technology stacks and emerging platforms, ensuring optimal solutions for complex challenges.",
    contact: { email: "arjunfree256@gmail.com", linkedin: "#", instagram: "#" },
    imageUrl: "/images/team/arjun.png",
    skills: ["Web Development", "App Development", "AI & ML", "Deep AI Development", "Cloud Architecture"]
  },
  {
    id: "2",
    name: "Mordheeshvara",
    role: "Chief Marketing Officer",
    bio: "Crafting compelling narratives that resonate globally and drive brand growth.",
    expandedDescription: "Mordheesh brings innovative marketing strategies and deep market understanding. His expertise in digital marketing campaigns has significantly enhanced client engagement.",
    contact: { email: "mordheeshvarab@gmail.com", linkedin: "#", instagram: "#" },
    imageUrl: "/images/team/mothy.png",
    skills: ["Digital Marketing", "UI/UX Design", "AI Tools", "Brand Strategy", "Analytics"]
  },
  {
    id: "6",
    name: "Pratheeb",
    role: "Chief Financial Officer",
    bio: "Ensuring fiscal health and sustainable growth through strategic financial planning.",
    expandedDescription: "Pratheeb oversees SIDAZ's financial strategy. His analytical approach to financial planning and risk management has strengthened the company's economic foundation.",
    contact: { email: "pratheebsuriya786@gmail.com", linkedin: "#", instagram: "#" },
    imageUrl: "/images/team/suriya.png",
    skills: ["Financial Planning", "SaaS Model", "Risk Management", "AI Tools", "Business Analytics"]
  },
  {
    id: "3",
    name: "Ravikanth",
    role: "Chief Blockchain Dev",
    bio: "Building secure, decentralized futures with advanced blockchain protocols.",
    expandedDescription: "Ravikanth leads blockchain initiatives. His innovative approach to decentralized solutions has enabled secure, scalable platforms for diverse client needs.",
    contact: { email: "ravikanthsankaran@gmail.com", linkedin: "#", instagram: "#" },
    imageUrl: "/images/team/raka.png",
    skills: ["Blockchain", "Web3", "Smart Contracts", "AI & ML", "Security"]
  },
  {
    id: "8",
    name: "Dhinesh",
    role: "Chief Operating Officer",
    bio: "Orchestrating operational excellence and seamless process optimization.",
    expandedDescription: "Dhinesh orchestrates operational efficiency. His systematic approach to workflow management ensures seamless project delivery across all departments.",
    contact: { email: "dhineshsidaz@gmail.com", linkedin: "#", instagram: "#" },
    imageUrl: "/images/team/dhinesh.png",
    skills: ["Operations", "SaaS Model", "AI Tools Development", "Process Optimization", "Project Management"]
  },
];

// Tech grid background component
function TechGrid() {
  return (
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />
    </div>
  );
}

// Binary rain effect
function BinaryRain({ delay = 0 }: { delay?: number }) {
  // Use useMemo to generate stable random values that won't cause hydration errors
  const randomValues = React.useMemo(() => ({
    char: Math.random() > 0.5 ? '1' : '0',
    left: Math.random() * 100,
  }), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: [0, 1, 0],
        y: [0, 100],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute text-emerald-500/30 font-mono text-xs"
      style={{
        left: `${randomValues.left}%`,
      }}
    >
      {randomValues.char}
    </motion.div>
  );
}

// Ultra-smooth Team Card with optimized rendering
function TeamCard({
  member,
  index,
  onClick,
  onHover,
  onLeave,
}: {
  member: TeamMember;
  index: number;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D tilt effect (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return; // Disable on mobile
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -10;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover();
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    onLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group cursor-pointer flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] will-change-transform"
    >
      <div className="relative">
        {/* Card Container - Optimized: No blur, solid background */}
        <div className="relative bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-colors duration-300">

          {/* Simple corner accents */}
          <div className={`absolute top-0 left-0 w-16 h-16 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-30'}`}>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-emerald-500 to-transparent" />
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-emerald-500 to-transparent" />
          </div>
          <div className={`absolute bottom-0 right-0 w-16 h-16 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-30'}`}>
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-emerald-500 to-transparent" />
            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-emerald-500 to-transparent" />
          </div>

          {/* Image Section */}
          <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden bg-zinc-900">
            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                priority={index < 4}
                className="object-cover object-top"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 350px"
              />
            </motion.div>

            {/* Tech overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

            {/* Tech badge */}
            <div className={`absolute top-3 right-3 md:top-4 md:right-4 bg-zinc-900/80 border border-emerald-500/30 rounded-lg px-2 py-1 md:px-3 md:py-1.5 flex items-center gap-1.5 md:gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <Terminal className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
              <span className="text-[10px] md:text-xs text-emerald-400 font-mono">ACTIVE</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-5 md:p-6 relative bg-zinc-950">
            <div className="relative z-10">
              {/* Name & Badge */}
              <div className="flex items-center justify-between mb-2">
                <h3 className={`text-lg sm:text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${isHovered ? 'text-emerald-400' : 'text-white'}`}>
                  {member.name}
                </h3>
                <BadgeCheck className={`w-5 h-5 md:w-6 md:h-6 text-emerald-400 transition-transform duration-500 ${isHovered ? 'rotate-[360deg]' : ''}`} />
              </div>

              {/* Role */}
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Code2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 flex-shrink-0" />
                <p className="text-emerald-400 font-mono text-xs md:text-sm tracking-wide line-clamp-1">
                  {member.role}
                </p>
              </div>

              {/* Bio */}
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
                {member.bio}
              </p>

              {/* Hover Description - CSS transition instead of Framer Motion for performance */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isHovered ? 'max-h-24 opacity-100 mb-3 md:mb-4' : 'max-h-0 opacity-0 mb-0'}`}
              >
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-2 md:p-3">
                  <p className="text-zinc-300 text-[10px] sm:text-xs leading-relaxed line-clamp-2">
                    {member.expandedDescription}
                  </p>
                </div>
              </div>

              {/* Action button */}
              <div className={`flex items-center justify-end transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
                <div className="flex items-center gap-1.5 md:gap-2 text-emerald-400 text-xs md:text-sm font-medium">
                  <span>View Profile</span>
                  <span className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamSection({ className }: { className?: string }) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const x = useMotionValue(0);

  // Smooth scroll speed transitions
  const smoothSpeed = useSpring(scrollSpeed, {
    stiffness: 100,
    damping: 30,
  });

  // Create infinite loop by tripling the members - Memoized to prevent re-creation
  const infiniteMembers = React.useMemo(() => [...defaultMembers, ...defaultMembers, ...defaultMembers], []);

  // Ultra-smooth auto-scroll with variable speed using GPU transforms
  useAnimationFrame(() => {
    const currentSpeed = smoothSpeed.get();

    // Responsive speed based on screen size
    const baseSpeed = window.innerWidth < 768 ? 0.5 : 0.8;
    const moveAmount = baseSpeed * currentSpeed;

    let newX = x.get() - moveAmount;

    // Calculate the width of one set of members
    const cardWidth = window.innerWidth < 640 ? 280 : window.innerWidth < 768 ? 320 : 350;
    // Match CSS gap: gap-4 (16px) on mobile, gap-5 (20px) on md+
    const gap = window.innerWidth < 768 ? 16 : 20;

    const singleSetWidth = (cardWidth + gap) * defaultMembers.length;

    // Seamless looping logic
    // When we've scrolled past one full set (negative x), reset instantly
    if (newX <= -singleSetWidth) {
      newX += singleSetWidth;
    }

    x.set(newX);
  });

  const handleCardHover = () => {
    setScrollSpeed(0.3);
  };

  const handleCardLeave = () => {
    setScrollSpeed(1);
  };

  return (
    <section
      className={cn(
        "relative w-full py-16 md:py-24 overflow-hidden",
        "bg-gradient-to-b from-slate-950 via-zinc-950 to-slate-950",
        className
      )}
    >
      {/* Tech Grid Background */}
      <TechGrid />

      {/* Binary rain effect - Removed for performance */}
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        {[...Array(30)].map((_, i) => (
          <BinaryRain key={i} delay={i * 0.2} />
        ))}
      </div> */}

      {/* Animated circuit lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
          className="absolute top-1/4 left-0 right-0 h-[1px]"
          animate={{
            background: [
              'linear-gradient(90deg, transparent 0%, #10b981 50%, transparent 100%)',
              'linear-gradient(90deg, transparent 100%, #10b981 150%, transparent 200%)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-3/4 left-0 right-0 h-[1px]"
          animate={{
            background: [
              'linear-gradient(90deg, transparent 100%, #06b6d4 150%, transparent 200%)',
              'linear-gradient(90deg, transparent 0%, #06b6d4 50%, transparent 100%)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-emerald-500 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-500 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-xl mb-4 md:mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
            </motion.div>
            <span className="text-emerald-400 font-mono text-xs md:text-sm tracking-wider">ELITE_TECH_TEAM</span>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight px-4"
          >
            <span className="text-white">Meet The </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 animate-gradient">
              Innovators
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base lg:text-lg font-light px-4"
          >
            <span className="text-emerald-400 font-mono">&lt;</span>
            {" "}Building next-generation solutions with cutting-edge technology{" "}
            <span className="text-emerald-400 font-mono">/&gt;</span>
          </motion.p>
        </div>

        {/* Infinite Smooth Scrolling Team Cards */}
        <div className="relative">
          <div
            className="overflow-x-hidden pb-6 md:pb-8"
            style={{
              // Hide scrollbar but keep functionality if needed (though we are using transform now)
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <motion.div
              ref={containerRef}
              style={{ x }}
              className="flex gap-4 md:gap-5 px-4 will-change-transform"
            >
              {infiniteMembers.map((member, index) => (
                <TeamCard
                  key={`${member.id}-${index}`}
                  member={member}
                  index={index % defaultMembers.length}
                  onClick={() => setSelectedMember(member)}
                  onHover={handleCardHover}
                  onLeave={handleCardLeave}
                />
              ))}
            </motion.div>
          </div>

          {/* Enhanced scroll indicators */}
          <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
            {defaultMembers.map((member, idx) => (
              <motion.div
                key={idx}
                className="relative"
              >
                <motion.div
                  className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500/30"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: idx * 0.5,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-400"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: idx * 0.5,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Speed indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4 md:mt-6"
          >
            <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
              <Network className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" />
              <span className="text-zinc-500 text-xs md:text-sm font-mono">
                {scrollSpeed < 0.5 ? 'SLOWED' : 'AUTO_SCROLLING'}
              </span>
              <motion.div
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: scrollSpeed < 0.5 ? 2 : 1.5,
                  repeat: Infinity
                }}
                className="w-1 h-1 md:w-1.5 md:h-1.5 bg-emerald-500 rounded-full"
              />
            </div>
          </motion.div>

          {/* Hover instruction - desktop only */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="hidden md:block text-center mt-4 text-zinc-600 text-xs font-mono"
          >
            Hover over cards to slow down • Click to view details
          </motion.p>
        </div>
      </div>

      {/* Enhanced Mobile-Optimized Member Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[95vw] sm:max-w-[90vw] md:max-w-3xl lg:max-w-4xl bg-zinc-950/98 border-emerald-500/30 p-0 overflow-hidden backdrop-blur-2xl shadow-2xl rounded-2xl sm:rounded-3xl max-h-[95vh] sm:max-h-[90vh]"
        >
          <DialogTitle className="sr-only">Member Details</DialogTitle>

          {/* Custom Close Button - Always Visible */}
          <button
            onClick={() => setSelectedMember(null)}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-2 md:p-2.5 rounded-full bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300 group"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
          </button>

          {selectedMember && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex flex-col md:flex-row h-full max-h-[95vh] sm:max-h-[90vh] md:h-[600px] overflow-y-auto md:overflow-hidden"
            >
              {/* Image Section - Mobile Optimized */}
              <div className="w-full md:w-5/12 relative h-64 sm:h-80 md:h-full bg-zinc-900 flex-shrink-0 overflow-hidden">
                <motion.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={selectedMember.imageUrl}
                    alt={selectedMember.name}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />

                {/* Tech overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />

                {/* Floating sparkles - desktop only */}
                <div className="hidden md:block">
                  {[...Array(5)].map((_, i) => {
                    // Use deterministic values based on index to prevent hydration errors
                    const xEnd = (i * 61 % 100 - 50);
                    const yEnd = (i * 79 % 100 - 50);
                    const leftPos = (i * 43 % 100);
                    const topPos = (i * 71 % 100);

                    return (
                      <motion.div
                        key={i}
                        className="absolute"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, xEnd],
                          y: [0, yEnd],
                        }}
                        transition={{
                          duration: 3,
                          delay: i * 0.3,
                          repeat: Infinity,
                        }}
                        style={{
                          left: `${leftPos}%`,
                          top: `${topPos}%`,
                        }}
                      >
                        <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Content Section - Mobile Optimized */}
              <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-12 flex flex-col justify-center relative overflow-y-auto">
                {/* Tech grid background */}
                <div className="absolute inset-0 opacity-5">
                  <TechGrid />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative z-10"
                >
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                        {selectedMember.name}
                      </h3>
                      <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-emerald-400 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 flex-shrink-0" />
                      <p className="text-sm sm:text-base md:text-lg text-emerald-400 font-mono">{selectedMember.role}</p>
                    </div>
                  </div>

                  <p className="text-zinc-300 leading-relaxed text-sm sm:text-base md:text-lg mb-6 md:mb-8 border-l-2 border-emerald-500/50 pl-3 md:pl-4">
                    {selectedMember.expandedDescription}
                  </p>

                  {/* Technical Skills */}
                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    <h4 className="text-xs md:text-sm font-bold text-emerald-400 uppercase tracking-widest font-mono flex items-center gap-2">
                      <Zap className="w-3 h-3 md:w-4 md:h-4" />
                      TECHNICAL_SKILLS
                    </h4>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {selectedMember.skills.map((skill, idx) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.1 + (idx * 0.05),
                            ease: [0.34, 1.56, 0.64, 1]
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="group relative"
                        >
                          <div className="px-3 md:px-4 py-2 md:py-2.5 rounded-lg bg-zinc-900/80 border border-emerald-500/30 backdrop-blur-sm hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-all duration-300">
                            <span className="text-xs md:text-sm font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">
                              {skill}
                            </span>
                          </div>
                          {/* Glow effect on hover */}
                          <motion.div
                            className="absolute inset-0 rounded-lg pointer-events-none"
                            initial={{ opacity: 0 }}
                            whileHover={{
                              opacity: 1,
                              boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)"
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex gap-2 md:gap-3">
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={`mailto:${selectedMember.contact.email}`}
                      className="p-3 md:p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300 group"
                    >
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedMember.contact.linkedin}
                      className="p-3 md:p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 group"
                    >
                      <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedMember.contact.instagram}
                      className="p-3 md:p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300 group"
                    >
                      <Instagram className="w-4 h-4 md:w-5 md:h-5 text-zinc-400 group-hover:text-pink-400 transition-colors" />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Smooth scrolling for all devices */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Prevent layout shift on mobile */
        @media (max-width: 768px) {
          body {
            overflow-x: hidden;
          }
        }
      `}</style>
    </section>
  );
}