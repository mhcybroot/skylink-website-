import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Terminal, 
    Wifi, 
    ShieldCheck, 
    AlertTriangle, 
    CheckCircle2, 
    RotateCcw, 
    Play, 
    Globe2, 
    Zap, 
    Cpu,
    Server,
    Activity
} from 'lucide-react';

const cloudRegions = [
    { id: 'us-east', name: 'US-East (N. Virginia)', basePing: 26, flag: '🇺🇸', provider: 'AWS / Equinix' },
    { id: 'us-south', name: 'US-South (Dallas NOC Hub)', basePing: 31, flag: '🇺🇸', provider: 'Core Ingress' },
    { id: 'us-west', name: 'US-West (Oregon)', basePing: 42, flag: '🇺🇸', provider: 'Multi-Cloud Edge' },
    { id: 'eu-central', name: 'EU-Central (Frankfurt)', basePing: 38, flag: '🇩🇪', provider: 'GCP Tier-1' },
    { id: 'ap-southeast', name: 'AP-Southeast (Singapore)', basePing: 49, flag: '🇸🇬', provider: 'Azure Edge' }
];

const incidentSteps = [
    {
        time: '00:02',
        type: 'alarm',
        badge: 'ANOMALY DETECTED',
        text: 'Synthetic latency spike detected on US-East API Gateway (Edge Node #4).',
        status: 'Triggered'
    },
    {
        time: '00:24',
        type: 'action',
        badge: 'AUTOMATED DISPATCH',
        text: 'NOC AI auto-rerouted ingress traffic to Dallas backup cluster. Tier-3 SRE notified.',
        status: 'Mitigated'
    },
    {
        time: '01:15',
        type: 'action',
        badge: 'AUTOSCALING ACTIVE',
        text: 'Kubernetes horizontal pod autoscaler expanded replicas (+200%). Node load normalized.',
        status: 'Stabilizing'
    },
    {
        time: '02:48',
        type: 'success',
        badge: 'INCIDENT RESOLVED',
        text: 'Zero data loss. Latency normalized to 24ms. Ticket #INC-9482 closed in 2m 48s (SLA: <15m).',
        status: 'Closed'
    }
];

const complianceChecks = [
    { label: 'TLS 1.3 High-Cipher Ingress Encryption', value: '256-bit AES / Perfect Forward Secrecy', status: 'Passed' },
    { label: 'Zero-Trust IAM & Multi-Factor Cloud Access', value: 'Automated 90-day Credential Rotation', status: 'Enforced' },
    { label: 'Geotagged Photo EXIF Audit & Fraud Shield', value: 'GPS Tamper Detection Active', status: 'Verified' },
    { label: 'HUD Title 24 CFR & GSE Property Compliance', value: '100% Fannie/Freddie Standard Match', status: 'Compliant' },
    { label: 'Continuous Disaster Recovery Replication', value: 'RPO: 0 Seconds • RTO: < 90 Seconds', status: 'Operational' }
];

const LiveTelemetryCockpit = () => {
    const [activeTool, setActiveTool] = useState('ping'); // 'ping', 'incident', 'compliance'
    
    // Ping Tool State
    const [isPinging, setIsPinging] = useState(false);
    const [pings, setPings] = useState({});
    const [pingProgress, setPingProgress] = useState(0);

    // Incident Simulation State
    const [isSimulating, setIsSimulating] = useState(false);
    const [simStep, setSimStep] = useState(0);

    // Compliance Audit State
    const [isAuditing, setIsAuditing] = useState(false);
    const [auditCompleted, setAuditCompleted] = useState(false);

    // Run Ping Diagnostic
    const handleRunPing = () => {
        setIsPinging(true);
        setPingProgress(0);
        setPings({});

        let current = 0;
        const interval = setInterval(() => {
            current += 20;
            setPingProgress(current);

            const randomVariance = Math.floor(Math.random() * 6) - 3;
            const regionIndex = (current / 20) - 1;
            if (regionIndex >= 0 && regionIndex < cloudRegions.length) {
                const r = cloudRegions[regionIndex];
                setPings(prev => ({
                    ...prev,
                    [r.id]: Math.max(18, r.basePing + randomVariance)
                }));
            }

            if (current >= 100) {
                clearInterval(interval);
                setIsPinging(false);
            }
        }, 350);
    };

    // Auto-run ping once on mount
    useEffect(() => {
        handleRunPing();
    }, []);

    // Run Incident Simulation
    const handleRunSimulation = () => {
        setIsSimulating(true);
        setSimStep(0);

        let step = 0;
        const timer = setInterval(() => {
            step += 1;
            setSimStep(step);
            if (step >= incidentSteps.length) {
                clearInterval(timer);
                setIsSimulating(false);
            }
        }, 1200);
    };

    // Run Compliance Audit
    const handleRunAudit = () => {
        setIsAuditing(true);
        setAuditCompleted(false);
        setTimeout(() => {
            setIsAuditing(false);
            setAuditCompleted(true);
        }, 1500);
    };

    return (
        <div className="mt-8 rounded-2xl border border-white/15 bg-zinc-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Terminal Top Window Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 bg-zinc-900/80 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-[#00E5BE] inline-block shadow-aura-sm" />
                    </div>
                    <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5 ml-2">
                        <Terminal size={14} className="text-[#00E5BE]" />
                        skylink-diagnostic-cockpit v4.2 [LIVE]
                    </span>
                </div>

                {/* Interactive Diagnostic Selectors */}
                <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-white/10">
                    <button
                        onClick={() => setActiveTool('ping')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                            activeTool === 'ping'
                                ? 'bg-[#00E5BE] text-black font-semibold shadow-aura-sm'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        <Wifi size={12} />
                        <span>Global Ping</span>
                    </button>
                    <button
                        onClick={() => {
                            setActiveTool('incident');
                            if (simStep === 0) handleRunSimulation();
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                            activeTool === 'incident'
                                ? 'bg-[#00E5BE] text-black font-semibold shadow-aura-sm'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        <Zap size={12} />
                        <span>Incident SLA</span>
                    </button>
                    <button
                        onClick={() => {
                            setActiveTool('compliance');
                            if (!auditCompleted) handleRunAudit();
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                            activeTool === 'compliance'
                                ? 'bg-[#00E5BE] text-black font-semibold shadow-aura-sm'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        <ShieldCheck size={12} />
                        <span>Audit Verification</span>
                    </button>
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 md:p-8 font-mono">
                {/* TOOL 1: GLOBAL PING DIAGNOSTIC */}
                {activeTool === 'ping' && (
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <div className="text-sm font-bold text-white flex items-center gap-2">
                                    <Globe2 size={16} className="text-[#00E5BE]" />
                                    Global Cloud Latency & Edge Topology Diagnostic
                                </div>
                                <div className="text-xs text-slate-400 mt-1 font-sans">
                                    Real-time TCP/HTTPS handshake round-trip across multi-cloud enterprise ingress nodes.
                                </div>
                            </div>
                            <button
                                onClick={handleRunPing}
                                disabled={isPinging}
                                className="btn-aura-primary text-xs !py-2 !px-4 self-start sm:self-auto shrink-0 flex items-center gap-2"
                            >
                                <RotateCcw size={13} className={isPinging ? 'animate-spin' : ''} />
                                <span>{isPinging ? 'Testing Handshakes...' : 'Retest Global Latencies'}</span>
                            </button>
                        </div>

                        {/* Progress Bar */}
                        {isPinging && (
                            <div className="w-full bg-white/5 rounded-full h-1.5 mb-6 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${pingProgress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        )}

                        {/* Region Ping List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {cloudRegions.map((region) => {
                                const currentPing = pings[region.id];
                                return (
                                    <div
                                        key={region.id}
                                        className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#00E5BE]/30 transition-all flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{region.flag}</span>
                                            <div>
                                                <div className="text-xs font-semibold text-white group-hover:text-[#00E5BE] transition-colors">
                                                    {region.name}
                                                </div>
                                                <div className="text-[11px] text-slate-500">
                                                    {region.provider}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            {currentPing ? (
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-sm font-bold text-[#00E5BE] font-mono">
                                                        {currentPing}ms
                                                    </span>
                                                    <span className="w-2 h-2 rounded-full bg-[#00E5BE] shadow-aura-sm animate-pulse" />
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-600 animate-pulse">pinging...</span>
                                            )}
                                            <div className="text-[10px] text-slate-400">0.00% Loss</div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Global Average Summary Card */}
                            <div className="p-4 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold text-[#00E5BE] uppercase">Global Mean Latency</div>
                                    <div className="text-[11px] text-slate-300 mt-0.5">Sub-50ms Global Backbone</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-extrabold text-white">~34.2ms</div>
                                    <div className="text-[10px] text-[#00E5BE] font-mono">SLA: OPTIMAL</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TOOL 2: SRE INCIDENT DISPATCH SIMULATION */}
                {activeTool === 'incident' && (
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <div className="text-sm font-bold text-white flex items-center gap-2">
                                    <Activity size={16} className="text-[#00E5BE]" />
                                    Automated 3-Minute SRE Incident Response Simulator
                                </div>
                                <div className="text-xs text-slate-400 mt-1 font-sans">
                                    Simulating autonomous detection, intelligent ingress rerouting, and sub-3-minute recovery.
                                </div>
                            </div>
                            <button
                                onClick={handleRunSimulation}
                                disabled={isSimulating}
                                className="btn-aura-primary text-xs !py-2 !px-4 self-start sm:self-auto shrink-0 flex items-center gap-2"
                            >
                                <Play size={13} />
                                <span>{isSimulating ? 'Dispatch in Progress...' : 'Re-Run SLA Simulation'}</span>
                            </button>
                        </div>

                        {/* Incident Log Timeline */}
                        <div className="space-y-3 bg-black/60 rounded-xl p-5 border border-white/10">
                            {incidentSteps.map((step, idx) => {
                                const isVisible = idx < simStep;
                                if (!isVisible) return null;

                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex items-start gap-4 p-3 rounded-lg border text-xs leading-relaxed ${
                                            step.type === 'alarm'
                                                ? 'bg-red-500/10 border-red-500/30 text-red-200'
                                                : step.type === 'action'
                                                ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200'
                                                : 'bg-[#00E5BE]/10 border-[#00E5BE]/40 text-emerald-200'
                                        }`}
                                    >
                                        <span className="font-mono font-bold text-slate-400 shrink-0">
                                            [{step.time}]
                                        </span>
                                        <div className="flex-grow">
                                            <div className="font-semibold uppercase tracking-wider text-[11px] mb-0.5 opacity-90">
                                                {step.badge}
                                            </div>
                                            <div>{step.text}</div>
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase shrink-0 bg-black/40 border border-white/10">
                                            {step.status}
                                        </span>
                                    </motion.div>
                                );
                            })}

                            {simStep === 0 && (
                                <div className="text-center py-6 text-slate-500 text-xs">
                                    Click "Re-Run SLA Simulation" to launch the real-time incident sequence...
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* TOOL 3: COMPLIANCE & HUD AUDIT */}
                {activeTool === 'compliance' && (
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <div className="text-sm font-bold text-white flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-[#00E5BE]" />
                                    Live Compliance & Security Verification Audit
                                </div>
                                <div className="text-xs text-slate-400 mt-1 font-sans">
                                    Real-time validation against SOC 2 Type II, ISO 27001, and US HUD Title 24 CFR standards.
                                </div>
                            </div>
                            <button
                                onClick={handleRunAudit}
                                disabled={isAuditing}
                                className="btn-aura-primary text-xs !py-2 !px-4 self-start sm:self-auto shrink-0 flex items-center gap-2"
                            >
                                <RotateCcw size={13} className={isAuditing ? 'animate-spin' : ''} />
                                <span>{isAuditing ? 'Verifying Controls...' : 'Re-Run Compliance Audit'}</span>
                            </button>
                        </div>

                        {/* Checklist Grid */}
                        <div className="space-y-2.5">
                            {complianceChecks.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#00E5BE]/15 text-[#00E5BE] flex items-center justify-center shrink-0">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <div>
                                            <span className="font-bold text-white">{item.label}</span>
                                            <span className="text-slate-400 block sm:inline sm:ml-2 font-sans text-[11px]">
                                                ({item.value})
                                            </span>
                                        </div>
                                    </div>

                                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#00E5BE]/10 text-[#00E5BE] border border-[#00E5BE]/30 self-start sm:self-auto">
                                        ✓ {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveTelemetryCockpit;
