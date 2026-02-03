import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowUp, X, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingCTA = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const contactOptions = [
        {
            icon: Phone,
            label: 'Call Us',
            href: 'tel:+15551234567',
            color: 'bg-green-500 hover:bg-green-600',
        },
        {
            icon: Mail,
            label: 'Email',
            href: 'mailto:info@skylink-ltd.com',
            color: 'bg-skylink-blue hover:bg-blue-800',
        },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Back to Top Button */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 20 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        className="w-12 h-12 rounded-full bg-skylink-navy text-white shadow-lg flex items-center justify-center hover:bg-skylink-blue transition-colors"
                        aria-label="Back to top"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Expanded Contact Options */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="flex flex-col gap-3"
                    >
                        {contactOptions.map((option, index) => (
                            <motion.a
                                key={option.label}
                                href={option.href}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, x: -5 }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg ${option.color} transition-all`}
                            >
                                <option.icon size={18} />
                                <span className="text-sm font-medium">{option.label}</span>
                            </motion.a>
                        ))}

                        {/* Contact Page Link */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link
                                to="/contact"
                                className="flex items-center gap-3 px-4 py-3 rounded-full bg-skylink-gold text-white shadow-lg hover:bg-yellow-600 transition-colors"
                            >
                                <MessageCircle size={18} />
                                <span className="text-sm font-medium">Contact Form</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className={`relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${isExpanded
                        ? 'bg-slate-600 rotate-45'
                        : 'bg-gradient-to-br from-skylink-gold to-yellow-600'
                    }`}
                aria-label={isExpanded ? 'Close contact options' : 'Open contact options'}
            >
                {/* Pulse effect when not expanded */}
                {!isExpanded && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-skylink-gold"
                        animate={{
                            scale: [1, 1.4],
                            opacity: [0.5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeOut',
                        }}
                    />
                )}

                {isExpanded ? (
                    <X size={24} className="text-white" />
                ) : (
                    <MessageCircle size={24} className="text-white" />
                )}
            </motion.button>
        </div>
    );
};

export default FloatingCTA;
