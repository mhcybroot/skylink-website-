import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(1);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    const testimonials = [
        {
            quote: "Skylink has been a game-changer for our REO portfolio. Their turnaround time on preservation orders is unmatched in the industry.",
            author: "Sarah Johnson",
            role: "Asset Manager",
            company: "NY Asset Corp",
            initials: "SJ",
            rating: 5,
            gradient: "from-blue-500 to-purple-600",
        },
        {
            quote: "We outsourced our entire Tier-1 support to Skylink's BPO division. The transition was seamless and CSAT scores went up 15%.",
            author: "James Chen",
            role: "CTO",
            company: "TechFlow Solutions",
            initials: "JC",
            rating: 5,
            gradient: "from-cyan-500 to-blue-600",
        },
        {
            quote: "The renovation team transformed our distressed property into a market-ready gem in just 3 weeks. Incredible efficiency.",
            author: "Michael Ross",
            role: "Investment Director",
            company: "Ross Capital",
            initials: "MR",
            rating: 5,
            gradient: "from-amber-500 to-orange-600",
        },
        {
            quote: "Their 24/7 global support model has been instrumental in improving our customer satisfaction across time zones.",
            author: "Elena Rodriguez",
            role: "VP Operations",
            company: "Global Ventures Inc",
            initials: "ER",
            rating: 5,
            gradient: "from-emerald-500 to-teal-600",
        },
    ];

    // Auto-rotate testimonials
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [isAutoPlaying, testimonials.length]);

    const navigate = (direction) => {
        setIsAutoPlaying(false);
        if (direction === 'next') {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        } else {
            setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        }
        // Resume auto-play after 10 seconds of no interaction
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <section ref={sectionRef} className="py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-skylink-blue/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-tech-cyan/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 text-skylink-gold font-bold tracking-widest text-sm uppercase mb-4">
                        <div className="w-8 h-px bg-skylink-gold" />
                        Testimonials
                        <div className="w-8 h-px bg-skylink-gold" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-skylink-navy">
                        Trusted by Industry Leaders
                    </h2>
                </motion.div>

                {/* Testimonial Carousel */}
                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 relative"
                        >
                            {/* Quote icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -20 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="absolute -top-6 left-8 w-12 h-12 bg-skylink-gold rounded-full flex items-center justify-center shadow-lg"
                            >
                                <Quote size={20} className="text-white" />
                            </motion.div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                    >
                                        <Star size={18} className="text-skylink-gold fill-skylink-gold" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quote text */}
                            <blockquote className="text-xl md:text-2xl font-serif text-slate-700 leading-relaxed mb-8 italic">
                                "{testimonials[activeIndex].quote}"
                            </blockquote>

                            {/* Author info */}
                            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                                {/* Avatar */}
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-skylink-blue to-tech-cyan flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {testimonials[activeIndex].initials}
                                </div>
                                <div>
                                    <h4 className="font-bold text-skylink-navy text-lg">
                                        {testimonials[activeIndex].author}
                                    </h4>
                                    <p className="text-slate-500">
                                        {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => navigate('prev')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-skylink-blue hover:border-skylink-blue transition-colors hidden md:flex"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => navigate('next')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-skylink-blue hover:border-skylink-blue transition-colors hidden md:flex"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Dots navigation */}
                <div className="flex justify-center gap-3 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setActiveIndex(i);
                                setIsAutoPlaying(false);
                                setTimeout(() => setIsAutoPlaying(true), 10000);
                            }}
                            className={`relative h-3 transition-all duration-300 ${i === activeIndex ? 'w-8' : 'w-3'
                                }`}
                            aria-label={`Go to testimonial ${i + 1}`}
                        >
                            <span
                                className={`absolute inset-0 rounded-full transition-colors duration-300 ${i === activeIndex
                                    ? 'bg-skylink-gold'
                                    : 'bg-slate-300 hover:bg-slate-400'
                                    }`}
                            />
                            {i === activeIndex && (
                                <motion.span
                                    layoutId="activeDot"
                                    className="absolute inset-0 rounded-full ring-2 ring-skylink-gold/30"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

