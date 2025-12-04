"use client";

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingShapeProps {
    geometry: THREE.BufferGeometry;
    position: [number, number, number];
    color: string;
    wireframe?: boolean;
    speed?: number;
    scale?: number;
}

/**
 * ULTRA-OPTIMIZED Floating 3D Object
 * Maximum performance for buttery smooth 60fps
 */
function FloatingShape({
    geometry,
    position,
    color,
    wireframe = false,
    speed = 1,
    scale = 1
}: FloatingShapeProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Memoize material - created once
    const material = useMemo(() => {
        if (wireframe) {
            return new THREE.MeshBasicMaterial({
                color,
                wireframe: true,
                transparent: true,
                opacity: 0.35
            });
        }
        return new THREE.MeshStandardMaterial({
            color,
            transparent: true,
            opacity: 0.3,
            emissive: color,
            emissiveIntensity: 0.7,
            metalness: 0.9,
            roughness: 0.1
        });
    }, [color, wireframe]);

    useFrame(() => {
        if (!meshRef.current) return;

        // MINIMAL rotation only - no floating
        meshRef.current.rotation.x += 0.0005 * speed;
        meshRef.current.rotation.y += 0.001 * speed;
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale} material={material}>
            <primitive object={geometry} attach="geometry" />
        </mesh>
    );
}

/**
 * ULTRA-OPTIMIZED 3D Scene
 * Minimal shapes, maximum performance
 */
function Scene3DContent() {
    const [quality, setQuality] = useState<'high' | 'low'>('high');

    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;

        if (isMobile || isLowEnd) {
            setQuality('low');
        }
    }, []);

    // ULTRA MINIMAL geometries - lowest possible detail
    const geometries = useMemo(() => {
        return {
            icosahedron: new THREE.IcosahedronGeometry(3.5, 0), // 0 detail
            octahedron: new THREE.OctahedronGeometry(3.5, 0),
            torus: new THREE.TorusGeometry(2.5, 1, 8, 32), // Reduced segments
        };
    }, []);

    const { viewport } = useThree();
    const isMobile = viewport.width < 768; // Simple breakpoint check based on viewport units (approx)

    // ONLY 3 SHAPES - Maximum performance
    const shapes = useMemo(() => {
        // Responsive positioning
        const scaleFactor = viewport.width < 10 ? 0.6 : 1; // Scale down on small screens

        return [
            // Just 3 wireframe shapes - minimal rendering
            {
                geometry: geometries.icosahedron,
                position: [viewport.width < 10 ? -5 : -18, viewport.width < 10 ? 4 : 8, -65] as [number, number, number],
                color: '#663399',
                wireframe: true,
                speed: 0.5,
                scale: 1.0 * scaleFactor
            },
            {
                geometry: geometries.octahedron,
                position: [viewport.width < 10 ? 5 : 18, viewport.width < 10 ? 5 : 10, -70] as [number, number, number],
                color: '#00FFFF',
                wireframe: true,
                speed: 0.6,
                scale: 0.9 * scaleFactor
            },
            {
                geometry: geometries.torus,
                position: [0, viewport.width < 10 ? -8 : -15, -75] as [number, number, number],
                color: '#C9A84B',
                wireframe: true,
                speed: 0.4,
                scale: 0.85 * scaleFactor
            },
        ];
    }, [geometries, viewport.width]);

    return (
        <>
            {/* MINIMAL lighting - just ambient */}
            <ambientLight intensity={0.4} />
            <pointLight position={[20, 20, 20]} intensity={0.6} color="#663399" distance={80} decay={2} />

            {/* Subtle fog */}
            <fog attach="fog" args={['#000000', 60, 140]} />

            {/* Minimal shapes */}
            {shapes.map((shape, index) => (
                <FloatingShape key={index} {...shape} />
            ))}
        </>
    );
}

export default Scene3DContent;
