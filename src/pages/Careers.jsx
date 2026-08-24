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

const openPositions = [
    {
        id: 'dev-sr-fullstack',
        title: 'Senior Full-Stack Engineer (React / Node / Cloud)',
        department: 'Software Engineering',
        location: 'Dhaka Hub / Hybrid',
        type: 'Full-time',
        experience: '4+ Years',
        description: 'Lead the architecture and implementation of scalable web platforms, APIs, and microservices for international enterprise clients.'
    },
    {
        id: 'cloud-devops-lead',
        title: 'Cloud DevOps & SRE Specialist',
        department: 'Cloud Infrastructure',
        location: 'Remote / Hybrid',
        type: 'Full-time',
        experience: '3+ Years',
        description: 'Manage multi-cloud infrastructure across AWS and Azure, automate CI/CD pipelines, and maintain 99.99% system availability.'
    },
    {
        id: 'qa-preservation-lead',
        title: 'US Property Preservation QA Analyst',
        department: 'Asset Operations',
        location: 'Dhaka Hub / Remote',
        type: 'Full-time',
        experience: '2+ Years',
        description: 'Audit geotagged field photos, verify HUD/GSE guideline compliance, and coordinate directly with nationwide US dispatch squads.'
    },
    {
        id: 'cx-team-lead',
        title: 'Enterprise Technical Support Lead',
        department: 'ITES / BPO',
        location: 'Dhaka Hub / Night Shift',
        type: 'Full-time',
        experience: '3+ Years',
        description: 'Supervise Tier-2/3 technical helpdesk teams delivering 24/7 omni-channel customer support for US SaaS clients.'
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
        setTimeout(() => {
            setApplicationStatus('success');
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-20 px-6 font-sans relative overflow-hidden">
            <SEO
                title="Careers & Culture | Skylink Innovations Ltd."
                description="Join the elite team at Skylink Innovations Ltd. Explore career opportunities in software engineering, cloud architecture, and global IT operations."
            />

            {/* Ambient Spotlight Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#00E5BE]/20 via-[#00E5BE]/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-0" />
            <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#00F5C4]/10 rounded-full blur-[130px] pointer-events-none -z-0" />

            {/* Subtle Grid Backdrop */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-0" />

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
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="aura-glass-card p-8 md:p-10 max-w-lg w-full bg-zinc-950 border border-white/15 relative shadow-2xl"
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
