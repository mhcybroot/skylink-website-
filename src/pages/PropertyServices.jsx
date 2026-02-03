import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Hammer, Home, PenTool, Trash2, CheckCircle, ArrowRight, ShieldCheck, ClipboardCheck, ChevronRight, Server, Lock, Globe, Users, HardHat, FileCheck } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import heroBg from '../assets/Photos/DSC05810.jpg';
import preservationBg from '../assets/Photos/DSC05844.jpg';
import renoBg from '../assets/Photos/DSC05809.jpg';
import techBg from '../assets/Photos/DSC05839.jpg';
import LottieAnimation from '../components/Common/LottieAnimation';
import placeholderAnimation from '../assets/animations/placeholder.json';

const PropertyServices = () => {
    const introRef = useRef(null);
    const introInView = useInView(introRef, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-white min-h-screen pt-20 font-sans">
            <SEO title="Property Preservation" description="Nationwide property preservation, maintenance, and renovation services for asset managers." />
            {/* 1. COMPACT INDUSTRIAL HERO */}
            <section className="relative h-[500px] flex items-center bg-skylink-navy border-b-4 border-skylink-gold overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-cover bg-center grayscale-[50%]"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-skylink-navy via-skylink-navy/80 to-transparent" />

                {/* Lottie Background Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay">
                    <LottieAnimation
                        animationData={placeholderAnimation}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 py-2 px-4 bg-skylink-gold/20 backdrop-blur-sm border border-skylink-gold/50 text-skylink-gold text-xs font-bold tracking-[0.2em] mb-6 uppercase rounded-full"
                    >
                        Vertical 01
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight font-serif leading-none"
                    >
                        PROPERTY<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-skylink-gold to-yellow-400">PRESERVATION</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-300 font-light max-w-2xl leading-relaxed border-l-2 border-skylink-gold pl-6"
                    >
                        Protecting, Maintaining, and Enhancing Real Estate Assets across the Continental United States.
                    </motion.p>
                </div>
            </section>

            {/* 2. THE SKYLINK STANDARD (INTRO) */}
            <section ref={introRef} className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={introInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-skylink-navy mb-6 font-serif">THE SKYLINK STANDARD</h2>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={introInView ? { width: 80 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-1 bg-skylink-gold mb-8"
                        />
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            In a fragmented industry, stability is the ultimate asset. Skylink Innovations delivers a unified, enterprise-grade solution for asset managers, tackling the complex logistics of property preservation with military precision.
                        </p>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            We don't just maintain properties; we mitigate risk, accelerate turnaround times, and maximize ROI through data-driven field operations.
                        </p>
                        <motion.ul
                            variants={containerVariants}
                            initial="hidden"
                            animate={introInView ? "visible" : "hidden"}
                            className="space-y-4"
                        >
                            {[
                                "100% W-9 Compliant Vendor Network",
                                "HUD/FHA/VA Guideline Adherence",
                                "API-Integrated Workflow Management",
                                "$2M General Liability Insurance"
                            ].map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    variants={itemVariants}
                                    className="flex items-center text-skylink-navy font-bold text-sm uppercase tracking-wide"
                                >
                                    <CheckCircle size={18} className="text-skylink-gold mr-3" />
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={introInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative h-[500px] border border-slate-200 p-2 group"
                    >
                        <div className="absolute inset-2 border border-slate-100" />
                        <img src={heroBg} alt="Standard" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={introInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="absolute bottom-10 -left-6 bg-skylink-navy p-8 text-white shadow-2xl max-w-xs"
                        >
                            <div className="text-4xl font-bold text-skylink-gold mb-2">15+</div>
                            <div className="text-sm font-bold tracking-widest uppercase">Years of Field Expertise</div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 3. DEEP DIVE: PRESERVATION WING */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-4">
                            <div className="sticky top-24">
                                <span className="text-8xl font-bold text-slate-200 leading-none -ml-4">01</span>
                                <h2 className="text-3xl font-bold text-skylink-navy -mt-10 relative z-10 mb-6 font-serif">FIELD OPERATIONS & PRESERVATION</h2>
                                <p className="text-slate-500 mb-8 leading-relaxed">
                                    Our "Boots on the Ground" teams allow you to manage thousands of assets as easily as one. Immediate securement and stabilization prevents ongoing deterioration.
                                </p>
                                <Link to="/contact" className="inline-flex items-center text-sm font-bold text-skylink-blue uppercase tracking-widest hover:text-skylink-navy transition-colors">
                                    Request Rate Sheet <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <img src={preservationBg} alt="Preservation" className="w-full h-64 object-cover col-span-full border-b-4 border-skylink-blue" />

                            <div className="bg-white p-8 border border-slate-200">
                                <ShieldCheck size={32} className="text-skylink-blue mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Securement</h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>• Lock Changes & Re-keying</li>
                                    <li>• Board-ups (HUD Specs)</li>
                                    <li>• Eviction Assistance</li>
                                    <li>• Window/Door Repair</li>
                                </ul>
                            </div>
                            <div className="bg-white p-8 border border-slate-200">
                                <Trash2 size={32} className="text-skylink-blue mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Conveyance Prep</h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>• Interior Trash-out</li>
                                    <li>• Hazard Removal</li>
                                    <li>• Maid Services</li>
                                    <li>• Personal Property Storage</li>
                                </ul>
                            </div>
                            <div className="bg-white p-8 border border-slate-200">
                                <Home size={32} className="text-skylink-blue mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Landscape Maint.</h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>• Grass Cuts & Edging</li>
                                    <li>• Tree Trimming/Removal</li>
                                    <li>• Snow Removal</li>
                                    <li>• Pool Securing</li>
                                </ul>
                            </div>
                            <div className="bg-white p-8 border border-slate-200">
                                <ClipboardCheck size={32} className="text-skylink-blue mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Winterization</h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li>• System Draining</li>
                                    <li>• Pressure Testing</li>
                                    <li>• Anti-freeze Application</li>
                                    <li>• Leak Detection</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. DEEP DIVE: CONSTRUCTION WING */}
            <section className="py-24 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 order-2 lg:order-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <img src={renoBg} alt="Construction" className="w-full h-64 object-cover col-span-full border-b-4 border-skylink-gold" />

                            <div className="bg-slate-50 p-8 border-l border-slate-200 hover:border-l-4 hover:border-skylink-gold transition-all">
                                <Hammer size={32} className="text-skylink-gold mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Full Rehabs</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">Complete turnkey renovations for REO assets. We manage permits, materials, and labor to maximize resale value.</p>
                            </div>
                            <div className="bg-slate-50 p-8 border-l border-slate-200 hover:border-l-4 hover:border-skylink-gold transition-all">
                                <HardHat size={32} className="text-skylink-gold mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">CapEx Projects</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">Large-scale capital expenditure projects including roofing, foundation repair, and HVAC system replacements.</p>
                            </div>
                            <div className="bg-slate-50 p-8 border-l border-slate-200 hover:border-l-4 hover:border-skylink-gold transition-all">
                                <PenTool size={32} className="text-skylink-gold mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Emergency Repairs</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">24/7 dispatched response for vandalism, fire damage, storm damage, and plumbing failures.</p>
                            </div>
                            <div className="bg-slate-50 p-8 border-l border-slate-200 hover:border-l-4 hover:border-skylink-gold transition-all">
                                <FileCheck size={32} className="text-skylink-gold mb-4" />
                                <h3 className="text-xl font-bold text-skylink-navy mb-3">Code Compliance</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">Resolving city code violations and mechanic's liens to ensure clear title transfer.</p>
                            </div>
                        </div>

                        <div className="lg:col-span-4 order-1 lg:order-2">
                            <div className="sticky top-24 text-right">
                                <span className="text-8xl font-bold text-slate-100 leading-none -mr-4">02</span>
                                <h2 className="text-3xl font-bold text-skylink-navy -mt-10 relative z-10 mb-6 font-serif">RENOVATION & CONSTRUCTION</h2>
                                <p className="text-slate-500 mb-8 leading-relaxed">
                                    From simple "Trash-out & Paint" refreshes to complex structural repairs. Our licensed general contractors bring distressed assets back to market condition.
                                </p>
                                <Link to="/contact" className="inline-flex items-center text-sm font-bold text-skylink-gold uppercase tracking-widest hover:text-skylink-navy transition-colors">
                                    View Project Gallery <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. TECHNOLOGY SUITE (DARK MODE) */}
            <section className="py-24 bg-skylink-navy text-white relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${techBg})` }}
                ></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-skylink-black font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Digital Infrastructure</span>
                        <h2 className="text-4xl font-bold mb-6 font-serif text-white">ENTERPRISE-GRADE COMPLIANCE</h2>
                        <br></br><br></br><br></br><br></br><br></br>
                        {/* <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            We bridge the physical and digital worlds. Our proprietary portal integration ensures you have real-time visibility into every asset.
                        </p> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
                            <Server size={40} className="text-skylink-gold mb-6" />
                            <h3 className="text-xl font-bold mb-4 text-white">API Integration</h3>
                            <p className="text-slate-100 text-sm leading-relaxed">Seamlessly connects with Aspen Grove, Equator, Res.net, and other major asset management platforms.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
                            <Lock size={40} className="text-skylink-gold mb-6" />
                            <h3 className="text-xl font-bold mb-4 text-white">Data Security</h3>
                            <p className="text-slate-100 text-sm leading-relaxed">SOC 2 Type II compliant data handling. All photos and reports are geo-tagged and time-stamped for fraud prevention.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
                            <Globe size={40} className="text-skylink-gold mb-6" />
                            <h3 className="text-xl font-bold mb-4 text-white">Real-Time Reporting</h3>
                            <p className="text-slate-100 text-sm leading-relaxed">Live field updates allow you to approve bids and view completion photos instantly from your dashboard.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. VENDOR NETWORK INVITE */}
            <section className="py-32 bg-slate-50 text-center border-t border-slate-200">
                <div className="max-w-3xl mx-auto px-6">
                    <Users size={48} className="mx-auto text-skylink-navy mb-6" />
                    <h2 className="text-3xl md:text-5xl font-bold text-skylink-navy mb-6 font-serif">JOIN OUR NETWORK</h2>
                    <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light">
                        Are you a licensed contractor with a commitment to excellence? We are actively expanding our vendor panel in high-volume REO markets.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact" className="px-8 py-4 bg-skylink-navy text-white font-bold uppercase tracking-widest hover:bg-skylink-blue transition-colors">
                            Contractor Application
                        </Link>
                        <Link to="/contact" className="px-8 py-4 border border-skylink-navy text-skylink-navy font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors">
                            Download Vendor Packet
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PropertyServices;
