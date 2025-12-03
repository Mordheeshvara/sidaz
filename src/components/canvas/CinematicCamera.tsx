"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicCamera() {
    const { camera } = useThree();
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop/High-Motion Animation
            mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
                // Initial Camera Pose (Hero Start)
                camera.position.set(0, 0, 14);
                camera.lookAt(0, 0, 0);

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "main", // Track the entire main container
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.5, // Smooth scrubbing
                    },
                });

                timelineRef.current = tl;

                // --- HERO SECTION (0% - 20%) ---
                // Slight dolly in and rotation
                tl.to(camera.position, {
                    x: 0,
                    y: 0,
                    z: 10,
                    duration: 2,
                    ease: "power1.inOut",
                }, "hero");


                // --- ABOUT SECTION (20% - 40%) ---
                // Move to side to frame the "Hexagon Grid"
                tl.to(camera.position, {
                    x: -5,
                    y: 0,
                    z: 12,
                    duration: 2,
                    ease: "power2.inOut",
                }, "about");

                // Rotate to look at the grid
                tl.to(camera.rotation, {
                    y: -0.4,
                    duration: 2,
                    ease: "power2.inOut",
                }, "about");


                // --- SERVICES SECTION (40% - 60%) ---
                // Move up to "Server Blocks"
                tl.to(camera.position, {
                    x: 0,
                    y: 4,
                    z: 14,
                    duration: 2,
                    ease: "power1.inOut",
                }, "services");

                tl.to(camera.rotation, {
                    x: 0,
                    y: 0,
                    duration: 2,
                    ease: "power1.inOut",
                }, "services");


                // --- PORTFOLIO SECTION (60% - 80%) ---
                // Pull back for "Gallery" view
                tl.to(camera.position, {
                    x: 0,
                    y: 0,
                    z: 18,
                    duration: 2,
                    ease: "power2.inOut",
                }, "portfolio");


                // --- TEAM SECTION (80% - 100%) ---
                // Move to "Holographic Ring" - OFFSET to see it, not be inside it
                tl.to(camera.position, {
                    x: 4,
                    y: 1,
                    z: 12, // Stay back to see the ring
                    duration: 2,
                    ease: "power2.inOut",
                }, "team");

                tl.to(camera.rotation, {
                    y: 0.3, // Look slightly left at the ring
                    duration: 2,
                    ease: "power2.inOut",
                }, "team");

            });

            // Mobile/Reduced Motion Fallback
            mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
                camera.position.set(0, 0, 18);
                camera.lookAt(0, 0, 0);
            });
        });

        return () => ctx.revert();
    }, [camera]);

    return null; // This component only controls the camera
}
