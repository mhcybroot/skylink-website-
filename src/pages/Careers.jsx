import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Rocket, Heart, Globe, Briefcase, ChevronRight, ArrowRight, Users, Monitor, Layout, Sparkles, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import heroBg from '../assets/Photos/DSC05856.jpg';
import cultureBg from '../assets/Photos/DSC05814.jpg';
import LottieAnimation from '../components/Common/LottieAnimation';
import placeholderAnimation from '../assets/animations/placeholder.json';
import DayInLife from '../components/Careers/DayInLife';
import BenefitsDeck from '../components/Careers/BenefitsDeck';

const getDeptBorderColorClass = (color) => {
    if (color === 'skylink-navy') return 'border-t-skylink-navy';
    if (color === 'tech-cyan') return 'border-t-tech-cyan';
    if (color === 'skylink-gold') return 'border-t-skylink-gold';
    return 'border-t-white';
};

const getDeptBgColorClass = (color) => {
    if (color === 'skylink-navy') return 'bg-skylink-navy';
    if (color === 'tech-cyan') return 'bg-tech-cyan';
    if (color === 'skylink-gold') return 'bg-skylink-gold';
    return 'bg-white';
};

const getDeptTextColorClass = (color) => {
    if (color === 'skylink-navy') return 'text-skylink-navy';
    if (color === 'tech-cyan') return 'text-tech-cyan';
    if (color === 'skylink-gold') return 'text-skylink-gold';
    return 'text-white';
};

const CultureCard = ({ item }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div 
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            className="w-full h-48 perspective-1000 cursor-pointer"
        >
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full h-full relative"
            >
                {/* Front Side */}
                <div 
                    style={{ backfaceVisibility: "hidden" }}
                    className="absolute inset-0 p-6 glass rounded-xl flex flex-col justify-center items-center text-center border border-white/10 z-10"
                >
                    <item.icon size={36} className="text-skylink-blue mb-4" />
                    <h3 className="text-lg font-bold text-white mb-1 font-serif">{item.title}</h3>
                    <span className="text-[10px] text-skylink-gold font-bold tracking-widest uppercase">Hover to reveal</span>
                </div>
                
                {/* Back Side */}
                <div 
                    style={{ 
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                    }}
                    className="absolute inset-0 p-6 glass-dark rounded-xl flex flex-col justify-center items-center text-center border border-skylink-blue/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                >
                    <p className="text-sm text-slate-200 leading-relaxed">
                        {item.desc}
                    </p>
                    <div className="mt-4 w-10 h-0.5 bg-skylink-blue" />
                </div>
            </motion.div>
        </div>
    );
};

const ResumeParserConsole = ({ skillFilters, setSkillFilters }) => {
    const [resumeText, setResumeText] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanCoords, setScanCoords] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!isScanning) return;
        
        const coordInterval = setInterval(() => {
            setScanCoords({
                x: (Math.random() * 500).toFixed(2),
                y: (Math.random() * 200).toFixed(2),
            });
        }, 100);

        const progressInterval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    clearInterval(coordInterval);
                    finishScanning();
                    return 100;
                }
                return prev + 5;
            });
        }, 120);

        return () => {
            clearInterval(coordInterval);
            clearInterval(progressInterval);
        };
    }, [isScanning]);

    const handleScan = () => {
        if (!resumeText.trim()) return;
        setIsScanning(true);
        setScanProgress(0);
        
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gn = ctx.createGain();
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            gn.gain.setValueAtTime(0.02, ctx.currentTime);
            gn.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            osc.connect(gn);
            gn.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } catch(e) {}
    };

    const finishScanning = () => {
        setIsScanning(false);
        const text = resumeText.toLowerCase();
        
        let newFilters = { Technical: 40, Operations: 40, Compliance: 40, Design: 40, Strategy: 40 };
        let detected = [];

        if (text.includes("developer") || text.includes("react") || text.includes("api") || text.includes("code") || text.includes("software") || text.includes("database") || text.includes("sql") || text.includes("technical")) {
            newFilters.Technical = 90;
            newFilters.Strategy = 75;
            detected.push("Technical / Software Engineering");
        }
        if (text.includes("support") || text.includes("customer") || text.includes("call") || text.includes("bpo") || text.includes("client") || text.includes("voice") || text.includes("operations")) {
            newFilters.Operations = 95;
            newFilters.Compliance = 80;
            detected.push("Customer Experience / Operations");
        }
        if (text.includes("preservation") || text.includes("rehab") || text.includes("maintenance") || text.includes("property") || text.includes("construction") || text.includes("contractor") || text.includes("compliance")) {
            newFilters.Compliance = 95;
            newFilters.Operations = 85;
            detected.push("Property Stewardship / Compliance");
        }
        if (text.includes("design") || text.includes("creative") || text.includes("media") || text.includes("portfolio") || text.includes("graphics")) {
            newFilters.Design = 95;
            newFilters.Strategy = 70;
            detected.push("Product Design / Brand Assets");
        }
        if (text.includes("strategy") || text.includes("director") || text.includes("manager") || text.includes("lead") || text.includes("business") || text.includes("founder")) {
            newFilters.Strategy = 95;
            newFilters.Operations = 80;
            detected.push("Strategic Planning / Management");
        }

        if (detected.length === 0) {
            newFilters = { Technical: 60, Operations: 60, Compliance: 60, Design: 60, Strategy: 60 };
            detected.push("General Operations Telemetry");
        }

        setSkillFilters(newFilters);

        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gn = ctx.createGain();
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.1);
            gn.gain.setValueAtTime(0.02, ctx.currentTime);
            gn.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
            osc.connect(gn);
            gn.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } catch(e) {}
    };

    return (
        <div className="w-full bg-slate-950/70 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden mb-12 text-left">
            {isScanning && (
                <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none z-30">
                    <div 
                        className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                        style={{
                            top: `${scanProgress}%`,
                            transition: 'top 0.1s linear'
                        }}
                    />
                    <div className="absolute top-4 right-4 bg-slate-950 border border-emerald-500/40 rounded px-2.5 py-1 font-mono text-[9px] text-emerald-400">
                        SCANNING GRID: X_{scanCoords.x} Y_{scanCoords.y} // COMPATIBILITY_RATING: {(scanProgress * 0.9).toFixed(0)}%
                    </div>
                </div>
            )}

            <div className="absolute top-4 right-4 text-[8px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
                Resume diagnostic parser // UNIT_SCANNER_A1
            </div>

            <div className="mb-6 pointer-events-none">
                <span className="text-skylink-gold font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Resume Scan Matrix</span>
                <h3 className="text-2xl font-bold font-serif text-white">Automated Resume Diagnostic Console</h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed max-w-xl">
                    Copy and paste your professional profile or resume skills. Our neural analyzer parses keyword clusters to auto-configure the matching compatibility index filters.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-stretch">
                <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your professional summary, skills, or employment history here..."
                    disabled={isScanning}
                    className="flex-1 min-h-[140px] bg-slate-900 border border-white/10 focus:border-tech-cyan/40 focus:outline-none rounded-xl p-4 text-xs font-mono text-slate-300 placeholder:text-slate-500 leading-relaxed transition-all"
                />

                <div className="md:w-64 bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                        <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-2">Parser status</div>
                        <div className="bg-slate-950 p-2.5 rounded border border-white/5 font-mono text-[10px] text-slate-300 mb-4 leading-relaxed">
                            {isScanning ? (
                                <span className="text-emerald-400 animate-pulse">Scanning skillset grids...</span>
                            ) : resumeText.trim() ? (
                                <span className="text-cyan-400">Text buffer loaded. Ready to run check.</span>
                            ) : (
                                <span className="text-slate-500">Awaiting input buffer load...</span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleScan}
                        disabled={isScanning || !resumeText.trim()}
                        className={`w-full py-3 rounded-lg font-mono text-xs font-bold uppercase transition-all ${
                            isScanning 
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : !resumeText.trim()
                                ? 'bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed'
                                : 'bg-tech-cyan hover:bg-cyan-400 text-slate-950 shadow-lg shadow-tech-cyan/25'
                        }`}
                    >
                        {isScanning ? `Parsing (${scanProgress}%)` : "Analyse Skillset"}
                    </button>
                </div>
            </div>
        </div>
    );
};

// FEATURE 12: CAREER APPLICATION PROGRESS TRACKER WIZARD
const CareerApplicationWizard = ({ selectedRole, onCancel }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', email: '', portfolio: '', coverLetter: '' });
    
    const steps = [
        { id: 1, title: 'Identity' },
        { id: 2, title: 'Credentials' },
        { id: 3, title: 'Review' }
    ];

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    const submit = () => setStep(4);

    const renderStepContent = () => {
        switch(step) {
            case 1:
                return (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-2 block">Full Name</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900 border border-white/10 focus:border-tech-cyan focus:ring-1 focus:ring-tech-cyan rounded-xl p-4 text-sm text-white transition-all shadow-inner" placeholder="Jane Doe" />
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-2 block">Email Address</label>
                                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-900 border border-white/10 focus:border-tech-cyan focus:ring-1 focus:ring-tech-cyan rounded-xl p-4 text-sm text-white transition-all shadow-inner" placeholder="jane@example.com" />
                            </div>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-2 block">Portfolio / LinkedIn URL</label>
                                <input type="url" value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} className="w-full bg-slate-900 border border-white/10 focus:border-tech-cyan focus:ring-1 focus:ring-tech-cyan rounded-xl p-4 text-sm text-white transition-all shadow-inner" placeholder="https://linkedin.com/in/janedoe" />
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-2 block">Brief Cover Letter</label>
                                <textarea value={formData.coverLetter} onChange={e => setFormData({...formData, coverLetter: e.target.value})} className="w-full bg-slate-900 border border-white/10 focus:border-tech-cyan focus:ring-1 focus:ring-tech-cyan rounded-xl p-4 text-sm text-white transition-all shadow-inner h-32" placeholder="Why Skylink?" />
                            </div>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 font-mono text-sm text-slate-300">
                            <div className="flex justify-between border-b border-white/5 pb-3">
                                <span className="text-slate-500">Name:</span> <span className="text-white font-bold">{formData.name || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-3">
                                <span className="text-slate-500">Email:</span> <span className="text-white font-bold">{formData.email || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-3">
                                <span className="text-slate-500">Link:</span> <span className="text-tech-cyan truncate max-w-[200px]">{formData.portfolio || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block mb-2">Cover Letter:</span> 
                                <span className="text-white text-xs leading-relaxed block bg-slate-900 p-3 rounded-xl border border-white/5">{formData.coverLetter || 'N/A'}</span>
                            </div>
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                        <div className="w-20 h-20 bg-skylink-gold/10 text-skylink-gold rounded-full flex items-center justify-center mx-auto mb-6 border border-skylink-gold/30 shadow-[0_0_30px_rgba(194,155,64,0.2)]">
                            <CheckCircle size={40} />
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-3 font-serif">Application Transmitted</h4>
                        <p className="text-sm text-slate-400 mb-8 max-w-sm mx-auto">Your telemetry data has been securely uploaded to our HR nexus. We will respond within 48 hours.</p>
                        <button onClick={onCancel} className="px-8 py-3 border border-white/20 rounded-xl text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/40 transition-colors">Close Console</button>
                    </motion.div>
                );
        }
    };

    return (
        <div className="flex flex-col h-full mt-4">
            {step < 4 && (
                <div className="mb-10">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <span className="text-tech-cyan text-[10px] font-bold tracking-widest uppercase block mb-1">Applying for:</span>
                            <h4 className="text-white font-serif text-xl">{selectedRole?.title}</h4>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                            <span className="text-tech-cyan">Step {step}</span> / 3
                        </div>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-white/5">
                        <motion.div 
                            className="bg-tech-cyan h-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                    </div>
                    <div className="flex justify-between mt-3 text-[9px] font-mono font-bold uppercase">
                        {steps.map(s => (
                            <span key={s.id} className={s.id <= step ? 'text-white' : 'text-slate-600 transition-colors'}>{s.title}</span>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                    {renderStepContent()}
                </AnimatePresence>
            </div>

            {step < 4 && (
                <div className="pt-6 border-t border-white/10 mt-8 flex gap-4">
                    {step > 1 && (
                        <button onClick={prevStep} className="px-6 py-4 border border-white/10 hover:border-white/30 rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-all hover:bg-white/5">
                            Back
                        </button>
                    )}
                    <button 
                        onClick={step === 3 ? submit : nextStep} 
                        className="flex-1 py-4 bg-tech-cyan hover:bg-cyan-400 text-slate-950 font-bold uppercase tracking-widest text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex justify-center items-center gap-2"
                    >
                        {step === 3 ? 'Transmit Application' : 'Next Phase'}
                        {step < 3 && <ArrowRight size={16} />}
                    </button>
                </div>
            )}
        </div>
    );
};

const Careers = () => {
    const cultureRef = useRef(null);
    const openingsRef = useRef(null);
    const cultureInView = useInView(cultureRef, { once: true, margin: '-100px' });
    const openingsInView = useInView(openingsRef, { once: true, margin: '-100px' });

    const [selectedRole, setSelectedRole] = useState(null);
    const [isApplying, setIsApplying] = useState(false);
    const [skillFilters, setSkillFilters] = useState({
        Technical: 50,
        Operations: 50,
        Compliance: 50,
        Design: 50,
        Strategy: 50,
    });
    const [hoveredRole, setHoveredRole] = useState(null);
    const [sortBy, setSortBy] = useState('dept'); // 'dept' or 'compat'

    // Hero mouse tracking
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const handleHeroMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 45;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 45;
        setMousePos({ x, y });
    };

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
                { 
                    title: 'Vendor Manager', 
                    location: 'New York (Hybrid)', 
                    type: 'Full-time',
                    skills: { Technical: 30, Operations: 90, Compliance: 75, Design: 20, Strategy: 65 } 
                },
                { 
                    title: 'QC Specialist', 
                    location: 'Manila', 
                    type: 'Full-time',
                    skills: { Technical: 40, Operations: 85, Compliance: 90, Design: 20, Strategy: 50 } 
                },
            ]
        },
        {
            department: 'Technology',
            icon: Monitor,
            color: 'tech-cyan',
            roles: [
                { 
                    title: 'Full Stack Developer', 
                    location: 'Bangalore', 
                    type: 'Remote',
                    skills: { Technical: 95, Operations: 35, Compliance: 40, Design: 80, Strategy: 55 } 
                },
                { 
                    title: 'Data Analyst', 
                    location: 'Bangalore', 
                    type: 'Full-time',
                    skills: { Technical: 85, Operations: 65, Compliance: 60, Design: 30, Strategy: 70 } 
                },
            ]
        },
        {
            department: 'Corporate',
            icon: Layout,
            color: 'skylink-gold',
            roles: [
                { 
                    title: 'HR Business Partner', 
                    location: 'London', 
                    type: 'Hybrid',
                    skills: { Technical: 25, Operations: 75, Compliance: 85, Design: 40, Strategy: 75 } 
                },
                { 
                    title: 'Sales Executive', 
                    location: 'New York', 
                    type: 'On-site',
                    skills: { Technical: 40, Operations: 65, Compliance: 50, Design: 70, Strategy: 85 } 
                },
            ]
        },
    ];

    const skillKeys = ['Technical', 'Operations', 'Compliance', 'Design', 'Strategy'];

    const calculateMatch = (roleSkills) => {
        if (!roleSkills) return 100;
        let penalty = 0;
        let totalReq = 0;
        skillKeys.forEach(key => {
            const req = roleSkills[key] || 0;
            const user = skillFilters[key];
            if (user < req) {
                penalty += (req - user);
            }
            totalReq += req;
        });
        if (totalReq === 0) return 100;
        return Math.max(0, Math.round((1 - penalty / totalReq) * 100));
    };

    const getMatchColorClass = (score) => {
        if (score >= 85) return 'text-cyan-400';
        if (score >= 60) return 'text-amber-400';
        return 'text-slate-500';
    };

    const getMatchBgClass = (score) => {
        if (score >= 85) return 'bg-cyan-500/10 border-cyan-500/30';
        if (score >= 60) return 'bg-amber-500/10 border-amber-500/30';
        return 'bg-slate-800/40 border-white/5 opacity-50';
    };

    const flatRoles = openings.flatMap(dept => 
        dept.roles.map(role => ({
            ...role,
            department: dept.department,
            color: dept.color,
            icon: dept.icon
        }))
    );

    const cx = 150;
    const cy = 150;
    const rMax = 105;

    const getCoords = (index, value) => {
        const angle = (index * 2 * Math.PI) / 5 - Math.PI / 2;
        const radius = (value / 100) * rMax;
        return {
            x: cx + radius * Math.cos(angle),
            y: cy + radius * Math.sin(angle)
        };
    };

    const handleSvgNodeClick = (key) => {
        setSkillFilters(prev => {
            const nextVal = prev[key] >= 100 ? 20 : prev[key] + 20;
            return { ...prev, [key]: nextVal };
        });
        window.dispatchEvent(new CustomEvent('skylink_settings_changed'));
    };

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
        <div className="min-h-screen pt-20 font-sans relative z-10 bg-transparent">
            <SEO title="Careers" description="Build Your Legacy. Join a team that is redefining the standards of global asset management and digital operations." />

            {/* 3D Application Details Drawer */}
            <AnimatePresence>
                {selectedRole && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-skylink-navy/80 backdrop-blur-sm z-50 flex justify-end"
                        onClick={() => { setSelectedRole(null); setIsApplying(false); }}
                    >
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="w-full max-w-xl bg-skylink-navy/95 border-l border-white/10 h-full p-8 md:p-12 overflow-y-auto flex flex-col justify-between shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {isApplying ? (
                                <div className="h-full flex flex-col relative">
                                    <button 
                                        onClick={() => { setSelectedRole(null); setIsApplying(false); }}
                                        className="absolute -top-4 right-0 w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-300 hover:text-white transition-colors z-50"
                                    >
                                        ✕
                                    </button>
                                    <CareerApplicationWizard selectedRole={selectedRole} onCancel={() => { setSelectedRole(null); setIsApplying(false); }} />
                                </div>
                            ) : (
                                <div>
                                    <button 
                                        onClick={() => { setSelectedRole(null); setIsApplying(false); }}
                                        className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                                    >
                                        ✕
                                    </button>
                                    
                                    <span className="text-xs font-bold tracking-[0.2em] text-skylink-gold uppercase block mb-3">Position Opening</span>
                                    <h3 className="text-3xl font-bold text-white mb-2 font-serif">{selectedRole.title}</h3>
                                    <div className="flex gap-4 mb-8 text-sm text-slate-400 font-medium">
                                        <span>{selectedRole.location}</span>
                                        <span>•</span>
                                        <span className="text-tech-cyan">{selectedRole.type}</span>
                                    </div>
                                    
                                    <div className="space-y-6 text-slate-300">
                                        <div>
                                            <h4 className="text-white font-bold text-lg mb-2 font-serif">Role Overview</h4>
                                            <p className="text-sm leading-relaxed text-slate-300">
                                                We are seeking a talented {selectedRole.title} to join our growing global team. In this role, you will collaborate with cross-functional partners to drive operational success, optimize asset performance, and integrate modern tech solutions.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-white font-bold text-lg mb-2 font-serif">Key Responsibilities</h4>
                                            <ul className="list-disc list-inside space-y-2 text-sm pl-2">
                                                <li>Execute and oversee core department deliverables with precision.</li>
                                                <li>Coordinate with international hubs to ensure follow-the-sun workflow continuity.</li>
                                                <li>Leverage data insights to enhance SLA performance and CSAT ratings.</li>
                                                <li>Collaborate on platform tools and automated business processes.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="text-white font-bold text-lg mb-2 font-serif">Department Standards</h4>
                                            <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/5 font-mono text-xs">
                                                {skillKeys.map(key => (
                                                    <div key={key} className="flex justify-between border-b border-white/5 pb-1">
                                                        <span className="text-slate-400">{key}:</span>
                                                        <span className="text-skylink-gold font-bold">{selectedRole.skills?.[key] || 0}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/10 mt-8">
                                        <motion.button
                                            onClick={() => setIsApplying(true)}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-4 bg-skylink-blue hover:bg-tech-cyan text-white font-bold uppercase tracking-widest text-sm rounded-xl flex items-center justify-center gap-2 hover:shadow-glow transition-all duration-300 shadow-lg"
                                        >
                                            Start Application
                                            <ArrowRight size={18} />
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 1. HERO WITH CURSOR PARALLAX */}
            <section 
                onMouseMove={handleHeroMouseMove}
                className="relative h-[600px] flex items-center bg-skylink-navy overflow-hidden"
            >
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 1.5 }}
                    style={{ 
                        x: mousePos.x * 0.3, 
                        y: mousePos.y * 0.3 
                    }}
                    className="absolute inset-0 bg-cover bg-center grayscale-[30%]"
                    backgroundImage={`url(${heroBg})`}
                />
                
                {/* Tech Grid Background Parallax */}
                <motion.div 
                    style={{ 
                        x: mousePos.x * 0.6, 
                        y: mousePos.y * 0.6,
                        backgroundImage: `
                            linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                    className="absolute inset-0 pointer-events-none z-0 opacity-40"
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
                        whileTap={{ scale: 0.98 }}
                    >
                        <a href="#openings" className="inline-flex items-center px-8 py-4 bg-skylink-blue text-white font-bold uppercase tracking-widest rounded-lg hover:bg-tech-cyan hover:shadow-glow transition-all duration-300 group">
                            View Open Positions
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* 2. WHY SKYLINK? (CULTURE GRID WITH 3D FLIP CARDS) */}
            <section ref={cultureRef} className="py-28 bg-transparent relative z-10">
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
                            className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 glass-dark p-8 rounded-xl shadow-2xl border-t-4 border-skylink-blue"
                        >
                            <div className="text-4xl font-bold text-white mb-2">4.8/5</div>
                            <div className="text-sm font-bold text-slate-300 tracking-widest uppercase">Employee Satisfaction</div>
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
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">Why Skylink?</h2>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            We operate at the intersection of stability and speed. As a Skylink team member, you'll be challenged to solve complex logistical problems while being supported by world-class infrastructure.
                        </p>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={cultureInView ? "visible" : "hidden"}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {cultureItems.map((item, idx) => (
                                <CultureCard key={idx} item={item} />
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* NEW LAYER 2 COMPONENT: DAY IN THE LIFE */}
            <DayInLife />

            {/* NEW LAYER 2 COMPONENT: BENEFITS DECK */}
            <BenefitsDeck />

            {/* 3. OPEN POSITIONS WITH RADAR MATRIX FILTERING */}
            <section id="openings" ref={openingsRef} className="py-28 bg-transparent relative z-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* NEW LAYER 2 COMPONENT: LIVE APPLICANT TELEMETRY */}
                    <div className="flex justify-center mb-12">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={openingsInView ? { opacity: 1, y: 0 } : {}}
                            className="bg-slate-900 border border-white/10 rounded-full px-6 py-3 flex items-center gap-4 shadow-lg"
                        >
                            <div className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tech-cyan opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-tech-cyan"></span>
                            </div>
                            <span className="font-mono text-xs text-white uppercase tracking-widest">
                                Live Telemetry: <span className="text-skylink-gold font-bold">142</span> Active Applications
                            </span>
                        </motion.div>
                    </div>

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
                        <h2 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4">Find Your Fit</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                            Configure your custom skillset matrix on the telemetry radar chart or select a preset profile to filter positions dynamically based on compatibility ratings.
                        </p>
                    </motion.div>

                    {/* Resume Parser Console (Feature 14) */}
                    <ResumeParserConsole skillFilters={skillFilters} setSkillFilters={setSkillFilters} />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Radar Controller Column (5 cols) */}
                        <div className="lg:col-span-5 glass p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-tech-cyan/20 rounded-tr-2xl pointer-events-none" />
                            
                            <h3 className="text-md font-bold text-white mb-6 uppercase tracking-wider font-mono flex items-center gap-2">
                                <span className="w-2 h-2 bg-tech-cyan rounded-full animate-pulse" />
                                Interactive Radar Matrix
                            </h3>

                            {/* SVG Chart Container */}
                            <div className="flex justify-center mb-6 relative">
                                <svg viewBox="0 0 300 300" className="w-full max-w-[280px] h-[280px]">
                                    {/* Grids */}
                                    {[20, 40, 60, 80, 100].map((level) => {
                                        const pts = [0, 1, 2, 3, 4].map(i => {
                                            const { x, y } = getCoords(i, level);
                                            return `${x},${y}`;
                                        }).join(' ');
                                        return (
                                            <polygon
                                                key={level}
                                                points={pts}
                                                fill="none"
                                                stroke="rgba(6, 182, 212, 0.15)"
                                                strokeWidth="1"
                                            />
                                        );
                                    })}

                                    {/* Axes */}
                                    {[0, 1, 2, 3, 4].map((i) => {
                                        const outer = getCoords(i, 100);
                                        return (
                                            <line
                                                key={i}
                                                x1={cx}
                                                y1={cy}
                                                x2={outer.x}
                                                y2={outer.y}
                                                stroke="rgba(6, 182, 212, 0.2)"
                                                strokeWidth="1"
                                                strokeDasharray="2 2"
                                            />
                                        );
                                    })}

                                    {/* Hovered Role silhouette */}
                                    {hoveredRole && (
                                        <polygon
                                            points={[0, 1, 2, 3, 4].map(i => {
                                                const key = skillKeys[i];
                                                const val = hoveredRole.skills?.[key] || 0;
                                                const { x, y } = getCoords(i, val);
                                                return `${x},${y}`;
                                            }).join(' ')}
                                            fill="rgba(194, 155, 64, 0.1)"
                                            stroke="#c29b40"
                                            strokeWidth="2"
                                            strokeDasharray="4 2"
                                            className="transition-all duration-300"
                                        />
                                    )}

                                    {/* User Selected Area */}
                                    <polygon
                                        points={[0, 1, 2, 3, 4].map(i => {
                                            const key = skillKeys[i];
                                            const val = skillFilters[key];
                                            const { x, y } = getCoords(i, val);
                                            return `${x},${y}`;
                                        }).join(' ')}
                                        fill="rgba(6, 182, 212, 0.25)"
                                        stroke="#06b6d4"
                                        strokeWidth="2.5"
                                        className="transition-all duration-200"
                                        style={{ filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))" }}
                                    />

                                    {/* Interactive Dots */}
                                    {[0, 1, 2, 3, 4].map((i) => {
                                        const key = skillKeys[i];
                                        const val = skillFilters[key];
                                        const { x, y } = getCoords(i, val);
                                        return (
                                            <g key={key} className="cursor-pointer" onClick={() => handleSvgNodeClick(key)}>
                                                <circle cx={x} cy={y} r={10} fill="transparent" />
                                                <circle 
                                                    cx={x} 
                                                    cy={y} 
                                                    r={5} 
                                                    fill="#06b6d4" 
                                                    stroke="#fff" 
                                                    strokeWidth="1.5" 
                                                    className="transition-all duration-200 hover:scale-125"
                                                />
                                            </g>
                                        );
                                    })}

                                    {/* Outer Labels */}
                                    {[0, 1, 2, 3, 4].map((i) => {
                                        const key = skillKeys[i];
                                        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                                        const radius = rMax + 18;
                                        const lx = cx + radius * Math.cos(angle);
                                        const ly = cy + radius * Math.sin(angle);
                                        let textAnchor = 'middle';
                                        if (Math.cos(angle) > 0.15) textAnchor = 'start';
                                        else if (Math.cos(angle) < -0.15) textAnchor = 'end';
                                        
                                        return (
                                            <text
                                                key={key}
                                                x={lx}
                                                y={ly}
                                                fill="#cbd5e1"
                                                fontSize="9"
                                                fontFamily="monospace"
                                                fontWeight="bold"
                                                textAnchor={textAnchor}
                                                dominantBaseline="middle"
                                                className="select-none tracking-widest uppercase hover:fill-tech-cyan cursor-pointer transition-colors"
                                                onClick={() => handleSvgNodeClick(key)}
                                            >
                                                {key}
                                            </text>
                                        );
                                    })}
                                </svg>
                            </div>

                            {/* Preset Selectors */}
                            <div className="mb-6">
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Preset Matrix Profiles</span>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { name: 'Tech Focus', values: { Technical: 90, Operations: 35, Compliance: 40, Design: 75, Strategy: 50 } },
                                        { name: 'Operations Focus', values: { Technical: 30, Operations: 90, Compliance: 80, Design: 20, Strategy: 70 } },
                                        { name: 'Corporate Focus', values: { Technical: 30, Operations: 70, Compliance: 85, Design: 50, Strategy: 80 } },
                                        { name: 'Generalist', values: { Technical: 60, Operations: 60, Compliance: 60, Design: 60, Strategy: 60 } }
                                    ].map((preset) => (
                                        <button
                                            key={preset.name}
                                            role="button"
                                            onClick={() => {
                                                setSkillFilters(preset.values);
                                                window.dispatchEvent(new CustomEvent('skylink_settings_changed'));
                                            }}
                                            className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-tech-cyan/40 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-tech-cyan/5 transition-all duration-200"
                                        >
                                            {preset.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Telemetry Sliders */}
                            <div className="space-y-4 border-t border-white/5 pt-5">
                                {skillKeys.map((key) => (
                                    <div key={key} className="space-y-1">
                                        <div className="flex justify-between text-xs font-mono">
                                            <span className="text-slate-400 uppercase tracking-widest">{key}</span>
                                            <span className="text-tech-cyan font-bold">{skillFilters[key]}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="10"
                                            max="100"
                                            step="5"
                                            value={skillFilters[key]}
                                            onChange={(e) => setSkillFilters(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-tech-cyan hover:bg-white/20 transition-all"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Roles Board Column (7 cols) */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Filter and Sorting Toolbar */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                <span className="text-xs font-mono text-slate-400">
                                    [ MATCHING ENGINES DETECTED: <span className="text-tech-cyan font-bold">{flatRoles.length} POSITIONS</span> ]
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">SORT BY:</span>
                                    <div className="flex rounded-lg bg-black/30 p-1 border border-white/5 font-mono text-[10px]">
                                        <button
                                            role="button"
                                            onClick={() => setSortBy('dept')}
                                            className={`px-3 py-1 rounded transition-colors ${sortBy === 'dept' ? 'bg-tech-cyan text-slate-900 font-bold' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            DEPT
                                        </button>
                                        <button
                                            role="button"
                                            onClick={() => setSortBy('compat')}
                                            className={`px-3 py-1 rounded transition-colors ${sortBy === 'compat' ? 'bg-tech-cyan text-slate-900 font-bold' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            COMPATIBILITY
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Job Listings view */}
                            {sortBy === 'compat' ? (
                                <motion.div 
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-4"
                                >
                                    {flatRoles.map(role => ({ ...role, score: calculateMatch(role.skills) }))
                                        .sort((a, b) => b.score - a.score)
                                        .map((role, idx) => (
                                            <motion.div
                                                key={idx}
                                                variants={itemVariants}
                                                onMouseEnter={() => setHoveredRole(role)}
                                                onMouseLeave={() => setHoveredRole(null)}
                                                onClick={() => setSelectedRole(role)}
                                                className={`glass p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${getMatchBgClass(role.score)}`}
                                            >
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                                                            role.color === 'skylink-navy' ? 'bg-skylink-navy text-slate-300' :
                                                            role.color === 'tech-cyan' ? 'bg-tech-cyan/20 text-tech-cyan' :
                                                            'bg-skylink-gold/20 text-skylink-gold'
                                                        }`}>
                                                            {role.department}
                                                        </span>
                                                        <span className="text-[10px] text-slate-500 font-mono">{role.location}</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white font-serif group-hover:text-tech-cyan">{role.title}</h3>
                                                </div>

                                                <div className="flex items-center gap-6 font-mono">
                                                    <div className="text-right">
                                                        <span className="text-[8px] text-slate-500 uppercase tracking-widest block">COMPATIBILITY</span>
                                                        <span className={`text-lg font-bold ${getMatchColorClass(role.score)}`}>
                                                            {role.score}% {role.score >= 85 ? 'OPTIMAL' : role.score >= 60 ? 'READY' : 'LOW'}
                                                        </span>
                                                    </div>
                                                    <ChevronRight size={18} className="text-slate-400" />
                                                </div>
                                            </motion.div>
                                        ))
                                    }
                                </motion.div>
                            ) : (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                >
                                    {openings.map((dept, deptIdx) => (
                                        <motion.div
                                            key={deptIdx}
                                            variants={itemVariants}
                                            className={`glass p-6 rounded-2xl shadow-lg border border-white/10 border-t-4 ${getDeptBorderColorClass(dept.color)}`}
                                        >
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className={`p-2.5 bg-${dept.color}/10 rounded-xl`}>
                                                    <dept.icon size={20} className={`${getDeptTextColorClass(dept.color)}`} />
                                                </div>
                                                <h3 className="text-lg font-bold text-white font-serif">{dept.department}</h3>
                                            </div>

                                            <ul className="space-y-4">
                                                {dept.roles.map((role, roleIdx) => {
                                                    const score = calculateMatch(role.skills);
                                                    return (
                                                        <motion.li
                                                            key={roleIdx}
                                                            whileHover={{ x: 3 }}
                                                            onMouseEnter={() => setHoveredRole(role)}
                                                            onMouseLeave={() => setHoveredRole(null)}
                                                            onClick={() => setSelectedRole(role)}
                                                            className={`group cursor-pointer p-3.5 rounded-xl border border-white/0 hover:border-white/5 transition-all ${
                                                                score < 60 ? 'opacity-40' : ''
                                                            }`}
                                                        >
                                                            <div className="flex justify-between items-start mb-1">
                                                                <h4 className="font-bold text-slate-200 group-hover:text-skylink-blue transition-colors text-sm leading-snug">{role.title}</h4>
                                                                <ChevronRight size={14} className="text-slate-500 mt-1 flex-shrink-0 group-hover:text-skylink-blue group-hover:translate-x-0.5 transition-all" />
                                                            </div>
                                                            <p className="text-[10px] text-slate-500 mb-2">{role.location} • {role.type}</p>
                                                            <div className="flex items-center justify-between text-[9px] font-mono border-t border-white/5 pt-2 mt-2">
                                                                <span className="text-slate-600">COMPATIBILITY:</span>
                                                                <span className={`font-bold ${getMatchColorClass(score)}`}>{score}%</span>
                                                            </div>
                                                        </motion.li>
                                                    );
                                                })}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* General Application CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={openingsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-16 glass-dark border border-white/10 p-12 text-center rounded-2xl relative overflow-hidden"
                    >
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
                                whileTap={{ scale: 0.98 }}
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
