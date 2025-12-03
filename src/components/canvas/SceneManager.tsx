"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, Points, PointMaterial, Instance, Instances, MeshDistortMaterial, Sparkles, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import CinematicCamera from "./CinematicCamera";

function QuantumCore() {
    const meshRef = useRef<THREE.Mesh>(null);
    const pointsRef = useRef<THREE.Points>(null);
    const { mouse } = useThree();

    const particles = useMemo(() => new Float32Array(1000).map(() => (Math.random() - 0.5) * 6), []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.2;
            meshRef.current.rotation.y = t * 0.3;
        }
        if (pointsRef.current) {
            pointsRef.current.rotation.y = t * 0.05;
            pointsRef.current.rotation.z = t * 0.02;
        }
    });

    return (
        <group>
            {/* Liquid Metal Core */}
            <mesh ref={meshRef} scale={1.5}>
                <sphereGeometry args={[1, 24, 24]} />
                <MeshDistortMaterial
                    color="#8b5cf6"
                    emissive="#5b21b6"
                    emissiveIntensity={0.5}
                    roughness={0.1}
                    metalness={1}
                    distort={0.4}
                    speed={2}
                />
            </mesh>

            {/* Orbital Particle Field - Reduced count for performance */}
            <Points ref={pointsRef} stride={3} positions={particles}>
                <PointMaterial
                    transparent
                    color="#a78bfa"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function InfinityLoop() {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ref.current) {
            ref.current.rotation.x = t * 0.1;
            ref.current.rotation.y = t * 0.15;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={ref}>
                    <torusKnotGeometry args={[1.5, 0.4, 80, 16]} />
                    <MeshTransmissionMaterial
                        backside
                        backsideThickness={0.5}
                        thickness={2}
                        chromaticAberration={1}
                        anisotropy={0.5}
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.1}
                        color="#8b5cf6"
                        roughness={0}
                        emissive="#4c1d95"
                        emissiveIntensity={0.5}
                        resolution={256}
                        samples={4}
                    />
                </mesh>
            </Float>
        </group>
    );
}

function FloatingShapes() {
    return (
        <group>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Central Glass Object */}
                <mesh position={[0, 0, 0]}>
                    <icosahedronGeometry args={[1.5, 0]} />
                    <MeshTransmissionMaterial
                        backside
                        backsideThickness={0.5}
                        thickness={2}
                        chromaticAberration={0.5}
                        anisotropy={0.5}
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.1}
                        color="#a78bfa"
                        roughness={0}
                        resolution={256}
                        samples={4}
                    />
                </mesh>

                {/* Orbiting Matte Sphere */}
                <mesh position={[2.5, 1, -1]}>
                    <sphereGeometry args={[0.6, 32, 32]} />
                    <meshStandardMaterial color="#f472b6" roughness={0.4} metalness={0.1} />
                </mesh>

                {/* Orbiting Metal Torus */}
                <mesh position={[-2, -1.5, 1]} rotation={[Math.PI / 3, 0, 0]}>
                    <torusGeometry args={[0.8, 0.2, 16, 100]} />
                    <meshStandardMaterial color="#6366f1" roughness={0.2} metalness={0.8} />
                </mesh>

                {/* Floating Capsule */}
                <mesh position={[1.5, -2, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <capsuleGeometry args={[0.3, 1, 4, 8]} />
                    <meshStandardMaterial color="#34d399" roughness={0.3} />
                </mesh>
            </Float>
        </group>
    );
}

function DNAHelix() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.01;
        }
    });

    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < 100; i++) {
            const t = i * 0.3;
            p.push(new THREE.Vector3(Math.cos(t), i * 0.1 - 5, Math.sin(t)));
            p.push(new THREE.Vector3(Math.cos(t + Math.PI), i * 0.1 - 5, Math.sin(t + Math.PI)));
        }
        return p;
    }, []);

    return (
        <group ref={groupRef}>
            {points.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshStandardMaterial color={i % 2 === 0 ? "#6366f1" : "#ec4899"} emissive={i % 2 === 0 ? "#4338ca" : "#be185d"} emissiveIntensity={2} />
                </mesh>
            ))}
            {/* Connecting lines could be added here if desired */}
        </group>
    );
}

function GlassShards() {
    const shards = useMemo(() => new Array(8).fill(0).map((_, i) => ({
        position: [
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: Math.random() * 0.5 + 0.5,
    })), []);

    return (
        <group>
            {shards.map((props, i) => (
                <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
                    <mesh position={props.position} rotation={props.rotation} scale={props.scale}>
                        <octahedronGeometry args={[1, 0]} />
                        <MeshTransmissionMaterial
                            backside
                            backsideThickness={0.5}
                            thickness={2}
                            chromaticAberration={0.5}
                            anisotropy={0.5}
                            distortion={0.5}
                            distortionScale={0.5}
                            temporalDistortion={0.1}
                            color="#ffffff"
                            roughness={0}
                            resolution={128}
                            samples={2}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

function AuroraBackground() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.z = t * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -20]} scale={50}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <MeshDistortMaterial
                color="#1e1b4b"
                speed={2}
                distort={0.5}
                radius={1}
            />
        </mesh>
    );
}

export default function SceneManager() {
    return (
        <group>
            <CinematicCamera />

            {/* <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.0} radius={0.4} />
            </EffectComposer> */}

            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />

            {/* Enhanced Environment - Optimized counts */}
            <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={20} size={2} speed={0.4} opacity={0.5} color="#ffffff" />
            <AuroraBackground />

            {/* --- HERO SECTION: Quantum Core --- */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <group position={[0, 0, 0]}>
                    <QuantumCore />
                </group>
            </Float>

            {/* --- ABOUT SECTION: Infinity Loop --- */}
            <group position={[-5, 0, 8]} rotation={[0, 0.5, 0]}>
                <InfinityLoop />
            </group>

            {/* --- SERVICES SECTION: Floating Shapes --- */}
            <group position={[5, 2, 14]}>
                <FloatingShapes />
            </group>

            {/* --- TEAM SECTION: DNA Helix --- */}
            <group position={[-4, 0, 22]} rotation={[0, 0, Math.PI / 6]}>
                <DNAHelix />
            </group>

            {/* --- PORTFOLIO SECTION: Glass Shards --- */}
            <group position={[0, 0, 28]}>
                <GlassShards />
            </group>
        </group>
    );
}
