"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    showParticles?: boolean;
}

export default function AnimatedLogo({
    size = 'md',
    className = '',
    showParticles = true
}: AnimatedLogoProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const sizes = {
        sm: { text: 'text-xl', canvas: 40 },
        md: { text: 'text-2xl', canvas: 60 },
        lg: { text: 'text-4xl', canvas: 80 }
    };

    useEffect(() => {
        if (!showParticles || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const particles: Array<{
            angle: number;
            radius: number;
            speed: number;
            size: number;
            color: string;
        }> = [];

        // Create particles
        const colors = ['#10b981', '#06b6d4', '#a855f7'];
        for (let i = 0; i < 8; i++) {
            particles.push({
                angle: (Math.PI * 2 * i) / 8,
                radius: sizes[size].canvas / 2 - 5,
                speed: 0.01 + Math.random() * 0.01,
                size: 2 + Math.random() * 2,
                color: colors[i % colors.length]
            });
        }

        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            particles.forEach(particle => {
                particle.angle += particle.speed;

                const x = centerX + Math.cos(particle.angle) * particle.radius;
                const y = centerY + Math.sin(particle.angle) * particle.radius;

                ctx.beginPath();
                ctx.arc(x, y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = particle.color;
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [size, showParticles]);

    return (
        <motion.div
            className={`relative inline-flex items-center justify-center ${className}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            {/* Particle Canvas */}
            {showParticles && (
                <canvas
                    ref={canvasRef}
                    width={sizes[size].canvas}
                    height={sizes[size].canvas}
                    className="absolute inset-0 pointer-events-none"
                    style={{ filter: 'blur(0.5px)' }}
                />
            )}

            {/* Logo Text */}
            <motion.div
                className="relative z-10"
                animate={{
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <motion.span
                    className={`font-black tracking-tighter ${sizes[size].text}`}
                    style={{
                        background: 'linear-gradient(90deg, #10b981, #06b6d4, #a855f7, #10b981)',
                        backgroundSize: '200% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    SIDAZ
                </motion.span>
                <motion.span
                    className={`${sizes[size].text} font-black`}
                    style={{
                        background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                    animate={{
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    .
                </motion.span>
            </motion.div>

            {/* Glow Effect */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2), transparent 70%)',
                    filter: 'blur(20px)',
                }}
                animate={{
                    opacity: [0, 0.5, 0],
                    scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    );
}
