import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    ShieldCheck, 
    Building2, 
    Home, 
    Landmark, 
    Server, 
    Globe2, 
    CheckCircle2, 
    ArrowRight, 
    Layers, 
    Sparkles, 
    Cpu, 
    FileCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { clientCategories, clientDirectoryData } from './clientDirectoryData';

const portalIntegrations = [
    { name: "PPR (Property Preservation)", role: "Work Order Dispatch" },
    { name: "Aspen Grove (iRecord)", role: "Background & Compliance" },
    { name: "MCS Contractor Portal", role: "Direct API / EDI" },
    { name: "ServiceLink Disclose", role: "Default Management" },
    { name: "Equator", role: "REO Asset Management" },
    { name: "RES.NET", role: "BPO & Field Servicing" },
    { name: "Cyprexx Vendor Web", role: "Work Order Automation" },
    { name: "Xome Field Hub", role: "Real Estate Marketplace" }
];

const ClientNetworkDirectory = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [visibleLimit, setVisibleLimit] = useState(24);

    const filteredClients = useMemo(() => {
        return clientDirectoryData.filter((client) => {
            const matchesCategory = activeCategory === 'all' || client.category === activeCategory;
            const matchesSearch = searchQuery.trim() === '' || 
                client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                client.portal.toLowerCase().includes(searchQuery.toLowerCase()) ||
                client.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                client.compliance.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, activeCategory]);

    const displayedClients = filteredClients.slice(0, visibleLimit);

    return (
        <section id="client-directory" className="relative py-24 md:py-32 bg-black text-white px-4 sm:px-6 overflow-hidden border-t border-white/[0.08]">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="aura-badge mb-4">
                        <ShieldCheck size={14} className="text-[#00E5BE]" />
                        <span>Institutional Client Network & Portals</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Verified Coverage for{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                            200+ National Institutions
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        Skylink Innovations operates with direct portal integration, standardized price matrices, and 100% first-pass HUD/GSE compliance across America's leading mortgage servicers, banks, and asset managers.
                    </p>
                </div>

                {/* Search & Filter Console */}
                <div className="max-w-4xl mx-auto mb-10 space-y-4">
                    {/* Live Search Bar */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Search size={18} className="text-[#00E5BE]" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setVisibleLimit(24);
                            }}
                            placeholder="Search your company or portal (e.g. MCS, Fannie Mae, Chase, Invitation Homes, ServiceLink)..."
                            className="w-full bg-zinc-950/90 border border-white/15 rounded-2xl pl-12 pr-4 py-4 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00E5BE] focus:ring-1 focus:ring-[#00E5BE] shadow-2xl transition-all font-mono"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-mono text-slate-400 hover:text-white"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                        {clientCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveCategory(cat.id);
                                    setVisibleLimit(24);
                                }}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-2 ${
                                    activeCategory === cat.id
                                        ? 'bg-[#00E5BE] text-black shadow-aura-sm'
                                        : 'bg-zinc-950 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                                }`}
                            >
                                <span>{cat.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Live Count Indicator */}
                    <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
                        <span>
                            Showing <strong className="text-[#00E5BE]">{displayedClients.length}</strong> of{' '}
                            <strong>{filteredClients.length}</strong> matching institutions
                        </span>
                        <span className="hidden sm:inline text-emerald-400">
                            ● 100% Active Portal Readiness
                        </span>
                    </div>
                </div>

                {/* Clients Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    <AnimatePresence>
                        {displayedClients.map((client, index) => (
                            <motion.div
                                key={client.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2, delay: (index % 12) * 0.02 }}
                                className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-[#00E5BE]/50 transition-all group flex flex-col justify-between hover:bg-zinc-900/60 shadow-lg relative overflow-hidden"
                            >
                                {/* Top Badges */}
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                                            {client.type}
                                        </span>
                                        <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                                            <CheckCircle2 size={11} />
                                            {client.compliance}
                                        </span>
                                    </div>

                                    <h3 className="text-base font-bold text-white group-hover:text-[#00E5BE] transition-colors line-clamp-1">
                                        {client.name}
                                    </h3>
                                </div>

                                {/* Bottom Metadata */}
                                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                                    <div className="text-slate-400 flex items-center gap-1.5 truncate max-w-[170px]">
                                        <Cpu size={12} className="text-[#00E5BE] shrink-0" />
                                        <span className="truncate">{client.portal}</span>
                                    </div>
                                    <div className="text-[11px] text-[#00E5BE] font-bold shrink-0">
                                        SLA: {client.sla}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show More Button */}
                {visibleLimit < filteredClients.length && (
                    <div className="text-center mb-20">
                        <button
                            onClick={() => setVisibleLimit((prev) => prev + 24)}
                            className="btn-aura-secondary text-xs !py-3 !px-8 font-mono"
                        >
                            Load More Institutions ({filteredClients.length - visibleLimit} Remaining)
                        </button>
                    </div>
                )}

                {/* Mortgage Management Systems (MMS) Compatibility Grid */}
                <div className="aura-glass-card p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-white/15 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5BE]/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
                        <div className="aura-badge mb-2 mx-auto">
                            <Layers size={13} className="text-[#00E5BE]" />
                            <span>Software & Gateway Compatibility</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Native Mortgage Management Systems (MMS) Workflows
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400">
                            Our Dhaka operations coordinators and US field networks interface directly with all industry-standard property preservation platforms.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                        {portalIntegrations.map((portal, idx) => (
                            <div
                                key={idx}
                                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00E5BE]/40 text-center transition-all"
                            >
                                <div className="text-sm font-bold text-white font-mono mb-1">
                                    {portal.name}
                                </div>
                                <div className="text-[11px] text-[#00E5BE] font-mono">
                                    {portal.role}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                        <div className="text-xs sm:text-sm text-slate-300 text-center sm:text-left">
                            Need a custom EDI/API integration or dedicated servicer portal setup?
                        </div>
                        <Link to="/contact" className="btn-aura-primary text-xs !py-3 !px-6 shrink-0">
                            <span>Request Servicer Onboarding</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientNetworkDirectory;
