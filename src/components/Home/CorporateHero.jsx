import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Import images
import hero1 from '../../assets/Photos/DSC05841.jpg'; // Meeting
import hero2 from '../../assets/Photos/DSC05810.jpg'; // Construction
import hero3 from '../../assets/Photos/DSC05839.jpg'; // Tech

const slides = [
    {
        image: hero1,
        title: "Strategic Asset Management.",
        subtitle: "Bridging the gap between physical infrastructure and digital optimization."
    },
    {
        image: hero2,
        title: "Precision in Property.",
        subtitle: "Nationwide preservation, inspection, and renovation services executed with military precision."
    },
    {
        image: hero3,
        title: "Scalable BPO Solutions.",
        subtitle: "Empowering global enterprises with high-performance back-office and IT support."
    }
];

const CorporateHero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-skylink-navy flex items-center">
            {/* Background Slider */}
            <AnimatePresence mode='popLayout'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }} // Lower opacity for serious tone
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-cover bg-center grayscale-[30%] contrast-125" // Industrial feel
                    style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
                />
            </AnimatePresence>

            {/* Industrial Overlay Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Gradient Fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-skylink-navy via-skylink-navy/80 to-transparent"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
                <div className="max-w-4xl border-l-4 border-skylink-gold pl-8 md:pl-12 py-4">
                    <motion.div
                        key={`text-${currentIndex}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-none">
                            {slides[currentIndex].title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 mb-10 font-sans font-light max-w-2xl leading-relaxed">
                            {slides[currentIndex].subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link to="/contact" className="group inline-flex items-center px-8 py-4 bg-white text-skylink-navy font-bold text-lg hover:bg-skylink-gold transition-colors duration-300">
                                PARTNER WITH US <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/property" className="inline-flex items-center px-8 py-4 border border-slate-500 text-white font-medium text-lg hover:border-white transition-colors duration-300">
                                EXPLORE CAPABILITIES
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Progress Bar Footer */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-800">
                <motion.div
                    key={`progress-${currentIndex}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="h-full bg-skylink-gold"
                />
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-12 right-12 flex space-x-6">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`text-sm font-bold tracking-widest transition-colors duration-300 ${idx === currentIndex ? 'text-white border-b-2 border-skylink-gold pb-1' : 'text-slate-500'}`}
                    >
                        0{idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CorporateHero;
