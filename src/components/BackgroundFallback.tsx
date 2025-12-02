"use client";

import React from 'react';

/**
 * CSS Fallback background for non-WebGL browsers
 * Provides animated gradient orbs with theme colors
 */
export default function BackgroundFallback() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Gradient orbs */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-float-slow"
                style={{
                    background: 'radial-gradient(circle, var(--theme-accent), transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />
            <div
                className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full opacity-15 animate-float"
                style={{
                    background: 'radial-gradient(circle, var(--theme-cyan), transparent 70%)',
                    filter: 'blur(60px)',
                    animationDelay: '1s',
                }}
            />
            <div
                className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-10 animate-float-slow"
                style={{
                    background: 'radial-gradient(circle, var(--theme-purple), transparent 70%)',
                    filter: 'blur(60px)',
                    animationDelay: '2s',
                }}
            />
        </div>
    );
}
