import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// CINEMATIC SCROLL DIAL WITH 3D DEPTH TRACKER
// ============================================

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('Overview');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Calculate progress percentage
            const totalScrollable = documentHeight - windowHeight;
            const progress = totalScrollable > 0 ? (scrollY / totalScrollable) * 100 : 0;
            setScrollProgress(Math.min(progress, 100));

            // Identify current active section
            // Look for semantic sections, main section IDs, or general containers
            const selectors = 'section, [id="hero"], [id="stats"], [id="about"], [id="services"], [id="gallery"], [id="workflow"], [id="testimonials"], [id="contact"], #openings';
            const sections = Array.from(document.querySelectorAll(selectors));
            
            if (sections.length === 0) {
                // Fallback: Format page name
                const pathname = window.location.pathname;
                const pageName = pathname.replace('/', '').replace(/-/g, ' ');
                setActiveSection(pageName ? pageName.toUpperCase() : 'OVERVIEW');
                return;
            }

            let currentActiveName = 'Overview';
            let minDistance = Infinity;

            sections.forEach((sec) => {
                const rect = sec.getBoundingClientRect();
                
                // If a section occupies the center-top portion of viewport, it is highly active
                if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.4) {
                    currentActiveName = getSectionDisplayName(sec);
                } else {
                    const distFromCenter = Math.abs(rect.top - windowHeight * 0.2);
                    if (distFromCenter < minDistance) {
                        minDistance = distFromCenter;
                        currentActiveName = getSectionDisplayName(sec);
                    }
                }
            });

            setActiveSection(currentActiveName);
        };

        const getSectionDisplayName = (el) => {
            if (el.getAttribute('data-section-name')) {
                return el.getAttribute('data-section-name');
            }

            const id = el.id;
            if (id) {
                const idMap = {
                    hero: 'Hero Overview',
                    stats: 'Performance Metrics',
                    about: 'Corporate Culture',
                    services: 'Service Highlights',
                    gallery: 'Visual Portfolio',
                    workflow: 'Operational Flow',
                    testimonials: 'Client Feedback',
                    contact: 'Get In Touch',
                    openings: 'Current Openings'
                };
                if (idMap[id]) return idMap[id];
                return id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            }

            // Fallback to first heading
            const heading = el.querySelector('h1, h2, h3');
            if (heading && heading.textContent) {
                const text = heading.textContent.trim();
                if (text.length < 30) return text;
            }

            return 'Overview';
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Run once initially to set starting state
        handleScroll();

        // Check again after a brief timeout to let dynamic heights render
        const timer = setTimeout(handleScroll, 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // SVG circle setup for diameter 60
    const size = 60;
    const strokeWidth = 2.5;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <div className="fixed bottom-24 right-6 z-[90] flex items-center justify-end pointer-events-none">
            <div 
                className="flex items-center gap-3 cursor-pointer pointer-events-auto group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={scrollToTop}
            >
                {/* Horizontal slide-out telemetry info */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 15, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="bg-slate-950/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg flex flex-col items-end text-right shadow-[0_4px_20px_rgba(0,0,0,0.4)] pointer-events-none"
                        >
                            <span className="text-[8px] font-mono tracking-[0.25em] text-slate-500 uppercase">
                                Sector Tracker
                            </span>
                            <span className="text-[11px] font-mono font-semibold text-tech-cyan group-hover:text-skylink-gold transition-colors duration-300 tracking-wider mt-0.5 whitespace-nowrap">
                                {activeSection.toUpperCase()}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Circular Telemetry Dial */}
                <motion.div 
                    className="relative w-[60px] h-[60px] rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 hover:border-tech-cyan/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* SVG Progress Ring */}
                    <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
                        <defs>
                            <linearGradient id="dial-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#c29b40" />
                            </linearGradient>
                        </defs>
                        {/* Outer track */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.03)"
                            strokeWidth={strokeWidth}
                        />
                        {/* Progress ring */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="url(#dial-gradient)"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-150"
                        />
                    </svg>

                    {/* Conic Radar Sweep Overlay */}
                    <div className="absolute inset-[3px] rounded-full bg-[conic-gradient(from_0deg,rgba(6,182,212,0.18)_0deg,transparent_120deg)] animate-[spin_3.5s_linear_infinite] pointer-events-none" />

                    {/* Cybernetic Telemetry Ticks */}
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                        {/* Top tick */}
                        <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-[1px] h-[3px] bg-tech-cyan" />
                        {/* Bottom tick */}
                        <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[1px] h-[3px] bg-tech-cyan" />
                        {/* Left tick */}
                        <div className="absolute left-[2px] top-1/2 -translate-y-1/2 w-[3px] h-[1px] bg-tech-cyan" />
                        {/* Right tick */}
                        <div className="absolute right-[2px] top-1/2 -translate-y-1/2 w-[3px] h-[1px] bg-tech-cyan" />
                    </div>

                    {/* Center Percentage Readout */}
                    <div className="z-10 flex flex-col items-center justify-center font-mono">
                        <span className="text-[11px] font-bold text-white tracking-tighter group-hover:text-tech-cyan transition-colors duration-300">
                            {Math.floor(scrollProgress)}%
                        </span>
                    </div>

                    {/* Subtle outer glowing point */}
                    <div className="absolute inset-0 rounded-full bg-tech-cyan/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
            </div>
        </div>
    );
};

export default ScrollProgress;
