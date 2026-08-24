import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Play, X, CheckCircle2, ChevronRight } from 'lucide-react';

const stats = [
    {
        value: '99.9%',
        label: 'System Uptime & Reliability',
        detail: 'Enterprise SLA & proactive infrastructure monitoring'
    },
    {
        value: '10x',
        label: 'Operational Velocity',
        detail: 'Accelerating digital workflows and automation'
    },
    {
        value: '24/7',
        label: 'Proactive Managed Support',
        detail: 'Round-the-clock IT & network operations center'
    }
];

const AuraHero = () => {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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
                        <span className="tracking-wide">Premier IT-Enabled Services & Digital Solutions</span>
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
                    We transform complex technological challenges into scalable, efficient, and secure digital workflows. Partner with <strong className="text-white font-semibold">Skylink Innovations Ltd</strong> to accelerate your digital transformation and reach new heights.
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
                transition={{ duration: 0.8, delay: 0.45 }}
                className="relative z-10 w-full max-w-4xl mx-auto pt-16"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {stats.map((stat, index) => (
                        <div key={index} className="pt-6 md:pt-0 md:px-6 first:pt-0">
                            <div className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-1">
                                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">
                                    {stat.value}
                                </span>
                            </div>
                            <div className="text-sm font-medium text-slate-400">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default AuraHero;
