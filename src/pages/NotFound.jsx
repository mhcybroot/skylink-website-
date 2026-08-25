import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertOctagon, ArrowLeft, Home, Building2, Globe2, Briefcase, Mail, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import CyberBackground from '../components/UI/CyberBackground';

const quickLinks = [
    { label: 'Executive Homepage', to: '/', icon: Home },
    { label: 'US Property Preservation', to: '/property', icon: Building2 },
    { label: 'Global ITES & BPO Operations', to: '/ites', icon: Globe2 },
    { label: 'About Skylink Innovations', to: '/about', icon: Sparkles },
    { label: 'Careers (4 Active Openings)', to: '/careers', icon: Briefcase },
    { label: 'Contact Solutions Team', to: '/contact', icon: Mail }
];

const NotFound = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 font-sans relative overflow-hidden flex items-center justify-center">
            <SEO
                title="404 - Telemetry Coordinate Not Found"
                description="The requested URL route could not be located on the Skylink Innovations network. Navigate back to our verified executive channels."
                canonical="https://skylinkltd.ai/404"
            />

            {/* Cybernetic Security Circuit Background */}
            <CyberBackground variant="circuit" glowPosition="center" meshOpacity="opacity-25" />

            <div className="max-w-3xl mx-auto relative z-10 text-center">
                {/* 404 Status Pill */}
                <div className="aura-badge mb-6 inline-flex items-center gap-2">
                    <AlertOctagon size={14} className="text-[#00E5BE] animate-pulse" />
                    <span>Error Code: 404 • Coordinate Unresolved</span>
                </div>

                {/* Main Glitchy / Cyber Heading */}
                <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-white mb-6 font-mono">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-teal-400">
                        404
                    </span>
                </h1>

                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                    Telemetry Node Not Found
                </h2>

                <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-sans">
                    The requested URL does not exist or has been relocated within the Skylink network infrastructure. Explore our primary command channels below.
                </p>

                {/* Primary Action Button */}
                <div className="mb-14 flex items-center justify-center">
                    <Link to="/" className="btn-aura-primary text-xs sm:text-sm !py-3 !px-8 flex items-center gap-2">
                        <ArrowLeft size={16} />
                        <span>Return to Command Center</span>
                    </Link>
                </div>

                {/* Quick Navigation Cards */}
                <div className="aura-glass-card p-6 sm:p-8 bg-zinc-950/80 border border-white/10 rounded-2xl text-left">
                    <div className="text-xs font-mono uppercase text-[#00E5BE] mb-4 font-semibold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5BE]" />
                        Verified Operational Portals
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {quickLinks.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={i}
                                    to={item.to}
                                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00E5BE]/40 hover:bg-[#00E5BE]/5 transition-all flex items-center gap-3 text-xs text-slate-300 hover:text-white group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/20 flex items-center justify-center text-[#00E5BE] shrink-0 group-hover:scale-105 transition-transform">
                                        <Icon size={14} />
                                    </div>
                                    <span className="font-medium group-hover:text-[#00E5BE] transition-colors">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
