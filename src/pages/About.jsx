import { Shield, Target, Users, Award, Clock, Heart, ArrowRight, Share2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/Photos/DSC05814.jpg'; // General Office
import valuesBg from '../assets/Photos/DSC05841.jpg'; // Meeting
import csrBg from '../assets/Photos/DSC05856.jpg'; // Team
import chairmanImg from '../assets/chairman.webp';
import ceoImg from '../assets/ceo.webp';
import mdImg from '../assets/managing-director.webp';

const About = () => {
    return (
        <div className="bg-white min-h-screen pt-20 font-sans">
            {/* 1. HERO: BUILT ON TRUST */}
            <section className="relative h-[600px] flex items-center bg-skylink-navy border-b-8 border-skylink-gold">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale-[30%] opacity-20"
                    style={{ backgroundImage: `url(${heroBg})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-skylink-navy via-skylink-navy/90 to-transparent"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-block py-1 px-3 border border-skylink-gold text-skylink-gold text-xs font-bold tracking-[0.2em] mb-6 uppercase">
                            Since 2011
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight font-serif leading-none">
                            BUILT ON<br />TRUST
                        </h1>
                        <p className="text-xl text-slate-300 font-light max-w-xl leading-relaxed border-l-2 border-skylink-gold pl-6 mb-8">
                            Skylink Innovations is more than a service provider. We are the strategic backbone for the nation's leading asset managers and financial institutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. THE SKYLINK CODE (VALUES MANIFESTO) */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-skylink-navy mb-4 font-serif">THE SKYLINK CODE</h2>
                        <div className="w-24 h-1 bg-skylink-gold mx-auto"></div>
                        <p className="mt-6 text-slate-500 max-w-2xl mx-auto">
                            Our reputation is our currency. Every action we take is guided by a rigid framework of ethics and excellence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-skylink-navy rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                <Shield size={40} className="text-skylink-gold" />
                            </div>
                            <h3 className="text-2xl font-bold text-skylink-navy mb-4 font-serif">Uncompromising Integrity</h3>
                            <p className="text-slate-600 leading-relaxed px-4">
                                We operate with full transparency. No hidden fees, no cut corners. In an industry of variables, we are the constant.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-skylink-navy rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                <Target size={40} className="text-skylink-gold" />
                            </div>
                            <h3 className="text-2xl font-bold text-skylink-navy mb-4 font-serif">Precision Execution</h3>
                            <p className="text-slate-600 leading-relaxed px-4">
                                "Good enough" is failure. We pursue military-grade precision in every property secured and every call answered.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-skylink-navy rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                <Users size={40} className="text-skylink-gold" />
                            </div>
                            <h3 className="text-2xl font-bold text-skylink-navy mb-4 font-serif">People First</h3>
                            <p className="text-slate-600 leading-relaxed px-4">
                                Technology empowers us, but people define us. We invest heavily in the training and well-being of our global workforce.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. LEADERSHIP (EXECUTIVE BOARD) */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold text-skylink-navy mb-4 font-serif">LEADERSHIP</h2>
                        <div className="w-24 h-1 bg-skylink-gold mb-8"></div>
                        <p className="text-lg text-slate-600 max-w-3xl">
                            Decades of combined experience in Real Estate, Finance, and Global Operations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Chairman */}
                        <div className="bg-white border-b-4 border-skylink-gold shadow-lg group">
                            <div className="h-96 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img src={chairmanImg} alt="Chairman" className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-skylink-navy/90 to-transparent opacity-100 group-hover:opacity-60 transition-opacity"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-3xl font-bold font-serif mb-1">Engr. Sami Yousuf Ratan</h3>
                                    <p className="text-skylink-gold font-bold tracking-widest text-xs uppercase">Chairman</p>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    A visionary leader with over 20 years of experience in international business and asset management. He established the core philosophy of "Stability through Innovation."
                                </p>
                                <div className="flex gap-4">
                                    <div className="w-8 h-1 bg-slate-200 group-hover:bg-skylink-gold transition-colors"></div>
                                </div>
                            </div>
                        </div>

                        {/* CEO */}
                        <div className="bg-white border-b-4 border-skylink-navy shadow-lg group">
                            <div className="h-96 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img src={ceoImg} alt="CEO" className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-skylink-navy/90 to-transparent opacity-100 group-hover:opacity-60 transition-opacity"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-3xl font-bold font-serif mb-1">Engr. Riyadh Arfin Bhuiyan</h3>
                                    <p className="text-skylink-gold font-bold tracking-widest text-xs uppercase">CEO & Founder</p>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    The driving force behind Skylink's expansion into property preservation. His hands-on approach ensures that our operational standards never waver.
                                </p>
                                <div className="flex gap-4">
                                    <div className="w-8 h-1 bg-slate-200 group-hover:bg-skylink-navy transition-colors"></div>
                                </div>
                            </div>
                        </div>

                        {/* MD */}
                        <div className="bg-white border-b-4 border-skylink-blue shadow-lg group">
                            <div className="h-96 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img src={mdImg} alt="Managing Director" className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-skylink-navy/90 to-transparent opacity-100 group-hover:opacity-60 transition-opacity"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-3xl font-bold font-serif mb-1">Adv. Golam Mustafa Sumon</h3>
                                    <p className="text-skylink-gold font-bold tracking-widest text-xs uppercase">Managing Director</p>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    Overseeing global operations across three continents. He specializes in optimizing workflow logistics and integrating new technologies into our stack.
                                </p>
                                <div className="flex gap-4">
                                    <div className="w-8 h-1 bg-slate-200 group-hover:bg-skylink-blue transition-colors"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. A DECADE OF INNOVATION (TIMELINE) */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-skylink-blue font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Our History</span>
                        <h2 className="text-4xl font-bold text-skylink-navy font-serif">A DECADE OF INNOVATION</h2>
                    </div>

                    <div className="relative border-l-2 border-slate-200 ml-6 md:ml-10 space-y-12">
                        {/* 2011 */}
                        <div className="relative pl-8 md:pl-12">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 border-4 border-white"></div>
                            <span className="text-sm font-bold text-skylink-gold tracking-widest mb-2 block">2011</span>
                            <h3 className="text-xl font-bold text-skylink-navy mb-2">Foundation</h3>
                            <p className="text-slate-600">Skylink Innovations is founded in New York with a focus on business process outsourcing.</p>
                        </div>
                        {/* 2014 */}
                        <div className="relative pl-8 md:pl-12">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 border-4 border-white"></div>
                            <span className="text-sm font-bold text-skylink-gold tracking-widest mb-2 block">2014</span>
                            <h3 className="text-xl font-bold text-skylink-navy mb-2">Global Expansion</h3>
                            <p className="text-slate-600">Opened delivery centers in Dhaka and Manila to support 24/7 operations.</p>
                        </div>
                        {/* 2017 */}
                        <div className="relative pl-8 md:pl-12">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-skylink-blue border-4 border-white shadow-lg"></div>
                            <span className="text-sm font-bold text-skylink-gold tracking-widest mb-2 block">2017</span>
                            <h3 className="text-xl font-bold text-skylink-navy mb-2">Property Preservation Division</h3>
                            <p className="text-slate-600">launched US-based field operations, partnering with national asset management firms.</p>
                        </div>
                        {/* 2024 */}
                        <div className="relative pl-8 md:pl-12">
                            <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-skylink-gold border-4 border-white shadow-xl animate-pulse"></div>
                            <span className="text-sm font-bold text-skylink-gold tracking-widest mb-2 block">TODAY</span>
                            <h3 className="text-xl font-bold text-skylink-navy mb-2">Market Leadership</h3>
                            <p className="text-slate-600">Servicing 5,000+ assets monthly with a hybrid model of field vendors and digital support.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. IMPACT & CSR */}
            <section className="relative py-24 bg-skylink-navy overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: `url(${csrBg})` }}
                ></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        < Heart size={48} className="text-skylink-gold mb-6" />
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">COMMUNITY & IMPACT</h2>
                        <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                            We believe that success is measured by who you lift up with you. Through the Skylink Foundation, we support education initiatives and disaster relief efforts in the communities where our employees live and work.
                        </p>
                        <Link to="/contact" className="text-white border-b border-skylink-gold pb-1 hover:text-skylink-gold transition-colors inline-block">
                            Partner with our Foundation
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
