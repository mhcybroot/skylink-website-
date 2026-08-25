import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Headphones, 
    Database, 
    ShieldCheck, 
    Zap, 
    Globe, 
    Users, 
    TrendingUp, 
    MessageSquare, 
    FileText, 
    CheckCircle2, 
    ArrowRight, 
    Server, 
    Cpu, 
    Sparkles, 
    Clock, 
    ChevronDown,
    Building2,
    Shield,
    Play
} from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../components/UI/AnimatedCounter';
import VideoModal from '../components/UI/VideoModal';
import CyberBackground from '../components/UI/CyberBackground';
import nocOperationsImg from '../assets/noc-operations.jpg';
import cxBg from '../assets/Photos/DSC05848.jpg';

const itesStats = [
    { value: '24/7/365', label: 'Follow-the-Sun Operations', detail: 'Round-the-clock multilingual coverage' },
    { value: '99.98%', label: 'Order & Data Accuracy', detail: 'Multi-tiered human + AI verification' },
    { value: '< 45s', label: 'Average Response Time', detail: 'Real-time live queue dispatch' },
    { value: '40%+', label: 'OpEx Cost Reduction', detail: 'Scalable institutional resource pods' }
];

const itesPillars = [
    {
        id: 'cx',
        title: 'Omni-Channel Customer Experience (CX)',
        category: 'Tier-1 to Tier-3 Support',
        icon: Headphones,
        description: 'Delivering exceptional customer journeys across voice, live chat, email, SMS, and in-app ticketing with empathy and high first-contact resolution (FCR).',
        highlights: ['24/7 Inbound & Outbound Voice', 'Live Chat & Instant Messaging', 'VIP Tier-3 Technical Helpdesk', 'CSAT & NPS Optimization']
    },
    {
        id: 'data',
        title: 'High-Volume Data Processing & QA',
        category: 'Information Management',
        icon: Database,
        description: 'Accurate, high-velocity data extraction, optical verification, catalog enrichment, and database scrubbing with double-blind QA checks.',
        highlights: ['Geotagged Metadata Validation', 'Mortgage & Legal Document Indexing', 'E-Commerce Catalog Moderation', 'AI Model Training & Annotation']
    },
    {
        id: 'backoffice',
        title: 'Back-Office Operations & Workflow Support',
        category: 'Business Operations',
        icon: FileText,
        description: 'End-to-end back-office execution for underwriting, insurance claims, transaction reconciliation, order validation, and compliance tracking.',
        highlights: ['Claims Processing & Reconciliation', 'Billing & Invoice Auditing', 'Order Entry & Fulfillment', 'Regulatory Reporting']
    },
    {
        id: 'techsupport',
        title: 'Managed IT Helpdesk & NOC Pods',
        category: 'Technical Operations',
        icon: Server,
        description: 'Dedicated Tier-1/2/3 technical support pods monitoring infrastructure alerts, triaging incident tickets, and managing cloud identity access.',
        highlights: ['24/7 NOC Alert Triage', 'SaaS Application Provisioning', 'Identity & Access Management', 'Patch & Escalation Management']
    }
];

const faqs = [
    {
        question: 'How quickly can Skylink ramp up a dedicated ITES / BPO squad?',
        answer: 'Depending on complexity and technical requirements, our standard onboarding timeline ranges from 7 to 14 business days, including protocol training, security provisioning, and SLA alignment.'
    },
    {
        question: 'What data security frameworks do your operating pods follow?',
        answer: 'All teams operate within secure, clean-room environments adhering to ISO 27001, SOC 2 Type II, and GDPR compliance, featuring restricted USB access, biometric check-in, and encrypted VPN tunnels.'
    },
    {
        question: 'Can you integrate with our existing CRM and ticketing software?',
        answer: 'Yes. Our squads are fluent with industry standard tools including Zendesk, Salesforce Service Cloud, Jira Service Management, Freshdesk, HubSpot, and custom client portals.'
    },
    {
        question: 'How do you structure billing for BPO and ITES engagements?',
        answer: 'We offer flexible engagement models tailored to your volume, including dedicated monthly FTE pods, shared hybrid pools, and performance-based SLA arrangements.'
    }
];

const ITESServices = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-20 px-6 font-sans relative overflow-hidden">
            <SEO
                title="Global ITES & BPO Solutions | Skylink Innovations Ltd."
                description="Scalable 24/7 IT-Enabled Services, Omni-Channel Customer Experience, Data Processing, and Back-Office Operations powered by Skylink Innovations Ltd."
            />

            {/* Cybernetic Mesh & Ambient Cyan Spotlight Background */}
            <CyberBackground glowPosition="both" meshOpacity="opacity-25" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="aura-badge mb-4">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>Global IT-Enabled Services</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                        Scalable 24/7 ITES &{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-[#5eead4]">
                            Global BPO Operations
                        </span>
                    </h1>
                    <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
                        Extend your operational capacity with dedicated, certified engineering and customer support pods operating around the clock with guaranteed SLAs.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact" className="btn-aura-primary w-full sm:w-auto">
                            <span>Request Dedicated Squad Proposal</span>
                            <ArrowRight size={16} />
                        </Link>
                        <a href="#services-grid" className="btn-aura-secondary w-full sm:w-auto">
                            Explore ITES Capabilities
                        </a>
                    </div>
                </div>

                {/* Metrics Bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl bg-zinc-950/70 border border-white/10 mb-28 shadow-2xl">
                    {itesStats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00E5BE] font-mono mb-1">
                                <AnimatedCounter value={stat.value} duration={1.5} />
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

                {/* 24/7 Advantage Showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
                    <div className="lg:col-span-6">
                        <div className="aura-badge mb-4">
                            <Globe size={14} className="text-[#00E5BE]" />
                            <span>Global Delivery Network</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                            Seamless operational continuity across every time zone.
                        </h2>
                        <p className="text-slate-300 text-base leading-relaxed mb-6">
                            In today's fast-moving market, business velocity cannot pause overnight. Skylink Innovations Ltd provides an uninterrupted extension of your organization, handling client interactions, data pipelines, and IT escalations seamlessly.
                        </p>
                        <ul className="space-y-3.5 text-sm text-slate-300">
                            <li className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-[#00E5BE] shrink-0" />
                                <span><strong>Follow-the-Sun Delivery:</strong> Continuous 24/7/365 coverage without handover lag</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-[#00E5BE] shrink-0" />
                                <span><strong>SOC 2 & ISO 27001 Certified:</strong> Clean-room facilities and encrypted data handling</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-[#00E5BE] shrink-0" />
                                <span><strong>AI-Augmented QA:</strong> Dual automated and supervisor auditing on every interaction</span>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-6">
                        <div className="aura-glass-card p-3 overflow-hidden rounded-3xl border border-white/15 bg-zinc-950 relative group shadow-2xl">
                            <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-2xl">
                                <img
                                    src={nocOperationsImg}
                                    alt="Skylink ITES & 24/7 NOC Command Center"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                                
                                {/* Centered Play Button */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    <button
                                        onClick={() => setIsVideoOpen(true)}
                                        className="w-16 h-16 rounded-full bg-[#00E5BE] text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,229,190,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 group/btn mb-3"
                                        aria-label="Watch 24/7 NOC Command Walkthrough"
                                    >
                                        <Play size={22} className="fill-black ml-1 group-hover/btn:scale-110 transition-transform" />
                                    </button>
                                    <span className="text-sm font-bold text-white tracking-wide drop-shadow-md">
                                        Watch Global NOC Tour
                                    </span>
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                                    <div>
                                        <div className="text-[11px] font-mono uppercase text-[#00E5BE] font-bold">Active Delivery Centers</div>
                                        <div className="text-xs font-semibold text-white">North America & Global Hubs</div>
                                    </div>
                                    <span className="px-2.5 py-0.5 rounded-full bg-[#00E5BE]/20 text-[#00E5BE] text-[11px] font-mono font-bold">
                                        LIVE 24/7/365
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Core Capabilities Grid */}
                <div id="services-grid" className="mb-28">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="aura-badge mb-3">
                            <Cpu size={14} className="text-[#00E5BE]" />
                            <span>Service Catalog</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
                            Tailored IT-Enabled Solutions
                        </h2>
                        <p className="text-slate-400 text-base sm:text-lg">
                            Engineered to accelerate performance, optimize cost structures, and elevate quality metrics.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {itesPillars.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={service.id}
                                    className="aura-glass-card p-8 md:p-10 bg-zinc-950/70 border border-white/10 hover:border-[#00E5BE]/40 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] shadow-aura-sm group-hover:bg-[#00E5BE]/20 transition-colors">
                                                <Icon size={22} />
                                            </div>
                                            <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                                                {service.category}
                                            </span>
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#00E5BE] transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                            {service.description}
                                        </p>
                                    </div>

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-6 border-t border-white/5 text-xs text-slate-300">
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

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto mb-28">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                            Frequently Asked Questions
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Everything you need to know about partnering with our global ITES delivery pods.
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
                            <span>Empower Your Operations</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
                            Ready to scale your business operations?
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                            Partner with Skylink Innovations Ltd for 24/7 high-accuracy IT-enabled services, customer experience excellence, and data workflows.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="btn-aura-primary w-full sm:w-auto">
                                <span>Schedule a Technical Consultation</span>
                                <ArrowRight size={16} />
                            </Link>
                            <Link to="/contact" className="btn-aura-secondary w-full sm:w-auto">
                                <span>Get Custom Pricing</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Showcase Modal */}
            <VideoModal
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                videoId="ynUjJ1yVBlA"
                title="24/7 ITES & Global Network Operations Center (NOC) Tour"
            />
        </div>
    );
};

export default ITESServices;
