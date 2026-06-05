import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, Award, Star, Zap, Terminal, Navigation, FileCheck } from 'lucide-react';

const ACHIEVEMENTS_LIST = [
    { id: 'first_visit', title: 'System Initialization', desc: 'Connected to the Skylink mainframe.', icon: Terminal },
    { id: 'explorer', title: 'Global Explorer', desc: 'Navigated to all major service sectors.', icon: Navigation },
    { id: 'hud_opened', title: 'Telemetry Online', desc: 'Accessed the command terminal HUD.', icon: Zap },
    { id: 'form_submitted', title: 'Signal Broadcast', desc: 'Successfully submitted a transmission.', icon: FileCheck },
    { id: 'audio_on', title: 'Acoustics Enabled', desc: 'Activated spatial UI soundscape.', icon: Star },
    { id: 'theme_customized', title: 'Theme Matrix Modded', desc: 'Customized the interface color theme.', icon: Award }
];

// Custom hook to trigger achievements
export const useAchievements = () => {
    const triggerAchievement = (id) => {
        const stored = JSON.parse(localStorage.getItem('skylink_achievements') || '[]');
        if (!stored.includes(id)) {
            stored.push(id);
            localStorage.setItem('skylink_achievements', JSON.stringify(stored));
            // Dispatch event for UI to pick up
            window.dispatchEvent(new CustomEvent('skylink_achievement_unlocked', { detail: id }));
            
            // Play audio if enabled
            const playUISound = (type) => {
                const soundEnabled = localStorage.getItem('skylink_sound_enabled') !== 'false';
                if (!soundEnabled) return;
                try {
                    const ctx = new (window.AudioContext || window.webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    const now = ctx.currentTime;
                    
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(400, now);
                    osc.frequency.setValueAtTime(600, now + 0.1);
                    osc.frequency.setValueAtTime(800, now + 0.2);
                    gain.gain.setValueAtTime(0.05, now);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
                    osc.start(now);
                    osc.stop(now + 0.4);
                } catch(e) { }
            };
            playUISound('achievement');
        }
    };

    return { triggerAchievement };
};

const AchievementSystem = () => {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        const handleUnlock = (e) => {
            const id = e.detail;
            const achievement = ACHIEVEMENTS_LIST.find(a => a.id === id);
            if (achievement) {
                const notifId = Date.now() + Math.random();
                setQueue(prev => [...prev, { ...achievement, notifId }]);
                
                // Auto dismiss after 4 seconds
                setTimeout(() => {
                    setQueue(prev => prev.filter(q => q.notifId !== notifId));
                }, 4000);
            }
        };

        window.addEventListener('skylink_achievement_unlocked', handleUnlock);
        return () => window.removeEventListener('skylink_achievement_unlocked', handleUnlock);
    }, []);

    // Initial load check
    useEffect(() => {
        const checkInitial = setTimeout(() => {
            const stored = JSON.parse(localStorage.getItem('skylink_achievements') || '[]');
            if (!stored.includes('first_visit')) {
                // We use manual dispatch to trigger the first achievement notification visually
                const storedArr = JSON.parse(localStorage.getItem('skylink_achievements') || '[]');
                storedArr.push('first_visit');
                localStorage.setItem('skylink_achievements', JSON.stringify(storedArr));
                window.dispatchEvent(new CustomEvent('skylink_achievement_unlocked', { detail: 'first_visit' }));
            }
        }, 3000);
        return () => clearTimeout(checkInitial);
    }, []);

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 z-[200] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {queue.map((item) => {
                    const Icon = item.icon || Shield;
                    return (
                        <motion.div
                            key={item.notifId}
                            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, scale: 0.9, filter: 'blur(5px)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="bg-slate-950/95 backdrop-blur-xl border border-skylink-gold/30 p-4 rounded-xl shadow-[0_0_30px_rgba(194,155,64,0.3)] flex items-center gap-4 w-[320px] relative overflow-hidden"
                        >
                            {/* Animated background glow */}
                            <motion.div 
                                className="absolute inset-0 bg-skylink-gold/10"
                                animate={{ opacity: [0, 0.2, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            
                            {/* Sweeping laser line */}
                            <motion.div 
                                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white]"
                                initial={{ left: '-10%' }}
                                animate={{ left: '110%' }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />

                            <div className="bg-slate-900 border border-skylink-gold/50 p-2.5 rounded-lg relative z-10">
                                <Icon className="w-6 h-6 text-skylink-gold drop-shadow-[0_0_5px_rgba(194,155,64,0.8)]" />
                            </div>
                            
                            <div className="relative z-10 flex-1">
                                <div className="text-[9px] uppercase tracking-widest text-skylink-gold font-mono mb-1">Achievement Unlocked</div>
                                <h4 className="text-white font-bold text-sm leading-tight">{item.title}</h4>
                                <p className="text-slate-400 text-xs leading-tight mt-0.5">{item.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default AchievementSystem;
