import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

const plans = [
    {
        name: 'Starter Pilot',
        badge: 'Trial / Regional',
        description: 'Ideal for evaluating regional property inspections and foundational digital back-office support.',
        priceMonthly: '$1,490',
        priceAnnual: '$1,190',
        period: '/ month',
        highlighted: false,
        features: [
            'Up to 150 inspections/month',
            'Standard 48-hour SLA',
            'Dedicated regional dispatcher',
            'Geotagged photographic reports',
            'Email & ticket support'
        ],
        ctaText: 'Start Regional Pilot',
        ctaLink: '/contact'
    },
    {
        name: 'Enterprise Growth',
        badge: 'Most Popular',
        description: 'Comprehensive nationwide coverage, 24/7 BPO pods, and accelerated turnaround for scaling portfolios.',
        priceMonthly: '$3,890',
        priceAnnual: '$3,190',
        period: '/ month',
        highlighted: true,
        features: [
            'Unlimited volume scaling',
            'Guaranteed 24-hour SLA turnaround',
            '24/7 dedicated BPO & ITES squad',
            'Full REST API & webhook sync',
            'Live telemetry dashboard access',
            'Custom quality audit scoring'
        ],
        ctaText: 'Get Started with Pro',
        ctaLink: '/contact'
    },
    {
        name: 'Custom Institutional',
        badge: 'Tailored',
        description: 'Bespoke infrastructure solutions for institutional asset managers, banks, and enterprise leaders.',
        priceMonthly: 'Custom',
        priceAnnual: 'Custom',
        period: '',
        highlighted: false,
        features: [
            'Dedicated executive operations lead',
            'Sub-12 hour emergency expedite',
            'SOC2 Type II compliance controls',
            'Custom ERP & servicing software integration',
            'Quarterly strategic reviews'
        ],
        ctaText: 'Contact Enterprise Team',
        ctaLink: '/contact'
    }
];

const AuraPricing = () => {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <section id="pricing" className="relative py-28 md:py-36 bg-black text-white px-6 overflow-hidden border-t border-white/[0.06]">
            {/* Ambient Radial Spotlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5BE]/5 rounded-full blur-[150px] pointer-events-none -z-0" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="aura-badge mb-4">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>Transparent Engagement</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Predictable pricing,{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                            uncompromising quality
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
                        Select an engagement model tailored to your portfolio size, SLA demands, and digital operations requirements.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-white/5 border border-white/10">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                                !isAnnual ? 'bg-[#00E5BE] text-black shadow-aura-sm' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Monthly Billing
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                                isAnnual ? 'bg-[#00E5BE] text-black shadow-aura-sm' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <span>Annual Billing</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/30 text-black font-bold">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`aura-glass-card p-8 md:p-10 flex flex-col justify-between relative ${
                                plan.highlighted
                                    ? 'border-[#00E5BE] bg-zinc-950/80 shadow-[0_0_40px_rgba(0,229,190,0.18)] lg:-translate-y-2'
                                    : 'border-white/10 hover:border-white/20'
                            }`}
                        >
                            {/* Popular Highlight Badge */}
                            {plan.highlighted && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00E5BE] text-black text-xs font-bold uppercase tracking-wider shadow-aura-sm">
                                    {plan.badge}
                                </div>
                            )}

                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                    {!plan.highlighted && (
                                        <span className="text-xs font-mono text-slate-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                                            {plan.badge}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs sm:text-sm text-slate-400 mb-8 min-h-[40px]">
                                    {plan.description}
                                </p>

                                {/* Price Value */}
                                <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-white/10">
                                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                                        {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                                    </span>
                                    {plan.period && (
                                        <span className="text-sm text-slate-400 font-normal">{plan.period}</span>
                                    )}
                                </div>

                                {/* Feature Checklist */}
                                <div className="space-y-3.5 mb-10">
                                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                                        Includes:
                                    </div>
                                    {plan.features.map((feat, i) => (
                                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                                            <div className="w-4 h-4 rounded-full bg-[#00E5BE]/15 flex items-center justify-center text-[#00E5BE] shrink-0 mt-0.5">
                                                <Check size={11} />
                                            </div>
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <Link
                                to={plan.ctaLink}
                                className={`w-full text-center py-3.5 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                                    plan.highlighted
                                        ? 'bg-[#00E5BE] text-black hover:brightness-110 shadow-aura'
                                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                }`}
                            >
                                <span>{plan.ctaText}</span>
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AuraPricing;
