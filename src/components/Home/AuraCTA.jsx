import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Headphones, MessageSquare } from 'lucide-react';

const AuraCTA = () => {
    return (
        <section className="relative py-28 md:py-36 bg-black text-white px-6 overflow-hidden border-t border-white/[0.06]">
            {/* Ambient Radial Aura Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[400px] bg-gradient-to-b from-[#00E5BE]/20 via-[#00E5BE]/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-0" />

            <div className="max-w-5xl mx-auto relative z-10 text-center">
                {/* Badge */}
                <div className="aura-badge mb-6">
                    <Sparkles size={14} className="text-[#00E5BE]" />
                    <span>Let’s Connect</span>
                </div>

                {/* Main Headline */}
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                    Ready to Transform{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-[#5eead4]">
                        Your Business?
                    </span>
                </h2>

                <p className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                    Technology should be an accelerator, not a roadblock. Let’s discuss how <strong className="text-white font-semibold">Skylink Innovations Ltd</strong> can optimize your operations and drive your digital future forward.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                    <Link
                        to="/contact"
                        className="btn-aura-primary w-full sm:w-auto text-base !py-4 !px-8"
                    >
                        <span>Get a Free Consultation</span>
                        <ArrowRight size={18} />
                    </Link>
                    <a
                        href="#services"
                        className="btn-aura-secondary w-full sm:w-auto text-base !py-4 !px-8"
                    >
                        <span>Explore Our Services</span>
                    </a>
                </div>

                {/* Micro Guarantees */}
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                        <Zap size={16} className="text-[#00E5BE]" />
                        <span>Agile Development Sprints</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-[#00E5BE]" />
                        <span>Certified Enterprise Security</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Headphones size={16} className="text-[#00E5BE]" />
                        <span>24/7 Dedicated Support Pods</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuraCTA;
