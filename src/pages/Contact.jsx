import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, Loader2, CheckCircle2, Send, Clock, Building } from 'lucide-react';
import SEO from '../components/SEO';
import heroBg from '../assets/Photos/DSC05810.jpg';
import LottieAnimation from '../components/Common/LottieAnimation';
import placeholderAnimation from '../assets/animations/placeholder.json';
import InteractiveGlobe from '../components/3D/InteractiveGlobe';

const getOfficeBorderTopColorClass = (color) => {
    if (color === 'skylink-blue') return 'border-t-skylink-blue';
    if (color === 'skylink-navy') return 'border-t-skylink-navy';
    if (color === 'skylink-gold') return 'border-t-skylink-gold';
    return 'border-t-white';
};

const getOfficeBgColorClass = (color) => {
    if (color === 'skylink-blue') return 'bg-skylink-blue';
    if (color === 'skylink-navy') return 'bg-skylink-navy';
    if (color === 'skylink-gold') return 'bg-skylink-gold';
    return 'bg-white';
};

const TerminalForm = ({ formData, setFormData, onSubmit, formStatus }) => {
    const [history, setHistory] = useState([
        "INITIALIZING SKYLINK SECURE PROTOCOL v2.8...",
        "ESTABLISHING ENCRYPTED CONNECTION...",
        "CONNECTION SECURE.",
        "Type /help for a list of commands, or /contact to begin transmission."
    ]);
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('cmd'); // cmd, name, email, subject, message
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [history, mode]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const val = input.trim();
            setHistory(prev => [...prev, `guest@skylink:~$ ${val}`]);
            setInput('');
            
            if (mode === 'cmd') {
                if (val === '/contact' || val === '/request_demo') {
                    setHistory(prev => [...prev, `[SYSTEM] Protocol accepted.`, `[SYSTEM] Enter Full Name:`]);
                    setMode('name');
                } else if (val === '/help') {
                    setHistory(prev => [...prev, `Available commands:`, `  /contact      - Open general communication channel`, `  /request_demo - Schedule an enterprise demo`, `  /help         - Show this menu`, `  /clear        - Clear terminal output`]);
                } else if (val === '/clear') {
                    setHistory([]);
                } else {
                    setHistory(prev => [...prev, `[ERROR] Command not recognized: ${val}`, `Type /help for available commands.`]);
                }
            } else if (mode === 'name') {
                setFormData(prev => ({ ...prev, name: val }));
                setHistory(prev => [...prev, `[OK] Name set to: ${val}`, `[SYSTEM] Enter Email Address:`]);
                setMode('email');
            } else if (mode === 'email') {
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                    setFormData(prev => ({ ...prev, email: val }));
                    setHistory(prev => [...prev, `[OK] Email set to: ${val}`, `[SYSTEM] Enter Subject:`]);
                    setMode('subject');
                } else {
                    setHistory(prev => [...prev, `[ERROR] Invalid email format. Try again:`, `[SYSTEM] Enter Email Address:`]);
                }
            } else if (mode === 'subject') {
                setFormData(prev => ({ ...prev, subject: val }));
                setHistory(prev => [...prev, `[OK] Subject set to: ${val}`, `[SYSTEM] Enter Message:`]);
                setMode('message');
            } else if (mode === 'message') {
                if (val.trim().length >= 10) {
                    setFormData(prev => ({ ...prev, message: val }));
                    setHistory(prev => [...prev, `[OK] Message logged.`, `[SYSTEM] Validating telemetry...`]);
                    onSubmit(val);
                    setMode('done');
                } else {
                    setHistory(prev => [...prev, `[ERROR] Message too short (${val.length}/10).`, `[SYSTEM] Enter Message:`]);
                }
            }
        }
    };

    return (
        <div className="w-full h-[400px] bg-slate-950 border border-tech-cyan/30 rounded-xl font-mono text-sm p-6 overflow-y-auto flex flex-col shadow-[0_0_30px_rgba(6,182,212,0.15)] relative">
            <div className="text-xs text-tech-cyan/50 mb-4 border-b border-tech-cyan/20 pb-2">SKYLINK TERMINAL EMULATOR v1.0</div>
            <div className="flex-1 overflow-y-auto space-y-2 text-slate-300">
                {history.map((line, i) => (
                    <div key={i} className={line.startsWith('[ERROR]') ? 'text-red-400' : line.startsWith('[OK]') ? 'text-skylink-gold' : line.startsWith('[SYSTEM]') ? 'text-tech-cyan' : ''}>
                        {line}
                    </div>
                ))}
                
                {mode !== 'done' && formStatus !== 'loading' && formStatus !== 'success' && (
                    <div className="flex items-center gap-2 text-white mt-4">
                        <span className="text-skylink-gold whitespace-nowrap">guest@skylink:~$</span>
                        <input 
                            type="text" 
                            value={input} 
                            onChange={e => setInput(e.target.value)} 
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-white p-0"
                            spellCheck="false"
                        />
                    </div>
                )}
                {formStatus === 'loading' && (
                    <div className="text-tech-cyan animate-pulse mt-4">TRANSMITTING SECURE PAYLOAD...</div>
                )}
                {formStatus === 'success' && (
                    <div className="text-green-400 mt-4">TRANSMISSION SUCCESSFUL. Channel closed.</div>
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

const Contact = () => {
    const formRef = useRef(null);
    const officesRef = useRef(null);
    const formInView = useInView(formRef, { once: true, margin: '-100px' });
    const officesInView = useInView(officesRef, { once: true, margin: '-100px' });

    const [formStatus, setFormStatus] = useState('idle');
    const [focusedField, setFocusedField] = useState(null);
    const [activeOffice, setActiveOffice] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Select a Subject',
        message: ''
    });

    const [touchedFields, setTouchedFields] = useState({
        name: false,
        email: false,
        subject: false,
        message: false
    });

    const nameValid = formData.name.trim().length >= 3;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const subjectValid = formData.subject !== 'Select a Subject' && formData.subject !== '';
    const messageValid = formData.message.trim().length >= 10;

    const totalCompleted = 
        (nameValid ? 25 : 0) +
        (emailValid ? 25 : 0) +
        (subjectValid ? 25 : 0) +
        (messageValid ? 25 : 0);

    const handleBlur = (field) => {
        setFocusedField(null);
        setTouchedFields(prev => ({ ...prev, [field]: true }));
    };

    const playChirp = () => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;
            
            // First beep
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(880, now);
            osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
            gain1.gain.setValueAtTime(0.05, now);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.start(now);
            osc1.stop(now + 0.08);
            
            // Second beep
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(1200, now + 0.1);
            osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.22);
            gain2.gain.setValueAtTime(0.05, now + 0.1);
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start(now + 0.1);
            osc2.stop(now + 0.22);
        } catch (e) {
            console.warn("Chirp sound failed", e);
        }
    };

    const playProgressTick = (freq) => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.05);
            gain.gain.setValueAtTime(0.02, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {}
    };

    const speakTelemetry = (text) => {
        if (localStorage.getItem('skylink_voice_enabled') === 'true' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const voices = window.speechSynthesis.getVoices();
            const voice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) || voices.find(v => v.lang.startsWith('en'));
            if (voice) utterance.voice = voice;
            utterance.pitch = 1.1;
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    };

    const prevCompletedRef = useRef(0);
    const hasChirpedRef = useRef(false);

    useEffect(() => {
        if (totalCompleted > prevCompletedRef.current) {
            if (totalCompleted === 100) {
                if (!hasChirpedRef.current) {
                    playChirp();
                    speakTelemetry("TRANSMISSION BEACON READY");
                    hasChirpedRef.current = true;
                }
            } else {
                playProgressTick(440 + totalCompleted * 2);
                hasChirpedRef.current = false;
            }
        } else if (totalCompleted < 100) {
            hasChirpedRef.current = false;
        }
        prevCompletedRef.current = totalCompleted;
    }, [totalCompleted]);

    const getFieldBorderClass = (fieldName, isValid, key) => {
        if (focusedField === fieldName) {
            return 'from-skylink-blue via-tech-cyan to-skylink-gold shadow-[0_0_20px_rgba(6,182,212,0.25)]';
        }
        if (touchedFields[key] && !isValid) {
            return 'from-red-500/60 to-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
        }
        if (touchedFields[key] && isValid) {
            return 'from-green-500/50 to-green-500/50';
        }
        return 'from-white/10 to-white/10';
    };

    // Hero cursor parallax mouse position
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const handleHeroMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 45;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 45;
        setMousePos({ x, y });
    };

    const offices = [
        {
            id: 'ny',
            city: 'New York',
            country: 'USA',
            type: 'Corporate HQ',
            address: '123 Wall Street, Suite 400, New York, NY 10005',
            phone: '+1 (212) 555-0123',
            color: 'skylink-blue',
        },
        {
            id: 'dhk',
            city: 'Dhaka',
            country: 'Bangladesh',
            type: 'Operations Hub',
            address: 'House 45, Road 12, Banani, Dhaka-1213',
            phone: '+880 2 5551234',
            color: 'skylink-navy',
        },
        {
            id: 'mnl',
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

    const handleSubmit = (e, finalMessage = null) => {
        if (e && e.preventDefault) e.preventDefault();
        
        const currentMessage = finalMessage || formData.message;
        const mValid = currentMessage.trim().length >= 10;

        if (!nameValid || !emailValid || !subjectValid || !mValid) {
            setTouchedFields({
                name: true,
                email: true,
                subject: true,
                message: true
            });
            return;
        }
        setFormStatus('loading');
        setTimeout(() => {
            setFormStatus('success');
            
            // Trigger the mailto link to open the user's default email client
            const mailtoLink = `mailto:info@skylink-innovations.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${currentMessage}`)}`;
            window.location.href = mailtoLink;

            setFormData({
                name: '',
                email: '',
                subject: 'Select a Subject',
                message: ''
            });
            setTouchedFields({
                name: false,
                email: false,
                subject: false,
                message: false
            });
            setTimeout(() => setFormStatus('idle'), 3500);
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-20 font-sans relative z-10 bg-transparent">
            <SEO title="Contact Us" description="Let's Build Something Great Together. Whether you need scalable property services or cutting-edge ITES solutions, our team is ready." />

            {/* 1. HERO WITH CURSOR PARALLAX */}
            <section 
                onMouseMove={handleHeroMouseMove}
                className="relative h-[500px] flex items-center bg-skylink-navy overflow-hidden"
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
            <section ref={formRef} className="py-24 bg-transparent relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 relative">
                        
                        {/* 3D Success Envelope Animation */}
                        <AnimatePresence>
                            {formStatus === 'success' && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.5, y: 50, rotate: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: -220, rotate: 15, transition: { duration: 1.2, ease: "easeOut" } }}
                                    exit={{ opacity: 0, scale: 0.3, y: -350, transition: { duration: 0.4 } }}
                                    className="absolute left-1/4 bottom-20 -translate-x-1/2 pointer-events-none z-50 flex flex-col items-center"
                                >
                                    <div className="w-16 h-12 glass border border-skylink-gold/50 rounded-lg shadow-[0_0_30px_rgba(194,155,64,0.4)] flex items-center justify-center relative">
                                        <div className="absolute top-0 left-0 right-0 h-6 border-b border-skylink-gold/30 rounded-t-lg bg-white/5 origin-top" style={{ transform: "rotateX(30deg)" }} />
                                        <Send size={24} className="text-skylink-gold animate-bounce" />
                                    </div>
                                    <div className="text-[10px] font-mono tracking-widest text-tech-cyan/80 mt-3 uppercase font-bold drop-shadow-md">Transmitting</div>
                                </motion.div>
                            )}
                        </AnimatePresence>

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
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-serif">Send Us a Message</h2>

                            {/* FEATURE 14: INTERACTIVE COMMAND TERMINAL */}
                            <TerminalForm 
                                formData={formData} 
                                setFormData={setFormData} 
                                onSubmit={(val) => handleSubmit(null, val)} 
                                formStatus={formStatus} 
                            />
                        </motion.div>

                        {/* Cybernetic Form Diagnostic Terminal (lg:col-span-2) */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={formInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="lg:col-span-2"
                        >
                            <div className="glass p-6 md:p-8 rounded-2xl border border-white/10 sticky top-32 flex flex-col gap-6">
                                <h3 className="text-md font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                                    <span className="w-2 h-2 bg-tech-cyan rounded-full animate-pulse" />
                                    Diagnostic Terminal
                                </h3>

                                {/* Cybernetic Transmitter Signal Strength Gauge */}
                                <div className="flex justify-center items-center py-2 border-b border-white/5">
                                    <svg viewBox="0 0 160 160" className="w-36 h-36">
                                        <defs>
                                            <linearGradient id="needleGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="var(--tech-cyan, #06b6d4)" />
                                                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
                                            </linearGradient>
                                            <linearGradient id="needleGradGold" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="var(--skylink-gold, #c29b40)" />
                                                <stop offset="100%" stopColor="rgba(194, 155, 64, 0.1)" />
                                            </linearGradient>
                                            <linearGradient id="radarSweep" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="var(--tech-cyan, #06b6d4)" stopOpacity="0.4" />
                                                <stop offset="50%" stopColor="var(--tech-cyan, #06b6d4)" stopOpacity="0.1" />
                                                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>

                                        {/* Outer tick border line */}
                                        <motion.circle
                                            cx="80"
                                            cy="80"
                                            r="72"
                                            fill="none"
                                            stroke="rgba(255, 255, 255, 0.03)"
                                            strokeWidth="1"
                                            strokeDasharray="4 4"
                                        />

                                        {/* Radar Sweep Effect */}
                                        <motion.circle
                                            cx="80"
                                            cy="80"
                                            r="64"
                                            fill="none"
                                            stroke="url(#radarSweep)"
                                            strokeWidth="10"
                                            strokeDasharray="100 300"
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                            style={{ transformOrigin: '80px 80px', opacity: totalCompleted > 0 ? 0.35 : 0.05 }}
                                        />

                                        {/* Dial Tick Marks */}
                                        {(() => {
                                            const angle = -135 + (totalCompleted / 100) * 270;
                                            return Array.from({ length: 19 }).map((_, i) => {
                                                const deg = -135 + i * 15;
                                                const rad = ((270 + deg) * Math.PI) / 180;
                                                const x1 = 80 + 64 * Math.cos(rad);
                                                const y1 = 80 + 64 * Math.sin(rad);
                                                const x2 = 80 + (i % 2 === 0 ? 56 : 59) * Math.cos(rad);
                                                const y2 = 80 + (i % 2 === 0 ? 56 : 59) * Math.sin(rad);
                                                const active = deg <= angle;
                                                return (
                                                    <line
                                                        key={i}
                                                        x1={x1}
                                                        y1={y1}
                                                        x2={x2}
                                                        y2={y2}
                                                        stroke={active ? (totalCompleted === 100 ? 'var(--skylink-gold, #c29b40)' : 'var(--tech-cyan, #06b6d4)') : 'rgba(255, 255, 255, 0.08)'}
                                                        strokeWidth={i % 2 === 0 ? 1.5 : 1}
                                                        style={{ 
                                                            transition: 'stroke 0.4s ease',
                                                            filter: active ? `drop-shadow(0 0 2px ${totalCompleted === 100 ? 'var(--skylink-gold, #c29b40)' : 'var(--tech-cyan, #06b6d4)'})` : 'none' 
                                                        }}
                                                    />
                                                );
                                            });
                                        })()}

                                        {/* Background Dial Arc */}
                                        <path
                                            d="M 34.75 125.25 A 64 64 0 1 1 125.25 125.25"
                                            fill="none"
                                            stroke="rgba(255, 255, 255, 0.05)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />

                                        {/* Filled Dial Arc */}
                                        <motion.path
                                            d="M 34.75 125.25 A 64 64 0 1 1 125.25 125.25"
                                            fill="none"
                                            stroke={totalCompleted === 100 ? 'var(--skylink-gold, #c29b40)' : 'var(--tech-cyan, #06b6d4)'}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeDasharray="301.6"
                                            strokeDashoffset={301.6 - (301.6 * totalCompleted) / 100}
                                            style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.4s ease' }}
                                        />

                                        {/* Rotating Pointer Needle and Waves */}
                                        {(() => {
                                            const angle = -135 + (totalCompleted / 100) * 270;
                                            return (
                                                <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: '80px 80px', transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                                                    {/* Needle Shape */}
                                                    <polygon 
                                                        points="80,18 76,80 84,80" 
                                                        fill={totalCompleted === 100 ? 'url(#needleGradGold)' : 'url(#needleGrad)'} 
                                                    />
                                                    {/* Needle tip glowing element */}
                                                    <circle 
                                                        cx="80" 
                                                        cy="18" 
                                                        r="4.5" 
                                                        fill={totalCompleted === 100 ? 'var(--skylink-gold, #c29b40)' : 'var(--tech-cyan, #06b6d4)'} 
                                                        style={{ filter: `drop-shadow(0 0 6px ${totalCompleted === 100 ? 'var(--skylink-gold, #c29b40)' : 'var(--tech-cyan, #06b6d4)'})` }} 
                                                    />
                                                    
                                                    {/* Radio Transmission Waves (when completed) */}
                                                    {totalCompleted === 100 && (
                                                        <>
                                                            <motion.circle
                                                                cx="80"
                                                                cy="18"
                                                                r="4"
                                                                fill="none"
                                                                stroke="var(--skylink-gold, #c29b40)"
                                                                strokeWidth="1.5"
                                                                initial={{ r: 4, opacity: 0.8 }}
                                                                animate={{ r: 24, opacity: 0 }}
                                                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                                                            />
                                                            <motion.circle
                                                                cx="80"
                                                                cy="18"
                                                                r="4"
                                                                fill="none"
                                                                stroke="var(--skylink-gold, #c29b40)"
                                                                strokeWidth="1.5"
                                                                initial={{ r: 4, opacity: 0.8 }}
                                                                animate={{ r: 36, opacity: 0 }}
                                                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                                            />
                                                            <motion.circle
                                                                cx="80"
                                                                cy="18"
                                                                r="4"
                                                                fill="none"
                                                                stroke="var(--skylink-gold, #c29b40)"
                                                                strokeWidth="1.5"
                                                                initial={{ r: 4, opacity: 0.8 }}
                                                                animate={{ r: 48, opacity: 0 }}
                                                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 1.0 }}
                                                            />
                                                        </>
                                                    )}
                                                </g>
                                            );
                                        })()}

                                        {/* Center Hub */}
                                        <circle cx="80" cy="80" r="9" fill="#0b0f19" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1.5" />
                                        <circle cx="80" cy="80" r="5" fill="#111827" stroke={totalCompleted === 100 ? 'var(--skylink-gold, #c29b40)' : 'var(--tech-cyan, #06b6d4)'} strokeWidth="1.5" />
                                        <circle cx="80" cy="80" r="2" fill={totalCompleted === 100 ? 'var(--skylink-gold, #c29b40)' : 'var(--tech-cyan, #06b6d4)'} />

                                        {/* Core percentage label */}
                                        <text
                                            x="80"
                                            y="110"
                                            fill="#fff"
                                            fontSize="13"
                                            fontFamily="monospace"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            {totalCompleted}%
                                        </text>

                                        {/* Transmitter status text */}
                                        <text
                                            x="80"
                                            y="126"
                                            fill={totalCompleted === 100 ? 'var(--skylink-gold, #c29b40)' : 'var(--tech-cyan, #06b6d4)'}
                                            fontSize="7"
                                            fontFamily="monospace"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className={`uppercase tracking-widest ${totalCompleted === 100 ? 'animate-pulse font-extrabold' : ''}`}
                                            style={{ 
                                                filter: totalCompleted > 0 ? `drop-shadow(0 0 4px ${totalCompleted === 100 ? 'var(--skylink-gold, #c29b40)' : 'var(--tech-cyan, #06b6d4)'})` : 'none',
                                                letterSpacing: '0.05em'
                                            }}
                                        >
                                            {totalCompleted === 100 ? 'TRANSMISSION BEACON READY' : 'SIGNAL CALIBRATING'}
                                        </text>
                                    </svg>
                                </div>

                                {/* Log Console Outputs */}
                                <div className="bg-black/30 p-4 rounded-xl border border-white/5 font-mono text-[11px] leading-relaxed text-slate-400 h-44 overflow-y-auto select-none">
                                    <div className="text-tech-cyan mb-1">&gt; SKYLINK SYNAPSE TERMINAL v2.8</div>
                                    <div>&gt; STATUS: {totalCompleted === 100 ? 'CORE_SECURE' : 'AWAITING_CREDENTIALS'}</div>
                                    <div className="border-t border-white/10 my-2 pt-1" />
                                    <div className="flex justify-between items-center mb-1">
                                        <span>FIELD_1 [NAME] :</span>
                                        <span className={nameValid ? 'text-tech-cyan font-bold' : 'text-amber-500 font-bold'}>
                                            {nameValid ? '✓ ACTIVE' : '⚠ EMPTY'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span>FIELD_2 [MAIL] :</span>
                                        <span className={emailValid ? 'text-tech-cyan font-bold' : 'text-amber-500 font-bold'}>
                                            {emailValid ? '✓ VERIFIED' : '⚠ INVALID'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span>FIELD_3 [SUBJ] :</span>
                                        <span className={subjectValid ? 'text-tech-cyan font-bold' : 'text-amber-500 font-bold'}>
                                            {subjectValid ? '✓ SET' : '⚠ SELECT'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>FIELD_4 [MSSG] :</span>
                                        <span className={messageValid ? 'text-tech-cyan font-bold' : 'text-amber-500 font-bold'}>
                                            {messageValid ? '✓ VALID' : `⚠ INSUFFICIENT (${formData.message.length}/10)`}
                                        </span>
                                    </div>
                                    <div className="border-t border-white/10 my-2 pt-1" />
                                    <div className="text-[10px] flex justify-between font-bold">
                                        <span className="text-slate-300">LINK INTEGRITY:</span>
                                        <span className={totalCompleted === 100 ? 'text-skylink-gold' : 'text-tech-cyan'}>
                                            {totalCompleted === 100 ? '100% READY' : `${totalCompleted}% CONNECTED`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Horizontal Quick Contact Ribbon (Below form grid) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={formInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
                    >
                        {[
                            { icon: Mail, label: 'Email', value: 'info@skylink-innovations.com', color: 'skylink-blue' },
                            { icon: Phone, label: 'Phone', value: '+1 (212) 555-0123', color: 'tech-cyan' },
                            { icon: Clock, label: 'Business Hours', value: 'Mon - Fri: 9AM - 6PM EST', color: 'skylink-gold' },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-4 group cursor-pointer"
                            >
                                <div className={`p-3 bg-${item.color}/10 rounded-xl group-hover:bg-${item.color}/20 transition-colors`}>
                                    <item.icon size={20} className={`text-${item.color}`} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                                    <p className="font-semibold text-white group-hover:text-skylink-blue transition-colors">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 3. GLOBAL OFFICES WITH ACTIVE GLOBE SYNC */}
            <section ref={officesRef} className="py-24 bg-transparent relative z-10">
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
                        <h2 className="text-4xl md:text-5xl font-bold text-white font-serif mb-8">Global Offices</h2>
                    </motion.div>

                    {/* Interactive 3D Globe */}
                    <div className="h-[400px] w-full max-w-5xl mx-auto rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl mb-16 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-skylink-navy/80 via-transparent to-transparent pointer-events-none z-30" />
                        <InteractiveGlobe activeOffice={activeOffice} setActiveOffice={setActiveOffice} />
                    </div>

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
                                onMouseEnter={() => setActiveOffice(office.id)}
                                onMouseLeave={() => setActiveOffice(null)}
                                className={`glass p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10 ${getOfficeBorderTopColorClass(office.color)} border-t-4 group ${
                                    activeOffice === office.id ? 'border-skylink-gold/50 shadow-[0_0_35px_rgba(194,155,64,0.15)] bg-white/5' : ''
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-3 bg-${office.color}/10 rounded-xl group-hover:bg-${office.color}/20 transition-colors`}>
                                        <Building size={24} className={`text-${office.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{office.city}</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{office.type}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex items-start gap-3 cursor-pointer"
                                    >
                                        <MapPin size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-slate-300 text-sm">{office.address}</p>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <Phone size={18} className="text-slate-400 flex-shrink-0" />
                                        <p className="text-slate-300 text-sm font-medium group-hover:text-skylink-blue transition-colors">{office.phone}</p>
                                    </motion.div>
                                </div>

                                <div className={`mt-6 pt-6 border-t border-white/10 w-12 h-1 bg-white/10 group-hover:${getOfficeBgColorClass(office.color)} group-hover:w-full transition-all duration-500`} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 4. MAP CTA */}
            <section className="py-20 glass-dark relative overflow-hidden z-10 border-y border-white/10">
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
                            whileTap={{ scale: 0.98 }}
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
