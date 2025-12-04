"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Preload } from "@react-three/drei";
import { Suspense } from "react";


import SceneManager from "./SceneManager";

export default function GlobalCanvas() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true
                }}
                dpr={[1, 1]}
                camera={{ position: [0, 0, 10], fov: 45 }}
                eventSource={typeof document !== 'undefined' ? (document.getElementById('root') || document.body) : undefined}
                eventPrefix="client"
                flat
                performance={{ min: 0.5 }}
            >
                <Suspense fallback={null}>
                    <SceneManager />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
