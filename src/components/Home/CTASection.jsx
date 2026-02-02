import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ctaBg from '../../assets/Photos/DSC05843.jpg';

const CTASection = () => {
    return (
        <section className="relative py-32 overflow-hidden flex items-center justify-center">
            {/* Parallax Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed transition-transform duration-1000"
                style={{ backgroundImage: `url(${ctaBg})` }}
            ></div>

            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/40"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto shadow-2xl overflow-hidden relative"
                >
                    {/* Decorative Blur */}
                    <div className="absolute -top-32 -left-32 w-64 h-64 bg-skylink-blue/30 rounded-full blur-[80px]"></div>
                    <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-tech-cyan/30 rounded-full blur-[80px]"></div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
                        Ready to Elevate Your Operations?
                    </h2>
                    <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
                        Whether you need to preserve a property portfolio or scale your customer support, Skylink is your strategic partner in growth.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                        {/* Primary Button */}
                        <Link
                            to="/contact"
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-skylink-blue rounded-lg overflow-hidden shadow-lg shadow-blue-900/50 transition-transform hover:scale-105"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative flex items-center">
                                Get Started Now <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>

                        {/* Secondary Button */}
                        <Link
                            to="/about"
                            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-white/20 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
                        >
                            <MessageCircle className="mr-2 w-5 h-5 opacity-80" />
                            Talk to an Expert
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
