import { ArrowRight, Hammer, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useRef } from 'react';

import logo from '../../assets/logo.webp';
import propertyBg from '../../assets/Photos/DSC05810.jpg';
import meeting02 from '../../assets/meeting-02.webp';

// Feature 3: Interactive Split Hero Service Portal Gateway
const SplitHero = () => {
    const containerRef = useRef(null);
    const [hoveredSide, setHoveredSide] = useState(null); // 'left' | 'right' | 'center' | null
    
    // Mouse tracking for perspective tilt
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const springConfig = { stiffness: 150, damping: 20 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Left Panel Transforms (Tilts away from mouse)
    const leftRotateX = useTransform(smoothY, [0, 1], [8, -8]);
    const leftRotateY = useTransform(smoothX, [0, 0.5], [-12, 0]);
    const leftScale = useTransform(smoothX, [0, 0.5], [1.03, 1]);

    // Right Panel Transforms
    const rightRotateX = useTransform(smoothY, [0, 1], [8, -8]);
    const rightRotateY = useTransform(smoothX, [0.5, 1], [0, 12]);
    const rightScale = useTransform(smoothX, [0.5, 1], [1, 1.03]);

    // Center Attractor Pull (Pull panels inward when near center)
    const centerPullLeft = useTransform(smoothX, [0.3, 0.5, 0.7], [0, 20, 0]);
    const centerPullRight = useTransform(smoothX, [0.3, 0.5, 0.7], [0, -20, 0]);

    // Energy Seam Intensity
    const seamOpacity = useTransform(smoothX, [0.3, 0.5, 0.7], [0.3, 1, 0.3]);
    const seamGlow = useTransform(smoothX, [0.3, 0.5, 0.7], ['0px', '20px', '0px']);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);

        if (x > 0.45 && x < 0.55 && y > 0.4 && y < 0.6) setHoveredSide('center');
        else if (x < 0.5) setHoveredSide('left');
        else setHoveredSide('right');
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
        setHoveredSide(null);
    };

    // Particle effect component
    const DirectionalParticles = ({ direction }) => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white/40"
                    initial={{ 
                        x: direction === 'left' ? '120%' : '-20%', 
                        y: Math.random() * window.innerHeight,
                        opacity: 0
                    }}
                    animate={{ 
                        x: direction === 'left' ? '-20%' : '120%',
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-screen flex flex-col md:flex-row overflow-hidden bg-slate-950 perspective-1000"
        >
            {/* Property Vertical */}
            <motion.div 
                style={{
                    rotateX: hoveredSide === 'left' ? leftRotateX : 0,
                    rotateY: hoveredSide === 'left' ? leftRotateY : 0,
                    scale: hoveredSide === 'left' ? leftScale : 1,
                    x: centerPullLeft,
                    transformStyle: 'preserve-3d',
                }}
                className={`flex-1 relative flex items-center justify-center p-12 bg-slate-900 transition-all duration-700 ease-in-out ${hoveredSide === 'left' ? 'flex-[1.1] z-10' : 'z-0'}`}
            >
                <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${hoveredSide === 'left' ? 'opacity-30' : 'opacity-10'}`} style={{ backgroundImage: `url(${propertyBg})` }} />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-transparent opacity-80 pointer-events-none" />
                
                {hoveredSide === 'left' && <DirectionalParticles direction="right" />}

                <motion.div style={{ translateZ: 40 }} className="relative z-10 text-center md:text-left max-w-lg">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center justify-center p-4 bg-skylink-gold/10 rounded-full mb-6 border border-skylink-gold/30 shadow-[0_0_15px_rgba(194,155,64,0.3)]">
                            <Hammer className="text-skylink-gold w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            Real Estate <br /><span className="text-skylink-gold text-transparent bg-clip-text bg-gradient-to-r from-skylink-gold to-yellow-200">Solutions</span>
                        </h2>
                        <p className="text-lg text-slate-300 mb-8 font-light">
                            Expert property preservation, renovation, and maintenance services for asset managers and investors.
                        </p>
                        <Link to="/property" className="group inline-flex items-center px-8 py-4 bg-skylink-gold text-slate-900 rounded-md font-bold hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(194,155,64,0.4)] hover:shadow-[0_0_30px_rgba(194,155,64,0.6)]">
                            Explore Property Services 
                            <motion.div className="ml-2 inline-block" animate={{ x: hoveredSide === 'left' ? 5 : 0 }}><ArrowRight className="w-5 h-5" /></motion.div>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Center Energy Seam */}
            <motion.div 
                className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 z-20 hidden md:block"
                style={{ 
                    background: 'linear-gradient(to bottom, transparent, #06b6d4, #c29b40, transparent)',
                    opacity: seamOpacity,
                    boxShadow: useTransform(seamGlow, v => `0 0 ${v} #06b6d4, 0 0 ${v} #c29b40`)
                }}
            />

            {/* ITES Vertical */}
            <motion.div 
                style={{
                    rotateX: hoveredSide === 'right' ? rightRotateX : 0,
                    rotateY: hoveredSide === 'right' ? rightRotateY : 0,
                    scale: hoveredSide === 'right' ? rightScale : 1,
                    x: centerPullRight,
                    transformStyle: 'preserve-3d',
                }}
                className={`flex-1 relative flex items-center justify-center p-12 bg-slate-950 transition-all duration-700 ease-in-out ${hoveredSide === 'right' ? 'flex-[1.1] z-10' : 'z-0'}`}
            >
                <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${hoveredSide === 'right' ? 'opacity-30' : 'opacity-10'}`} style={{ backgroundImage: `url(${meeting02})` }} />
                <div className="absolute inset-0 bg-gradient-to-l from-slate-950 to-transparent opacity-80 pointer-events-none" />

                {hoveredSide === 'right' && <DirectionalParticles direction="left" />}

                <motion.div style={{ translateZ: 40 }} className="relative z-10 text-center md:text-right max-w-lg">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <div className="inline-flex items-center justify-center p-4 bg-tech-cyan/10 rounded-full mb-6 border border-tech-cyan/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                            <Monitor className="text-tech-cyan w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            Digital <br /><span className="text-tech-cyan text-transparent bg-clip-text bg-gradient-to-r from-tech-cyan to-blue-300">Transformation</span>
                        </h2>
                        <p className="text-lg text-slate-300 mb-8 font-light">
                            World-class BPO, IT support, and digital services driving global business efficiency.
                        </p>
                        <Link to="/ites" className="group inline-flex items-center px-8 py-4 bg-tech-cyan text-slate-900 rounded-md font-bold hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] flex-row-reverse md:flex-row">
                            <motion.div className="mr-2 md:mr-0 md:ml-2 inline-block" animate={{ x: hoveredSide === 'right' ? (window.innerWidth < 768 ? -5 : 5) : 0 }}><ArrowRight className="w-5 h-5 md:rotate-0 rotate-180" /></motion.div>
                            <span>Explore Digital Solutions</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Center Branding (Desktop Only) */}
            <motion.div 
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block cursor-crosshair pointer-events-none"
                animate={{ scale: hoveredSide === 'center' ? 1.15 : 1, rotate: hoveredSide === 'center' ? 90 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                <div className="bg-slate-900 p-5 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10 relative group">
                    <motion.div 
                        className="absolute inset-0 rounded-full bg-gradient-to-tr from-skylink-blue to-skylink-gold"
                        animate={{ opacity: hoveredSide === 'center' ? 0.3 : 0 }}
                    />
                    <img src={logo} alt="SL" className="w-16 h-16 object-contain relative z-10" />
                </div>
            </motion.div>
        </div>
    );
};

export default SplitHero;
