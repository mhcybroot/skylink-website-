import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

import caseStudy1 from '../../assets/Photos/DSC05809.jpg';
import caseStudy2 from '../../assets/Photos/DSC05814.jpg';
import caseStudy3 from '../../assets/Photos/DSC05856.jpg';

const caseStudies = [
    {
        id: 1,
        title: "Hurricane Response 2022",
        category: "Disaster Recovery",
        metric: "500+ Assets Secured",
        desc: "Rapid deployment of field teams across the Eastern Seaboard to secure and stabilize properties within 48 hours of landfall.",
        img: caseStudy1,
        color: "text-skylink-gold"
    },
    {
        id: 2,
        title: "BPO Expansion Manila",
        category: "Global Operations",
        metric: "300% Capacity Inc.",
        desc: "Launched a state-of-the-art delivery center in Metro Manila, integrating AI-driven QA and reducing average handling time by 40%.",
        img: caseStudy2,
        color: "text-tech-cyan"
    },
    {
        id: 3,
        title: "National CapEx Rollout",
        category: "Property Preservation",
        metric: "$12M Portfolio",
        desc: "Managed end-to-end renovation pipelines for a major institutional investor, covering 15 states with standardized material procurement.",
        img: caseStudy3,
        color: "text-skylink-blue"
    }
];

const CaseStudyCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);

    return (
        <div className="w-full relative h-[550px] flex items-center justify-center perspective-1200 mt-8 mb-16 overflow-hidden">
            <div className="absolute top-4 left-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest z-20 hidden md:block">
                Data Archive // Operations History
            </div>

            <div className="absolute left-4 z-40">
                <button onClick={prev} className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-skylink-gold transition-colors text-white shadow-xl">
                    <ChevronLeft />
                </button>
            </div>

            <div className="absolute right-4 z-40">
                <button onClick={next} className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-skylink-gold transition-colors text-white shadow-xl">
                    <ChevronRight />
                </button>
            </div>

            <div className="relative w-full max-w-5xl h-full flex items-center justify-center transform-style-3d">
                <AnimatePresence initial={false} mode="popLayout">
                    {caseStudies.map((study, index) => {
                        const offset = (index - currentIndex + caseStudies.length) % caseStudies.length;
                        if (offset > 1 && offset < caseStudies.length - 1) return null; // Only show prev, current, next

                        let x = 0;
                        let z = 0;
                        let rotateY = 0;
                        let opacity = 1;
                        let zIndex = 10;

                        if (offset === 0) {
                            // Current
                            x = 0; z = 0; rotateY = 0; opacity = 1; zIndex = 20;
                        } else if (offset === 1) {
                            // Next
                            x = 220; z = -150; rotateY = -25; opacity = 0.4; zIndex = 10;
                        } else if (offset === caseStudies.length - 1) {
                            // Prev
                            x = -220; z = -150; rotateY = 25; opacity = 0.4; zIndex = 10;
                        }

                        // Mobile adjustments
                        if (typeof window !== 'undefined' && window.innerWidth < 768) {
                            if (offset !== 0) {
                                opacity = 0; // Hide side cards on mobile
                            }
                        }

                        return (
                            <motion.div
                                key={study.id}
                                initial={false}
                                animate={{ x, z, rotateY, opacity, zIndex }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                className="absolute w-[320px] md:w-[500px] h-[450px] rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer"
                                onClick={() => {
                                    if (offset === 1) next();
                                    else if (offset === caseStudies.length - 1) prev();
                                }}
                            >
                                <div className="absolute inset-0 bg-skylink-navy/30 mix-blend-multiply z-10" />
                                <img src={study.img} alt={study.title} className="w-full h-full object-cover absolute inset-0 grayscale-[20%]" />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-20 flex flex-col justify-end p-8">
                                    <span className={`text-[10px] font-mono tracking-widest uppercase mb-2 ${study.color}`}>
                                        {study.category}
                                    </span>
                                    <h3 className="text-3xl font-bold font-serif text-white mb-2 leading-tight">
                                        {study.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="h-px w-8 bg-white/30" />
                                        <span className="text-tech-cyan text-xs font-bold tracking-wider">{study.metric}</span>
                                    </div>
                                    <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-6">
                                        {study.desc}
                                    </p>
                                    
                                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-skylink-gold transition-colors w-max group">
                                        View Case File
                                        <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                                
                                {/* Overlay for inactive cards */}
                                {offset !== 0 && (
                                    <div className="absolute inset-0 bg-slate-950/40 z-30 pointer-events-none" />
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
            
            {/* Pagination indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {caseStudies.map((_, i) => (
                    <button 
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-skylink-gold w-8' : 'bg-white/30 hover:bg-white/60'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CaseStudyCarousel;
