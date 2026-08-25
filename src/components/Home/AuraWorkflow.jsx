import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, CheckCircle2, Sliders, Rocket, ShieldCheck, Code, Cpu, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
    {
        number: '01',
        phase: 'PHASE ONE',
        title: 'Strategic Discovery & Architecture Audit',
        tag: 'Strategy & Scoping',
        description: 'We evaluate your infrastructure, uncover operational bottlenecks, audit legacy debt, and formulate an enterprise-grade digital transformation blueprint tailored to your business goals.',
        icon: Layers,
        deliverables: ['Tech Stack Modernization Audit', 'Target Cloud Architecture Map', 'Cost-Benefit & ROI Projections', 'Milestone-Driven Agile Plan'],
        accent: '#00E5BE'
    },
    {
        number: '02',
        phase: 'PHASE TWO',
        title: 'Agile Engineering & Cloud Infrastructure',
        tag: 'Full-Stack Execution',
        description: 'Our senior engineers construct microservices, modern frontends, and automated Infrastructure as Code (Terraform) pipelines through bi-weekly iterative sprints.',
        icon: Code,
        deliverables: ['Containerized Microservices', 'Automated CI/CD Workflows', 'High-Availability Cloud Tier', 'Live Staging Demos & Reviews'],
        accent: '#2DD4BF'
    },
    {
        number: '03',
        phase: 'PHASE THREE',
        title: 'Security Auditing & Compliance Protocol',
        tag: 'Bank-Grade QA',
        description: 'Before any code reaches production, our dedicated security and QA squad executes rigorous penetration testing, vulnerability scanning, and regulatory alignment checks.',
        icon: ShieldCheck,
        deliverables: ['Automated Penetration Tests', 'Zero-Trust IAM Verification', 'SOC 2 & ISO 27001 Readiness', 'Load & Stress Testing Audits'],
        accent: '#38BDF8'
    },
    {
        number: '04',
        phase: 'PHASE FOUR',
        title: 'Zero-Downtime Launch & 24/7 Managed Ops',
        tag: 'Continuous SRE',
        description: 'We execute zero-downtime DNS cutover and transition systems into our 24/7 Network Operations Center (NOC), delivering real-time telemetry, automated backups, and 99.99% uptime.',
        icon: Rocket,
        deliverables: ['Zero-Downtime Deployment', '24/7/365 NOC Alerting', 'Automated Daily Backups', 'Quarterly FinOps Reviews'],
        accent: '#00F5C4'
    }
];

const AuraWorkflow = () => {
    // Desktop pinned horizontal scroll target ref
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
    const xTransform = useTransform(smoothProgress, [0, 1], ["2%", "-72%"]);
    const progressWidth = useTransform(smoothProgress, [0, 1], ["5%", "100%"]);

    // Mobile vertical active state
    const [mobileActiveStep, setMobileActiveStep] = useState(0);

    return (
        <section id="how-it-works" className="relative bg-black text-white overflow-hidden border-t border-white/[0.06]">
            {/* Ambient Background Radial Glows */}
            <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#00E5BE]/5 rounded-full blur-[160px] pointer-events-none -z-0" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#38BDF8]/5 rounded-full blur-[160px] pointer-events-none -z-0" />

            {/* Subtle Grid Backdrop */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

            {/* ========================================================================= */}
            {/* DESKTOP: PINNED HORIZONTAL SCROLLING EXPERIENCE (Visible on lg and above) */}
            {/* ========================================================================= */}
            <div ref={targetRef} className="hidden lg:block relative h-[280vh]">
                <div className="sticky top-0 h-screen flex flex-col justify-between pt-24 pb-12 px-12 overflow-hidden">
                    {/* Pinned Top Bar: Header & Live Progress Cable */}
                    <div className="max-w-7xl w-full mx-auto flex items-end justify-between gap-8 mb-4">
                        <div>
                            <div className="aura-badge mb-3">
                                <Sparkles size={14} className="text-[#00E5BE]" />
                                <span>Execution Methodology</span>
                            </div>
                            <h2 className="text-3xl xl:text-4xl font-extrabold text-white">
                                Disciplined execution in{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#38BDF8]">
                                    four proven phases
                                </span>
                            </h2>
                        </div>

                        {/* Interactive Horizontal Progress Cable */}
                        <div className="w-80 flex flex-col items-end">
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                                <span>SCROLL TO ADVANCE</span>
                                <ArrowRight size={13} className="text-[#00E5BE] animate-pulse" />
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                                <motion.div
                                    style={{ width: progressWidth }}
                                    className="h-full bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-[#38BDF8] rounded-full shadow-[0_0_12px_#00E5BE]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Horizontal Sliding Cards Track */}
                    <div className="relative w-full overflow-visible py-4">
                        <motion.div
                            style={{ x: xTransform }}
                            className="flex gap-8 w-max pl-4"
                        >
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={index}
                                        className="w-[480px] xl:w-[540px] aura-glass-card p-10 bg-zinc-950/80 border border-white/10 hover:border-[#00E5BE]/40 transition-all rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-2xl group shrink-0"
                                    >
                                        {/* Corner Ambient Glow */}
                                        <div 
                                            className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                                            style={{ backgroundColor: step.accent }}
                                        />

                                        <div>
                                            {/* Phase Tag & Step Number */}
                                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                                                <div className="flex items-center gap-3">
                                                    <div 
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shadow-sm"
                                                        style={{ 
                                                            backgroundColor: `${step.accent}15`, 
                                                            borderColor: `${step.accent}40`,
                                                            color: step.accent 
                                                        }}
                                                    >
                                                        {step.number}
                                                    </div>
                                                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                                                        {step.phase}
                                                    </span>
                                                </div>
                                                <span 
                                                    className="text-xs font-mono px-3 py-1 rounded-full border bg-white/5"
                                                    style={{ borderColor: `${step.accent}40`, color: step.accent }}
                                                >
                                                    {step.tag}
                                                </span>
                                            </div>

                                            {/* Step Title & Description */}
                                            <h3 className="text-2xl font-bold text-white mb-4 leading-snug group-hover:text-[#00E5BE] transition-colors">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-slate-300 leading-relaxed mb-6">
                                                {step.description}
                                            </p>

                                            {/* Key Deliverables Bullet Pills */}
                                            <div className="space-y-2.5 pt-4 border-t border-white/5">
                                                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                                                    Key Milestones:
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {step.deliverables.map((d, i) => (
                                                        <div 
                                                            key={i} 
                                                            className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-slate-300"
                                                        >
                                                            <CheckCircle2 size={13} className="text-[#00E5BE] shrink-0" />
                                                            <span className="truncate">{d}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Action Footer */}
                                        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                                            <span>Skylink QA Protocol</span>
                                            <span className="text-[#00E5BE] flex items-center gap-1 font-semibold">
                                                Active Framework <ChevronRight size={13} />
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Footer Nav Bar in Sticky View */}
                    <div className="max-w-7xl w-full mx-auto flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-4">
                        <div className="flex items-center gap-6 font-mono">
                            <span>01 / DISCOVERY</span>
                            <span>02 / SPRINT</span>
                            <span>03 / AUDIT</span>
                            <span>04 / LAUNCH</span>
                        </div>
                        <Link to="/contact" className="text-[#00E5BE] hover:underline flex items-center gap-1 font-semibold">
                            <span>Initiate Discovery Consultation</span>
                            <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* ======================================================================= */}
            {/* MOBILE & TABLET: RESPONSIVE VERTICAL TIMELINE WITH GLOWING PROGRESS CABLE */}
            {/* ======================================================================= */}
            <div className="lg:hidden py-20 px-6 max-w-3xl mx-auto">
                <div className="text-center mb-14">
                    <div className="aura-badge mb-3 mx-auto">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>Execution Methodology</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-4">
                        Disciplined execution in{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                            four phases
                        </span>
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Tap any milestone below to inspect our delivery framework.
                    </p>
                </div>

                {/* Vertical Cable & Cards */}
                <div className="relative pl-6 border-l-2 border-white/10 space-y-6">
                    {steps.map((step, index) => {
                        const isSelected = mobileActiveStep === index;
                        return (
                            <div key={index} className="relative">
                                {/* Glowing Dot on Timeline Line */}
                                <button
                                    onClick={() => setMobileActiveStep(index)}
                                    className={`absolute -left-[31px] top-4 w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                                        isSelected
                                            ? 'bg-[#00E5BE] border-[#00E5BE] shadow-[0_0_12px_#00E5BE]'
                                            : 'bg-black border-white/30'
                                    }`}
                                >
                                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                                </button>

                                <div
                                    onClick={() => setMobileActiveStep(index)}
                                    className={`aura-glass-card p-6 bg-zinc-950/70 border transition-all cursor-pointer ${
                                        isSelected 
                                            ? 'border-[#00E5BE]/50 shadow-aura-sm bg-zinc-950' 
                                            : 'border-white/10'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-mono font-bold text-[#00E5BE]">
                                            STEP {step.number} • {step.phase}
                                        </span>
                                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                                            {step.tag}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                                        {step.description}
                                    </p>

                                    {isSelected && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="space-y-2 pt-3 border-t border-white/10"
                                        >
                                            <div className="text-[11px] font-mono uppercase text-slate-400">
                                                Key Deliverables:
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                                {step.deliverables.map((d, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                                                        <CheckCircle2 size={12} className="text-[#00E5BE] shrink-0" />
                                                        <span>{d}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AuraWorkflow;
