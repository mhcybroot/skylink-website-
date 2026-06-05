import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Server, Cpu, Shield, Globe, Code, Cloud, Zap, Radio, Lock } from 'lucide-react';

const hexData = [
    { id: 1, icon: Database, label: "PostgreSQL", type: "Data Layer", desc: "High-performance relational DB with read-replicas for global access." },
    { id: 2, icon: Cloud, label: "AWS Infra", type: "Hosting", desc: "Elastic compute clusters spread across 4 geographic regions." },
    { id: 3, icon: Server, label: "Node.js", type: "Backend", desc: "Event-driven asynchronous I/O for massive concurrency." },
    { id: 4, icon: Shield, label: "Cloudflare", type: "Security", desc: "Enterprise DDoS mitigation and Web Application Firewall." },
    { id: 5, icon: Code, label: "React Fiber", type: "Frontend", desc: "GPU-accelerated UI rendering using WebGL and Framer Motion." },
    { id: 6, icon: Cpu, label: "TensorFlow", type: "AI/ML", desc: "Predictive resource allocation and image recognition models." },
    { id: 7, icon: Lock, label: "Auth0", type: "Identity", desc: "Biometric MFA and enterprise SSO federation." },
    { id: 8, icon: Globe, label: "Edge CDN", type: "Delivery", desc: "Sub-50ms asset delivery to 95% of global users." },
    { id: 9, icon: Zap, label: "Redis", type: "Cache", desc: "In-memory datastore for lightning-fast session state." },
    { id: 10, icon: Radio, label: "WebSockets", type: "Real-time", desc: "Full-duplex channels for live dashboard telemetry." }
];

export default function TechHexGrid() {
    const [hoveredHex, setHoveredHex] = useState(null);

    // Grid configuration for honeycomb pattern
    const rows = [
        [0, 1, 2],    // 3 hexes
        [3, 4, 5, 6], // 4 hexes
        [7, 8, 9]     // 3 hexes
    ];

    return (
        <div className="w-full relative py-20 flex flex-col items-center justify-center">
            
            <div className="text-center mb-16 relative z-20">
                <span className="text-tech-cyan font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Under The Hood</span>
                <h3 className="text-4xl font-bold text-white font-serif mb-4">THE SKYLINK STACK</h3>
                <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
                    Hover over the core nodes of our enterprise infrastructure. We leverage modern, scalable architecture to guarantee 99.9% uptime.
                </p>
            </div>

            <div className="relative z-10 scale-75 md:scale-100 flex flex-col items-center">
                {rows.map((row, rIdx) => (
                    <div 
                        key={rIdx} 
                        className={`flex justify-center -mt-8 ${rIdx % 2 !== 0 ? 'md:ml-0' : ''}`}
                    >
                        {row.map((hexIdx, cIdx) => {
                            const hex = hexData[hexIdx];
                            const isHovered = hoveredHex === hex.id;
                            const Icon = hex.icon;

                            return (
                                <div 
                                    key={hex.id}
                                    onMouseEnter={() => setHoveredHex(hex.id)}
                                    onMouseLeave={() => setHoveredHex(null)}
                                    className="relative mx-1 cursor-crosshair group"
                                    style={{ width: 140, height: 160 }}
                                >
                                    {/* SVG Hexagon Shape */}
                                    <svg viewBox="0 0 100 115" className="absolute inset-0 w-full h-full drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
                                        <polygon 
                                            points="50 3, 95 28, 95 85, 50 112, 5 85, 5 28" 
                                            fill={isHovered ? "rgba(6, 182, 212, 0.15)" : "rgba(15, 23, 42, 0.9)"}
                                            stroke={isHovered ? "#06b6d4" : "rgba(255, 255, 255, 0.1)"}
                                            strokeWidth="2"
                                            className="transition-all duration-500"
                                        />
                                        <polygon 
                                            points="50 8, 90 31, 90 82, 50 106, 10 82, 10 31" 
                                            fill="none"
                                            stroke={isHovered ? "rgba(6, 182, 212, 0.4)" : "rgba(255, 255, 255, 0.05)"}
                                            strokeWidth="1"
                                            strokeDasharray="4 2"
                                            className="transition-all duration-500"
                                        />
                                    </svg>

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4">
                                        <Icon 
                                            size={28} 
                                            className={`mb-2 transition-all duration-300 ${isHovered ? 'text-tech-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-slate-500'}`} 
                                        />
                                        <div className={`font-bold font-serif text-sm transition-colors duration-300 ${isHovered ? 'text-white' : 'text-slate-400'}`}>
                                            {hex.label}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Hover Details Panel (Fixed below grid) */}
            <div className="h-32 mt-12 w-full max-w-2xl relative">
                <AnimatePresence mode="wait">
                    {hoveredHex ? (
                        <motion.div
                            key={hoveredHex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute inset-0 glass-dark border border-tech-cyan/30 rounded-2xl p-6 flex items-center gap-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                        >
                            {(() => {
                                const activeHex = hexData.find(h => h.id === hoveredHex);
                                const ActiveIcon = activeHex.icon;
                                return (
                                    <>
                                        <div className="w-16 h-16 rounded-xl bg-tech-cyan/10 border border-tech-cyan/20 flex items-center justify-center shrink-0 shadow-inner">
                                            <ActiveIcon size={32} className="text-tech-cyan" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="text-xl font-bold text-white font-serif">{activeHex.label}</h4>
                                                <span className="bg-white/10 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-white/10">
                                                    {activeHex.type}
                                                </span>
                                            </div>
                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                {activeHex.desc}
                                            </p>
                                        </div>
                                    </>
                                );
                            })()}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl text-slate-600 font-mono text-xs uppercase tracking-widest"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-slate-600 animate-pulse" />
                                System Diagnostics Standby
                            </div>
                            Select a node above for details
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-tech-cyan/5 rounded-[100%] blur-[120px] pointer-events-none" />
        </div>
    );
}
