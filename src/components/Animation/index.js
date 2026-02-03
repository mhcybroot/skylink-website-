// Animation Components Index
// Central export for all animation utilities

// Animation Presets & Variants
export {
    // Fade animations
    fadeIn,
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    // Scale animations
    scaleIn,
    scaleInBounce,
    // Blur animations
    blurIn,
    // Stagger animations
    staggerContainer,
    staggerContainerFast,
    staggerContainerSlow,
    staggerItem,
    // Interactive animations
    springTap,
    springHover,
    springHoverLift,
    // Transitions
    defaultTransition,
    springTransition,
    smoothTransition,
    // Page transitions
    pageVariants,
    // Text animations
    textRevealContainer,
    textRevealLetter,
    wordRevealContainer,
    wordRevealWord,
    // Continuous animations
    floatingAnimation,
    floatingAnimationSlow,
    pulseAnimation,
    glowPulse,
    shimmerAnimation,
    // Components
    AnimatedDiv,
    StaggerContainer,
    StaggerItem,
    HoverLiftCard,
    TextReveal,
    WordReveal,
} from './AnimationPresets';

// Page Transition
export {
    default as PageTransition,
    ScrollReveal,
    ScrollRevealStagger,
    ScrollRevealItem,
    ParallaxWrapper,
    MagneticWrapper,
} from './PageTransition';

// Animated Elements
export {
    AnimatedCounter,
    AnimatedProgressRing,
    AnimatedProgressBar,
    TypingText,
    ScrambleText,
    MorphingBlob,
} from './AnimatedElements';
