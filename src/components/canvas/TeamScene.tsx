"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export default function TeamScene() {
    const groupRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const count = 200;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const color1 = new THREE.Color("#10b981");
        const color2 = new THREE.Color("#06b6d4");
        const color3 = new THREE.Color("#8b5cf6");

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 25;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

            const colorMix = Math.random();
            let color;
            if (colorMix < 0.33) color = color1;
            else if (colorMix < 0.66) color = color2;
            else color = color3;

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        return { positions, colors };
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05;
        }

        if (particlesRef.current) {
            particlesRef.current.rotation.y += delta * 0.02;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -8]}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#06b6d4" />

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

            {/* Single floating ring - Wireframe */}
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
                <mesh rotation={[Math.PI / 4, 0, 0]}>
                    <torusGeometry args={[5, 0.02, 8, 100]} />
                    <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.2} />
                </mesh>
            </Float>
        </group>
    );
}
