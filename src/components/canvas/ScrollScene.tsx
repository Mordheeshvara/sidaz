"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { easing } from "maath";

export default function ScrollScene() {
    const scroll = useScroll();
    const { camera } = useThree();
    const particlesRef = useRef<THREE.Points>(null);
    const groupRef = useRef<THREE.Group>(null);

    // OPTIMIZED: Reduced from 10,000 to 3,000 particles
    const particles = useMemo(() => {
        const count = 3000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const emerald = new THREE.Color("#10b981");
        const cyan = new THREE.Color("#06b6d4");
        const purple = new THREE.Color("#8b5cf6");

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 5 + Math.random() * 5;

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            const colorMix = Math.random();
            let color;
            if (colorMix < 0.33) color = emerald;
            else if (colorMix < 0.66) color = cyan;
            else color = purple;

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = Math.random() * 2 + 0.5;
        }

        return { positions, colors, sizes };
    }, []);

    // OPTIMIZED: Smooth scroll-based animations with throttling
    useFrame((state, delta) => {
        const offset = scroll.offset;

        // Camera movement
        const targetZ = 10 - offset * 30;
        const targetY = -offset * 15;
        const targetX = Math.sin(offset * Math.PI) * 3;

        easing.damp3(
            camera.position,
            [targetX, targetY, targetZ],
            0.25,
            delta
        );

        camera.lookAt(0, -offset * 10, 0);

        // Simple rotation only
        if (particlesRef.current) {
            particlesRef.current.rotation.y = offset * Math.PI * 2;
            particlesRef.current.rotation.x = Math.sin(offset * Math.PI) * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#10b981" />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#06b6d4" />

            {/* Main particle system */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[particles.positions, 3] as any}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[particles.colors, 3] as any}
                    />
                    <bufferAttribute
                        attach="attributes-size"
                        args={[particles.sizes, 1] as any}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.1}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {/* Simplified rings - only 2 instead of 3 */}
            <mesh rotation={[Math.PI / 4, 0, 0]} position={[0, 0, -20]}>
                <torusGeometry args={[6, 0.05, 16, 100]} />
                <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[0, Math.PI / 4, 0]} position={[0, -10, -30]}>
                <torusGeometry args={[7, 0.05, 16, 100]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
            </mesh>
        </group>
    );
}
