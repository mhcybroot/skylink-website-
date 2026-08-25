import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShieldCheck, 
    Lock, 
    FileText, 
    CheckCircle2, 
    Server, 
    Zap, 
    Sparkles, 
    ExternalLink, 
    X, 
    Download, 
    Key, 
    Eye, 
    Building2, 
    Check,
    ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CyberBackground from '../UI/CyberBackground';

const standards = [
    {
        id: 'iso27001',
        name: 'ISO/IEC 27001:2022',
        title: 'Information Security Management System (ISMS)',
        tag: 'Global Security Standard',
        icon: Lock,
        badge: 'CERTIFIED PROCESS',
        badgeColor: 'text-[#00E5BE] bg-[#00E5BE]/10 border-[#00E5BE]/30',
        summary: 'Rigorous risk governance and security controls safeguarding enterprise data, networks, and confidential customer intellectual property.',
        highlights: [
            'End-to-End Cryptographic Protocols (AES-256 & TLS 1.3)',
            'Strict Role-Based Access Control (RBAC) & Zero-Trust Architecture',
            'Continuous Vulnerability Scanning & Third-Party Penetration Audits',
            'Annual Independent ISMS Compliance Reviews'
        ],
        specs: {
            encryption: 'AES-256-GCM / RSA-4096 / TLS 1.3',
            auditCycle: 'Quarterly Internal • Annual External',
            accessModel: 'Zero-Trust IAM + Hardware MFA',
            dataIsolation: 'Dedicated Tenant VPC Enclaves'
        }
    },
    {
        id: 'soc2',
        name: 'SOC 2 Type II Aligned',
        title: 'Trust Services Criteria: Security & Confidentiality',
        tag: 'Enterprise Cloud Trust',
        icon: ShieldCheck,
        badge: 'AUDIT READY',
        badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
        summary: 'Verifiable operational controls ensuring data confidentiality, system availability, and tamper-resistant transaction logging for US banks and enterprises.',
        highlights: [
            'Immutable Audit Trails & Centralized SIEM Log Ingestion',
            'Automated 90-Day Key & Secret Rotation Schedules',
            'Granular Employee Background Verification & Security Training',
            'Comprehensive Incident Response SLA (< 15 Minutes)'
        ],
        specs: {
            logging: 'Centralized Immutable SIEM with 1-Year Retention',
            credentialRotation: 'Automated 90-Day Policy',
            incidentSLA: '< 15 Minutes Guaranteed Response',
            perimeterDefense: 'Cloudflare Zero-Trust + Web Application Firewall'
        }
    },
    {
        id: 'hud',
        name: 'US HUD Title 24 CFR',
        title: 'Property Preservation & Mortgage Conveyance Standards',
        tag: 'US Mortgage Compliance',
        icon: Building2,
        badge: '100% COMPLIANT',
        badgeColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
        summary: 'Exhaustive adherence to HUD, Fannie Mae, Freddie Mac, and VA guidelines for national property preservation, winterization, and conveyance prep.',
        highlights: [
            'Zero Surcharge / Penalty Record for Conveyance Delivery',
            'Tamper-Proof Geotagged & EXIF-Verified Photo Audits',
            'Certified Lockbox Rekeying & Emergency Boarding Verification',
            'Live Integration with PPR, Aspen Grove, and MCS Portals'
        ],
        specs: {
            conveyanceRate: '100% First-Pass Acceptance',
            photoIntegrity: 'Embedded GPS Lat/Long & Timestamp Watermarks',
            bidAccuracy: '99.98% Pricing Matrix Adherence',
            turnaround: '< 24 Hours Emergency Dispatch'
        }
    },
    {
        id: 'sla',
        name: '99.99% Infrastructure SLA',
        title: 'High-Availability Facility & Disaster Recovery Guarantee',
        tag: 'Facility & Cloud Uptime',
        icon: Zap,
        badge: 'MISSION CRITICAL',
        badgeColor: 'text-teal-300 bg-teal-300/10 border-teal-300/30',
        summary: 'Bank-grade facility resilience at our Dhaka Headquarters with triple-redundant Tier-1 fiber and automatic dual generator power failover.',
        highlights: [
            'Dual Online UPS Systems + Automated Diesel Generator Backup',
            'Triple Redundant Tier-1 ISP Fiber Connections with BGP Routing',
            'Sub-90s Warm Standby Disaster Recovery Failover (RPO: 0s / RTO: <90s)',
            '24/7/365 On-Site Network Operations Center (NOC) Engineers'
        ],
        specs: {
            powerRedundancy: 'N+1 Online UPS + Diesel Generator Backup',
            networkBackbone: 'Triple Tier-1 Fiber ISP (BGP Auto-Failover)',
            disasterRecovery: 'RPO: 0 Seconds • RTO: < 90 Seconds',
            shiftContinuity: '24/7/365 US Night Shift Continuous Coverage'
        }
    }
];

const SecurityTrustVault = () => {
    const [selectedStandard, setSelectedStandard] = useState(null);

    return (
        <section id="compliance" className="relative py-28 md:py-36 bg-black text-white px-6 overflow-hidden border-t border-white/[0.06]">
            {/* Cyber Circuit & Ambient Glow Background */}
            <CyberBackground variant="circuit" glowPosition="center" meshOpacity="opacity-25" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="aura-badge mb-4">
                        <ShieldCheck size={14} className="text-[#00E5BE]" />
                        <span>Institutional Trust & Governance</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Enterprise Compliance &{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                            Security Trust Vault
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        We adhere to the world's most stringent financial, security, and mortgage regulatory frameworks. Explore our verified compliance standards below.
                    </p>
                </div>

                {/* 4 Standards Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {standards.map((standard) => {
                        const Icon = standard.icon;
                        return (
                            <div
                                key={standard.id}
                                onClick={() => setSelectedStandard(standard)}
                                className="aura-glass-card p-8 md:p-10 rounded-2xl border border-white/10 hover:border-[#00E5BE]/40 bg-zinc-950/70 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col justify-between"
                            >
                                <div>
                                    {/* Top Row: Icon + Badge */}
                                    <div className="flex items-center justify-between gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] group-hover:scale-105 transition-transform shadow-aura-sm">
                                            <Icon size={22} />
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${standard.badgeColor}`}>
                                            {standard.badge}
                                        </span>
                                    </div>

                                    {/* Tag & Name */}
                                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#00E5BE] mb-1.5">
                                        {standard.tag}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#00E5BE] transition-colors">
                                        {standard.name}
                                    </h3>
                                    <h4 className="text-xs font-semibold text-slate-300 mb-4 font-mono">
                                        {standard.title}
                                    </h4>

                                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                        {standard.summary}
                                    </p>

                                    {/* Key Highlight Checkmarks */}
                                    <div className="space-y-2 mb-6">
                                        {standard.highlights.slice(0, 2).map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                                                <CheckCircle2 size={13} className="text-[#00E5BE] shrink-0" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Action Strip */}
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-white transition-colors font-mono">
                                    <span>Inspect Technical Specs</span>
                                    <span className="flex items-center gap-1 text-[#00E5BE] font-semibold">
                                        Open Drawer <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Trust Metrics Bar */}
                <div className="aura-glass-card p-6 md:p-8 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] shrink-0">
                            <Key size={20} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">Need an NDA-Protected Compliance Package?</div>
                            <div className="text-xs text-slate-400 mt-0.5 font-sans">
                                We provide third-party audit summaries, penetration test attestations, and SOC 2 bridges to authorized compliance teams.
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/contact?subject=Compliance"
                        className="btn-aura-primary text-xs sm:text-sm !py-2.5 !px-6 shrink-0 flex items-center gap-2"
                    >
                        <FileText size={15} />
                        <span>Request Compliance Packet</span>
                    </Link>
                </div>
            </div>

            {/* Interactive Compliance Deep-Dive Modal Drawer */}
            <AnimatePresence>
                {selectedStandard && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-2xl bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden font-sans"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedStandard(null)}
                                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X size={16} />
                            </button>

                            {/* Modal Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${selectedStandard.badgeColor}`}>
                                    {selectedStandard.badge}
                                </span>
                                <span className="text-xs font-mono text-slate-400">
                                    STANDARD SPECIFICATION
                                </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                                {selectedStandard.name}
                            </h3>
                            <div className="text-xs sm:text-sm text-[#00E5BE] font-mono mb-4">
                                {selectedStandard.title}
                            </div>

                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                {selectedStandard.summary}
                            </p>

                            {/* Technical Specifications Matrix */}
                            <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/10 font-mono text-xs space-y-2.5">
                                <div className="text-[11px] uppercase tracking-wider text-[#00E5BE] font-bold mb-2">
                                    Technical Control Parameters:
                                </div>
                                {Object.entries(selectedStandard.specs).map(([key, val]) => (
                                    <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-b border-white/5 last:border-0">
                                        <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                        <span className="text-white font-semibold">{val}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Full Checklist */}
                            <div className="space-y-2 mb-8">
                                <div className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold mb-2">
                                    Audited Safeguards:
                                </div>
                                {selectedStandard.highlights.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                                        <div className="w-4 h-4 rounded-full bg-[#00E5BE]/20 text-[#00E5BE] flex items-center justify-center shrink-0">
                                            <Check size={11} />
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Modal Actions */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                                <div className="text-xs text-slate-500 font-mono">
                                    Skylink Security & Governance Office
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <button
                                        onClick={() => setSelectedStandard(null)}
                                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white border border-white/10 hover:bg-white/5 transition-all w-full sm:w-auto text-center"
                                    >
                                        Close
                                    </button>
                                    <Link
                                        to="/contact?subject=Compliance"
                                        className="btn-aura-primary text-xs !py-2 !px-5 flex items-center justify-center gap-1.5 w-full sm:w-auto"
                                    >
                                        <span>Request Official Packet</span>
                                        <ExternalLink size={13} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SecurityTrustVault;
