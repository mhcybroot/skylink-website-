import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingCTA = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const contactOptions = [
        {
            icon: MessageSquare,
            label: 'WhatsApp',
            href: 'https://wa.me/15551234567',
            color: 'bg-green-500 hover:bg-green-600',
            external: true,
        },
        {
            icon: Phone,
            label: 'Call Now',
            href: 'tel:+15551234567',
            color: 'bg-blue-500 hover:bg-blue-600',
            external: true,
        },
        {
            icon: Mail,
            label: 'Email Us',
            href: 'mailto:info@skylink-ltd.com',
            color: 'bg-purple-500 hover:bg-purple-600',
            external: true,
        },
    ];

    return (
        <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-3">
            {/* Expanded Contact Options */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsExpanded(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
                        />

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
                                    target={option.external ? '_blank' : undefined}
                                    rel={option.external ? 'noopener noreferrer' : undefined}
                                    initial={{ opacity: 0, x: 30, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ delay: index * 0.08, type: 'spring', stiffness: 300 }}
                                    whileHover={{ scale: 1.05, x: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center gap-3 px-5 py-3 rounded-full text-white shadow-lg ${option.color} transition-all`}
                                >
                                    <option.icon size={18} />
                                    <span className="text-sm font-bold">{option.label}</span>
                                </motion.a>
                            ))}

                            {/* Contact Page Link */}
                            <motion.div
                                initial={{ opacity: 0, x: 30, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: 0.24, type: 'spring', stiffness: 300 }}
                            >
                                <Link
                                    to="/contact"
                                    onClick={() => setIsExpanded(false)}
                                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-skylink-gold to-amber-500 text-white shadow-lg hover:shadow-xl transition-all"
                                >
                                    <MessageCircle size={18} />
                                    <span className="text-sm font-bold">Contact Form</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className={`relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${isExpanded
                    ? 'bg-slate-700'
                    : 'bg-gradient-to-br from-tech-cyan to-blue-500'
                    }`}
                aria-label={isExpanded ? 'Close contact options' : 'Open contact options'}
            >
                {/* Glow effect when not expanded */}
                {!isExpanded && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-tech-cyan"
                        animate={{
                            scale: [1, 1.5],
                            opacity: [0.4, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeOut',
                        }}
                    />
                )}

                <motion.div
                    animate={{ rotate: isExpanded ? 135 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isExpanded ? (
                        <X size={24} className="text-white" />
                    ) : (
                        <MessageCircle size={24} className="text-white" />
                    )}
                </motion.div>
            </motion.button>

            {/* Tooltip */}
            {!isExpanded && (
                <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-skylink-navy text-white text-xs py-2 px-3 rounded-lg whitespace-nowrap hidden md:block"
                >
                    Need Help?
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-skylink-navy rotate-45" />
                </motion.span>
            )}
        </div>
    );
};

export default FloatingCTA;

