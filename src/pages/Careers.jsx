import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, Heart, Globe, Briefcase, ChevronRight, ArrowRight, Users, Monitor, Layout, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import heroBg from '../assets/Photos/DSC05856.jpg';
import cultureBg from '../assets/Photos/DSC05814.jpg';
import LottieAnimation from '../components/Common/LottieAnimation';
import placeholderAnimation from '../assets/animations/placeholder.json';

const Careers = () => {
    const cultureRef = useRef(null);
    const openingsRef = useRef(null);
    const cultureInView = useInView(cultureRef, { once: true, margin: '-100px' });
    const openingsInView = useInView(openingsRef, { once: true, margin: '-100px' });

    const cultureItems = [
        { icon: Rocket, title: 'Accelerated Growth', desc: 'Merit-based promotions and clear career pathing for high performers.' },
        { icon: Globe, title: 'Global Exposure', desc: 'Collaborate with cross-functional teams in NY, London, and Asia.' },
        { icon: Users, title: 'Mentorship', desc: 'Direct access to leadership and industry veterans.' },
        { icon: Heart, title: 'Well-being', desc: 'Comprehensive health benefits and flexible work arrangements.' },
    ];

    const openings = [
        {
            department: 'Field Operations',
            icon: Briefcase,
            color: 'skylink-navy',
            roles: [
                { title: 'Vendor Manager', location: 'New York (Hybrid)', type: 'Full-time' },
                { title: 'QC Specialist', location: 'Manila', type: 'Full-time' },
            ]
        },
        {
            department: 'Technology',
            icon: Monitor,
            color: 'tech-cyan',
            roles: [
                { title: 'Full Stack Developer', location: 'Bangalore', type: 'Remote' },
                { title: 'Data Analyst', location: 'Bangalore', type: 'Full-time' },
            ]
        },
        {
            department: 'Corporate',
            icon: Layout,
            color: 'skylink-gold',
            roles: [
                { title: 'HR Business Partner', location: 'London', type: 'Hybrid' },
                { title: 'Sales Executive', location: 'New York', type: 'On-site' },
            ]
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-white min-h-screen pt-20 font-sans">
            <SEO title="Careers" description="Build Your Legacy. Join a team that is redefining the standards of global asset management and digital operations." />

            {/* 1. HERO */}
            <section className="relative h-[600px] flex items-center bg-skylink-navy overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale-[30%] opacity-20"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-skylink-navy via-skylink-navy/90 to-transparent" />

                {/* Lottie Background Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
                    <LottieAnimation
                        animationData={placeholderAnimation}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 py-2 px-4 bg-skylink-blue/20 backdrop-blur-sm border border-skylink-blue/50 text-skylink-blue text-xs font-bold tracking-[0.2em] mb-6 uppercase rounded-full"
                    >
                        <Sparkles size={14} />
                        Join the Frontline
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight font-serif leading-none"
                    >
                        BUILD YOUR<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-skylink-blue to-tech-cyan">LEGACY</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-300 font-light max-w-xl leading-relaxed border-l-2 border-skylink-blue pl-6 mb-8"
                    >
                        We don't offer jobs; we offer trajectories. Join a team that is redefining the standards of global asset management and digital operations.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href="#openings" className="inline-flex items-center px-8 py-4 bg-skylink-blue text-white font-bold uppercase tracking-widest rounded-lg hover:bg-tech-cyan hover:shadow-glow transition-all duration-300 group">
                            View Open Positions
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* 2. WHY SKYLINK? (CULTURE) */}
            <section ref={cultureRef} className="py-28 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={cultureInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl group"
                    >
                        <img src={cultureBg} alt="Office Culture" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-skylink-navy/80 to-transparent" />

                        {/* Floating stat card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={cultureInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-white p-8 rounded-xl shadow-2xl border-t-4 border-skylink-blue"
                        >
                            <div className="text-4xl font-bold text-skylink-navy mb-2">4.8/5</div>
                            <div className="text-sm font-bold text-slate-500 tracking-widest uppercase">Employee Satisfaction</div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={cultureInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="inline-flex items-center gap-2 text-skylink-blue font-bold tracking-widest text-sm uppercase mb-4">
                            <div className="w-8 h-px bg-skylink-blue" />
                            Culture
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-skylink-navy mb-6 font-serif">Why Skylink?</h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            We operate at the intersection of stability and speed. As a Skylink team member, you'll be challenged to solve complex logistical problems while being supported by world-class infrastructure.
                        </p>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={cultureInView ? "visible" : "hidden"}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {cultureItems.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="group p-6 bg-slate-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-slate-100"
                                >
                                    <item.icon size={28} className="text-skylink-blue mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-lg font-bold text-skylink-navy mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 3. OPEN POSITIONS */}
            <section id="openings" ref={openingsRef} className="py-28 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={openingsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 text-skylink-blue font-bold tracking-widest text-sm uppercase mb-4">
                            <div className="w-8 h-px bg-skylink-blue" />
                            Opportunities
                            <div className="w-8 h-px bg-skylink-blue" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-skylink-navy font-serif">Open Positions</h2>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={openingsInView ? "visible" : "hidden"}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {openings.map((dept, deptIdx) => (
                            <motion.div
                                key={deptIdx}
                                variants={itemVariants}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-${dept.color}`}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-3 bg-${dept.color}/10 rounded-xl`}>
                                        <dept.icon size={24} className={`text-${dept.color}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-skylink-navy">{dept.department}</h3>
                                </div>

                                <ul className="space-y-4">
                                    {dept.roles.map((role, roleIdx) => (
                                        <motion.li
                                            key={roleIdx}
                                            whileHover={{ x: 5 }}
                                            className="group cursor-pointer p-4 rounded-lg hover:bg-slate-50 transition-colors"
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-bold text-slate-700 group-hover:text-skylink-blue transition-colors">{role.title}</h4>
                                                <ChevronRight size={16} className="text-slate-300 group-hover:text-skylink-blue group-hover:translate-x-1 transition-all" />
                                            </div>
                                            <p className="text-xs text-slate-500">{role.location} • {role.type}</p>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* General Application CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={openingsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-16 bg-gradient-to-r from-skylink-navy to-skylink-blue p-12 text-center rounded-2xl relative overflow-hidden"
                    >
                        {/* Background decoration */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-tech-cyan rounded-full blur-3xl" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-serif">Don't see a fit?</h3>
                            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                                We are always looking for exceptional talent. Send your resume and portfolio to our talent acquisition team.
                            </p>
                            <motion.a
                                href="mailto:careers@skylink-ltd.com"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:text-skylink-navy transition-all duration-300 group"
                            >
                                Email Us
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Careers;

