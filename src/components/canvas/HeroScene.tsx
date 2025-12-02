"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";

export default function HeroScene() {
    const particlesRef = useRef<THREE.Points>(null);
    const sphereRef = useRef<THREE.Mesh>(null);

    // OPTIMIZED: Reduced from 5000 to 2000 particles
    const particlesPosition = useMemo(() => {
        const count = 2000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const color1 = new THREE.Color("#10b981");
        const color2 = new THREE.Color("#06b6d4");

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 3 + Math.random() * 3;

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            const mixedColor = color1.clone().lerp(color2, Math.random());
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;

            sizes[i] = Math.random() * 2 + 0.5;
        }

        return { positions, colors, sizes };
    }, []);

    // OPTIMIZED: Simplified animations
    useFrame((state, delta) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += delta * 0.1;
        }

        if (sphereRef.current) {
            sphereRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#10b981" />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#06b6d4" />

            {/* Main particle sphere */}
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
                <points ref={particlesRef}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={particlesPosition.positions.length / 3}
                            array={particlesPosition.positions}
                            itemSize={3}
                        />
                        <bufferAttribute
                            attach="attributes-color"
                            count={particlesPosition.colors.length / 3}
                            array={particlesPosition.colors}
                            itemSize={3}
                        />
                        <bufferAttribute
                            attach="attributes-size"
                            count={particlesPosition.sizes.length}
                            array={particlesPosition.sizes}
                            itemSize={1}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.08}
                        vertexColors
                        transparent
                        opacity={0.8}
                        sizeAttenuation
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </points>
            </Float>

            {/* Center sphere */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
                <mesh ref={sphereRef} frustumCulled>
                    <Sphere args={[0.8, 24, 24]}>
                        <MeshDistortMaterial
                            color="#10b981"
                            attach="material"
                            distort={0.5}
                            speed={3}
                            roughness={0.1}
                            metalness={0.9}
                            emissive="#10b981"
                            emissiveIntensity={0.5}
                        />
                    </Sphere>
                </mesh>
            </Float>
        </group>
    );
}
