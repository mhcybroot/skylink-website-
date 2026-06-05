import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import renoBg from '../../assets/Photos/DSC05809.jpg';
import techBg from '../../assets/Photos/DSC05839.jpg';
import MagneticButton from '../UI/MagneticButton';
import SpotlightText from '../UI/SpotlightText';

// ============================================
// ANIMATED COUNTER FOR TRUST BADGES
// ============================================
const TrustCounter = ({ end, duration = 2, suffix = "", prefix = "", text }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView || isNaN(end)) return;

        let startTime = null;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / (duration * 1000), 1);
            const easeOut = 1 - Math.pow(1 - percentage, 4);
            setCount(Math.floor(easeOut * end));

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isInView]);

    return (
        <div ref={ref} className="flex items-center gap-2 group cursor-default">
            <div className="w-2 h-2 rounded-full bg-skylink-gold group-hover:scale-150 transition-transform shadow-[0_0_8px_rgba(194,155,64,0.8)]" />
            <span className="font-mono text-white group-hover:text-skylink-gold transition-colors">
                {isNaN(end) ? end : `${prefix}${count}${suffix}`}
            </span>
            <span>{text}</span>
        </div>
    );
};

// ============================================
// MOUSE REACTIVE PARTICLE FIELD
// ============================================
const ParticleField = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-tech-cyan"
                    style={{
                        width: Math.random() * 3 + 1,
                        height: Math.random() * 3 + 1,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -Math.random() * 100 - 50],
                        x: [0, (Math.random() - 0.5) * 50],
                        opacity: [0, Math.random() * 0.4 + 0.15, 0],
                        scale: [0, 1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 8 + 4,
                        repeat: Infinity,
                        delay: Math.random() * 4,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
};

// FEATURE 4: PERSPECTIVE PROJECTION CARD
const ProjectionCard = ({ title, image, isLeft }) => {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const tiltX = (y / rect.height - 0.5) * (isLeft ? 12 : -12);
        const tiltY = (x / rect.width - 0.5) * (isLeft ? -12 : 12);
        setTilt({ x: tiltX, y: tiltY });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                setTilt({ x: 0, y: 0 });
            }}
            style={{
                transform: hovered
                    ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.03, 1.03, 1.03)`
                    : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transformStyle: 'preserve-3d',
                transition: hovered ? 'none' : 'transform 0.5s ease-out'
            }}
            className={`hidden xl:flex flex-col p-6 w-64 h-80 rounded-2xl border border-white/10 glass-dark shadow-2xl relative overflow-hidden cursor-pointer group glow-hover ${
                isLeft ? 'ml-8 justify-start' : 'mr-8 justify-end'
            }`}
        >
            {/* Background image container with 3D depth */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-20 group-hover:opacity-40"
                style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-skylink-navy via-skylink-navy/40 to-transparent z-10" />

            {/* Inner Floating Content */}
            <div style={{ transform: 'translateZ(25px)' }} className="relative z-20 flex-grow flex flex-col justify-end">
                <span className="text-[9px] font-bold text-skylink-gold uppercase tracking-widest mb-1">Portfolio Highlights</span>
                <h4 className="text-md font-bold text-white mb-2 leading-tight font-serif group-hover:text-tech-cyan transition-colors">{title}</h4>
                <p className="text-[10px] text-slate-400 leading-normal mb-4">
                    Hover to project coordinate depth features.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-skylink-gold uppercase tracking-wider">
                    Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
            
            {/* Holographic scanner laser line */}
            {hovered && (
                <motion.div
                    className="absolute left-0 right-0 h-[1.5px] bg-tech-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)] z-25"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
            )}
        </motion.div>
    );
};

// ============================================
// CTA SECTION
// ============================================
const CTASection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    
    // Mouse tracking for spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative bg-skylink-navy py-32 overflow-hidden z-10 flex items-center justify-between"
        >
            {/* Left Projection Case Study Card */}
            <ProjectionCard title="Stabilization & Construction" image={renoBg} isLeft={true} />

            {/* Central Content Column */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Spotlight Overlay */}
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full bg-radial-gradient from-tech-cyan/20 to-transparent blur-3xl pointer-events-none opacity-40 -translate-x-1/2 -translate-y-1/2 z-0"
                    style={{
                        x: smoothX,
                        y: smoothY,
                    }}
                />
                
                <ParticleField />

                {/* Static background elements */}
                <div className="absolute inset-0 pointer-events-none -z-10">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-skylink-blue/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-skylink-gold/5 rounded-full blur-[90px]" />
                    
                    {/* Grid Pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, #ffffff 1px, transparent 1px),
                                linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px',
                        }}
                    />
                </div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border border-skylink-gold/30 mb-8 shadow-[0_0_20px_rgba(194,155,64,0.15)] glow-hover cursor-default"
                >
                    <Sparkles size={16} className="text-skylink-gold animate-pulse" />
                    <SpotlightText className="text-sm font-medium tracking-wide">Ready to Transform Your Operations?</SpotlightText>
                </motion.div>

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif leading-tight"
                >
                    Partner with{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-skylink-gold via-yellow-300 to-skylink-gold bg-[length:200%_auto] animate-[gradient-shift_3s_linear_infinite]">
                        Excellence
                    </span>
                </motion.h2>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-300 mb-16 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    Join industry leaders who rely on Skylink for precision, compliance, and scalable solutions
                    that drive real business results.
                </motion.p>

                {/* 3D CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row justify-center gap-6 perspective-1000 relative z-10"
                >
                    <MagneticButton>
                        <Link
                            to="/contact"
                            className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-skylink-gold to-yellow-500 text-skylink-navy font-bold text-lg uppercase tracking-wider rounded-xl shadow-[0_10px_30px_rgba(194,155,64,0.3)] hover:shadow-[0_20px_40px_rgba(194,155,64,0.5)] transition-all duration-300 glow-hover w-full h-full block"
                        >
                            <span className="flex items-center">
                                Schedule Consultation
                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </span>
                            <div className="absolute inset-0 rounded-xl border border-white/40 mix-blend-overlay pointer-events-none" />
                        </Link>
                    </MagneticButton>

                    <MagneticButton>
                        <Link
                            to="/about"
                            className="group inline-flex items-center justify-center px-10 py-5 glass border border-white/10 text-white font-bold text-lg uppercase tracking-wider rounded-xl hover:border-tech-cyan/50 hover:bg-white/5 transition-all duration-300 shadow-lg glow-hover w-full h-full block"
                        >
                            View Corporate Profile
                        </Link>
                    </MagneticButton>
                </motion.div>

                {/* Animated Trust indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-20 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-10 text-slate-400 text-sm"
                >
                    <TrustCounter end={500} text="Trusted" prefix="Fortune " />
                    <TrustCounter end="ISO" text="Certified" />
                    <TrustCounter end={24} suffix="/7" text="Support" />
                    <TrustCounter end={99.9} suffix="%" text="Uptime" duration={3} />
                </motion.div>
            </div>

            {/* Right Projection Case Study Card */}
            <ProjectionCard title="ITES & Support Systems" image={techBg} isLeft={false} />
        </section>
    );
};

export default CTASection;
