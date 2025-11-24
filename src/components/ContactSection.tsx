"use client";

import * as React from "react";
import { MapPin, Map, TextCursorInput } from "lucide-react";
import { toast } from "sonner";
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

type ContactSectionProps = {
  id?: string;
  className?: string;
  map?: {
    lat: number;
    lng: number;
    label?: string;
    zoom?: number;
  };
  onSubmitAction?: (data: ContactFormData) => Promise<void> | void;
};

const defaultMap = {
  lat: 11.9416,
  lng: 79.8083,
  label: "SIDAZ - Villianur, Pondicherry",
  zoom: 15,
};

export default function ContactSection({
  id,
  className,
  map = defaultMap,
  onSubmitAction,
}: ContactSectionProps) {
  const [loading, setLoading] = React.useState(false);
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [values, setValues] = React.useState<ContactFormData>({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = React.useState<"idle" | "success" | "error">(
    "idle"
  );

  const errors = React.useMemo(() => validate(values), [values]);

  function validate(v: ContactFormData) {
    const e: Partial<Record<keyof ContactFormData, string>> = {};
    if (!v.name.trim()) e.name = "Please enter your name.";
    else if (v.name.trim().length < 2) e.name = "Name must be at least 2 characters.";

    if (!v.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
      e.email = "Please enter a valid email address.";

    if (!v.projectType) e.projectType = "Please select a project type.";

    if (!v.message.trim()) e.message = "Please enter a short message.";
    else if (v.message.trim().length < 10)
      e.message = "Message must be at least 10 characters.";

    return e;
  }

  const isValid = Object.keys(errors).length === 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      projectType: true,
      message: true,
    });

    if (!isValid) {
      toast.error("Please fix the highlighted fields.");
      setSubmitted("error");
      return;
    }

    try {
      setLoading(true);
      setSubmitted("idle");

      // If external handler provided, use it
      if (onSubmitAction) {
        await onSubmitAction(values);
      } else {
        // Create mailto link with form data
        const subject = encodeURIComponent(`New Project Inquiry from ${values.name}`);
        const body = encodeURIComponent(
          `Name: ${values.name}\n` +
          `Email: ${values.email}\n` +
          `Project Type: ${values.projectType}\n` +
          `Message:\n${values.message}\n\n` +
          `---\n` +
          `Sent from SIDAZ Contact Form`
        );

        const mailtoLink = `mailto:sidaztechnologies@gmail.com?subject=${subject}&body=${body}`;

        // Open mailto link
        window.location.href = mailtoLink;

        // Small delay to allow mailto to open
        await new Promise((res) => setTimeout(res, 500));
      }

      setSubmitted("success");
      toast.success("Thanks! Your email client will open. We'll get back to you shortly.");
      setValues({ name: "", email: "", projectType: "", message: "" });
      setTouched({});
    } catch (err) {
      console.error(err);
      setSubmitted("error");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const mapSrc = React.useMemo(() => {
    const q = encodeURIComponent(`${map.lat},${map.lng}`);
    const z = map.zoom ?? 12;
    // Standard Google Maps embed; we'll apply a dark overlay and our own purple pin.
    return `https://www.google.com/maps?q=${q}&z=${z}&output=embed`;
  }, [map.lat, map.lng, map.zoom]);

  return (
    <section
      id={id}
      className={cn(
        "w-full max-w-full",
        className
      )}
      aria-label="Contact section"
    >
      <div
        className={cn(
          // Glassmorphic card container
          "relative w-full max-w-full rounded-2xl border bg-card/70 backdrop-blur-xl",
          "shadow-[0_0_0_1px_rgba(155,140,255,0.08),0_20px_60px_-20px_rgba(0,0,0,0.5)]"
        )}
      >
        {/* Subtle purple ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            maskImage:
              "radial-gradient(60% 60% at 30% 20%, rgba(0,0,0,0.2) 0%, transparent 60%)",
          }}
        />
        <div className="p-6 sm:p-8 md:p-10">
          <header className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Map className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-xs sm:text-sm tracking-wide uppercase">
                Contact
              </span>
            </div>
            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-heading">
              Let’s create something remarkable
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-prose">
              Share a few details about your project and where we can meet you.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 min-w-0">
            {/* Form */}
            <div className="min-w-0">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
                aria-describedby={
                  submitted === "success"
                    ? "contact-status-success"
                    : submitted === "error"
                      ? "contact-status-error"
                      : undefined
                }
              >
                {/* Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ada Lovelace"
                    value={values.name}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, name: e.target.value }))
                    }
                    aria-invalid={!!(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                    className={cn(
                      "bg-muted/40 border-input text-foreground placeholder:text-muted-foreground",
                      "transition-shadow focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring",
                      "shadow-[inset_0_0_0_1px_rgba(107,110,249,0.15)]",
                      "focus:shadow-[0_0_0_3px_rgba(107,110,249,0.25),inset_0_0_0_1px_rgba(107,110,249,0.25)]",
                      touched.name && errors.name
                        ? "border-destructive focus-visible:ring-destructive/60"
                        : ""
                    )}
                  />
                  {touched.name && errors.name ? (
                    <p id="name-error" className="text-xs text-destructive">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@domain.com"
                    value={values.email}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, email: e.target.value }))
                    }
                    aria-invalid={!!(touched.email && errors.email)}
                    aria-describedby={
                      touched.email && errors.email ? "email-error" : undefined
                    }
                    className={cn(
                      "bg-muted/40 border-input text-foreground placeholder:text-muted-foreground",
                      "transition-shadow focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring",
                      "shadow-[inset_0_0_0_1px_rgba(107,110,249,0.15)]",
                      "focus:shadow-[0_0_0_3px_rgba(107,110,249,0.25),inset_0_0_0_1px_rgba(107,110,249,0.25)]",
                      touched.email && errors.email
                        ? "border-destructive focus-visible:ring-destructive/60"
                        : ""
                    )}
                  />
                  {touched.email && errors.email ? (
                    <p id="email-error" className="text-xs text-destructive">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                {/* Project Type */}
                <div className="grid gap-2 min-w-0">
                  <Label htmlFor="projectType">Project type</Label>
                  <Select
                    value={values.projectType || undefined}
                    onValueChange={(val) => {
                      setValues((v) => ({ ...v, projectType: val }));
                      setTouched((t) => ({ ...t, projectType: true }));
                    }}
                  >
                    <SelectTrigger
                      id="projectType"
                      className={cn(
                        "bg-muted/40 border-input text-foreground",
                        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring",
                        "shadow-[inset_0_0_0_1px_rgba(107,110,249,0.15)]",
                        "focus:shadow-[0_0_0_3px_rgba(107,110,249,0.25),inset_0_0_0_1px_rgba(107,110,249,0.25)]",
                        touched.projectType && errors.projectType
                          ? "border-destructive focus-visible:ring-destructive/60"
                          : ""
                      )}
                      aria-invalid={!!(touched.projectType && errors.projectType)}
                      aria-describedby={
                        touched.projectType && errors.projectType
                          ? "projectType-error"
                          : undefined
                      }
                    >
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border">
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="webapp">Web App</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                  {touched.projectType && errors.projectType ? (
                    <p id="projectType-error" className="text-xs text-destructive">
                      {errors.projectType}
                    </p>
                  ) : null}
                </div>

                {/* Message */}
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your goals, timeline, and any links."
                    value={values.message}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, message: e.target.value }))
                    }
                    aria-invalid={!!(touched.message && errors.message)}
                    aria-describedby={
                      touched.message && errors.message ? "message-error" : undefined
                    }
                    className={cn(
                      "min-h-28 resize-y bg-muted/40 border-input text-foreground placeholder:text-muted-foreground",
                      "transition-shadow focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring",
                      "shadow-[inset_0_0_0_1px_rgba(107,110,249,0.15)]",
                      "focus:shadow-[0_0_0_3px_rgba(107,110,249,0.25),inset_0_0_0_1px_rgba(107,110,249,0.25)]",
                      touched.message && errors.message
                        ? "border-destructive focus-visible:ring-destructive/60"
                        : ""
                    )}
                  />
                  {touched.message && errors.message ? (
                    <p id="message-error" className="text-xs text-destructive">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                {/* Status */}
                <div className="min-h-6" role="status" aria-live="polite">
                  {submitted === "success" ? (
                    <p
                      id="contact-status-success"
                      className="text-sm text-emerald-400"
                    >
                      Message sent successfully.
                    </p>
                  ) : submitted === "error" ? (
                    <p id="contact-status-error" className="text-sm text-destructive">
                      Please review the form and try again.
                    </p>
                  ) : null}
                </div>

                {/* Submit */}
                <div className="pt-1">
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <span
                          className="h-4 w-4 rounded-full border-2 border-primary-foreground/60 border-t-transparent animate-spin"
                          aria-hidden="true"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <TextCursorInput className="h-4 w-4" aria-hidden="true" />
                        Let&apos;s Build Together
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Map */}
            <div className="min-w-0">
              <div
                className={cn(
                  "relative aspect-[4/3] w-full overflow-hidden rounded-xl border",
                  "bg-secondary"
                )}
              >
                <GoogleMap
                  className="absolute inset-0 h-full w-full"
                  height="100%"
                  width="100%"
                />

                {/* Location badge */}
                <div className="absolute left-3 top-3 flex min-w-0 items-center gap-2 rounded-full border bg-card/80 px-3 py-1.5 text-xs text-foreground backdrop-blur-md">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                  <span className="min-w-0 truncate">
                    {map.label || "Our location"}
                  </span>
                </div>

                {/* Action hint */}
                <div className="absolute right-3 bottom-3 rounded-full border bg-card/80 px-2.5 py-1 text-[11px] text-muted-foreground backdrop-blur-md">
                  Click marker for info
                </div>
              </div>

              {/* Address helper */}
              <div className="mt-3 text-sm text-muted-foreground break-words">
                Prefer a call? Email us at{" "}
                <a
                  className="underline decoration-primary/40 underline-offset-4 hover:text-foreground"
                  href="mailto:sidaztechnologies@gmail.com"
                >
                  sidaztechnologies@gmail.com
                </a>
                {" "}or call us at{" "}
                <a
                  className="underline decoration-primary/40 underline-offset-4 hover:text-foreground"
                  href="tel:+919514332052"
                >
                  +91 9514332052
                </a>
                {" "}or{" "}
                <a
                  className="underline decoration-primary/40 underline-offset-4 hover:text-foreground"
                  href="tel:+917397515675"
                >
                  +91 7397515675
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}