import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Briefcase, 
    Sparkles, 
    ArrowRight, 
    CheckCircle2, 
    MapPin, 
    Clock, 
    Send, 
    Heart, 
    TrendingUp, 
    ShieldCheck, 
    Coffee, 
    Laptop, 
    ChevronRight,
    Building2
} from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import CyberBackground from '../components/UI/CyberBackground';

const openPositions = [
    {
        id: 'client-coordinator',
        title: 'US Property Preservation Client Coordinator',
        department: 'Property Preservation & REO Operations',
        location: 'Dhaka Office (On-site)',
        type: 'Full-time • Night Shift (US Hours)',
        experience: '1-3 Years Experience',
        description: 'Liaise directly with US national mortgage servicers, banks, and asset managers during US business hours. Manage work orders, conveyances, estimate approvals, and ensure strict compliance with HUD, Fannie Mae, Freddie Mac, and VA guidelines.'
    },
    {
        id: 'vendor-coordinator',
        title: 'US Property Preservation Vendor Coordinator',
        department: 'Vendor & Field Dispatch',
        location: 'Dhaka Office (On-site)',
        type: 'Full-time • Night Shift (US Hours)',
        experience: '1-3 Years Experience',
        description: 'Recruit, onboard, assign, and manage field contractors and property inspectors across all 50 US states during active US field hours. Track on-time execution, negotiate pricing matrices, and ensure rapid turnarounds.'
    },
    {
        id: 'preservation-processor',
        title: 'US Property Preservation Processor',
        department: 'Order Processing & QA',
        location: 'Dhaka Office (On-site)',
        type: 'Full-time • Night Shift (US Hours)',
        experience: 'Fresh - 2 Years Experience',
        description: 'Review and process field inspection reports, photo evidence, PCRs, and contractor bids. Submit bids and completion packages into client portals (PPR, MCS, Safeguard, Xome, Aspen Grove, etc.) with zero error rates during US business hours.'
    },
    {
        id: 'bizdev-intern',
        title: 'Business Development Internship',
        department: 'Growth & Strategic Partnerships',
        location: 'Dhaka Office (On-site)',
        type: 'Full-time • Night Shift (US Hours)',
        experience: 'Freshers / Final Year Students',
        description: 'Conduct international B2B market research, identify prospective enterprise IT & US property management clients, support direct cold outreach and proposal generation, and assist leadership with strategic growth initiatives during US market hours.'
    }
];

const perks = [
    {
        icon: TrendingUp,
        title: 'Rapid Career Acceleration',
        description: 'Fast-track promotions based on performance, technical certifications, and impact.'
    },
    {
        icon: Laptop,
        title: 'Cutting-Edge Tech Stack',
        description: 'Work with modern frameworks, cloud architectures, and AI-assisted workflow tooling.'
    },
    {
        icon: Heart,
        title: 'Comprehensive Health & Wellness',
        description: 'Full medical coverage, paid annual leave, mental health support, and flexible working hours.'
    },
    {
        icon: Coffee,
        title: 'Vibrant Engineering Culture',
        description: 'Collaborative team pods, hackathons, continuous learning stipends, and premium workspace snacks.'
    }
];

const Careers = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationStatus, setApplicationStatus] = useState('idle'); // idle, submitting, success
    const [candidateName, setCandidateName] = useState('');
    const [candidateEmail, setCandidateEmail] = useState('');
    const [candidateNote, setCandidateNote] = useState('');

    const handleApply = (e) => {
        e.preventDefault();
        setApplicationStatus('submitting');

        const subject = encodeURIComponent(`Job Application: ${selectedJob.title} - ${candidateName}`);
        const body = encodeURIComponent(
`Role Applied For: ${selectedJob.title}
Department: ${selectedJob.department}
Candidate Name: ${candidateName}
Email: ${candidateEmail}

Candidate Portfolio / Note:
${candidateNote}`
        );

        const mailtoUrl = `mailto:info@skylink-innovations.com?cc=contact@skylink-ltd.com&subject=${subject}&body=${body}`;

        // Open mailto client
        window.location.href = mailtoUrl;

        setTimeout(() => {
            setApplicationStatus('success');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-20 px-6 font-sans relative overflow-hidden">
            <SEO
                title="Careers & Culture | Skylink Innovations Ltd."
                description="Join the elite team at Skylink Innovations Ltd. Explore career opportunities in software engineering, cloud architecture, and global IT operations."
            />

            {/* Cybernetic Fluid Waves & Ambient Cyan Spotlight Background */}
            <CyberBackground variant="waves" glowPosition="both" meshOpacity="opacity-25" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="aura-badge mb-4">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>Join Our Global Team</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                        Build What Matters{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-[#5eead4]">
                            At Global Scale
                        </span>
                    </h1>
                    <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
                        Join a culture of engineering excellence, rapid innovation, and operational impact. We're looking for passionate problem solvers to shape the future of IT enablement.
                    </p>
                </div>

                {/* Culture & Perks Grid */}
                <div className="mb-28">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="aura-badge mb-3">
                            <Heart size={14} className="text-[#00E5BE]" />
                            <span>Why Join Skylink</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
                            Invested in Your Growth
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {perks.map((perk, i) => {
                            const Icon = perk.icon;
                            return (
                                <div
                                    key={i}
                                    className="aura-glass-card p-8 bg-zinc-950/70 border border-white/10 hover:border-[#00E5BE]/30 transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] mb-6 shadow-aura-sm">
                                            <Icon size={22} />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">
                                            {perk.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                            {perk.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Open Positions List */}
                <div className="mb-28">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="aura-badge mb-3">
                            <Briefcase size={14} className="text-[#00E5BE]" />
                            <span>Current Openings</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
                            Explore Active Roles
                        </h2>
                    </div>

                    <div className="space-y-4 max-w-4xl mx-auto">
                        {openPositions.map((job) => (
                            <div
                                key={job.id}
                                className="aura-glass-card p-6 md:p-8 bg-zinc-950/70 border border-white/10 hover:border-[#00E5BE]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-mono uppercase tracking-wider text-[#00E5BE] font-semibold">
                                            {job.department}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                                        <span className="text-xs text-slate-400 font-mono">
                                            {job.type}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-[#00E5BE] transition-colors mb-2">
                                        {job.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed mb-4">
                                        {job.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={13} className="text-[#00E5BE]" />
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={13} className="text-[#00E5BE]" />
                                            {job.experience}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedJob(job);
                                        setApplicationStatus('idle');
                                    }}
                                    className="btn-aura-primary text-xs !py-3 !px-6 shrink-0 text-center justify-center"
                                >
                                    <span>Apply Now</span>
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Application Modal */}
                <AnimatePresence>
                    {selectedJob && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="aura-glass-card p-6 sm:p-8 md:p-10 max-w-lg w-full bg-zinc-950 border border-white/15 relative shadow-2xl max-h-[90vh] overflow-y-auto"
                            >
                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="absolute top-6 right-6 text-slate-400 hover:text-white text-xl font-mono"
                                >
                                    ✕
                                </button>

                                {applicationStatus === 'success' ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 rounded-full bg-[#00E5BE]/20 border border-[#00E5BE]/40 flex items-center justify-center text-[#00E5BE] mx-auto mb-6 shadow-aura">
                                            <CheckCircle2 size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            Application Submitted!
                                        </h3>
                                        <p className="text-sm text-slate-300 mb-6">
                                            Thank you, <strong className="text-[#00E5BE]">{candidateName}</strong>. Our talent acquisition team will review your profile for the <strong>{selectedJob.title}</strong> role and reach out shortly.
                                        </p>
                                        <button
                                            onClick={() => setSelectedJob(null)}
                                            className="btn-aura-secondary text-xs !py-2.5 !px-6"
                                        >
                                            Close
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleApply} className="space-y-4">
                                        <div className="mb-6">
                                            <div className="text-xs font-mono uppercase text-[#00E5BE] mb-1">
                                                Applying for
                                            </div>
                                            <h3 className="text-lg font-bold text-white">
                                                {selectedJob.title}
                                            </h3>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={candidateName}
                                                onChange={(e) => setCandidateName(e.target.value)}
                                                placeholder="e.g. Alex Rivera"
                                                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00E5BE]/50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={candidateEmail}
                                                onChange={(e) => setCandidateEmail(e.target.value)}
                                                placeholder="alex@domain.com"
                                                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00E5BE]/50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                                                Portfolio / LinkedIn URL or Short Bio *
                                            </label>
                                            <textarea
                                                rows={3}
                                                required
                                                value={candidateNote}
                                                onChange={(e) => setCandidateNote(e.target.value)}
                                                placeholder="Include your LinkedIn, GitHub, or a brief note on your experience..."
                                                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00E5BE]/50"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={applicationStatus === 'submitting'}
                                            className="btn-aura-primary w-full text-center justify-center !py-3.5 mt-2"
                                        >
                                            {applicationStatus === 'submitting' ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                                    Transmitting Profile...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <span>Submit Application</span>
                                                    <Send size={15} />
                                                </span>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Careers;
