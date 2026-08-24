import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ShieldCheck, Check, Github, Twitter, Linkedin, Facebook } from 'lucide-react';
import logoImg from '../../assets/logo.png';

const footerLinks = {
    solutions: [
        { label: 'US Property Preservation', to: '/property' },
        { label: 'Global ITES & BPO', to: '/ites' },
        { label: 'Custom Software & Apps', to: '/#services' },
        { label: 'Cloud Infrastructure & Migration', to: '/#services' },
        { label: 'Managed IT Services & Support', to: '/#services' },
        { label: 'Cybersecurity & Compliance', to: '/#services' },
        { label: 'Data Analytics & BI', to: '/#services' },
        { label: 'IT Consulting & Strategy', to: '/#services' }
    ],
    company: [
        { label: 'About Us', to: '/about' },
        { label: 'Why Choose Skylink', to: '/#why-choose-us' },
        { label: 'Execution Methodology', to: '/#how-it-works' },
        { label: 'Careers & Culture', to: '/careers' },
        { label: 'Contact Us', to: '/contact' }
    ],
    resources: [
        { label: 'Free Consultation', to: '/contact' },
        { label: 'Security & Compliance', to: '/#services' },
        { label: 'SRE & Availability SLA', to: '/#how-it-works' },
        { label: 'Client Support Portal (Sign In)', to: 'https://app.skylinkltd.ai/login', external: true }
    ]
};

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => setSubscribed(false), 4000);
            setEmail('');
        }
    };

    return (
        <footer className="bg-black text-white border-t border-white/[0.08] relative overflow-hidden pt-20 pb-12 px-6">
            {/* Subtle glow accent at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00E5BE]/30 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="inline-block mb-6 group">
                            <img
                                src={logoImg}
                                alt="Skylink Innovations Ltd."
                                className="h-10 md:h-12 w-auto object-contain brightness-110 drop-shadow-[0_0_15px_rgba(0,229,190,0.25)] group-hover:scale-105 transition-transform duration-300"
                            />
                        </Link>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                            Next-generation IT-enabled services, bespoke software engineering, and secure cloud infrastructure designed to accelerate your digital transformation.
                        </p>

                        {/* Newsletter Input */}
                        <form onSubmit={handleSubscribe} className="max-w-sm mb-6">
                            <div className="relative flex items-center">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your work email..."
                                    required
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00E5BE]/50 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1 w-8 h-8 rounded-full bg-[#00E5BE] text-black flex items-center justify-center hover:brightness-110 transition-all shadow-aura-sm"
                                    aria-label="Subscribe"
                                >
                                    {subscribed ? <Check size={14} /> : <ArrowRight size={14} />}
                                </button>
                            </div>
                            {subscribed && (
                                <div className="text-xs text-[#00E5BE] mt-2 font-mono">
                                    ✓ You have been added to our executive brief.
                                </div>
                            )}
                        </form>

                        {/* Quick Contact & Address */}
                        <div className="text-xs text-slate-400 space-y-1.5 font-mono">
                            <div className="text-slate-300">
                                ✉ <a href="mailto:info@skylink-innovations.com" className="hover:text-[#00E5BE] transition-colors">info@skylink-innovations.com</a> • <a href="mailto:contact@skylink-ltd.com" className="hover:text-[#00E5BE] transition-colors">contact@skylink-ltd.com</a>
                            </div>
                            <div className="text-slate-300">
                                ✆ <a href="tel:+12125550123" className="hover:text-[#00E5BE] transition-colors">+1 (212) 555-0123</a> • <a href="tel:+15551234567" className="hover:text-[#00E5BE] transition-colors">+1 (555) 123-4567</a>
                            </div>
                            <div className="pt-2 text-slate-400 leading-relaxed font-sans text-[11px]">
                                📍 7th Floor, Badar Heights, House# 262-263, Road# 1, Block# B, Bashundhara R/A, Dhaka-1229, Bangladesh
                            </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-4">
                            Solutions
                        </h4>
                        <ul className="space-y-2.5">
                            {footerLinks.solutions.map((item, i) => (
                                <li key={i}>
                                    <Link to={item.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-4">
                            Company
                        </h4>
                        <ul className="space-y-2.5">
                            {footerLinks.company.map((item, i) => (
                                <li key={i}>
                                    <Link to={item.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-2.5">
                            {footerLinks.resources.map((item, i) => (
                                <li key={i}>
                                    {item.external ? (
                                        <a
                                            href={item.to}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-slate-400 hover:text-[#00E5BE] transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    ) : (
                                        <Link to={item.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
                    <div>
                        © {new Date().getFullYear()} Skylink Innovations Ltd. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/contact" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link to="/contact" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                        <Link to="/contact" className="hover:text-slate-300 transition-colors">Security</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
