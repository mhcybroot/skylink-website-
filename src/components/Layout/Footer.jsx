import { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin, Send } from 'lucide-react';
import FooterTerrain from '../UI/FooterTerrain';

// ============================================
// FLOATING PARTICLES COMPONENT
// ============================================
const FloatingParticles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-skylink-gold"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.5, 0],
                        scale: [1, Math.random() * 2 + 1, 1],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

// FEATURE 2: 3D HEX SOCIAL BUTTON
const HexSocialButton = ({ icon: Icon, label, href, onHoverChange }) => {
    const ref = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const tiltX = (y / rect.height - 0.5) * -15;
        const tiltY = (x / rect.width - 0.5) * 15;
        setTilt({ x: tiltX, y: tiltY });

        ref.current.style.setProperty('--x', `${x}px`);
        ref.current.style.setProperty('--y', `${y}px`);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
                setHovered(true);
                onHoverChange(label);
            }}
            onMouseLeave={() => {
                setHovered(false);
                setTilt({ x: 0, y: 0 });
                onHoverChange(null);
            }}
            style={{
                transform: hovered
                    ? `perspective(400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.1, 1.1, 1.1)`
                    : 'perspective(400px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                transition: hovered ? 'none' : 'transform 0.4s ease-out'
            }}
            className="w-11 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-br hover:from-skylink-blue hover:to-tech-cyan transition-colors shadow-lg glow-hover relative z-10"
            aria-label={label}
        >
            <div style={{ transform: 'translateZ(10px)' }}>
                <Icon size={18} />
            </div>
        </motion.a>
    );
};

// FEATURE 2: ACTIVE CIRCUIT CONNECTOR SVG
const BrandColumnConnector = ({ hoveredSocial }) => {
    if (!hoveredSocial) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
            <svg className="w-full h-full text-tech-cyan" viewBox="0 0 250 400" fill="none">
                <motion.path
                    d="M 50 360 C 20 280, 20 180, 40 80"
                    stroke="rgba(6, 182, 212, 0.15)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <motion.path
                    d="M 50 360 C 20 280, 20 180, 40 80"
                    stroke="#c29b40"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8 }}
                />
                {/* Traveling node */}
                <motion.circle
                    r="3.5"
                    fill="#06b6d4"
                    animate={{
                        cx: [50, 43, 30, 25, 30, 40],
                        cy: [360, 310, 260, 200, 140, 80],
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            </svg>
        </div>
    );
};

// ============================================
// FOOTER COMPONENT
// ============================================
const Footer = () => {
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, margin: '-50px' });
    const [hoveredSocial, setHoveredSocial] = useState(null);

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
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <footer ref={footerRef} className="relative bg-skylink-navy text-white overflow-hidden pt-20">
            {/* Animated SVG Wave Border */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
                <svg
                    className="relative block w-[calc(100%+1.3px)] h-[80px] -mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <motion.path
                        animate={{
                            d: [
                                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
                                "M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5V0Z",
                                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                            ]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="fill-skylink-blue/20"
                    />
                </svg>
            </div>
            {/* Solid accent line to hide seam */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-skylink-blue via-tech-cyan to-skylink-gold" />

            {/* Background decorations & Particles */}
            <FooterTerrain />
            <FloatingParticles />
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-skylink-blue/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-tech-cyan/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
                >
                    {/* Brand Column with Circuit Connector */}
                    <motion.div variants={itemVariants} className="relative">
                        <BrandColumnConnector hoveredSocial={hoveredSocial} />

                        <Link to="/" className="inline-block mb-6 group relative z-10">
                            <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-white bg-[length:200%_auto] animate-[gradient-shift_3s_linear_infinite]">
                                SKYLINK<span className="text-skylink-gold group-hover:text-tech-cyan transition-colors duration-500">.</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 relative z-10">
                            Premier asset management and BPO solutions for global enterprises. Bridging the gap between physical infrastructure and digital optimization.
                        </p>
                        
                        {/* Newsletter Input with Gradient Border */}
                        <div className="relative mb-8 group p-[1px] rounded-lg bg-white/10 hover:bg-gradient-to-r hover:from-skylink-blue hover:via-tech-cyan hover:to-skylink-gold transition-all duration-500 z-10 glow-hover">
                            <div className="flex bg-skylink-navy rounded-lg p-1">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="bg-transparent border-none outline-none text-sm px-3 py-2 w-full text-white placeholder:text-slate-500 focus:ring-0"
                                />
                                <button className="bg-white/10 hover:bg-white/20 p-2 rounded-md transition-colors text-tech-cyan group-hover:text-skylink-gold">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Hexagonal Social Links */}
                        <div className="flex space-x-3 relative z-10">
                            {socials.map((social, idx) => (
                                <HexSocialButton
                                    key={idx}
                                    icon={social.icon}
                                    label={social.label}
                                    href={social.href}
                                    onHoverChange={setHoveredSocial}
                                />
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
                                        className="group flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                    >
                                        <span className="w-0 group-hover:w-4 h-px bg-tech-cyan mr-0 group-hover:mr-3 transition-all duration-300" />
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
                                        className="group flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                    >
                                        <span className="w-0 group-hover:w-4 h-px bg-tech-cyan mr-0 group-hover:mr-3 transition-all duration-300" />
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
                                <div className="p-2 bg-white/5 rounded-lg mr-4 group-hover:bg-skylink-gold/20 border border-white/5 transition-colors">
                                    <MapPin size={16} className="text-skylink-gold group-hover:animate-bounce" />
                                </div>
                                <span className="leading-relaxed">7th Floor, Badar Heights, House# 262-263<br />Road# 1, Block# B, Bashundhara R/A<br />Dhaka-1229, Bangladesh</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center group cursor-pointer"
                            >
                                <div className="p-2 bg-white/5 rounded-lg mr-4 group-hover:bg-skylink-gold/20 border border-white/5 transition-colors">
                                    <Phone size={16} className="text-skylink-gold group-hover:animate-bounce" />
                                </div>
                                <span>+1 (555) 123-4567</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center group cursor-pointer"
                            >
                                <div className="p-2 bg-white/5 rounded-lg mr-4 group-hover:bg-skylink-gold/20 border border-white/5 transition-colors">
                                    <Mail size={16} className="text-skylink-gold group-hover:animate-bounce" />
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
                    className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10"
                >
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} Skylink Innovations Ltd. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6 text-xs text-slate-500">
                        <span className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse-glow_2s_infinite]" />
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
