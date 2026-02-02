import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Building, Monitor } from 'lucide-react';
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

    // Text color logic: White on Hero (if Home and not scrolled), Dark otherwise
    const textColorClass = isHome && !isScrolled ? 'text-white' : 'text-slate-900';

    // Background logic: Transparent on Hero, White/Blur otherwise
    const bgClass = isHome && !isScrolled
        ? 'bg-transparent'
        : 'bg-white/90 backdrop-blur-md shadow-md border-b border-slate-100';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${bgClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo Area */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 group">
                            {/* Logo: Invert brightness to make it white on dark background (Hero) */}
                            <img
                                className={`h-10 w-auto transition duration-300 ${isHome && !isScrolled ? 'brightness-0 invert' : ''} group-hover:scale-105`}
                                src={logo}
                                alt="Skylink Innovations"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={`text-sm font-semibold tracking-wide uppercase hover:text-skylink-blue transition-colors ${textColorClass}`}>Home</Link>

                        {/* Mega Menu Trigger */}
                        <div className="relative group"
                            onMouseEnter={() => setActiveDropdown('services')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className={`flex items-center text-sm font-semibold tracking-wide uppercase hover:text-skylink-blue transition-colors focus:outline-none ${textColorClass}`}>
                                Services <ChevronDown className="ml-1 w-4 h-4" />
                            </button>

                            {/* Mega Menu Dropdown */}
                            <AnimatePresence>
                                {activeDropdown === 'services' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 15 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-1/2 transform -translate-x-1/2 top-full mt-4 w-[600px] bg-white rounded-xl shadow-2xl p-2 border border-slate-100 ring-1 ring-black/5 overflow-hidden"
                                    >
                                        <div className="grid grid-cols-2 gap-2">
                                            <Link to="/property" className="group/item flex flex-col p-4 rounded-lg hover:bg-blue-50/50 transition duration-300" onClick={() => setActiveDropdown(null)}>
                                                <div className="flex items-center mb-3">
                                                    <div className="p-2.5 bg-skylink-blue/10 rounded-lg mr-4 group-hover/item:bg-skylink-blue group-hover/item:text-white transition duration-300">
                                                        <Building className="w-6 h-6 text-skylink-blue group-hover/item:text-white" />
                                                    </div>
                                                    <h3 className="font-bold text-slate-900 text-lg">Property</h3>
                                                </div>
                                                <p className="text-sm text-slate-500 ml-16">Preservation, Maintenance, and Renovation solutions for asset managers.</p>
                                            </Link>

                                            <Link to="/ites" className="group/item flex flex-col p-4 rounded-lg hover:bg-cyan-50/50 transition duration-300" onClick={() => setActiveDropdown(null)}>
                                                <div className="flex items-center mb-3">
                                                    <div className="p-2.5 bg-tech-cyan/10 rounded-lg mr-4 group-hover/item:bg-tech-cyan group-hover/item:text-white transition duration-300">
                                                        <Monitor className="w-6 h-6 text-tech-cyan group-hover/item:text-white" />
                                                    </div>
                                                    <h3 className="font-bold text-slate-900 text-lg">ITES & BPO</h3>
                                                </div>
                                                <p className="text-sm text-slate-500 ml-16">Back-office, Call Center, and Digital Transformation support.</p>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link to="/about" className={`text-sm font-semibold tracking-wide uppercase hover:text-skylink-blue transition-colors ${textColorClass}`}>About</Link>
                        <Link to="/careers" className={`text-sm font-semibold tracking-wide uppercase hover:text-skylink-blue transition-colors ${textColorClass}`}>Careers</Link>

                        <Link to="/contact" className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-md ${isHome && !isScrolled ? 'bg-white text-skylink-blue hover:bg-blue-50' : 'bg-skylink-blue text-white hover:bg-blue-800'}`}>
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`${textColorClass} focus:outline-none p-2`}>
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white/95 backdrop-blur-xl fixed inset-0 z-40 pt-24 px-6 flex flex-col space-y-6"
                    >
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">Home</Link>
                        <Link to="/property" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 flex items-center"><Building className="mr-3 text-skylink-blue" /> Property Services</Link>
                        <Link to="/ites" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 flex items-center"><Monitor className="mr-3 text-tech-cyan" /> ITES & BPO</Link>
                        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">About Us</Link>
                        <Link to="/careers" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900">Careers</Link>
                        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-skylink-blue text-white text-center py-4 rounded-xl text-xl font-bold shadow-lg">Contact Us</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
