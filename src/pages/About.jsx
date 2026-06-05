import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Shield, Target, Users, Heart, ArrowRight, Award } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import heroBg from '../assets/Photos/DSC05814.jpg';
import csrBg from '../assets/Photos/DSC05856.jpg';
import chairmanImg from '../assets/chairman.webp';
import ceoImg from '../assets/ceo.webp';
import mdImg from '../assets/managing-director.webp';
import LottieAnimation from '../components/Common/LottieAnimation';
import placeholderAnimation from '../assets/animations/placeholder.json';
import InteractiveOrgChart from '../components/UI/InteractiveOrgChart';
import CaseStudyCarousel from '../components/UI/CaseStudyCarousel';

const getTextColorClass = (color) => {
    if (color === 'skylink-gold') return 'text-skylink-gold';
    if (color === 'skylink-blue') return 'text-skylink-blue';
    return 'text-skylink-navy';
};

const getBorderBottomColorClass = (color) => {
    if (color === 'skylink-gold') return 'border-b-skylink-gold';
    if (color === 'skylink-blue') return 'border-b-skylink-blue';
    return 'border-b-skylink-navy';
};

const getBgColorClass = (color) => {
    if (color === 'skylink-gold') return 'bg-skylink-gold';
    if (color === 'skylink-blue') return 'bg-skylink-blue';
    return 'bg-skylink-navy';
};

const HolographicLeaderCard = ({ leader }) => {
    const cardRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 15 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="perspective-1000 w-full relative"
        >
            <div 
                className={`glass rounded-2xl shadow-xl overflow-hidden group border-b-4 border-white/10 ${getBorderBottomColorClass(leader.color)} relative h-[420px] cursor-pointer`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Holographic reflection/glare foil overlay */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                        background: useTransform(
                            [x, y],
                            ([latestX, latestY]) => `radial-gradient(circle at ${(latestX + 0.5) * 100}% ${(latestY + 0.5) * 100}%, rgba(6, 182, 212, 0.15) 0%, rgba(194, 155, 64, 0.1) 40%, rgba(255,255,255,0.05) 70%, transparent 100%)`
                        )
                    }}
                />
                
                {/* Diagonal glare shine overlay */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-60 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                    style={{
                        transform: useTransform([x, y], ([lx, ly]) => `translate(${lx * 50}px, ${ly * 50}px)`)
                    }}
                />

                {/* Portrait Image Container */}
                <div className="h-full w-full overflow-hidden relative transform-style-3d">
                    <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-skylink-navy/95 via-skylink-navy/40 to-transparent opacity-100 group-hover:opacity-85 transition-opacity z-10" />
                    
                    {/* Parallax Hover Names (Floats above) */}
                    <div 
                        className="absolute bottom-6 left-6 right-6 text-white z-10 select-none pointer-events-none transform transition-transform duration-300 group-hover:translate-z-[35px]"
                        style={{ transform: "translateZ(30px)" }}
                    >
                        <h3 className="text-2xl font-bold font-serif mb-1 drop-shadow-md">{leader.name}</h3>
                        <p className={`${getTextColorClass(leader.color)} font-bold tracking-widest text-xs uppercase drop-shadow-sm`}>{leader.title}</p>
                    </div>
                </div>

                {/* Expandable bio drawer (slides up from bottom on click/isOpen) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 20, stiffness: 150 }}
                            className="absolute inset-0 bg-skylink-navy/95 backdrop-blur-md p-8 flex flex-col justify-between z-40 cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-xl font-bold text-white font-serif">{leader.name}</h4>
                                        <p className={`${getTextColorClass(leader.color)} text-xs font-bold tracking-wider uppercase`}>{leader.title}</p>
                                    </div>
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed overflow-y-auto max-h-[260px] pr-2">
                                    {leader.desc}
                                </p>
                            </div>
                            <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
                                <span>Skylink Leadership</span>
                                <div className={`w-12 h-1 ${getBgColorClass(leader.color)} rounded`} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const AmbientAudioEngine = ({ activeIndex, isPlaying }) => {
    const audioCtxRef = useRef(null);
    const droneOscRef = useRef(null);
    const filterRef = useRef(null);

    const startAudio = () => {
        try {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtxRef.current.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(55, audioCtxRef.current.currentTime);
            
            const filter = audioCtxRef.current.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(120, audioCtxRef.current.currentTime);
            
            const gain = audioCtxRef.current.createGain();
            gain.gain.setValueAtTime(0.03, audioCtxRef.current.currentTime);
            
            const lfo = audioCtxRef.current.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.setValueAtTime(0.25, audioCtxRef.current.currentTime);
            
            const lfoGain = audioCtxRef.current.createGain();
            lfoGain.gain.setValueAtTime(40, audioCtxRef.current.currentTime);
            
            lfo.connect(lfoGain);
            lfoGain.connect(filter.frequency);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtxRef.current.destination);
            
            osc.start();
            lfo.start();
            
            droneOscRef.current = osc;
            filterRef.current = filter;
        } catch(e) {}
    };

    const stopAudio = () => {
        if (droneOscRef.current) {
            try { droneOscRef.current.stop(); } catch(e) {}
            droneOscRef.current = null;
        }
        if (audioCtxRef.current) {
            try { audioCtxRef.current.close(); } catch(e) {}
            audioCtxRef.current = null;
        }
    };

    useEffect(() => {
        if (isPlaying) {
            startAudio();
        } else {
            stopAudio();
        }
        return () => stopAudio();
    }, [isPlaying]);

    useEffect(() => {
        if (isPlaying && filterRef.current && audioCtxRef.current) {
            const time = audioCtxRef.current.currentTime;
            filterRef.current.frequency.cancelScheduledValues(time);
            filterRef.current.frequency.setValueAtTime(120, time);
            filterRef.current.frequency.exponentialRampToValueAtTime(700, time + 0.12);
            filterRef.current.frequency.exponentialRampToValueAtTime(140, time + 0.5);
            
            try {
                const osc2 = audioCtxRef.current.createOscillator();
                const gn = audioCtxRef.current.createGain();
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(280 + activeIndex * 120, time);
                osc2.frequency.exponentialRampToValueAtTime(560 + activeIndex * 240, time + 0.25);
                gn.gain.setValueAtTime(0.012, time);
                gn.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
                osc2.connect(gn);
                gn.connect(audioCtxRef.current.destination);
                osc2.start();
                osc2.stop(time + 0.35);
            } catch(e) {}
        }
    }, [activeIndex, isPlaying]);

    return null;
};

const TimelineSoundtrack = ({ scrollYProgress }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            let current = -1;
            if (latest >= 0.05 && latest < 0.25) current = 0;
            else if (latest >= 0.25 && latest < 0.5) current = 1;
            else if (latest >= 0.5 && latest < 0.75) current = 2;
            else if (latest >= 0.75) current = 3;
            
            if (current !== -1 && current !== activeIndex) {
                setActiveIndex(current);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, activeIndex]);

    return (
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 mb-10 max-w-xl mx-auto flex items-center justify-between font-mono text-xs text-left relative overflow-hidden">
            <div className="absolute top-1 right-2 text-[8px] text-slate-500">UNIT_AUDIO_SCANNER</div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => {
                        setIsPlaying(!isPlaying);
                        try {
                            const ctx = new (window.AudioContext || window.webkitAudioContext)();
                            const osc = ctx.createOscillator();
                            const gn = ctx.createGain();
                            osc.frequency.setValueAtTime(600, ctx.currentTime);
                            gn.gain.setValueAtTime(0.02, ctx.currentTime);
                            gn.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
                            osc.connect(gn);
                            gn.connect(ctx.destination);
                            osc.start();
                            osc.stop(ctx.currentTime + 0.15);
                        } catch(e) {}
                    }}
                    className={`px-3 py-1.5 rounded-lg border font-bold uppercase transition-all ${
                        isPlaying 
                            ? 'bg-skylink-gold text-slate-950 border-skylink-gold shadow-lg shadow-skylink-gold/25' 
                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                >
                    {isPlaying ? "Telemetry Audio: ON" : "Telemetry Audio: OFF"}
                </button>
                <div className="text-[10px] text-slate-400 leading-tight">
                    {isPlaying 
                        ? "Ambient sci-fi loop active. Scroll page to modulate frequency sweeps." 
                        : "Click to enable historical frequency telemetry scans."
                    }
                </div>
            </div>

            {isPlaying && (
                <div className="flex gap-0.5 items-end h-6 w-12 justify-center">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                height: [4, Math.floor(Math.random() * 20) + 4, 4]
                            }}
                            transition={{
                                duration: 0.6 + i * 0.1,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                            className="w-1 bg-skylink-gold rounded-full"
                        />
                    ))}
                </div>
            )}

            <AmbientAudioEngine activeIndex={activeIndex} isPlaying={isPlaying} />
        </div>
    );
};

const ConstellationNode = ({ title, icon: Icon, defaultX, defaultY, desc, isExpanded, onSelect }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 12 });
    const springY = useSpring(y, { stiffness: 150, damping: 12 });

    const [currentPos, setCurrentPos] = useState({ x: defaultX, y: defaultY });

    useEffect(() => {
        const unsubscribeX = springX.on("change", (latestX) => {
            setCurrentPos(prev => ({ ...prev, x: defaultX + latestX }));
        });
        const unsubscribeY = springY.on("change", (latestY) => {
            setCurrentPos(prev => ({ ...prev, y: defaultY + latestY }));
        });
        return () => {
            unsubscribeX();
            unsubscribeY();
        };
    }, [defaultX, defaultY, springX, springY]);

    const targetX = isExpanded ? defaultX : 400;
    const targetY = isExpanded ? defaultY : 200;

    return (
        <g>
            <motion.line
                x1={400}
                y1={200}
                x2={currentPos.x}
                y2={currentPos.y}
                stroke={isExpanded ? "#06b6d4" : "rgba(255,255,255,0.05)"}
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity={isExpanded ? 0.6 : 0.1}
            />
            
            <motion.g
                drag
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                dragElastic={0.4}
                style={{
                    x: useTransform(springX, [0], [targetX - defaultX]),
                    y: useTransform(springY, [0], [targetY - defaultY]),
                }}
                onDrag={(e, info) => {
                    x.set(info.offset.x);
                    y.set(info.offset.y);
                }}
                onDragEnd={() => {
                    x.set(0);
                    y.set(0);
                }}
                onClick={onSelect}
                className="cursor-grab active:cursor-grabbing group/node"
            >
                <circle 
                    cx={defaultX} 
                    cy={defaultY} 
                    r="34" 
                    fill="#020617" 
                    stroke={isExpanded ? "#06b6d4" : "rgba(255, 255, 255, 0.1)"}
                    strokeWidth="2"
                    className="transition-colors duration-300"
                />
                <circle 
                    cx={defaultX} 
                    cy={defaultY} 
                    r="40" 
                    fill="none" 
                    stroke="#c29b40"
                    strokeWidth="1.5"
                    opacity="0"
                    className="group-hover/node:opacity-50 transition-opacity duration-300 animate-spin"
                    style={{ transformOrigin: `${defaultX}px ${defaultY}px`, animationDuration: '6s' }}
                />
                
                <foreignObject x={defaultX - 16} y={defaultY - 16} width="32" height="32" className="pointer-events-none">
                    <div className="text-skylink-gold flex items-center justify-center h-full w-full">
                        <Icon size={20} />
                    </div>
                </foreignObject>

                <text 
                    x={defaultX} 
                    y={defaultY + 54} 
                    textAnchor="middle" 
                    fill="#ffffff" 
                    fontSize="10" 
                    fontWeight="bold" 
                    fontFamily="monospace"
                    className="select-none pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity"
                >
                    {title.toUpperCase()}
                </text>
            </motion.g>
        </g>
    );
};

const ValuesConstellation = ({ values }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);

    return (
        <div className="w-full bg-slate-950/70 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
                Interactive SVG Constellation // Mode: Spring
            </div>

            <div className="text-center mb-4 max-w-md pointer-events-none">
                <span className="text-xs font-mono text-skylink-gold uppercase tracking-wider">
                    {isExpanded ? "Click Center to Collapse Constellation" : "Click Center Node to Explode Core Values"}
                </span>
            </div>

            <div className="relative w-full h-[360px] md:h-[400px] flex items-center justify-center overflow-visible">
                <svg viewBox="0 0 800 400" className="w-full h-full overflow-visible">
                    <circle cx="400" cy="200" r="180" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                    <circle cx="400" cy="200" r="120" fill="none" stroke="rgba(255,255,255,0.01)" strokeWidth="1" strokeDasharray="3 6" />

                    <ConstellationNode
                        title="Integrity"
                        icon={values[0].icon}
                        defaultX={220}
                        defaultY={200}
                        desc={values[0].desc}
                        isExpanded={isExpanded}
                        onSelect={() => setSelectedNode(values[0])}
                    />

                    <ConstellationNode
                        title="Execution"
                        icon={values[1].icon}
                        defaultX={400}
                        defaultY={70}
                        desc={values[1].desc}
                        isExpanded={isExpanded}
                        onSelect={() => setSelectedNode(values[1])}
                    />

                    <ConstellationNode
                        title="People First"
                        icon={values[2].icon}
                        defaultX={580}
                        defaultY={200}
                        desc={values[2].desc}
                        isExpanded={isExpanded}
                        onSelect={() => setSelectedNode(values[2])}
                    />

                    <g className="cursor-pointer" onClick={() => {
                        setIsExpanded(!isExpanded);
                        try {
                            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                            const osc = audioCtx.createOscillator();
                            const gain = audioCtx.createGain();
                            osc.frequency.setValueAtTime(isExpanded ? 300 : 600, audioCtx.currentTime);
                            osc.frequency.exponentialRampToValueAtTime(isExpanded ? 150 : 1200, audioCtx.currentTime + 0.3);
                            gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
                            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
                            osc.connect(gain);
                            gain.connect(audioCtx.destination);
                            osc.start();
                            osc.stop(audioCtx.currentTime + 0.35);
                        } catch(e) {}
                    }}>
                        <circle cx="400" cy="200" r="40" fill="#09172a" stroke="#c29b40" strokeWidth="2.5" className="animate-pulse" />
                        <circle cx="400" cy="200" r="48" fill="none" stroke="#c29b40" strokeWidth="1" opacity="0.3" />
                        <text x="400" y="204" textAnchor="middle" fill="#c29b40" fontSize="8" fontWeight="bold" fontFamily="monospace" className="select-none pointer-events-none">
                            {isExpanded ? 'ACTIVE' : 'EXPAND'}
                        </text>
                    </g>
                </svg>

                <AnimatePresence>
                    {selectedNode && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-slate-950/95 backdrop-blur-md border border-skylink-gold/30 rounded-2xl p-5 shadow-2xl z-40 text-left font-sans"
                        >
                            <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
                                <h4 className="font-serif text-lg font-bold text-white">{selectedNode.title}</h4>
                                <button 
                                    onClick={() => setSelectedNode(null)}
                                    className="text-xs text-slate-400 hover:text-white"
                                >
                                    ✕ Close
                                </button>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                {selectedNode.desc}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const TimelineItem = ({ item, index, scrollYProgress }) => {
    const threshold = [0.12, 0.38, 0.64, 0.9][index] || 0.5;

    // Cylinder coordinate transforms
    const rotateX = useTransform(scrollYProgress, [threshold - 0.25, threshold, threshold + 0.25], [45, 0, -45]);
    const translateZ = useTransform(scrollYProgress, [threshold - 0.25, threshold, threshold + 0.25], [-160, 0, -160]);
    const opacity = useTransform(scrollYProgress, [threshold - 0.25, threshold, threshold + 0.25], [0.3, 1, 0.3]);
    const scale = useTransform(scrollYProgress, [threshold - 0.25, threshold, threshold + 0.25], [0.9, 1, 0.9]);

    const itemRef = useRef(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    return (
        <motion.div
            ref={itemRef}
            style={{ 
                rotateX, 
                z: translateZ, 
                opacity, 
                scale,
                transformStyle: 'preserve-3d'
            }}
            className="relative pl-16 md:pl-20 group transition-all duration-100"
        >
            {/* Pulsing timeline node */}
            <div
                className={`absolute left-4 md:left-8 top-0 w-5 h-5 rounded-full border-4 border-skylink-navy z-10 transition-colors duration-500 bg-slate-400 group-hover:bg-skylink-gold cursor-pointer`}
                onClick={() => setIsDetailOpen(true)}
            >
                {/* Ping ring for active milestone */}
                {item.active && (
                    <span className="absolute -inset-2 rounded-full border border-skylink-gold animate-ping opacity-75 pointer-events-none" />
                )}
            </div>

            {/* Content card */}
            <div 
                className="glass p-6 rounded-xl border border-white/5 hover:border-skylink-gold/30 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                onClick={() => setIsDetailOpen(true)}
            >
                <span className={`text-sm font-bold tracking-widest mb-2 block text-skylink-gold`}>
                    {item.year}
                </span>
                <h3 className="text-xl font-bold text-white mb-2 font-serif group-hover:text-tech-cyan transition-colors">{item.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
            </div>

            {/* Modal Detail Dialog */}
            <AnimatePresence>
                {isDetailOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-skylink-navy/85 backdrop-blur-md flex items-center justify-center p-4 z-50 cursor-default"
                        onClick={(e) => { e.stopPropagation(); setIsDetailOpen(false); }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass border border-skylink-gold/30 p-8 rounded-2xl max-w-lg w-full relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setIsDetailOpen(false)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                            <span className="text-skylink-gold text-xs font-bold tracking-[0.2em] uppercase block mb-2">{item.year} Milestone</span>
                            <h3 className="text-3xl font-bold text-white mb-6 font-serif">{item.title}</h3>
                            <p className="text-slate-200 leading-relaxed mb-6">
                                {item.desc}
                            </p>
                            <div className="text-slate-400 text-xs border-t border-white/10 pt-4 flex justify-between">
                                <span>Skylink Journey</span>
                                <span>Innovating since 2011</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const About = () => {
    const valuesRef = useRef(null);
    const leadershipRef = useRef(null);
    const timelineRef = useRef(null);
    const csrRef = useRef(null);

    const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
    const leadershipInView = useInView(leadershipRef, { once: true, margin: '-100px' });
    const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' });
    const csrInView = useInView(csrRef, { once: true, margin: '-100px' });

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start center', 'end center'],
    });

    const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const values = [
        { icon: Shield, title: 'Uncompromising Integrity', desc: 'We operate with full transparency. No hidden fees, no cut corners. In an industry of variables, we are the constant.' },
        { icon: Target, title: 'Precision Execution', desc: '"Good enough" is failure. We pursue military-grade precision in every property secured and every call answered.' },
        { icon: Users, title: 'People First', desc: 'Technology empowers us, but people define us. We invest heavily in the training and well-being of our global workforce.' },
    ];

    const leaders = [
        { name: 'Engr. Sami Yousuf Ratan', title: 'Chairman', image: chairmanImg, color: 'skylink-gold', desc: 'A visionary leader with over 20 years of experience in international business and asset management. He established the core philosophy of "Stability through Innovation."' },
        { name: 'Engr. Riyadh Arfin Bhuiyan', title: 'CEO & Founder', image: ceoImg, color: 'skylink-navy', desc: 'The driving force behind Skylink\'s expansion into property preservation. His hands-on approach ensures that our operational standards never waver.' },
        { name: 'Adv. Golam Mustafa Sumon', title: 'Managing Director', image: mdImg, color: 'skylink-blue', desc: 'Overseeing global operations across three continents. He specializes in optimizing workflow logistics and integrating new technologies into our stack.' },
    ];

    const timeline = [
        { year: '2011', title: 'Foundation', desc: 'Skylink Innovations is founded in New York with a focus on business process outsourcing.', active: false },
        { year: '2014', title: 'Global Expansion', desc: 'Opened delivery centers in Dhaka and Manila to support 24/7 operations.', active: false },
        { year: '2017', title: 'Property Preservation Division', desc: 'Launched US-based field operations, partnering with national asset management firms.', active: true },
        { year: 'TODAY', title: 'Market Leadership', desc: 'Servicing 5,000+ assets monthly with a hybrid model of field vendors and digital support.', active: true },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen pt-20 font-sans relative z-10 bg-transparent">
            <SEO title="About Us" description="Built on Trust. Skylink Innovations is the strategic backbone for the nation's leading asset managers." />

            {/* 1. HERO */}
            <section className="relative h-[600px] flex items-center bg-skylink-navy overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale-[30%] opacity-20"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-skylink-navy via-skylink-navy/90 to-transparent" />

                {/* Lottie Background Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
                    <LottieAnimation
                        animationData={placeholderAnimation}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 py-2 px-4 bg-skylink-gold/20 backdrop-blur-sm border border-skylink-gold/50 text-skylink-gold text-xs font-bold tracking-[0.2em] mb-6 uppercase rounded-full"
                    >
                        <Award size={14} />
                        Since 2011
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight font-serif leading-none"
                    >
                        BUILT ON<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-skylink-gold to-yellow-400">TRUST</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-300 font-light max-w-xl leading-relaxed border-l-2 border-skylink-gold pl-6"
                    >
                        Skylink Innovations is more than a service provider. We are the strategic backbone for the nation's leading asset managers and financial institutions.
                    </motion.p>
                </div>
            </section>

            {/* 2. THE SKYLINK CODE */}
            <section ref={valuesRef} className="py-28 bg-transparent relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 text-skylink-gold font-bold tracking-widest text-sm uppercase mb-4">
                            <div className="w-8 h-px bg-skylink-gold" />
                            Our Values
                            <div className="w-8 h-px bg-skylink-gold" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">The Skylink Code</h2>
                        <p className="mt-6 text-slate-300 max-w-2xl mx-auto">
                            Our reputation is our currency. Every action we take is guided by a rigid framework of ethics and excellence.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full flex justify-center"
                    >
                        <ValuesConstellation values={values} />
                    </motion.div>
                </div>
            </section>

            {/* 3. LEADERSHIP */}
            <section ref={leadershipRef} className="py-28 bg-transparent relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="mb-16"
                    >
                        <div className="inline-flex items-center gap-2 text-skylink-blue font-bold tracking-widest text-sm uppercase mb-4">
                            <div className="w-8 h-px bg-skylink-blue" />
                            Executive Team
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">Leadership</h2>
                        <p className="text-lg text-slate-300 max-w-3xl">
                            Decades of combined experience in Real Estate, Finance, and Global Operations.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={leadershipInView ? "visible" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {leaders.map((leader, idx) => (
                            <HolographicLeaderCard key={idx} leader={leader} />
                        ))}
                    </motion.div>

                    {/* FEATURE 11: INTERACTIVE ORGANIZATIONAL CHART */}
                    <InteractiveOrgChart />
                </div>
            </section>

            {/* 4. TIMELINE */}
            <section ref={timelineRef} className="py-28 bg-transparent relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10"
                    >
                        <div className="inline-flex items-center gap-2 text-skylink-gold font-bold tracking-widest text-sm uppercase mb-4">
                            <div className="w-8 h-px bg-skylink-gold" />
                            Our History
                            <div className="w-8 h-px bg-skylink-gold" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">A Decade of Innovation</h2>
                    </motion.div>

                    {/* Timeline soundtrack panel (Feature 12) */}
                    <TimelineSoundtrack scrollYProgress={scrollYProgress} />

                    <div className="relative perspective-1200 transform-style-3d py-16">
                        {/* Timeline line */}
                        <div className="absolute left-6 md:left-10 top-0 bottom-0 w-0.5 bg-white/5" />
                        <motion.div
                            style={{ scaleY: pathLength, originY: 0 }}
                            className="absolute left-6 md:left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-skylink-blue via-tech-cyan to-skylink-gold"
                        />

                        <div className="space-y-24 transform-style-3d">
                            {timeline.map((item, idx) => (
                                <TimelineItem 
                                    key={idx} 
                                    item={item} 
                                    index={idx} 
                                    scrollYProgress={scrollYProgress} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURE 13: PROJECT CASE STUDY CAROUSEL */}
            <section className="py-24 bg-transparent relative z-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10"
                    >
                        <div className="inline-flex items-center gap-2 text-skylink-blue font-bold tracking-widest text-sm uppercase mb-4">
                            <div className="w-8 h-px bg-skylink-blue" />
                            Proven Track Record
                            <div className="w-8 h-px bg-skylink-blue" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4">Case Studies</h2>
                    </motion.div>
                    
                    <CaseStudyCarousel />
                </div>
            </section>

            {/* 5. CSR */}
            <section ref={csrRef} className="relative py-28 bg-transparent overflow-hidden z-10">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: `url(${csrBg})` }}
                />

                {/* Gradient orbs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-skylink-blue/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-skylink-gold/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={csrInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="inline-block p-4 bg-skylink-gold/20 rounded-2xl mb-6"
                        >
                            <Heart size={40} className="text-skylink-gold" />
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">Community & Impact</h2>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            We believe that success is measured by who you lift up with you. Through the Skylink Foundation, we support education initiatives and disaster relief efforts in the communities where our employees live and work.
                        </p>
                        <motion.div whileHover={{ x: 5 }}>
                            <Link to="/contact" className="inline-flex items-center text-white border-b-2 border-skylink-gold pb-1 hover:text-skylink-gold transition-colors group">
                                Partner with our Foundation
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;

