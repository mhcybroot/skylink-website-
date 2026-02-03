import { useState } from 'react';
import { motion } from 'framer-motion';

const ImageMarquee = () => {
    const [isPaused, setIsPaused] = useState(false);

    // Dynamically import all JPG photos from the assets folder
    const imagesGlob = import.meta.glob('../../assets/Photos/*.jpg', { eager: true });
    // Extract URLs
    const images = Object.values(imagesGlob).map(module => module.default);
    // Take the first 15 images for the marquee (ensure enough for loop)
    const displayImages = images.slice(0, 15);

    return (
        <section className="py-16 bg-gradient-to-b from-slate-900 via-skylink-navy to-slate-900 overflow-hidden relative">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

            {/* Section header */}
            <div className="text-center mb-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-slate-400 text-sm uppercase tracking-[0.3em] font-bold"
                >
                    Our Work in Action
                </motion.p>
            </div>

            <div
                className="flex"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div
                    className="flex space-x-6 flex-shrink-0"
                    initial={{ x: 0 }}
                    animate={{ x: isPaused ? undefined : "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 45,
                    }}
                    style={isPaused ? { animationPlayState: 'paused' } : {}}
                >
                    {/* Render Double Set for Infinite Loop */}
                    {[...displayImages, ...displayImages].map((src, index) => (
                        <motion.div
                            key={index}
                            className="w-80 h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer"
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-skylink-blue via-tech-cyan to-skylink-gold rounded-2xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500" />

                            {/* Image container */}
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-700/50 group-hover:border-tech-cyan/50 transition-colors duration-300">
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-skylink-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 z-10" />

                                {/* Image */}
                                <img
                                    src={src}
                                    alt={`Project gallery ${index}`}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />

                                {/* Shimmer effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Pause indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isPaused ? 1 : 0 }}
                className="text-center mt-6"
            >
                <span className="text-slate-500 text-xs uppercase tracking-widest">
                    Hover to explore
                </span>
            </motion.div>
        </section>
    );
};

export default ImageMarquee;

