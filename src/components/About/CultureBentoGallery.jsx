import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Maximize2, 
    X, 
    Sparkles, 
    Users, 
    Clock, 
    Building2, 
    ShieldCheck, 
    ChevronLeft, 
    ChevronRight,
    Camera
} from 'lucide-react';

import hqNightImg from '../../assets/Photos/hq-night-operations.webp';
import teamLoungeImg from '../../assets/Photos/team-lounge.webp';
import executiveMeetingImg from '../../assets/Photos/executive-meeting.webp';
import nocTelemetryImg from '../../assets/Photos/noc-telemetry.webp';

const galleryPhotos = [
    {
        id: 'night-ops',
        title: '24/7 Night-Shift Operations Floor',
        tag: 'Follow-The-Sun Coverage',
        description: 'Dedicated software engineering, QA, and US property preservation teams operating synchronously during active US business hours.',
        badge: '24/7 LIVE • US SHIFT',
        image: hqNightImg,
        span: 'col-span-1 md:col-span-2 row-span-2'
    },
    {
        id: 'team-lounge',
        title: 'Innovation & Collaboration Lounge',
        tag: 'Engineering Culture',
        description: 'Cross-functional engineering pods and project managers conducting daily sprint reviews in an open, ergonomic tech space.',
        badge: 'TEAM CULTURE',
        image: teamLoungeImg,
        span: 'col-span-1 md:col-span-1 row-span-1'
    },
    {
        id: 'executive-meeting',
        title: 'Strategic Boardroom & Governance',
        tag: 'Executive Leadership',
        description: 'Leadership aligning quarterly SLAs, bank-grade compliance benchmarks, and enterprise client growth roadmaps.',
        badge: 'GOVERNANCE',
        image: executiveMeetingImg,
        span: 'col-span-1 md:col-span-1 row-span-1'
    },
    {
        id: 'noc-floor',
        title: 'Tier-3 SRE Telemetry Command Center',
        tag: 'Cloud Infrastructure',
        description: 'Continuous monitoring of cloud latency, database replication, and cybersecurity threat matrices across multi-cloud regions.',
        badge: 'NOC COMMAND WALL',
        image: nocTelemetryImg,
        span: 'col-span-1 md:col-span-2 row-span-1'
    }
];

const CultureBentoGallery = () => {
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const prevPhoto = () => {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryPhotos.length - 1));
    };

    const nextPhoto = () => {
        setLightboxIndex((prev) => (prev < galleryPhotos.length - 1 ? prev + 1 : 0));
    };

    return (
        <section id="hq-gallery" className="relative py-24 md:py-32 bg-black text-white px-4 sm:px-6 overflow-hidden border-t border-white/[0.08]">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="aura-badge mb-4">
                        <Camera size={14} className="text-[#00E5BE]" />
                        <span>Dhaka Global HQ & Culture</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Life Inside{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                            Skylink Innovations
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        Explore our world-class 24/7 physical facilities at Badar Heights, Bashundhara R/A, Dhaka — where technology mastery meets relentless execution.
                    </p>
                </div>

                {/* Cyber Bento Photo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] sm:auto-rows-[320px]">
                    {galleryPhotos.map((photo, index) => (
                        <div
                            key={photo.id}
                            onClick={() => openLightbox(index)}
                            className={`aura-glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-[#00E5BE]/50 transition-all duration-500 group relative cursor-pointer ${photo.span}`}
                        >
                            {/* Background Image */}
                            <img
                                src={photo.image}
                                alt={photo.title}
                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />

                            {/* Top Badge */}
                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/60 backdrop-blur-md border border-white/20 text-[#00E5BE]">
                                    {photo.badge}
                                </span>
                                <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-300 group-hover:text-[#00E5BE] group-hover:scale-110 transition-all">
                                    <Maximize2 size={14} />
                                </div>
                            </div>

                            {/* Bottom Content Card */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="text-[11px] font-mono uppercase tracking-wider text-[#00E5BE] mb-1">
                                    {photo.tag}
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#00E5BE] transition-colors">
                                    {photo.title}
                                </h3>
                                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                                    {photo.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl">
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                        >
                            <X size={20} />
                        </button>

                        {/* Navigation Arrows */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-[#00E5BE] hover:text-black hover:border-[#00E5BE] transition-all"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-[#00E5BE] hover:text-black hover:border-[#00E5BE] transition-all"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Active Image Card */}
                        <motion.div
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-5xl w-full max-h-[85vh] rounded-3xl overflow-hidden border border-white/20 bg-zinc-950 flex flex-col shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative flex-grow min-h-[50vh] max-h-[65vh] bg-black">
                                <img
                                    src={galleryPhotos[lightboxIndex].image}
                                    alt={galleryPhotos[lightboxIndex].title}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="p-6 bg-zinc-900/90 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <div className="text-xs font-mono uppercase text-[#00E5BE] font-bold">
                                        {galleryPhotos[lightboxIndex].badge} • {galleryPhotos[lightboxIndex].tag}
                                    </div>
                                    <h4 className="text-xl font-bold text-white mt-0.5">
                                        {galleryPhotos[lightboxIndex].title}
                                    </h4>
                                    <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                                        {galleryPhotos[lightboxIndex].description}
                                    </p>
                                </div>

                                <div className="text-xs font-mono text-slate-500 self-end sm:self-auto">
                                    {lightboxIndex + 1} / {galleryPhotos.length}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default CultureBentoGallery;
