import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// We use an image sequence or a scalable image to simulate a video slice
import bgImage from '../../assets/Photos/DSC05810.jpg';

export default function VideoParallax() {
    const containerRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Translate and scale to give a deep parallax slice effect
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
    const filter = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(10px)", "blur(0px)", "blur(10px)"]);

    return (
        <div ref={containerRef} className="relative h-[60vh] w-full overflow-hidden bg-slate-950 flex items-center justify-center my-20">
            {/* The "Video" Layer */}
            <motion.div 
                className="absolute inset-0 z-0 origin-center"
                style={{ y, scale, opacity, filter }}
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${bgImage})` }}
                />
                <div className="absolute inset-0 bg-skylink-navy/60 mix-blend-overlay" />
            </motion.div>

            {/* Scanning Lines Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-20"
                 style={{
                     backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)'
                 }}
            />

            {/* Glowing Borders */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech-cyan to-transparent z-20 opacity-50" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-skylink-gold to-transparent z-20 opacity-50" />

            {/* Content overlay */}
            <div className="relative z-30 text-center px-6 max-w-3xl">
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
                >
                    <span className="text-tech-cyan font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
                        [ SYSTEM_LOG : 0x00A4F ]
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                        Data-Driven Reality
                    </h2>
                    <p className="text-slate-300 text-lg font-light">
                        Observe the evolution of our architectural and digital infrastructures in real-time. This dynamic slice captures our ongoing commitment to structural perfection and digital efficiency.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
