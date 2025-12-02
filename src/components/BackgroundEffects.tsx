"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundEffects() {
    // REDUCED to only 3 orbs - NO ANIMATIONS for performance
    const orbs = [
        { size: 500, color: 'emerald', left: '10%', top: '20%' },
        { size: 600, color: 'purple', left: '50%', top: '60%' },
        { size: 400, color: 'cyan', left: '75%', top: '15%' },
    ];

    const getOrbColor = (color: string) => {
        switch (color) {
            case 'emerald': return 'bg-emerald-500/10';
            case 'cyan': return 'bg-cyan-500/10';
            case 'purple': return 'bg-purple-500/10';
            default: return 'bg-emerald-500/10';
        }
    };

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Static Orbs - NO ANIMATION */}
            {orbs.map((orb, index) => (
                <div
                    key={index}
                    className={`absolute rounded-full ${getOrbColor(orb.color)}`}
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: orb.left,
                        top: orb.top,
                        filter: `blur(${orb.size / 5}px)`,
                    }}
                />
            ))}

            {/* Mesh Gradient Overlay */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `
            radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
          `
                }}
            />

            {/* REDUCED Particle Dust - only 5 particles */}
            <div className="absolute inset-0">
                {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
