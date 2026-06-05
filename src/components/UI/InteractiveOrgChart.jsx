import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveOrgChart = () => {
    const [activeNode, setActiveNode] = useState(null);

    const nodes = [
        { id: 'ceo', label: 'CEO & Founder', head: 'Riyadh A. Bhuiyan', x: 400, y: 50, color: '#c29b40', desc: 'Oversees global strategy and corporate governance.' },
        { id: 'md', label: 'Managing Director', head: 'Golam M. Sumon', x: 400, y: 150, color: '#38bdf8', desc: 'Leads international operations and technology integration.' },
        { id: 'vp_ops', label: 'VP, Operations', head: 'John Doe', x: 200, y: 250, color: '#ffffff', desc: 'Manages US field vendor network and QA teams.' },
        { id: 'vp_bpo', label: 'VP, BPO & ITES', head: 'Jane Smith', x: 600, y: 250, color: '#ffffff', desc: 'Directs offshore call centers and data processing hubs.' },
        { id: 'dir_field', label: 'Director, Field Pres.', head: 'Alex T.', x: 100, y: 350, color: '#ffffff', desc: 'Handles property securing and hazard removal.' },
        { id: 'dir_capex', label: 'Director, CapEx', head: 'Sarah L.', x: 300, y: 350, color: '#ffffff', desc: 'Manages large-scale renovation projects.' },
        { id: 'dir_cs', label: 'Director, CX', head: 'Mike R.', x: 500, y: 350, color: '#ffffff', desc: 'Omnichannel customer support.' },
        { id: 'dir_data', label: 'Director, Data', head: 'Emily W.', x: 700, y: 350, color: '#ffffff', desc: 'Data entry, OCR, and analytics.' }
    ];

    const lines = [
        { from: 'ceo', to: 'md' },
        { from: 'md', to: 'vp_ops' },
        { from: 'md', to: 'vp_bpo' },
        { from: 'vp_ops', to: 'dir_field' },
        { from: 'vp_ops', to: 'dir_capex' },
        { from: 'vp_bpo', to: 'dir_cs' },
        { from: 'vp_bpo', to: 'dir_data' }
    ];

    return (
        <div className="w-full glass rounded-3xl border border-white/10 p-8 shadow-2xl relative overflow-hidden my-16">
            <div className="absolute top-0 right-0 w-80 h-80 bg-skylink-blue/5 rounded-full blur-3xl pointer-events-none" />
            <div className="text-center mb-8">
                <span className="text-skylink-gold font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Corporate Structure</span>
                <h3 className="text-3xl font-bold font-serif text-white">ORGANIZATIONAL CHART</h3>
                <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
                    Explore Skylink's global leadership and operational divisions. Click on any node for details.
                </p>
            </div>

            <div className="relative w-full overflow-x-auto pb-12 pt-4">
                <div className="min-w-[800px] flex justify-center">
                    <svg viewBox="0 0 800 450" className="w-full h-auto overflow-visible relative z-10">
                        {/* Lines */}
                        {lines.map((l, i) => {
                            const start = nodes.find(n => n.id === l.from);
                            const end = nodes.find(n => n.id === l.to);
                            return (
                                <motion.path
                                    key={i}
                                    d={`M ${start.x} ${start.y + 20} C ${start.x} ${start.y + 60}, ${end.x} ${end.y - 60}, ${end.x} ${end.y - 20}`}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, delay: i * 0.1 }}
                                />
                            );
                        })}

                        {/* Nodes */}
                        {nodes.map(node => {
                            const isActive = activeNode === node.id;
                            return (
                                <g 
                                    key={node.id} 
                                    className="cursor-pointer group"
                                    onClick={() => setActiveNode(isActive ? null : node.id)}
                                    onMouseEnter={() => {
                                        try {
                                            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                                            const osc = audioCtx.createOscillator();
                                            const gn = audioCtx.createGain();
                                            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
                                            gn.gain.setValueAtTime(0.01, audioCtx.currentTime);
                                            gn.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
                                            osc.connect(gn);
                                            gn.connect(audioCtx.destination);
                                            osc.start();
                                            osc.stop(audioCtx.currentTime + 0.1);
                                        } catch(e) {}
                                    }}
                                >
                                    <circle 
                                        cx={node.x} 
                                        cy={node.y} 
                                        r="20" 
                                        fill="#0f172a" 
                                        stroke={isActive ? node.color : "rgba(255,255,255,0.2)"}
                                        strokeWidth={isActive ? "3" : "2"}
                                        className="transition-colors group-hover:stroke-skylink-blue"
                                    />
                                    <text 
                                        x={node.x} 
                                        y={node.y + 35} 
                                        textAnchor="middle" 
                                        fill={isActive ? "#fff" : "#94a3b8"} 
                                        className="text-[10px] font-bold font-mono tracking-wider transition-colors"
                                    >
                                        {node.label.toUpperCase()}
                                    </text>
                                    {isActive && (
                                        <circle 
                                            cx={node.x} 
                                            cy={node.y} 
                                            r="26" 
                                            fill="none"
                                            stroke={node.color} 
                                            strokeWidth="1"
                                            strokeDasharray="4 4"
                                            className="animate-spin transform-origin-center"
                                            style={{ transformOrigin: `${node.x}px ${node.y}px`, animationDuration: '4s' }}
                                        />
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    <AnimatePresence>
                        {activeNode && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-4 right-4 bg-slate-900/95 backdrop-blur-xl border border-tech-cyan/30 p-6 rounded-xl shadow-2xl z-20 w-80 font-mono"
                            >
                                <div className="border-b border-white/10 pb-2 mb-4">
                                    <div className="text-tech-cyan text-[9px] uppercase font-bold tracking-widest mb-1">
                                        Division Profile
                                    </div>
                                    <div className="text-lg font-bold text-white uppercase">
                                        {nodes.find(n => n.id === activeNode).label}
                                    </div>
                                    <div className="text-sm text-skylink-gold mt-1">
                                        Head: {nodes.find(n => n.id === activeNode).head}
                                    </div>
                                </div>
                                <div className="text-[10px] text-slate-400 leading-relaxed font-sans">
                                    {nodes.find(n => n.id === activeNode).desc}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default InteractiveOrgChart;
