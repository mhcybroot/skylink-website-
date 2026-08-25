import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Sparkles, 
    ArrowRight, 
    Layers, 
    CheckCircle2, 
    Rocket, 
    ShieldCheck, 
    Code, 
    ChevronRight, 
    ChevronLeft,
    Check,
    Cpu,
    Lock,
    Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CyberBackground from '../UI/CyberBackground';

const steps = [
    {
        number: '01',
        phase: 'PHASE ONE',
        title: 'Strategic Discovery & Architecture Audit',
        tag: 'Strategy & Scoping',
        description: 'We analyze your existing infrastructure, uncover operational bottlenecks, audit technical debt, and formulate an enterprise-grade digital roadmap aligned with your business objectives.',
        icon: Layers,
        deliverables: [
            'Tech Stack Modernization Audit',
            'Target Multi-Cloud Architecture Map',
            'FinOps Cost-Benefit & ROI Analysis',
            'Milestone-Driven Agile Delivery Plan'
        ],
        badge: 'Zero Vendor Lock-In',
        accent: '#00E5BE'
    },
    {
        number: '02',
        phase: 'PHASE TWO',
        title: 'Agile Engineering & Cloud Infrastructure',
        tag: 'Full-Stack Execution',
        description: 'Our senior engineers construct microservices, modern web frontends, and automated Infrastructure as Code (Terraform) pipelines through bi-weekly iterative sprints.',
        icon: Code,
        deliverables: [
            'Containerized Microservices Architecture',
            'Automated CI/CD Deployment Workflows',
            'High-Availability Cloud Tier (AWS/Azure/GCP)',
            'Bi-Weekly Staging Demos & Code Reviews'
        ],
        badge: 'Bi-Weekly Sprint Demos',
        accent: '#2DD4BF'
    },
    {
        number: '03',
        phase: 'PHASE THREE',
        title: 'Security Auditing & Compliance Protocol',
        tag: 'Bank-Grade QA',
        description: 'Before any code reaches production, our dedicated security and QA squad executes rigorous penetration testing, vulnerability scanning, and regulatory alignment checks.',
        icon: ShieldCheck,
        deliverables: [
            'Automated Penetration & Vulnerability Tests',
            'Zero-Trust IAM & Access Control Audits',
            'SOC 2 Type II & ISO 27001 Readiness',
            'High-Throughput Load & Stress Testing'
        ],
        badge: 'Zero Vulnerability Release',
        accent: '#38BDF8'
    },
    {
        number: '04',
        phase: 'PHASE FOUR',
        title: 'Zero-Downtime Launch & 24/7 Managed Ops',
        tag: 'Continuous SRE',
        description: 'We execute zero-downtime DNS cutover and transition systems into our 24/7 Network Operations Center (NOC), delivering real-time telemetry, automated backups, and 99.99% uptime.',
        icon: Rocket,
        deliverables: [
            'Zero-Downtime Live Traffic Migration',
            '24/7/365 Proactive NOC Alert Monitoring',
            'Automated Daily Immutable Backups',
            'Continuous FinOps Cost Optimization'
        ],
        badge: '99.99% Availability SLA',
        accent: '#00F5C4'
    }
];

const AuraWorkflow = () => {
    const [activeStep, setActiveStep] = useState(0);
    const trackRef = useRef(null);

    const nextStep = () => {
        setActiveStep((prev) => (prev + 1) % steps.length);
    };

    const prevStep = () => {
        setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
    };

    // Handle horizontal mousewheel scroll over the section
    const handleWheel = (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            // Native horizontal trackpad scrolling
            return;
        }
        // If vertical scroll with shift or hovering cards
        if (e.shiftKey) {
            if (e.deltaY > 20) nextStep();
            else if (e.deltaY < -20) prevStep();
        }
    };

    const currentStep = steps[activeStep];
    const Icon = currentStep.icon;

    return (
        <section 
            id="how-it-works" 
            onWheel={handleWheel}
            className="relative py-24 md:py-32 bg-black text-white px-6 overflow-hidden border-t border-white/[0.06]"
        >
            {/* Cybernetic Neural Synapse & Ambient Cyan Spotlight Background */}
            <CyberBackground variant="synapse" glowPosition="both" meshOpacity="opacity-25" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header with Title & Navigation Controls */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="aura-badge mb-3">
                            <Sparkles size={14} className="text-[#00E5BE]" />
                            <span>Execution Methodology</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
                            Disciplined execution in{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-[#38BDF8]">
                                four proven phases
                            </span>
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                            From initial discovery to continuous 24/7 site reliability engineering, our disciplined agile lifecycle guarantees predictability, bank-grade security, and zero downtime.
                        </p>
                    </div>

                    {/* Step Navigation Arrows & Progress */}
                    <div className="flex items-center gap-4 shrink-0">
                        <div className="text-xs font-mono text-slate-400">
                            <span className="text-white font-bold text-base">0{activeStep + 1}</span>
                            <span className="text-slate-600"> / 04</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={prevStep}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#00E5BE]/40 transition-all active:scale-95"
                                aria-label="Previous Phase"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={nextStep}
                                className="w-10 h-10 rounded-full bg-[#00E5BE] text-black flex items-center justify-center font-bold hover:brightness-110 shadow-aura-sm transition-all active:scale-95"
                                aria-label="Next Phase"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Horizontal Phase Tabs Switcher */}
                <div className="mb-10 pb-2 overflow-x-auto scrollbar-none">
                    <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 w-max min-w-full sm:min-w-0">
                        {steps.map((step, idx) => {
                            const isSelected = activeStep === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveStep(idx)}
                                    className={`flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 relative whitespace-nowrap ${
                                        isSelected
                                            ? 'bg-white/10 text-white shadow-aura-sm border border-white/15'
                                            : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                                    }`}
                                >
                                    <span 
                                        className={`font-mono text-xs px-2 py-0.5 rounded-md border ${
                                            isSelected 
                                                ? 'bg-[#00E5BE] text-black border-[#00E5BE] font-bold' 
                                                : 'bg-white/5 text-slate-400 border-white/10'
                                        }`}
                                    >
                                        {step.number}
                                    </span>
                                    <span>{step.phase}</span>
                                    {isSelected && (
                                        <motion.div
                                            layoutId="activePhaseGlow"
                                            className="absolute inset-0 rounded-xl border-2 border-[#00E5BE]/50 pointer-events-none"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Horizontal Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-10 relative">
                    <motion.div
                        animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-[#38BDF8] rounded-full shadow-[0_0_12px_#00E5BE]"
                    />
                </div>

                {/* Active Phase Cinematic Showcase Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -25 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="aura-glass-card p-8 md:p-12 bg-zinc-950/80 border border-white/15 rounded-3xl relative overflow-hidden shadow-2xl"
                    >
                        {/* Corner Ambient Glow */}
                        <div 
                            className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-25"
                            style={{ backgroundColor: currentStep.accent }}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            {/* Left Column: Description & Strategic Scope */}
                            <div className="lg:col-span-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <div 
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-base border shadow-sm"
                                        style={{ 
                                            backgroundColor: `${currentStep.accent}15`, 
                                            borderColor: `${currentStep.accent}40`,
                                            color: currentStep.accent 
                                        }}
                                    >
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <span className="text-xs font-mono uppercase tracking-widest text-[#00E5BE] font-bold">
                                            {currentStep.phase} • {currentStep.tag}
                                        </span>
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                                            {currentStep.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 mt-4">
                                    {currentStep.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-4">
                                    <Link 
                                        to="/contact" 
                                        className="btn-aura-primary !py-3 !px-6 text-xs sm:text-sm"
                                    >
                                        <span>Initiate {currentStep.phase}</span>
                                        <ArrowRight size={14} />
                                    </Link>
                                    <span 
                                        className="text-xs font-mono px-3.5 py-2 rounded-full border bg-white/5 font-semibold"
                                        style={{ borderColor: `${currentStep.accent}40`, color: currentStep.accent }}
                                    >
                                        {currentStep.badge}
                                    </span>
                                </div>
                            </div>

                            {/* Right Column: Deliverables Matrix Card */}
                            <div className="lg:col-span-5">
                                <div className="p-6 md:p-8 rounded-2xl bg-black/60 border border-white/10 shadow-inner">
                                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                                            Key Deliverables & Artifacts
                                        </span>
                                        <span className="text-[11px] font-mono text-[#00E5BE]">
                                            VERIFIED QA
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        {currentStep.deliverables.map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00E5BE]/30 transition-all"
                                            >
                                                <div className="w-5 h-5 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] shrink-0 mt-0.5">
                                                    <Check size={12} />
                                                </div>
                                                <span className="text-xs sm:text-sm text-slate-200 font-medium leading-tight">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                                        <span>Skylink Institutional Framework</span>
                                        <span className="text-[#00E5BE]">Continuous Protocol</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Bottom 4-Step Summary Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {steps.map((step, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveStep(idx)}
                            className={`p-4 rounded-2xl text-left border transition-all ${
                                activeStep === idx
                                    ? 'bg-[#00E5BE]/10 border-[#00E5BE]/40 shadow-aura-sm'
                                    : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                            }`}
                        >
                            <div className="text-xs font-mono font-bold text-[#00E5BE] mb-1">
                                {step.number} / {step.phase}
                            </div>
                            <div className="text-xs font-bold text-white truncate">
                                {step.title}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AuraWorkflow;
