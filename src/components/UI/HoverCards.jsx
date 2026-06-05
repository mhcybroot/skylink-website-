import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Target, Users, Zap, Globe, Cpu } from 'lucide-react';

const cards = [
    { id: 1, title: 'Integrity', icon: Shield, desc: 'We operate with full transparency. No hidden fees, no cut corners. We are the constant.' },
    { id: 2, title: 'Execution', icon: Target, desc: 'Precision execution in every property secured and every call answered.' },
    { id: 3, title: 'People First', icon: Users, desc: 'Technology empowers us, but people define us. We invest in our global workforce.' },
    { id: 4, title: 'Velocity', icon: Zap, desc: 'Rapid SLA fulfillment leveraging a distributed 24/7/365 follow-the-sun model.' },
    { id: 5, title: 'Global', icon: Globe, desc: 'Standardized excellence across hubs in NY, London, Dhaka, and Manila.' },
    { id: 6, title: 'Innovation', icon: Cpu, desc: 'Integrating AI and automation to enhance human capabilities, not replace them.' }
];

export default function HoverCards() {
    const [hoveredCard, setHoveredCard] = useState(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
            {cards.map((card, idx) => {
                const Icon = card.icon;
                const isHovered = hoveredCard === card.id;

                return (
                    <motion.div
                        key={card.id}
                        onHoverStart={() => setHoveredCard(card.id)}
                        onHoverEnd={() => setHoveredCard(null)}
                        className={`relative p-8 rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 border ${
                            isHovered ? 'border-tech-cyan/50 bg-slate-900/80 shadow-[0_0_30px_rgba(6,182,212,0.15)]' : 'border-white/5 bg-white/5'
                        } backdrop-blur-sm`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        {/* Dynamic background effect */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)] pointer-events-none"
                                />
                            )}
                        </AnimatePresence>

                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${
                            isHovered ? 'bg-tech-cyan text-slate-950' : 'bg-slate-800 text-tech-cyan'
                        }`}>
                            <Icon size={24} />
                        </div>

                        <h3 className={`text-xl font-bold mb-3 font-serif transition-colors duration-300 ${
                            isHovered ? 'text-white' : 'text-slate-300'
                        }`}>
                            {card.title}
                        </h3>

                        <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                            isHovered ? 'text-slate-200' : 'text-slate-500'
                        }`}>
                            {card.desc}
                        </p>

                        {/* Interactive scan line */}
                        <motion.div 
                            className="absolute left-0 right-0 h-[1px] bg-tech-cyan/50 blur-[1px]"
                            initial={{ top: '-10%' }}
                            animate={{ top: isHovered ? '110%' : '-10%' }}
                            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
