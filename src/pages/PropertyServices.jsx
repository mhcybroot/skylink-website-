import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Hammer, Home as HomeIcon, PenTool, Trash2, CheckCircle, ArrowRight, ShieldCheck, ClipboardCheck, ChevronRight, Server, Lock, Globe, Users, HardHat, FileCheck, Sparkles, DollarSign, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import heroBg from '../assets/Photos/DSC05810.jpg';
import preservationBg from '../assets/Photos/DSC05844.jpg';
import renoBg from '../assets/Photos/DSC05809.jpg';
import techBg from '../assets/Photos/DSC05839.jpg';
import LottieAnimation from '../components/Common/LottieAnimation';

import InteractiveFAQ from '../components/UI/InteractiveFAQ';
import placeholderAnimation from '../assets/animations/placeholder.json';

const propertyFaqs = [
    { question: "What states do you currently service?", answer: "We operate a comprehensive national network covering all 50 states with regional hub dispatch centers to ensure rapid SLAs." },
    { question: "How fast is your emergency board-up SLA?", answer: "Our standard emergency response time is under 4 hours, tracked live via our vendor dispatch portal." },
    { question: "Do you handle complete CapEx renovations?", answer: "Yes. From roof replacements to full interior turns, our CapEx division handles procurement, permitting, and execution." },
    { question: "What is your QA process for field work?", answer: "Every work order requires geo-tagged, time-stamped before, during, and after photos that are audited by our AI systems and human QA agents." }
];

// FEATURE 4: BEFORE / AFTER SLIDER WITH TILT PARALLAX
const BeforeAfterSlider = ({ beforeImg, afterImg }) => {
    const containerRef = useRef(null);
    const [sliderPos, setSliderPos] = useState(50); // percentage
    const [isDragging, setIsDragging] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        // Parallax tilt calculation
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const tiltX = ((mouseY / rect.height) - 0.5) * 5; // max 5deg tilt
        const tiltY = ((mouseX / rect.width) - 0.5) * -5;
        setTilt({ x: tiltX, y: tiltY });

        if (!isDragging) return;
        
        // Slider position calculation
        const x = Math.max(0, Math.min(mouseX, rect.width));
        setSliderPos((x / rect.width) * 100);
    };

    const handleTouchMove = (e) => {
        if (!containerRef.current || e.touches.length === 0) return;
        const rect = containerRef.current.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const x = Math.max(0, Math.min(touchX, rect.width));
        setSliderPos((x / rect.width) * 100);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                setTilt({ x: 0, y: 0 });
                setIsDragging(false);
            }}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
            className="w-full h-80 md:h-[450px] relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl cursor-ew-resize select-none"
        >
            {/* Before Image */}
            <div className="absolute inset-0 bg-skylink-navy">
                <img
                    src={beforeImg}
                    alt="Before Rehab"
                    className="w-full h-full object-cover pointer-events-none grayscale-[40%]"
                />
                <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider rounded backdrop-blur-sm border border-white/10">
                    Distressed / Before
                </div>
            </div>

            {/* After Image (clipped) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
                <img
                    src={afterImg}
                    alt="After Rehab"
                    className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute top-4 right-4 bg-skylink-gold/80 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider rounded backdrop-blur-sm border border-skylink-gold/20 shadow-glow">
                    Market-Ready / After
                </div>
            </div>

            {/* Slider Line */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-skylink-blue via-skylink-gold to-tech-cyan pointer-events-none"
                style={{ left: `${sliderPos}%` }}
            >
                {/* Glow bars */}
                <div className="absolute inset-0 w-2 -left-0.5 bg-white blur-sm opacity-80" />
                <div className="absolute inset-0 w-4 -left-1.5 bg-skylink-gold/50 blur-md" />

                {/* Handlebar Button */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-skylink-navy border-2 border-skylink-gold flex items-center justify-center shadow-2xl pointer-events-none">
                    <div className="flex gap-1">
                        <div className="w-1.5 h-3 bg-skylink-gold rounded-full" />
                        <div className="w-1.5 h-3 bg-skylink-gold rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// FEATURE 5: HOLOGRAPHIC CARDS
const HolographicCard = ({ children, className }) => {
    const cardRef = useRef(null);
    const [style, setStyle] = useState({});

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Tilt calculations
        const tiltX = (y / rect.height - 0.5) * -12; // max 12deg
        const tiltY = (x / rect.width - 0.5) * 12;
        
        // Glare gradient position
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setStyle({
            transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%), rgba(255, 255, 255, 0.03)`,
            boxShadow: `0 20px 40px rgba(0,0,0,0.3)`
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            background: 'rgba(255, 255, 255, 0.03)',
            boxShadow: 'none'
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                ...style,
                transition: 'transform 0.1s ease-out, background 0.1s ease-out'
            }}
            className={`rounded-2xl border border-white/10 p-8 backdrop-blur-sm ${className}`}
        >
            {children}
        </div>
    );
};

// ============================================
// FEATURE 8: GLOBAL ASSET MAP NODE OVERLAY
// ============================================
const GlobalAssetMap = () => {
    const [hoveredNode, setHoveredNode] = useState(null);

    const nodes = [
        { id: 'na', name: 'North America Dispatch', x: 220, y: 140, details: 'HQ & Global Routing // 2,400+ properties synced // SLA response: 24 min', coords: '40.7128° N, 74.0060° W' },
        { id: 'eu', name: 'Europe Operations Link', x: 440, y: 120, details: 'London Conduit // Client Relations // 99.8% System Uptime', coords: '51.5074° N, 0.1278° W' },
        { id: 'bd', name: 'South Asia Hub (Dhaka)', x: 670, y: 190, details: 'Dhaka Operations Centre // Field Rehab Management // 450+ staff', coords: '23.8103° N, 90.4125° E' },
        { id: 'ph', name: 'Southeast Asia Hub (Manila)', x: 740, y: 220, details: 'Manila BPO Center // Customer Experience & IT Support // 150+ staff', coords: '14.5995° N, 120.9842° E' }
    ];

    const paths = [
        { from: 'na', to: 'eu', controlX: 330, controlY: 100 },
        { from: 'eu', to: 'bd', controlX: 555, controlY: 130 },
        { from: 'bd', to: 'ph', controlX: 705, controlY: 200 },
        { from: 'na', to: 'bd', controlX: 445, controlY: 200 },
        { from: 'na', to: 'ph', controlX: 480, controlY: 240 }
    ];

    return (
        <div className="w-full bg-slate-950/60 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
            <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                Operational Conduits Active // SECURE_FED_PORT
            </div>

            <div className="mb-8">
                <span className="text-skylink-gold font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Global Network</span>
                <h3 className="text-3xl font-bold font-serif text-white">ACTIVE ASSET & BPO CONDUITS</h3>
                <p className="text-slate-400 text-sm max-w-xl mt-2 leading-relaxed">
                    Hover regional nodes to inspect system loads, latencies, coordinates, and staff capacity reports.
                </p>
            </div>

            <div className="relative w-full overflow-hidden flex justify-center">
                <svg viewBox="0 0 900 360" className="w-full h-auto max-w-4xl overflow-visible relative z-10">
                    <g opacity="0.08" fill="rgba(255, 255, 255, 0.4)">
                        <circle cx="150" cy="110" r="15" /><circle cx="210" cy="130" r="22" /><circle cx="170" cy="160" r="18" /><circle cx="240" cy="170" r="12" />
                        <circle cx="280" cy="240" r="20" /><circle cx="310" cy="290" r="14" />
                        <circle cx="430" cy="90" r="16" /><circle cx="450" cy="110" r="20" /><circle cx="490" cy="120" r="12" />
                        <circle cx="470" cy="200" r="22" /><circle cx="510" cy="240" r="18" />
                        <circle cx="620" cy="100" r="24" /><circle cx="680" cy="140" r="30" /><circle cx="650" cy="200" r="16" /><circle cx="730" cy="180" r="20" />
                        <circle cx="790" cy="280" r="18" /><circle cx="820" cy="300" r="14" />
                    </g>

                    {paths.map((p, idx) => {
                        const start = nodes.find(n => n.id === p.from);
                        const end = nodes.find(n => n.id === p.to);
                        if (!start || !end) return null;

                        const isNodeHovered = hoveredNode === start.id || hoveredNode === end.id;

                        return (
                            <g key={idx}>
                                <path
                                    d={`M ${start.x} ${start.y} Q ${p.controlX} ${p.controlY} ${end.x} ${end.y}`}
                                    stroke={isNodeHovered ? "#06b6d4" : "rgba(255, 255, 255, 0.08)"}
                                    strokeWidth={isNodeHovered ? "2" : "1.5"}
                                    strokeDasharray={isNodeHovered ? "none" : "5, 5"}
                                    fill="none"
                                    className="transition-all duration-300"
                                />
                                {isNodeHovered && (
                                    <motion.path
                                        d={`M ${start.x} ${start.y} Q ${p.controlX} ${p.controlY} ${end.x} ${end.y}`}
                                        stroke="#06b6d4"
                                        strokeWidth="4"
                                        fill="none"
                                        opacity="0.3"
                                        filter="blur(2px)"
                                    />
                                )}
                            </g>
                        );
                    })}

                    {nodes.map((node) => {
                        const isHovered = hoveredNode === node.id;
                        return (
                            <g 
                                key={node.id}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                className="cursor-pointer"
                            >
                                <circle 
                                    cx={node.x} 
                                    cy={node.y} 
                                    r={isHovered ? 18 : 10} 
                                    fill="rgba(6, 182, 212, 0.15)"
                                    className="transition-all duration-300"
                                />
                                <circle 
                                    cx={node.x} 
                                    cy={node.y} 
                                    r={isHovered ? 10 : 6} 
                                    fill={node.id === 'na' ? '#c29b40' : '#06b6d4'}
                                    className="transition-all duration-300"
                                />
                                <circle cx={node.x} cy={node.y} r={2} fill="#ffffff" />
                            </g>
                        );
                    })}
                </svg>

                <AnimatePresence>
                    {hoveredNode && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.25 }}
                            className="absolute bottom-6 right-6 left-6 md:left-auto md:w-80 bg-slate-950/90 backdrop-blur-xl border border-tech-cyan/35 rounded-xl p-4 shadow-[0_0_20px_rgba(6,182,212,0.15)] z-20 font-mono text-xs"
                        >
                            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2 text-tech-cyan font-bold uppercase tracking-wider">
                                <span>{nodes.find(n => n.id === hoveredNode)?.name}</span>
                                <span className="text-[9px] bg-tech-cyan/15 px-1.5 py-0.5 rounded border border-tech-cyan/20">LIVE</span>
                            </div>
                            <div className="text-slate-400 text-[9px] mb-2 font-mono">
                                COORDS: {nodes.find(n => n.id === hoveredNode)?.coords}
                            </div>
                            <p className="text-slate-200 leading-relaxed font-sans text-xs">
                                {nodes.find(n => n.id === hoveredNode)?.details}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const FloorplanSectionWipe = () => {
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const [hoveredMarker, setHoveredMarker] = useState(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        
        if (isDragging) {
            const x = Math.max(0, Math.min(mouseX, rect.width));
            setSliderPos((x / rect.width) * 100);
        }
    };

    const handleTouchMove = (e) => {
        if (!containerRef.current || e.touches.length === 0) return;
        const rect = containerRef.current.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const x = Math.max(0, Math.min(touchX, rect.width));
        setSliderPos((x / rect.width) * 100);
    };

    const markers = [
        { id: 1, x: 280, y: 150, title: "CapEx: HVAC Split System", cost: "$7,500", desc: "High-efficiency heating & cooling system setup.", type: "hvac" },
        { id: 2, x: 420, y: 220, title: "CapEx: Main Plumbing Conduit", cost: "$4,200", desc: "Heavy-duty copper water mains and pressure regulators.", type: "plumbing" },
        { id: 3, x: 580, y: 160, title: "CapEx: Main Electrical Board", cost: "$3,800", desc: "200A panel upgrade with smart breaker switches.", type: "electrical" },
        { id: 4, x: 450, y: 80, title: "CapEx: Roof Decking Support", cost: "$11,500", desc: "Reinforced load-bearing trusses and waterproofing membrane.", type: "structural" },
    ];

    return (
        <div className="w-full bg-slate-950/60 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden text-left mb-16">
            <div className="mb-8">
                <span className="text-skylink-gold font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Engineering View</span>
                <h3 className="text-3xl font-bold font-serif text-white animate-pulse">3D STRUCTURAL FLOORPLAN SLICER</h3>
                <p className="text-slate-400 text-sm max-w-xl mt-2 leading-relaxed">
                    Slide the visual wipe to scan the physical asset. Slicing reveals structural CapEx markers, internal plumbing lines, and main electrical conduits.
                </p>
            </div>

            <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsDragging(false)}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onTouchMove={handleTouchMove}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                className="w-full h-[360px] md:h-[450px] relative overflow-hidden rounded-xl bg-slate-900 border border-white/5 cursor-ew-resize select-none"
            >
                {/* 1. BACKGROUND / ENGINEERING BLUEPRINT (Left layer) */}
                <div 
                    className="absolute inset-0 flex items-center justify-center p-4 bg-slate-950"
                    style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                >
                    <svg viewBox="0 0 800 400" className="w-full h-full text-tech-cyan overflow-visible">
                        {/* Grid */}
                        <defs>
                            <pattern id="iso-grid" width="40" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 0 10 L 20 0 L 40 10 L 20 20 Z" fill="none" stroke="rgba(6, 182, 212, 0.07)" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#iso-grid)" />

                        {/* Isometric Blueprint House Lines */}
                        {/* Foundation */}
                        <polygon points="400,340 150,215 400,90 650,215" fill="rgba(6, 182, 212, 0.05)" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1.5" />
                        
                        {/* Internal walls / blueprint division */}
                        <line x1="400" y1="340" x2="400" y2="215" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="150" y1="215" x2="400" y2="215" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" />
                        <line x1="650" y1="215" x2="400" y2="215" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" />
                        
                        <line x1="275" y1="277.5" x2="525" y2="152.5" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
                        <line x1="525" y1="277.5" x2="275" y2="152.5" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />

                        {/* Plumbing (Blue Pipes) */}
                        <path d="M 250,265 L 350,215 L 350,150 L 420,115" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                        <path d="M 350,180 L 450,230" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                        
                        {/* Electrical conduits (Neon Cyan/Yellow) */}
                        <path d="M 480,255 L 480,180 L 580,130" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" strokeLinecap="round" />
                        <path d="M 400,215 L 400,120" fill="none" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />

                        {/* CapEx Markers on Blueprint */}
                        {markers.map((m) => (
                            <g 
                                key={m.id} 
                                className="cursor-pointer group/marker pointer-events-auto"
                                onMouseEnter={() => setHoveredMarker(m)}
                                onMouseLeave={() => setHoveredMarker(null)}
                                transform={`translate(${m.x}, ${m.y})`}
                            >
                                <circle r="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" className="animate-pulse" />
                                <circle r="6" fill="#06b6d4" />
                                <text y="-20" textAnchor="middle" className="font-mono text-[9px] fill-tech-cyan bg-slate-950 font-bold opacity-0 group-hover/marker:opacity-100 transition-opacity">
                                    {m.title}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>

                {/* 2. FOREGROUND / FINISHED STRUCTURE (Right layer) */}
                <div 
                    className="absolute inset-0 flex items-center justify-center p-4 bg-slate-900 pointer-events-none"
                    style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
                >
                    <svg viewBox="0 0 800 400" className="w-full h-full text-slate-400 overflow-visible">
                        {/* Floor layout */}
                        <polygon points="400,340 150,215 400,90 650,215" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        
                        {/* Outer finished walls */}
                        <polygon points="150,215 400,340 400,240 150,115" fill="rgba(194, 155, 64, 0.15)" stroke="#c29b40" strokeWidth="2" />
                        <polygon points="400,340 650,215 650,115 400,240" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="2" />

                        {/* Roof structure */}
                        <polygon points="400,140 150,115 400,90 650,115" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                        <polygon points="400,240 400,140 650,115 650,215" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                        {/* Windows & Doors visual */}
                        <rect x="230" y="155" width="40" height="25" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" transform="skewY(26.5)" />
                        <rect x="520" y="-80" width="40" height="25" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" transform="skewY(-26.5)" />
                    </svg>

                    <div className="absolute top-4 right-4 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/10 font-mono text-[10px] text-slate-400">
                        STATUS: RESTORED / CAPEX APPLIED
                    </div>
                </div>

                {/* 3. WIPING SLIDER HANDLE */}
                <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-tech-cyan pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                >
                    <div className="absolute inset-y-0 -left-1 w-2 bg-tech-cyan blur-sm opacity-60" />
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border border-tech-cyan flex items-center justify-center shadow-lg">
                        <div className="flex gap-1">
                            <div className="w-1 h-3 bg-tech-cyan rounded" />
                            <div className="w-1 h-3 bg-tech-cyan rounded" />
                        </div>
                    </div>
                </div>

                {/* Hover Details Panel */}
                <AnimatePresence>
                    {hoveredMarker && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-80 bg-slate-950/95 backdrop-blur-md border border-tech-cyan/40 p-4 rounded-xl shadow-2xl z-40 text-left font-mono"
                        >
                            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
                                <span className="text-[10px] uppercase text-tech-cyan font-bold tracking-wider">
                                    Diagnostic Node #0{hoveredMarker.id}
                                </span>
                                <span className="text-xs font-bold text-skylink-gold">
                                    {hoveredMarker.cost}
                                </span>
                            </div>
                            <h4 className="text-xs font-bold text-white mb-1">{hoveredMarker.title}</h4>
                            <p className="text-[10px] text-slate-300 leading-relaxed">{hoveredMarker.desc}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// FEATURE 1: 3D PROPERTY BUDGET VISUALIZER
const BudgetVisualizer = () => {
    const [roofCost, setRoofCost] = useState(8000);
    const [interiorCost, setInteriorCost] = useState(15000);
    const [landscapeCost, setLandscapeCost] = useState(4000);
    const [hvacCost, setHvacCost] = useState(5000);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const totalCost = roofCost + interiorCost + landscapeCost + hvacCost;
    const completionDays = Math.max(5, Math.ceil(totalCost / 2500));
    const projectedRoi = Math.round(totalCost * 1.35);

    return (
        <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-skylink-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-tech-cyan/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Form: Sliders */}
                <div className="lg:col-span-6 space-y-6">
                    <div>
                        <span className="text-skylink-gold font-bold tracking-widest text-xs uppercase block mb-2">Interactive Tool</span>
                        <h3 className="text-3xl font-bold text-white font-serif">Rehab Cost Estimator</h3>
                        <p className="text-slate-400 mt-2 text-sm">
                            Adjust the sliders below to calculate the required CapEx investment, projected ROI, and estimated timeline for your asset.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {/* Sliders list */}
                        <div
                            onMouseEnter={() => setHoveredCategory('roof')}
                            onMouseLeave={() => setHoveredCategory(null)}
                            className={`p-4 rounded-xl border transition-all duration-300 ${
                                hoveredCategory === 'roof'
                                    ? 'border-skylink-gold/30 bg-white/5 shadow-[0_0_15px_rgba(194,155,64,0.1)]'
                                    : 'border-white/5 bg-transparent'
                            }`}
                        >
                            <div className="flex justify-between text-sm text-white mb-2">
                                <span className="font-bold uppercase tracking-wide">Roofing & Systems</span>
                                <span className="text-skylink-gold font-bold">${roofCost.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="25000"
                                step="500"
                                value={roofCost}
                                onChange={(e) => setRoofCost(Number(e.target.value))}
                                className="w-full accent-skylink-gold bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div
                            onMouseEnter={() => setHoveredCategory('interior')}
                            onMouseLeave={() => setHoveredCategory(null)}
                            className={`p-4 rounded-xl border transition-all duration-300 ${
                                hoveredCategory === 'interior'
                                    ? 'border-skylink-blue/30 bg-white/5 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                    : 'border-white/5 bg-transparent'
                            }`}
                        >
                            <div className="flex justify-between text-sm text-white mb-2">
                                <span className="font-bold uppercase tracking-wide">Interior Rehab & Painting</span>
                                <span className="text-skylink-blue font-bold">${interiorCost.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="40000"
                                step="1000"
                                value={interiorCost}
                                onChange={(e) => setInteriorCost(Number(e.target.value))}
                                className="w-full accent-skylink-blue bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div
                            onMouseEnter={() => setHoveredCategory('landscape')}
                            onMouseLeave={() => setHoveredCategory(null)}
                            className={`p-4 rounded-xl border transition-all duration-300 ${
                                hoveredCategory === 'landscape'
                                    ? 'border-green-400/30 bg-white/5 shadow-[0_0_15px_rgba(74,222,128,0.1)]'
                                    : 'border-white/5 bg-transparent'
                            }`}
                        >
                            <div className="flex justify-between text-sm text-white mb-2">
                                <span className="font-bold uppercase tracking-wide">Landscaping & Edging</span>
                                <span className="text-green-400 font-bold">${landscapeCost.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="15000"
                                step="500"
                                value={landscapeCost}
                                onChange={(e) => setLandscapeCost(Number(e.target.value))}
                                className="w-full accent-green-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div
                            onMouseEnter={() => setHoveredCategory('hvac')}
                            onMouseLeave={() => setHoveredCategory(null)}
                            className={`p-4 rounded-xl border transition-all duration-300 ${
                                hoveredCategory === 'hvac'
                                    ? 'border-red-400/30 bg-white/5 shadow-[0_0_15px_rgba(248,113,113,0.1)]'
                                    : 'border-white/5 bg-transparent'
                            }`}
                        >
                            <div className="flex justify-between text-sm text-white mb-2">
                                <span className="font-bold uppercase tracking-wide">HVAC System</span>
                                <span className="text-red-400 font-bold">${hvacCost.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="12000"
                                step="500"
                                value={hvacCost}
                                onChange={(e) => setHvacCost(Number(e.target.value))}
                                className="w-full accent-red-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Interactive SVG & Dynamic Stats */}
                <div className="lg:col-span-6 flex flex-col items-center">
                    {/* Isometric Vector SVG House */}
                    <div className="w-full max-w-sm h-64 flex items-center justify-center relative bg-white/5 rounded-2xl border border-white/5 p-4 overflow-hidden mb-8">
                        <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-2xl">
                            {/* LANDSCAPING Ground deck */}
                            <path
                                d="M 200,285 L 340,215 L 200,145 L 60,215 Z"
                                onMouseEnter={() => setHoveredCategory('landscape')}
                                onMouseLeave={() => setHoveredCategory(null)}
                                className="transition-all duration-500 cursor-pointer"
                                fill={landscapeCost > 0 ? `rgba(74, 222, 128, ${0.05 + (landscapeCost/15000)*0.2})` : "rgba(120,113,108,0.1)"}
                                stroke={hoveredCategory === 'landscape' ? '#4ade80' : 'rgba(255,255,255,0.15)'}
                                strokeWidth={hoveredCategory === 'landscape' ? '2.5' : '1.5'}
                            />

                            {/* HOUSE BASE WALLS (Interior) */}
                            {/* Left Wall */}
                            <path
                                d="M 200,250 L 120,210 L 120,165 L 200,205 Z"
                                onMouseEnter={() => setHoveredCategory('interior')}
                                onMouseLeave={() => setHoveredCategory(null)}
                                className="transition-all duration-500 cursor-pointer"
                                fill={hoveredCategory === 'interior' ? 'rgba(6, 182, 212, 0.25)' : 'rgba(6, 182, 212, 0.05)'}
                                stroke={hoveredCategory === 'interior' ? '#06b6d4' : 'rgba(255,255,255,0.15)'}
                                strokeWidth={hoveredCategory === 'interior' ? '2.5' : '1.5'}
                            />
                            {/* Right Wall */}
                            <path
                                d="M 200,250 L 280,210 L 280,165 L 200,205 Z"
                                onMouseEnter={() => setHoveredCategory('interior')}
                                onMouseLeave={() => setHoveredCategory(null)}
                                className="transition-all duration-500 cursor-pointer"
                                fill={hoveredCategory === 'interior' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.03)'}
                                stroke={hoveredCategory === 'interior' ? '#06b6d4' : 'rgba(255,255,255,0.15)'}
                                strokeWidth={hoveredCategory === 'interior' ? '2.5' : '1.5'}
                            />
                            {/* Base Deck / Roof of lower block */}
                            <path
                                d="M 200,205 L 120,165 L 200,125 L 280,165 Z"
                                className="transition-all duration-500 fill-white/5 stroke-white/15"
                                strokeWidth="1.5"
                            />

                            {/* HOUSE UPPER TIER (Roofing) */}
                            {/* Upper Left Wall */}
                            <path
                                d="M 200,185 L 150,160 L 150,120 L 200,145 Z"
                                onMouseEnter={() => setHoveredCategory('roof')}
                                onMouseLeave={() => setHoveredCategory(null)}
                                className="transition-all duration-500 cursor-pointer"
                                fill={hoveredCategory === 'roof' ? 'rgba(194, 155, 64, 0.25)' : 'rgba(194, 155, 64, 0.05)'}
                                stroke={hoveredCategory === 'roof' ? '#c29b40' : 'rgba(255,255,255,0.15)'}
                                strokeWidth={hoveredCategory === 'roof' ? '2.5' : '1.5'}
                            />
                            {/* Upper Right Wall */}
                            <path
                                d="M 200,185 L 250,160 L 250,120 L 200,145 Z"
                                onMouseEnter={() => setHoveredCategory('roof')}
                                onMouseLeave={() => setHoveredCategory(null)}
                                className="transition-all duration-500 cursor-pointer"
                                fill={hoveredCategory === 'roof' ? 'rgba(194, 155, 64, 0.2)' : 'rgba(194, 155, 64, 0.03)'}
                                stroke={hoveredCategory === 'roof' ? '#c29b40' : 'rgba(255,255,255,0.15)'}
                                strokeWidth={hoveredCategory === 'roof' ? '2.5' : '1.5'}
                            />
                            {/* Upper Roof top */}
                            <path
                                d="M 200,145 L 150,120 L 200,95 L 250,120 Z"
                                onMouseEnter={() => setHoveredCategory('roof')}
                                onMouseLeave={() => setHoveredCategory(null)}
                                className="transition-all duration-500 cursor-pointer"
                                fill={hoveredCategory === 'roof' ? 'rgba(194, 155, 64, 0.35)' : 'rgba(194, 155, 64, 0.1)'}
                                stroke={hoveredCategory === 'roof' ? '#c29b40' : 'rgba(255,255,255,0.15)'}
                                strokeWidth={hoveredCategory === 'roof' ? '2.5' : '1.5'}
                            />

                            {/* HVAC Unit on the right side */}
                            {/* HVAC Left */}
                            <path
                                d="M 295,200 L 285,195 L 285,180 L 295,185 Z"
                                onMouseEnter={() => setHoveredCategory('hvac')}
                                onMouseLeave={() => setHoveredCategory(null)}
                                className="transition-all duration-500 cursor-pointer"
                                fill={hoveredCategory === 'hvac' ? 'rgba(248, 113, 113, 0.4)' : 'rgba(248, 113, 113, 0.1)'}
                                stroke={hoveredCategory === 'hvac' ? '#f87171' : 'rgba(255,255,255,0.15)'}
                                strokeWidth={hoveredCategory === 'hvac' ? '2' : '1'}
                            />
                            {/* HVAC Right */}
                            <path
                                d="M 295,200 L 305,195 L 305,180 L 295,185 Z"
                                onMouseEnter={() => setHoveredCategory('hvac')}
                                onMouseLeave={() => setHoveredCategory(null)}
                                className="transition-all duration-500 cursor-pointer"
                                fill={hoveredCategory === 'hvac' ? 'rgba(248, 113, 113, 0.3)' : 'rgba(248, 113, 113, 0.08)'}
                                stroke={hoveredCategory === 'hvac' ? '#f87171' : 'rgba(255,255,255,0.15)'}
                                strokeWidth={hoveredCategory === 'hvac' ? '2' : '1'}
                            />
                            {/* HVAC Top */}
                            <path
                                d="M 295,185 L 285,180 L 295,175 L 305,180 Z"
                                onMouseEnter={() => setHoveredCategory('hvac')}
                                onMouseLeave={() => setHoveredCategory(null)}
                                className="transition-all duration-500 cursor-pointer"
                                fill={hoveredCategory === 'hvac' ? 'rgba(248, 113, 113, 0.5)' : 'rgba(248, 113, 113, 0.12)'}
                                stroke={hoveredCategory === 'hvac' ? '#f87171' : 'rgba(255,255,255,0.15)'}
                                strokeWidth={hoveredCategory === 'hvac' ? '2' : '1'}
                            />
                        </svg>

                        {/* Interactive Sparkle Overlay */}
                        <AnimatePresence>
                            {hoveredCategory && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white uppercase tracking-wider backdrop-blur"
                                >
                                    <Sparkles size={12} className="text-skylink-gold animate-spin" />
                                    Editing {hoveredCategory}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Stats output row */}
                    <div className="w-full grid grid-cols-3 gap-4 text-center">
                        <div className="glass p-4 rounded-xl border border-white/5">
                            <DollarSign size={20} className="mx-auto text-skylink-gold mb-1" />
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total CapEx</div>
                            <div className="text-lg font-bold text-white">${totalCost.toLocaleString()}</div>
                        </div>
                        <div className="glass p-4 rounded-xl border border-white/5">
                            <Clock size={20} className="mx-auto text-skylink-blue mb-1" />
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Timeline</div>
                            <div className="text-lg font-bold text-white">{completionDays} Days</div>
                        </div>
                        <div className="glass p-4 rounded-xl border border-white/5">
                            <Sparkles size={20} className="mx-auto text-green-400 mb-1" />
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Projected Value</div>
                            <div className="text-lg font-bold text-white">${projectedRoi.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// FEATURE 8: INTERACTIVE PROPERTY ROI CALCULATOR
const ROICalculator = () => {
    const [propertyValue, setPropertyValue] = useState(250000);
    const [renovationCost, setRenovationCost] = useState(50000);
    const [monthlyRent, setMonthlyRent] = useState(3000);
    const [vacancyRate, setVacancyRate] = useState(5);

    const playClick = () => {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);
            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.05);
        } catch(e) {}
    };

    const handleSliderChange = (setter) => (e) => {
        setter(Number(e.target.value));
        if (Math.random() > 0.85) playClick();
    };

    const totalInvestment = propertyValue + renovationCost;
    const grossAnnualIncome = monthlyRent * 12;
    const effectiveGrossIncome = grossAnnualIncome * (1 - (vacancyRate / 100));
    const operatingExpenses = effectiveGrossIncome * 0.35;
    const netOperatingIncome = effectiveGrossIncome - operatingExpenses;
    
    const roiPercentage = totalInvestment > 0 ? ((netOperatingIncome / totalInvestment) * 100).toFixed(2) : "0.00";
    const breakEvenTimeline = netOperatingIncome > 0 ? (totalInvestment / netOperatingIncome).toFixed(1) : "0.0";
    
    const circ = 251.2;
    const fillPercent = Math.min(Number(roiPercentage) / 20, 1);
    const dashOffset = isNaN(fillPercent) ? circ : circ - (fillPercent * circ);

    return (
        <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden mt-16 mb-16">
            <div className="absolute top-0 right-0 w-80 h-80 bg-skylink-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-tech-cyan/5 rounded-full blur-3xl pointer-events-none" />

            <div className="mb-8 text-center">
                <span className="text-skylink-gold font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Investment Analytics</span>
                <h3 className="text-3xl font-bold font-serif text-white">PROPERTY ROI DASHBOARD</h3>
                <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
                    Compute your Net Annual Income, Cash-on-Cash ROI, and Break-Even timeline with real-time variables.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                {/* Inputs */}
                <div className="space-y-6">
                    <div className="p-4 rounded-xl border border-white/5 bg-slate-900/50 hover:border-skylink-blue/30 transition-colors">
                        <div className="flex justify-between text-sm text-white mb-2">
                            <span className="font-bold uppercase tracking-wide">Property Acquisition Value</span>
                            <span className="text-white font-bold">${propertyValue.toLocaleString()}</span>
                        </div>
                        <input type="range" min="50000" max="1000000" step="10000" value={propertyValue} onChange={handleSliderChange(setPropertyValue)} className="w-full accent-skylink-blue bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div className="p-4 rounded-xl border border-white/5 bg-slate-900/50 hover:border-skylink-gold/30 transition-colors">
                        <div className="flex justify-between text-sm text-white mb-2">
                            <span className="font-bold uppercase tracking-wide">Renovation Cost (CapEx)</span>
                            <span className="text-skylink-gold font-bold">${renovationCost.toLocaleString()}</span>
                        </div>
                        <input type="range" min="0" max="500000" step="5000" value={renovationCost} onChange={handleSliderChange(setRenovationCost)} className="w-full accent-skylink-gold bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div className="p-4 rounded-xl border border-white/5 bg-slate-900/50 hover:border-green-400/30 transition-colors">
                        <div className="flex justify-between text-sm text-white mb-2">
                            <span className="font-bold uppercase tracking-wide">Expected Monthly Rent</span>
                            <span className="text-green-400 font-bold">${monthlyRent.toLocaleString()}</span>
                        </div>
                        <input type="range" min="500" max="20000" step="100" value={monthlyRent} onChange={handleSliderChange(setMonthlyRent)} className="w-full accent-green-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div className="p-4 rounded-xl border border-white/5 bg-slate-900/50 hover:border-red-400/30 transition-colors">
                        <div className="flex justify-between text-sm text-white mb-2">
                            <span className="font-bold uppercase tracking-wide">Vacancy Rate</span>
                            <span className="text-red-400 font-bold">{vacancyRate}%</span>
                        </div>
                        <input type="range" min="0" max="20" step="1" value={vacancyRate} onChange={handleSliderChange(setVacancyRate)} className="w-full accent-red-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </div>

                {/* Outputs */}
                <div className="flex flex-col justify-center">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="glass p-6 rounded-xl border border-tech-cyan/20 relative overflow-hidden group hover:border-tech-cyan/50 transition-colors">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-tech-cyan/10 rounded-full blur-2xl group-hover:bg-tech-cyan/20 transition-all" />
                            <div className="text-[10px] font-bold text-tech-cyan uppercase tracking-widest mb-1 relative z-10">Net Operating Income</div>
                            <div className="text-2xl font-bold text-white relative z-10">${Math.round(netOperatingIncome).toLocaleString()}<span className="text-xs text-slate-500 font-normal"> / yr</span></div>
                        </div>
                        <div className="glass p-6 rounded-xl border border-skylink-gold/20 relative overflow-hidden group hover:border-skylink-gold/50 transition-colors">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-skylink-gold/10 rounded-full blur-2xl group-hover:bg-skylink-gold/20 transition-all" />
                            <div className="text-[10px] font-bold text-skylink-gold uppercase tracking-widest mb-1 relative z-10">Break-Even Timeline</div>
                            <div className="text-2xl font-bold text-white relative z-10">{breakEvenTimeline}<span className="text-xs text-slate-500 font-normal"> Years</span></div>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Cash-on-Cash Return</div>
                            <motion.div 
                                key={roiPercentage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl font-bold text-white flex items-baseline"
                            >
                                {roiPercentage}<span className="text-2xl text-skylink-gold ml-1">%</span>
                            </motion.div>
                        </div>
                        
                        {/* Glowing Donut Chart */}
                        <div className="relative w-32 h-32">
                            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(194,155,64,0.3)]" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                                <motion.circle 
                                    cx="50" cy="50" r="40" 
                                    fill="none" 
                                    stroke="#c29b40" 
                                    strokeWidth="12" 
                                    strokeLinecap="round"
                                    strokeDasharray={circ}
                                    animate={{ strokeDashoffset: dashOffset }}
                                    transition={{ type: 'spring', bounce: 0.2, duration: 1 }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center font-bold text-[10px] tracking-widest text-skylink-gold animate-pulse">
                                LIVE
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PropertyServices = () => {
    const introRef = useRef(null);
    const introInView = useInView(introRef, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen pt-20 font-sans relative z-10 bg-transparent">
            <SEO title="Property Preservation" description="Nationwide property preservation, maintenance, and renovation services for asset managers." />
            {/* 1. COMPACT INDUSTRIAL HERO */}
            <section className="relative h-[500px] flex items-center bg-skylink-navy border-b-4 border-skylink-gold overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-cover bg-center grayscale-[50%]"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-skylink-navy via-skylink-navy/80 to-transparent" />

                {/* Lottie Background Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay">
                    <LottieAnimation
                        animationData={placeholderAnimation}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 py-2 px-4 bg-skylink-gold/20 backdrop-blur-sm border border-skylink-gold/50 text-skylink-gold text-xs font-bold tracking-[0.2em] mb-6 uppercase rounded-full"
                    >
                        Vertical 01
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight font-serif leading-none"
                    >
                        PROPERTY<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-skylink-gold to-yellow-400">PRESERVATION</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-300 font-light max-w-2xl leading-relaxed border-l-2 border-skylink-gold pl-6"
                    >
                        Protecting, Maintaining, and Enhancing Real Estate Assets across the Continental United States.
                    </motion.p>
                </div>
            </section>

            {/* 2. THE SKYLINK STANDARD (INTRO) */}
            <section ref={introRef} className="py-24 bg-transparent relative z-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={introInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">THE SKYLINK STANDARD</h2>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={introInView ? { width: 80 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-1 bg-skylink-gold mb-8"
                        />
                        <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                            In a fragmented industry, stability is the ultimate asset. Skylink Innovations delivers a unified, enterprise-grade solution for asset managers, tackling the complex logistics of property preservation with military precision.
                        </p>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            We don't just maintain properties; we mitigate risk, accelerate turnaround times, and maximize ROI through data-driven field operations.
                        </p>
                        <motion.ul
                            variants={containerVariants}
                            initial="hidden"
                            animate={introInView ? "visible" : "hidden"}
                            className="space-y-4"
                        >
                            {[
                                "100% W-9 Compliant Vendor Network",
                                "HUD/FHA/VA Guideline Adherence",
                                "API-Integrated Workflow Management",
                                "$2M General Liability Insurance"
                            ].map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    variants={itemVariants}
                                    className="flex items-center text-slate-200 font-bold text-sm uppercase tracking-wide"
                                >
                                    <CheckCircle size={18} className="text-skylink-gold mr-3" />
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={introInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative h-[500px] border border-slate-200 p-2 group"
                    >
                        <div className="absolute inset-2 border border-slate-100" />
                        <img src={heroBg} alt="Standard" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={introInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="absolute bottom-10 -left-6 bg-skylink-navy p-8 text-white shadow-2xl max-w-xs"
                        >
                            <div className="text-4xl font-bold text-skylink-gold mb-2">15+</div>
                            <div className="text-sm font-bold tracking-widest uppercase">Years of Field Expertise</div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 3. DEEP DIVE: PRESERVATION WING WITH INTERACTIVE BEFORE/AFTER SLIDER */}
            <section className="py-24 bg-transparent border-y border-white/10 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-4">
                            <div className="sticky top-24">
                                <span className="text-8xl font-bold text-white/10 leading-none -ml-4">01</span>
                                <h2 className="text-3xl font-bold text-white -mt-10 relative z-10 mb-6 font-serif">FIELD OPERATIONS & PRESERVATION</h2>
                                <p className="text-slate-300 mb-8 leading-relaxed">
                                    Our "Boots on the Ground" teams allow you to manage thousands of assets as easily as one. Immediate securement and stabilization prevents ongoing deterioration. Use the interactive slider on the right to view a typical asset stabilization transformation.
                                </p>
                                <Link to="/contact" className="inline-flex items-center text-sm font-bold text-skylink-blue uppercase tracking-widest hover:text-white transition-colors">
                                    Request Rate Sheet <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Feature 4: Custom Before/After Slide widget in place of standard preservation image */}
                            <div className="col-span-full">
                                <BeforeAfterSlider beforeImg={preservationBg} afterImg={renoBg} />
                            </div>

                            <div className="glass p-8 border border-white/10">
                                <ShieldCheck size={32} className="text-skylink-blue mb-4" />
                                <h3 className="text-xl font-bold text-white mb-3">Securement</h3>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li>• Lock Changes & Re-keying</li>
                                    <li>• Board-ups (HUD Specs)</li>
                                    <li>• Eviction Assistance</li>
                                    <li>• Window/Door Repair</li>
                                </ul>
                            </div>
                            <div className="glass p-8 border border-white/10">
                                <Trash2 size={32} className="text-skylink-blue mb-4" />
                                <h3 className="text-xl font-bold text-white mb-3">Conveyance Prep</h3>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li>• Interior Trash-out</li>
                                    <li>• Hazard Removal</li>
                                    <li>• Maid Services</li>
                                    <li>• Personal Property Storage</li>
                                </ul>
                            </div>
                            <div className="glass p-8 border border-white/10">
                                <HomeIcon size={32} className="text-skylink-blue mb-4" />
                                <h3 className="text-xl font-bold text-white mb-3">Landscape Maint.</h3>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li>• Grass Cuts & Edging</li>
                                    <li>• Tree Trimming/Removal</li>
                                    <li>• Snow Removal</li>
                                    <li>• Pool Securing</li>
                                </ul>
                            </div>
                            <div className="glass p-8 border border-white/10">
                                <ClipboardCheck size={32} className="text-skylink-blue mb-4" />
                                <h3 className="text-xl font-bold text-white mb-3">Winterization</h3>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li>• System Draining</li>
                                    <li>• Pressure Testing</li>
                                    <li>• Anti-freeze Application</li>
                                    <li>• Leak Detection</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. DEEP DIVE: CONSTRUCTION WING */}
            <section className="py-24 bg-transparent border-b border-white/10 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 order-2 lg:order-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <img src={renoBg} alt="Construction" className="w-full h-64 object-cover col-span-full border-b-4 border-skylink-gold" />

                            <div className="glass p-8 border-l border-white/10 hover:border-l-4 hover:border-skylink-gold transition-all">
                                <Hammer size={32} className="text-skylink-gold mb-4" />
                                <h3 className="text-xl font-bold text-white mb-3">Full Rehabs</h3>
                                <p className="text-sm text-slate-300 leading-relaxed">Complete turnkey renovations for REO assets. We manage permits, materials, and labor to maximize resale value.</p>
                            </div>
                            <div className="glass p-8 border-l border-white/10 hover:border-l-4 hover:border-skylink-gold transition-all">
                                <HardHat size={32} className="text-skylink-gold mb-4" />
                                <h3 className="text-xl font-bold text-white mb-3">CapEx Projects</h3>
                                <p className="text-sm text-slate-300 leading-relaxed">Large-scale capital expenditure projects including roofing, foundation repair, and HVAC system replacements.</p>
                            </div>
                            <div className="glass p-8 border-l border-white/10 hover:border-l-4 hover:border-skylink-gold transition-all">
                                <PenTool size={32} className="text-skylink-gold mb-4" />
                                <h3 className="text-xl font-bold text-white mb-3">Emergency Repairs</h3>
                                <p className="text-sm text-slate-300 leading-relaxed">24/7 dispatched response for vandalism, fire damage, storm damage, and plumbing failures.</p>
                            </div>
                            <div className="glass p-8 border-l border-white/10 hover:border-l-4 hover:border-skylink-gold transition-all">
                                <FileCheck size={32} className="text-skylink-gold mb-4" />
                                <h3 className="text-xl font-bold text-white mb-3">Code Compliance</h3>
                                <p className="text-sm text-slate-300 leading-relaxed">Resolving city code violations and mechanic's liens to ensure clear title transfer.</p>
                            </div>
                        </div>

                        <div className="lg:col-span-4 order-1 lg:order-2">
                            <div className="sticky top-24 text-right">
                                <span className="text-8xl font-bold text-white/10 leading-none -mr-4">02</span>
                                <h2 className="text-3xl font-bold text-white -mt-10 relative z-10 mb-6 font-serif">RENOVATION & CONSTRUCTION</h2>
                                <p className="text-slate-300 mb-8 leading-relaxed">
                                    From simple "Trash-out & Paint" refreshes to complex structural repairs. Our licensed general contractors bring distressed assets back to market condition.
                                </p>
                                <Link to="/contact" className="inline-flex items-center text-sm font-bold text-skylink-gold uppercase tracking-widest hover:text-white transition-colors">
                                    View Project Gallery <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURE 1: 3D PROPERTY BUDGET VISUALIZER SECTION */}
            <section className="py-24 bg-transparent relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <FloorplanSectionWipe />
                    <BudgetVisualizer />
                    <ROICalculator />
                </div>
            </section>

            {/* 5. TECHNOLOGY SUITE (DARK MODE WITH HOLOGRAPHIC CARDS) */}
            <section className="py-24 bg-transparent text-white relative overflow-hidden z-10 border-y border-white/10">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${techBg})` }}
                ></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-skylink-gold font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Digital Infrastructure</span>
                        <h2 className="text-4xl font-bold mb-6 font-serif text-white">ENTERPRISE-GRADE COMPLIANCE</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* FEATURE 5: Holographic Card components replace standard bg-white/5 */}
                        <HolographicCard className="cursor-pointer">
                            <Server size={40} className="text-skylink-gold mb-6" />
                            <h3 className="text-xl font-bold mb-4 text-white">API Integration</h3>
                            <p className="text-slate-200 text-sm leading-relaxed">Seamlessly connects with Aspen Grove, Equator, Res.net, and other major asset management platforms.</p>
                        </HolographicCard>
                        
                        <HolographicCard className="cursor-pointer">
                            <Lock size={40} className="text-skylink-gold mb-6" />
                            <h3 className="text-xl font-bold mb-4 text-white">Data Security</h3>
                            <p className="text-slate-200 text-sm leading-relaxed">SOC 2 Type II compliant data handling. All photos and reports are geo-tagged and time-stamped for fraud prevention.</p>
                        </HolographicCard>
                        
                        <HolographicCard className="cursor-pointer">
                            <Globe size={40} className="text-skylink-gold mb-6" />
                            <h3 className="text-xl font-bold mb-4 text-white">Real-Time Reporting</h3>
                            <p className="text-slate-200 text-sm leading-relaxed">Live field updates allow you to approve bids and view completion photos instantly from your dashboard.</p>
                        </HolographicCard>
                    </div>
                </div>
            </section>

            {/* FEATURE 8: GLOBAL ASSET MAP NODE OVERLAY */}
            <section className="py-24 bg-transparent relative z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <GlobalAssetMap />
                </div>
            </section>

            {/* FEATURE 10: INTERACTIVE FAQ */}
            <section className="py-24 bg-transparent relative z-10 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <InteractiveFAQ faqs={propertyFaqs} title="Property Solutions FAQ" />
                </div>
            </section>

            {/* 6. VENDOR NETWORK INVITE */}
            <section className="py-32 bg-transparent text-center border-t border-white/10 relative z-10">
                <div className="max-w-3xl mx-auto px-6">
                    <Users size={48} className="mx-auto text-white mb-6" />
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">JOIN OUR NETWORK</h2>
                    <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light">
                        Are you a licensed contractor with a commitment to excellence? We are actively expanding our vendor panel in high-volume REO markets.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact" className="px-8 py-4 bg-skylink-navy text-white font-bold uppercase tracking-widest hover:bg-skylink-blue transition-colors">
                            Contractor Application
                        </Link>
                        <Link to="/contact" className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                            Download Vendor Packet
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PropertyServices;
