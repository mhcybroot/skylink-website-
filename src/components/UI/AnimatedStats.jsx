import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';

// ============================================
// ANIMATED STATS DISPLAY
// Large format stats with counting animation
// ============================================

const AnimatedStatCard = ({
    value,
    label,
    prefix = '',
    suffix = '',
    duration = 2,
    delay = 0,
    icon: Icon,
    color = 'tech-cyan',
    description,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [displayValue, setDisplayValue] = useState(0);

    // Motion value for smooth counting
    const count = useMotionValue(0);
    const springCount = useSpring(count, {
        duration: duration * 1000,
        bounce: 0,
    });

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                count.set(value);
            }, delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [isInView, value, count, delay]);

    useEffect(() => {
        const unsubscribe = springCount.on('change', (latest) => {
            setDisplayValue(Math.floor(latest));
        });
        return unsubscribe;
    }, [springCount]);

    const colorMap = {
        'tech-cyan': {
            bg: 'bg-tech-cyan/10',
            border: 'border-tech-cyan/30',
            text: 'text-tech-cyan',
            glow: 'shadow-tech-cyan/20',
        },
        'skylink-gold': {
            bg: 'bg-skylink-gold/10',
            border: 'border-skylink-gold/30',
            text: 'text-skylink-gold',
            glow: 'shadow-skylink-gold/20',
        },
        'skylink-blue': {
            bg: 'bg-skylink-blue/10',
            border: 'border-skylink-blue/30',
            text: 'text-skylink-blue',
            glow: 'shadow-skylink-blue/20',
        },
    };

    const colors = colorMap[color] || colorMap['tech-cyan'];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: delay }}
            className="relative group"
        >
            <div className={`relative p-8 rounded-2xl ${colors.bg} border ${colors.border} backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:${colors.glow}`}>
                {/* Background glow effect */}
                <motion.div
                    className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${colors.bg} blur-3xl`}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Icon */}
                {Icon && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
                        className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-6`}
                    >
                        <Icon className={colors.text} size={24} />
                    </motion.div>
                )}

                {/* Value */}
                <div className={`text-5xl md:text-6xl font-bold ${colors.text} font-mono mb-2`}>
                    {prefix}
                    <span>{displayValue.toLocaleString()}</span>
                    {suffix}
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {label}
                </h3>

                {/* Description */}
                {description && (
                    <p className="text-sm text-slate-500 leading-relaxed">
                        {description}
                    </p>
                )}

                {/* Hover line accent */}
                <motion.div
                    className={`absolute bottom-0 left-0 h-1 ${colors.text.replace('text-', 'bg-')}`}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.div>
    );
};

// ============================================
// STATS GRID
// Grid layout for multiple stat cards
// ============================================

export const StatsGrid = ({ stats, columns = 4 }) => {
    const gridCols = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={`grid ${gridCols[columns] || gridCols[4]} gap-6`}>
            {stats.map((stat, index) => (
                <AnimatedStatCard
                    key={index}
                    {...stat}
                    delay={index * 0.1}
                />
            ))}
        </div>
    );
};

// ============================================
// COMPACT STAT ROW
// Horizontal row of compact stats
// ============================================

export const CompactStatRow = ({ stats }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                >
                    <div className="text-3xl md:text-4xl font-bold text-skylink-navy font-mono">
                        {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
                    </div>
                    <div className="text-sm text-slate-500 mt-1 uppercase tracking-wider">
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default AnimatedStatCard;
