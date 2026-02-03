import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useInView } from 'framer-motion';

// ============================================
// ANIMATED COUNTER
// Counts up from 0 to target value with spring physics
// ============================================

export const AnimatedCounter = ({
    value,
    duration = 2,
    delay = 0,
    prefix = '',
    suffix = '',
    decimals = 0,
    className = '',
    triggerOnView = true,
    ...props
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hasAnimated, setHasAnimated] = useState(false);

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
        duration: duration * 1000,
    });
    const displayValue = useTransform(springValue, (latest) => {
        if (decimals > 0) {
            return latest.toFixed(decimals);
        }
        return Math.floor(latest).toLocaleString();
    });

    useEffect(() => {
        const shouldAnimate = triggerOnView ? isInView : true;

        if (shouldAnimate && !hasAnimated) {
            const timeout = setTimeout(() => {
                motionValue.set(value);
                setHasAnimated(true);
            }, delay * 1000);

            return () => clearTimeout(timeout);
        }
    }, [isInView, triggerOnView, hasAnimated, value, delay, motionValue]);

    return (
        <span ref={ref} className={className} {...props}>
            {prefix}
            <motion.span>{displayValue}</motion.span>
            {suffix}
        </span>
    );
};

// ============================================
// ANIMATED PROGRESS RING
// Circular progress indicator with animation
// ============================================

export const AnimatedProgressRing = ({
    progress = 0, // 0-100
    size = 120,
    strokeWidth = 8,
    color = '#06b6d4',
    bgColor = '#e2e8f0',
    duration = 1.5,
    delay = 0,
    showValue = true,
    className = '',
    ...props
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 50,
    });
    const strokeDashoffset = useTransform(
        springValue,
        [0, 100],
        [circumference, 0]
    );

    useEffect(() => {
        if (isInView) {
            const timeout = setTimeout(() => {
                motionValue.set(progress);
            }, delay * 1000);
            return () => clearTimeout(timeout);
        }
    }, [isInView, progress, delay, motionValue]);

    return (
        <div
            ref={ref}
            className={`relative inline-flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
            {...props}
        >
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={bgColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset }}
                />
            </svg>
            {showValue && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatedCounter
                        value={progress}
                        suffix="%"
                        triggerOnView={false}
                        delay={delay}
                        className="text-xl font-bold text-slate-700"
                    />
                </div>
            )}
        </div>
    );
};

// ============================================
// ANIMATED PROGRESS BAR
// Horizontal progress bar with animation
// ============================================

export const AnimatedProgressBar = ({
    progress = 0, // 0-100
    height = 8,
    color = '#06b6d4',
    bgColor = '#e2e8f0',
    duration = 1,
    delay = 0,
    showValue = false,
    rounded = true,
    className = '',
    ...props
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <div
            ref={ref}
            className={`w-full overflow-hidden ${rounded ? 'rounded-full' : ''} ${className}`}
            style={{ height, backgroundColor: bgColor }}
            {...props}
        >
            <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${progress}%` } : { width: 0 }}
                transition={{
                    duration,
                    delay,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`h-full ${rounded ? 'rounded-full' : ''}`}
                style={{ backgroundColor: color }}
            />
            {showValue && (
                <span className="ml-2 text-sm font-medium text-slate-600">
                    {progress}%
                </span>
            )}
        </div>
    );
};

// ============================================
// TYPING TEXT ANIMATION
// Types out text character by character
// ============================================

export const TypingText = ({
    text,
    speed = 50, // ms per character
    delay = 0,
    cursor = true,
    cursorChar = '|',
    className = '',
    onComplete,
    ...props
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        const timeout = setTimeout(() => {
            setIsTyping(true);
            let currentIndex = 0;

            const interval = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    setIsTyping(false);
                    onComplete?.();
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isInView, text, speed, delay, onComplete]);

    return (
        <span ref={ref} className={className} {...props}>
            {displayedText}
            {cursor && (
                <motion.span
                    animate={{ opacity: isTyping ? 1 : [1, 0, 1] }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: 'steps(2)',
                    }}
                    className="inline-block ml-0.5"
                >
                    {cursorChar}
                </motion.span>
            )}
        </span>
    );
};

// ============================================
// SCRAMBLE TEXT ANIMATION
// Text scrambles before revealing final content
// ============================================

export const ScrambleText = ({
    text,
    duration = 1.5,
    delay = 0,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    className = '',
    ...props
}) => {
    const [displayedText, setDisplayedText] = useState(text);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        const timeout = setTimeout(() => {
            const length = text.length;
            let iteration = 0;
            const maxIterations = 10;

            const interval = setInterval(() => {
                setDisplayedText(
                    text
                        .split('')
                        .map((char, index) => {
                            if (index < iteration / (maxIterations / length)) {
                                return text[index];
                            }
                            if (char === ' ') return ' ';
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join('')
                );

                iteration++;

                if (iteration >= maxIterations) {
                    setDisplayedText(text);
                    clearInterval(interval);
                }
            }, (duration * 1000) / maxIterations);

            return () => clearInterval(interval);
        }, delay * 1000);

        return () => clearTimeout(timeout);
    }, [isInView, text, duration, delay, characters]);

    return (
        <span ref={ref} className={className} {...props}>
            {displayedText}
        </span>
    );
};

// ============================================
// MORPHING BLOB
// Animated background blob shape
// ============================================

export const MorphingBlob = ({
    size = 400,
    color = 'rgba(6, 182, 212, 0.3)',
    duration = 8,
    className = '',
    ...props
}) => {
    const blobPaths = [
        'M44.9,-76.8C58.2,-69.5,69.2,-57.4,77.2,-43.5C85.3,-29.6,90.4,-14.8,89.6,-0.5C88.8,13.9,82,27.7,73.4,39.8C64.7,51.9,54.2,62.2,41.6,70.1C29,78,14.5,83.5,-0.7,84.7C-15.9,85.9,-31.8,82.8,-45.3,75.5C-58.8,68.2,-69.9,56.7,-77.6,43.1C-85.2,29.5,-89.4,14.8,-88.7,0.4C-88,-14,-82.4,-28,-73.8,-39.8C-65.2,-51.5,-53.6,-61,-40.8,-68.5C-28,-76,-14,-81.5,1,-83.2C16,-84.9,31.7,-84.1,44.9,-76.8Z',
        'M42.3,-72.7C55.9,-65.8,68.5,-55.8,76.6,-42.8C84.8,-29.8,88.5,-14.9,87.9,-0.4C87.2,14.2,82.2,28.4,74.2,40.8C66.2,53.2,55.2,63.8,42.3,71.3C29.4,78.8,14.7,83.2,-0.5,84C-15.7,84.8,-31.4,82,-44.9,74.7C-58.4,67.4,-69.7,55.6,-77.2,41.8C-84.6,28,-88.2,14,-87.4,0.5C-86.5,-13.1,-81.2,-26.1,-73.5,-37.5C-65.7,-48.9,-55.6,-58.6,-43.5,-66.2C-31.5,-73.9,-17.7,-79.5,-1.8,-76.5C14.2,-73.5,28.4,-61.9,42.3,-72.7Z',
        'M41.2,-71.2C53.9,-63.8,65,-53.5,73.5,-40.8C81.9,-28.1,87.7,-14.1,88.2,0.3C88.7,14.7,84,29.3,75.7,41.4C67.4,53.4,55.5,62.8,42.2,70.1C28.8,77.4,14.4,82.6,-0.6,83.7C-15.6,84.8,-31.1,81.7,-44.7,74.6C-58.2,67.4,-69.7,56.1,-77.4,42.5C-85.1,28.9,-88.9,14.4,-88.4,0.3C-87.9,-13.9,-83,-27.7,-75.2,-39.8C-67.4,-51.8,-56.6,-62,-43.7,-69.3C-30.8,-76.5,-15.4,-80.8,-0.1,-80.6C15.2,-80.4,30.4,-75.7,41.2,-71.2Z',
    ];

    return (
        <motion.div
            className={`absolute pointer-events-none ${className}`}
            style={{ width: size, height: size }}
            {...props}
        >
            <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <motion.path
                    fill={color}
                    animate={{
                        d: blobPaths,
                    }}
                    transition={{
                        duration,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                    }}
                    transform="translate(100 100)"
                />
            </svg>
        </motion.div>
    );
};

export default AnimatedCounter;
