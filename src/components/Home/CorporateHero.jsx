import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

// Import images
import hero1 from '../../assets/Photos/DSC05841.jpg'; // Meeting
import hero2 from '../../assets/Photos/DSC05810.jpg'; // Construction
import hero3 from '../../assets/Photos/DSC05839.jpg'; // Tech
import LottieAnimation from '../Common/LottieAnimation';
import placeholderAnimation from '../../assets/animations/placeholder.json';

const slides = [
    {
        image: hero1,
        title: "Strategic Asset Management.",
        subtitle: "Bridging the gap between physical infrastructure and digital optimization."
    },
    {
        image: hero2,
        title: "Precision in Property.",
        subtitle: "Nationwide preservation, inspection, and renovation services executed with military precision."
    },
    {
        image: hero3,
        title: "Scalable BPO Solutions.",
        subtitle: "Empowering global enterprises with high-performance back-office and IT support."
    }
];

// Floating particles component
const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-white/20"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

const CorporateHero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);

    // Parallax scroll effect
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Mouse tracking for spotlight effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100,
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const scrollToContent = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    // Text animation variants
    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
            }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

    return (
        <div
            ref={heroRef}
            className="relative h-screen w-full overflow-hidden bg-skylink-navy flex items-center"
        >
            {/* Background Slider with Parallax */}
            <AnimatePresence mode='popLayout'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-cover bg-center grayscale-[30%] contrast-125"
                    style={{ y, backgroundImage: `url(${slides[currentIndex].image})` }}
                />
            </AnimatePresence>

            {/* Mouse-following spotlight effect */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle 400px at ${mousePosition.x}% ${mousePosition.y}%, rgba(6, 182, 212, 0.15), transparent 60%)`,
                }}
            />

            {/* Floating Particles */}
            <FloatingParticles />

            {/* Industrial Overlay Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Gradient Fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-skylink-navy via-skylink-navy/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-skylink-navy via-transparent to-transparent"></div>

            {/* Content Container */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full"
            >
                <div className="max-w-4xl border-l-4 border-skylink-gold pl-8 md:pl-12 py-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`text-${currentIndex}`}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {/* Animated Title */}
                            <motion.h1
                                variants={titleVariants}
                                className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-none"
                            >
                                {slides[currentIndex].title.split('').map((char, index) => (
                                    <motion.span
                                        key={index}
                                        variants={letterVariants}
                                        className="inline-block"
                                        style={{
                                            marginRight: char === ' ' ? '0.25em' : 0,
                                        }}
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                ))}
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="text-xl md:text-2xl text-slate-300 mb-10 font-sans font-light max-w-2xl leading-relaxed"
                            >
                                {slides[currentIndex].subtitle}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                className="flex flex-col sm:flex-row gap-6"
                            >
                                <Link
                                    to="/contact"
                                    className="group inline-flex items-center px-8 py-4 bg-white text-skylink-navy font-bold text-lg hover:bg-skylink-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-glow-gold"
                                >
                                    PARTNER WITH US
                                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                                <Link
                                    to="/property"
                                    className="inline-flex items-center px-8 py-4 border border-slate-500 text-white font-medium text-lg hover:border-tech-cyan hover:text-tech-cyan transition-all duration-300"
                                >
                                    EXPLORE CAPABILITIES
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Side Animation (Hidden on mobile) */}
                <div className="hidden lg:block opacity-60 mix-blend-screen pointer-events-none">
                    <LottieAnimation
                        animationData={placeholderAnimation}
                        className="w-full max-w-lg mx-auto"
                    />
                </div>
            </motion.div>

            {/* Progress Bar Footer with Glow */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
                <motion.div
                    key={`progress-${currentIndex}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-skylink-gold via-tech-cyan to-skylink-gold shadow-glow"
                />
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-12 right-12 flex space-x-6">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative text-sm font-bold tracking-widest transition-all duration-300 ${idx === currentIndex
                            ? 'text-white'
                            : 'text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        0{idx + 1}
                        {idx === currentIndex && (
                            <motion.div
                                layoutId="activeSlide"
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-skylink-gold"
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Scroll indicator */}
            <motion.button
                onClick={scrollToContent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ChevronDown size={32} />
                </motion.div>
            </motion.button>
        </div>
    );
};

export default CorporateHero;

