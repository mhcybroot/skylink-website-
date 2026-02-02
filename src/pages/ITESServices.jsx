import { Headphones, Database, Shield, Zap, Globe, Users, TrendingUp, MessageSquare, FileText, CheckCircle, ArrowRight, Server, Cpu, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/Photos/DSC05826.jpg'; // Office Team
import introBg from '../assets/Photos/DSC05841.jpg'; // Meeting
import cxBg from '../assets/Photos/DSC05848.jpg'; // Workstation
import boBg from '../assets/Photos/DSC05814.jpg'; // General Office
import techBg from '../assets/Photos/DSC05839.jpg'; // Tech/Server

const ITESServices = () => {
    return (
        <div className="bg-white min-h-screen pt-20 font-sans">
            {/* 1. COMPACT INDUSTRIAL HERO */}
            <section className="relative h-[500px] flex items-center bg-skylink-navy border-b-4 border-skylink-gold">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale-[50%] opacity-30"
                    style={{ backgroundImage: `url(${heroBg})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-skylink-navy via-skylink-navy/90 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <span className="inline-block py-1 px-3 border border-skylink-gold text-skylink-gold text-xs font-bold tracking-[0.2em] mb-6 uppercase">
                        Vertical 02
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight font-serif leading-none">
                        GLOBAL<br />WORKFLOW
                    </h1>
                    <p className="text-xl text-slate-300 font-light max-w-2xl leading-relaxed border-l-2 border-slate-500 pl-6">
                        Scalable BPO, Omni-channel Support, and Digital Transformation solutions for the modern enterprise.
                    </p>
                </div>
            </section>

            {/* 2. THE 24/7 ADVANTAGE (INTRO) */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-skylink-navy mb-6 font-serif">THE 24/7 ADVANTAGE</h2>
                        <div className="w-20 h-1 bg-skylink-gold mb-8"></div>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            In today's "always-on" economy, downtime is not an option. Skylink Innovations provides a seamless extension of your workforce, operating across multiple time zones to ensure continuous business velocity.
                        </p>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            We combine human empathy with AI-driven efficiency to reduce operational costs while significantly elevating customer satisfaction scores (CSAT).
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Follow-the-Sun Delivery Model",
                                "ISO 27001 Information Security",
                                "Multilingual Support Teams",
                                "AI-Augmented Quality Assurance"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center text-skylink-navy font-bold text-sm uppercase tracking-wide">
                                    <CheckCircle size={18} className="text-skylink-gold mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative h-[500px] border border-slate-200 p-2">
                        <div className="absolute inset-2 border border-slate-100"></div>
                        <img src={introBg} alt="Advantage" className="w-full h-full object-cover grayscale-[20%]" />
                        <div className="absolute bottom-10 -left-6 bg-skylink-navy p-8 text-white shadow-2xl max-w-xs">
                            <div className="text-4xl font-bold text-skylink-gold mb-2">99.9%</div>
                            <div className="text-sm font-bold tracking-widest uppercase">Uptime Guarantee</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. DEEP DIVE: FRONT OFFICE WING */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-4">
                            <div className="sticky top-24">
                                <span className="text-8xl font-bold text-slate-200 leading-none -ml-4">01</span>
                                <h2 className="text-3xl font-bold text-skylink-navy -mt-10 relative z-10 mb-6 font-serif">FRONT OFFICE EXCELLENCE</h2>
                                <p className="text-slate-500 mb-8 leading-relaxed">
                                    Your brand's voice, amplified. Our agents are rigorously trained in your culture and product to deliver seamless, empathetic customer interactions.
                                </p>
                                <Link to="/contact" className="inline-flex items-center text-sm font-bold text-skylink-blue uppercase tracking-widest hover:text-skylink-navy transition-colors">
                                    View Case Studies <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <img src={cxBg} alt="Front Office" className="w-full h-64 object-cover col-span-full border-b-4 border-skylink-blue" />

                            <div className="bg-white p-8 border border-slate-200">
                                <Headphones size={32} className="text-skylink-blue mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Inbound Support</h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>• Tier 1 & 2 Tech Support</li>
                                    <li>• Order Management</li>
                                    <li>• Warranty Processing</li>
                                    <li>• Retention Services</li>
                                </ul>
                            </div>
                            <div className="bg-white p-8 border border-slate-200">
                                <MessageSquare size={32} className="text-skylink-blue mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Omnichannel</h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>• Live Chat & Email</li>
                                    <li>• Social Media Moderation</li>
                                    <li>• SMS/WhatsApp Support</li>
                                    <li>• In-App Concierge</li>
                                </ul>
                            </div>
                            <div className="bg-white p-8 border border-slate-200">
                                <Users size={32} className="text-skylink-blue mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Sales & Lead Gen</h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>• Appt. Setting</li>
                                    <li>• Outbound Campaigns</li>
                                    <li>• Market Research</li>
                                    <li>• Customer Surveys</li>
                                </ul>
                            </div>
                            <div className="bg-white p-8 border border-slate-200">
                                <Globe size={32} className="text-skylink-blue mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Multilingual</h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>• English (Native/Neutral)</li>
                                    <li>• Spanish (LatAm/ES)</li>
                                    <li>• French (CA/EU)</li>
                                    <li>• German / Portuguese</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. DEEP DIVE: BACK OFFICE WING */}
            <section className="py-24 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 order-2 lg:order-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <img src={boBg} alt="Back Office" className="w-full h-64 object-cover col-span-full border-b-4 border-skylink-gold" />

                            <div className="bg-slate-50 p-8 border-l border-slate-200 hover:border-l-4 hover:border-skylink-gold transition-all">
                                <Database size={32} className="text-skylink-gold mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Data Operations</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">High-volume data entry, cleansing, and annotation for AI training sets with &gt;99% accuracy guarantees.</p>
                            </div>
                            <div className="bg-slate-50 p-8 border-l border-slate-200 hover:border-l-4 hover:border-skylink-gold transition-all">
                                <TrendingUp size={32} className="text-skylink-gold mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Finance & Accounting</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">Accounts Payable/Receivable, Invoice Processing, and Payroll Administration managed by certified specialists.</p>
                            </div>
                            <div className="bg-slate-50 p-8 border-l border-slate-200 hover:border-l-4 hover:border-skylink-gold transition-all">
                                <FileText size={32} className="text-skylink-gold mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Content Moderation</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">Protecting your community 24/7 with human-in-the-loop review of UGC (User Generated Content) and Policy Enforcement.</p>
                            </div>
                            <div className="bg-slate-50 p-8 border-l border-slate-200 hover:border-l-4 hover:border-skylink-gold transition-all">
                                <Shield size={32} className="text-skylink-gold mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Compliance & Risk</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">KYC/AML verification, Claim Adjudication, and Fraud Detection services for regulated industries.</p>
                            </div>
                        </div>

                        <div className="lg:col-span-4 order-1 lg:order-2">
                            <div className="sticky top-24 text-right">
                                <span className="text-8xl font-bold text-slate-100 leading-none -mr-4">02</span>
                                <h2 className="text-3xl font-bold text-skylink-navy -mt-10 relative z-10 mb-6 font-serif">BACK OFFICE & DATA</h2>
                                <p className="text-slate-500 mb-8 leading-relaxed">
                                    The engine room of your enterprise. We streamline repetitive, high-volume tasks, freeing your internal teams to focus on strategic growth and innovation.
                                </p>
                                <Link to="/contact" className="inline-flex items-center text-sm font-bold text-skylink-gold uppercase tracking-widest hover:text-skylink-navy transition-colors">
                                    Schedule ROI Audit <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. DIGITAL TRANSFORMATION SUITE (DARK MODE) */}
            <section className="py-24 bg-skylink-navy text-white relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${techBg})` }}
                ></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-skylink-gold font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Future Ready</span>
                        <h2 className="text-4xl font-bold mb-6 font-serif text-white">DIGITAL TRANSFORMATION</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            It's not just about labor arbitrage anymore. It's about technology arbitrage. We deploy automation and AI to supercharge our human workforce.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
                            <Cpu size={40} className="text-skylink-gold mb-6" />
                            <h3 className="text-xl font-bold mb-4 text-white">RPA Implementation</h3>
                            <p className="text-slate-100 text-sm leading-relaxed">Robotic Process Automation bots handle rule-based tasks with 100% accuracy and zero fatigue.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
                            <Zap size={40} className="text-skylink-gold mb-6" />
                            <h3 className="text-xl font-bold mb-4 text-white">AI Assistants</h3>
                            <p className="text-slate-100 text-sm leading-relaxed">Deploying GenAI agents to triage support tickets and draft responses, reducing handle time by 40%.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
                            <Lock size={40} className="text-skylink-gold mb-6" />
                            <h3 className="text-xl font-bold mb-4 text-white">Data Sovereignty</h3>
                            <p className="text-slate-100 text-sm leading-relaxed">Strict data fencing and local residency compliance for clients requiring GDPR or HIPAA adherence.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. GLOBAL DELIVERY MAP */}
            <section className="py-32 bg-slate-50 text-center border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-6">
                    <Globe size={48} className="mx-auto text-skylink-navy mb-6" />
                    <h2 className="text-3xl md:text-5xl font-bold text-skylink-navy mb-6 font-serif">TRUE GLOBAL DELIVERY</h2>
                    <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light">
                        From our headquarters in New York to delivery centers in the Philippines, India, and Latin America, we provide a unified standard of excellence.
                    </p>

                    {/* Global Hubs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-left">
                        {/* New York */}
                        <div className="relative p-8 border border-slate-200 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden cursor-default">
                            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                                <div className="h-full bg-skylink-gold w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                            </div>
                            <div className="w-12 h-1 bg-skylink-gold mb-6 group-hover:w-20 transition-all duration-300"></div>
                            <h3 className="text-2xl font-bold text-skylink-navy mb-2 font-serif group-hover:text-skylink-gold transition-colors">New York</h3>
                            <span className="text-xs font-bold text-skylink-gold uppercase tracking-widest mb-4 block">Global HQ</span>
                            <p className="text-sm text-slate-500 mb-4 group-hover:text-slate-600 transition-colors">Strategic Management, Client Relations, & Legal Compliance.</p>
                            <div className="flex items-center text-xs text-slate-400 font-mono border-t border-slate-100 pt-4 mt-6">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                EST (UTC-5) <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-skylink-gold font-bold">ACTIVE</span>
                            </div>
                        </div>

                        {/* London */}
                        <div className="relative p-8 border border-slate-200 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden cursor-default">
                            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                                <div className="h-full bg-slate-400 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                            </div>
                            <div className="w-12 h-1 bg-slate-300 mb-6 group-hover:w-20 transition-all duration-300"></div>
                            <h3 className="text-2xl font-bold text-skylink-navy mb-2 font-serif group-hover:text-slate-500 transition-colors">London</h3>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">EMEA Hub</span>
                            <p className="text-sm text-slate-500 mb-4 group-hover:text-slate-600 transition-colors">European Markets, GDPR Compliance, & FinTech Services.</p>
                            <div className="flex items-center text-xs text-slate-400 font-mono border-t border-slate-100 pt-4 mt-6">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                GMT (UTC+0) <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 font-bold">ACTIVE</span>
                            </div>
                        </div>

                        {/* Bangalore */}
                        <div className="relative p-8 border border-slate-200 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden cursor-default">
                            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                                <div className="h-full bg-skylink-blue w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                            </div>
                            <div className="w-12 h-1 bg-skylink-blue mb-6 group-hover:w-20 transition-all duration-300"></div>
                            <h3 className="text-2xl font-bold text-skylink-navy mb-2 font-serif group-hover:text-skylink-blue transition-colors">Bangalore</h3>
                            <span className="text-xs font-bold text-skylink-blue uppercase tracking-widest mb-4 block">Tech Center</span>
                            <p className="text-sm text-slate-500 mb-4 group-hover:text-slate-600 transition-colors">Software Development, AI Labs, & IT Infrastructure.</p>
                            <div className="flex items-center text-xs text-slate-400 font-mono border-t border-slate-100 pt-4 mt-6">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                IST (UTC+5:30) <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-skylink-blue font-bold">ACTIVE</span>
                            </div>
                        </div>

                        {/* Manila */}
                        <div className="relative p-8 border border-slate-200 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden cursor-default">
                            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                                <div className="h-full bg-skylink-navy w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                            </div>
                            <div className="w-12 h-1 bg-skylink-navy mb-6 group-hover:w-20 transition-all duration-300"></div>
                            <h3 className="text-2xl font-bold text-skylink-navy mb-2 font-serif group-hover:text-skylink-navy transition-colors">Manila</h3>
                            <span className="text-xs font-bold text-skylink-navy uppercase tracking-widest mb-4 block">CX Capital</span>
                            <p className="text-sm text-slate-500 mb-4 group-hover:text-slate-600 transition-colors">Voice Operations, Customer Support, & Content Moderation.</p>
                            <div className="flex items-center text-xs text-slate-400 font-mono border-t border-slate-100 pt-4 mt-6">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                PHT (UTC+8) <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-skylink-navy font-bold">ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact" className="px-8 py-4 bg-skylink-navy text-white font-bold uppercase tracking-widest hover:bg-skylink-blue transition-colors">
                            Discuss Your Requirements
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ITESServices;
