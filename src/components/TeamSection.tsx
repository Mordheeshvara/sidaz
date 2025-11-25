"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Users, Linkedin, Instagram, Mail, ChevronLeft, ChevronRight, BadgeCheck, Sparkles, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// ... (Types remain similar but enhanced)
type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  expandedDescription: string;
  contact: { email: string; linkedin: string; instagram: string };
  imageUrl: string;
  skills: { name: string; level: number }[];
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
    skills: [{ name: "Leadership", level: 98 }, { name: "Strategy", level: 95 }, { name: "Innovation", level: 92 }]
  },
  {
    id: "5",
    name: "Arjun",
    role: "Chief Technology Officer",
    bio: "Architecting the future with cutting-edge technology stacks and scalable solutions.",
    expandedDescription: "Arjun drives SIDAZ's technology strategy. His expertise spans multiple technology stacks and emerging platforms, ensuring optimal solutions for complex challenges.",
    contact: { email: "arjunfree256@gmail.com", linkedin: "#", instagram: "#" },
    imageUrl: "/images/team/arjun.png",
    skills: [{ name: "System Arch", level: 96 }, { name: "AI/ML", level: 90 }, { name: "Cloud", level: 94 }]
  },
  {
    id: "2",
    name: "Mordheeshvara",
    role: "Chief Marketing Officer",
    bio: "Crafting compelling narratives that resonate globally and drive brand growth.",
    expandedDescription: "Mordheesh brings innovative marketing strategies and deep market understanding. His expertise in digital marketing campaigns has significantly enhanced client engagement.",
    contact: { email: "mordheeshvarab@gmail.com", linkedin: "#", instagram: "#" },
    imageUrl: "/images/team/mothy.png",
    skills: [{ name: "Branding", level: 95 }, { name: "Digital Mkt", level: 92 }, { name: "Analytics", level: 88 }]
  },
  {
    id: "6",
    name: "Pratheeb",
    role: "Chief Financial Officer",
    bio: "Ensuring fiscal health and sustainable growth through strategic financial planning.",
    expandedDescription: "Pratheeb oversees SIDAZ's financial strategy. His analytical approach to financial planning and risk management has strengthened the company's economic foundation.",
    contact: { email: "pratheebsuriya786@gmail.com", linkedin: "#", instagram: "#" },
    imageUrl: "/images/team/suriya.png",
    skills: [{ name: "Finance", level: 97 }, { name: "Risk Mgmt", level: 94 }, { name: "Planning", level: 90 }]
  },
  {
    id: "3",
    name: "Ravikanth",
    role: "Chief Blockchain Dev",
    bio: "Building secure, decentralized futures with advanced blockchain protocols.",
    expandedDescription: "Ravikanth leads blockchain initiatives. His innovative approach to decentralized solutions has enabled secure, scalable platforms for diverse client needs.",
    contact: { email: "ravikanthsankaran@gmail.com", linkedin: "#", instagram: "#" },
    imageUrl: "/images/team/raka.png",
    skills: [{ name: "Smart Contracts", level: 96 }, { name: "Web3", level: 94 }, { name: "Security", level: 92 }]
  },
  {
    id: "8",
    name: "Dhinesh",
    role: "Chief Operating Officer",
    bio: "Orchestrating operational excellence and seamless process optimization.",
    expandedDescription: "Dhinesh orchestrates operational efficiency. His systematic approach to workflow management ensures seamless project delivery across all departments.",
    contact: { email: "dhineshsidaz@gmail.com", linkedin: "#", instagram: "#" },
    imageUrl: "/images/team/dhinesh.png",
    skills: [{ name: "Operations", level: 95 }, { name: "Process Opt", level: 93 }, { name: "Mgmt", level: 90 }]
  },
];

export default function TeamSection({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % defaultMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleMembers = () => {
    const total = defaultMembers.length;
    const prev = (activeIndex - 1 + total) % total;
    const next = (activeIndex + 1) % total;
    return [
      { ...defaultMembers[prev], position: 'left' },
      { ...defaultMembers[activeIndex], position: 'center' },
      { ...defaultMembers[next], position: 'right' }
    ];
  };

  return (
    <section className={cn(
      "relative w-full py-32 overflow-hidden",
      "bg-slate-950", // Base dark background
      className
    )}>
      {/* Animated Background - Premium Emerald Theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-emerald-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>World Class Talent</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
          >
            The Minds Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">SIDAZ</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg"
          >
            A collective of visionaries, engineers, and strategists building the impossible.
          </motion.p>
        </div>

        {/* 3D Cover Flow Carousel */}
        <div className="relative h-[650px] flex items-center justify-center perspective-[2000px]">
          <AnimatePresence mode="popLayout">
            {getVisibleMembers().map((member) => {
              const isCenter = member.position === 'center';
              const isLeft = member.position === 'left';

              return (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.3,
                    scale: isCenter ? 1 : 0.8,
                    x: isCenter ? 0 : isLeft ? '-65%' : '65%',
                    z: isCenter ? 100 : -200,
                    rotateY: isCenter ? 0 : isLeft ? 35 : -35,
                    zIndex: isCenter ? 20 : 10
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // smooth easeOutExpo-ish
                  onClick={() => isCenter ? setSelectedMember(member) : setActiveIndex(defaultMembers.findIndex(m => m.id === member.id))}
                  className={cn(
                    "absolute w-[340px] md:w-[420px] h-[580px] rounded-[2rem] overflow-hidden cursor-pointer",
                    "bg-zinc-900/90 border border-white/10 backdrop-blur-xl",
                    isCenter ? "shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/20" : "grayscale-[0.5] blur-[1px]"
                  )}
                >
                  {/* Card Content */}
                  <div className="relative h-full flex flex-col group">
                    <div className="relative h-[65%] w-full overflow-hidden">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full pointer-events-none">
                      <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-3xl font-bold text-white">{member.name}</h3>
                          {isCenter && <BadgeCheck className="w-6 h-6 text-emerald-400" />}
                        </div>
                        <p className="text-emerald-400 font-medium tracking-wide text-sm mb-3">{member.role}</p>
                        <p className="text-zinc-300 text-sm line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-center gap-6 mt-12">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + defaultMembers.length) % defaultMembers.length)}
            className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300 group"
            aria-label="Previous member"
          >
            <ChevronLeft className="w-6 h-6 text-zinc-400 group-hover:text-white" />
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % defaultMembers.length)}
            className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300 group"
            aria-label="Next member"
          >
            <ChevronRight className="w-6 h-6 text-zinc-400 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Member Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-4xl bg-zinc-950/95 border-white/10 p-0 overflow-hidden backdrop-blur-2xl shadow-2xl sm:rounded-[2rem]">
          <DialogTitle className="sr-only">Member Details</DialogTitle>
          {selectedMember && (
            <div className="flex flex-col md:flex-row h-full md:h-[600px]">
              <div className="w-full md:w-5/12 relative h-72 md:h-full bg-zinc-900">
                <Image
                  src={selectedMember.imageUrl}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950/90 via-transparent to-transparent" />
              </div>

              <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-4xl font-bold text-white tracking-tight">{selectedMember.name}</h3>
                    <BadgeCheck className="w-7 h-7 text-emerald-400" />
                  </div>
                  <p className="text-xl text-emerald-400 font-medium mb-6">{selectedMember.role}</p>

                  <p className="text-zinc-300 leading-relaxed text-lg mb-10">
                    {selectedMember.expandedDescription}
                  </p>

                  <div className="space-y-6 mb-10">
                    <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Expertise</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedMember.skills.map((skill, idx) => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-200 font-medium">{skill.name}</span>
                            <span className="text-emerald-400 font-mono">{skill.level}%</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-800/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.3 + (idx * 0.1), ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a href={`mailto:${selectedMember.contact.email}`} className="p-4 rounded-full bg-zinc-900/50 border border-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all duration-300">
                      <Mail className="w-5 h-5" />
                    </a>
                    <a href={selectedMember.contact.linkedin} className="p-4 rounded-full bg-zinc-900/50 border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400 transition-all duration-300">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={selectedMember.contact.instagram} className="p-4 rounded-full bg-zinc-900/50 border border-white/5 hover:bg-pink-500/10 hover:border-pink-500/30 hover:text-pink-400 transition-all duration-300">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}