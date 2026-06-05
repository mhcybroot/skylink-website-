import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Sliders, Play, Settings, ShieldAlert, Cpu, Sparkles, Volume2, VolumeX } from 'lucide-react';

export default function SystemHUD() {
    const [isOpen, setIsOpen] = useState(false);
    const [fps, setFps] = useState(60);
    const [theme, setTheme] = useState(localStorage.getItem('skylink_theme') || 'cyan');
    const [voiceEnabled, setVoiceEnabled] = useState(localStorage.getItem('skylink_voice_enabled') === 'true');
    const [isCalibrating, setIsCalibrating] = useState(false);
    const [particlesCount, setParticlesCount] = useState(120);

    // Feature 15: Ambient Spatial Soundscape
    const [ambientSoundEnabled, setAmbientSoundEnabled] = useState(false);
    const audioCtxRef = useRef(null);
    const droneOscRef = useRef(null);
    const droneGainRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);

    // 1. Real-time FPS Telemetry Loop
    useEffect(() => {
        let lastTime = performance.now();
        let frames = 0;
        let frameId;
        const checkFps = () => {
            frames++;
            const now = performance.now();
            if (now >= lastTime + 1000) {
                setFps(Math.round((frames * 1000) / (now - lastTime)));
                frames = 0;
                lastTime = now;
            }
            frameId = requestAnimationFrame(checkFps);
        };
        frameId = requestAnimationFrame(checkFps);
        return () => cancelAnimationFrame(frameId);
    }, []);

    // 2. Adjust particle counts dynamically based on scroll inertia or random drift
    useEffect(() => {
        const interval = setInterval(() => {
            setParticlesCount(prev => {
                const drift = Math.floor(Math.random() * 7) - 3;
                return Math.max(90, Math.min(150, prev + drift));
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Scroll listener for Ambient Sound Modulator
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update drone frequency based on scroll
    useEffect(() => {
        if (ambientSoundEnabled && droneOscRef.current && droneGainRef.current) {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollRatio = maxScroll > 0 ? scrollY / maxScroll : 0;
            // Modulate base frequency from 40Hz up to 70Hz
            const targetFreq = 40 + (scrollRatio * 30);
            droneOscRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.1);
            
            // Modulate volume slightly based on scroll (max 0.05)
            const targetVol = 0.02 + (scrollRatio * 0.03);
            droneGainRef.current.gain.setTargetAtTime(targetVol, audioCtxRef.current.currentTime, 0.5);
        }
    }, [scrollY, ambientSoundEnabled]);

    const toggleAmbientSound = () => {
        if (!ambientSoundEnabled) {
            // Power UP Soundscape
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                audioCtxRef.current = ctx;
                
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const filter = ctx.createBiquadFilter();
                
                osc.type = 'sawtooth';
                osc.frequency.value = 40;
                
                filter.type = 'lowpass';
                filter.frequency.value = 120;
                
                gain.gain.setValueAtTime(0, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 3); // Slow fade in
                
                osc.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start();
                droneOscRef.current = osc;
                droneGainRef.current = gain;
                
                setAmbientSoundEnabled(true);
            } catch (e) {
                console.error("Audio Context failed", e);
            }
        } else {
            // Power DOWN Soundscape
            if (droneGainRef.current && audioCtxRef.current) {
                droneGainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1.5);
                setTimeout(() => {
                    droneOscRef.current?.stop();
                    audioCtxRef.current?.close();
                    audioCtxRef.current = null;
                    droneOscRef.current = null;
                    droneGainRef.current = null;
                    setAmbientSoundEnabled(false);
                }, 1600);
            } else {
                setAmbientSoundEnabled(false);
            }
        }
    };

    // 3. Theme application loop
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const applyTheme = (themeName) => {
        const root = document.documentElement;
        localStorage.setItem('skylink_theme', themeName);
        if (themeName === 'cyan') {
            root.style.setProperty('--tech-cyan', '#06b6d4');
            root.style.setProperty('--tech-cyan-light', '#22d3ee');
            root.style.setProperty('--tech-cyan-dark', '#0891b2');
            root.style.setProperty('--skylink-gold', '#c29b40');
        } else if (themeName === 'gold') {
            root.style.setProperty('--tech-cyan', '#c29b40');
            root.style.setProperty('--tech-cyan-light', '#fbbf24');
            root.style.setProperty('--tech-cyan-dark', '#b45309');
            root.style.setProperty('--skylink-gold', '#06b6d4');
        } else if (themeName === 'crimson') {
            root.style.setProperty('--tech-cyan', '#ef4444');
            root.style.setProperty('--tech-cyan-light', '#f87171');
            root.style.setProperty('--tech-cyan-dark', '#b91c1c');
            root.style.setProperty('--skylink-gold', '#cbd5e1');
        } else if (themeName === 'emerald') {
            root.style.setProperty('--tech-cyan', '#10b981');
            root.style.setProperty('--tech-cyan-light', '#34d399');
            root.style.setProperty('--tech-cyan-dark', '#047857');
            root.style.setProperty('--skylink-gold', '#c29b40');
        }
        // Dispatch custom settings changed event to play acoustic beep
        window.dispatchEvent(new CustomEvent('skylink_settings_changed'));
    };

    const toggleVoice = () => {
        const nextVal = !voiceEnabled;
        setVoiceEnabled(nextVal);
        localStorage.setItem('skylink_voice_enabled', nextVal ? 'true' : 'false');
        window.dispatchEvent(new CustomEvent('skylink_settings_changed'));
        
        // Instant voice feedback
        if (nextVal && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance("VOICE SYNTHESIS ENABLED");
            utterance.rate = 1.2;
            utterance.pitch = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    // 4. Color calibration test loop
    const runCalibration = () => {
        setIsCalibrating(true);
        window.dispatchEvent(new CustomEvent('skylink_settings_changed'));
        
        setTimeout(() => {
            setIsCalibrating(false);
            if (voiceEnabled && window.speechSynthesis) {
                const utterance = new SpeechSynthesisUtterance("SYSTEM CALIBRATION COMPLETE");
                utterance.rate = 1.25;
                window.speechSynthesis.speak(utterance);
            }
        }, 2500);
    };

    return (
        <>
            {/* Calibration Flash Screen Overlay */}
            <AnimatePresence>
                {isCalibrating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: [0, 0.8, 0.4, 0.8, 0.9, 0],
                            backgroundColor: ['#06b6d4', '#ef4444', '#10b981', '#fbbf24', '#0a192f']
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.2, ease: "easeInOut" }}
                        className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center font-mono text-white text-3xl font-bold tracking-[0.2em] uppercase"
                    >
                        <div className="bg-black/80 px-8 py-4 rounded-xl border border-white/20 shadow-2xl flex flex-col items-center gap-4">
                            <Activity className="animate-spin text-tech-cyan w-10 h-10" />
                            <span>CALIBRATING GRID</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Collapsible Trigger HUD Button */}
            <div className="fixed left-6 bottom-6 z-50">
                <motion.button
                    role="button"
                    onClick={() => {
                        setIsOpen(!isOpen);
                        window.dispatchEvent(new CustomEvent('skylink_settings_changed'));
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-3 glass rounded-xl border border-tech-cyan/40 hover:border-tech-cyan text-white shadow-lg shadow-black/40 group relative overflow-hidden"
                >
                    {/* Glowing coordinate outline */}
                    <div className="absolute inset-0 bg-tech-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Cpu size={16} className={`text-tech-cyan ${isOpen ? 'animate-spin' : 'animate-pulse'}`} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                        {isOpen ? '[CLOSE HUD]' : '[SYS_HUD]'}
                    </span>
                </motion.button>
            </div>

            {/* HUD Dashboard Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="fixed left-6 bottom-20 z-50 w-80 glass p-6 rounded-2xl border border-white/10 shadow-glow-sm"
                    >
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                            <span className="w-1.5 h-1.5 bg-tech-cyan rounded-full animate-ping" />
                            System Telemetry HUD
                        </h3>

                        {/* Real-time Diagnostics */}
                        <div className="bg-black/35 p-3 rounded-xl border border-white/5 font-mono text-[10px] text-slate-400 space-y-2 mb-4 select-none">
                            <div className="flex justify-between">
                                <span>RENDER RATE:</span>
                                <span className={fps >= 55 ? 'text-green-400 font-bold' : 'text-amber-400 font-bold'}>
                                    {fps} FPS
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>ACTIVE CANVAS NODES:</span>
                                <span className="text-tech-cyan font-bold">{particlesCount} UNITS</span>
                            </div>
                            <div className="flex justify-between">
                                <span>MEMORY HEAP ALLOC:</span>
                                <span className="text-tech-cyan font-bold">~4.8 MB</span>
                            </div>
                            <div className="flex justify-between">
                                <span>AUDIO CHANNELS:</span>
                                <span className="text-tech-cyan font-bold">3 SYNTH OSC</span>
                            </div>
                        </div>

                        {/* Accent customizer */}
                        <div className="mb-4">
                            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Accent Calibration</span>
                            <div className="grid grid-cols-4 gap-2">
                                {[
                                    { name: 'cyan', color: '#06b6d4', label: 'CYAN' },
                                    { name: 'gold', color: '#c29b40', label: 'GOLD' },
                                    { name: 'crimson', color: '#ef4444', label: 'RED' },
                                    { name: 'emerald', color: '#10b981', label: 'EMLD' }
                                ].map((t) => (
                                    <button
                                        key={t.name}
                                        role="button"
                                        onClick={() => setTheme(t.name)}
                                        className={`p-1.5 rounded-lg border font-mono text-[9px] font-bold uppercase transition-all ${
                                            theme === t.name 
                                                ? 'border-tech-cyan bg-white/5 text-white' 
                                                : 'border-white/5 bg-transparent text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        <div 
                                            className="w-full h-1.5 rounded-sm mb-1"
                                            style={{ backgroundColor: t.color }}
                                        />
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Voice Synthesizer control */}
                        <div className="mb-4 border-t border-white/5 pt-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-[10px] font-mono text-slate-300 font-bold block">Voice Synthesizer Assist</span>
                                    <span className="text-[8px] font-mono text-slate-500">Robot narration on interactive clicks</span>
                                </div>
                                <button
                                    role="button"
                                    onClick={toggleVoice}
                                    className={`px-3 py-1.5 rounded-lg border font-mono text-[9px] font-bold uppercase transition-all ${
                                        voiceEnabled 
                                            ? 'bg-tech-cyan/20 border-tech-cyan text-tech-cyan' 
                                            : 'bg-white/5 border-white/10 text-slate-400'
                                    }`}
                                >
                                    {voiceEnabled ? 'ACTIVE' : 'MUTE'}
                                </button>
                            </div>
                        </div>

                        {/* Ambient Audio Controller */}
                        <div className="mb-4 border-t border-white/5 pt-4">
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <span className="text-[10px] font-mono text-slate-300 font-bold block">Ambient Soundscape</span>
                                    <span className="text-[8px] font-mono text-slate-500">Spatial frequency engine</span>
                                </div>
                                <button
                                    role="button"
                                    onClick={toggleAmbientSound}
                                    className={`px-3 py-1.5 rounded-lg border font-mono text-[9px] font-bold uppercase transition-all flex items-center gap-1.5 ${
                                        ambientSoundEnabled 
                                            ? 'bg-skylink-gold/20 border-skylink-gold text-skylink-gold shadow-[0_0_10px_rgba(194,155,64,0.3)]' 
                                            : 'bg-white/5 border-white/10 text-slate-400'
                                    }`}
                                >
                                    {ambientSoundEnabled ? <Volume2 size={10} /> : <VolumeX size={10} />}
                                    {ambientSoundEnabled ? 'ONLINE' : 'OFFLINE'}
                                </button>
                            </div>
                            
                            {/* Mini Audio Visualizer */}
                            <div className={`h-8 flex items-end gap-1 px-1 py-1 rounded border ${ambientSoundEnabled ? 'border-skylink-gold/20 bg-black/40' : 'border-white/5 bg-black/20'} transition-all`}>
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={ambientSoundEnabled ? {
                                            height: ['15%', `${Math.random() * 85 + 15}%`, '15%']
                                        } : { height: '5%' }}
                                        transition={ambientSoundEnabled ? {
                                            repeat: Infinity,
                                            duration: 0.3 + Math.random() * 0.4,
                                            ease: "easeInOut"
                                        } : { duration: 0.3 }}
                                        className={`flex-1 rounded-t-sm ${ambientSoundEnabled ? 'bg-skylink-gold/60' : 'bg-white/10'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Calibration Trigger */}
                        <div className="border-t border-white/5 pt-4">
                            <button
                                role="button"
                                onClick={runCalibration}
                                className="w-full py-2 bg-tech-cyan hover:bg-tech-cyan-light text-slate-900 font-mono font-bold uppercase tracking-widest text-[10px] rounded-lg shadow-lg hover:shadow-glow transition-all flex items-center justify-center gap-1.5"
                            >
                                <Play size={10} fill="currentColor" />
                                Run System Calibration
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
