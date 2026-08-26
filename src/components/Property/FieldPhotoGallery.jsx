import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Camera, 
    Maximize2, 
    X, 
    MapPin, 
    Clock, 
    ShieldCheck, 
    ChevronLeft, 
    ChevronRight,
    Wrench,
    Snowflake,
    Home as HomeIcon,
    Layers
} from 'lucide-react';

import fieldInspectorImg from '../../assets/Photos/field-inspector.webp';
import reoRehabImg from '../../assets/Photos/reo-rehab.webp';
import winterSecuringImg from '../../assets/Photos/winter-securing.webp';
import propertyDroneImg from '../../assets/property-preservation-drone.webp';

const fieldPhotos = [
    {
        id: 'inspector',
        category: 'inspection',
        title: 'Certified Field Inspector On-Site Audit',
        location: 'Dallas, Texas (TX)',
        gps: '32.7767° N, 96.7970° W',
        timestamp: '2026-08-25 14:28:10 CST',
        compliance: 'HUD Title 24 CFR Verified',
        badge: 'EXIF GEOTAGGED',
        description: 'Certified inspector utilizing mobile tablet for instant GPS-tagged photographic audit, hazard identification, and occupancy confirmation.',
        image: fieldInspectorImg
    },
    {
        id: 'reo-rehab',
        category: 'rehab',
        title: 'Full Turnkey Kitchen & Living Room Rehab',
        location: 'Orlando, Florida (FL)',
        gps: '28.5383° N, 81.3792° W',
        timestamp: '2026-08-24 11:15:42 EST',
        compliance: 'GSE / Fannie Mae Market Ready',
        badge: 'MARKET-READY REO',
        description: 'Complete interior restoration including custom shaker cabinetry, quartz countertops, new appliances, and polished hardwood floor refinishing.',
        image: reoRehabImg
    },
    {
        id: 'winterization',
        category: 'winter',
        title: 'HUD-Certified Pressure Test & Antifreeze Tagging',
        location: 'Cleveland, Ohio (OH)',
        gps: '41.4993° N, 81.6944° W',
        timestamp: '2026-08-22 09:40:18 EST',
        compliance: 'HUD / Freddie Mac Anti-Freeze Standard',
        badge: 'ZERO-FREEZE AUDIT',
        description: 'Deep plumbing system blowout, 60 PSI pressure verification, non-toxic propylene glycol antifreeze injection, and tamper-resistant contractor lockbox setup.',
        image: winterSecuringImg
    },
    {
        id: 'drone',
        category: 'inspection',
        title: 'High-Altitude Aerial Roof & Hazard Inspection',
        location: 'Atlanta, Georgia (GA)',
        gps: '33.7490° N, 84.3880° W',
        timestamp: '2026-08-20 16:05:30 EST',
        compliance: 'FAA Part 107 Certified Drone Survey',
        badge: '4K DRONE TELEMETRY',
        description: 'High-resolution aerial thermal and optical inspection identifying missing shingles, roof storm damage, structural sag, and overgrown tree hazards.',
        image: propertyDroneImg
    }
];

const categoryFilters = [
    { id: 'all', label: 'All Field Photos' },
    { id: 'inspection', label: 'On-Site & Drone Audits' },
    { id: 'rehab', label: 'REO Turnkey Rehabs' },
    { id: 'winter', label: 'Winterization & Securing' }
];

const FieldPhotoGallery = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const filteredPhotos = activeFilter === 'all'
        ? fieldPhotos
        : fieldPhotos.filter(p => p.category === activeFilter);

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const prevPhoto = () => {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
    };

    const nextPhoto = () => {
        setLightboxIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
    };

    return (
        <section id="field-gallery" className="relative py-24 md:py-32 bg-black text-white px-4 sm:px-6 overflow-hidden border-t border-white/[0.08]">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="aura-badge mb-4">
                        <Camera size={14} className="text-[#00E5BE]" />
                        <span>Photographic Proof of Performance</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Real Field Work &{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                            Turnkey Restorations
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        Every single work order is documented with tamper-proof EXIF metadata, GPS latitude/longitude watermarks, and multi-tier quality assurance audits.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    {categoryFilters.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveFilter(tab.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
                                activeFilter === tab.id
                                    ? 'bg-[#00E5BE] text-black shadow-aura-sm'
                                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Gallery Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPhotos.map((photo, index) => (
                        <div
                            key={photo.id}
                            onClick={() => openLightbox(index)}
                            className="aura-glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-[#00E5BE]/50 transition-all duration-300 group cursor-pointer bg-zinc-950/80 shadow-2xl flex flex-col"
                        >
                            {/* Photo Aspect Ratio Box */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-black">
                                <img
                                    src={photo.image}
                                    alt={photo.title}
                                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* Top Badges */}
                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/70 backdrop-blur-md border border-[#00E5BE]/40 text-[#00E5BE]">
                                        {photo.badge}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-300 group-hover:text-[#00E5BE] group-hover:scale-110 transition-all">
                                        <Maximize2 size={14} />
                                    </div>
                                </div>

                                {/* HUD Metadata Strip Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex items-center justify-between text-[11px] font-mono text-slate-300">
                                    <div className="flex items-center gap-1.5 text-white">
                                        <MapPin size={13} className="text-[#00E5BE]" />
                                        <span>{photo.location}</span>
                                    </div>
                                    <div className="text-slate-400 text-[10px]">
                                        {photo.gps}
                                    </div>
                                </div>
                            </div>

                            {/* Card Details */}
                            <div className="p-6 flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00E5BE] transition-colors">
                                        {photo.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                                        {photo.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                                    <span className="flex items-center gap-1.5 text-emerald-400">
                                        <ShieldCheck size={14} />
                                        {photo.compliance}
                                    </span>
                                    <span className="text-slate-500 text-[11px]">
                                        {photo.timestamp}
                                    </span>
                                </div>
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
                                    src={filteredPhotos[lightboxIndex].image}
                                    alt={filteredPhotos[lightboxIndex].title}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="p-6 bg-zinc-900/90 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
                                <div>
                                    <div className="text-xs uppercase text-[#00E5BE] font-bold flex items-center gap-2">
                                        <MapPin size={13} />
                                        {filteredPhotos[lightboxIndex].location} • {filteredPhotos[lightboxIndex].gps}
                                    </div>
                                    <h4 className="text-xl font-bold text-white mt-1 font-sans">
                                        {filteredPhotos[lightboxIndex].title}
                                    </h4>
                                    <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
                                        {filteredPhotos[lightboxIndex].description}
                                    </p>
                                </div>

                                <div className="text-right shrink-0">
                                    <div className="text-xs text-emerald-400 font-bold">
                                        ✓ {filteredPhotos[lightboxIndex].compliance}
                                    </div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">
                                        {filteredPhotos[lightboxIndex].timestamp}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default FieldPhotoGallery;
