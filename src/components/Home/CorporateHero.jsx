import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Monitor } from 'lucide-react';

// Import images
import hero1 from '../../assets/Photos/DSC05841.jpg'; // Corporate/Meeting
import hero2 from '../../assets/Photos/DSC05810.jpg'; // Construction/Property
import hero3 from '../../assets/Photos/DSC05839.jpg'; // Tech/Office

const backgroundImages = [hero1, hero2, hero3];

const CorporateHero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center bg-slate-900">
            {/* Background Slider */}
            <AnimatePresence mode='popLayout'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImages[currentIndex]})` }}
                >
                    {/* Dark Overlay for text readability */}
                    <div className="absolute inset-0 bg-slate-900/60"></div>
                </motion.div>
            </AnimatePresence>

            {/* Content Content - Glassmorphism */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-2xl shadow-2xl">
                    <motion.div
                        key={`content-${currentIndex}`} // Re-animate text slightly on slide change? No, keep static.
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-skylink-blue/90 text-white text-sm font-semibold mb-6 tracking-wide border border-white/20">
                            GLOBAL EXPERTISE. DUAL VERTICALS.
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                            Innovating <span className="text-transparent bg-clip-text bg-gradient-to-r from-skylink-blue to-blue-400">Spaces</span> & <br />
                            Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-cyan to-cyan-200">Systems</span>.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-100 mb-10 leading-relaxed font-light drop-shadow-md">
                            Skylink Innovations connects physical infrastructure with digital excellence. From property preservation to IT enabled services, we deliver precision at scale.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/property" className="flex items-center justify-center px-8 py-4 bg-skylink-blue hover:bg-blue-700 text-white rounded-lg font-bold transition shadow-lg hover:shadow-blue-500/50">
                                <Building className="mr-2 h-5 w-5" /> Property Solutions
                            </Link>
                            <Link to="/ites" className="flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-lg font-bold transition backdrop-blur-sm hover:shadow-lg">
                                <Monitor className="mr-2 h-5 w-5" /> ITES & BPO Services
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white rounded-full"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default CorporateHero;
