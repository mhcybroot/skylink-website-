import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ============================================
// CUSTOM CURSOR
// Animated trailing cursor with hover effects
// ============================================

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [cursorVariant, setCursorVariant] = useState('default');
    const [cursorText, setCursorText] = useState('');

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    // Smooth spring animation for cursor following
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Hide on touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        setIsVisible(true);

        const handleMouseMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Add hover listeners for interactive elements
        const addHoverListeners = () => {
            // Links and buttons
            document.querySelectorAll('a, button').forEach(el => {
                el.addEventListener('mouseenter', () => setCursorVariant('link'));
                el.addEventListener('mouseleave', () => setCursorVariant('default'));
            });

            // Images
            document.querySelectorAll('img').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    setCursorVariant('image');
                    setCursorText('View');
                });
                el.addEventListener('mouseleave', () => {
                    setCursorVariant('default');
                    setCursorText('');
                });
            });

            // Custom data attributes
            document.querySelectorAll('[data-cursor]').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    setCursorVariant(el.dataset.cursor || 'default');
                    setCursorText(el.dataset.cursorText || '');
                });
                el.addEventListener('mouseleave', () => {
                    setCursorVariant('default');
                    setCursorText('');
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Initial setup and re-run on DOM changes
        addHoverListeners();

        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    const variants = {
        default: {
            width: 12,
            height: 12,
            backgroundColor: 'rgba(6, 182, 212, 0.8)',
            mixBlendMode: 'difference',
        },
        link: {
            width: 48,
            height: 48,
            backgroundColor: 'rgba(194, 155, 64, 0.2)',
            border: '2px solid rgba(194, 155, 64, 0.8)',
            mixBlendMode: 'normal',
        },
        image: {
            width: 80,
            height: 80,
            backgroundColor: 'rgba(10, 25, 47, 0.9)',
            mixBlendMode: 'normal',
        },
        hidden: {
            width: 0,
            height: 0,
            opacity: 0,
        },
    };

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={cursorVariant}
                variants={variants}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            >
                {cursorText && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="text-white text-xs font-bold uppercase tracking-wider"
                    >
                        {cursorText}
                    </motion.span>
                )}
            </motion.div>

            {/* Trailing ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] w-8 h-8 rounded-full border border-tech-cyan/30"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: cursorVariant === 'link' ? 1.5 : 1,
                    opacity: cursorVariant === 'image' ? 0 : 0.5,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            />

            {/* Hide default cursor */}
            <style>{`
                * {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
};

export default CustomCursor;
