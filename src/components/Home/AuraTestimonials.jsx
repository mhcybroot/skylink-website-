import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Quote, CheckCircle2, ChevronLeft, ChevronRight, Building2, ShieldCheck, Zap } from 'lucide-react';

const testimonials = [
    {
        quote: "Skylink architected and migrated our core financial infrastructure to Azure with zero downtime. Their 24/7 managed NOC support gives our executive board total peace of mind.",
        author: "Marcus Vance",
        role: "Chief Technology Officer",
        company: "Apex Capital Management",
        metric: "100% Zero-Downtime Migration",
        rating: 5
    },
    {
        quote: "The custom enterprise workflow portal built by Skylink consolidated 5 disjointed legacy platforms into one unified cockpit. Our operational throughput soared by 45%.",
        author: "Elena Rostova",
        role: "VP of Digital Transformation",
        company: "Vanguard Global Solutions",
        metric: "45% Productivity Boost",
        rating: 5
    },
    {
        quote: "Their US property preservation team manages our residential assets across 8 states. Their photo documentation and HUD compliance audits are the most rigorous in the industry.",
        author: "Robert Callahan",
        role: "Head of Portfolio Operations",
        company: "Beacon Asset Management USA",
        metric: "100% HUD & FHA Compliant",
        rating: 5
    },
    {
        quote: "Their zero-trust cybersecurity framework and proactive SIEM threat monitoring eliminated advanced penetration attempts. Skylink is our primary institutional technology partner.",
        author: "David Sterling",
        role: "Director of Information Security",
        company: "National Systems Group",
        metric: "SOC 2 Type II Certified",
        rating: 5
    }
];

const partnerLogos = [
    'Apex Capital Management', 
    'Vanguard Global Solutions', 
    'Beacon Asset Management USA', 
    'National Systems Group', 
    'Summit Cloud Partners', 
    'Evergreen Real Estate Trust'
];

const AuraTestimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="testimonials" className="relative py-28 md:py-36 bg-black text-white px-6 overflow-hidden border-t border-white/[0.06]">
            {/* Ambient Spotlight */}
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-[#00E5BE]/5 rounded-full blur-[150px] pointer-events-none -z-0" />
            <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#38BDF8]/5 rounded-full blur-[140px] pointer-events-none -z-0" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <div className="aura-badge mb-4">
                            <Sparkles size={14} className="text-[#00E5BE]" />
                            <span>Client Endorsements</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                            Trusted by enterprises,{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                                verified by outcomes
                            </span>
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                            Hear how technology leaders and nationwide asset managers achieve high-throughput scale with Skylink.
                        </p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={prevSlide}
                            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#00E5BE]/40 transition-all active:scale-95"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-11 h-11 rounded-full bg-[#00E5BE] text-black flex items-center justify-center font-bold hover:brightness-110 shadow-aura-sm transition-all active:scale-95"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Horizontal Drag / Swipe Carousel Track */}
                <div 
                    ref={scrollContainerRef}
                    className="overflow-hidden pb-4"
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -((testimonials.length - 1) * 340) }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-grab active:cursor-grabbing"
                    >
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="aura-glass-card p-8 flex flex-col justify-between relative group hover:border-[#00E5BE]/40 bg-zinc-950/70 rounded-3xl transition-all shadow-xl"
                            >
                                <div>
                                    {/* Rating Stars & Metric Tag */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-1 text-[#00E5BE]">
                                            {[...Array(t.rating)].map((_, i) => (
                                                <Star key={i} size={14} className="fill-[#00E5BE]" />
                                            ))}
                                        </div>
                                        <Quote size={20} className="text-white/20 group-hover:text-[#00E5BE]/40 transition-colors" />
                                    </div>

                                    {/* Quote Text */}
                                    <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                                        "{t.quote}"
                                    </p>
                                </div>

                                <div>
                                    {/* Verified Metric Pill */}
                                    <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-[11px] font-mono text-[#00E5BE]">
                                        <CheckCircle2 size={12} />
                                        <span>{t.metric}</span>
                                    </div>

                                    {/* Author Profile */}
                                    <div className="pt-4 border-t border-white/10">
                                        <div className="text-sm font-bold text-white group-hover:text-[#00E5BE] transition-colors">
                                            {t.author}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            {t.role}
                                        </div>
                                        <div className="text-xs font-mono text-[#2DD4BF] mt-0.5">
                                            {t.company}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom Marquee of Client Organizations */}
                <div className="pt-16 mt-8 border-t border-white/10 text-center">
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6">
                        Trusted by High-Growth Enterprises & Institutional Portfolios
                    </div>
                    <div className="flex overflow-hidden">
                        <motion.div
                            animate={{ x: ['0%', '-50%'] }}
                            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                            className="flex items-center gap-12 whitespace-nowrap shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                        >
                            {[...partnerLogos, ...partnerLogos].map((name, i) => (
                                <span key={i} className="text-sm sm:text-base font-bold font-mono text-slate-300 tracking-wider">
                                    {name}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuraTestimonials;
