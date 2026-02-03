import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ isLoading = true, minDuration = 1500 }) => {
    const [showLoader, setShowLoader] = useState(isLoading);
    const [progress, setProgress] = useState(0);
    const [taglineIndex, setTaglineIndex] = useState(0);

    const taglines = [
        "Loading Excellence...",
        "Preparing Your Experience...",
        "Building Connections...",
        "Optimizing Performance...",
        "Almost Ready...",
    ];

    useEffect(() => {
        if (!isLoading) return;

        // Simulate progress with smoother acceleration
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                // Slower at start, faster in middle, slower at end
                const remaining = 100 - prev;
                const increment = Math.min(remaining * 0.1 + 2, 15);
                return Math.min(prev + increment, 100);
            });
        }, 80);

        // Rotate taglines
        const taglineInterval = setInterval(() => {
            setTaglineIndex(prev => (prev + 1) % taglines.length);
        }, 800);

        // Minimum display duration
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, minDuration);

        return () => {
            clearInterval(progressInterval);
            clearInterval(taglineInterval);
            clearTimeout(timer);
        };
    }, [isLoading, minDuration]);

    return (
        <AnimatePresence>
            {showLoader && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
                    }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-skylink-navy"
                >
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-skylink-blue/20 blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-tech-cyan/15 blur-3xl"
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        {/* Floating particles */}
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-white"
                                style={{
                                    left: `${10 + (i * 7)}%`,
                                    top: `${20 + (i % 4) * 20}%`,
                                }}
                                animate={{
                                    y: [0, -50, 0],
                                    opacity: [0, 0.6, 0],
                                }}
                                transition={{
                                    duration: 3 + (i * 0.3),
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>

                    {/* Logo and content */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Animated Logo */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            {/* Pulsing ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-skylink-gold"
                                animate={{
                                    scale: [1, 1.5],
                                    opacity: [0.6, 0],
                                }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                            />
                            {/* Second pulsing ring - delayed */}
                            <motion.div
                                className="absolute inset-0 rounded-full border border-tech-cyan"
                                animate={{
                                    scale: [1, 1.8],
                                    opacity: [0.4, 0],
                                }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                            />
                            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                <motion.span
                                    className="text-3xl font-bold text-white font-serif"
                                    animate={{ rotateY: [0, 360] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    S<span className="text-skylink-gold">L</span>
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Brand Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mt-8 text-2xl font-bold text-white tracking-[0.3em] uppercase"
                        >
                            Skylink
                        </motion.h1>

                        {/* Loading bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 w-64"
                        >
                            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-skylink-gold via-tech-cyan to-skylink-gold"
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>

                            {/* Rotating taglines */}
                            <div className="mt-4 h-5 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={taglineIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-xs text-slate-400 text-center tracking-widest uppercase"
                                    >
                                        {taglines[taglineIndex]}
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            {/* Progress percentage */}
                            <motion.p
                                className="mt-2 text-xs text-tech-cyan/70 text-center font-mono"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                {Math.floor(Math.min(progress, 100))}%
                            </motion.p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;

