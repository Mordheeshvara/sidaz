"use client";

import * as React from "react";
import { MapPin, Map, TextCursorInput, Send, Phone, Mail, Globe, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import GoogleMap from "@/components/GoogleMap";

type ContactFormData = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

const defaultMap = {
  lat: 11.9416,
  lng: 79.8083,
  label: "SIDAZ - Villianur, Pondicherry",
  zoom: 15,
};

export default function ContactSection({
  className,
  map = defaultMap,
}: {
  className?: string;
  map?: typeof defaultMap;
}) {
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState<ContactFormData>({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.name || !values.email || !values.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const subject = encodeURIComponent(`New Project Inquiry from ${values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nProject Type: ${values.projectType}\nMessage:\n${values.message}`
    );
    window.location.href = `mailto:sidaztechnologies@gmail.com?subject=${subject}&body=${body}`;

    toast.success("Opening your email client...");
    setLoading(false);
    setValues({ name: "", email: "", projectType: "", message: "" });
  }

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full py-32 overflow-hidden",
        "bg-slate-950",
        className
      )}
    >
      {/* Multi-gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950 via-[#0a0a0a] to-black" />
        <motion.div
          style={{ y }}
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-amber-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column: Content & Info */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium mb-8 w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for new projects</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            >
              Let's create <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                something epic.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-400 mb-12 max-w-lg leading-relaxed"
            >
              Ready to transform your digital presence? We're here to help you build scalable, future-proof solutions.
            </motion.p>

            <div className="space-y-8">
              <motion.a
                href="mailto:sidaztechnologies@gmail.com"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-6 group hover-lift-glow p-4 rounded-2xl transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-500">
                  <Mail className="w-8 h-8 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider mb-1">Email Us</p>
                  <p className="text-xl text-white font-semibold group-hover:text-emerald-400 transition-colors">sidaztechnologies@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:+919514332052"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-6 group hover-lift-glow p-4 rounded-2xl transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-teal-500/10 group-hover:border-teal-500/30 transition-all duration-500">
                  <Phone className="w-8 h-8 text-zinc-400 group-hover:text-teal-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider mb-1">Call Us</p>
                  <p className="text-xl text-white font-semibold group-hover:text-teal-400 transition-colors">+91 9514332052</p>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Right Column: Form & Map */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 glass-premium rounded-[2rem] p-8 md:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-zinc-400">Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={values.name}
                      onChange={(e) => setValues({ ...values, name: e.target.value })}
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 h-12 rounded-xl transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-400">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={values.email}
                      onChange={(e) => setValues({ ...values, email: e.target.value })}
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 h-12 rounded-xl transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-zinc-400">Project Type</Label>
                  <Select
                    value={values.projectType}
                    onValueChange={(val) => setValues({ ...values, projectType: val })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-emerald-500/20 focus:border-emerald-500/50">
                      <SelectValue placeholder="Select a project type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                      <SelectItem value="website">Website Development</SelectItem>
                      <SelectItem value="webapp">Web Application</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="blockchain">Blockchain Solution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-zinc-400">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    value={values.message}
                    onChange={(e) => setValues({ ...values, message: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 min-h-[150px] rounded-xl resize-none transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-lg shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <span className="animate-spin mr-2">⏳</span>
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>

              {/* Map Preview */}
              <div className="mt-8 relative h-48 w-full rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
                <GoogleMap
                  className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  height="100%"
                  width="100%"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium">Villianur, Pondicherry</span>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-700" />
          </div>
        </div>
      </div>
    </section>
  );
}