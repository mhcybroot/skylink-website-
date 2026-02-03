import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            className="relative bg-skylink-navy py-28 overflow-hidden"
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-skylink-navy via-skylink-blue/20 to-skylink-navy" />

                {/* Floating orbs */}
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech-cyan/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        x: [0, -30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-skylink-gold/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-skylink-blue/10 rounded-full blur-3xl"
                />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
                >
                    <Sparkles size={16} className="text-skylink-gold" />
                    <span className="text-sm font-medium text-white/80">Ready to Transform Your Operations?</span>
                </motion.div>

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight"
                >
                    Partner with{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-skylink-gold to-yellow-400">
                        Excellence
                    </span>
                </motion.h2>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    Join industry leaders who rely on Skylink for precision, compliance, and scalable solutions
                    that drive real business results.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/contact"
                            className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-skylink-gold to-yellow-500 text-skylink-navy font-bold text-lg uppercase tracking-wider rounded-lg shadow-xl hover:shadow-glow-gold transition-all duration-300"
                        >
                            Schedule Consultation
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/about"
                            className="inline-flex items-center justify-center px-10 py-5 border-2 border-white/30 text-white font-bold text-lg uppercase tracking-wider rounded-lg hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
                        >
                            View Corporate Profile
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 flex flex-wrap justify-center gap-8 text-slate-400 text-sm"
                >
                    {['Fortune 500 Trusted', 'ISO Certified', '24/7 Support', '99.9% Uptime'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-skylink-gold" />
                            {item}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;

