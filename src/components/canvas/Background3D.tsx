"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import BackgroundFallback from '@/components/BackgroundFallback';
import Scene3DContent from '@/components/canvas/Scene3DContent';
import { useModal } from '@/context/ModalContext';

/**
 * Advanced 3D Background Component
 * Features:
 * - Lazy loading after hero content
 * - WebGL detection with CSS fallback
 * - Respects prefers-reduced-motion
 * - Pauses when tab is hidden
 * - Adaptive quality (LOD)
 * - Buttery smooth 60 FPS performance
 */
export default function Background3D() {
    const isWebGLSupported = useWebGLSupport();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const { isModalOpen } = useModal();

    // Lazy load after a short delay (hero content first)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 500); // Load after 500ms

        return () => clearTimeout(timer);
    }, []);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Pause animations when tab is hidden (performance optimization)
    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsPaused(document.hidden);
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    // If WebGL not supported or reduced motion preferred, show fallback
    if (!isWebGLSupported || prefersReducedMotion) {
        return <BackgroundFallback />;
    }

    // Don't render until loaded (lazy loading)
    if (!isLoaded) {
        return <BackgroundFallback />;
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <Suspense fallback={<BackgroundFallback />}>
                <Canvas
                    camera={{ position: [0, 0, 30], fov: 50 }}
                    style={{ background: 'transparent' }}
                    dpr={[1, 1.25]} // Reduced from [1,2] for better performance
                    performance={{ min: 0.5 }}
                    frameloop={isPaused || isModalOpen ? 'never' : 'always'}
                    gl={{
                        antialias: false,
                        powerPreference: 'high-performance',
                        stencil: false,
                        depth: true
                    }}
                    flat
                >
                    <Scene3DContent />
                </Canvas>
            </Suspense>
        </div>
    );
}
