import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';

const InteractiveFAQ = ({ faqs, title = "Frequently Asked Questions" }) => {
    const [search, setSearch] = useState('');
    const [expanded, setExpanded] = useState(null);

    const filteredFaqs = useMemo(() => {
        if (!search) return faqs;
        const lowerSearch = search.toLowerCase();
        return faqs.filter(faq => 
            faq.question.toLowerCase().includes(lowerSearch) || 
            faq.answer.toLowerCase().includes(lowerSearch)
        );
    }, [faqs, search]);

    const playHiss = () => {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const bufferSize = audioCtx.sampleRate * 0.3;
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.1));
            }
            const whiteNoise = audioCtx.createBufferSource();
            whiteNoise.buffer = buffer;
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 1000;
            const gain = audioCtx.createGain();
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
            whiteNoise.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);
            whiteNoise.start();
        } catch(e) {}
    };

    const toggleFaq = (index) => {
        if (expanded !== index) playHiss();
        setExpanded(expanded === index ? null : index);
    };

    return (
        <div className="w-full max-w-4xl mx-auto py-16 relative z-10">
            <div className="text-center mb-8">
                <h3 className="text-3xl font-bold font-serif text-white mb-6">{title}</h3>
                <div className="relative max-w-md mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search size={16} className="text-tech-cyan" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search queries..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-tech-cyan/50 focus:ring-1 focus:ring-tech-cyan/50 transition-all shadow-inner"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {filteredFaqs.map((faq, index) => {
                        const isExpanded = expanded === index;
                        return (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass rounded-xl overflow-hidden border border-white/5 relative"
                            >
                                <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${isExpanded ? 'bg-skylink-gold shadow-[0_0_15px_rgba(194,155,64,0.6)]' : 'bg-tech-cyan/20 group-hover:bg-tech-cyan/50'}`} />
                                <button 
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors group"
                                >
                                    <span className={`font-bold transition-colors duration-300 pr-8 ${isExpanded ? 'text-skylink-gold' : 'text-slate-200'}`}>
                                        {faq.question}
                                    </span>
                                    <ChevronDown 
                                        size={18} 
                                        className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180 text-skylink-gold' : 'group-hover:text-tech-cyan'}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className="px-8 pb-6 pt-2 text-sm text-slate-400 leading-relaxed pr-12">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-8 text-slate-500 font-mono text-xs">
                            ERR_NO_MATCHING_PROTOCOLS_FOUND
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InteractiveFAQ;
