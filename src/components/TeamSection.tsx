"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Users, Linkedin, Instagram, Mail, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SocialLinks = {
  linkedin?: string;
  github?: string;
  instagram?: string;
  email?: string;
};

type ContactInfo = {
  email: string;
  linkedin: string;
  instagram: string;
};

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  expandedDescription?: string;
  contact?: ContactInfo;
  imageUrl: string;
  links?: SocialLinks;
}

interface TeamSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
}

const defaultMembers: TeamMember[] = [
  // Ordered: CEO, CFO, CTO, CMO, CBD, COO
  {
    id: "1",
    name: "Shruti",
    role: "Chief Executive Officer(CEO)",
    bio: "Transforms corporate vision into sustainable market leadership.",
    expandedDescription: "As Chief Executive Officer, Shruti spearheads SIDAZ's strategic vision with exceptional leadership and business acumen. She expertly navigates complex market dynamics while fostering innovation across all departments. Her collaborative approach and commitment to excellence has positioned SIDAZ as a leader in digital transformation solutions.",
    contact: {
      email: "shrutithamizhselvan@gmail.com",
      linkedin: "https://www.linkedin.com/in/sushmidha06/",
      instagram: "https://www.instagram.com/_shrutithamizh_07/?hl=en"
    },
    imageUrl: "/images/team/Shruti.jpeg",
    links: {
      linkedin: "https://www.linkedin.com/in/shruti-vaittinadassamy-33b0261b8/",
      instagram: "https://www.instagram.com/_shrutithamizh_07/?hl=en",
      email: "shrutithamizhselvan@gmail.com",
    },
  },

  {
    id: "5",
    name: "Arjun",
    role: "Chief Technology Officer(CTO)",
    bio: "Translates technical innovation into market-ready products.",
    expandedDescription: "Arjun drives SIDAZ's technology strategy and innovation roadmap with exceptional technical leadership and forward-thinking vision. His expertise spans multiple technology stacks and emerging platforms, ensuring optimal solutions for complex challenges. He fosters a culture of continuous learning and technological excellence that keeps SIDAZ at the forefront of industry developments.",
    contact: {
      email: "arjunfree256@gmail.com",
      linkedin: "https://www.linkedin.com/in/arjun19",
      instagram: "https://www.instagram.com/arj._.uun/?hl=en"
    },
    imageUrl: "/images/team/arjun.png",
    links: {
      linkedin: "https://www.linkedin.com/in/arjun19",
      instagram: "https://www.instagram.com/arj._.uun/?hl=en",
      email: "arjunfree256@gmail.com",
    },
  },
  {
    id: "2",
    name: "Mordheeshvara",
    role: "Chief Marketing Officer(CMO)",
    bio: "Translates market insights into compelling brand narratives.",
    expandedDescription: "Mordheesh brings innovative marketing strategies and deep market understanding to drive SIDAZ's brand presence across global markets. His expertise in digital marketing campaigns and brand storytelling has significantly enhanced client engagement and market penetration. He consistently delivers data-driven marketing solutions that align with business objectives and customer needs.",
    contact: {
      email: "mordheeshvarab@gmail.com",
      linkedin: "https://www.linkedin.com/in/mordheeshvara/",
      instagram: "https://www.instagram.com/mordheesh/?next=%2F&hl=en"
    },
    imageUrl: "/images/team/mothy.png",
    links: {
      linkedin: "https://www.linkedin.com/in/mordheeshvara/",
      instagram: "https://www.instagram.com/mordheesh/?next=%2F&hl=en",
      email: "mordheeshvarab@gmail.com",
    },
  },
  {
    id: "6",
    name: "Pratheeb",
    role: "Chief Financial Officer(CFO)",
    bio: "Translates fiscal discipline into sustainable company growth.",
    expandedDescription: "Pratheeb oversees SIDAZ's financial strategy and operations with meticulous attention to fiscal responsibility and growth optimization. His analytical approach to financial planning and risk management has strengthened the company's economic foundation. He ensures sustainable financial practices while supporting strategic investments that fuel long-term business expansion.",
    contact: {
      email: "pratheebsuriya786@gmail.com",
      linkedin: "https://www.linkedin.com/in/pratheeb-e-4882bb298/",
      instagram: "https://www.instagram.com/_pratheeb_012_/?hl=en"
    },
    imageUrl: "/images/team/suriya.png",
    links: {
      linkedin: "https://www.linkedin.com/in/pratheeb-e-4882bb298/",
      instagram: "https://www.instagram.com/_pratheeb_012_/?hl=en",
      email: "pratheebsuriya786@gmail.com",
    },
  },

  {
    id: "3",
    name: "Ravikanth",
    role: "Chief Blockchain Developer(CBD)",
    bio: "Translates business logic into secure, decentralized protocols.",
    expandedDescription: "Ravikanth leads SIDAZ's blockchain development initiatives with deep expertise in decentralized technologies and smart contract architecture. His innovative approach to blockchain solutions has enabled secure, scalable platforms for diverse client needs. He combines technical excellence with strategic thinking to deliver cutting-edge blockchain implementations that drive business value.",
    contact: {
      email: "ravikanthsankaran@gmail.com",
      linkedin: "https://www.linkedin.com/in/ravikanth-s",
      instagram: "https://www.instagram.com/__its__r____k___/?hl=en"
    },
    imageUrl: "/images/team/raka.png",
    links: {
      linkedin: "https://www.linkedin.com/in/ravikanth-s",
      instagram: "https://www.instagram.com/__its__r____k___/?hl=en",
      email: "ravikanthsankaran@gmail.com",
    },
  },
  {
    id: "8",
    name: "Dhinesh",
    role: "Chief Operating Officer(COO)",
    bio: "Translates visionary strategy into operational excellence.",
    expandedDescription: "Dhinesh orchestrates SIDAZ's operational efficiency and process optimization with exceptional organizational skills and strategic oversight. His systematic approach to workflow management and quality assurance ensures seamless project delivery across all departments. He continuously refines operational processes to enhance productivity while maintaining the highest standards of service excellence.",
    contact: {
      email: "dhineshsidaz@gmail.com",
      linkedin: "https://www.linkedin.com/in/dhinesh",
      instagram: "https://www.instagram.com/itz_dhinesh_05/?hl=en"
    },
    imageUrl: "/images/team/dhinesh.png",
    links: {
      linkedin: "https://www.linkedin.com/in/dhinesh",
      instagram: "https://www.instagram.com/itz_dhinesh_05/?hl=en",
      email: "dhinesh20041105@gmail.com",
    },
  },
];

function clsx(...classes: (string | string[] | false | null | undefined)[]) {
  return classes.flat().filter(Boolean).join(" ");
}

export default function TeamSection({
  className,
  title = "Our Team",
  subtitle = "The people crafting thoughtful products with precision and care.",
  members = defaultMembers,
}: TeamSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalMembers = members.length;

  // Calculate visible members for 3D effect (Prev, Current, Next)
  const getVisibleMembers = () => {
    if (totalMembers === 0) return [];
    if (totalMembers === 1) return [{ ...members[0], position: 'center' }];
    if (totalMembers === 2) {
      const prevIndex = (activeIndex - 1 + totalMembers) % totalMembers;
      return [
        { ...members[prevIndex], position: 'left' },
        { ...members[activeIndex], position: 'center' }
      ];
    }

    const prevIndex = (activeIndex - 1 + totalMembers) % totalMembers;
    const nextIndex = (activeIndex + 1) % totalMembers;
    return [
      { ...members[prevIndex], position: 'left' },
      { ...members[activeIndex], position: 'center' },
      { ...members[nextIndex], position: 'right' }
    ];
  };

  const visibleMembers = getVisibleMembers();

  const openMemberModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeMemberModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const nextMember = () => {
    setActiveIndex((prev) => (prev + 1) % totalMembers);
  };

  const prevMember = () => {
    setActiveIndex((prev) => (prev - 1 + totalMembers) % totalMembers);
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (totalMembers <= 1) return; // No need to auto-scroll if 1 or fewer members
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalMembers);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [totalMembers]);

  return (
    <section
      className={clsx(
        "w-full",
        "text-foreground",
        "relative",
        className
      )}
      aria-label="Team"
    >
      <header className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" aria-hidden="true" />
          <span className="text-xs sm:text-sm uppercase tracking-wide">
            Team
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-3">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
                {subtitle}
              </p>
            ) : null}
          </div>

          {/* Navigation Controls Removed as per request */}
        </div>
      </header>

      {/* Team Members 3D Carousel */}
      <div className="relative overflow-visible perspective-[2000px] py-10">
        {/* Carousel Container with 3D effect */}
        <div
          className={clsx(
            "grid",
            "grid-cols-1", // Mobile: 1 column
            "md:grid-cols-3", // Desktop: 3 columns
            "gap-6 sm:gap-8",
            "items-center justify-center",
            "transition-all duration-700 ease-out"
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {visibleMembers.map((m, index) => {
            // Determine 3D transform based on position
            const isLeft = m.position === 'left';
            const isCenter = m.position === 'center';
            const isRight = m.position === 'right';

            return (
              <article
                key={`${m.id}-${index}`}
                onClick={() => isCenter && openMemberModal(m)}
                className={clsx(
                  "group relative overflow-hidden cursor-pointer",
                  "rounded-2xl",
                  "bg-[#0a0a0a]", // Darker background
                  "border border-white/5",
                  "transition-all duration-700 ease-out",
                  "w-full max-w-[300px] sm:max-w-[340px]", // Increased width ("little big")
                  "min-h-[420px]", // Increased height
                  // Visibility logic
                  !isCenter && "hidden md:block",
                  // Center card styling
                  isCenter ? [
                    "hover:-translate-y-2 hover:scale-[1.02]",
                    "shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)]", // Purple glow hint (Theme color)
                    "opacity-100",
                    "z-10"
                  ] : [
                    "opacity-40 hover:opacity-60",
                    "scale-90",
                    "grayscale-[0.8]",
                    "z-0"
                  ],
                  "transform-gpu"
                )}
                style={{
                  transformStyle: "preserve-3d",
                  // Tight spacing for wider cards
                  transform: `perspective(1000px) 
                  ${isLeft ? 'rotateY(20deg) translateZ(-80px) translateX(60px)' : ''} 
                  ${isCenter ? 'rotateY(0deg) translateZ(0px) scale(1.0)' : ''}
                  ${isRight ? 'rotateY(-20deg) translateZ(-80px) translateX(-60px)' : ''}
                `
                }}
                onMouseMove={(e) => {
                  if (!isCenter) return;
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 25;
                  const rotateY = (centerX - x) / 25;

                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-0.5rem) scale(1.02)`;
                }}
                onMouseLeave={(e) => {
                  if (!isCenter) return;
                  e.currentTarget.style.transform = `perspective(1000px) rotateY(0deg) translateZ(0px) scale(1.0)`;
                }}
              >
                {/* Theme accent glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                <div className="px-6 pb-10 pt-10 text-center relative z-10 flex flex-col items-center h-full">
                  {/* Avatar with Ring */}
                  <div className="relative mb-8">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors duration-500 shadow-xl bg-zinc-900 relative">
                      <Image
                        src={m.imageUrl}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 128px, 144px"
                        className="object-cover object-center"
                        quality={100}
                        priority={isCenter}
                      />
                    </div>
                    {/* Verified Badge */}
                    <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-black shadow-sm transform translate-x-1 translate-y-1">
                      VERIFIED
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="w-full mb-6">
                    <h3 className="text-2xl font-bold text-white leading-tight truncate">
                      {m.name}
                    </h3>
                    <p className="text-sm font-bold text-primary uppercase tracking-wider mt-2">
                      {m.role}
                    </p>
                  </div>

                  {/* Bio/Quote */}
                  <div className="flex-1 w-full flex items-center justify-center">
                    <p className="text-base text-zinc-400 italic leading-relaxed line-clamp-4">
                      "{m.bio}"
                    </p>
                  </div>
                </div>

                {/* Enhanced Social Icons with Premium Animations */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
                  {/* LinkedIn Icon */}
                  {m.links?.linkedin && (
                    <a
                      href={m.links?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={clsx(
                        "group/linkedin relative w-11 h-11 rounded-full",
                        "bg-gradient-to-br from-blue-500/30 to-blue-600/40",
                        "backdrop-blur-md border-2 border-blue-400/40",
                        "flex items-center justify-center",
                        "hover:scale-125 hover:rotate-12",
                        "transition-all duration-300 ease-out",
                        "shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50",
                        "animate-[bounceIn_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]"
                      )}
                      aria-label={`Visit ${m.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="h-5 w-5 text-blue-200 group-hover/linkedin:text-white transition-colors duration-300 relative z-10" />
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-blue-400/0 group-hover/linkedin:border-blue-300/80 group-hover/linkedin:scale-150 group-hover/linkedin:opacity-0 transition-all duration-700" />
                    </a>
                  )}

                  {/* Instagram Icon */}
                  {m.links?.instagram && (
                    <a
                      href={m.links?.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={clsx(
                        "group/instagram relative w-11 h-11 rounded-full",
                        "bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-orange-500/30",
                        "backdrop-blur-md border-2 border-pink-400/40",
                        "flex items-center justify-center",
                        "hover:scale-125 hover:rotate-[-12deg]",
                        "transition-all duration-300 ease-out",
                        "shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/50",
                        "animate-[bounceIn_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]"
                      )}
                      aria-label={`Visit ${m.name}'s Instagram profile`}
                    >
                      <Instagram className="h-5 w-5 text-pink-200 group-hover/instagram:text-white transition-colors duration-300 relative z-10" />
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-pink-400/0 group-hover/instagram:border-pink-300/80 group-hover/instagram:scale-150 group-hover/instagram:opacity-0 transition-all duration-700" />
                    </a>
                  )}

                  {/* Mail Icon */}
                  {m.links?.email && (
                    <a
                      href={`mailto:${m.links?.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className={clsx(
                        "group/email relative w-11 h-11 rounded-full",
                        "bg-gradient-to-br from-primary/30 to-violet-600/40",
                        "backdrop-blur-md border-2 border-primary/40",
                        "flex items-center justify-center",
                        "hover:scale-125 hover:rotate-6",
                        "transition-all duration-300 ease-out",
                        "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50",
                        "animate-[bounceIn_0.6s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]"
                      )}
                      aria-label={`Send email to ${m.name}`}
                    >
                      <Mail className="h-5 w-5 text-violet-200 group-hover/email:text-white transition-colors duration-300 relative z-10" />
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-primary/0 group-hover/email:border-primary/80 group-hover/email:scale-150 group-hover/email:opacity-0 transition-all duration-700" />
                    </a>
                  )}
                </div>

                {/* Focus ring for accessibility */}
                <span
                  className="absolute inset-0 rounded-2xl ring-0 ring-primary/0 transition-all duration-300 group-focus-within:ring-4 group-focus-within:ring-primary/40 pointer-events-none z-30"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Enhanced Carousel Dot Indicators */}
        {totalMembers > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            {Array.from({ length: totalMembers }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={clsx(
                  "group relative transition-all duration-300 ease-out focus:outline-none",
                  "p-2" // Increase hit area
                )}
                aria-label={`Go to member ${index + 1}`}
                aria-current={activeIndex === index ? "true" : "false"}
              >
                <div
                  className={clsx(
                    "h-2.5 w-2.5 rounded-full transition-all duration-300",
                    activeIndex === index
                      ? "bg-primary scale-125 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-110"
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>


      {/* Team Member Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border border-border/60 shadow-2xl">
          {selectedMember && (
            <>
              <DialogHeader className="space-y-4">
                <div className="flex items-center gap-6">
                  {/* Member Photo */}
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-zinc-800/50 border-2 border-primary/30 shadow-lg">
                    <Image
                      src={selectedMember.imageUrl}
                      alt={`${selectedMember.name} photo`}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                      quality={100}
                    />
                    <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-primary/30 transition-all duration-300" />
                  </div>

                  {/* Name and Title */}
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-bold text-foreground">
                      {selectedMember.name}
                    </DialogTitle>
                    <p className="text-lg text-primary font-medium mt-1">
                      {selectedMember.role}
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Expanded Description */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">About</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedMember.expandedDescription || selectedMember.bio}
                  </p>
                </div>

                {/* Contact Information */}
                {selectedMember.contact && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Contact</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Email */}
                      <a
                        href={`mailto:${selectedMember.contact.email}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 hover:border-primary/30 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary">Email</p>
                          <p className="text-xs text-muted-foreground truncate">{selectedMember.contact.email}</p>
                        </div>
                      </a>

                      {/* LinkedIn */}
                      <a
                        href={selectedMember.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 hover:border-blue-500/30 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                          <Linkedin className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground group-hover:text-blue-400">LinkedIn</p>
                          <p className="text-xs text-muted-foreground">Professional Profile</p>
                        </div>
                      </a>

                      {/* Instagram */}
                      <a
                        href={selectedMember.contact.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 hover:border-pink-500/30 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20 border border-pink-500/30 flex items-center justify-center">
                          <Instagram className="h-5 w-5 text-pink-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground group-hover:text-pink-400">Instagram</p>
                          <p className="text-xs text-muted-foreground">Social Profile</p>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}