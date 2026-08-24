import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Code2, 
    Cloud, 
    Headphones, 
    ShieldCheck, 
    BarChart3, 
    Compass, 
    ArrowUpRight, 
    Sparkles, 
    Check 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const coreServices = [
    {
        id: 'software',
        title: 'Custom Software & App Development',
        category: 'Engineering & Apps',
        description: "Off-the-shelf software doesn't always fit. We design, build, and deploy custom web and mobile applications tailored to your exact operational requirements, ensuring seamless user experiences and high performance.",
        icon: Code2,
        badge: 'Bespoke Engineering',
        highlights: ['Full-stack Web & Mobile Apps', 'API & Microservices Architecture', 'Enterprise System Modernization'],
        link: '/contact'
    },
    {
        id: 'cloud',
        title: 'Cloud Infrastructure & Migration',
        category: 'Cloud & Scale',
        description: 'Scale your business securely. We guide organizations through seamless transitions to cloud environments (AWS, Microsoft Azure, Google Cloud), offering cloud architecture design, migration, and ongoing management.',
        icon: Cloud,
        badge: 'AWS / Azure / GCP',
        highlights: ['Cloud Migration & Deployment', 'Zero-Downtime Transition', 'Cost & Resource Optimization'],
        link: '/contact'
    },
    {
        id: 'managed-it',
        title: 'Managed IT Services & Support',
        category: '24/7 Operations',
        description: 'Focus on your core business while we handle your technology. We provide 24/7 proactive system monitoring, helpdesk support, and network management to ensure zero downtime and peak operational efficiency.',
        icon: Headphones,
        badge: 'Zero Downtime',
        highlights: ['24/7 Proactive Monitoring', 'Enterprise Helpdesk & Support', 'Network & Server Administration'],
        link: '/contact'
    },
    {
        id: 'cybersecurity',
        title: 'Cybersecurity & Compliance',
        category: 'Threat Defense',
        description: 'Protect your most valuable assets. Our comprehensive security frameworks include threat monitoring, vulnerability assessments, data encryption, and compliance management to safeguard your business against evolving digital threats.',
        icon: ShieldCheck,
        badge: 'Bank-Grade Defense',
        highlights: ['Threat Monitoring & Mitigation', 'Vulnerability & Pen Testing', 'Regulatory Compliance & Encryption'],
        link: '/contact'
    },
    {
        id: 'analytics',
        title: 'Data Analytics & Business Intelligence',
        category: 'Data & Insights',
        description: 'Turn raw data into actionable insights. We implement advanced analytics and reporting dashboards that help leadership teams make informed, data-driven decisions.',
        icon: BarChart3,
        badge: 'Actionable BI',
        highlights: ['Executive BI Dashboards', 'Predictive Modeling & Pipelines', 'Real-time Telemetry & KPIs'],
        link: '/contact'
    },
    {
        id: 'consulting',
        title: 'IT Consulting & Strategy',
        category: 'Strategic Roadmaps',
        description: 'Align your technology with your business goals. Our consultants analyze your current infrastructure, identify bottlenecks, and develop a comprehensive digital roadmap for future growth.',
        icon: Compass,
        badge: 'Digital Roadmap',
        highlights: ['Infrastructure Audits & ROI', 'Architecture Planning', 'Legacy Optimization'],
        link: '/contact'
    }
];

const AuraFeatures = () => {
    const [hoveredService, setHoveredService] = useState(null);

    return (
        <section id="services" className="relative py-28 md:py-36 bg-black text-white px-6 overflow-hidden border-t border-white/[0.06]">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-[#00E5BE]/5 rounded-full blur-[140px] pointer-events-none -z-0" />
            <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#00F5C4]/5 rounded-full blur-[120px] pointer-events-none -z-0" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="aura-badge mb-4">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>Comprehensive Portfolio</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Our Core{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                            IT-Enabled Services
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        We offer an end-to-end suite of IT-enabled services designed to cover every aspect of your technological ecosystem.
                    </p>
                </div>

                {/* 6 Core Services Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coreServices.map((service) => {
                        const Icon = service.icon;
                        const isHovered = hoveredService === service.id;

                        return (
                            <motion.div
                                key={service.id}
                                onMouseEnter={() => setHoveredService(service.id)}
                                onMouseLeave={() => setHoveredService(null)}
                                className="aura-glass-card p-8 md:p-10 flex flex-col justify-between group relative overflow-hidden bg-zinc-950/60 hover:border-[#00E5BE]/40 transition-all duration-300"
                            >
                                {/* Glowing Spotlight Corner on hover */}
                                <div
                                    className={`absolute -top-24 -right-24 w-48 h-48 bg-[#00E5BE] rounded-full blur-[70px] transition-opacity duration-500 pointer-events-none ${
                                        isHovered ? 'opacity-25' : 'opacity-0'
                                    }`}
                                />

                                <div>
                                    {/* Top Metadata */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] group-hover:bg-[#00E5BE]/20 transition-colors shadow-aura-sm">
                                            <Icon size={22} />
                                        </div>
                                        <span className="text-[11px] font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                                            {service.badge}
                                        </span>
                                    </div>

                                    {/* Category & Title */}
                                    <div className="text-xs font-semibold text-[#00E5BE] uppercase tracking-wider mb-2">
                                        {service.category}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00E5BE] transition-colors leading-snug">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* Highlights list */}
                                    <ul className="space-y-2 mb-8">
                                        {service.highlights.map((h, i) => (
                                            <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                                                <div className="w-4 h-4 rounded-full bg-[#00E5BE]/10 flex items-center justify-center text-[#00E5BE] shrink-0">
                                                    <Check size={10} />
                                                </div>
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Link Button */}
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <Link
                                        to={service.link}
                                        className="text-xs font-semibold uppercase tracking-wider text-slate-300 group-hover:text-white flex items-center gap-1.5 transition-colors"
                                    >
                                        <span>Consult with specialists</span>
                                        <ArrowUpRight size={14} className="text-[#00E5BE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AuraFeatures;
