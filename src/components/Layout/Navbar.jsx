import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Building, Monitor, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    // Check if we are on the home page
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Text color logic: White on Hero (if Home and not scrolled), Dark otherwise
    const textColorClass = isHome && !isScrolled ? 'text-white' : 'text-slate-900';

    // Background logic: Transparent on Hero, Enhanced glassmorphism otherwise
    const bgClass = isHome && !isScrolled
        ? 'bg-transparent'
        : 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20';

    // Check if link is active
    const isActivePath = (path) => location.pathname === path;

    // Nav link component with animated underline
    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            className={`relative text-sm font-semibold tracking-wide uppercase transition-colors group ${textColorClass} hover:text-skylink-gold`}
        >
            {children}
            {/* Animated underline */}
            {isActivePath(to) ? (
                <motion.div
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-skylink-gold"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
            ) : (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-skylink-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            )}
        </Link>
    );

    // Mega menu item variants
    const menuItemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.3 }
        })
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${bgClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo Area */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 group">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                                className={`h-10 w-auto transition duration-300 ${isHome && !isScrolled ? 'brightness-0 invert' : ''}`}
                                src={logo}
                                alt="Skylink Innovations"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        <NavLink to="/">Home</NavLink>

                        {/* Mega Menu Trigger */}
                        <div className="relative group"
                            onMouseEnter={() => setActiveDropdown('services')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className={`flex items-center text-sm font-semibold tracking-wide uppercase transition-colors focus:outline-none group ${textColorClass} hover:text-skylink-gold`}>
                                Services
                                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Mega Menu Dropdown */}
                            <AnimatePresence>
                                {activeDropdown === 'services' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                        transition={{ duration: 0.25, ease: 'easeOut' }}
                                        className="absolute left-1/2 transform -translate-x-1/2 top-full mt-4 w-[620px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-3xl p-3 border border-slate-100/50 overflow-hidden"
                                    >
                                        {/* Decorative gradient */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-skylink-blue via-tech-cyan to-skylink-gold" />

                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            <motion.div
                                                custom={0}
                                                variants={menuItemVariants}
                                                initial="hidden"
                                                animate="visible"
                                            >
                                                <Link
                                                    to="/property"
                                                    className="group/item flex flex-col p-5 rounded-xl hover:bg-gradient-to-br hover:from-skylink-blue/5 hover:to-skylink-blue/10 transition-all duration-300"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    <div className="flex items-center mb-3">
                                                        <div className="p-3 bg-skylink-blue/10 rounded-xl mr-4 group-hover/item:bg-skylink-blue group-hover/item:shadow-glow-blue transition-all duration-300">
                                                            <Building className="w-6 h-6 text-skylink-blue group-hover/item:text-white transition-colors" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-slate-900 text-lg group-hover/item:text-skylink-blue transition-colors">Property Services</h3>
                                                            <p className="text-xs text-slate-400">Physical Asset Solutions</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-slate-500 leading-relaxed">Preservation, Maintenance, and Renovation solutions for asset managers.</p>
                                                    <div className="flex items-center mt-3 text-skylink-blue font-semibold text-sm opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                        Learn more <ArrowRight className="ml-2 w-4 h-4" />
                                                    </div>
                                                </Link>
                                            </motion.div>

                                            <motion.div
                                                custom={1}
                                                variants={menuItemVariants}
                                                initial="hidden"
                                                animate="visible"
                                            >
                                                <Link
                                                    to="/ites"
                                                    className="group/item flex flex-col p-5 rounded-xl hover:bg-gradient-to-br hover:from-tech-cyan/5 hover:to-tech-cyan/10 transition-all duration-300"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    <div className="flex items-center mb-3">
                                                        <div className="p-3 bg-tech-cyan/10 rounded-xl mr-4 group-hover/item:bg-tech-cyan group-hover/item:shadow-glow transition-all duration-300">
                                                            <Monitor className="w-6 h-6 text-tech-cyan group-hover/item:text-white transition-colors" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-slate-900 text-lg group-hover/item:text-tech-cyan transition-colors">ITES & BPO</h3>
                                                            <p className="text-xs text-slate-400">Digital Operations</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-slate-500 leading-relaxed">Back-office, Call Center, and Digital Transformation support.</p>
                                                    <div className="flex items-center mt-3 text-tech-cyan font-semibold text-sm opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                        Learn more <ArrowRight className="ml-2 w-4 h-4" />
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/careers">Careers</NavLink>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/contact"
                                className={`px-7 py-3 rounded-full font-bold text-sm transition-all shadow-lg ${isHome && !isScrolled
                                    ? 'bg-white text-skylink-blue hover:bg-skylink-gold hover:text-white hover:shadow-glow-gold'
                                    : 'bg-skylink-blue text-white hover:bg-blue-800 hover:shadow-glow-blue'
                                    }`}
                            >
                                Contact Us
                            </Link>
                        </motion.div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`${isMobileMenuOpen ? 'text-slate-900' : textColorClass} focus:outline-none p-2 transition-colors`}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="md:hidden fixed inset-0 z-40 pt-24 px-6 flex flex-col overflow-hidden"
                    >
                        {/* Gradient background with blur */}
                        <div className="absolute inset-0 bg-gradient-to-br from-skylink-navy via-skylink-blue to-skylink-navy -z-10" />

                        {/* Animated floating shapes */}
                        <motion.div
                            className="absolute top-1/4 -right-20 w-64 h-64 rounded-full bg-tech-cyan/10 blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 -left-20 w-48 h-48 rounded-full bg-skylink-gold/10 blur-3xl"
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />

                        <nav className="flex flex-col space-y-2 relative z-10">
                            {[
                                { to: '/', label: 'Home', icon: null },
                                { to: '/property', label: 'Property Services', icon: Building, color: 'text-skylink-gold' },
                                { to: '/ites', label: 'ITES & BPO', icon: Monitor, color: 'text-tech-cyan' },
                                { to: '/about', label: 'About Us', icon: null },
                                { to: '/careers', label: 'Careers', icon: null },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.to}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
                                >
                                    <Link
                                        to={item.to}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center text-xl font-bold py-4 border-b border-white/10 transition-all group ${isActivePath(item.to) ? 'text-skylink-gold' : 'text-white hover:text-skylink-gold'
                                            }`}
                                    >
                                        {item.icon && <item.icon className={`mr-3 ${item.color}`} size={24} />}
                                        <span className="group-hover:translate-x-2 transition-transform duration-300">{item.label}</span>
                                        {isActivePath(item.to) && (
                                            <motion.div
                                                layoutId="mobileActiveIndicator"
                                                className="ml-auto w-2 h-2 rounded-full bg-skylink-gold"
                                            />
                                        )}
                                        <ArrowRight className="ml-auto w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-skylink-gold" />
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            className="mt-auto mb-8"
                        >
                            <Link
                                to="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block bg-gradient-to-r from-skylink-gold to-amber-500 text-white text-center py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-shadow"
                            >
                                Contact Us
                            </Link>

                            {/* Social/Contact info */}
                            <div className="mt-6 text-center">
                                <p className="text-white/60 text-sm">24/7 Global Support</p>
                                <p className="text-tech-cyan font-bold">+1 (212) 555-0123</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;


