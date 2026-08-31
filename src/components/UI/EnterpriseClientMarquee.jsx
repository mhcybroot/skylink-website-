import { ShieldCheck, CheckCircle, Building, Sparkles } from 'lucide-react';

const track1 = [
    { name: "MCS (Mortgage Contracting Services)", type: "National Servicer" },
    { name: "Safeguard Properties", type: "National Field Servicer" },
    { name: "ServiceLink", type: "Default Solutions" },
    { name: "Fannie Mae (HomePath)", type: "Federal Enterprise" },
    { name: "Freddie Mac (HomeSteps)", type: "Federal Enterprise" },
    { name: "Mr. Cooper (Nationstar)", type: "Top Servicer" },
    { name: "Shellpoint Mortgage Servicing", type: "Master Servicer" },
    { name: "Select Portfolio Servicing (SPS)", type: "Special Servicer" },
    { name: "CoreLogic REO", type: "Analytics & Field" },
    { name: "Cyprexx Services", type: "Preservation Leader" },
    { name: "Xome", type: "REO Exchange" },
    { name: "Altisource", type: "Asset Management" },
    { name: "SingleSource Property Solutions", type: "Field Operations" },
    { name: "Carrington Property Services", type: "National Servicer" }
];

const track2 = [
    { name: "J.P. Morgan Chase", type: "Tier-1 Bank" },
    { name: "US Bank REO", type: "National Bank" },
    { name: "Truist Bank REO", type: "Regional Banking" },
    { name: "CitiMortgage REO", type: "Global Banking" },
    { name: "Invitation Homes", type: "#1 SFR Operator" },
    { name: "Progress Residential", type: "SFR Portfolio" },
    { name: "American Homes 4 Rent (AMH)", type: "Public SFR REIT" },
    { name: "Auction.com", type: "Online REO Auction" },
    { name: "Pennymac REO", type: "National Servicer" },
    { name: "Newrez REO", type: "National Servicer" },
    { name: "Freedom Mortgage REO", type: "VA / HUD Servicer" },
    { name: "Detroit Land Bank Authority", type: "Municipal Land Bank" },
    { name: "CBRE Property Services", type: "Commercial REIT" }
];

const EnterpriseClientMarquee = () => {
    return (
        <div className="relative py-12 bg-black border-y border-white/[0.08] overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[150px] bg-[#00E5BE]/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Gradient Mask for Smooth Edge Fading */}
            <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

            <div className="text-center mb-8 px-4">
                <div className="aura-badge mb-2 mx-auto">
                    <Sparkles size={13} className="text-[#00E5BE]" />
                    <span>Institutional Client Ecosystem</span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-slate-400">
                    Trusted by 200+ National Mortgage Servicers, GSEs, Banks, & Single-Family Rental Operators
                </p>
            </div>

            {/* Track 1: Leftward Scroll */}
            <div className="flex gap-4 overflow-hidden mb-4 select-none">
                <div className="flex shrink-0 gap-4 animate-marquee-fast items-center hover:[animation-play-state:paused]">
                    {track1.concat(track1).map((client, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-[#00E5BE]/50 hover:bg-zinc-900 transition-all backdrop-blur-md shrink-0 shadow-sm group"
                        >
                            <div className="w-2 h-2 rounded-full bg-[#00E5BE] shadow-[0_0_8px_#00E5BE]" />
                            <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white font-sans">
                                {client.name}
                            </span>
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                                {client.type}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Track 2: Rightward Scroll */}
            <div className="flex gap-4 overflow-hidden select-none">
                <div className="flex shrink-0 gap-4 animate-marquee-reverse-fast items-center hover:[animation-play-state:paused]">
                    {track2.concat(track2).map((client, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-[#00E5BE]/50 hover:bg-zinc-900 transition-all backdrop-blur-md shrink-0 shadow-sm group"
                        >
                            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
                            <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white font-sans">
                                {client.name}
                            </span>
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                                {client.type}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EnterpriseClientMarquee;
