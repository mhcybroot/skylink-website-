import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-skylink-navy text-white pt-24 pb-12 border-t-4 border-skylink-gold">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="inline-block text-2xl font-bold tracking-tighter mb-6">
                            SKYLINK<span className="text-skylink-gold">.</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">
                            Premier asset management and BPO solutions for global enterprises. Bridging the gap between physical infrastructure and digital optimization.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">Solutions</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="/property" className="text-slate-300 hover:text-skylink-gold transition-colors">Property Preservation</Link></li>
                            <li><Link to="/property" className="text-slate-300 hover:text-skylink-gold transition-colors">REO & Rehab</Link></li>
                            <li><Link to="/ites" className="text-slate-300 hover:text-skylink-gold transition-colors">ITES & BPO</Link></li>
                            <li><Link to="/ites" className="text-slate-300 hover:text-skylink-gold transition-colors">Digital Strategy</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">Company</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="/about" className="text-slate-300 hover:text-skylink-gold transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="text-slate-300 hover:text-skylink-gold transition-colors">Careers</Link></li>
                            <li><Link to="/contact" className="text-slate-300 hover:text-skylink-gold transition-colors">Contact</Link></li>
                            <li><Link to="/privacy" className="text-slate-300 hover:text-skylink-gold transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">Headquarters</h4>
                        <div className="space-y-6 text-sm text-slate-300">
                            <div className="flex items-start">
                                <MapPin size={18} className="mr-3 text-skylink-gold flex-shrink-0" />
                                <span>123 Corporate Blvd, Suite 400<br />New York, NY 10001</span>
                            </div>
                            <div className="flex items-center">
                                <Phone size={18} className="mr-3 text-skylink-gold flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center">
                                <Mail size={18} className="mr-3 text-skylink-gold flex-shrink-0" />
                                <span>contact@skylink-innovations.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Skylink Innovations Ltd. All rights reserved.</p>
                    <div className="flex items-center space-x-6 mt-4 md:mt-0">
                        <span>A NEXUS NETRO COMPANY</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
