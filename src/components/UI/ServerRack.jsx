import { useState } from 'react';
import { motion } from 'framer-motion';

const Node = ({ id, active, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className={`relative h-12 border border-slate-700 rounded-lg flex items-center px-4 cursor-pointer transition-all duration-300 ${
                active ? 'bg-tech-cyan/10 border-tech-cyan shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-slate-900/50 hover:bg-slate-800'
            }`}
        >
            <div className="flex gap-2 mr-4">
                <div className={`w-2 h-2 rounded-full ${active ? 'bg-green-400 shadow-[0_0_8px_#4ade80]' : 'bg-slate-700'}`} />
                <div className={`w-2 h-2 rounded-full ${active ? 'bg-tech-cyan shadow-[0_0_8px_#06b6d4] animate-pulse' : 'bg-slate-700'}`} />
            </div>
            
            <div className="flex-1 font-mono text-xs text-slate-400">
                NODE_0{id} // {active ? 'ONLINE_SYNC' : 'STANDBY_MODE'}
            </div>

            <div className="w-16 h-4 bg-black/50 rounded overflow-hidden">
                <motion.div 
                    className="h-full bg-tech-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: active ? ['10%', '90%', '40%', '100%'] : '0%' }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                />
            </div>
        </div>
    );
};

export default function ServerRack() {
    const [nodes, setNodes] = useState([true, false, false, true, false]);

    const toggleNode = (index) => {
        setNodes(prev => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    };

    const activeCount = nodes.filter(Boolean).length;
    const capacity = Math.round((activeCount / nodes.length) * 100);

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tech-cyan/5 blur-3xl -z-10 pointer-events-none" />
            
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <div>
                    <h3 className="text-white font-serif text-2xl font-bold">Server Rack Configuration</h3>
                    <p className="text-slate-400 text-xs font-mono mt-1">Configure active BPO nodes dynamically</p>
                </div>
                <div className="text-right font-mono">
                    <div className="text-tech-cyan text-sm font-bold">{capacity}% ALLOCATED</div>
                    <div className="text-[10px] text-slate-500">{activeCount} / {nodes.length} ACTIVE CORES</div>
                </div>
            </div>

            <div className="space-y-3">
                {nodes.map((active, idx) => (
                    <Node key={idx} id={idx + 1} active={active} onClick={() => toggleNode(idx)} />
                ))}
            </div>

            <div className="mt-6 flex gap-4">
                <button 
                    onClick={() => setNodes([true, true, true, true, true])}
                    className="flex-1 py-2 bg-tech-cyan/20 border border-tech-cyan text-tech-cyan text-xs font-bold tracking-widest uppercase rounded hover:bg-tech-cyan hover:text-slate-900 transition-colors"
                >
                    Spin Up All
                </button>
                <button 
                    onClick={() => setNodes([false, false, false, false, false])}
                    className="flex-1 py-2 bg-red-500/10 border border-red-500/50 text-red-400 text-xs font-bold tracking-widest uppercase rounded hover:bg-red-500 hover:text-white transition-colors"
                >
                    Halt Operations
                </button>
            </div>
        </div>
    );
}
