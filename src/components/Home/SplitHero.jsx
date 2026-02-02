import { ArrowRight, Hammer, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import logo from '../../assets/logo.webp';

import propertyBg from '../../assets/Photos/DSC05810.jpg';
import meeting02 from '../../assets/meeting-02.webp';

const SplitHero = () => {
    return (
        <div className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
            {/* Property Vertical */}
            <div className="flex-1 relative flex items-center justify-center p-12 bg-slate-700 group hover:flex-[1.2] transition-all duration-700 ease-in-out border-b md:border-b-0 md:border-r border-slate-300">
                <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700" style={{ backgroundImage: `url(${propertyBg})` }}></div>
                <div className="relative z-10 text-center md:text-left max-w-lg">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center justify-center p-3 bg-skylink-blue/10 rounded-full mb-6">
                            <Hammer className="text-skylink-blue w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-300 mb-4">
                            Real Estate <br /><span className="text-skylink-blue">Solutions</span>
                        </h2>
                        <p className="text-lg text-slate-300 mb-8">
                            Expert property preservation, renovation, and maintenance services for asset managers and investors.
                        </p>
                        <Link to="/property" className="inline-flex items-center px-8 py-3 bg-skylink-blue text-white rounded-md font-semibold hover:bg-blue-800 transition shadow-lg hover:shadow-blue-500/30">
                            Explore Property Services <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* ITES Vertical */}
            <div className="flex-1 relative flex items-center justify-center p-12 bg-slate-900 group hover:flex-[1.2] transition-all duration-700 ease-in-out">
                <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700" style={{ backgroundImage: `url(${meeting02})` }}></div>
                <div className="relative z-10 text-center md:text-right max-w-lg">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <div className="inline-flex items-center justify-center p-3 bg-tech-cyan/10 rounded-full mb-6">
                            <Monitor className="text-tech-cyan w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Digital <br /><span className="text-tech-cyan">Transformation</span>
                        </h2>
                        <p className="text-lg text-slate-300 mb-8">
                            World-class BPO, IT support, and digital services driving global business efficiency.
                        </p>
                        <Link to="/ites" className="inline-flex items-center px-8 py-3 bg-tech-cyan text-slate-900 rounded-md font-semibold hover:bg-cyan-400 transition shadow-lg hover:shadow-cyan-500/30">
                            Explore Digital Solutions <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Center Branding (Desktop Only) */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                <div className="bg-white p-4 rounded-full shadow-2xl">
                    <img src={logo} alt="SL" className="w-16 h-16 object-contain" />
                </div>
            </div>

        </div>
    );
};

export default SplitHero;
