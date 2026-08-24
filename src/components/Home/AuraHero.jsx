import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Building2, ChevronRight, MapPin, Globe } from 'lucide-react';

const stats = [
    {
        value: '50 States',
        label: 'USA Field Property Preservation',
        detail: 'Nationwide coverage for pre-foreclosure, REO & rehab inspections'
    },
    {
        value: '99.9%',
        label: 'System Uptime & Reliability',
        detail: 'Enterprise SLA & proactive infrastructure monitoring'
    },
    {
        value: '10x',
        label: 'Operational Velocity',
        detail: 'Accelerating digital workflows and process automation'
    },
    {
        value: '24/7',
        label: 'Proactive Managed Support',
        detail: 'Round-the-clock IT & network operations center'
    }
];

const AuraHero = () => {
    return (
        <section className="relative min-h-[92vh] md:min-h-screen w-full bg-black flex flex-col justify-between items-center pt-32 pb-16 px-6 overflow-hidden">
            {/* Ambient Radial Aura Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[850px] h-[380px] md:h-[520px] bg-gradient-to-b from-[#00E5BE]/20 via-[#00E5BE]/5 to-transparent rounded-full blur-[120px] pointer-events-none -z-0" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-[#00F5C4]/15 rounded-full blur-[90px] pointer-events-none -z-0" />

            {/* Subtle Grid Backdrop */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-0" />

            {/* Main Content Area */}
            <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center my-auto">
                {/* Pill Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="aura-badge flex items-center gap-2">
                        <Sparkles size={14} className="text-[#00E5BE] animate-pulse" />
                        <span className="tracking-wide">Global IT-Enabled Services & US Property Preservation</span>
                    </div>
                </motion.div>

                {/* Hero Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]"
                >
                    Elevate Your Business with{' '}
                    <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-[#5eead4] drop-shadow-[0_0_35px_rgba(0,229,190,0.4)]">
                        Next-Generation IT Solutions
                    </span>
                </motion.h1>

                {/* Hero Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
                >
                    We transform complex technological challenges into scalable, efficient, and secure digital workflows. Partner with <strong className="text-white font-semibold">Skylink Innovations Ltd</strong> for cutting-edge ITES and nationwide <strong className="text-white font-semibold">US Property Preservation</strong>.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                >
                    <a
                        href="#services"
                        className="btn-aura-primary w-full sm:w-auto"
                    >
                        <span>Explore Our Services</span>
                        <ArrowRight size={17} />
                    </a>

                    <Link
                        to="/property"
                        className="btn-aura-secondary w-full sm:w-auto flex items-center justify-center gap-2.5"
                    >
                        <Building2 size={16} className="text-[#00E5BE]" />
                        <span>US Property Preservation</span>
                    </Link>

                    <Link
                        to="/contact"
                        className="btn-aura-secondary w-full sm:w-auto flex items-center justify-center gap-2.5"
                    >
                        <span>Get a Free Consultation</span>
                        <ChevronRight size={17} />
                    </Link>
                </motion.div>
            </div>

            {/* Metrics & Social Proof Bar */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative z-10 w-full max-w-6xl mx-auto mt-16 pt-10 border-t border-white/[0.08]"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00E5BE]">
                                {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                                {stat.label}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 max-w-[200px] hidden sm:block">
                                {stat.detail}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default AuraHero;
