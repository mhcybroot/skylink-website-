import { motion } from 'framer-motion';
import { 
    Cloud, 
    Code2, 
    ShieldCheck, 
    Database, 
    Cpu, 
    Layers, 
    Server, 
    Lock, 
    CheckCircle2, 
    Sparkles, 
    Activity, 
    Compass, 
    Building2, 
    Check,
    Terminal,
    Zap
} from 'lucide-react';

const row1Items = [
    { label: 'AWS Multi-Cloud Architecture', icon: Cloud, category: 'Infrastructure' },
    { label: 'Microsoft Azure Enterprise', icon: Server, category: 'Cloud' },
    { label: 'Google Cloud Platform (GCP)', icon: Cloud, category: 'Big Data' },
    { label: 'Kubernetes Container Orchestration', icon: Layers, category: 'DevOps' },
    { label: 'React & Next.js Micro-Frontends', icon: Code2, category: 'Full-Stack' },
    { label: 'Python & FastAPI Microservices', icon: Terminal, category: 'Backend' },
    { label: 'Snowflake & BigQuery BI Lakes', icon: Database, category: 'Analytics' },
    { label: 'Terraform Infrastructure as Code', icon: Cpu, category: 'Automation' },
    { label: 'Datadog 24/7/365 NOC Telemetry', icon: Activity, category: 'Monitoring' },
    { label: 'Zero-Trust Bank-Grade Security', icon: Lock, category: 'Cybersecurity' }
];

const row2Items = [
    { label: 'All 50 US States Property Coverage', icon: Building2, category: 'Preservation' },
    { label: 'HUD & FHA Guidelines Compliant', icon: ShieldCheck, category: 'Compliance' },
    { label: 'Fannie Mae & Freddie Mac Standards', icon: CheckCircle2, category: 'Investor SLA' },
    { label: 'Real-Time Geotagged Photo Audits', icon: Zap, category: 'Field QA' },
    { label: '24/7 Emergency Hazard Containment', icon: Activity, category: 'Rapid SLA' },
    { label: 'Full Asset Rehab & Debris Removal', icon: Building2, category: 'Turnkey' },
    { label: '99.99% Cloud Availability SLA', icon: Sparkles, category: 'SRE Guarantee' },
    { label: 'SOC 2 Type II & ISO 27001 Ready', icon: Lock, category: 'Security' },
    { label: 'Zero-Downtime Data Migration', icon: Server, category: 'Migration' },
    { label: 'Custom Enterprise Order Portals', icon: Code2, category: 'PropTech' }
];

const TechMarquee = () => {
    return (
        <section className="relative py-12 bg-black border-y border-white/[0.06] overflow-hidden select-none">
            {/* Background Ambient Spotlights */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[150px] bg-[#00E5BE]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[150px] bg-[#2DD4BF]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Viewport Edge Gradient Fade Masks */}
            <div className="absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

            <div className="space-y-4">
                {/* Row 1: Leftward Glide */}
                <div className="flex overflow-hidden group">
                    <motion.div
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{
                            duration: 32,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                        className="flex shrink-0 items-center gap-4 group-hover:[animation-play-state:paused]"
                    >
                        {[...row1Items, ...row1Items].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#00E5BE]/40 hover:bg-white/[0.07] transition-all shrink-0 cursor-default"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] shrink-0">
                                        <Icon size={13} />
                                    </div>
                                    <span className="text-xs font-semibold text-white whitespace-nowrap">
                                        {item.label}
                                    </span>
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">
                                        {item.category}
                                    </span>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Row 2: Rightward Glide */}
                <div className="flex overflow-hidden group">
                    <motion.div
                        animate={{ x: ['-50%', '0%'] }}
                        transition={{
                            duration: 36,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                        className="flex shrink-0 items-center gap-4 group-hover:[animation-play-state:paused]"
                    >
                        {[...row2Items, ...row2Items].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#00E5BE]/40 hover:bg-white/[0.07] transition-all shrink-0 cursor-default"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 flex items-center justify-center text-[#2DD4BF] shrink-0">
                                        <Icon size={13} />
                                    </div>
                                    <span className="text-xs font-semibold text-white whitespace-nowrap">
                                        {item.label}
                                    </span>
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#00E5BE] bg-[#00E5BE]/10 px-2 py-0.5 rounded-full">
                                        {item.category}
                                    </span>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TechMarquee;
