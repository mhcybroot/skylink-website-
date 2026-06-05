import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollReveal Component
 * Wraps content to provide cinematic scroll-triggered animations.
 * 
 * Props:
 * - children: Content to animate
 * - type: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'zoomIn' | '3D' (default 'fadeUp')
 * - delay: Animation delay (default 0)
 * - duration: Animation duration (default 0.8)
 * - parallax: If true, adds subtle parallax effect to the container (default false)
 * - className: Optional CSS classes
 */
const ScrollReveal = ({ 
    children, 
    type = 'fadeUp', 
    delay = 0, 
    duration = 0.8, 
    parallax = false,
    className = "" 
}) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Subtle parallax effect
    const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

    // Animation Variants
    const variants = {
        fadeUp: {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20, delay, duration } }
        },
        fadeLeft: {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 20, delay, duration } }
        },
        fadeRight: {
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 20, delay, duration } }
        },
        zoomIn: {
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20, delay, duration } }
        },
        '3D': {
            hidden: { opacity: 0, rotateX: 15, y: 60, scale: 0.95 },
            visible: { opacity: 1, rotateX: 0, y: 0, scale: 1, transition: { type: 'spring', stiffness: 80, damping: 25, delay, duration } }
        }
    };

    const selectedVariant = variants[type] || variants.fadeUp;

    return (
        <motion.div
            ref={ref}
            variants={selectedVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={parallax ? { y: yParallax, transformStyle: type === '3D' ? 'preserve-3d' : 'flat' } : { transformStyle: type === '3D' ? 'preserve-3d' : 'flat' }}
            className={`perspective-1000 ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
