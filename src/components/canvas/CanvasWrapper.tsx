"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, PerformanceMonitor } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import SceneManager from "./SceneManager";
import { useModal } from "@/context/ModalContext";

export default function CanvasWrapper({ children }: { children: React.ReactNode }) {
    const [dpr, setDpr] = useState(0.75);
    const [hasWebGL, setHasWebGL] = useState(true);
    const { isModalOpen, isServicesInView, isPortfolioInView } = useModal();

    // Check WebGL support
    useEffect(() => {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) {
                setHasWebGL(false);
            }
        } catch (e) {
            setHasWebGL(false);
        }
    }, []);

    return (
        <div className="relative w-full min-h-screen">
            {/* The Global 3D Canvas - ULTRA OPTIMIZED with Fallback */}
            {hasWebGL ? (
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <Canvas
                        shadows={false}
                        camera={{ position: [0, 0, 15], fov: 70 }}
                        dpr={dpr}
                        gl={{
                            antialias: false,
                            alpha: true,
                            powerPreference: "high-performance",
                            stencil: false,
                            depth: true,
                            preserveDrawingBuffer: false,
                            failIfMajorPerformanceCaveat: false,
                        }}
                        frameloop={isModalOpen || isServicesInView || isPortfolioInView ? "never" : "always"}
                        style={{ pointerEvents: "none" }}
                        onCreated={(state) => {
                            state.gl.toneMapping = THREE.ACESFilmicToneMapping;
                            state.gl.toneMappingExposure = 1.1;
                        }}
                    >
                        <Suspense fallback={null}>
                            {/* Use SceneManager which contains CinematicCamera and section content */}
                            <SceneManager />

                            <Preload all />

                            <PerformanceMonitor
                                onIncline={() => setDpr(Math.min(dpr + 0.25, 1.5))}
                                onDecline={() => setDpr(Math.max(dpr - 0.25, 0.5))}
                                flipflops={2}
                                onFallback={() => setDpr(0.5)}
                            />
                        </Suspense>
                    </Canvas>
                </div>
            ) : (
                // CSS Fallback when WebGL is not available
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/20 to-black" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
            )}

            {/* The HTML Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
