"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshDistortMaterial } from "@react-three/drei";

export default function PortfolioScene() {
    const groupRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Points>(null);

    // OPTIMIZED: Reduced to 400 particles for wireframe look
    const particles = useMemo(() => {
        const count = 400;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const color1 = new THREE.Color("#06b6d4");
        const color2 = new THREE.Color("#8b5cf6");

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

            const mixedColor = color1.clone().lerp(color2, Math.random());
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        return { positions, colors };
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05;
        }

        if (particlesRef.current) {
            particlesRef.current.rotation.y += delta * 0.03;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -8]}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />

            {/* Particles */}
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
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    vertexColors
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {/* OPTIMIZED: Wireframe aesthetic */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.7}>
                <mesh position={[-4, 3, 0]}>
                    <octahedronGeometry args={[1.2, 0]} />
                    <meshBasicMaterial
                        color="#06b6d4"
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            </Float>

            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
                <mesh position={[4, -3, -2]}>
                    <icosahedronGeometry args={[1.2, 0]} />
                    <meshBasicMaterial
                        color="#8b5cf6"
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            </Float>
        </group>
    );
}
