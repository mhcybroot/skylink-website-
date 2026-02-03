import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { pageVariants } from './AnimationPresets';

// ============================================
// PAGE TRANSITION WRAPPER
// Provides smooth animations between route changes
// ============================================

const PageTransition = ({ children, mode = 'default' }) => {
    const location = useLocation();

    // Different transition modes
    const transitionModes = {
        default: {
            initial: { opacity: 0, y: 20 },
            animate: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                }
            },
            exit: {
                opacity: 0,
                y: -20,
                transition: {
                    duration: 0.3,
                }
            },
        },
        fade: {
            initial: { opacity: 0 },
            animate: {
                opacity: 1,
                transition: { duration: 0.4 }
            },
            exit: {
                opacity: 0,
                transition: { duration: 0.3 }
            },
        },
        slide: {
            initial: { opacity: 0, x: 100 },
            animate: {
                opacity: 1,
                x: 0,
                transition: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                }
            },
            exit: {
                opacity: 0,
                x: -100,
                transition: {
                    duration: 0.3,
                }
            },
        },
        scale: {
            initial: { opacity: 0, scale: 0.95 },
            animate: {
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 0.4,
                    ease: 'easeOut',
                }
            },
            exit: {
                opacity: 0,
                scale: 1.05,
                transition: {
                    duration: 0.3,
                }
            },
        },
        blur: {
            initial: { opacity: 0, filter: 'blur(10px)' },
            animate: {
                opacity: 1,
                filter: 'blur(0px)',
                transition: {
                    duration: 0.5,
                }
            },
            exit: {
                opacity: 0,
                filter: 'blur(10px)',
                transition: {
                    duration: 0.3,
                }
            },
        },
    };

    const variants = transitionModes[mode] || transitionModes.default;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

// ============================================
// SCROLL REVEAL WRAPPER
// Animates elements when they enter the viewport
// ============================================

export const ScrollReveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    distance = 40,
    threshold = 0.1,
    once = true,
    className = '',
    ...props
}) => {
    const directions = {
        up: { y: distance, x: 0 },
        down: { y: -distance, x: 0 },
        left: { x: distance, y: 0 },
        right: { x: -distance, y: 0 },
        none: { x: 0, y: 0 },
    };

    const initial = {
        opacity: 0,
        ...directions[direction],
    };

    return (
        <motion.div
            initial={initial}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                transition: {
                    duration,
                    delay,
                    ease: [0.25, 0.1, 0.25, 1],
                }
            }}
            viewport={{ once, amount: threshold }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// ============================================
// SCROLL REVEAL STAGGER CONTAINER
// Staggers children animations on scroll
// ============================================

export const ScrollRevealStagger = ({
    children,
    staggerDelay = 0.1,
    threshold = 0.1,
    once = true,
    className = '',
    ...props
}) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.1,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: threshold }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Stagger child item
export const ScrollRevealItem = ({
    children,
    direction = 'up',
    distance = 30,
    className = '',
    ...props
}) => {
    const directions = {
        up: { y: distance, x: 0 },
        down: { y: -distance, x: 0 },
        left: { x: distance, y: 0 },
        right: { x: -distance, y: 0 },
    };

    const variants = {
        hidden: {
            opacity: 0,
            ...directions[direction],
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            }
        },
    };

    return (
        <motion.div
            variants={variants}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// ============================================
// PARALLAX WRAPPER
// Creates parallax scrolling effect
// ============================================

export const ParallaxWrapper = ({
    children,
    speed = 0.5, // 0 = no parallax, 1 = full parallax
    className = '',
    ...props
}) => {
    return (
        <motion.div
            initial={{ y: 0 }}
            style={{
                willChange: 'transform',
            }}
            whileInView={{
                y: [-30 * speed, 30 * speed],
                transition: {
                    duration: 1,
                    ease: 'linear',
                }
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// ============================================
// MAGNETIC BUTTON WRAPPER
// Creates magnetic hover effect for buttons
// ============================================

export const MagneticWrapper = ({
    children,
    strength = 0.3,
    className = '',
    ...props
}) => {
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        e.currentTarget.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'translate(0px, 0px)';
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: 'transform 0.2s ease-out' }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
