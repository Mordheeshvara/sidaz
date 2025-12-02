"use client";

import { useEffect, useState } from 'react';

/**
 * Hook to detect WebGL support
 * Returns true if WebGL is available, false otherwise
 */
export function useWebGLSupport(): boolean {
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            setIsSupported(!!gl);
        } catch (e) {
            setIsSupported(false);
        }
    }, []);

    return isSupported;
}
