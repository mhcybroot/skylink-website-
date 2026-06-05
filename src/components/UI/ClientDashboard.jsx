import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Home as HomeIcon, CheckCircle, Clock, Zap, ArrowUpRight, ArrowDownRight, Bell, Search, LayoutDashboard } from 'lucide-react';

const mockData = {
    revenue: [45, 52, 48, 61, 59, 75, 82],
    tickets: [120, 115, 108, 95, 85, 75, 60],
    sla: 99.8
};

export default function ClientDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [liveOrders, setLiveOrders] = useState(142);
    
    // Simulate live data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveOrders(prev => prev + (Math.random() > 0.5 ? 1 : -1));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-skylink-gold font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Total Transparency</span>
                    <h2 className="text-4xl font-bold mb-6 font-serif text-white">SKYLINK NEXUS DASHBOARD</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Say goodbye to weekly Excel reports. Our clients get real-time, 24/7 access to operational telemetry, vendor dispatch status, and SLA compliance metrics.
                    </p>
                </div>

                {/* Dashboard Frame */}
                <div className="w-full max-w-5xl mx-auto bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Sidebar */}
                    <div className="w-full md:w-64 bg-slate-950 border-r border-white/5 p-6 flex flex-col">
                        <div className="flex items-center gap-3 mb-10 text-white font-bold tracking-widest font-serif text-xl">
                            <Zap className="text-skylink-gold" />
                            NEXUS
                        </div>
                        
                        <nav className="flex-1 space-y-2">
                            {[
                                { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                                { id: 'properties', icon: HomeIcon, label: 'Properties' },
                                { id: 'cx', icon: Users, label: 'CX Metrics' },
                                { id: 'reports', icon: BarChart3, label: 'Analytics' }
                            ].map(item => (
                                <button 
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-mono text-xs uppercase tracking-wide font-bold ${
                                        activeTab === item.id 
                                            ? 'bg-tech-cyan/10 text-tech-cyan border border-tech-cyan/20' 
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
                                    }`}
                                >
                                    <item.icon size={16} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-slate-500 font-mono">
                            <div className="flex items-center justify-between mb-2">
                                <span>SYSTEM STATUS</span>
                                <span className="text-green-500 font-bold">ONLINE</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden">
                                <div className="bg-green-500 h-full w-[99.8%]" />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-slate-900 p-6 md:p-8">
                        {/* Top Bar */}
                        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                            <h3 className="text-xl font-bold text-white font-serif tracking-wide">
                                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Pulse
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                                    <input type="text" placeholder="Search asset ID..." className="bg-slate-950 border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-tech-cyan/50 w-48" />
                                </div>
                                <button className="relative w-8 h-8 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                                    <Bell size={14} />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
                                </button>
                            </div>
                        </div>

                        {/* KPI Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-slate-950 border border-white/5 p-5 rounded-xl shadow-inner relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-skylink-blue/10 rounded-full blur-xl group-hover:bg-skylink-blue/20 transition-all" />
                                <div className="text-xs text-slate-500 font-mono uppercase tracking-widest font-bold mb-2">Active Work Orders</div>
                                <div className="text-3xl font-bold text-white flex items-baseline gap-3">
                                    {liveOrders}
                                    <span className="text-[10px] text-green-400 flex items-center bg-green-400/10 px-1.5 py-0.5 rounded border border-green-400/20">
                                        <ArrowUpRight size={10} className="mr-1" /> +12%
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-950 border border-white/5 p-5 rounded-xl shadow-inner relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-skylink-gold/10 rounded-full blur-xl group-hover:bg-skylink-gold/20 transition-all" />
                                <div className="text-xs text-slate-500 font-mono uppercase tracking-widest font-bold mb-2">SLA Compliance</div>
                                <div className="text-3xl font-bold text-white flex items-baseline gap-3">
                                    {mockData.sla}%
                                    <span className="text-[10px] text-green-400 flex items-center bg-green-400/10 px-1.5 py-0.5 rounded border border-green-400/20">
                                        <CheckCircle size={10} className="mr-1" /> ON TARGET
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-950 border border-white/5 p-5 rounded-xl shadow-inner relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full blur-xl group-hover:bg-red-500/20 transition-all" />
                                <div className="text-xs text-slate-500 font-mono uppercase tracking-widest font-bold mb-2">Pending Escalations</div>
                                <div className="text-3xl font-bold text-white flex items-baseline gap-3">
                                    4
                                    <span className="text-[10px] text-red-400 flex items-center bg-red-400/10 px-1.5 py-0.5 rounded border border-red-400/20">
                                        <ArrowDownRight size={10} className="mr-1" /> -2 ACTION REQ
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="bg-slate-950 border border-white/5 p-6 rounded-xl shadow-inner">
                            <div className="flex items-center justify-between mb-6">
                                <div className="text-xs text-slate-300 font-mono uppercase tracking-widest font-bold">7-Day Completion Velocity</div>
                                <div className="text-[9px] text-tech-cyan bg-tech-cyan/10 px-2 py-1 rounded border border-tech-cyan/20 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-tech-cyan animate-pulse" /> LIVE SYNC
                                </div>
                            </div>
                            
                            <div className="h-48 flex items-end gap-3 md:gap-6 justify-between px-2 relative">
                                {/* Grid lines */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-full h-px bg-slate-500" />
                                    ))}
                                </div>

                                {/* Bars */}
                                {mockData.revenue.map((val, idx) => (
                                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group z-10">
                                        <div className="text-[9px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono font-bold">
                                            {val}
                                        </div>
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${val}%` }}
                                            transition={{ duration: 1, delay: idx * 0.1 }}
                                            className="w-full max-w-[40px] bg-gradient-to-t from-tech-cyan/20 to-tech-cyan rounded-t-sm relative overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                                        >
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-white opacity-50" />
                                        </motion.div>
                                        <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase">D-{7 - idx}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="mt-8 border border-white/5 rounded-xl overflow-hidden bg-slate-950">
                            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] text-xs text-slate-300 font-mono uppercase tracking-widest font-bold">
                                Recent Network Activity
                            </div>
                            <div className="divide-y divide-white/5">
                                {[
                                    { action: "Work Order #8921 Complete", time: "2m ago", status: "success" },
                                    { action: "Vendor QA Rejected (Missing Photos)", time: "14m ago", status: "error" },
                                    { action: "Asset #442 Initial Securing Started", time: "1h ago", status: "info" }
                                ].map((item, idx) => (
                                    <div key={idx} className="px-6 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${item.status === 'success' ? 'bg-green-500' : item.status === 'error' ? 'bg-red-500' : 'bg-skylink-blue'}`} />
                                            <span className="text-xs text-slate-300 font-mono">{item.action}</span>
                                        </div>
                                        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                                            <Clock size={10} /> {item.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-skylink-blue/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
}
