"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, Target, Users, Zap } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const values = [
    {
      icon: Rocket,
      title: "Innovation First",
      description: "Pushing boundaries with cutting-edge technology and creative solutions."
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "Focused on delivering measurable impact and exceeding expectations."
    },
    {
      icon: Users,
      title: "Client Focused",
      description: "Your success is our mission. We build lasting partnerships."
    },
    {
      icon: Zap,
      title: "Speed & Quality",
      description: "Fast delivery without compromising on excellence and precision."
    }
  ];

  const founder = {
    name: "Sarathy",
    role: "Founder",
    image: "/images/team/founder .jpeg",
    bio: "Visionary entrepreneur who founded SIDAZ with a mission to revolutionize digital experiences through cutting-edge technology and exceptional design. With a passion for innovation and excellence, Sarathy leads the company towards transforming ideas into reality."
  };

  return (
    <section
      ref={ref}
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 z-10">
        {/* Header */}
        <motion.div
          style={{ opacity }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <span className="text-sm font-medium text-violet-400">About Us</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-8"
          >
            <span className="text-white">Transforming Ideas</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Into Reality
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 leading-relaxed"
          >
            We're a team of passionate developers, designers, and innovators
            dedicated to building exceptional digital experiences. Founded in 2024,
            we've rapidly grown into a trusted partner for businesses worldwide.
          </motion.p>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto mb-20"
        >
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-md overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/10 group-hover:to-fuchsia-500/10 transition-all duration-500" />

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Founder Image */}
              <div className="md:col-span-1">
                <div className="relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 group-hover:border-violet-500/50 transition-all">
                    <Image
                      src="/images/team/founder .jpeg" // Matches actual filename
                      alt={founder.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Founder Details */}
              <div className="md:col-span-2 text-center md:text-left">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {founder.name}
                </h3>
                <p className="text-lg text-violet-400 font-semibold mb-4">
                  {founder.role}
                </p>
                <p className="text-zinc-300 leading-relaxed">
                  {founder.bio}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-violet-500/50 transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                {value.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                {value.description}
              </p>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/10 group-hover:to-fuchsia-500/10 transition-all duration-500 -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Story Section - Timeline Layout */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-md overflow-hidden">
            <h3 className="text-3xl font-bold text-white mb-12 text-center">
              Our Journey
            </h3>

            <div className="relative border-l-2 border-white/10 ml-6 md:ml-12 space-y-12">
              {/* 2024 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-violet-500 ring-4 ring-black" />
                <h4 className="text-2xl font-bold text-white mb-2">2024</h4>
                <p className="text-violet-400 font-semibold mb-2">Ideation & Inception</p>
                <p className="text-zinc-400 leading-relaxed">
                  Born from a vision to revolutionize digital experiences through innovative technology and exceptional design. We assembled our core team of visionaries and started building the foundation.
                </p>
              </div>

              {/* 2025 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-black animate-pulse" />
                <h4 className="text-2xl font-bold text-white mb-2">2025</h4>
                <p className="text-cyan-400 font-semibold mb-2">Global Launch</p>
                <p className="text-zinc-400 leading-relaxed">
                  Ready to transform businesses worldwide with our cutting-edge solutions. We are scaling our operations and launching our flagship products to the global market.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
