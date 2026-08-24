import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoSvg from '../../assets/logo.svg';

const taglines = [
    'Initializing Secure Infrastructure...',
    'Connecting Cloud Architecture...',
    'Loading Next-Generation IT Services...',
    'Finalizing Digital Workflows...'
];

const LoadingScreen = ({ isLoading, minDuration = 1200 }) => {
    const [progress, setProgress] = useState(0);
    const [taglineIndex, setTaglineIndex] = useState(0);
    const [shouldRender, setShouldRender] = useState(true);

    // Progress counter simulation
    useEffect(() => {
        const interval = 16;
        const totalSteps = minDuration / interval;
        const increment = 100 / totalSteps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [minDuration]);

    // Cycle status messages
    useEffect(() => {
        const taglineTimer = setInterval(() => {
            setTaglineIndex((prev) => (prev + 1) % taglines.length);
        }, 320);

        return () => clearInterval(taglineTimer);
    }, []);

    // Handle smooth exit
    useEffect(() => {
        if (!isLoading && progress >= 100) {
            const exitTimer = setTimeout(() => {
                setShouldRender(false);
            }, 400);
            return () => clearTimeout(exitTimer);
        }
    }, [isLoading, progress]);

    if (!shouldRender) return null;

    return (
        <AnimatePresence>
            {(isLoading || progress < 100) && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0, 
                        scale: 1.02,
                        filter: 'blur(8px)',
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
                    }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden pointer-events-none"
                >
                    {/* Ambient Radial Aura Spotlight */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-gradient-to-b from-[#00E5BE]/20 via-[#00E5BE]/5 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />

                    {/* Subtle Background Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                    {/* Central Brand Container */}
                    <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
                        {/* Logo Wrapper with Glowing Aura Halo */}
                        <div className="relative mb-8 flex items-center justify-center">
                            {/* Rotating Aura Glow Halo */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                className="absolute -inset-4 rounded-full border border-dashed border-[#00E5BE]/30 opacity-60 pointer-events-none"
                            />
                            <div className="absolute inset-0 rounded-full bg-[#00E5BE]/20 blur-xl animate-pulse" />

                            <div className="relative flex items-center px-4 py-2 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-xl shadow-2xl z-10">
                                <motion.img
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    src={logoSvg}
                                    alt="Skylink Innovations Ltd."
                                    className="h-10 md:h-12 w-auto object-contain"
                                />
                            </div>
                        </div>

                        {/* Minimalist Progress Track */}
                        <div className="w-full relative mt-4">
                            <div className="h-[2px] w-full bg-white/[0.08] rounded-full overflow-hidden relative">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-[#5eead4] shadow-[0_0_12px_#00E5BE]"
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                    transition={{ ease: 'linear' }}
                                />
                            </div>
                        </div>

                        {/* Status Tagline & Percentage Counter */}
                        <div className="w-full flex items-center justify-between mt-4 text-xs font-mono">
                            <div className="h-4 overflow-hidden flex items-center text-slate-400">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={taglineIndex}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ duration: 0.2 }}
                                        className="tracking-wider text-[11px] text-slate-400 truncate max-w-[220px]"
                                    >
                                        {taglines[taglineIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>

                            <span className="text-[#00E5BE] font-bold text-xs tabular-nums">
                                {Math.round(Math.min(progress, 100))}%
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
