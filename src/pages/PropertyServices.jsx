import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Building2, 
    ShieldCheck, 
    CheckCircle2, 
    ArrowRight, 
    ChevronDown, 
    Sparkles, 
    MapPin, 
    Clock, 
    Camera, 
    Wrench, 
    Flame, 
    Snowflake, 
    Trash2, 
    Home as HomeIcon,
    AlertTriangle,
    Sliders,
    Layers,
    FileCheck2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/UI/ScrollReveal';

import beforeImg from '../assets/Photos/DSC05844.jpg';
import afterImg from '../assets/Photos/DSC05809.jpg';

const propertyStats = [
    { value: '50 States', label: 'Nationwide US Coverage', detail: 'Local vendor networks across all 50 states' },
    { value: '< 4 Hours', label: 'Emergency Response SLA', detail: 'Rapid board-up & hazard mitigation' },
    { value: '100%', label: 'Geotagged Photo Audits', detail: 'Timestamped metadata verification on all orders' },
    { value: '150k+', label: 'Completed Field Orders', detail: 'Trusted by top national mortgage servicers' }
];

const serviceCategories = [
    {
        id: 'securing',
        title: 'Initial Securing & Rekeying',
        category: 'Loss Mitigation',
        icon: Wrench,
        description: 'Comprehensive property securing upon vacancy or foreclosure, including lockbox installation, rekeying to client key codes, window boarding, and perimeter security reinforcement.',
        highlights: ['Client Code Rekeying', 'Lockbox Installation', 'Hazard Board-Up', 'Perimeter Enclosure']
    },
    {
        id: 'winterization',
        title: 'Winterization & Systems Protection',
        category: 'Climate Safeguards',
        icon: Snowflake,
        description: 'Rigorous climate preparation per HUD/GSE guidelines. Complete plumbing drainage, non-toxic antifreeze treatment, radiant heating checks, and pressure testing.',
        highlights: ['Dry & Wet Winterization', 'Pressure Testing', 'Anti-Freeze Chemical Flushes', 'De-Winterization Prep']
    },
    {
        id: 'trashout',
        title: 'Debris Removal & Trash-Outs',
        category: 'Interior & Exterior',
        icon: Trash2,
        description: 'Complete removal and eco-friendly disposal of interior and exterior personal property, abandoned furniture, hazardous materials, and automotive debris to achieve broom-clean standard.',
        highlights: ['Broom-Clean Certification', 'Hazardous Item Haul-Away', 'Appliance Recycling', 'Curb Appeal Restoration']
    },
    {
        id: 'grounds',
        title: 'Conveyance & Lawn Maintenance',
        category: 'Code Compliance',
        icon: HomeIcon,
        description: 'Recurring seasonal lawn mowing, edge trimming, shrub pruning, tree branch abatement, and snow removal to maintain strict municipal code compliance and avoid citation fines.',
        highlights: ['Bi-Weekly Scheduled Cuts', 'HOA / City Code Compliance', 'Tree & Shrub Trimming', 'Snow & Ice Clearance']
    },
    {
        id: 'hazard',
        title: 'Hazard Mitigation & Emergency Repairs',
        category: 'Emergency Dispatch',
        icon: AlertTriangle,
        description: 'Immediate 24/7 dispatch for urgent structural damage, roof tarping, storm damage recovery, plumbing leak capping, water extraction, and mold remediation protocols.',
        highlights: ['24/7 Rapid Emergency Response', 'Roof Tarping & Patching', 'Water Extraction', 'Sump Pump Inspections']
    },
    {
        id: 'rehab',
        title: 'REO Renovation & CapEx Turns',
        category: 'Asset Value Maximization',
        icon: Building2,
        description: 'End-to-end turnkey general contracting and rehabilitation to prepare REO properties for optimal market listing, from drywall, paint, flooring, and kitchen/bath upgrades to full structural repair.',
        highlights: ['Turnkey Scope & Budgeting', 'Kitchen & Bath Modernization', 'Flooring & Paint Refinishing', 'Market-Ready Sign-off']
    }
];

const faqs = [
    {
        question: 'What geographic areas in the United States do you cover?',
        answer: 'Skylink operates a comprehensive nationwide field network servicing all 50 US states, including primary metropolitan areas, secondary markets, and rural zip codes.'
    },
    {
        question: 'What is your standard turnaround time for emergency hazard securing?',
        answer: 'Our emergency board-up, roof tarping, and hazard containment service level agreement (SLA) guarantees dispatch within 2-4 hours of order receipt.'
    },
    {
        question: 'How do you verify the quality and authenticity of field work?',
        answer: 'Every single work order requires comprehensive before, during, and after geotagged and timestamped high-resolution photos. These are audited by our dual-tier QA review team and client portal validation engines.'
    },
    {
        question: 'Do you comply with investor guidelines (HUD, Fannie Mae, Freddie Mac, VA)?',
        answer: 'Yes. All preservation procedures strictly adhere to investor guidelines including HUD, Fannie Mae, Freddie Mac, VA, and USDA specifications, as well as local municipal HOA ordinances.'
    }
];

// Interactive Before/After Comparison Component
const BeforeAfterSlider = () => {
    const containerRef = useRef(null);
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        setSliderPos((x / rect.width) * 100);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || e.touches.length === 0) return;
        handleMove(e.touches[0].clientX);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsDragging(false)}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="w-full h-72 sm:h-96 md:h-[460px] relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl cursor-ew-resize select-none bg-zinc-950 touch-none"
        >
            {/* Distressed Before Image */}
            <div className="absolute inset-0 bg-black">
                <img
                    src={beforeImg}
                    alt="Distressed Before Preservation"
                    className="w-full h-full object-cover pointer-events-none grayscale-[30%]"
                />
                <div className="absolute top-5 left-5 bg-black/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono font-bold text-white uppercase tracking-wider rounded-lg border border-white/10">
                    Distressed / Before
                </div>
            </div>

            {/* Restored Market-Ready After Image (Clipped) */}
            <div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
                <img
                    src={afterImg}
                    alt="Market-Ready After Preservation"
                    className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute top-5 right-5 bg-[#00E5BE]/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono font-bold text-black uppercase tracking-wider rounded-lg shadow-aura-sm">
                    Market-Ready / After
                </div>
            </div>

            {/* Slider Dividing Bar */}
            <div
                className="absolute top-0 bottom-0 w-[2px] bg-[#00E5BE] shadow-[0_0_15px_#00E5BE] pointer-events-none"
                style={{ left: `${sliderPos}%` }}
            >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-[#00E5BE] flex items-center justify-center shadow-aura pointer-events-none">
                    <Sliders size={16} className="text-[#00E5BE] rotate-90" />
                </div>
            </div>
        </div>
    );
};

const PropertyServices = () => {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-20 px-6 font-sans relative overflow-hidden">
            <SEO
                title="Nationwide US Property Preservation & REO Management | Skylink"
                description="Comprehensive property preservation, inspection, and REO rehab management across all 50 US states with real-time geotagged photographic audits and strict SLA adherence."
            />

            {/* Ambient Spotlight Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#00E5BE]/20 via-[#00E5BE]/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-0" />
            <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#00F5C4]/10 rounded-full blur-[130px] pointer-events-none -z-0" />

            {/* Subtle Grid Backdrop */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-0" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="aura-badge mb-4">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>Nationwide US Field Operations</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                        Institutional-Grade{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-[#5eead4]">
                            US Property Preservation
                        </span>
                    </h1>
                    <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
                        Protecting, securing, and maintaining residential & commercial default assets across all 50 US states with military precision, geotagged audits, and industry-leading turnaround times.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact" className="btn-aura-primary w-full sm:w-auto">
                            <span>Request Field Coverage / Scoping</span>
                            <ArrowRight size={16} />
                        </Link>
                        <a href="#services-grid" className="btn-aura-secondary w-full sm:w-auto">
                            Explore Service Capabilities
                        </a>
                    </div>
                </div>

                {/* Metrics Highlights Bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl bg-zinc-950/70 border border-white/10 mb-28 shadow-2xl">
                    {propertyStats.map((stat, i) => (
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

                {/* Interactive Before & After Visual Slider */}
                <div className="mb-28">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="aura-badge mb-3">
                            <Camera size={14} className="text-[#00E5BE]" />
                            <span>Transformation Visualizer</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            From Distressed Default to Market-Ready Asset
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base">
                            Drag the slider to inspect before-and-after results of our property restoration and trash-out protocols.
                        </p>
                    </div>

                    <BeforeAfterSlider />
                </div>

                {/* Comprehensive Service Capabilities Grid */}
                <div id="services-grid" className="mb-28">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="aura-badge mb-3">
                            <Layers size={14} className="text-[#00E5BE]" />
                            <span>Comprehensive Services</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
                            Full-Lifecycle Default Asset Preservation
                        </h2>
                        <p className="text-slate-400 text-base sm:text-lg">
                            From initial foreclosure securing to recurring lawn maintenance and full CapEx turnarounds.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {serviceCategories.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={service.id}
                                    className="aura-glass-card p-8 bg-zinc-950/70 border border-white/10 hover:border-[#00E5BE]/30 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] mb-6 shadow-aura-sm group-hover:bg-[#00E5BE]/20 transition-colors">
                                            <Icon size={22} />
                                        </div>
                                        <div className="text-xs font-mono uppercase text-[#00E5BE] tracking-wider mb-2">
                                            {service.category}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00E5BE] transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                            {service.description}
                                        </p>
                                    </div>

                                    <ul className="space-y-2 pt-4 border-t border-white/5 text-xs text-slate-300">
                                        {service.highlights.map((h, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <CheckCircle2 size={13} className="text-[#00E5BE] shrink-0" />
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 4-Phase Quality Assurance Workflow */}
                <div className="mb-28 aura-glass-card p-8 md:p-14 bg-gradient-to-r from-zinc-950 via-black to-zinc-950 border border-white/10">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="aura-badge mb-3">
                            <FileCheck2 size={14} className="text-[#00E5BE]" />
                            <span>Quality Assurance</span>
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                            Rigorous 4-Step Field Compliance Protocol
                        </h3>
                        <p className="text-slate-400 text-sm sm:text-base">
                            Every work order is tracked from initial dispatch to final client submission with multi-layer verification.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="text-2xl font-mono font-bold text-[#00E5BE] mb-2">01</div>
                            <h4 className="font-bold text-white mb-2">Intelligent Dispatch</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Automated task routing to vetted, insured local field specialists based on proximity and SLA performance.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="text-2xl font-mono font-bold text-[#00E5BE] mb-2">02</div>
                            <h4 className="font-bold text-white mb-2">Geotagged Capture</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Mandatory high-res before, during, and after photos with immutable GPS coordinates and UTC timestamps.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="text-2xl font-mono font-bold text-[#00E5BE] mb-2">03</div>
                            <h4 className="font-bold text-white mb-2">Dual-Tier QA Audit</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                AI optical inspection and senior quality auditor sign-off against HUD & GSE compliance rules.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="text-2xl font-mono font-bold text-[#00E5BE] mb-2">04</div>
                            <h4 className="font-bold text-white mb-2">Client Portal Sync</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Instant submission to client portal with complete cost accounting, lien releases, and photographic packets.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto mb-28">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                            Frequently Asked Questions
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Everything you need to know about our nationwide US field preservation operations.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className="aura-glass-card overflow-hidden bg-zinc-950/60 border border-white/10"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                                    >
                                        <span className="font-semibold text-sm sm:text-base text-white">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            size={18}
                                            className={`text-[#00E5BE] transition-transform duration-300 shrink-0 ${
                                                isOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4"
                                            >
                                                {faq.answer}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Call to Action */}
                <div className="aura-glass-card p-10 md:p-16 text-center relative overflow-hidden bg-zinc-950 border border-white/10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00E5BE]/10 rounded-full blur-[140px] pointer-events-none -z-0" />
                    
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="aura-badge mb-4 mx-auto">
                            <ShieldCheck size={14} className="text-[#00E5BE]" />
                            <span>Partner With Skylink</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
                            Ready to scale your US preservation operations?
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                            Partner with Skylink Innovations Ltd for nationwide coverage, strict compliance adherence, and rapid SLA fulfillment.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="btn-aura-primary w-full sm:w-auto">
                                <span>Get Started with Field Scoping</span>
                                <ArrowRight size={16} />
                            </Link>
                            <Link to="/contact" className="btn-aura-secondary w-full sm:w-auto">
                                <span>Contact Dispatch Team</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyServices;
