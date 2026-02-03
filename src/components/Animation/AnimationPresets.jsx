import { motion } from 'framer-motion';

// ============================================
// ANIMATION VARIANTS LIBRARY
// Centralized animation presets for consistent UX
// ============================================

// Fade animations
export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export const fadeInDown = {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

export const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 60 },
};

export const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
};

// Scale animations
export const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
};

export const scaleInBounce = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    exit: { opacity: 0, scale: 0.5 },
};

// Blur animations
export const blurIn = {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(10px)' },
};

// Stagger container for children
export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerContainerFast = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
        },
    },
};

export const staggerContainerSlow = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
        },
    },
};

// Stagger item (use with staggerContainer)
export const staggerItem = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    },
};

// Spring animations for interactive elements
export const springTap = {
    whileTap: { scale: 0.95 },
};

export const springHover = {
    whileHover: { scale: 1.05 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
};

export const springHoverLift = {
    whileHover: { y: -8, scale: 1.02 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
};

// Transition presets
export const defaultTransition = {
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth easing
};

export const springTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 25,
};

export const smoothTransition = {
    duration: 0.6,
    ease: 'easeInOut',
};

// Page transition variants
export const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: 'blur(4px)',
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        filter: 'blur(4px)',
        transition: {
            duration: 0.3,
        }
    },
};

// Text reveal animation (letter by letter)
export const textRevealContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.03,
        },
    },
};

export const textRevealLetter = {
    initial: { opacity: 0, y: 50 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
    },
};

// Word reveal animation
export const wordRevealContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export const wordRevealWord = {
    initial: { opacity: 0, y: 30, rotateX: -90 },
    animate: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    },
};

// Counter animation (for stats)
export const counterAnimation = (endValue, duration = 2) => ({
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.3 }
    },
    // Use motion.value and useSpring for actual counting
});

// Floating animation (continuous)
export const floatingAnimation = {
    animate: {
        y: [0, -20, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

export const floatingAnimationSlow = {
    animate: {
        y: [0, -15, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// Pulse animation
export const pulseAnimation = {
    animate: {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// Glow pulse animation
export const glowPulse = {
    animate: {
        boxShadow: [
            '0 0 20px rgba(6, 182, 212, 0.3)',
            '0 0 40px rgba(6, 182, 212, 0.6)',
            '0 0 20px rgba(6, 182, 212, 0.3)',
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// Shimmer effect
export const shimmerAnimation = {
    animate: {
        backgroundPosition: ['200% 0', '-200% 0'],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
        },
    },
};

// ============================================
// REUSABLE ANIMATED COMPONENTS
// ============================================

// Animated div wrapper with preset animations
export const AnimatedDiv = ({
    children,
    variant = fadeInUp,
    delay = 0,
    className = '',
    ...props
}) => (
    <motion.div
        initial={variant.initial}
        animate={variant.animate}
        exit={variant.exit}
        transition={{ ...defaultTransition, delay }}
        className={className}
        {...props}
    >
        {children}
    </motion.div>
);

// Stagger container wrapper
export const StaggerContainer = ({
    children,
    speed = 'normal',
    className = '',
    ...props
}) => {
    const variants = {
        fast: staggerContainerFast,
        normal: staggerContainer,
        slow: staggerContainerSlow,
    };

    return (
        <motion.div
            variants={variants[speed]}
            initial="initial"
            animate="animate"
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Stagger item wrapper
export const StaggerItem = ({
    children,
    className = '',
    ...props
}) => (
    <motion.div
        variants={staggerItem}
        className={className}
        {...props}
    >
        {children}
    </motion.div>
);

// Hover lift card
export const HoverLiftCard = ({
    children,
    className = '',
    ...props
}) => (
    <motion.div
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className={className}
        {...props}
    >
        {children}
    </motion.div>
);

// Text reveal component (letter by letter)
export const TextReveal = ({
    text,
    className = '',
    ...props
}) => (
    <motion.span
        variants={textRevealContainer}
        initial="initial"
        animate="animate"
        className={className}
        {...props}
    >
        {text.split('').map((char, index) => (
            <motion.span
                key={index}
                variants={textRevealLetter}
                style={{ display: 'inline-block', marginRight: char === ' ' ? '0.25em' : 0 }}
            >
                {char === ' ' ? '\u00A0' : char}
            </motion.span>
        ))}
    </motion.span>
);

// Word reveal component
export const WordReveal = ({
    text,
    className = '',
    ...props
}) => (
    <motion.span
        variants={wordRevealContainer}
        initial="initial"
        animate="animate"
        className={className}
        style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}
        {...props}
    >
        {text.split(' ').map((word, index) => (
            <motion.span
                key={index}
                variants={wordRevealWord}
                style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
            >
                {word}
            </motion.span>
        ))}
    </motion.span>
);

export default {
    fadeIn,
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    scaleInBounce,
    blurIn,
    staggerContainer,
    staggerItem,
    pageVariants,
    textRevealContainer,
    textRevealLetter,
    floatingAnimation,
    pulseAnimation,
    glowPulse,
};
