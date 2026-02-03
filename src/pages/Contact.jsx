import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, Loader2, CheckCircle2, Send, Clock, Building } from 'lucide-react';
import SEO from '../components/SEO';
import heroBg from '../assets/Photos/DSC05810.jpg';

const Contact = () => {
    const formRef = useRef(null);
    const officesRef = useRef(null);
    const formInView = useInView(formRef, { once: true, margin: '-100px' });
    const officesInView = useInView(officesRef, { once: true, margin: '-100px' });

    const [formStatus, setFormStatus] = useState('idle');
    const [focusedField, setFocusedField] = useState(null);

    const offices = [
        {
            city: 'New York',
            country: 'USA',
            type: 'Corporate HQ',
            address: '123 Wall Street, Suite 400, New York, NY 10005',
            phone: '+1 (212) 555-0123',
            color: 'skylink-blue',
        },
        {
            city: 'Dhaka',
            country: 'Bangladesh',
            type: 'Operations Hub',
            address: 'House 45, Road 12, Banani, Dhaka-1213',
            phone: '+880 2 5551234',
            color: 'skylink-navy',
        },
        {
            city: 'Manila',
            country: 'Philippines',
            type: 'Customer Experience Center',
            address: 'Unit 2101, BGC Tower, Taguig, Metro Manila',
            phone: '+63 2 8555 1234',
            color: 'skylink-gold',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('loading');
        setTimeout(() => {
            setFormStatus('success');
            setTimeout(() => setFormStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <div className="bg-white min-h-screen pt-20 font-sans">
            <SEO title="Contact Us" description="Let's Build Something Great Together. Whether you need scalable property services or cutting-edge ITES solutions, our team is ready." />

            {/* 1. HERO */}
            <section className="relative h-[500px] flex items-center bg-skylink-navy overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale-[30%] opacity-20"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-skylink-navy via-skylink-navy/90 to-transparent" />

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-tech-cyan/30"
                            style={{
                                left: `${15 + i * 14}%`,
                                top: `${25 + (i % 3) * 20}%`,
                            }}
                            animate={{
                                y: [0, -25, 0],
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

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 py-2 px-4 bg-tech-cyan/20 backdrop-blur-sm border border-tech-cyan/50 text-tech-cyan text-xs font-bold tracking-[0.2em] mb-6 uppercase rounded-full"
                    >
                        <Send size={14} />
                        Get in Touch
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight font-serif"
                    >
                        Let's Build Something<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-cyan to-skylink-blue">Great Together</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-300 max-w-2xl mx-auto"
                    >
                        Whether you need scalable property services or cutting-edge ITES solutions, our team is ready.
                    </motion.p>
                </div>
            </section>

            {/* 2. CONTACT FORM & INFO */}
            <section ref={formRef} className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-16">
                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3"
                    >
                        <div className="inline-flex items-center gap-2 text-skylink-blue font-bold tracking-widest text-sm uppercase mb-4">
                            <div className="w-8 h-px bg-skylink-blue" />
                            Contact Form
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-skylink-navy mb-8 font-serif">Send Us a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {['Full Name', 'Email Address'].map((label, idx) => (
                                    <motion.div
                                        key={label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={formInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                        className="relative"
                                    >
                                        <input
                                            type={idx === 1 ? 'email' : 'text'}
                                            placeholder={label}
                                            required
                                            onFocus={() => setFocusedField(label)}
                                            onBlur={() => setFocusedField(null)}
                                            className={`w-full px-4 py-4 border-2 rounded-xl bg-slate-50 focus:bg-white focus:outline-none transition-all duration-300 ${focusedField === label ? 'border-skylink-blue shadow-lg shadow-skylink-blue/10' : 'border-slate-200'}`}
                                        />
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: focusedField === label ? 1 : 0 }}
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-skylink-blue to-tech-cyan origin-left"
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={formInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 }}
                                className="relative"
                            >
                                <select
                                    onFocus={() => setFocusedField('subject')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`w-full px-4 py-4 border-2 rounded-xl bg-slate-50 focus:bg-white focus:outline-none transition-all duration-300 ${focusedField === 'subject' ? 'border-skylink-blue shadow-lg shadow-skylink-blue/10' : 'border-slate-200'}`}
                                >
                                    <option>Select a Subject</option>
                                    <option>Property Preservation Services</option>
                                    <option>ITES / BPO Solutions</option>
                                    <option>Partnership Inquiry</option>
                                    <option>Careers</option>
                                    <option>General Inquiry</option>
                                </select>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={formInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.5 }}
                                className="relative"
                            >
                                <textarea
                                    rows="5"
                                    placeholder="Your Message"
                                    required
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`w-full px-4 py-4 border-2 rounded-xl bg-slate-50 focus:bg-white focus:outline-none resize-none transition-all duration-300 ${focusedField === 'message' ? 'border-skylink-blue shadow-lg shadow-skylink-blue/10' : 'border-slate-200'}`}
                                />
                            </motion.div>

                            <motion.button
                                type="submit"
                                disabled={formStatus === 'loading'}
                                initial={{ opacity: 0, y: 20 }}
                                animate={formInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.6 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full md:w-auto px-10 py-4 font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${formStatus === 'success'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-skylink-navy text-white hover:bg-skylink-blue hover:shadow-glow'
                                    }`}
                            >
                                {formStatus === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                                {formStatus === 'success' && <CheckCircle2 className="w-5 h-5" />}
                                {formStatus === 'idle' && <Send className="w-5 h-5" />}
                                {formStatus === 'loading' ? 'Sending...' : formStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Quick Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 sticky top-32">
                            <h3 className="text-xl font-bold text-skylink-navy mb-6">Quick Contact</h3>

                            <div className="space-y-6">
                                {[
                                    { icon: Mail, label: 'Email', value: 'info@skylink-innovations.com', color: 'skylink-blue' },
                                    { icon: Phone, label: 'Phone', value: '+1 (212) 555-0123', color: 'tech-cyan' },
                                    { icon: Clock, label: 'Business Hours', value: 'Mon - Fri: 9AM - 6PM EST', color: 'skylink-gold' },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.5 + idx * 0.1 }}
                                        whileHover={{ x: 5 }}
                                        className="flex items-start gap-4 group cursor-pointer"
                                    >
                                        <div className={`p-3 bg-${item.color}/10 rounded-xl group-hover:bg-${item.color}/20 transition-colors`}>
                                            <item.icon size={20} className={`text-${item.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                                            <p className="font-semibold text-skylink-navy group-hover:text-skylink-blue transition-colors">{item.value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-200">
                                <p className="text-sm text-slate-500">
                                    Response Time: We aim to respond to all inquiries within 24 business hours.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. GLOBAL OFFICES */}
            <section ref={officesRef} className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={officesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 text-skylink-gold font-bold tracking-widest text-sm uppercase mb-4">
                            <div className="w-8 h-px bg-skylink-gold" />
                            Our Locations
                            <div className="w-8 h-px bg-skylink-gold" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-skylink-navy font-serif">Global Offices</h2>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={officesInView ? "visible" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {offices.map((office, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-t-4 border-${office.color} group`}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-3 bg-${office.color}/10 rounded-xl group-hover:bg-${office.color}/20 transition-colors`}>
                                        <Building size={24} className={`text-${office.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-skylink-navy">{office.city}</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{office.type}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex items-start gap-3 cursor-pointer"
                                    >
                                        <MapPin size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-slate-600 text-sm">{office.address}</p>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <Phone size={18} className="text-slate-400 flex-shrink-0" />
                                        <p className="text-slate-600 text-sm font-medium group-hover:text-skylink-blue transition-colors">{office.phone}</p>
                                    </motion.div>
                                </div>

                                <div className={`mt-6 pt-6 border-t border-slate-100 w-12 h-1 bg-slate-200 group-hover:bg-${office.color} group-hover:w-full transition-all duration-500`} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 4. MAP CTA */}
            <section className="py-20 bg-gradient-to-r from-skylink-navy to-skylink-blue relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-tech-cyan/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">Ready to Transform Your Operations?</h3>
                        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                            Our experts are standing by to discuss how Skylink can help you achieve operational excellence.
                        </p>
                        <motion.a
                            href="tel:+12125550123"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-8 py-4 bg-white text-skylink-navy font-bold uppercase tracking-widest rounded-xl hover:bg-skylink-gold hover:text-white transition-all duration-300 shadow-2xl group"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Call Us Now
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
