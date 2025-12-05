"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { Mail, Linkedin, Instagram, X, ArrowUpRight } from "lucide-react";
import { View } from "@react-three/drei";
import TeamScene from "@/components/canvas/TeamScene";
import { useState } from "react";

// Static Imports for Optimization
import founderImg from "../../public/images/team/founder .jpeg";
import shrutiImg from "../../public/images/team/Shruti.jpeg";
import arjunImg from "../../public/images/team/arjun.png";
import mothyImg from "../../public/images/team/mothy.png";
import suriyaImg from "../../public/images/team/suriya.png";
import rakaImg from "../../public/images/team/raka.png";
import dhineshImg from "../../public/images/team/dhinesh.png";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: StaticImageData;
  email: string;
  linkedin?: string;
  instagram?: string;
  bio: string;
  expertise: string[];
};

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarathy",
    role: "Founder",
    image: founderImg,
    email: "sarathy@sidaz.com",
    linkedin: "https://www.linkedin.com/in/sarathyvaittianadasammy/",
    instagram: "https://www.instagram.com/parama_from_petit/?hl=en",
    bio: "Visionary entrepreneur revolutionizing digital experiences through cutting-edge technology and innovative design thinking.",
    expertise: ["Vision", "Strategy", "Innovation"]
  },
  {
    id: "2",
    name: "Shruti",
    role: "Chief Executive Officer",
    image: shrutiImg,
    email: "shrutithamizhselvan@gmail.com",
    linkedin: "https://www.linkedin.com/in/shruti-vaittinadassamy-33b0261b8/",
    instagram: "https://www.instagram.com/_shrutithamizh_07/?hl=en",
    bio: "Strategic leader driving exponential growth and operational excellence with data-driven decision making.",
    expertise: ["Leadership", "Strategy", "Growth"]
  },
  {
    id: "3",
    name: "Arjun",
    role: "Chief Technology Officer",
    image: arjunImg,
    email: "arjunfree256@gmail.com",
    linkedin: "https://www.linkedin.com/in/arjun19/",
    instagram: "https://www.instagram.com/arj._.uun/?hl=en",
    bio: "Technology visionary architecting scalable systems with AI, ML, and cloud-native solutions.",
    expertise: ["AI/ML", "Cloud", "Architecture"]
  },
  {
    id: "4",
    name: "Mordheeshvara",
    role: "Chief Marketing Officer",
    image: mothyImg,
    email: "mordheeshvarab@gmail.com",
    linkedin: "https://www.linkedin.com/in/mordheeshvara/",
    instagram: "https://www.instagram.com/mordheesh/?hl=en",
    bio: "Creative strategist building iconic brands through compelling narratives and data-driven campaigns.",
    expertise: ["Branding", "Growth", "Analytics"]
  },
  {
    id: "5",
    name: "Pratheeb",
    role: "Chief Financial Officer",
    image: suriyaImg,
    email: "pratheebsuriya786@gmail.com",
    linkedin: "https://www.linkedin.com/in/pratheeb-e-4882bb298/",
    instagram: "https://www.instagram.com/_pratheeb_012_/?hl=en",
    bio: "Financial architect ensuring sustainable growth through strategic planning and risk management.",
    expertise: ["Finance", "Strategy", "Analytics"]
  },
  {
    id: "6",
    name: "Ravikanth",
    role: "Chief Blockchain Developer",
    image: rakaImg,
    email: "ravikanthsankaran@gmail.com",
    linkedin: "https://www.linkedin.com/in/ravikanth-s/",
    instagram: "https://www.instagram.com/__its__r____k___/?hl=en",
    bio: "Blockchain pioneer building secure, decentralized ecosystems with Web3 and smart contracts.",
    expertise: ["Blockchain", "Web3", "Security"]
  },
  {
    id: "7",
    name: "Dhinesh",
    role: "Chief Operating Officer",
    image: dhineshImg,
    email: "dhineshsidaz@gmail.com",
    linkedin: "https://www.linkedin.com/in/dhineshkumar-gl/",
    instagram: "https://www.instagram.com/itz_dhinesh_05/?hl=en",
    bio: "Operations excellence leader optimizing workflows and ensuring flawless project delivery.",
    expertise: ["Operations", "Process", "Delivery"]
  }
];

function TeamCard({ member, index, onClick }: { member: TeamMember; index: number; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 hover:border-violet-500/50 hover:bg-white/10 will-change-transform">
        {/* Tech Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-2xl group-hover:border-violet-500 transition-colors" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-2xl group-hover:border-violet-500 transition-colors" />
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              priority={index < 4}
              quality={80}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Founder Badge */}
          {member.role === "Founder" && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 z-10">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Founder</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-2">
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
              {member.name}
            </h3>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              {member.role}
            </p>
          </div>

          {/* View Profile Hint */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5 text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">
            <span>View Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { useModal } from "@/context/ModalContext";

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { setModalOpen } = useModal();

  const handleOpenModal = (member: TeamMember) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
    // setModalOpen(false) is now handled in onExitComplete
  };

  return (
    <section
      id="team"
      className="relative w-full min-h-screen flex items-center justify-center py-32 overflow-hidden bg-transparent"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <View className="absolute inset-0">
          <TeamScene />
        </View>
      </div>

      <div className="container mx-auto px-4 z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-zinc-300 tracking-wide">World Class Team</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Meet the <span className="text-zinc-500">Minds.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-xl mx-auto"
          >
            A collective of visionaries, strategists, and technologists defining the future.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              index={index}
              onClick={() => handleOpenModal(member)}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence onExitComplete={() => setModalOpen(false)}>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/95" // Removed blur, increased opacity
            />

            <motion.div
              initial={{ opacity: 0, scaleY: 0.9 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible will-change-transform origin-center"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Side */}
              <div className="relative w-full md:w-2/5 h-64 md:h-auto shrink-0">
                <div className="relative w-full h-full">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    priority
                    placeholder="blur"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {selectedMember.name}
                  </h3>
                  <p className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                    {selectedMember.role}
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-zinc-300 leading-relaxed mb-8 text-lg">
                    {selectedMember.bio}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-sm font-medium text-zinc-300 bg-white/5 rounded-full border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Get in Touch</span>
                    </a>

                    <div className="flex gap-2">
                      {selectedMember.linkedin && (
                        <a
                          href={selectedMember.linkedin}
                          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 hover:border-white/30"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {selectedMember.instagram && (
                        <a
                          href={selectedMember.instagram}
                          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 hover:border-white/30"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}