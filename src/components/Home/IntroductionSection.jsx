import { useRef, useState, useEffect, useMemo } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// FEATURE 2: INTERACTIVE 3D MISSION CONTROL RING
const MissionControlRing = ({ hoveredItem }) => {
    const center = 150;
    
    // Get points for current state
    const points = useMemo(() => {
        const p = [];
        if (hoveredItem === null) {
            // Circle
            for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI) / 4;
                p.push({ x: center + 75 * Math.cos(angle), y: center + 75 * Math.sin(angle) });
            }
        } else if (hoveredItem === 0) {
            // Double Diamond (Outer & Inner)
            const inner = [
                { x: center, y: center - 40 },
                { x: center + 40, y: center },
                { x: center, y: center + 40 },
                { x: center - 40, y: center }
            ];
            const outer = [
                { x: center, y: center - 90 },
                { x: center + 90, y: center },
                { x: center, y: center + 90 },
                { x: center - 90, y: center }
            ];
            p.push(...inner, ...outer);
        } else if (hoveredItem === 1) {
            // Gear teeth pattern
            for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI) / 4;
                const r = i % 2 === 0 ? 55 : 90;
                p.push({ x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) });
            }
        } else {
            // Arrow/Growth Line pointing up-right
            p.push(
                { x: center - 80, y: center + 80 }, // bottom-left
                { x: center - 40, y: center + 40 },
                { x: center, y: center },
                { x: center + 40, y: center - 40 },
                { x: center + 80, y: center - 80 }, // top-right peak
                { x: center + 40, y: center - 80 }, // arrowhead top-left
                { x: center + 80, y: center - 40 }, // arrowhead bottom-right
                { x: center, y: center + 60 }        // support dot
            );
        }
        return p;
    }, [hoveredItem]);

    // Define line connections based on active shape
    const lines = useMemo(() => {
        const list = [];
        if (hoveredItem === null || hoveredItem === 1) {
            // Circle or Gear
            for (let i = 0; i < 8; i++) {
                list.push({ from: i, to: (i + 1) % 8 });
            }
        } else if (hoveredItem === 0) {
            // Double Diamond
            list.push({ from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 0 });
            list.push({ from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 4 });
            list.push({ from: 0, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 7 });
        } else {
            // Arrow/Growth Line
            list.push({ from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 });
            list.push({ from: 4, to: 5 }, { from: 4, to: 6 });
        }
        return list;
    }, [hoveredItem]);

    return (
        <svg viewBox="0 0 300 300" className="w-full h-full text-tech-cyan">
            {/* Draw connecting lines */}
            <AnimatePresence>
                {lines.map((ln, idx) => {
                    const fromNode = points[ln.from];
                    const toNode = points[ln.to];
                    if (!fromNode || !toNode) return null;

                    return (
                        <motion.line
                            key={`${hoveredItem}-${idx}`}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.35 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke={hoveredItem === null ? "rgba(6, 182, 212, 0.3)" : "rgba(194, 155, 64, 0.4)"}
                            strokeWidth="1.5"
                            strokeDasharray={hoveredItem === 1 ? "3,3" : "0"}
                        />
                    );
                })}
            </AnimatePresence>

            {/* Draw nodes */}
            {points.map((pt, idx) => (
                <motion.circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredItem === null ? 3.5 : 5}
                    animate={{
                        cx: pt.x,
                        cy: pt.y,
                        fill: hoveredItem === null ? '#06b6d4' : (idx < 4 ? '#c29b40' : '#06b6d4'),
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 15,
                        mass: 0.7
                    }}
                    className="shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                />
            ))}

            {/* Inner Core Pulsing Ring */}
            <circle
                cx={center}
                cy={center}
                r="20"
                fill="transparent"
                stroke="#c29b40"
                strokeWidth="2"
                className="animate-pulse"
                style={{ opacity: 0.3 }}
            />
        </svg>
    );
};

// ============================================
// ANIMATED COUNTER COMPONENT
// ============================================
const AnimatedCounter = ({ end, duration = 2, suffix = "", prefix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime = null;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / (duration * 1000), 1);

            // Easing function (easeOutQuart)
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
        <span ref={ref} className="tabular-nums">
            {prefix}{count}{suffix}
        </span>
    );
};

// ============================================
// INTRODUCTION SECTION
// ============================================
const IntroductionSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [hoveredItem, setHoveredItem] = useState(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const orbY = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const cardVariants = {
        hidden: { opacity: 0, x: 50, rotateY: -15 },
        visible: {
            opacity: 1, x: 0, rotateY: 0,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section ref={sectionRef} className="relative py-28 bg-transparent overflow-hidden z-10 perspective-1000">
            {/* FEATURE 2: 3D Morphing Constellation Ring Parallax Background */}
            <motion.div
                style={{ y: orbY }}
                className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none z-0"
            >
                <div className="absolute inset-0 bg-skylink-blue/20 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-tech-cyan/30 rounded-full blur-[50px] mix-blend-screen" />
                
                {/* Custom Morpher System */}
                <div className="w-full h-full relative">
                    <MissionControlRing hoveredItem={hoveredItem} />
                </div>
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Headlines & Impact */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-8">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: 48 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-0.5 bg-skylink-gold"
                            />
                            <span className="text-skylink-gold font-bold tracking-widest text-sm uppercase">The Skylink Advantage</span>
                        </motion.div>

                        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 font-serif">
                            Engineering Precision for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-skylink-gold via-tech-cyan to-skylink-blue bg-[length:200%_auto] animate-[gradient-shift_4s_linear_infinite]">
                                Your Asset Lifecycle.
                            </span>
                        </motion.h2>

                        <div className="space-y-6">
                            {[
                                "Unified solutions for physical and digital infrastructure.",
                                "Scalable BPO workflows that reduce operational overhead.",
                                "End-to-end project management with transparent reporting."
                            ].map((text, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    onMouseEnter={() => setHoveredItem(idx)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className="flex items-start group cursor-pointer p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300 glow-hover"
                                >
                                    <div className="relative mt-1 mr-4 flex-shrink-0">
                                        <div className="absolute inset-0 bg-tech-cyan blur-sm opacity-0 group-hover:opacity-50 transition-opacity" />
                                        <CheckCircle2 className="text-tech-cyan relative z-10" size={24} />
                                    </div>
                                    <p className="text-slate-300 text-lg transition-colors group-hover:text-white">{text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Narrative & Stats Card */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="relative transform-style-3d"
                    >
                        <div className="glass-dark p-8 md:p-12 rounded-2xl shadow-2xl border border-white/10 relative hover:border-skylink-blue/50 transition-colors duration-500 group overflow-hidden glow-hover">
                            {/* Animated gradient border glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-skylink-gold/20 via-transparent to-tech-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <h3 className="text-2xl font-bold text-white mb-6 font-serif flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-tech-cyan animate-pulse" />
                                Bridging the Gap
                            </h3>
                            <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                                In a rapidly evolving market, fragmented services slow you down. Skylink Innovations Ltd. integrates top-tier property preservation with cutting-edge IT enabled services.
                            </p>

                            {/* Animated Stats */}
                            <div className="grid grid-cols-2 gap-6 my-10 border-y border-white/10 py-8">
                                <div>
                                    <div className="text-4xl font-bold text-skylink-gold mb-1 font-mono tracking-tight">
                                        <AnimatedCounter end={500} suffix="+" />
                                    </div>
                                    <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">Projects</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-tech-cyan mb-1 font-mono tracking-tight">
                                        <AnimatedCounter end={98} suffix="%" />
                                    </div>
                                    <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">Satisfaction</div>
                                </div>
                            </div>

                            <Link to="/about" className="group/link inline-flex items-center font-bold text-white hover:text-tech-cyan transition-colors relative z-10">
                                <span className="relative">
                                    Discover Our Mission
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tech-cyan transition-all duration-300 group-hover/link:w-full" />
                                </span>
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ArrowRight className="ml-3 w-5 h-5" />
                                </motion.div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default IntroductionSection;
