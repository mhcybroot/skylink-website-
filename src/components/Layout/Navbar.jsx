import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoSvg from '../../assets/logo.svg';

const navLinks = [
    { label: 'About Us', to: '/about', isAnchor: false },
    { label: 'Core Services', to: '/#services', isAnchor: true },
    { label: 'US Property Preservation', to: '/property', isAnchor: false },
    { label: 'Why Skylink', to: '/#why-choose-us', isAnchor: true },
    { label: 'Methodology', to: '/#how-it-works', isAnchor: true },
    { label: 'Contact', to: '/contact', isAnchor: false },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle smooth anchor scroll or page route
    const handleNavClick = (link) => {
        setIsMobileMenuOpen(false);
        if (link.isAnchor) {
            const id = link.to.replace('/#', '');
            if (location.pathname === '/') {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 350);
            }
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-black/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Official Brand Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative flex items-center px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#00E5BE]/30 hover:bg-white/[0.07] backdrop-blur-md transition-all duration-300 shadow-sm">
                        <img
                            src={logoSvg}
                            alt="Skylink Innovations Ltd."
                            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                </Link>

                {/* Center Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, idx) => {
                        const isActive = location.pathname === link.to;
                        return (
                            <Link
                                key={idx}
                                to={link.to}
                                onClick={() => handleNavClick(link)}
                                className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                                    isActive
                                        ? 'text-white'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="navIndicator"
                                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#00E5BE] rounded-full shadow-aura-sm"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Action CTAs */}
                <div className="hidden md:flex items-center gap-6">
                    <a
                        href="https://app.skylinkltd.ai/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        Sign In
                    </a>
                    <Link
                        to="/contact"
                        className="btn-aura-primary text-xs md:text-sm !py-2.5 !px-5"
                    >
                        <span>Get Started</span>
                        <ArrowRight size={15} />
                    </Link>
                </div>

                {/* Mobile Hamburger Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-black/95 border-b border-white/10 px-6 py-6 backdrop-blur-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link, idx) => (
                                <Link
                                    key={idx}
                                    to={link.to}
                                    onClick={() => handleNavClick(link)}
                                    className="text-base font-medium text-slate-300 hover:text-[#00E5BE] transition-colors py-2 flex items-center justify-between"
                                >
                                    <span>{link.label}</span>
                                    <ChevronRight size={16} className="text-slate-600" />
                                </Link>
                            ))}
                            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                                <a
                                    href="https://app.skylinkltd.ai/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-center py-2 text-sm text-slate-300 hover:text-white"
                                >
                                    Sign In
                                </a>
                                <Link
                                    to="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="btn-aura-primary w-full text-center justify-center !py-3"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
