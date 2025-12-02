"use client";

import { useEffect, useRef } from "react";

export default function MeshGradient() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Simple, high-performance CSS animation loop
        // Using WAAPI (Web Animations API) for better performance than CSS keyframes in some cases
        // but here standard CSS classes with hardware acceleration are safest.
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
            {/* Violet Orb */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-40 blur-[100px] animate-pulse"
                style={{
                    background: "radial-gradient(circle, rgba(102, 51, 153, 1) 0%, rgba(0,0,0,0) 70%)",
                    animationDuration: "8s",
                    willChange: "transform, opacity",
                    transform: "translateZ(0)"
                }}
            />

            {/* Cyan Orb */}
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-30 blur-[120px] animate-pulse"
                style={{
                    background: "radial-gradient(circle, rgba(0, 255, 255, 1) 0%, rgba(0,0,0,0) 70%)",
                    animationDuration: "10s",
                    animationDelay: "1s",
                    willChange: "transform, opacity",
                    transform: "translateZ(0)"
                }}
            />

            {/* Gold Orb */}
            <div
                className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full opacity-20 blur-[90px] animate-pulse"
                style={{
                    background: "radial-gradient(circle, rgba(201, 168, 75, 1) 0%, rgba(0,0,0,0) 70%)",
                    animationDuration: "12s",
                    animationDelay: "2s",
                    willChange: "transform, opacity",
                    transform: "translateZ(0)"
                }}
            />

            {/* Noise Overlay for texture (optional, very low opacity) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none mix-blend-overlay" />
        </div>
    );
}
