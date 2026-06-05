import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timeline = [
    { year: '2011', title: 'Foundation', desc: 'Skylink Innovations is founded with a focus on BPO.' },
    { year: '2014', title: 'Global Expansion', desc: 'Opened delivery centers in Dhaka and Manila.' },
    { year: '2017', title: 'Property Preservation', desc: 'Launched US-based field operations.' },
    { year: '2020', title: 'Digital Transformation', desc: 'Integrated AI and automation into workflows.' },
    { year: 'TODAY', title: 'Market Leadership', desc: 'Servicing 5,000+ assets monthly.' },
];

export default function RadarTimeline() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);

    // Auto-rotate timeline if not interacted with recently
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % timeline.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const radius = 150;

    return (
        <div className="relative w-full max-w-4xl mx-auto h-[500px] flex items-center justify-center font-mono">
            {/* Radar Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[300px] h-[300px] rounded-full border border-tech-cyan/20 absolute" />
                <div className="w-[200px] h-[200px] rounded-full border border-tech-cyan/20 absolute" />
                <div className="w-[100px] h-[100px] rounded-full border border-tech-cyan/20 absolute" />
                <div className="w-[300px] h-[1px] bg-tech-cyan/20 absolute rotate-45" />
                <div className="w-[300px] h-[1px] bg-tech-cyan/20 absolute -rotate-45" />
                
                {/* Sweeping Radar beam */}
                <motion.div 
                    className="absolute w-[150px] h-[150px] origin-bottom-right"
                    style={{ background: 'conic-gradient(from 180deg, rgba(6,182,212,0) 0deg, rgba(6,182,212,0.4) 90deg, rgba(6,182,212,0) 90deg)', transformOrigin: '100% 100%', top: 'calc(50% - 150px)', left: 'calc(50% - 150px)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            {/* Nodes */}
            {timeline.map((item, idx) => {
                const angle = (idx / timeline.length) * 2 * Math.PI - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isActive = activeIndex === idx;

                return (
                    <div 
                        key={idx}
                        className="absolute cursor-pointer"
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                        onClick={() => setActiveIndex(idx)}
                    >
                        <motion.div 
                            className={`w-4 h-4 rounded-full border-2 transform -translate-x-1/2 -translate-y-1/2 ${
                                isActive ? 'bg-skylink-gold border-skylink-gold shadow-[0_0_15px_#c29b40]' : 'bg-slate-900 border-tech-cyan/50 hover:bg-tech-cyan/20'
                            }`}
                            animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                            transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                        />
                        <div className={`absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold tracking-widest ${
                            isActive ? 'text-skylink-gold' : 'text-slate-500'
                        }`}>
                            {item.year}
                        </div>
                    </div>
                );
            })}

            {/* Center Info Panel */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="w-[220px] text-center bg-slate-950/80 backdrop-blur border border-white/10 rounded-xl p-4 shadow-2xl pointer-events-auto"
                    >
                        <div className="text-skylink-gold text-[10px] tracking-[0.2em] mb-1 uppercase">Event Log {timeline[activeIndex].year}</div>
                        <h3 className="text-white font-bold text-sm mb-2">{timeline[activeIndex].title}</h3>
                        <p className="text-slate-400 text-[10px] leading-relaxed">
                            {timeline[activeIndex].desc}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
