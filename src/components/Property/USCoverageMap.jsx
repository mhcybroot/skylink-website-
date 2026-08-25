import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MapPin, 
    ShieldCheck, 
    Clock, 
    Users, 
    Snowflake, 
    CloudRain, 
    Building2, 
    CheckCircle2, 
    ArrowRight,
    Sparkles,
    Filter,
    Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { usMapData } from './usMapData';

const filterTabs = [
    { id: 'all', label: 'All 50 States', icon: Compass },
    { id: 'hubs', label: 'High-Density Hubs (TX, FL, CA, OH, NY)', icon: Users },
    { id: 'winter', label: 'Winterization & Freeze Zones', icon: Snowflake },
    { id: 'storm', label: 'Coastal Hurricane Response', icon: CloudRain }
];

const highDensityStates = ['TX', 'FL', 'CA', 'IL', 'OH', 'NY', 'GA', 'NC', 'PA', 'MI', 'VA'];

const USCoverageMap = () => {
    const [selectedStateId, setSelectedStateId] = useState('TX');
    const [hoveredStateId, setHoveredStateId] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const currentStateId = hoveredStateId || selectedStateId || 'TX';
    const currentState = usMapData[currentStateId] || usMapData['TX'];

    // Check if a state matches the active filter
    const isStateHighlighted = (state) => {
        if (!state) return true;
        if (activeFilter === 'hubs') return highDensityStates.includes(state.id);
        if (activeFilter === 'winter') return state.winterization;
        if (activeFilter === 'storm') return state.hurricane;
        return true;
    };

    return (
        <section id="coverage-map" className="relative py-24 md:py-32 bg-black text-white px-4 sm:px-6 overflow-hidden border-t border-white/[0.08]">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00E5BE]/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="aura-badge mb-4">
                        <MapPin size={14} className="text-[#00E5BE]" />
                        <span>Nationwide Boots-On-The-Ground</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Interactive 50-State{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                            Field Coverage Map
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        Tap or hover on any US state to inspect active vendor fleet capacity, regional logistics hubs, and guaranteed sub-24-hour turnaround SLAs.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                    {filterTabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveFilter(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all font-mono ${
                                    activeFilter === tab.id
                                        ? 'bg-[#00E5BE] text-black shadow-aura-sm'
                                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                                }`}
                            >
                                <Icon size={14} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Main Interactive Map & Telemetry HUD Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* SVG Map Container (8 Cols) */}
                    <div className="lg:col-span-8 aura-glass-card p-4 sm:p-6 md:p-8 rounded-3xl border border-white/15 bg-zinc-950/80 shadow-2xl relative">
                        {/* Map Header Status Bar */}
                        <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs font-mono">
                            <div className="flex items-center gap-2 text-slate-300">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5BE] animate-ping" />
                                <span className="font-semibold text-white">LIVE 50-STATE FIELD FLEET</span>
                            </div>
                            <div className="text-slate-400 text-[11px]">
                                Selected: <span className="text-[#00E5BE] font-bold">{currentState.name} ({currentState.id})</span>
                            </div>
                        </div>

                        {/* Responsive SVG Map */}
                        <div className="w-full aspect-[530/328] relative">
                            <svg
                                viewBox="10.1 19.3 530 327.5"
                                className="w-full h-full drop-shadow-[0_0_20px_rgba(0,229,190,0.15)]"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g>
                                    {Object.values(usMapData).map((state) => {
                                        if (!state.paths || state.paths.length === 0) return null;
                                        const isSelected = currentStateId === state.id;
                                        const isHighlighted = isStateHighlighted(state);

                                        return (
                                            <g
                                                key={state.id}
                                                id={`state-${state.id}`}
                                                className="cursor-pointer transition-all duration-200"
                                                onClick={() => setSelectedStateId(state.id)}
                                                onMouseEnter={() => setHoveredStateId(state.id)}
                                                onMouseLeave={() => setHoveredStateId(null)}
                                            >
                                                {state.paths.map((d, pIdx) => (
                                                    <path
                                                        key={pIdx}
                                                        d={d}
                                                        fill={
                                                            isSelected
                                                                ? '#00E5BE'
                                                                : isHighlighted
                                                                ? '#00E5BE'
                                                                : '#1e293b'
                                                        }
                                                        fillOpacity={
                                                            isSelected
                                                                ? 0.95
                                                                : isHighlighted
                                                                ? 0.22
                                                                : 0.08
                                                        }
                                                        stroke={isSelected ? '#ffffff' : '#00E5BE'}
                                                        strokeWidth={isSelected ? '1.5' : isHighlighted ? '0.8' : '0.4'}
                                                        strokeOpacity={isSelected ? 1 : isHighlighted ? 0.7 : 0.2}
                                                        className="transition-all duration-200 hover:fill-[#00E5BE] hover:fill-opacity-80 hover:stroke-white hover:stroke-width-[1.2]"
                                                    />
                                                ))}
                                            </g>
                                        );
                                    })}
                                </g>
                            </svg>
                        </div>

                        {/* Alaska & Hawaii Inset Pills */}
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3 text-xs">
                            <span className="text-slate-400 font-mono text-[11px]">Non-Contiguous Inset Hubs:</span>
                            <div className="flex items-center gap-2 font-mono">
                                {['AK', 'HI'].map((id) => {
                                    const state = usMapData[id];
                                    const isSelected = currentStateId === id;
                                    return (
                                        <button
                                            key={id}
                                            onClick={() => setSelectedStateId(id)}
                                            onMouseEnter={() => setHoveredStateId(id)}
                                            onMouseLeave={() => setHoveredStateId(null)}
                                            className={`px-3 py-1.5 rounded-lg border transition-all ${
                                                isSelected
                                                    ? 'bg-[#00E5BE] text-black font-bold border-[#00E5BE]'
                                                    : 'bg-white/5 text-slate-300 border-white/10 hover:border-[#00E5BE]/50'
                                            }`}
                                        >
                                            {state.name} ({state.id}) • {state.fleet}+ Fleet
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Telemetry HUD Details Card (4 Cols) */}
                    <div className="lg:col-span-4 aura-glass-card p-6 md:p-8 rounded-3xl border border-white/15 bg-zinc-950/90 shadow-2xl relative">
                        {/* Selected State Header */}
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <div>
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#00E5BE] font-semibold">
                                    {currentState.region} Regional Division
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                                    {currentState.name}
                                </h3>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-[#00E5BE]/15 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] font-mono text-lg font-bold shadow-aura-sm">
                                {currentState.id}
                            </div>
                        </div>

                        {/* State Metrics Grid */}
                        <div className="space-y-4 mb-6 font-mono text-xs">
                            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <Users size={14} className="text-[#00E5BE]" />
                                    Active Field Fleet:
                                </span>
                                <span className="text-white font-bold text-sm">
                                    {currentState.fleet}+ Certified Inspectors
                                </span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <Clock size={14} className="text-[#00E5BE]" />
                                    Emergency Turnaround:
                                </span>
                                <span className="text-[#00E5BE] font-bold">
                                    {currentState.sla} SLA Guaranteed
                                </span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <Building2 size={14} className="text-[#00E5BE]" />
                                    Operations Hub:
                                </span>
                                <span className="text-white font-medium text-right truncate max-w-[170px]">
                                    {currentState.hub}
                                </span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-[#00E5BE]" />
                                    HUD / GSE Match:
                                </span>
                                <span className="text-emerald-400 font-bold">
                                    100% First-Pass
                                </span>
                            </div>
                        </div>

                        {/* Specialty Capability Badge */}
                        <div className="mb-6 p-3 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 text-xs">
                            <div className="text-[10px] uppercase font-mono text-[#00E5BE] font-bold mb-1">
                                Regional Field Specialty:
                            </div>
                            <div className="text-white font-medium">
                                {currentState.specialty}
                            </div>
                        </div>

                        {/* Direct Dispatch CTA */}
                        <Link
                            to={`/contact?state=${encodeURIComponent(currentState.name)}&subject=US%20Property%20Preservation`}
                            className="btn-aura-primary w-full text-xs sm:text-sm !py-3 flex items-center justify-center gap-2 shadow-aura-md"
                        >
                            <span>Dispatch Work Order in {currentState.name}</span>
                            <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>

                {/* Nationwide Summary Stats Bar */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="aura-glass-card p-5 rounded-2xl bg-zinc-950/60 border border-white/10 text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">50 / 50</div>
                        <div className="text-xs text-[#00E5BE] font-mono mt-1">US States Covered (100%)</div>
                    </div>

                    <div className="aura-glass-card p-5 rounded-2xl bg-zinc-950/60 border border-white/10 text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">3,850+</div>
                        <div className="text-xs text-[#00E5BE] font-mono mt-1">Certified Field Vendors</div>
                    </div>

                    <div className="aura-glass-card p-5 rounded-2xl bg-zinc-950/60 border border-white/10 text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">&lt; 24 Hours</div>
                        <div className="text-xs text-[#00E5BE] font-mono mt-1">Emergency Securing SLA</div>
                    </div>

                    <div className="aura-glass-card p-5 rounded-2xl bg-zinc-950/60 border border-white/10 text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</div>
                        <div className="text-xs text-[#00E5BE] font-mono mt-1">HUD / GSE First-Pass Rate</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default USCoverageMap;
