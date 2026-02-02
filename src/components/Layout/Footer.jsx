import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="mb-8 md:mb-0">
                        <h3 className="text-xl font-bold text-white mb-4">Skylink Innovations Ltd.</h3>
                        <p className="text-slate-400 mb-4">
                            Where Property Meets Precision.<br />
                            Where Technology Drives Transformation.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-white transition"><Facebook size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Vertical 1: Property */}
                    <div>
                        <h4 className="text-lg font-semibold text-skylink-blue mb-4">Property Services</h4>
                        <ul className="space-y-2">
                            <li><Link to="/property" className="text-slate-400 hover:text-white transition">Preservation & Inspection</Link></li>
                            <li><Link to="/property" className="text-slate-400 hover:text-white transition">Renovation (Fix & Flip)</Link></li>
                            <li><Link to="/property" className="text-slate-400 hover:text-white transition">Maintenance & HVAC</Link></li>
                        </ul>
                    </div>

                    {/* Vertical 2: ITES */}
                    <div>
                        <h4 className="text-lg font-semibold text-tech-cyan mb-4">ITES & BPO</h4>
                        <ul className="space-y-2">
                            <li><Link to="/ites" className="text-slate-400 hover:text-white transition">Back Office Support</Link></li>
                            <li><Link to="/ites" className="text-slate-400 hover:text-white transition">Call Center Services</Link></li>
                            <li><Link to="/ites" className="text-slate-400 hover:text-white transition">Digital Transformation</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold text-skylink-blue mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-slate-400" />
                                <span className="text-slate-400 text-sm">Bashundhara R/A, Dhaka, Bangladesh<br />Operating in USA & Australia</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={18} className="mr-2 flex-shrink-0 text-slate-400" />
                                <a href="mailto:hr@skylinkltd.ai" className="text-slate-400 hover:text-white text-sm">hr@skylinkltd.ai</a>
                            </li>
                            <li className="flex items-center">
                                <Phone size={18} className="mr-2 flex-shrink-0 text-slate-400" />
                                <span className="text-slate-400 text-sm">+880 123 456 7890</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Skylink Innovations Ltd. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span className="text-slate-500 text-sm">Group Entity: <a href="#" className="text-slate-400 hover:underline">NEXUS Netro Limited</a></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
