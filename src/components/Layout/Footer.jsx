import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white tracking-tight">Skylink Innovations Ltd.</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            Bridging the gap between physical asset management and digital process optimization.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-skylink-blue hover:text-white transition-all duration-300 shadow-lg shadow-black/20">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-skylink-blue hover:text-white transition-all duration-300 shadow-lg shadow-black/20">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Vertical 1 */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-b border-skylink-blue/30 inline-block pb-2">Property Services</h4>
                        <ul className="space-y-4">
                            <li><Link to="/property" className="text-slate-400 hover:text-skylink-blue transition-colors text-sm flex items-center group">
                                <span className="group-hover:translate-x-1 transition-transform">Preservation & Inspection</span>
                            </Link></li>
                            <li><Link to="/property" className="text-slate-400 hover:text-skylink-blue transition-colors text-sm flex items-center group">
                                <span className="group-hover:translate-x-1 transition-transform">Renovation (Fix & Flip)</span>
                            </Link></li>
                            <li><Link to="/property" className="text-slate-400 hover:text-skylink-blue transition-colors text-sm flex items-center group">
                                <span className="group-hover:translate-x-1 transition-transform">Maintenance & HVAC</span>
                            </Link></li>
                        </ul>
                    </div>

                    {/* Vertical 2 */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-b border-tech-cyan/30 inline-block pb-2">ITES & BPO Solutions</h4>
                        <ul className="space-y-4">
                            <li><Link to="/ites" className="text-slate-400 hover:text-tech-cyan transition-colors text-sm flex items-center group">
                                <span className="group-hover:translate-x-1 transition-transform">Back Office Support</span>
                            </Link></li>
                            <li><Link to="/ites" className="text-slate-400 hover:text-tech-cyan transition-colors text-sm flex items-center group">
                                <span className="group-hover:translate-x-1 transition-transform">Call Center Services</span>
                            </Link></li>
                            <li><Link to="/ites" className="text-slate-400 hover:text-tech-cyan transition-colors text-sm flex items-center group">
                                <span className="group-hover:translate-x-1 transition-transform">Digital Transformation</span>
                            </Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-b border-slate-700 inline-block pb-2">Global HQ</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin size={18} className="mr-3 mt-1 flex-shrink-0 text-skylink-blue" />
                                <span className="text-slate-400 text-sm leading-relaxed">Bashundhara R/A, Dhaka<br />Bangladesh<br /><span className="text-xs text-slate-500 mt-1 block">Operating in USA & Australia</span></span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={18} className="mr-3 flex-shrink-0 text-skylink-blue" />
                                <a href="mailto:hr@skylinkltd.ai" className="text-slate-400 hover:text-white text-sm transition-colors">hr@skylinkltd.ai</a>
                            </li>
                            <li className="flex items-center">
                                <Phone size={18} className="mr-3 flex-shrink-0 text-skylink-blue" />
                                <span className="text-slate-400 text-sm">+880 123 456 7890</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <p className="text-slate-600 text-xs mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Skylink Innovations Ltd. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6">
                        <Link to="/privacy" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Terms of Service</Link>
                        <span className="text-slate-700 text-xs">|</span>
                        <span className="text-slate-600 text-xs flex items-center group">
                            Group Entity: <a href="#" className="ml-1 text-slate-500 hover:text-white transition-colors group-hover:underline decoration-slate-500">NEXUS Netro Limited</a>
                            <ArrowUpRight size={10} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
