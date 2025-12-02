"use client";

import { useScroll } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import HeroScene from "./HeroScene";
import { useThree, useFrame } from "@react-three/fiber";

export default function SceneManager() {
    const scroll = useScroll();
    const { camera } = useThree();
    const groupRef = useRef<THREE.Group>(null);

    // Track scroll progress with optimized frame handling
    let frameCount = 0;
    useFrame((state, delta) => {
        // Skip every other frame during scroll for better performance
        frameCount++;
        const shouldUpdate = frameCount % 2 === 0;

        // Camera movement based on scroll - faster lerp for snappier response
        const targetY = -scroll.offset * 20;
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1);

        // Rotate the entire group slightly based on scroll - only on update frames
        if (groupRef.current && shouldUpdate) {
            groupRef.current.rotation.y = scroll.offset * Math.PI * 2;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Hero Section Scene - Always visible but transforms */}
            <HeroScene />

            {/* Placeholder for other section elements positioned in 3D space */}
            {/* About Section Elements */}
            <mesh position={[5, -10, -5]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#10b981" wireframe />
            </mesh>

            {/* Services Section Elements */}
            <mesh position={[-5, -20, -2]}>
                <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                <meshStandardMaterial color="#06b6d4" wireframe />
            </mesh>

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
        </group>
    );
}
