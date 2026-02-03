import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin, ArrowUpRight, Send } from 'lucide-react';

const Footer = () => {
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, margin: '-50px' });

    const solutions = [
        { name: 'Property Preservation', link: '/property' },
        { name: 'REO & Rehab', link: '/property' },
        { name: 'ITES & BPO', link: '/ites' },
        { name: 'Digital Strategy', link: '/ites' },
    ];

    const company = [
        { name: 'About Us', link: '/about' },
        { name: 'Careers', link: '/careers' },
        { name: 'Contact', link: '/contact' },
        { name: 'Privacy Policy', link: '/privacy' },
    ];

    const socials = [
        { icon: Linkedin, label: 'LinkedIn', href: '#' },
        { icon: Twitter, label: 'Twitter', href: '#' },
        { icon: Facebook, label: 'Facebook', href: '#' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer ref={footerRef} className="relative bg-skylink-navy text-white overflow-hidden">
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-skylink-blue via-tech-cyan to-skylink-gold" />

            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-skylink-blue/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-tech-cyan/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
                >
                    {/* Brand Column */}
                    <motion.div variants={itemVariants}>
                        <Link to="/" className="inline-block text-2xl font-bold tracking-tighter mb-6 group">
                            SKYLINK<span className="text-skylink-gold group-hover:text-tech-cyan transition-colors">.</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">
                            Premier asset management and BPO solutions for global enterprises. Bridging the gap between physical infrastructure and digital optimization.
                        </p>
                        <div className="flex space-x-3">
                            {socials.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Solutions */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">Solutions</h4>
                        <ul className="space-y-4">
                            {solutions.map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={item.link}
                                        className="group flex items-center text-sm font-medium text-slate-300 hover:text-skylink-gold transition-colors"
                                    >
                                        <span className="w-0 group-hover:w-4 h-px bg-skylink-gold mr-0 group-hover:mr-3 transition-all duration-300" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">Company</h4>
                        <ul className="space-y-4">
                            {company.map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={item.link}
                                        className="group flex items-center text-sm font-medium text-slate-300 hover:text-skylink-gold transition-colors"
                                    >
                                        <span className="w-0 group-hover:w-4 h-px bg-skylink-gold mr-0 group-hover:mr-3 transition-all duration-300" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">Headquarters</h4>
                        <div className="space-y-6 text-sm text-slate-300">
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-start group cursor-pointer"
                            >
                                <div className="p-2 bg-skylink-gold/10 rounded-lg mr-4 group-hover:bg-skylink-gold/20 transition-colors">
                                    <MapPin size={16} className="text-skylink-gold" />
                                </div>
                                <span className="leading-relaxed">7th Floor, Badar Heights, House# 262-263<br />Road# 1, Block# B, Bashundhara R/A<br />Dhaka-1229, Bangladesh</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center group cursor-pointer"
                            >
                                <div className="p-2 bg-skylink-gold/10 rounded-lg mr-4 group-hover:bg-skylink-gold/20 transition-colors">
                                    <Phone size={16} className="text-skylink-gold" />
                                </div>
                                <span>+1 (555) 123-4567</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center group cursor-pointer"
                            >
                                <div className="p-2 bg-skylink-gold/10 rounded-lg mr-4 group-hover:bg-skylink-gold/20 transition-colors">
                                    <Mail size={16} className="text-skylink-gold" />
                                </div>
                                <span>contact@skylink-ltd.com</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} Skylink Innovations Ltd. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6 text-xs text-slate-500">
                        <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            All Systems Operational
                        </span>
                        <span className="hidden md:inline">|</span>
                        <span className="font-medium text-slate-400">A NEXUS NETRO COMPANY</span>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;

