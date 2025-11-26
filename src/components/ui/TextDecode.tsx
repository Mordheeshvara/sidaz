"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextDecodeProps {
    text: string;
    className?: string;
    revealDuration?: number; // Total duration of the reveal
    scrambleSpeed?: number; // Speed of character changes
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export const TextDecode = ({
    text,
    className,
    revealDuration = 2000,
    scrambleSpeed = 50,
}: TextDecodeProps) => {
    const [displayText, setDisplayText] = useState("");
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        if (!isStarted) return;

        let interval: NodeJS.Timeout;
        let startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / revealDuration, 1);

            // Calculate how many characters should be revealed based on progress
            const revealedCount = Math.floor(progress * text.length);

            let currentText = "";
            for (let i = 0; i < text.length; i++) {
                if (i < revealedCount) {
                    currentText += text[i];
                } else {
                    // Random character for unrevealed parts
                    currentText += characters[Math.floor(Math.random() * characters.length)];
                }
            }

            setDisplayText(currentText);

            if (progress < 1) {
                interval = setTimeout(animate, scrambleSpeed);
            }
        };

        animate();

        return () => clearTimeout(interval);
    }, [isStarted, text, revealDuration, scrambleSpeed]);

    return (
        <motion.span
            className={cn("inline-block whitespace-pre-wrap", className)}
            onViewportEnter={() => setIsStarted(true)}
            viewport={{ once: true }}
        >
            {displayText || text}
        </motion.span>
    );
};
