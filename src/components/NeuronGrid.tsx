"use client";

import { motion } from "framer-motion";

export default function NeuronGrid() {
    return (
        <motion.div
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            <svg
                className="w-full h-full opacity-30"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="neuron-pattern"
                        x="0"
                        y="0"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="2" cy="2" r="1" className="fill-zinc-500" />
                        <path
                            d="M2 2 L40 40 M-20 20 L20 -20"
                            className="stroke-zinc-600"
                            strokeWidth="0.5"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#neuron-pattern)" />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-zinc-900"
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 1 }}
                />
            </svg>
            <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm" />
        </motion.div>
    );
}
