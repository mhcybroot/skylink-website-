import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ctaBg from '../../assets/Photos/DSC05843.jpg';

const CTASection = () => {
    return (
        <section className="relative py-32 overflow-hidden flex items-center justify-center">
            {/* Parallax Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${ctaBg})` }}
            ></div>

            {/* Light Overlay */}
            <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <span className="text-skylink-blue font-bold tracking-widest text-sm uppercase mb-4 block">Let's Build Together</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                        Ready to Elevate Your Operations?
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Whether you need to preserve a property portfolio or scale your customer support, Skylink is your strategic partner in growth.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        {/* Primary Button */}
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-skylink-blue hover:bg-blue-700 rounded-lg shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1"
                        >
                            Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>

                        {/* Secondary Button */}
                        <Link
                            to="/about"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                        >
                            <MessageCircle className="mr-2 w-5 h-5 text-skylink-blue" />
                            Talk to an Expert
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
