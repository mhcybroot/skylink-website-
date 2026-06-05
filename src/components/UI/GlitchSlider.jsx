import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import beforeImg from '../../assets/Photos/DSC05809.jpg';
import afterImg from '../../assets/Photos/DSC05841.jpg';

export default function GlitchSlider() {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        setSliderPos((x / rect.width) * 100);
    };

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={(e) => {
                if (!containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                setSliderPos((x / rect.width) * 100);
            }}
            className="relative w-full h-[500px] overflow-hidden rounded-2xl cursor-ew-resize group select-none shadow-2xl border border-white/10"
        >
            {/* Background (Before) */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${beforeImg})` }}
            >
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                <span className="absolute top-4 left-4 bg-black/80 text-white font-mono text-[10px] px-2 py-1 rounded border border-white/20 backdrop-blur">
                    BEFORE // CURRENT STATE
                </span>
            </div>

            {/* Foreground (After) clipped by sliderPos */}
            <div 
                className="absolute inset-0 bg-cover bg-center border-r-2 border-tech-cyan shadow-[2px_0_15px_rgba(6,182,212,0.6)]"
                style={{ 
                    backgroundImage: `url(${afterImg})`,
                    clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                }}
            >
                <div className="absolute inset-0 bg-skylink-gold/10 mix-blend-overlay" />
                <span className="absolute top-4 right-4 bg-tech-cyan/20 text-tech-cyan font-mono text-[10px] px-2 py-1 rounded border border-tech-cyan backdrop-blur">
                    AFTER // OPTIMIZED
                </span>
                
                {/* Simulated Glitch artifact on the edge */}
                <motion.div 
                    className="absolute top-0 bottom-0 right-0 w-4 bg-tech-cyan mix-blend-screen opacity-30"
                    animate={{ x: [0, -2, 2, -1, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatType: 'mirror' }}
                />
            </div>

            {/* Slider Handle */}
            <div 
                className="absolute top-0 bottom-0 w-0.5 bg-tech-cyan pointer-events-none"
                style={{ left: `${sliderPos}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black/80 border border-tech-cyan rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.8)] backdrop-blur">
                    <div className="flex gap-1">
                        <div className="w-0.5 h-3 bg-tech-cyan" />
                        <div className="w-0.5 h-3 bg-tech-cyan" />
                    </div>
                </div>
            </div>
        </div>
    );
}
