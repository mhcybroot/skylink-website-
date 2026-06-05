import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Code2, Database, ShieldAlert, Cpu } from 'lucide-react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function EasterEgg() {
    const [inputSequence, setInputSequence] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isOpen) return;

            setInputSequence(prev => {
                const newSeq = [...prev, e.key];
                if (newSeq.length > KONAMI_CODE.length) {
                    newSeq.shift();
                }

                // Check match
                if (newSeq.length === KONAMI_CODE.length && newSeq.every((key, i) => key === KONAMI_CODE[i])) {
                    setIsOpen(true);
                    return [];
                }
                
                return newSeq;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && logs.length === 0) {
            const bootSequence = [
                "INITIALIZING SKYLINK OVERRIDE PROTOCOL...",
                "BYPASSING MAINFRAME SECURITY...",
                "DECRYPTING LEVEL 9 ASSETS...",
                "ACCESS GRANTED.",
                "WELCOME, ADMIN."
            ];

            let i = 0;
            const interval = setInterval(() => {
                if (i < bootSequence.length) {
                    setLogs(prev => [...prev, bootSequence[i]]);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 800);

            return () => clearInterval(interval);
        }
    }, [isOpen, logs.length]);

    const handleClose = () => {
        setIsOpen(false);
        setLogs([]);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 font-mono"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="w-full max-w-4xl h-[80vh] bg-slate-950 border border-tech-cyan/50 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col relative"
                    >
                        {/* CRT Scanline effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-20" />
                        
                        {/* Header */}
                        <div className="h-10 bg-tech-cyan/20 border-b border-tech-cyan/30 flex items-center justify-between px-4 shrink-0">
                            <div className="flex items-center gap-2 text-tech-cyan text-xs">
                                <Terminal size={14} />
                                <span>SKYLINK_OS_v9.4.2 // DEV_MODE</span>
                            </div>
                            <button onClick={handleClose} className="text-tech-cyan hover:text-white transition-colors">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Content Split */}
                        <div className="flex-1 flex overflow-hidden">
                            {/* Left: Terminal Output */}
                            <div className="flex-1 p-6 overflow-y-auto text-tech-cyan text-sm flex flex-col gap-2 relative">
                                {logs.map((log, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <span className="opacity-50">&gt;</span>
                                        <span dangerouslySetInnerHTML={{ __html: log }} />
                                    </div>
                                ))}
                                {logs.length === 5 && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-4 border border-tech-cyan/30 p-4 rounded bg-tech-cyan/5"
                                    >
                                        <h3 className="text-xl text-white mb-2 font-bold flex items-center gap-2">
                                            <ShieldAlert size={20} className="text-skylink-gold" />
                                            HIDDEN DEVS DIRECTORY
                                        </h3>
                                        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                                            You've found the backdoor. Skylink is always looking for talent that thinks outside the box. If you can read this, you should check out our engineering roles.
                                        </p>
                                        <div className="flex gap-4">
                                            <a href="/careers" onClick={handleClose} className="px-4 py-2 bg-tech-cyan text-slate-950 font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors">
                                                Apply Now
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                                <div className="mt-auto flex gap-2 pt-4">
                                    <span className="opacity-50">&gt;</span>
                                    <span className="w-2 h-4 bg-tech-cyan animate-pulse" />
                                </div>
                            </div>

                            {/* Right: Server Stats (Fake) */}
                            <div className="w-64 border-l border-tech-cyan/20 bg-slate-900/50 p-6 flex flex-col gap-6 overflow-y-auto hidden md:flex shrink-0">
                                <div>
                                    <div className="text-[10px] text-tech-cyan/50 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Cpu size={12} /> CORE LOAD
                                    </div>
                                    <div className="w-full h-2 bg-slate-950 rounded overflow-hidden mb-1">
                                        <div className="h-full bg-tech-cyan w-[45%]" />
                                    </div>
                                    <div className="w-full h-2 bg-slate-950 rounded overflow-hidden">
                                        <div className="h-full bg-tech-cyan w-[62%]" />
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="text-[10px] text-tech-cyan/50 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Database size={12} /> MEMORY ALLOC
                                    </div>
                                    <div className="text-2xl text-tech-cyan font-bold tracking-tight">1.2 TB</div>
                                </div>

                                <div>
                                    <div className="text-[10px] text-tech-cyan/50 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Code2 size={12} /> ACTIVE THREADS
                                    </div>
                                    <div className="text-2xl text-tech-cyan font-bold tracking-tight">8,092</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
