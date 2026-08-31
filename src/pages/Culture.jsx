import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Camera, 
    Maximize2, 
    X, 
    Sparkles, 
    Users, 
    Clock, 
    Building2, 
    ShieldCheck, 
    ChevronLeft, 
    ChevronRight,
    Heart,
    Coffee,
    Laptop,
    Moon,
    Sun,
    Award,
    Zap,
    ArrowRight,
    CheckCircle2,
    Briefcase,
    Layers,
    Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import CyberBackground from '../components/UI/CyberBackground';
import ScrollReveal from '../components/UI/ScrollReveal';

// Dynamic eager import of ALL Photos in src/assets/Photos/*.webp using Vite
const allPhotoModules = import.meta.glob('../assets/Photos/*.webp', { eager: true });

// Structured titles and categorization for known photos, with smart fallbacks for all DSC files
const photoMetadataMap = {
    'hq-night-operations': { title: '24/7 US Night-Shift Operations Floor', category: 'night-shift', tag: 'Follow-The-Sun Sync', badge: '24/7 US SHIFT' },
    'team-lounge': { title: 'Modern Innovation & Coffee Lounge', category: 'hq', tag: 'Workplace Wellness', badge: 'COMMUNITY' },
    'executive-meeting': { title: 'Strategic Boardroom Governance', category: 'innovation', tag: 'Leadership', badge: 'GOVERNANCE' },
    'noc-telemetry': { title: 'Tier-3 SRE Telemetry Command Center', category: 'innovation', tag: 'Cloud Telemetry', badge: 'NOC WALL' },
    'cloud-architect': { title: 'Cloud Solutions & Microservices Lab', category: 'innovation', tag: 'Engineering', badge: 'TECH STACK' },
    'field-inspector': { title: 'US Field Inspector Audit', category: 'field', tag: 'Field QA', badge: 'GPS AUDIT' },
    'reo-rehab': { title: 'REO Turnkey Restoration & Cleanout', category: 'field', tag: 'Rehab', badge: 'MARKET READY' },
    'winter-securing': { title: 'HUD Pressure Testing & Lockbox', category: 'field', tag: 'Compliance', badge: 'ZERO FREEZE' }
};

// Build the complete array of 70+ photos from all imported assets
const allGalleryItems = Object.entries(allPhotoModules).map(([path, module]) => {
    const filename = path.split('/').pop().replace('.webp', '');
    const meta = photoMetadataMap[filename];

    if (meta) {
        return {
            id: filename,
            src: module.default,
            title: meta.title,
            category: meta.category,
            tag: meta.tag,
            badge: meta.badge,
            location: 'Dhaka Global HQ, Level 7',
            description: `High-resolution visual capture from Skylink Innovations Ltd. operations floor and facilities.`
        };
    }

    // Categorize DSC photoshoot series
    const num = parseInt(filename.replace(/\D/g, ''), 10) || 0;
    let category = 'team';
    let title = `Dhaka HQ Team Operations & Collaboration (${filename})`;
    let tag = 'Team Culture';
    let badge = 'OFFICE LIFE';

    if (num >= 5807 && num <= 5820) {
        category = 'leadership';
        title = `Executive Leadership & Strategic Discussion (${filename})`;
        tag = 'Leadership Session';
        badge = 'STRATEGY';
    } else if (num >= 5821 && num <= 5845) {
        category = 'team';
        title = `Software Engineering & BPO Floor Collaboration (${filename})`;
        tag = 'Workplace Pods';
        badge = 'HQ PODS';
    } else if (num >= 5846 && num <= 5870) {
        category = 'events';
        title = `Team Engagement, Culture & Milestones (${filename})`;
        tag = 'Team Life';
        badge = 'COMMUNITY';
    }

    return {
        id: filename,
        src: module.default,
        title: title,
        category: category,
        tag: tag,
        badge: badge,
        location: 'Badar Heights, Dhaka HQ',
        description: `Authentic on-site photography documenting our high-performance workplace and team environment.`
    };
});

const cultureStats = [
    { value: '24/7/365', label: 'Follow-The-Sun Sync', detail: 'Zero lag with US mortgage and tech markets' },
    { value: '70+', label: 'Verified Photo Assets', detail: 'Authentic captures from our Dhaka HQ & team' },
    { value: '150+', label: 'Engineers & Field Leads', detail: 'Elite software architects & BPO specialists' },
    { value: '99.4%', label: 'Leadership Retention', detail: 'Career ladders with continuous upskilling' }
];

const cultureFilters = [
    { id: 'all', label: 'All Photos (70+)' },
    { id: 'team', label: '👥 Team & Workstations' },
    { id: 'leadership', label: '🏛️ Leadership & Boardroom' },
    { id: 'events', label: '🎉 Culture & Celebrations' },
    { id: 'night-shift', label: '🌙 24/7 Night Shift' },
    { id: 'innovation', label: '💡 Tech & Innovation' },
    { id: 'field', label: '🏡 Field Operations' }
];

const culturalPillars = [
    {
        title: 'Follow-The-Sun Precision',
        icon: Moon,
        description: 'We synchronize directly with our American and European partners. When New York and Dallas wake up, our full operations floor is live, responsive, and executing with zero delay.'
    },
    {
        title: 'Radical Transparency & Merit',
        icon: Award,
        description: 'Every deliverable, SLA metric, and career promotion is rooted in transparent data. We celebrate high performance, honest communication, and mutual respect.'
    },
    {
        title: 'Relentless Mastery & Upskilling',
        icon: Zap,
        description: 'We invest heavily in our people. From AWS & Kubernetes certifications to US HUD Title 24 CFR compliance training, we build industry-defining specialists.'
    },
    {
        title: 'People-First Care & Wellness',
        icon: Heart,
        description: 'Our team is our greatest competitive advantage. We provide subsidized meals, secure night transportation, premium healthcare, and a supportive, drama-free workplace.'
    }
];

const perksList = [
    { title: 'Subsidized Catered Meals & Snacks', desc: 'Fresh gourmet dinners, midnight snacks, and unlimited barista coffee on shift.' },
    { title: 'Safe Dedicated Night Transport', desc: 'Secure door-to-door company commute for night-shift team members.' },
    { title: 'High-End Ergonomic Workstations', desc: 'Dual-monitor curved setups, motorized standing desks, and premium mesh chairs.' },
    { title: 'Comprehensive Health & Life Coverage', desc: 'Full medical, hospitalization, and family healthcare coverage packages.' },
    { title: 'Recreation & Gaming Chill Lounge', desc: 'PlayStation 5, table tennis, foosball, and quiet nap pods to recharge.' },
    { title: 'Accelerated Fast-Track Promotions', desc: 'Performance-driven appraisals twice a year with clear leadership pathways.' }
];

const Culture = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(24);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const filteredItems = useMemo(() => {
        if (activeFilter === 'all') return allGalleryItems;
        return allGalleryItems.filter(item => item.category === activeFilter);
    }, [activeFilter]);

    const displayedItems = filteredItems.slice(0, visibleCount);

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const prevPhoto = () => {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    };

    const nextPhoto = () => {
        setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    };

    const cultureStructuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'Corporate Culture & Life at Skylink Innovations Ltd.',
            description: 'Explore the 24/7 high-performance work culture, Dhaka headquarters, night-shift life, and complete 70+ photo collection at Skylink Innovations Ltd.',
            publisher: {
                '@type': 'Organization',
                name: 'Skylink Innovations Ltd.',
                url: 'https://skylinkltd.ai'
            }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Skylink Innovations Corporate Culture Complete Photo Gallery',
            description: 'Full photographic collection of 70+ images documenting life at Skylink Innovations Ltd. Dhaka HQ, team collaboration, and follow-the-sun operations.',
            url: 'https://skylinkltd.ai/culture'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen relative z-10 bg-black text-white selection:bg-[#00E5BE] selection:text-black">
            <SEO
                title="Corporate Culture & Photo Gallery (70+ Real Photos) | Skylink Innovations"
                description="Step inside Skylink Innovations Ltd. Browse our complete collection of 70+ authentic photographs documenting our world-class 24/7 Dhaka HQ, team culture, leadership, and night-shift life."
                canonical="https://skylinkltd.ai/culture"
                structuredData={cultureStructuredData}
            />

            <CyberBackground variant={1} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="aura-badge mb-4 mx-auto">
                        <Camera size={14} className="text-[#00E5BE]" />
                        <span>Inside Skylink Innovations • Complete Visual Archive</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                        Where Global Standards Meet{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-[#38BDF8]">
                            Unstoppable Energy
                        </span>
                    </h1>
                    <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto">
                        Explore our full archive of 70+ authentic photographs capturing life inside our 24/7 Dhaka headquarters at Badar Heights, Bashundhara R/A.
                    </p>
                </div>

                {/* Culture Metrics Highlights */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-white/10 mb-20 shadow-2xl backdrop-blur-xl">
                    {cultureStats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00E5BE] font-mono mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-white mb-0.5">
                                {stat.label}
                            </div>
                            <div className="text-[11px] text-slate-400">
                                {stat.detail}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Multi-Category Interactive Photo Gallery */}
                <div id="gallery" className="mb-28">
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                        {cultureFilters.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveFilter(tab.id);
                                    setVisibleCount(24);
                                }}
                                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold font-mono transition-all ${
                                    activeFilter === tab.id
                                        ? 'bg-[#00E5BE] text-black shadow-aura-sm'
                                        : 'bg-zinc-950 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="text-center mb-8 text-xs font-mono text-slate-400">
                        Showing <strong className="text-[#00E5BE]">{displayedItems.length}</strong> of{' '}
                        <strong>{filteredItems.length}</strong> photos in archive
                    </div>

                    {/* Responsive Grid of All Photos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        <AnimatePresence>
                            {displayedItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2, delay: (index % 12) * 0.02 }}
                                    onClick={() => openLightbox(index)}
                                    className="aura-glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#00E5BE]/50 transition-all duration-300 group relative cursor-pointer bg-zinc-950 aspect-[4/3] flex flex-col justify-end"
                                >
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300" />

                                    {/* Top Badge */}
                                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md border border-white/20 text-[#00E5BE]">
                                            {item.badge}
                                        </span>
                                        <div className="w-7 h-7 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-300 group-hover:text-[#00E5BE] group-hover:scale-110 transition-all">
                                            <Maximize2 size={12} />
                                        </div>
                                    </div>

                                    {/* Bottom Info */}
                                    <div className="relative z-10 p-4">
                                        <div className="text-[10px] font-mono uppercase text-[#00E5BE] mb-0.5">
                                            {item.tag}
                                        </div>
                                        <h3 className="text-sm font-bold text-white group-hover:text-[#00E5BE] transition-colors line-clamp-1">
                                            {item.title}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Load More Button */}
                    {visibleCount < filteredItems.length && (
                        <div className="text-center mt-12">
                            <button
                                onClick={() => setVisibleCount(prev => prev + 24)}
                                className="btn-aura-primary text-xs sm:text-sm !py-3.5 !px-8 font-mono shadow-aura"
                            >
                                <span>Load More Photos ({filteredItems.length - visibleCount} Remaining)</span>
                                <ArrowRight size={15} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Cultural Pillars & Operating Creed */}
                <div className="mb-28">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="aura-badge mb-3">
                            <ShieldCheck size={14} className="text-[#00E5BE]" />
                            <span>The Skylink Creed</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                            Four Pillars That Define How We Work
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base">
                            Built on trust, speed, and continuous growth — our core principles guide every single line of code and work order we process.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {culturalPillars.map((pillar, i) => {
                            const Icon = pillar.icon;
                            return (
                                <div
                                    key={i}
                                    className="aura-glass-card p-8 bg-zinc-950/70 border border-white/10 hover:border-[#00E5BE]/40 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] mb-6 group-hover:scale-110 transition-transform shadow-aura-sm">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00E5BE] transition-colors">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Life on the 24/7 Shift & Employee Perks */}
                <div className="aura-glass-card p-8 sm:p-14 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 border border-white/10 rounded-3xl mb-28 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5BE]/5 rounded-full blur-[120px] pointer-events-none" />

                    <div className="max-w-3xl mb-12 relative z-10">
                        <div className="aura-badge mb-3">
                            <Coffee size={14} className="text-[#00E5BE]" />
                            <span>Workplace Ergonomics & Care</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                            Designed for Comfort, Energy & Long-Term Careers
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            Working follow-the-sun night hours requires extraordinary facilities. We've engineered our physical office to ensure maximum comfort, mental wellness, and productivity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                        {perksList.map((perk, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00E5BE]/30 transition-all group"
                            >
                                <div className="text-sm font-bold text-white mb-1.5 flex items-center gap-2 group-hover:text-[#00E5BE] transition-colors">
                                    <CheckCircle2 size={16} className="text-[#00E5BE] shrink-0" />
                                    <span>{perk.title}</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed pl-6">
                                    {perk.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA to Careers */}
                <div className="aura-glass-card p-10 md:p-16 text-center relative overflow-hidden bg-zinc-950 border border-white/15 rounded-3xl">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00E5BE]/10 rounded-full blur-[140px] pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="aura-badge mb-4 mx-auto">
                            <Briefcase size={14} className="text-[#00E5BE]" />
                            <span>We Are Hiring</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
                            Ready to build your future with us?
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                            Explore active opportunities in US Property Preservation, Full-Stack Software Engineering, Cloud Architecture, and 24/7 Operations.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/careers" className="btn-aura-primary w-full sm:w-auto">
                                <span>View Active Job Openings</span>
                                <ArrowRight size={16} />
                            </Link>
                            <Link to="/contact" className="btn-aura-secondary w-full sm:w-auto">
                                <span>Get in Touch With Us</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Lightbox Modal */}
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
                            <div className="relative flex-grow min-h-[50vh] max-h-[65vh] bg-black flex items-center justify-center">
                                <img
                                    src={filteredItems[lightboxIndex].src}
                                    alt={filteredItems[lightboxIndex].title}
                                    className="max-w-full max-h-[65vh] object-contain"
                                />
                            </div>

                            <div className="p-6 bg-zinc-900/90 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
                                <div>
                                    <div className="text-xs uppercase text-[#00E5BE] font-bold">
                                        {filteredItems[lightboxIndex].badge} • {filteredItems[lightboxIndex].location}
                                    </div>
                                    <h4 className="text-lg sm:text-xl font-bold text-white mt-1 font-sans">
                                        {filteredItems[lightboxIndex].title}
                                    </h4>
                                    <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
                                        {filteredItems[lightboxIndex].description}
                                    </p>
                                </div>

                                <div className="text-xs font-mono text-slate-500 self-end sm:self-auto shrink-0">
                                    {lightboxIndex + 1} / {filteredItems.length}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Culture;
