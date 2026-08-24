import { motion } from 'framer-motion';
import { Sparkles, Sliders, Award, Lock, Handshake, CheckCircle2 } from 'lucide-react';

const pillars = [
    {
        number: '01',
        title: 'Tailored Agility',
        tag: 'Architected for You',
        description: 'We do not believe in one-size-fits-all. Every solution is architected specifically for your industry, scale, and operational goals.',
        icon: Sliders
    },
    {
        number: '02',
        title: 'Elite Expertise',
        tag: 'Certified Talent',
        description: 'Our talent pool consists of certified engineers, developers, and strategists with deep domain knowledge across multiple technology stacks.',
        icon: Award
    },
    {
        number: '03',
        title: 'Uncompromising Security',
        tag: 'Foundation First',
        description: 'We build security into the foundation of every project, ensuring your data, employees, and customers remain fully protected.',
        icon: Lock
    },
    {
        number: '04',
        title: 'Long-Term Partnership',
        tag: 'Continuous Growth',
        description: 'We measure our success by your growth. We provide continuous support, iterative improvements, and strategic guidance long after the initial deployment.',
        icon: Handshake
    }
];

const AuraWhyChoose = () => {
    return (
        <section id="why-choose-us" className="relative py-28 md:py-36 bg-black text-white px-6 overflow-hidden border-t border-white/[0.06]">
            {/* Ambient Radial Spotlight */}
            <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#00E5BE]/5 rounded-full blur-[150px] pointer-events-none -z-0" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="aura-badge mb-4">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>The Skylink Advantage</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Why Choose{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                            Skylink Innovations?
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        We blend technical engineering mastery with business acumen to deliver enduring competitive advantage.
                    </p>
                </div>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillars.map((pillar, idx) => {
                        const Icon = pillar.icon;

                        return (
                            <div
                                key={idx}
                                className="aura-glass-card p-8 md:p-10 flex flex-col justify-between relative group hover:border-[#00E5BE]/40 transition-all duration-300 bg-zinc-950/60"
                            >
                                <div>
                                    {/* Number & Icon */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] group-hover:bg-[#00E5BE]/20 transition-colors shadow-aura-sm">
                                            <Icon size={22} />
                                        </div>
                                        <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-[#00E5BE] transition-colors">
                                            {pillar.number}
                                        </span>
                                    </div>

                                    {/* Tag */}
                                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#00E5BE] mb-2">
                                        {pillar.tag}
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00E5BE] transition-colors">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>

                                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-1.5 text-xs text-slate-400">
                                    <CheckCircle2 size={13} className="text-[#00E5BE]" />
                                    <span>Institutional Standard</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AuraWhyChoose;
