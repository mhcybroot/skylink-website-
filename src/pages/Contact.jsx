import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Briefcase, FileText, Globe, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import heroBg from '../assets/Photos/DSC05826.jpg'; // Meeting/Handshake context

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        role: '',
        department: 'General',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = `Inquiry: ${formData.department} - ${formData.company}`;
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ACompany: ${formData.company}%0D%0ARole: ${formData.role}%0D%0ADepartment: ${formData.department}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
        window.location.href = `mailto:info@skylink-ltd.com?subject=${subject}&body=${body}`;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white min-h-screen pt-20 font-sans">
            {/* 1. HERO: PARTNER WITH EXCELLENCE */}
            <section className="relative h-[500px] flex items-center bg-skylink-navy border-b-8 border-skylink-gold">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale-[50%] opacity-20"
                    style={{ backgroundImage: `url(${heroBg})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-skylink-navy via-skylink-navy/90 to-transparent"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <span className="inline-block py-1 px-3 border border-skylink-gold text-skylink-gold text-xs font-bold tracking-[0.2em] mb-6 uppercase">
                        24/7 Global Support
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight font-serif leading-none">
                        PARTNER WITH<br />EXCELLENCE
                    </h1>
                    <p className="text-xl text-slate-300 font-light max-w-xl leading-relaxed border-l-2 border-skylink-gold pl-6">
                        Whether you are an asset manager seeking efficiency or a vendor looking to join our network, we are ready to deploy.
                    </p>
                </div>
            </section>

            {/* 2. DIRECT LINES GRID */}
            <section className="py-24 bg-white relative -mt-20 z-20">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Sales */}
                    <div className="bg-white p-10 shadow-xl border-t-4 border-skylink-gold hover:-translate-y-2 transition-transform duration-300">
                        <Briefcase size={32} className="text-skylink-gold mb-6" />
                        <h3 className="text-2xl font-bold text-skylink-navy mb-2 font-serif">Enterprise Sales</h3>
                        <p className="text-slate-500 mb-6 text-sm">For asset management firms and financial institutions.</p>
                        <a href="mailto:sales@skylink-ltd.com" className="text-skylink-navy font-bold border-b border-skylink-gold hover:text-skylink-gold transition-colors pb-1">sales@skylink-ltd.com</a>
                    </div>

                    {/* Vendor Relations */}
                    <div className="bg-white p-10 shadow-xl border-t-4 border-skylink-navy hover:-translate-y-2 transition-transform duration-300">
                        <FileText size={32} className="text-skylink-navy mb-6" />
                        <h3 className="text-2xl font-bold text-skylink-navy mb-2 font-serif">Vendor Network</h3>
                        <p className="text-slate-500 mb-6 text-sm">For contractors and field service professionals.</p>
                        <a href="mailto:vendor@skylink-ltd.com" className="text-skylink-navy font-bold border-b border-skylink-navy hover:text-skylink-gold transition-colors pb-1">vendor@skylink-ltd.com</a>
                    </div>

                    {/* General Support */}
                    <div className="bg-white p-10 shadow-xl border-t-4 border-skylink-blue hover:-translate-y-2 transition-transform duration-300">
                        <MessageSquare size={32} className="text-skylink-blue mb-6" />
                        <h3 className="text-2xl font-bold text-skylink-navy mb-2 font-serif">24/7 Support</h3>
                        <p className="text-slate-500 mb-6 text-sm">For existing clients and operational inquiries.</p>
                        <a href="mailto:support@skylink-ltd.com" className="text-skylink-navy font-bold border-b border-skylink-blue hover:text-skylink-gold transition-colors pb-1">support@skylink-ltd.com</a>
                    </div>
                </div>
            </section>

            {/* 3. ENTERPRISE INQUIRY FORM */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Form Context */}
                    <div>
                        <h2 className="text-4xl font-bold text-skylink-navy mb-6 font-serif">START THE CONVERSATION</h2>
                        <div className="w-20 h-1 bg-skylink-navy mb-8"></div>
                        <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                            Tell us about your operational challenges. Our team of solutions architects will analyze your needs and propose a tailored strategy within 24 hours.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="p-4 bg-white shadow-md rounded-full mr-6 text-skylink-navy">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-skylink-navy text-lg">Global Headquarters</h4>
                                    <p className="text-slate-500">7th Floor, Badar Heights, House# 262-263<br />Road# 1, Block# B, Bashundhara R/A<br />Dhaka-1229, Bangladesh</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="p-4 bg-white shadow-md rounded-full mr-6 text-skylink-navy">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-skylink-navy text-lg">Operating Hours</h4>
                                    <p className="text-slate-500">Corporate: Mon-Fri, 9am - 6pm EST<br />Operations: 24/7/365</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-10 shadow-2xl border-t-8 border-skylink-navy">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name *</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border-b border-slate-300 py-2 focus:border-skylink-navy focus:outline-none transition-colors" placeholder="Jane Doe" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address *</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border-b border-slate-300 py-2 focus:border-skylink-navy focus:outline-none transition-colors" placeholder="jane@company.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Company Name</label>
                                    <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full border-b border-slate-300 py-2 focus:border-skylink-navy focus:outline-none transition-colors" placeholder="Acme Corp" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Job Title</label>
                                    <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full border-b border-slate-300 py-2 focus:border-skylink-navy focus:outline-none transition-colors" placeholder="Director of Ops" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Department of Interest</label>
                                <select name="department" value={formData.department} onChange={handleChange} className="w-full border-b border-slate-300 py-2 focus:border-skylink-navy focus:outline-none bg-white transition-colors">
                                    <option value="General">General Inquiry</option>
                                    <option value="Property Preservation">Property Preservation</option>
                                    <option value="ITES/BPO">ITES & BPO Solutions</option>
                                    <option value="Vendor Network">Vendor Network</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">How can we help? *</label>
                                <textarea name="message" required rows={4} value={formData.message} onChange={handleChange} className="w-full border-b border-slate-300 py-2 focus:border-skylink-navy focus:outline-none transition-colors" placeholder="Describe your project needs..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-skylink-navy text-white font-bold py-4 hover:bg-slate-800 transition-colors uppercase tracking-widest flex items-center justify-center group">
                                Send Inquiry <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* 4. FAQ / BEFORE YOU ASK */}
            <section className="py-24 bg-white border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-skylink-gold font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Before You Ask</span>
                        <h2 className="text-4xl font-bold text-skylink-navy font-serif">COMMON QUESTIONS</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="border border-slate-200 p-8 hover:border-skylink-gold transition-colors group cursor-default">
                            <h3 className="text-xl font-bold text-skylink-navy mb-3 group-hover:text-skylink-gold transition-colors">What are your standard turnaround times?</h3>
                            <p className="text-slate-600 leading-relaxed">For property preservation orders, our standard SLA is 48-72 hours depending on the scope. For BPO tasks, we offer real-time processing with T+1 quality capabilities.</p>
                        </div>
                        <div className="border border-slate-200 p-8 hover:border-skylink-gold transition-colors group cursor-default">
                            <h3 className="text-xl font-bold text-skylink-navy mb-3 group-hover:text-skylink-gold transition-colors">Do you require long-term contracts?</h3>
                            <p className="text-slate-600 leading-relaxed">We offer flexible engagement models. While enterprise solutions typically involve annual service agreements, we also support project-based workflows for specific campaigns.</p>
                        </div>
                        <div className="border border-slate-200 p-8 hover:border-skylink-gold transition-colors group cursor-default">
                            <h3 className="text-xl font-bold text-skylink-navy mb-3 group-hover:text-skylink-gold transition-colors">How do I become a vendor?</h3>
                            <p className="text-slate-600 leading-relaxed">Contractors can apply through our Vendor Portal. You will need to provide proof of insurance (GL/E&O), W9, and background check verification.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
