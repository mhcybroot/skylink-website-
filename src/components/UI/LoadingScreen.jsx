import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ isLoading = true, minDuration = 1500 }) => {
    const [showLoader, setShowLoader] = useState(isLoading);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isLoading) return;

        // Simulate progress
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        // Minimum display duration
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, minDuration);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(timer);
        };
    }, [isLoading, minDuration]);

    return (
        <AnimatePresence>
            {showLoader && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
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
                            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                <span className="text-3xl font-bold text-white font-serif">
                                    S<span className="text-skylink-gold">L</span>
                                </span>
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
                            <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-skylink-gold via-tech-cyan to-skylink-gold"
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                            <p className="mt-3 text-xs text-slate-400 text-center tracking-widest uppercase">
                                Loading Excellence...
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
