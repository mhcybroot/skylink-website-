import { useState } from 'react';
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
    Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import CyberBackground from '../components/UI/CyberBackground';
import ScrollReveal from '../components/UI/ScrollReveal';
import AnimatedCounter from '../components/UI/AnimatedCounter';

// Photo Assets
import hqNightImg from '../assets/Photos/hq-night-operations.webp';
import teamLoungeImg from '../assets/Photos/team-lounge.webp';
import executiveMeetingImg from '../assets/Photos/executive-meeting.webp';
import nocTelemetryImg from '../assets/Photos/noc-telemetry.webp';
import boardroomImg from '../assets/boardroom-governance.webp';
import officeTeam1 from '../assets/Photos/DSC05814.webp';
import officeTeam2 from '../assets/Photos/DSC05844.webp';
import officeTeam3 from '../assets/Photos/DSC05848.webp';
import officeTeam4 from '../assets/Photos/DSC05809.webp';

const cultureStats = [
    { value: '24/7/365', label: 'Follow-The-Sun Sync', detail: 'Zero lag with US mortgage and tech markets' },
    { value: '150+', label: 'Engineers & Field Leads', detail: 'Elite software architects & BPO specialists' },
    { value: '99.4%', label: 'Leadership Retention', detail: 'Career ladders with continuous upskilling' },
    { value: '100%', label: 'Merit-Based Culture', detail: 'Equal opportunity & transparent growth' }
];

const galleryItems = [
    {
        id: 'night-ops',
        category: 'night-shift',
        title: '24/7 US Night-Shift Operations Floor',
        tag: 'Follow-The-Sun Sync',
        location: 'Dhaka Global HQ, Level 7',
        time: 'Active US Hours (8:00 PM - 5:00 AM)',
        description: 'Our software engineering, quality assurance, and US property preservation teams operating synchronously during active US banking hours with zero latency.',
        badge: '24/7 LIVE • US SHIFT',
        image: hqNightImg,
        span: 'col-span-1 md:col-span-2'
    },
    {
        id: 'team-lounge',
        category: 'hq',
        title: 'Modern Innovation & Coffee Lounge',
        tag: 'Workplace Wellness',
        location: 'Badar Heights, Dhaka',
        time: '24/7 Open Access',
        description: 'Ergonomic breakout spaces designed for impromptu whiteboarding, sprint retrospectives, and relaxation with gourmet coffee.',
        badge: 'WORKPLACE CULTURE',
        image: teamLoungeImg,
        span: 'col-span-1 md:col-span-1'
    },
    {
        id: 'executive-meeting',
        category: 'innovation',
        title: 'Strategic Boardroom & Executive Governance',
        tag: 'Corporate Strategy',
        location: 'Executive Suite',
        time: 'Quarterly Alignment',
        description: 'Senior directors and technology heads reviewing international client SLAs, bank-grade compliance benchmarks, and enterprise growth roadmaps.',
        badge: 'GOVERNANCE',
        image: executiveMeetingImg,
        span: 'col-span-1 md:col-span-1'
    },
    {
        id: 'noc-floor',
        category: 'innovation',
        title: 'Tier-3 SRE & Cloud Telemetry Command Center',
        tag: 'Cloud & Tech Hub',
        location: 'NOC Command Center',
        time: 'Continuous 99.99% SLA Monitoring',
        description: 'Multi-screen video wall tracking multi-cloud latency, database replication, and cybersecurity threat matrices across global regions.',
        badge: 'NOC COMMAND WALL',
        image: nocTelemetryImg,
        span: 'col-span-1 md:col-span-2'
    },
    {
        id: 'office-celebration',
        category: 'celebrations',
        title: 'Annual Team Gala & Excellence Awards',
        tag: 'Recognition & Joy',
        location: 'Grand Ballroom, Dhaka',
        time: 'Annual Gala',
        description: 'Celebrating extraordinary engineering milestones, top-performing property coordinators, and long-tenured team members.',
        badge: 'TEAM RECOGNITION',
        image: officeTeam1,
        span: 'col-span-1 md:col-span-1'
    },
    {
        id: 'boardroom-session',
        category: 'hq',
        title: 'Collaborative Sprint Planning & Code Reviews',
        tag: 'Engineering Excellence',
        location: 'Tech Floor Suite A',
        time: 'Daily Standups',
        description: 'Engineers, UI/UX designers, and QA leads collaborating over architecture diagrams and system refactoring.',
        badge: 'COLLABORATION',
        image: boardroomImg,
        span: 'col-span-1 md:col-span-2'
    },
    {
        id: 'team-event-2',
        category: 'celebrations',
        title: 'Cultural Festival & Holiday Celebrations',
        tag: 'Vibrant Community',
        location: 'HQ Terrace & Lounge',
        time: 'Seasonal Celebrations',
        description: 'Fostering unity, camaraderie, and joy across diverse cultural festivals, games, and culinary experiences.',
        badge: 'COMMUNITY',
        image: officeTeam2,
        span: 'col-span-1 md:col-span-1'
    },
    {
        id: 'team-awards',
        category: 'celebrations',
        title: 'Quarterly Star Performer Honors',
        tag: 'Meritocracy',
        location: 'Main Auditorium',
        time: 'Quarterly Town Hall',
        description: 'Recognizing team members who demonstrate outstanding dedication, client praise, and continuous technical mastery.',
        badge: 'STAR PERFORMERS',
        image: officeTeam3,
        span: 'col-span-1 md:col-span-1'
    },
    {
        id: 'office-atmosphere',
        category: 'night-shift',
        title: 'Ergonomic Night-Shift Workstations',
        tag: 'Comfort & Focus',
        location: 'Operations Pods',
        time: 'Night Operations',
        description: 'High-back ergonomic mesh seating, curved ultrawide monitors, and ambient eye-comfort lighting tailored for peak night-shift performance.',
        badge: 'ERGONOMICS',
        image: officeTeam4,
        span: 'col-span-1 md:col-span-1'
    }
];

const cultureFilters = [
    { id: 'all', label: 'All Moments' },
    { id: 'night-shift', label: '🌙 24/7 US Night Shift' },
    { id: 'innovation', label: '💡 Tech & Innovation Pods' },
    { id: 'hq', label: '🏢 Dhaka HQ & Facilities' },
    { id: 'celebrations', label: '🎉 Celebrations & Awards' }
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
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const filteredItems = activeFilter === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeFilter);

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
            description: 'Explore the 24/7 high-performance work culture, Dhaka headquarters, night-shift life, and team celebrations at Skylink Innovations Ltd.',
            publisher: {
                '@type': 'Organization',
                name: 'Skylink Innovations Ltd.',
                url: 'https://skylinkltd.ai'
            }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Skylink Innovations Corporate Culture Gallery',
            description: 'Photographic showcase of life at Skylink Innovations Ltd. Dhaka HQ, team collaboration, and follow-the-sun operations.',
            url: 'https://skylinkltd.ai/culture'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen relative z-10 bg-black text-white selection:bg-[#00E5BE] selection:text-black">
            <SEO
                title="Corporate Culture & Life at Skylink | 24/7 Innovation & Team Gallery"
                description="Step inside Skylink Innovations Ltd. Explore our world-class 24/7 Dhaka HQ, vibrant night-shift culture, engineering hackathons, employee wellness, and corporate milestones."
                canonical="https://skylinkltd.ai/culture"
                structuredData={cultureStructuredData}
            />

            <CyberBackground variant={1} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="aura-badge mb-4 mx-auto">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>Inside Skylink Innovations</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                        Where Global Standards Meet{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-[#38BDF8]">
                            Unstoppable Energy
                        </span>
                    </h1>
                    <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto">
                        We don't just deliver enterprise software and nationwide US property preservation — we cultivate a culture of relentless excellence, genuine friendship, and round-the-clock innovation.
                    </p>
                </div>

                {/* Culture Metrics Highlights */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-white/10 mb-28 shadow-2xl backdrop-blur-xl">
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
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <div className="aura-badge mb-3">
                            <Camera size={14} className="text-[#00E5BE]" />
                            <span>Visual Story & Photo Showcase</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                            Life at Skylink HQ & Beyond
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base">
                            Click any photograph to enter the full-screen immersive gallery inspection.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                        {cultureFilters.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveFilter(tab.id)}
                                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold font-mono transition-all ${
                                    activeFilter === tab.id
                                        ? 'bg-[#00E5BE] text-black shadow-aura-sm'
                                        : 'bg-zinc-950 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Masonry-Style Photo Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] sm:auto-rows-[340px]">
                        <AnimatePresence>
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => openLightbox(index)}
                                    className={`aura-glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-[#00E5BE]/50 transition-all duration-500 group relative cursor-pointer bg-zinc-950 ${item.span}`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300" />

                                    {/* Top Badge */}
                                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                                        <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/70 backdrop-blur-md border border-[#00E5BE]/40 text-[#00E5BE]">
                                            {item.badge}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-300 group-hover:text-[#00E5BE] group-hover:scale-110 transition-all">
                                            <Maximize2 size={14} />
                                        </div>
                                    </div>

                                    {/* Bottom Content Card */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="text-[11px] font-mono uppercase tracking-wider text-[#00E5BE] mb-1">
                                            {item.tag} • {item.location}
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-[#00E5BE] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
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
                                    src={filteredItems[lightboxIndex].image}
                                    alt={filteredItems[lightboxIndex].title}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="p-6 bg-zinc-900/90 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <div className="text-xs font-mono uppercase text-[#00E5BE] font-bold">
                                        {filteredItems[lightboxIndex].badge} • {filteredItems[lightboxIndex].location}
                                    </div>
                                    <h4 className="text-xl font-bold text-white mt-0.5">
                                        {filteredItems[lightboxIndex].title}
                                    </h4>
                                    <p className="text-xs text-slate-400 mt-1 max-w-2xl">
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
