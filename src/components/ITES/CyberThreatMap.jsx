import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Activity, Globe } from 'lucide-react';

const generateThreat = () => {
    const types = ['DDoS Attempt', 'SQL Injection', 'Malware Payload', 'Brute Force SSH', 'Data Exfiltration', 'Phishing Node'];
    const ips = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    const cities = ['Moscow', 'Beijing', 'Pyongyang', 'St. Petersburg', 'Unknown Region', 'Frankfurt', 'São Paulo', 'Lagos'];
    
    return {
        id: Math.random().toString(36).substr(2, 9),
        type: types[Math.floor(Math.random() * types.length)],
        ip: ips(),
        origin: cities[Math.floor(Math.random() * cities.length)],
        severity: Math.random() > 0.8 ? 'CRITICAL' : Math.random() > 0.4 ? 'HIGH' : 'ELEVATED',
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }) + '.' + Math.floor(Math.random() * 999),
        lat: 20 + Math.random() * 40 * (Math.random() > 0.5 ? 1 : -1),
        lng: Math.random() * 180 * (Math.random() > 0.5 ? 1 : -1)
    };
};

export default function CyberThreatMap() {
    const [threats, setThreats] = useState([]);
    const [mitigatedCount, setMitigatedCount] = useState(14892);

    useEffect(() => {
        // Initial threats
        setThreats(Array(4).fill(null).map(generateThreat));

        const interval = setInterval(() => {
            setThreats(prev => {
                const newThreat = generateThreat();
                setMitigatedCount(c => c + 1);
                const updated = [newThreat, ...prev].slice(0, 6);
                return updated;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    const getSeverityColor = (sev) => {
        switch (sev) {
            case 'CRITICAL': return 'text-red-500 border-red-500/30 bg-red-500/10';
            case 'HIGH': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
            default: return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
        }
    };

    const getSeverityDot = (sev) => {
        switch (sev) {
            case 'CRITICAL': return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]';
            case 'HIGH': return 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]';
            default: return 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]';
        }
    };

    return (
        <div className="w-full bg-slate-950 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-left mb-16">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 relative z-10 border-b border-white/10 pb-6 gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="text-tech-cyan" size={24} />
                        <h3 className="text-2xl font-bold font-serif text-white uppercase tracking-widest">Global Threat Mitigation</h3>
                    </div>
                    <p className="text-slate-400 text-xs font-mono max-w-lg">
                        Real-time visualization of attacks neutralized by Skylink's SOC 2 Type II compliant security infrastructure.
                    </p>
                </div>
                
                <div className="bg-slate-900 border border-tech-cyan/30 rounded-xl p-4 flex gap-8">
                    <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Status</div>
                        <div className="flex items-center gap-2 text-tech-cyan font-mono text-sm font-bold">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tech-cyan opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-tech-cyan"></span>
                            </span>
                            SECURE
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Threats Mitigated (24h)</div>
                        <div className="text-white font-mono text-lg font-bold">{mitigatedCount.toLocaleString()}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* World Map Simulation */}
                <div className="lg:col-span-7 bg-slate-900 border border-white/5 rounded-2xl p-4 relative overflow-hidden h-[400px] flex items-center justify-center">
                    <Globe className="absolute text-slate-800 opacity-50 w-full h-[150%] -rotate-12" strokeWidth={0.5} />
                    
                    <AnimatePresence>
                        {threats.map(threat => (
                            <motion.div
                                key={threat.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute pointer-events-none"
                                style={{
                                    top: `${50 - (threat.lat / 90) * 40}%`,
                                    left: `${50 + (threat.lng / 180) * 40}%`
                                }}
                            >
                                <span className="relative flex h-4 w-4 -translate-x-1/2 -translate-y-1/2">
                                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${threat.severity === 'CRITICAL' ? 'bg-red-500' : 'bg-orange-400'}`}></span>
                                  <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-slate-900 ${getSeverityDot(threat.severity)}`}></span>
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Scanner Line */}
                    <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                        className="absolute left-0 right-0 h-0.5 bg-tech-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-20 pointer-events-none"
                    />
                </div>

                {/* Threat Log */}
                <div className="lg:col-span-5 flex flex-col gap-3 h-[400px]">
                    <div className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest px-2 flex justify-between border-b border-white/10 pb-2">
                        <span>Incoming Vectors</span>
                        <span>Action</span>
                    </div>
                    
                    <div className="flex-1 overflow-hidden relative">
                        <AnimatePresence>
                            {threats.map((threat, idx) => (
                                <motion.div
                                    key={threat.id}
                                    layout
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className={`mb-3 p-3 rounded-lg border ${getSeverityColor(threat.severity)} backdrop-blur-sm flex items-center justify-between font-mono text-xs`}
                                >
                                    <div>
                                        <div className="font-bold flex items-center gap-2 mb-1 text-white">
                                            <AlertTriangle size={12} className={threat.severity === 'CRITICAL' ? 'text-red-500' : 'text-orange-400'} />
                                            {threat.type}
                                        </div>
                                        <div className="text-[9px] text-slate-300 opacity-80 flex gap-3">
                                            <span>SRC: {threat.ip} ({threat.origin})</span>
                                            <span>T: {threat.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30 text-[9px] font-bold">
                                        <CheckCircle size={10} />
                                        BLOCKED
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
