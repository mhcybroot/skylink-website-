import { useRef, useState, useEffect } from 'react';
import { ClipboardList, Settings, CheckSquare, Rocket, Terminal } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import step1Img from '../../assets/Photos/DSC05831.jpg';
import step2Img from '../../assets/Photos/DSC05832.jpg';
import step3Img from '../../assets/Photos/DSC05838.jpg';
import step4Img from '../../assets/Photos/DSC05849.jpg';

// ============================================
// TILT STEP CARD — mouse-reactive 3D depth
// ============================================
const TiltStepCard = ({ children, isSelected }) => {
    const ref = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

    const handleMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => { mx.set(0); my.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className={`transform-style-3d cursor-pointer rounded-xl transition-all duration-300 ${
                isSelected ? 'ring-2 ring-tech-cyan shadow-[0_0_25px_rgba(6,182,212,0.25)]' : 'hover:shadow-lg'
            }`}
        >
            {children}
        </motion.div>
    );
};

// ============================================
// ANIMATED SVG CONNECTOR WITH TRAVELING NODE
// ============================================
const AnimatedConnector = ({ scrollProgress, nodeTrigger, bezierPath }) => {
    const pathLength = useTransform(scrollProgress, [0, 0.8], [0, 1]);

    return (
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 hidden md:block pointer-events-none z-0">
            <svg
                viewBox="0 0 1200 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-16 overflow-visible"
                preserveAspectRatio="none"
            >
                {/* Background path */}
                <path
                    d={bezierPath}
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="2"
                    fill="none"
                />
                {/* Animated glowing path */}
                <motion.path
                    d={bezierPath}
                    stroke="url(#connector-gradient)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    style={{ pathLength }}
                />
                {/* Glow outline */}
                <motion.path
                    d={bezierPath}
                    stroke="url(#connector-gradient)"
                    strokeWidth="7"
                    fill="none"
                    strokeLinecap="round"
                    style={{ pathLength }}
                    opacity="0.25"
                    filter="blur(4px)"
                />
                <defs>
                    <linearGradient id="connector-gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="var(--skylink-gold, #c29b40)" />
                        <stop offset="50%" stopColor="var(--tech-cyan, #06b6d4)" />
                        <stop offset="100%" stopColor="var(--skylink-gold, #c29b40)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Traveling energy particle node */}
            <AnimatePresence>
                {nodeTrigger > 0 && (
                    <motion.div
                        key={nodeTrigger}
                        className="w-3.5 h-3.5 rounded-full bg-tech-cyan blur-[1px] absolute top-1/2 -translate-y-1/2 z-10 shadow-[0_0_15px_#06b6d4]"
                        style={{
                            offsetPath: `path("${bezierPath}")`,
                            offsetRotate: 'auto',
                            left: 0,
                            right: 0
                        }}
                        initial={{ offsetDistance: '0%', scale: 0.5, opacity: 0 }}
                        animate={{ offsetDistance: '100%', scale: 1.2, opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.6, ease: 'easeInOut' }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// ============================================
// GLOWING ORB STEP INDICATOR
// ============================================
const GlowingOrb = ({ index, isActivated, isSelected, icon: Icon, yOffset = 0, onDrag }) => {
    return (
        <div className="relative -mt-10 z-20">
            {/* Outer pulse rings */}
            {(isActivated || isSelected) && (
                <>
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-tech-cyan/60"
                        style={{ y: yOffset }}
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <motion.div
                        className="absolute inset-0 rounded-full border border-skylink-gold/40"
                        style={{ y: yOffset }}
                        initial={{ scale: 1, opacity: 0.4 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
                    />
                </>
            )}
            {/* Core orb - Draggable on Y axis */}
            <motion.div
                drag="y"
                dragConstraints={{ top: -35, bottom: 35 }}
                dragElastic={0.15}
                onDrag={(e, info) => {
                    if (onDrag) onDrag(index, info.offset.y);
                }}
                style={{ y: yOffset }}
                animate={{
                    boxShadow: isSelected
                        ? '0 0 25px rgba(6,182,212,0.8), 0 0 50px rgba(6,182,212,0.3)'
                        : isActivated
                        ? '0 0 20px rgba(6,182,212,0.5), 0 0 40px rgba(6,182,212,0.1)'
                        : '0 0 0px rgba(6,182,212,0)',
                }}
                transition={{ duration: 0.4 }}
                className={`w-20 h-20 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-500 ${isSelected
                    ? 'bg-gradient-to-br from-tech-cyan to-skylink-blue border-2 border-tech-cyan'
                    : isActivated
                    ? 'bg-gradient-to-br from-tech-cyan/80 to-skylink-blue/80 border-2 border-tech-cyan/40'
                    : 'bg-skylink-navy border-4 border-white/10'
                    }`}
            >
                <Icon size={32} className={`transition-colors duration-500 ${isActivated || isSelected ? 'text-white' : 'text-white/30'}`} />
            </motion.div>
        </div>
    );
};

// ============================================
// WORKFLOW SECTION
// ============================================
const WorkflowSection = () => {
    const sectionRef = useRef(null);
    const logEndRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    
    const [selectedStep, setSelectedStep] = useState(0);
    const [nodeTrigger, setNodeTrigger] = useState(0);
    const [nodeYOffsets, setNodeYOffsets] = useState([0, 0, 0, 0]);
    const [logs, setLogs] = useState([
        "[SYSTEM] Diagnostic Module loaded successfully.",
        "[SYSTEM] Listening for operational routing requests..."
    ]);

    const handleNodeDrag = (index, yOffset) => {
        setNodeYOffsets(prev => {
            const next = [...prev];
            next[index] = yOffset;
            return next;
        });
        const nodeNames = ["Consulting", "Planning", "Execution", "Delivery"];
        const nextLog = `[SYSTEM] Recalculating path: Node ${index + 1} (${nodeNames[index]}) displacement ${Math.round(yOffset)}px`;
        setLogs(prev => {
            if (prev.length > 0 && prev[prev.length - 1].startsWith(`[SYSTEM] Recalculating path: Node ${index + 1}`)) {
                return [...prev.slice(0, -1), nextLog];
            }
            return [...prev, nextLog];
        });
    };

    const dynamicPath = `M 150 ${30 + nodeYOffsets[0]} C 250 ${30 + nodeYOffsets[0]}, 350 ${30 + nodeYOffsets[1]}, 450 ${30 + nodeYOffsets[1]} C 550 ${30 + nodeYOffsets[1]}, 650 ${30 + nodeYOffsets[2]}, 750 ${30 + nodeYOffsets[2]} C 850 ${30 + nodeYOffsets[2]}, 950 ${30 + nodeYOffsets[3]}, 1050 ${30 + nodeYOffsets[3]}`;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end center'],
    });

    const steps = [
        {
            icon: ClipboardList,
            title: "Analysis & Consulting",
            description: "We start by understanding your specific needs—whether it's a property audit or a BPO workflow assessment.",
            image: step1Img,
            threshold: 0.15,
            diagnostics: [
                "[INFO] Accessing Consultation Matrix...",
                "[DATA] Streaming target portfolio parameters...",
                "[DATA] Scanning asset vulnerability maps...",
                "[OK] Step 1 analysis complete. 12 operational bottlenecks identified."
            ]
        },
        {
            icon: Settings,
            title: "Strategic Planning",
            description: "Our experts design a tailored roadmap, selecting the right technologies and resource allocation for you.",
            image: step2Img,
            threshold: 0.35,
            diagnostics: [
                "[INFO] Deploying Architecture Planning...",
                "[TECH] Aligning load balancing & server nodes...",
                "[TECH] Injecting workflow spring optimization...",
                "[OK] Tailored strategic roadmap compiled. ROI projection: +24%."
            ]
        },
        {
            icon: CheckSquare,
            title: "Execution & Quality",
            description: "We deploy our trained teams to execute with precision, adhering to strict quality control standards.",
            image: step3Img,
            threshold: 0.55,
            diagnostics: [
                "[INFO] Activating precision execution layers...",
                "[KPI] Calibrating quality assurance thresholds...",
                "[KPI] Syncing task completion trackers...",
                "[OK] Operational standards achieved. Compliance rate: 99.8%."
            ]
        },
        {
            icon: Rocket,
            title: "Delivery & Growth",
            description: "We deliver results on time, helping you scale operations and maximize ROI efficiently.",
            image: step4Img,
            threshold: 0.75,
            diagnostics: [
                "[INFO] Initiating deployment cycles...",
                "[SYSTEM] Allocating cloud cluster resources...",
                "[SYSTEM] Accelerating operation conduits...",
                "[OK] Deliverables deployed successfully. Target metrics optimized."
            ]
        }
    ];

    const handleStepClick = (index) => {
        setSelectedStep(index);
        setNodeTrigger(prev => prev + 1);

        // Append diagnostic logs sequentially
        const stepLogs = steps[index].diagnostics;
        setLogs(prev => [...prev, `[USER] Clicked: Step 0${index + 1} - ${steps[index].title}`]);
        
        stepLogs.forEach((log, logIdx) => {
            setTimeout(() => {
                setLogs(prev => [...prev, log]);
            }, (logIdx + 1) * 350);
        });
    };

    // Auto-scroll log console
    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    return (
        <section ref={sectionRef} className="py-28 bg-transparent relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 text-skylink-gold font-bold tracking-widest text-sm uppercase mb-4">
                        <div className="w-8 h-px bg-skylink-gold" />
                        Our Process
                        <div className="w-8 h-px bg-skylink-gold" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif">How We Work</h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        A seamless, transparent process designed to deliver excellence from start to finish.
                    </p>
                </motion.div>

                {/* Workflow Grid with Connector */}
                <div className="relative">
                    <AnimatedConnector scrollProgress={scrollYProgress} nodeTrigger={nodeTrigger} bezierPath={dynamicPath} />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => {
                            const isSelected = selectedStep === index;
                            
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                    className="perspective-1000"
                                    onClick={() => handleStepClick(index)}
                                >
                                    <TiltStepCard isSelected={isSelected}>
                                        <div className="glass rounded-xl shadow-lg flex flex-col items-center text-center overflow-hidden group relative h-full pb-6">
                                            {/* Image Header */}
                                            <div className="h-40 w-full bg-slate-800 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-skylink-navy/40 group-hover:bg-transparent transition-colors z-10" />
                                                <img
                                                    src={step.image}
                                                    alt={step.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                {/* Energy sweep on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-tech-cyan/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20" />
                                            </div>

                                            {/* Glowing Orb */}
                                            <GlowingOrb
                                                index={index}
                                                isActivated={isInView}
                                                isSelected={isSelected}
                                                icon={step.icon}
                                                yOffset={nodeYOffsets[index]}
                                                onDrag={handleNodeDrag}
                                            />

                                            {/* Content */}
                                            <div className="p-6 pt-4 flex-grow flex flex-col" style={{ transform: 'translateZ(20px)' }}>
                                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-tech-cyan transition-colors font-serif">
                                                    {step.title}
                                                </h3>
                                                <p className="text-slate-300 text-sm leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>

                                            {/* Step Number Badge */}
                                            <motion.div
                                                className={`absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-skylink-navy/90 backdrop-blur-sm border font-mono font-bold shadow-sm z-20 text-sm transition-colors duration-300 ${
                                                    isSelected ? 'border-tech-cyan text-tech-cyan' : 'border-white/10 text-slate-400'
                                                }`}
                                                animate={isSelected ? {
                                                    boxShadow: '0 0 12px rgba(6,182,212,0.4)',
                                                } : {}}
                                            >
                                                0{index + 1}
                                            </motion.div>
                                        </div>
                                    </TiltStepCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Cybernetic Diagnostic Log Terminal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="max-w-3xl mx-auto mt-16 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-2xl relative overflow-hidden"
                >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                        <div className="flex items-center gap-2">
                            <Terminal size={14} className="text-tech-cyan animate-pulse" />
                            <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase font-bold">
                                Diagnostics Console
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse" />
                        </div>
                    </div>

                    {/* Scrolling terminal window */}
                    <div className="h-28 overflow-y-auto pr-2 flex flex-col gap-1 scrollbar-hide text-left">
                        {logs.map((log, idx) => {
                            let logColor = "text-slate-300";
                            if (log.startsWith("[SYSTEM]")) logColor = "text-tech-cyan/80";
                            else if (log.startsWith("[USER]")) logColor = "text-skylink-gold font-bold";
                            else if (log.startsWith("[OK]")) logColor = "text-green-400 font-semibold";
                            else if (log.startsWith("[INFO]")) logColor = "text-blue-400/80";
                            else if (log.startsWith("[TECH]") || log.startsWith("[KPI]")) logColor = "text-slate-400";

                            return (
                                <div key={idx} className={`font-mono text-[11px] leading-relaxed tracking-wide ${logColor}`}>
                                    {log}
                                </div>
                            );
                        })}
                        <div ref={logEndRef} />
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default WorkflowSection;
