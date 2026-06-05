import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function DecryptorMinigame({ onUnlock }) {
    const targetCode = [1, 0, 1, 1, 0];
    const [currentCode, setCurrentCode] = useState([0, 0, 0, 0, 0]);
    const [unlocked, setUnlocked] = useState(false);
    
    useEffect(() => {
        if (currentCode.join('') === targetCode.join('')) {
            setUnlocked(true);
            setTimeout(() => onUnlock(), 1000);
        }
    }, [currentCode, onUnlock]);

    const toggleNode = (index) => {
        if (unlocked) return;
        setCurrentCode(prev => {
            const next = [...prev];
            next[index] = next[index] === 0 ? 1 : 0;
            return next;
        });
    };

    return (
        <div className="w-full bg-slate-950 border border-red-500/30 p-4 rounded-xl mt-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-500/20" />
            
            <h4 className="text-red-400 font-mono text-xs mb-4 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Security Override Required
            </h4>
            
            <p className="text-slate-400 text-[10px] font-mono mb-4">
                Match the target decryption sequence to transmit secure payload.
            </p>

            <div className="flex gap-4 mb-6">
                {currentCode.map((val, idx) => (
                    <div 
                        key={idx}
                        onClick={() => toggleNode(idx)}
                        className={`w-12 h-12 flex items-center justify-center font-mono text-lg font-bold cursor-pointer transition-all border ${
                            val === targetCode[idx] ? 'bg-tech-cyan/20 border-tech-cyan text-tech-cyan shadow-[0_0_10px_#06b6d4]' : 'bg-slate-900 border-white/10 text-slate-500 hover:bg-slate-800'
                        }`}
                    >
                        {val}
                    </div>
                ))}
            </div>

            {unlocked && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-tech-cyan font-mono text-xs uppercase tracking-widest bg-tech-cyan/10 p-2 rounded text-center border border-tech-cyan/30"
                >
                    Access Granted. Transmitting...
                </motion.div>
            )}
        </div>
    );
}
