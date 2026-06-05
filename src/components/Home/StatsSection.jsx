import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Briefcase, Clock, Users } from 'lucide-react';

// FEATURE 1: DYNAMIC STAT PARTICLE STREAM
const StatParticleStream = ({ active }) => {
    const particles = useMemo(() => {
        return Array.from({ length: 6 }).map((_, i) => ({
            id: i,
            x: Math.random() * 80 + 10, // horizontal starting left %
            size: Math.random() * 3 + 1.5,
            delay: Math.random() * 1.5,
            duration: Math.random() * 2 + 1.5
        }));
    }, [active]);

    if (!active) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ y: '100%', opacity: 0, scale: 0.5 }}
                    animate={{ y: '-10%', opacity: [0, 0.7, 0], scale: 1 }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeOut'
                    }}
                    className="absolute bg-skylink-gold rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`
                    }}
                />
            ))}
        </div>
    );
};

const RollingOdometer = ({ value, isInView }) => {
    const chars = value.toString().split('');
    
    return (
        <div className="flex items-center text-5xl font-bold text-white mb-2 tracking-tight font-serif" style={{ transform: 'translateZ(35px)' }}>
            {chars.map((char, index) => {
                const isNumber = !isNaN(parseInt(char));
                
                if (!isNumber) {
                    return (
                        <motion.span 
                            key={`char-${index}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                        >
                            {char}
                        </motion.span>
                    );
                }
                
                const targetNum = parseInt(char);
                // Create a column from 0 to 9
                const numbers = [0,1,2,3,4,5,6,7,8,9];
                
                return (
                    <div key={`digit-${index}`} className="relative h-[1em] overflow-hidden" style={{ lineHeight: '1em' }}>
                        <motion.div
                            initial={{ y: "0%" }}
                            animate={isInView ? { y: `-${targetNum * 10}%` } : {}}
                            transition={{ 
                                type: "spring", 
                                stiffness: 60, 
                                damping: 15, 
                                delay: 0.2 + (index * 0.1),
                                mass: 0.8
                            }}
                            className="flex flex-col"
                        >
                            {numbers.map(n => (
                                <span key={n} className="h-[1em] flex items-center justify-center">{n}</span>
                            ))}
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
};

const StatItem = ({ value, label, icon: Icon, isLast, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [hovered, setHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const tiltX = (y / rect.height - 0.5) * -12; // 12deg max tilt
        const tiltY = (x / rect.width - 0.5) * 12;
        setTilt({ x: tiltX, y: tiltY });
        
        // Setup coordinates for reveal border tracking
        ref.current.style.setProperty('--x', `${x}px`);
        ref.current.style.setProperty('--y', `${y}px`);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                setTilt({ x: 0, y: 0 });
            }}
            style={{
                transform: hovered
                    ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
                    : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transformStyle: 'preserve-3d',
                transition: hovered ? 'none' : 'transform 0.5s ease-out'
            }}
            className={`relative flex flex-col items-center justify-center p-12 group cursor-default glow-hover
                ${!isLast ? 'border-b md:border-b-0 md:border-r border-white/10' : ''}
                hover:bg-white/5 transition-colors duration-500`}
        >
            {/* 3D Blueprint background mesh grid on hover */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500 overflow-hidden">
                <div 
                    className="absolute inset-[-50px] border border-dashed border-tech-cyan bg-[radial-gradient(rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:10px_10px]"
                    style={{ transform: 'perspective(500px) rotateX(20deg)' }}
                />
            </div>

            {/* Particle Stream */}
            <StatParticleStream active={hovered} />

            {/* Icon with pulse effect */}
            <motion.div
                animate={isInView ? { scale: [0, 1.2, 1] } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                className="relative z-10"
                style={{ transform: 'translateZ(25px)' }}
            >
                <Icon
                    size={32}
                    className="text-skylink-gold mb-6 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 blur-xl bg-skylink-gold/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Animated Odometer */}
            <RollingOdometer value={value} isInView={isInView} />

            {/* Label with underline animation */}
            <div 
                className="relative z-10 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase group-hover:text-skylink-gold transition-colors duration-300"
                style={{ transform: 'translateZ(15px)' }}
            >
                {label}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-skylink-gold group-hover:w-full transition-all duration-300" />
            </div>
        </motion.div>
    );
};

const StatsSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    const stats = [
        { value: "3+", label: "Continents", icon: Globe },
        { value: "500+", label: "Projects", icon: Briefcase },
        { value: "24/7", label: "Support", icon: Clock },
        { value: "98%", label: "Satisfaction", icon: Users },
    ];

    return (
        <section ref={sectionRef} className="bg-transparent border-t border-white/10 relative overflow-hidden z-10">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-skylink-blue/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-tech-cyan/10 rounded-full blur-3xl" />
            </div>

            {/* Connecting line decoration */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-skylink-gold/30 to-transparent origin-left hidden md:block"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={index}
                            value={stat.value}
                            label={stat.label}
                            icon={stat.icon}
                            isLast={index === stats.length - 1}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
