import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Globe, DollarSign, Laptop, Coffee, ChevronRight, Check } from 'lucide-react';

const benefits = [
    {
        id: 1,
        title: "Global Health Coverage",
        description: "Comprehensive medical, dental, and vision for you and your dependents, wherever you are in the world.",
        icon: Heart,
        color: "skylink-blue"
    },
    {
        id: 2,
        title: "Remote Work Stipend",
        description: "$1,500 annual budget to upgrade your home office setup with the latest gear.",
        icon: Laptop,
        color: "tech-cyan"
    },
    {
        id: 3,
        title: "Wellness & Fitness",
        description: "Monthly allowance for gym memberships, yoga classes, or mental health app subscriptions.",
        icon: Activity,
        color: "skylink-gold"
    },
    {
        id: 4,
        title: "Work From Anywhere",
        description: "Work up to 90 days a year from any country with our distributed team network.",
        icon: Globe,
        color: "purple-400"
    },
    {
        id: 5,
        title: "Competitive Equity",
        description: "We believe in shared success. All full-time roles include performance-based stock options.",
        icon: DollarSign,
        color: "emerald-400"
    },
    {
        id: 6,
        title: "Continuous Learning",
        description: "Unlimited access to premium courses, plus an annual conference budget to keep you sharp.",
        icon: Coffee,
        color: "amber-400"
    }
];

const Card = ({ benefit, index, setCards, cards, dragParams }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-18, 18]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
    const isFront = index === cards.length - 1;

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 100 || info.offset.x < -100) {
            // Remove card
            setCards((prev) => prev.filter((c) => c.id !== benefit.id));
        } else {
            // Spring back
        }
    };

    const Icon = benefit.icon;

    return (
        <motion.div
            style={{
                gridRow: 1,
                gridColumn: 1,
                x: isFront ? x : 0,
                rotate: isFront ? rotate : index % 2 === 0 ? 4 : -4,
                opacity: isFront ? opacity : 1,
                zIndex: index,
                scale: isFront ? 1 : 1 - (cards.length - 1 - index) * 0.05,
                y: isFront ? 0 : (cards.length - 1 - index) * 15,
            }}
            drag={isFront ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
            className={`w-80 h-[400px] md:w-96 md:h-[450px] bg-slate-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col justify-between p-8 cursor-grab mx-auto origin-bottom`}
        >
            <div className="flex justify-between items-start mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-${benefit.color}/10 border border-${benefit.color}/20 flex items-center justify-center`}>
                    <Icon className={`text-${benefit.color}`} size={32} />
                </div>
                <div className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {index + 1} / {benefits.length}
                </div>
            </div>

            <div>
                <h3 className="text-3xl font-bold text-white mb-4 font-serif">{benefit.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                    {benefit.description}
                </p>
            </div>

            <div className="flex justify-between items-center mt-8 border-t border-white/5 pt-6">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                    Skylink Benefits
                </span>
                <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-white font-mono">
                    Swipe <ChevronRight size={10} className="inline ml-1" />
                </span>
            </div>
        </motion.div>
    );
};

export default function BenefitsDeck() {
    const [cards, setCards] = useState(benefits);

    const handleReset = () => {
        setCards(benefits);
    };

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-skylink-blue font-bold tracking-widest text-sm uppercase mb-4">
                        <div className="w-8 h-px bg-skylink-blue" />
                        Beyond the Salary
                        <div className="w-8 h-px bg-skylink-blue" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">Comprehensive Benefits</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        We invest heavily in our team's physical, mental, and financial well-being. Swipe through the deck to see what's included.
                    </p>
                </div>

                <div className="relative h-[500px] w-full grid place-items-center">
                    {cards.length > 0 ? (
                        <div className="grid">
                            <AnimatePresence>
                                {cards.map((benefit, index) => (
                                    <Card
                                        key={benefit.id}
                                        benefit={benefit}
                                        index={index}
                                        setCards={setCards}
                                        cards={cards}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                                <Check size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-serif">You've seen them all</h3>
                            <button 
                                onClick={handleReset}
                                className="px-6 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                            >
                                Reset Deck
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
            
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-skylink-blue/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
}
