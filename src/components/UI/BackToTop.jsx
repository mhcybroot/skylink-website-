import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Sparkles } from 'lucide-react';

// ============================================
// BACK TO TOP BUTTON
// Animated scroll-to-top button with progress ring
// ============================================

const BackToTop = ({ showAfter = 400, showProgress = true }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Show/hide button
            setIsVisible(scrollY > showAfter);

            // Calculate progress
            const totalScrollable = documentHeight - windowHeight;
            const progress = totalScrollable > 0 ? (scrollY / totalScrollable) * 100 : 0;
            setScrollProgress(Math.min(progress, 100));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [showAfter]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // SVG circle properties
    const size = 56;
    const strokeWidth = 3;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 group"
                    aria-label="Scroll to top"
                >
                    <div className="relative">
                        {/* Progress ring */}
                        {showProgress && (
                            <svg
                                className="absolute inset-0 -rotate-90"
                                width={size}
                                height={size}
                            >
                                {/* Background circle */}
                                <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    fill="none"
                                    stroke="rgba(6, 182, 212, 0.2)"
                                    strokeWidth={strokeWidth}
                                />
                                {/* Progress circle */}
                                <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    fill="none"
                                    stroke="rgb(6, 182, 212)"
                                    strokeWidth={strokeWidth}
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    className="transition-all duration-150"
                                />
                            </svg>
                        )}

                        {/* Button background */}
                        <div
                            className={`${showProgress ? 'w-14 h-14' : 'w-12 h-12'} rounded-full bg-skylink-navy shadow-lg flex items-center justify-center transition-all duration-300 group-hover:bg-skylink-blue group-hover:shadow-xl`}
                        >
                            <motion.div
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <ArrowUp className="w-5 h-5 text-white" />
                            </motion.div>
                        </div>

                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-full bg-tech-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Tooltip */}
                    <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-skylink-navy text-white text-xs py-2 px-3 rounded-lg whitespace-nowrap pointer-events-none"
                    >
                        Back to top
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-skylink-navy rotate-45" />
                    </motion.span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
