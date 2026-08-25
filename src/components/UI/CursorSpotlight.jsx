import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CursorSpotlight Component
 * Renders a high-performance, spring-interpolated 60fps cyan cursor spotlight
 * that dynamically illuminates the dark background mesh and cards as the mouse moves.
 */
const CursorSpotlight = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isFinePointer, setIsFinePointer] = useState(false);

    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    // Spring configuration for silky smooth trailing inertia
    const springConfig = { damping: 28, stiffness: 240, mass: 0.45 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Detect if device has a physical mouse/pointer (skip on touch devices)
        const checkPointer = () => {
            const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
            setIsFinePointer(hasFinePointer);
        };

        checkPointer();
        window.addEventListener('resize', checkPointer);

        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Check if hovering an interactive card or button
            const target = e.target;
            const isInteractive = target?.closest('a, button, input, .aura-glass-card, [role="button"]');
            setIsHovered(!!isInteractive);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', checkPointer);
            window.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [mouseX, mouseY, isVisible]);

    // Don't render on mobile / touch-only screens
    if (!isFinePointer) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
            {/* 1. Large Diffuse Outer Aura (Soft Cyan Glow) */}
            <motion.div
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                animate={{
                    opacity: isVisible ? (isHovered ? 0.9 : 0.65) : 0,
                    scale: isHovered ? 1.15 : 1
                }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 left-0 w-[650px] h-[650px] rounded-full pointer-events-none mix-blend-screen"
            >
                <div 
                    className="w-full h-full rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 229, 190, 0.12) 0%, rgba(45, 212, 191, 0.05) 35%, rgba(56, 189, 248, 0.02) 55%, transparent 70%)'
                    }}
                />
            </motion.div>

            {/* 2. Core Focal Point (High-Intensity Electric Cyan Spark) */}
            <motion.div
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                animate={{
                    opacity: isVisible ? (isHovered ? 0.85 : 0.5) : 0,
                    scale: isHovered ? 1.2 : 1
                }}
                transition={{ duration: 0.15 }}
                className="absolute top-0 left-0 w-[220px] h-[220px] rounded-full pointer-events-none mix-blend-screen"
            >
                <div 
                    className="w-full h-full rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 245, 196, 0.22) 0%, rgba(0, 229, 190, 0.08) 45%, transparent 75%)'
                    }}
                />
            </motion.div>
        </div>
    );
};

export default CursorSpotlight;
