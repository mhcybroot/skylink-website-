import { motion } from 'framer-motion';
import { Target, Compass, Sparkles, CheckCircle, Shield, Award, Users2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CyberBackground from '../UI/CyberBackground';

const AuraAbout = () => {
    return (
        <section id="about" className="relative py-28 md:py-36 bg-black text-white px-6 overflow-hidden border-t border-white/[0.06]">
            {/* Cybernetic Mesh & Ambient Cyan Spotlight Background */}
            <CyberBackground glowPosition="top" meshOpacity="opacity-20" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="aura-badge mb-4">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>About Skylink Innovations</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Your Strategic{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] to-[#2DD4BF]">
                            Technology Partner
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        Empowering businesses to navigate complex digital terrain with agile, robust, and future-ready IT-enabled services.
                    </p>
                </div>

                {/* Main About Story Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
                    {/* Left Main Overview Box */}
                    <div className="lg:col-span-7 aura-glass-card p-8 md:p-12 flex flex-col justify-between relative overflow-hidden bg-zinc-950/60">
                        <div>
                            <div className="text-xs font-mono uppercase tracking-widest text-[#00E5BE] mb-3">
                                Company Overview
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-snug">
                                Transforming technological complexity into competitive advantage.
                            </h3>
                            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                                <p>
                                    At <strong className="text-white font-semibold">Skylink Innovations Ltd</strong>, we are more than just an IT service provider—we are your strategic technology and operational partner. In a rapidly evolving landscape, businesses need robust, agile, and forward-thinking tech solutions to stay competitive. We specialize in delivering comprehensive IT-enabled services alongside nationwide <strong className="text-[#00E5BE] font-semibold">US Property Preservation</strong> and asset management designed to streamline your operations, enhance productivity, and drive sustainable growth.
                                </p>
                                <p className="text-slate-400">
                                    Our team of experienced developers, system architects, and field logistics specialists work closely with you to understand your unique business objectives. Whether you require bespoke software engineering, multi-cloud management, or rigorous nationwide US property inspection and preservation services, we deliver tailored solutions that produce measurable results.
                                </p>
                            </div>
                        </div>

                        <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-[#00E5BE]" />
                                <span>Measurable Business ROI</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield size={16} className="text-[#00E5BE]" />
                                <span>All 50 US States Coverage</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users2 size={16} className="text-[#00E5BE]" />
                                <span>Dedicated Solution Architects</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Mission & Vision Stack */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Mission Card */}
                        <div className="aura-glass-card p-8 md:p-10 flex-1 border border-white/10 hover:border-[#00E5BE]/40 transition-all bg-zinc-950/60 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] mb-6 shadow-aura-sm">
                                    <Target size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3">Our Mission</h4>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    To equip businesses with innovative, reliable, and scalable technology solutions that unlock their full potential and bridge the gap between their current operations and future goals.
                                </p>
                            </div>
                            <div className="pt-4 mt-6 border-t border-white/5 text-xs font-mono text-[#00E5BE]">
                                Execution • Reliability • Scalability
                            </div>
                        </div>

                        {/* Vision Card */}
                        <div className="aura-glass-card p-8 md:p-10 flex-1 border border-white/10 hover:border-[#00E5BE]/40 transition-all bg-zinc-950/60 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] mb-6 shadow-aura-sm">
                                    <Compass size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3">Our Vision</h4>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    To be the globally recognized leader in IT enablement, driving the future of digital business transformation.
                                </p>
                            </div>
                            <div className="pt-4 mt-6 border-t border-white/5 text-xs font-mono text-[#00E5BE]">
                                Innovation • Global Leadership • Impact
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuraAbout;
