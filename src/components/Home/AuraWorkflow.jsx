import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, CheckCircle2, Sliders, Rocket, ShieldCheck, Code, Cpu } from 'lucide-react';

const steps = [
    {
        number: '01',
        title: 'Discovery & Architecture Planning',
        tag: 'Strategy',
        description: 'We analyze your current technological landscape, identify operational bottlenecks, and architect a customized digital roadmap aligned with your business objectives.',
        icon: Layers,
        metrics: 'Tailored Solution Scope'
    },
    {
        number: '02',
        title: 'Agile Development & Cloud Build',
        tag: 'Engineering',
        description: 'Our certified engineers build robust applications and configure scalable cloud infrastructure through transparent sprint cycles and continuous integration.',
        icon: Code,
        metrics: 'Bi-weekly sprint demos'
    },
    {
        number: '03',
        title: 'Security & Compliance Auditing',
        tag: 'Validation',
        description: 'Every deliverable undergoes multi-tier security testing, vulnerability scanning, code reviews, and regulatory compliance checks prior to production release.',
        icon: ShieldCheck,
        metrics: 'Zero vulnerability release'
    },
    {
        number: '04',
        title: '24/7 Managed Ops & Support',
        tag: 'Lifecycle',
        description: 'We handle ongoing proactive system monitoring, network administration, and helpdesk support, guaranteeing peak operational efficiency and zero downtime.',
        icon: Rocket,
        metrics: '99.99% Availability SLA'
    }
];

const AuraWorkflow = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section id="how-it-works" className="relative py-28 md:py-36 bg-black text-white px-6 overflow-hidden border-t border-white/[0.06]">
            {/* Ambient Radial Spotlight */}
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#00E5BE]/5 rounded-full blur-[140px] pointer-events-none -z-0" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="aura-badge mb-4">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>Execution Methodology</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                        From strategy to deployment in{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                            four disciplined phases
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        A proven development and operational framework engineered to deliver high-performance IT solutions on time and on budget.
                    </p>
                </div>

                {/* Grid of Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        const isCurrent = activeStep === idx;

                        return (
                            <div
                                key={idx}
                                onClick={() => setActiveStep(idx)}
                                className={`aura-glass-card p-8 cursor-pointer relative transition-all duration-300 flex flex-col justify-between ${
                                    isCurrent
                                        ? 'border-[#00E5BE]/50 bg-white/[0.05] shadow-[0_0_30px_rgba(0,229,190,0.12)]'
                                        : 'hover:border-white/20'
                                }`}
                            >
                                <div>
                                    {/* Step Number & Tag */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className={`text-2xl font-mono font-bold tracking-tighter ${
                                            isCurrent ? 'text-[#00E5BE]' : 'text-slate-500'
                                        }`}>
                                            {step.number}
                                        </span>
                                        <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                                            {step.tag}
                                        </span>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Bottom Metric Indicator */}
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                                    <span className="text-[#00E5BE] font-mono font-medium">{step.metrics}</span>
                                    <div className={`w-2 h-2 rounded-full transition-all ${
                                        isCurrent ? 'bg-[#00E5BE] shadow-aura-sm' : 'bg-slate-700'
                                    }`} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Active Step Showcase Banner */}
                <div className="aura-glass-card p-8 md:p-12 relative overflow-hidden bg-gradient-to-r from-zinc-950 via-black to-zinc-950 border border-white/10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] shrink-0 shadow-aura-sm">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <div className="text-xs font-mono uppercase tracking-widest text-[#00E5BE] mb-1">
                                    Phase {steps[activeStep].number} In Focus
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                                    {steps[activeStep].title}
                                </h4>
                                <p className="text-sm text-slate-400 max-w-2xl">
                                    {steps[activeStep].description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                            <button
                                onClick={() => setActiveStep((prev) => (prev - 1 + steps.length) % steps.length)}
                                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                                className="btn-aura-primary text-xs !py-2.5 !px-5"
                            >
                                <span>Next Phase</span>
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuraWorkflow;
