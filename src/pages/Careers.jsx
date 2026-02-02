import { Rocket, Heart, Globe, Briefcase, ChevronRight, ArrowRight, CheckCircle, Users, Zap, Layout, Monitor, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import heroBg from '../assets/Photos/DSC05856.jpg'; // Large Team Shot
import cultureBg from '../assets/Photos/DSC05814.jpg'; // Office Environment
import benefitBg from '../assets/Photos/DSC05826.jpg'; // Collaborative Work

const Careers = () => {
    return (
        <div className="bg-white min-h-screen pt-20 font-sans">
            <SEO title="Careers" description="Build Your Legacy. Join a team that is redefining the standards of global asset management and digital operations." />
            {/* 1. HERO: BUILD YOUR LEGACY */}
            <section className="relative h-[600px] flex items-center bg-skylink-navy border-b-8 border-skylink-blue">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale-[30%] opacity-20"
                    style={{ backgroundImage: `url(${heroBg})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-skylink-navy via-skylink-navy/90 to-transparent"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <span className="inline-block py-1 px-3 border border-skylink-blue text-skylink-blue text-xs font-bold tracking-[0.2em] mb-6 uppercase">
                        Join the Frontline
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight font-serif leading-none">
                        BUILD YOUR<br />LEGACY
                    </h1>
                    <p className="text-xl text-slate-300 font-light max-w-xl leading-relaxed border-l-2 border-skylink-blue pl-6 mb-8">
                        We don't offer jobs; we offer trajectories. Join a team that is redefining the standards of global asset management and digital operations.
                    </p>
                    <a href="#openings" className="inline-flex items-center px-8 py-4 bg-skylink-blue text-white font-bold uppercase tracking-widest hover:bg-white hover:text-skylink-navy transition-colors">
                        View Open Positions <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </section>

            {/* 2. WHY SKYLINK? (CULTURE) */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[600px] border border-slate-200 p-2">
                        <div className="absolute inset-2 border border-slate-100"></div>
                        <img src={cultureBg} alt="Office Culture" className="w-full h-full object-cover grayscale-[20%]" />
                        <div className="absolute -bottom-6 -right-6 bg-white p-8 shadow-2xl max-w-xs border-t-4 border-skylink-blue">
                            <div className="text-4xl font-bold text-skylink-navy mb-2">4.8/5</div>
                            <div className="text-sm font-bold text-slate-500 tracking-widest uppercase">Employee Satisfaction</div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold text-skylink-navy mb-6 font-serif">WHY SKYLINK?</h2>
                        <div className="w-20 h-1 bg-skylink-blue mb-8"></div>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            We operate at the intersection of stability and speed. As a Skylink team member, you'll be challenged to solve complex logistical problems while being supported by world-class infrastructure.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <div className="group">
                                <Rocket size={32} className="text-skylink-blue mb-4 group-hover:translate-x-2 transition-transform" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-2">Accelerated Growth</h3>
                                <p className="text-sm text-slate-500">Merit-based promotions and clear career pathing for high performers.</p>
                            </div>
                            <div className="group">
                                <Globe size={32} className="text-skylink-blue mb-4 group-hover:translate-x-2 transition-transform" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-2">Global Exposure</h3>
                                <p className="text-sm text-slate-500">Collaborate with cross-functional teams in NY, London, and Asia.</p>
                            </div>
                            <div className="group">
                                <Users size={32} className="text-skylink-blue mb-4 group-hover:translate-x-2 transition-transform" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-2">Mentorship</h3>
                                <p className="text-sm text-slate-500">Direct access to leadership and industry veterans.</p>
                            </div>
                            <div className="group">
                                <Heart size={32} className="text-skylink-blue mb-4 group-hover:translate-x-2 transition-transform" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-2">Well-being</h3>
                                <p className="text-sm text-slate-500">Comprehensive health benefits and flexible work arrangements.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. OPEN POSITIONS (ROLES GRID) */}
            <section id="openings" className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-skylink-blue font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Opportunities</span>
                        <h2 className="text-4xl font-bold text-skylink-navy font-serif">OPEN POSITIONS</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Column 1: Field Ops */}
                        <div className="bg-white p-8 border-t-4 border-skylink-navy shadow-sm hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <Briefcase size={24} className="text-skylink-navy" />
                                <h3 className="text-xl font-bold text-skylink-navy">Field Operations</h3>
                            </div>
                            <ul className="space-y-6">
                                <li className="group cursor-pointer">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-slate-700 group-hover:text-skylink-blue transition-colors">Vendor Manager</h4>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-skylink-blue" />
                                    </div>
                                    <p className="text-xs text-slate-500">New York (Hybrid) • Full-time</p>
                                </li>
                                <li className="group cursor-pointer">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-slate-700 group-hover:text-skylink-blue transition-colors">QC Specialist</h4>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-skylink-blue" />
                                    </div>
                                    <p className="text-xs text-slate-500">Manila • Full-time</p>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2: Tech */}
                        <div className="bg-white p-8 border-t-4 border-skylink-blue shadow-sm hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <Monitor size={24} className="text-skylink-blue" />
                                <h3 className="text-xl font-bold text-skylink-navy">Technology</h3>
                            </div>
                            <ul className="space-y-6">
                                <li className="group cursor-pointer">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-slate-700 group-hover:text-skylink-blue transition-colors">Full Stack Developer</h4>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-skylink-blue" />
                                    </div>
                                    <p className="text-xs text-slate-500">Bangalore • Remote</p>
                                </li>
                                <li className="group cursor-pointer">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-slate-700 group-hover:text-skylink-blue transition-colors">Data Analyst</h4>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-skylink-blue" />
                                    </div>
                                    <p className="text-xs text-slate-500">Bangalore • Full-time</p>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Corporate */}
                        <div className="bg-white p-8 border-t-4 border-skylink-gold shadow-sm hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <Layout size={24} className="text-skylink-gold" />
                                <h3 className="text-xl font-bold text-skylink-navy">Corporate</h3>
                            </div>
                            <ul className="space-y-6">
                                <li className="group cursor-pointer">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-slate-700 group-hover:text-skylink-blue transition-colors">HR Business Partner</h4>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-skylink-blue" />
                                    </div>
                                    <p className="text-xs text-slate-500">London • Hybrid</p>
                                </li>
                                <li className="group cursor-pointer">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-slate-700 group-hover:text-skylink-blue transition-colors">Sales Executive</h4>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-skylink-blue" />
                                    </div>
                                    <p className="text-xs text-slate-500">New York • On-site</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 bg-skylink-navy p-12 text-center rounded-sm relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-4 font-serif">Don't see a fit?</h3>
                            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                                We are always looking for exceptional talent. Send your resume and portfolio to our talent acquisition team.
                            </p>
                            <a href="mailto:careers@skylink-ltd.com" className="inline-block px-8 py-3 border-2 border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-skylink-navy transition-colors">
                                Email Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
