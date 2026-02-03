import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Briefcase, Clock, Users } from 'lucide-react';

// Animated counter hook
const useCounter = (end, duration = 2000, isInView) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);

    useEffect(() => {
        if (!isInView) return;

        let startTime = null;
        const numericEnd = parseInt(end.replace(/\D/g, '')) || 0;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * numericEnd));

            if (progress < 1) {
                countRef.current = requestAnimationFrame(animate);
            }
        };

        countRef.current = requestAnimationFrame(animate);

        return () => {
            if (countRef.current) {
                cancelAnimationFrame(countRef.current);
            }
        };
    }, [end, duration, isInView]);

    // Format the count with the original suffix
    const suffix = end.replace(/[0-9]/g, '');
    return count + suffix;
};

const StatItem = ({ value, label, icon: Icon, isLast, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const animatedValue = useCounter(value, 2000, isInView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className={`relative flex flex-col items-center justify-center p-12 group cursor-default
                ${!isLast ? 'border-b md:border-b-0 md:border-r border-slate-700' : ''}
                hover:bg-gradient-to-b hover:from-slate-800 hover:to-skylink-navy transition-all duration-500`}
        >
            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-skylink-gold/5 to-transparent" />
            </div>

            {/* Icon with pulse effect */}
            <motion.div
                animate={isInView ? { scale: [0, 1.2, 1] } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                className="relative z-10"
            >
                <Icon
                    size={32}
                    className="text-skylink-gold mb-6 group-hover:scale-110 transition-transform duration-300"
                />
                {/* Icon glow on hover */}
                <div className="absolute inset-0 blur-xl bg-skylink-gold/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Animated number */}
            <motion.div
                className="relative z-10 text-5xl font-bold text-white mb-2 tracking-tight font-serif"
            >
                {isInView ? animatedValue : "0"}
            </motion.div>

            {/* Label with underline animation */}
            <div className="relative z-10 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase group-hover:text-skylink-gold transition-colors duration-300">
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
        <section ref={sectionRef} className="bg-skylink-navy border-t border-slate-700 relative overflow-hidden">
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

