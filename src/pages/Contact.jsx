import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Clock, 
    Send, 
    CheckCircle2, 
    Sparkles, 
    ArrowRight, 
    ShieldCheck, 
    Headphones, 
    MessageSquare, 
    ChevronDown,
    Building2,
    Globe
} from 'lucide-react';
import SEO from '../components/SEO';
import CyberBackground from '../components/UI/CyberBackground';

const serviceOptions = [
    'Nationwide US Property Preservation & REO',
    'Custom Software & App Development',
    'Cloud Infrastructure & Migration',
    'Managed IT Services & 24/7 Support',
    'Cybersecurity & Compliance Audits',
    'Data Analytics & Business Intelligence',
    'IT Consulting & Digital Roadmaps',
    'Other / Enterprise Custom Suite'
];

const faqs = [
    {
        question: 'What is the typical timeline for project kickoff?',
        answer: 'Our solution architects can initiate discovery within 24 hours of receiving your consultation request. Initial technical scoping and architecture proposals are typically delivered within 3-5 business days.'
    },
    {
        question: 'Do you support multi-cloud environments (AWS, Azure, GCP)?',
        answer: 'Yes. Our certified cloud engineers hold senior credentials across Amazon Web Services, Microsoft Azure, and Google Cloud Platform, enabling seamless hybrid and multi-cloud architectures.'
    },
    {
        question: 'How do you guarantee data security and compliance?',
        answer: 'We adhere to SOC 2 Type II, ISO 27001, and GDPR compliance standards. All client communications, data pipelines, and code repositories are secured using end-to-end encryption with strict role-based access control.'
    },
    {
        question: 'Can you augment our existing in-house IT team?',
        answer: 'Absolutely. We offer flexible engagement models, ranging from fully managed end-to-end service pods to dedicated staff augmentation and specialized engineering squads.'
    }
];

const officeLocations = [
    {
        city: 'Global Headquarters',
        address: 'Suite 400, Innovation Tower, Financial District',
        status: 'Active 24/7',
        phone: '+1 (800) 555-SKYLINK',
        email: 'hq@skylinkinnovations.com'
    },
    {
        city: 'Technology & Cloud NOC',
        address: 'Cyberport Technology Park, Building B',
        status: '24/7 NOC Active',
        phone: '+1 (888) 234-SKYLINK',
        email: 'noc@skylinkinnovations.com'
    }
];

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        service: serviceOptions[0],
        budget: 'Enterprise ($25k - $100k)',
        message: ''
    });

    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success
    const [openFaq, setOpenFaq] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        
        const subject = encodeURIComponent(`Technical Consultation Request - ${formData.service} (${formData.name})`);
        const body = encodeURIComponent(
`Full Name: ${formData.name}
Business Email: ${formData.email}
Company / Organization: ${formData.company || 'N/A'}
Service of Interest: ${formData.service}

Project Details / Requirements:
${formData.message}`
        );

        const mailtoUrl = `mailto:info@skylink-innovations.com?cc=contact@skylink-ltd.com&subject=${subject}&body=${body}`;

        // Trigger mailto client
        window.location.href = mailtoUrl;

        setTimeout(() => {
            setFormStatus('success');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-20 px-6 font-sans relative overflow-hidden">
            <SEO
                title="Contact Us | Free IT Consultation & Solutions"
                description="Get in touch with Skylink Innovations Ltd. Let's discuss your next-generation custom software, cloud migration, or managed IT infrastructure needs."
            />

            {/* Cybernetic Mesh & Ambient Cyan Spotlight Background */}
            <CyberBackground glowPosition="both" meshOpacity="opacity-25" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Title Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="aura-badge mb-4">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>Get in Touch</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
                        Let’s Accelerate Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-[#5eead4]">
                            Digital Future
                        </span>
                    </h1>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                        Have a project in mind or looking for a strategic IT-enabled service partner? Connect with our solution architects for a free consultation.
                    </p>
                </div>

                {/* 2-Column Main Section: Form & Info */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-28">
                    {/* Left: Contact Info & Value Cards */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Direct Contacts Card */}
                        <div className="aura-glass-card p-6 sm:p-8 bg-zinc-950/70 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#00E5BE]" />
                                Direct Communication Channels
                            </h3>

                            <div className="space-y-4">
                                <a
                                    href="mailto:info@skylink-innovations.com"
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00E5BE]/40 hover:bg-[#00E5BE]/5 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] shrink-0">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-mono uppercase text-slate-400 mb-0.5">Email Inquiries</div>
                                        <div className="text-sm font-semibold text-white group-hover:text-[#00E5BE] transition-colors">
                                            info@skylink-innovations.com
                                        </div>
                                        <div className="text-xs text-slate-400 mt-0.5">
                                            contact@skylink-ltd.com
                                        </div>
                                    </div>
                                </a>

                                <a
                                    href="tel:+12125550123"
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00E5BE]/40 hover:bg-[#00E5BE]/5 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] shrink-0">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-mono uppercase text-slate-400 mb-0.5">Phone Lines</div>
                                        <div className="text-sm font-semibold text-white group-hover:text-[#00E5BE] transition-colors">
                                            +1 (212) 555-0123
                                        </div>
                                        <div className="text-xs text-slate-400 mt-0.5">
                                            +1 (555) 123-4567
                                        </div>
                                    </div>
                                </a>

                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] shrink-0">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-mono uppercase text-slate-400 mb-0.5">Business Hours</div>
                                        <div className="text-sm font-semibold text-white">
                                            Mon - Fri: 9AM - 6PM EST
                                        </div>
                                        <div className="text-xs text-[#00E5BE] mt-0.5 font-mono">
                                            24/7 Monitoring & NOC Support Active
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Office Location Card */}
                        <div className="aura-glass-card p-8 bg-zinc-950/70 border border-white/10">
                            <h4 className="text-sm font-mono uppercase tracking-wider text-[#00E5BE] mb-4 flex items-center gap-2">
                                <Building2 size={16} />
                                <span>Corporate Office</span>
                            </h4>
                            <div className="flex items-start gap-3.5 text-slate-300 text-sm leading-relaxed mb-4">
                                <MapPin size={18} className="text-[#00E5BE] shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-white">Skylink Innovations Ltd.</p>
                                    <p>7th Floor, Badar Heights, House# 262-263</p>
                                    <p>Road# 1, Block# B, Bashundhara R/A</p>
                                    <p>Dhaka-1229, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Interactive Consultation Form */}
                    <div className="lg:col-span-7">
                        <div className="aura-glass-card p-6 sm:p-8 md:p-12 bg-zinc-950/80 border border-white/10 relative overflow-hidden shadow-2xl">
                            {formStatus === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-16 flex flex-col items-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-[#00E5BE]/20 border border-[#00E5BE]/40 flex items-center justify-center text-[#00E5BE] mb-6 shadow-aura">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                        Consultation Request Received
                                    </h3>
                                    <p className="text-slate-300 max-w-md mx-auto mb-8 text-sm sm:text-base leading-relaxed">
                                        Thank you, <span className="text-[#00E5BE] font-semibold">{formData.name}</span>. A senior technology architect from Skylink will review your requirements and reach out within 2 hours.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setFormStatus('idle');
                                            setFormData({
                                                name: '',
                                                email: '',
                                                company: '',
                                                service: serviceOptions[0],
                                                budget: 'Enterprise ($25k - $100k)',
                                                message: ''
                                            });
                                        }}
                                        className="btn-aura-secondary text-xs sm:text-sm !py-3 !px-6"
                                    >
                                        Send Another Inquiry
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            Request a Technical Consultation
                                        </h3>
                                        <p className="text-slate-400 text-xs sm:text-sm mb-6">
                                            Fill in your details below and we will prepare tailored architecture insights.
                                        </p>
                                    </div>

                                    {/* Name & Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g. Sarah Jenkins"
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00E5BE]/50 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                                                Business Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="sarah@company.com"
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00E5BE]/50 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Company & Primary Service */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                                                Company / Organization
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                placeholder="Company Name"
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00E5BE]/50 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                                                Service of Interest
                                            </label>
                                            <select
                                                value={formData.service}
                                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5BE]/50 transition-colors"
                                            >
                                                {serviceOptions.map((opt, i) => (
                                                    <option key={i} value={opt} className="bg-zinc-900 text-white">
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Project Scope / Message */}
                                    <div>
                                        <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                                            Project Details / Requirements *
                                        </label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us about your tech stack, objectives, or current operational bottlenecks..."
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00E5BE]/50 transition-colors"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={formStatus === 'submitting'}
                                        className="btn-aura-primary w-full text-center justify-center !py-4"
                                    >
                                        {formStatus === 'submitting' ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                                Sending Transmission...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <span>Send Consultation Request</span>
                                                <Send size={16} />
                                            </span>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto pt-10 border-t border-white/10">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            Frequently Asked Questions
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Everything you need to know about starting an engagement with Skylink.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className="aura-glass-card overflow-hidden bg-zinc-950/60 border border-white/10"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                                    >
                                        <span className="font-semibold text-sm sm:text-base text-white">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            size={18}
                                            className={`text-[#00E5BE] transition-transform duration-300 shrink-0 ${
                                                isOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4"
                                            >
                                                {faq.answer}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
