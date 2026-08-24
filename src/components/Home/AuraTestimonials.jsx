import { motion } from 'framer-motion';
import { Sparkles, Star, Quote, CheckCircle2 } from 'lucide-react';

const testimonials = [
    {
        quote: "Skylink architected and migrated our core financial infrastructure to Azure with zero downtime. Their 24/7 managed support gives our executive team total peace of mind.",
        author: "Marcus Vance",
        role: "Chief Technology Officer",
        company: "Apex Capital Management",
        metric: "100% Zero-Downtime Migration"
    },
    {
        quote: "The custom enterprise workflow app built by Skylink consolidated 5 disjointed legacy tools into one fast, intuitive dashboard. Our team productivity soared by over 45%.",
        author: "Elena Rostova",
        role: "VP of Digital Transformation",
        company: "Vanguard Global Solutions",
        metric: "45% Productivity Gain"
    },
    {
        quote: "Their cybersecurity framework and proactive threat monitoring blocked multiple advanced exfiltration vectors. Skylink is truly an indispensable strategic technology partner.",
        author: "David Sterling",
        role: "Head of Information Security",
        company: "National Systems Group",
        metric: "SOC2 Compliance Achieved"
    }
];

const logos = [
    'Apex Financial', 'Vanguard Systems', 'Global Tech Partners', 'Summit Digital', 'National Cloud Group'
];

const AuraTestimonials = () => {
    return (
        <section className="relative py-28 md:py-36 bg-black text-white px-6 overflow-hidden border-t border-white/[0.06]">
            {/* Ambient Spotlight */}
            <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#00E5BE]/5 rounded-full blur-[140px] pointer-events-none -z-0" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="aura-badge mb-4">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>Client Endorsements</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Trusted by enterprises,{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                            verified by results
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        Here is what technology leaders and enterprise executives say about partnering with Skylink Innovations Ltd.
                    </p>
                </div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className="aura-glass-card p-8 flex flex-col justify-between relative group hover:border-[#00E5BE]/30 bg-zinc-950/60"
                        >
                            <div>
                                {/* Rating Stars & Metric Tag */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-1 text-[#00E5BE]">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className="fill-[#00E5BE]" />
                                        ))}
                                    </div>
                                    <span className="text-xs font-mono text-[#00E5BE] bg-[#00E5BE]/10 px-2.5 py-0.5 rounded-full border border-[#00E5BE]/20">
                                        {t.metric}
                                    </span>
                                </div>

                                <Quote size={24} className="text-slate-600 mb-4 opacity-50" />

                                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                                    "{t.quote}"
                                </p>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E5BE]/20 to-transparent border border-[#00E5BE]/40 flex items-center justify-center font-bold text-sm text-[#00E5BE]">
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                                        {t.author}
                                        <CheckCircle2 size={13} className="text-[#00E5BE]" />
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        {t.role}, <span className="text-slate-300">{t.company}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logo Marquee Strip */}
                <div className="pt-10 border-t border-white/5 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 hover:opacity-70 transition-opacity">
                    {logos.map((logo, idx) => (
                        <div key={idx} className="font-mono text-xs md:text-sm uppercase tracking-widest text-slate-400 font-semibold">
                            {logo}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AuraTestimonials;
