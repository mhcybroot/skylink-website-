import { motion } from 'framer-motion';
import { 
    Shield, 
    Target, 
    Compass, 
    Users, 
    Award, 
    ArrowRight, 
    Sparkles, 
    CheckCircle2, 
    Building2,
    MapPin,
    Briefcase
} from 'lucide-react';
import SEO from '../components/SEO';
import CyberBackground from '../components/UI/CyberBackground';
import { Link } from 'react-router-dom';
import AutoplayVideoBanner from '../components/UI/AutoplayVideoBanner';

import chairmanImg from '../assets/chairman.webp';
import ceoImg from '../assets/ceo.webp';
import mdImg from '../assets/managing-director.webp';
import boardroomImg from '../assets/boardroom-governance.jpg';
import officeBg from '../assets/Photos/DSC05814.jpg';

const leadership = [
    {
        name: 'Executive Chairman',
        role: 'Chairman of the Board',
        image: chairmanImg,
        bio: 'Guiding long-term strategic investments, global institutional compliance, and corporate governance for Skylink Innovations Ltd.'
    },
    {
        name: 'Managing Director',
        role: 'Managing Director',
        image: mdImg,
        bio: 'Overseeing global operations, delivery centers, field logistics, and institutional enterprise client partnerships.'
    },
    {
        name: 'Chief Executive Officer',
        role: 'Chief Executive Officer',
        image: ceoImg,
        bio: 'Driving next-generation technological innovation, cloud engineering initiatives, and global business growth.'
    }
];

const coreValues = [
    {
        title: 'Uncompromising Integrity',
        description: 'We believe transparency and trust form the bedrock of enduring partnerships. Every SLA, audit, and deliverable is held to the highest standard.'
    },
    {
        title: 'Relentless Innovation',
        description: 'We continually refine our software development practices, automation workflows, and cloud architectures to stay ahead of industry demands.'
    },
    {
        title: 'Operational Precision',
        description: 'From 24/7 managed NOC operations to nationwide US field property inspections, we execute with exactness, discipline, and verifiable quality.'
    },
    {
        title: 'Long-Term Value Creation',
        description: 'We measure our success by the sustainable velocity and competitive advantage we generate for our clients and community.'
    }
];

const About = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-20 px-6 font-sans relative overflow-hidden">
            <SEO
                title="About Us | Skylink Innovations Ltd."
                description="Learn about Skylink Innovations Ltd, our strategic mission, visionary leadership team, and our commitment to next-generation IT solutions and US property preservation."
            />

            {/* Cybernetic Mesh & Ambient Cyan Spotlight Background */}
            <CyberBackground glowPosition="both" meshOpacity="opacity-25" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="aura-badge mb-4">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>Corporate Profile</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                        Architecting the Future of{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5BE] via-[#2DD4BF] to-[#5eead4]">
                            IT & Asset Operations
                        </span>
                    </h1>
                    <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
                        At Skylink Innovations Ltd, we bridge technological complexity with real-world execution, powering global digital workflows and nationwide US property preservation.
                    </p>
                </div>

                {/* Mission & Vision Bento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-28">
                    <div className="aura-glass-card p-8 md:p-12 bg-zinc-950/70 border border-white/10 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] mb-6 shadow-aura-sm">
                                <Target size={24} />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Mission</h3>
                            <p className="text-slate-300 text-base leading-relaxed">
                                To equip businesses with innovative, reliable, and scalable technology solutions that unlock their full potential and bridge the gap between their current operations and future goals.
                            </p>
                        </div>
                        <div className="pt-6 mt-8 border-t border-white/5 text-xs font-mono text-[#00E5BE]">
                            Execution • Reliability • Scalability
                        </div>
                    </div>

                    <div className="aura-glass-card p-8 md:p-12 bg-zinc-950/70 border border-white/10 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] mb-6 shadow-aura-sm">
                                <Compass size={24} />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Vision</h3>
                            <p className="text-slate-300 text-base leading-relaxed">
                                To be the globally recognized leader in IT enablement and institutional physical asset preservation, driving sustainable transformation for enterprises worldwide.
                            </p>
                        </div>
                        <div className="pt-6 mt-8 border-t border-white/5 text-xs font-mono text-[#00E5BE]">
                            Innovation • Global Leadership • Integrity
                        </div>
                    </div>
                </div>

                {/* Strategic Governance & Global Advisory Feature Banner (Autoplay) */}
                <AutoplayVideoBanner
                    videoId="fWEPPlzMV-U"
                    posterImg={boardroomImg}
                    tag="STRATEGIC ADVISORY & GLOBAL GOVERNANCE"
                    tagIcon={Briefcase}
                    title="Executive Board & Global Strategic Governance"
                    subtitle="Institutional Transformation & Multi-Continental Delivery"
                    heightClass="h-72 sm:h-96 md:h-[440px]"
                />

                {/* Executive Leadership Team */}
                <div className="mb-28">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="aura-badge mb-3">
                            <Users size={14} className="text-[#00E5BE]" />
                            <span>Executive Board</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
                            Leadership Driving Excellence
                        </h2>
                        <p className="text-slate-400 text-base sm:text-lg">
                            Guiding our global squads and field specialists with decades of institutional expertise.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {leadership.map((leader, i) => (
                            <div
                                key={i}
                                className="aura-glass-card overflow-hidden bg-zinc-950/70 border border-white/10 hover:border-[#00E5BE]/40 transition-all flex flex-col group"
                            >
                                <div className="aspect-[4/5] w-full overflow-hidden relative bg-zinc-950 flex items-center justify-center">
                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 brightness-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00E5BE] transition-colors">
                                            {leader.name}
                                        </h3>
                                        <div className="text-xs font-mono uppercase text-[#00E5BE] mb-3">
                                            {leader.role}
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                            {leader.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Core Principles */}
                <div className="mb-28">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="aura-badge mb-3">
                            <Shield size={14} className="text-[#00E5BE]" />
                            <span>Guiding Principles</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
                            The Values That Define Us
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {coreValues.map((val, i) => (
                            <div
                                key={i}
                                className="aura-glass-card p-8 bg-zinc-950/70 border border-white/10 hover:border-[#00E5BE]/30 transition-all"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] font-mono text-xs font-bold">
                                        0{i + 1}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-white">
                                        {val.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed pl-11">
                                    {val.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Call to Action */}
                <div className="aura-glass-card p-10 md:p-16 text-center relative overflow-hidden bg-zinc-950 border border-white/10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00E5BE]/10 rounded-full blur-[140px] pointer-events-none -z-0" />
                    
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="aura-badge mb-4 mx-auto">
                            <Sparkles size={14} className="text-[#00E5BE]" />
                            <span>Connect With Leadership</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
                            Let’s discuss your strategic goals.
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                            Whether you're exploring custom software engineering, ITES outsourcing, or nationwide US property preservation, our team is ready to partner with you.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="btn-aura-primary w-full sm:w-auto">
                                <span>Get a Free Consultation</span>
                                <ArrowRight size={16} />
                            </Link>
                            <Link to="/careers" className="btn-aura-secondary w-full sm:w-auto">
                                <span>Join Our Team</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
