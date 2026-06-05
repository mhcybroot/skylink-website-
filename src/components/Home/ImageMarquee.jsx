import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import LightboxGallery from '../Gallery/LightboxGallery';

// ============================================
// 3D TILT IMAGE CARD
// ============================================
const TiltImageCard = ({ src, index, onClick }) => {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 160, damping: 18 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 160, damping: 18 });
    
    const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [100, 0]), { stiffness: 160, damping: 18 });
    const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [100, 0]), { stiffness: 160, damping: 18 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <div 
            onClick={() => onClick(src)}
            className="perspective-1000 w-80 h-56 flex-shrink-0 cursor-pointer"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                animate={{
                    z: isHovered ? 45 : 0,
                    scale: isHovered ? 1.06 : 1,
                }}
                style={{
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                    transformStyle: 'preserve-3d',
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className="w-full h-full relative"
            >
                {/* Glow Bloom */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0.45 : 0 }}
                    className="absolute -inset-4 bg-tech-cyan rounded-2xl blur-xl -z-10"
                />

                {/* Main Card Content */}
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 relative">
                    <img
                        src={src}
                        alt={`Project gallery ${index}`}
                        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                            isHovered ? 'scale-110 grayscale-0' : 'scale-100 grayscale-[0.8]'
                        }`}
                    />
                    
                    <div className={`absolute inset-0 bg-slate-950/40 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />

                    {/* Interactive Glare Overlay */}
                    <motion.div 
                        className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 mix-blend-overlay pointer-events-none"
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        style={{
                            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35) 0%, transparent 65%)`
                        }}
                    />
                </div>

                {/* Ground Reflection */}
                <motion.div
                    className="absolute top-full left-0 w-full h-full rounded-2xl overflow-hidden origin-top scale-y-[-1] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0.35 : 0.08 }}
                >
                    <img
                        src={src}
                        alt=""
                        className={`w-full h-full object-cover ${isHovered ? 'grayscale-0' : 'grayscale-[0.8]'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950" />
                </motion.div>
            </motion.div>
        </div>
    );
};

// ============================================
// IMAGE CONVEYOR PORTLE
// ============================================
const ImageMarquee = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const sectionRef = useRef(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const trackRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 100, damping: 25 });
    const trackRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 100, damping: 25 });

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const imagesGlob = import.meta.glob('../../assets/Photos/*.jpg', { eager: true });
    const images = Object.values(imagesGlob).map(module => module.default);
    const displayImages = images.slice(0, 10);

    const galleryImages = displayImages.map((src, i) => ({
        src,
        alt: `Skylink Project ${i + 1}`,
        caption: `ASSET_ARCHIVE_0${i + 1} // SECURE LOG`
    }));

    const handleImageClick = (index) => {
        setSelectedIndex(index % displayImages.length);
        setLightboxOpen(true);
    };

    return (
        <section 
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="py-24 bg-transparent overflow-hidden relative z-10"
        >
            {/* Section header */}
            <div className="text-center mb-16 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 text-skylink-gold font-bold tracking-widest text-sm uppercase"
                >
                    <div className="w-8 h-px bg-skylink-gold" />
                    Portfolio Highlights
                    <div className="w-8 h-px bg-skylink-gold" />
                </motion.div>
            </div>

            {/* Conveyor Belt Wrapper with mouse-reactive 3D rotation */}
            <motion.div 
                className="relative pt-10 pb-32 flex justify-center"
                style={{
                    rotateX: trackRotateX,
                    rotateY: trackRotateY,
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Gradient edge masks */}
                <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none" />

                <div
                    className="flex"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <motion.div
                        className="flex space-x-8 flex-shrink-0 px-4"
                        initial={{ x: 0 }}
                        animate={{ x: isPaused ? undefined : "-50%" }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 45,
                        }}
                        style={{
                            ...(isPaused ? { animationPlayState: 'paused' } : {}),
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {/* Double array set for seamless scrolling */}
                        {[...displayImages, ...displayImages].map((src, index) => (
                            <TiltImageCard 
                                key={index} 
                                src={src} 
                                index={index} 
                                onClick={() => handleImageClick(index)} 
                            />
                        ))}
                    </motion.div>
                </div>
            </motion.div>
            
            {/* Background ambient lighting blobs */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-skylink-blue/5 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-tech-cyan/5 rounded-full blur-[120px] -translate-y-1/2" />
            </div>

            {/* Lightbox Integration */}
            <LightboxGallery
                images={galleryImages}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                initialIndex={selectedIndex}
            />
        </section>
    );
};

export default ImageMarquee;
