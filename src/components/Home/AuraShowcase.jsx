import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Activity, ShieldCheck, Clock, Server, CheckCircle, TrendingUp, Cpu, Cloud, Play, Radio } from 'lucide-react';
import VideoModal from '../UI/VideoModal';
import nocOperationsImg from '../../assets/noc-operations.jpg';

const tabs = [
    { id: 'cloud', label: 'Cloud Infrastructure & SRE' },
    { id: 'security', label: 'SOC Threat Monitoring' },
    { id: 'devops', label: 'CI/CD & App Pipelines' }
];

const mockWorkflows = [
    { id: 'DEP-8421', region: 'us-east-1 (AWS)', service: 'Microservices Mesh v3.4', status: 'Deployed', time: '4m ago', health: '100% Healthy' },
    { id: 'SEC-9104', region: 'Azure East US', service: 'IAM Anomaly Firewall Rule', status: 'Mitigated', time: '12m ago', health: 'Blocked' },
    { id: 'API-3982', region: 'GCP europe-west3', service: 'Data Pipeline Ingestion', status: 'Processing', time: 'Just now', health: '99.98% SLA' },
    { id: 'NOC-7729', region: 'Enterprise Private Cloud', service: 'Automated DB Failover Audit', status: 'Verified', time: '28m ago', health: 'Passed' }
];

const AuraShowcase = () => {
    const [activeTab, setActiveTab] = useState('cloud');
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <>
            <section className="relative py-28 md:py-36 bg-black text-white px-6 overflow-hidden border-t border-white/[0.06]">
                {/* Ambient Radial Spotlight */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00E5BE]/10 rounded-full blur-[160px] pointer-events-none -z-0" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="aura-badge mb-4">
                            <Sparkles size={14} className="text-[#00E5BE]" />
                            <span>Command & Telemetry</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                            Real-time visibility across{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                                your digital operations
                            </span>
                        </h2>
                        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                            Proactive 24/7 telemetry monitoring system health, API response latency, and security compliance metrics in real time.
                        </p>
                    </div>

                    {/* NOC Command Center Hero Feature Banner */}
                    <div className="mb-10 rounded-3xl overflow-hidden border border-white/15 bg-zinc-950 relative group shadow-2xl">
                        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
                            <img
                                src={nocOperationsImg}
                                alt="24/7 Global IT Command & Network Operations Center"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            
                            {/* Live Badge & Play Overlay */}
                            <div className="absolute top-6 left-6 flex items-center gap-2">
                                <div className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#00E5BE]/40 text-[#00E5BE] text-xs font-mono font-bold flex items-center gap-2 shadow-lg">
                                    <Radio size={13} className="text-[#00E5BE] animate-pulse" />
                                    <span>24/7/365 NOC COMMAND CENTER ACTIVE</span>
                                </div>
                            </div>

                            {/* Center Play Button Overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <button
                                    onClick={() => setIsVideoOpen(true)}
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00E5BE] text-black flex items-center justify-center shadow-[0_0_35px_rgba(0,229,190,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 group/btn mb-3"
                                    aria-label="Watch 24/7 NOC Command Walkthrough"
                                >
                                    <Play size={26} className="fill-black ml-1 group-hover/btn:scale-110 transition-transform" />
                                </button>
                                <span className="text-sm sm:text-base font-bold text-white tracking-wide drop-shadow-md">
                                    Watch 24/7 NOC Command Walkthrough
                                </span>
                                <span className="text-xs text-slate-300 font-mono mt-1">
                                    Multi-cloud SRE & Global Queue Dispatch
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Showcase Card */}
                    <div className="aura-glass-card border border-white/10 p-6 md:p-10 shadow-2xl relative overflow-hidden bg-zinc-950/70 rounded-3xl">
                        {/* Top Bar of Cockpit */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                            {/* Tab Switchers */}
                            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl sm:rounded-full bg-white/5 border border-white/10 w-full sm:w-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-3 sm:px-4 py-1.5 rounded-lg sm:rounded-full text-xs font-semibold transition-all ${
                                            activeTab === tab.id
                                                ? 'bg-[#00E5BE] text-black shadow-aura-sm'
                                                : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Status Pills */}
                            <div className="flex items-center gap-3 text-xs">
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5BE]/10 border border-[#00E5BE]/25 text-[#00E5BE] font-mono">
                                    <span className="w-2 h-2 rounded-full bg-[#00E5BE] animate-ping" />
                                    24/7 MANAGED NOC ACTIVE
                                </span>
                                <span className="hidden md:inline text-slate-500 font-mono">
                                    SLA: 99.99%
                                </span>
                            </div>
                        </div>

                        {/* KPI Quick Metrics */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-8">
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                                    <span>Managed Cloud Nodes</span>
                                    <Server size={14} className="text-[#00E5BE]" />
                                </div>
                                <div className="text-2xl font-bold text-white font-mono">1,840+</div>
                                <div className="text-[11px] text-[#00E5BE] flex items-center gap-1 mt-1 font-medium">
                                    <TrendingUp size={11} /> Multi-cloud Active
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                                    <span>Mean Time to Respond</span>
                                    <Clock size={14} className="text-[#00E5BE]" />
                                </div>
                                <div className="text-2xl font-bold text-white font-mono">&lt; 3 mins</div>
                                <div className="text-[11px] text-[#00E5BE] flex items-center gap-1 mt-1 font-medium">
                                    <TrendingUp size={11} /> 24/7 Rapid Incident SLA
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                                    <span>Compliance Score</span>
                                    <ShieldCheck size={14} className="text-[#00E5BE]" />
                                </div>
                                <div className="text-2xl font-bold text-white font-mono">100%</div>
                                <div className="text-[11px] text-slate-400 mt-1">
                                    SOC 2 & ISO 27001 Aligned
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                                    <span>Core Availability</span>
                                    <Activity size={14} className="text-[#00E5BE]" />
                                </div>
                                <div className="text-2xl font-bold text-white font-mono">99.99%</div>
                                <div className="text-[11px] text-slate-400 mt-1">
                                    High-availability architecture
                                </div>
                            </div>
                        </div>

                        {/* Live Stream Table */}
                        <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#00E5BE]" />
                                    Real-time Operations Stream
                                </h4>
                                <div className="text-xs text-slate-400 font-mono">Synced with Live NOC</div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs sm:text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5 text-slate-500 font-mono uppercase text-[11px]">
                                            <th className="py-3 px-6">Pipeline ID</th>
                                            <th className="py-3 px-6">Environment</th>
                                            <th className="py-3 px-6">Service / Task</th>
                                            <th className="py-3 px-6">Status</th>
                                            <th className="py-3 px-6">Health Metric</th>
                                            <th className="py-3 px-6 text-right">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {mockWorkflows.map((item, i) => (
                                            <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                                                <td className="py-3.5 px-6 font-mono font-medium text-white">{item.id}</td>
                                                <td className="py-3.5 px-6 text-slate-300 flex items-center gap-1.5">
                                                    <Cloud size={13} className="text-[#00E5BE]" />
                                                    {item.region}
                                                </td>
                                                <td className="py-3.5 px-6 text-slate-300">{item.service}</td>
                                                <td className="py-3.5 px-6">
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00E5BE]/10 text-[#00E5BE] border border-[#00E5BE]/20">
                                                        <CheckCircle size={10} />
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-6 font-mono text-[#00E5BE]">{item.health}</td>
                                                <td className="py-3.5 px-6 text-slate-400 text-right font-mono">{item.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Showcase Modal */}
            <VideoModal
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                videoId="ynUjJ1yVBlA"
                title="24/7 Global IT Command & Network Operations Center (NOC) Walkthrough"
            />
        </>
    );
};

export default AuraShowcase;
