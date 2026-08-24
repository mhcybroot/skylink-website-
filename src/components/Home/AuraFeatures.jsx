import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Building2,
    Code2, 
    Cloud, 
    Headphones, 
    ShieldCheck, 
    BarChart3, 
    Compass, 
    ArrowUpRight, 
    Sparkles, 
    Check,
    MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const coreServices = [
    {
        id: 'property-usa',
        title: 'Nationwide US Property Preservation',
        category: 'Physical Asset Management',
        description: 'Comprehensive property preservation, inspection, and REO asset management across all 50 US states with real-time photographic audit verification and military precision.',
        icon: Building2,
        badge: 'All 50 US States',
        colSpan: 'md:col-span-2 lg:col-span-2',
        highlights: [
            'Pre-foreclosure, Occupancy & REO Inspections',
            'Hazard Mitigation, Securing & Winterization',
            'Full Rehab Oversight & Debris Removal',
            'Geotagged Real-Time Photo Documentation'
        ],
        link: '/property',
        featured: true
    },
    {
        id: 'software',
        title: 'Custom Software & App Development',
        category: 'Engineering & Apps',
        description: "Off-the-shelf software doesn't always fit. We design, build, and deploy custom web and mobile applications tailored to your exact operational requirements, ensuring seamless user experiences and high performance.",
        icon: Code2,
        badge: 'Bespoke Engineering',
        colSpan: 'md:col-span-1 lg:col-span-1',
        highlights: ['Full-stack Web & Mobile Apps', 'API & Microservices Architecture', 'Enterprise System Modernization'],
        link: '/services/software-development'
    },
    {
        id: 'cloud',
        title: 'Cloud Infrastructure & Migration',
        category: 'Cloud & Scale',
        description: 'Scale your business securely. We guide organizations through seamless transitions to cloud environments (AWS, Microsoft Azure, Google Cloud), offering cloud architecture design, migration, and ongoing management.',
        icon: Cloud,
        badge: 'AWS / Azure / GCP',
        colSpan: 'md:col-span-1 lg:col-span-1',
        highlights: ['Cloud Migration & Deployment', 'Zero-Downtime Transition', 'Cost & Resource Optimization'],
        link: '/services/cloud-infrastructure'
    },
    {
        id: 'managed-it',
        title: 'Managed IT Services & Support',
        category: '24/7 Operations',
        description: 'Focus on your core business while we handle your technology. We provide 24/7 proactive system monitoring, helpdesk support, and network management to ensure zero downtime and peak operational efficiency.',
        icon: Headphones,
        badge: 'Zero Downtime',
        colSpan: 'md:col-span-1 lg:col-span-1',
        highlights: ['24/7 Proactive Monitoring', 'Enterprise Helpdesk & Support', 'Network & Server Administration'],
        link: '/services/managed-it'
    },
    {
        id: 'cybersecurity',
        title: 'Cybersecurity & Compliance',
        category: 'Threat Defense',
        description: 'Protect your most valuable assets. Our comprehensive security frameworks include threat monitoring, vulnerability assessments, data encryption, and compliance management to safeguard your business against evolving digital threats.',
        icon: ShieldCheck,
        badge: 'Bank-Grade Defense',
        colSpan: 'md:col-span-1 lg:col-span-1',
        highlights: ['Threat Monitoring & Mitigation', 'Vulnerability & Pen Testing', 'Regulatory Compliance & Encryption'],
        link: '/services/cybersecurity'
    },
    {
        id: 'analytics',
        title: 'Data Analytics & Business Intelligence',
        category: 'Data & Insights',
        description: 'Turn raw data into actionable insights. We implement advanced analytics and reporting dashboards that help leadership teams make informed, data-driven decisions.',
        icon: BarChart3,
        badge: 'Actionable BI',
        colSpan: 'md:col-span-1 lg:col-span-1',
        highlights: ['Executive BI Dashboards', 'Predictive Modeling & Pipelines', 'Real-time Telemetry & KPIs'],
        link: '/services/data-analytics'
    },
    {
        id: 'consulting',
        title: 'IT Consulting & Strategy',
        category: 'Strategic Roadmaps',
        description: 'Align your technology with your business goals. Our consultants analyze your current infrastructure, identify bottlenecks, and develop a comprehensive digital roadmap for future growth.',
        icon: Compass,
        badge: 'Digital Roadmap',
        colSpan: 'md:col-span-2 lg:col-span-2',
        highlights: ['Infrastructure Audits & ROI', 'Architecture Planning', 'Legacy Optimization'],
        link: '/services/it-consulting'
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
                        <span>Comprehensive Service Portfolio</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Enterprise Solutions &{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                            US Property Preservation
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        Unifying cutting-edge digital IT-enabled solutions with nationwide US field property preservation and institutional asset management.
                    </p>
                </div>

                {/* Services Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coreServices.map((service) => {
                        const Icon = service.icon;
                        const isHovered = hoveredService === service.id;

                        return (
                            <motion.div
                                key={service.id}
                                onMouseEnter={() => setHoveredService(service.id)}
                                onMouseLeave={() => setHoveredService(null)}
                                className={`aura-glass-card p-8 md:p-10 flex flex-col justify-between group relative overflow-hidden bg-zinc-950/60 transition-all duration-300 ${
                                    service.colSpan || ''
                                } ${
                                    service.featured 
                                        ? 'border-[#00E5BE]/40 shadow-[0_0_35px_rgba(0,229,190,0.12)]' 
                                        : 'hover:border-[#00E5BE]/30'
                                }`}
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
                                        <span className={`text-[11px] font-mono tracking-wider uppercase px-3 py-1 rounded-full border ${
                                            service.featured
                                                ? 'bg-[#00E5BE]/15 border-[#00E5BE]/40 text-[#00E5BE]'
                                                : 'bg-white/5 border-white/10 text-slate-300'
                                        }`}>
                                            {service.badge}
                                        </span>
                                    </div>

                                    {/* Category & Title */}
                                    <div className="text-xs font-semibold text-[#00E5BE] uppercase tracking-wider mb-2">
                                        {service.category}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#00E5BE] transition-colors leading-snug">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* Highlights list */}
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
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
                                        <span>Explore capability</span>
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
