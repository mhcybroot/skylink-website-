import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Shield, Target, Users, Heart, ArrowRight, Award } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import heroBg from '../assets/Photos/DSC05814.jpg';
import csrBg from '../assets/Photos/DSC05856.jpg';
import chairmanImg from '../assets/chairman.webp';
import ceoImg from '../assets/ceo.webp';
import mdImg from '../assets/managing-director.webp';

const About = () => {
    const valuesRef = useRef(null);
    const leadershipRef = useRef(null);
    const timelineRef = useRef(null);
    const csrRef = useRef(null);

    const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
    const leadershipInView = useInView(leadershipRef, { once: true, margin: '-100px' });
    const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' });
    const csrInView = useInView(csrRef, { once: true, margin: '-100px' });

    const values = [
        { icon: Shield, title: 'Uncompromising Integrity', desc: 'We operate with full transparency. No hidden fees, no cut corners. In an industry of variables, we are the constant.' },
        { icon: Target, title: 'Precision Execution', desc: '"Good enough" is failure. We pursue military-grade precision in every property secured and every call answered.' },
        { icon: Users, title: 'People First', desc: 'Technology empowers us, but people define us. We invest heavily in the training and well-being of our global workforce.' },
    ];

    const leaders = [
        { name: 'Engr. Sami Yousuf Ratan', title: 'Chairman', image: chairmanImg, color: 'skylink-gold', desc: 'A visionary leader with over 20 years of experience in international business and asset management. He established the core philosophy of "Stability through Innovation."' },
        { name: 'Engr. Riyadh Arfin Bhuiyan', title: 'CEO & Founder', image: ceoImg, color: 'skylink-navy', desc: 'The driving force behind Skylink\'s expansion into property preservation. His hands-on approach ensures that our operational standards never waver.' },
        { name: 'Adv. Golam Mustafa Sumon', title: 'Managing Director', image: mdImg, color: 'skylink-blue', desc: 'Overseeing global operations across three continents. He specializes in optimizing workflow logistics and integrating new technologies into our stack.' },
    ];

    const timeline = [
        { year: '2011', title: 'Foundation', desc: 'Skylink Innovations is founded in New York with a focus on business process outsourcing.', active: false },
        { year: '2014', title: 'Global Expansion', desc: 'Opened delivery centers in Dhaka and Manila to support 24/7 operations.', active: false },
        { year: '2017', title: 'Property Preservation Division', desc: 'Launched US-based field operations, partnering with national asset management firms.', active: true },
        { year: 'TODAY', title: 'Market Leadership', desc: 'Servicing 5,000+ assets monthly with a hybrid model of field vendors and digital support.', active: true },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-white min-h-screen pt-20 font-sans">
            <SEO title="About Us" description="Built on Trust. Skylink Innovations is the strategic backbone for the nation's leading asset managers." />

            {/* 1. HERO */}
            <section className="relative h-[600px] flex items-center bg-skylink-navy overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale-[30%] opacity-20"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-skylink-navy via-skylink-navy/90 to-transparent" />

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-skylink-gold/30"
                            style={{
                                left: `${10 + i * 12}%`,
                                top: `${15 + (i % 4) * 20}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 py-2 px-4 bg-skylink-gold/20 backdrop-blur-sm border border-skylink-gold/50 text-skylink-gold text-xs font-bold tracking-[0.2em] mb-6 uppercase rounded-full"
                    >
                        <Award size={14} />
                        Since 2011
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight font-serif leading-none"
                    >
                        BUILT ON<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-skylink-gold to-yellow-400">TRUST</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-300 font-light max-w-xl leading-relaxed border-l-2 border-skylink-gold pl-6"
                    >
                        Skylink Innovations is more than a service provider. We are the strategic backbone for the nation's leading asset managers and financial institutions.
                    </motion.p>
                </div>
            </section>

            {/* 2. THE SKYLINK CODE */}
            <section ref={valuesRef} className="py-28 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 text-skylink-gold font-bold tracking-widest text-sm uppercase mb-4">
                            <div className="w-8 h-px bg-skylink-gold" />
                            Our Values
                            <div className="w-8 h-px bg-skylink-gold" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-skylink-navy mb-4 font-serif">The Skylink Code</h2>
                        <p className="mt-6 text-slate-500 max-w-2xl mx-auto">
                            Our reputation is our currency. Every action we take is guided by a rigid framework of ethics and excellence.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={valuesInView ? "visible" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className="text-center group p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-slate-100"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="w-20 h-20 bg-skylink-navy rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-skylink-navy/30"
                                >
                                    <value.icon size={36} className="text-skylink-gold" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-skylink-navy mb-4 font-serif">{value.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 3. LEADERSHIP */}
            <section ref={leadershipRef} className="py-28 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="mb-16"
                    >
                        <div className="inline-flex items-center gap-2 text-skylink-blue font-bold tracking-widest text-sm uppercase mb-4">
                            <div className="w-8 h-px bg-skylink-blue" />
                            Executive Team
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-skylink-navy mb-4 font-serif">Leadership</h2>
                        <p className="text-lg text-slate-600 max-w-3xl">
                            Decades of combined experience in Real Estate, Finance, and Global Operations.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={leadershipInView ? "visible" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {leaders.map((leader, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className={`bg-white rounded-2xl shadow-lg overflow-hidden group border-b-4 border-${leader.color}`}
                            >
                                <div className="h-80 overflow-hidden relative">
                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-skylink-navy/90 via-skylink-navy/20 to-transparent opacity-100 group-hover:opacity-70 transition-opacity" />
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-bold font-serif mb-1">{leader.name}</h3>
                                        <p className="text-skylink-gold font-bold tracking-widest text-xs uppercase">{leader.title}</p>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                        {leader.desc}
                                    </p>
                                    <div className={`w-12 h-1 bg-slate-200 group-hover:bg-${leader.color} group-hover:w-20 transition-all duration-300`} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 4. TIMELINE */}
            <section ref={timelineRef} className="py-28 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 text-skylink-blue font-bold tracking-widest text-sm uppercase mb-4">
                            <div className="w-8 h-px bg-skylink-blue" />
                            Our History
                            <div className="w-8 h-px bg-skylink-blue" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-skylink-navy font-serif">A Decade of Innovation</h2>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline line */}
                        <motion.div
                            initial={{ height: 0 }}
                            animate={timelineInView ? { height: '100%' } : {}}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="absolute left-6 md:left-10 top-0 w-0.5 bg-gradient-to-b from-slate-200 via-skylink-blue to-skylink-gold"
                        />

                        <div className="space-y-12">
                            {timeline.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.15 }}
                                    className="relative pl-16 md:pl-20"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        className={`absolute left-4 md:left-8 top-0 w-5 h-5 rounded-full border-4 border-white shadow-lg ${item.active ? 'bg-skylink-gold' : 'bg-slate-300'} ${item.year === 'TODAY' ? 'animate-pulse w-6 h-6 -left-0.5 md:left-7' : ''}`}
                                    />
                                    <span className={`text-sm font-bold tracking-widest mb-2 block ${item.active ? 'text-skylink-gold' : 'text-slate-400'}`}>{item.year}</span>
                                    <h3 className="text-xl font-bold text-skylink-navy mb-2">{item.title}</h3>
                                    <p className="text-slate-600">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CSR */}
            <section ref={csrRef} className="relative py-28 bg-skylink-navy overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: `url(${csrBg})` }}
                />

                {/* Gradient orbs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-skylink-blue/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-skylink-gold/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={csrInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="inline-block p-4 bg-skylink-gold/20 rounded-2xl mb-6"
                        >
                            <Heart size={40} className="text-skylink-gold" />
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">Community & Impact</h2>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            We believe that success is measured by who you lift up with you. Through the Skylink Foundation, we support education initiatives and disaster relief efforts in the communities where our employees live and work.
                        </p>
                        <motion.div whileHover={{ x: 5 }}>
                            <Link to="/contact" className="inline-flex items-center text-white border-b-2 border-skylink-gold pb-1 hover:text-skylink-gold transition-colors group">
                                Partner with our Foundation
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;

