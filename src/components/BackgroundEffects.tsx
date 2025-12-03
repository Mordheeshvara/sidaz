"use client";

import React from 'react';

export default function BackgroundEffects() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Dark Tech Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0a0a1a] to-slate-950 opacity-80" />

            {/* Subtle Grid Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>
    );
}
