import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import PropertyServices from './pages/PropertyServices';
import ITESServices from './pages/ITESServices';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import LoadingScreen from './components/UI/LoadingScreen';
import FloatingCTA from './components/UI/FloatingCTA';
import ScrollProgress from './components/UI/ScrollProgress';
import BackToTop from './components/UI/BackToTop';
import Canvas3DContext from './components/UI/Canvas3DContext';
import CustomCursor from './components/UI/CustomCursor';
import SystemHUD from './components/UI/SystemHUD';
import AchievementSystem, { useAchievements } from './components/UI/AchievementSystem';
import AssistantDrone from './components/UI/AssistantDrone';
import CommandMenu from './components/UI/CommandMenu';
import EasterEgg from './components/UI/EasterEgg';

// Page transition variants - Cinematic 3D Depth
const pageVariants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom cinematic ease-out
    }
  },
  exit: {
    opacity: 0,
    y: -40,
    scale: 1.05,
    filter: 'blur(10px)',
    transition: {
      duration: 0.4,
      ease: [0.7, 0, 0.84, 0], // Custom ease-in
    }
  },
};

// FEATURE 12: Cinematic Route Overlay
const RouteTransitionOverlay = () => {
  return (
    <motion.div
      initial={{ scaleY: 1, opacity: 1 }}
      animate={{ scaleY: 0, opacity: 0 }}
      exit={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center pointer-events-none origin-bottom"
    >
      <div className="relative overflow-hidden flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-tech-cyan font-mono tracking-[0.4em] text-sm md:text-lg font-bold flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-tech-cyan rounded-full animate-pulse" />
            <span>ESTABLISHING LINK...</span>
          </div>
          <div className="w-64 h-[2px] bg-skylink-blue/20 relative overflow-hidden rounded-full">
             <motion.div 
               className="absolute top-0 bottom-0 left-0 bg-tech-cyan w-1/3 shadow-[0_0_10px_#06b6d4]"
               animate={{ x: ['-100%', '300%'] }}
               transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
             />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// FEATURE 15: AUDIO-SYNTHESIZED UI ACOUSTICS
let sharedAudioCtx = null;
let userHasInteracted = false;

if (typeof window !== 'undefined') {
  const markInteracted = () => {
    userHasInteracted = true;
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }
  };
  window.addEventListener('click', markInteracted, { once: true, passive: true });
  window.addEventListener('keydown', markInteracted, { once: true, passive: true });
  window.addEventListener('touchstart', markInteracted, { once: true, passive: true });
}

const playUISound = (type) => {
  const soundEnabled = localStorage.getItem('skylink_sound_enabled') !== 'false';
  if (!soundEnabled || !userHasInteracted) return;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioContextClass();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }
    const ctx = sharedAudioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2000, now);
      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1500, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.1);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'toggle') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.14);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'route') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.3);
      
      osc.connect(filter);
      filter.connect(gain);
      
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    // Graceful fallback if client restricts AudioContext
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    playUISound('route');
  }, [location.pathname]);

  // Track page visits for achievements
  const { triggerAchievement } = useAchievements();
  useEffect(() => {
    // Basic navigation achievements logic
    const path = location.pathname;
    const visited = JSON.parse(localStorage.getItem('skylink_visited_pages') || '[]');
    if (!visited.includes(path)) {
      visited.push(path);
      localStorage.setItem('skylink_visited_pages', JSON.stringify(visited));
    }
    
    // Check if explored all major pages
    const requiredPages = ['/', '/property', '/ites', '/about', '/careers', '/contact'];
    const hasAll = requiredPages.every(p => visited.includes(p));
    if (hasAll) triggerAchievement('explorer');
  }, [location.pathname]);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Track cursor position on elements with .glow-hover
  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e) => {
      const targets = document.querySelectorAll('.glow-hover');
      targets.forEach(target => {
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty('--x', `${x}px`);
        target.style.setProperty('--y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Global Audio & Voice Synthesis Hooks
  useEffect(() => {
    const speakText = (text) => {
      const voiceEnabled = localStorage.getItem('skylink_voice_enabled') === 'true';
      if (!voiceEnabled || !window.speechSynthesis) return;
      try {
        window.speechSynthesis.cancel();
        let phrase = text.trim().substring(0, 35).toUpperCase();
        if (phrase.includes('PROPERTY')) phrase = 'ACCESSING PROPERTY SERVICES';
        else if (phrase.includes('ITES') || phrase.includes('BPO')) phrase = 'ACCESSING DIGITAL OPERATIONS';
        else if (phrase.includes('ABOUT')) phrase = 'ACCESSING CORPORATE OVERVIEW';
        else if (phrase.includes('CAREERS')) phrase = 'ACCESSING CAREERS BOARD';
        else if (phrase.includes('CONTACT') || phrase.includes('MESSAGE')) phrase = 'ESTABLISHING SYNAPSE LINK';
        else if (phrase.includes('HOME') || phrase.includes('SL')) phrase = 'RETURNING TO MAIN GRID';
        else phrase = `INITIALIZING ${phrase}`;

        const utterance = new SpeechSynthesisUtterance(phrase);
        utterance.rate = 1.25;
        utterance.pitch = 0.9;
        
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) || voices.find(v => v.lang.startsWith('en'));
        if (voice) utterance.voice = voice;
        
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Voice synth failed", err);
      }
    };

    const handleGlobalClick = (e) => {
      const target = e.target.closest('a, button, [role="button"], input[type="submit"]');
      if (target) {
        playUISound('click');
        if (window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate(15); // Simulated haptic feedback
        }
        speakText(target.innerText || target.getAttribute('aria-label') || 'Action');
      }
    };

    let lastHovered = null;
    const handleGlobalMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"]');
      if (target && target !== lastHovered) {
        lastHovered = target;
        playUISound('hover');
      }
    };

    const handleGlobalMouseOut = (e) => {
      const target = e.target.closest('a, button, [role="button"]');
      if (target && !e.relatedTarget?.closest('a, button, [role="button"]')) {
        lastHovered = null;
      }
    };

    const handleSettingsChanged = () => {
      playUISound('toggle');
    };

    document.addEventListener('click', handleGlobalClick, { passive: true });
    document.addEventListener('mouseover', handleGlobalMouseOver, { passive: true });
    document.addEventListener('mouseout', handleGlobalMouseOut, { passive: true });
    window.addEventListener('skylink_settings_changed', handleSettingsChanged, { passive: true });

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('mouseover', handleGlobalMouseOver);
      document.removeEventListener('mouseout', handleGlobalMouseOut);
      window.removeEventListener('skylink_settings_changed', handleSettingsChanged);
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} minDuration={1800} />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      <div className="min-h-screen flex flex-col font-sans text-slate-200 relative">
        <CustomCursor />
        <Canvas3DContext />
        <Navbar />
        <CommandMenu />
        <main className="flex-grow relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/property" element={<PropertyServices />} />
                <Route path="/ites" element={<ITESServices />} />
                <Route path="/about" element={<About />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <RouteTransitionOverlay />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />

        {/* Floating CTA Button */}
        {/* <FloatingCTA /> */}

        {/* Back to Top Button with Progress */}
        <BackToTop showAfter={500} showProgress={true} />

        {/* Global Achievement System */}
        <AchievementSystem />

        {/* Holographic Drone Assistant */}
        <AssistantDrone />

        {/* Interactive Telemetry HUD */}
        <SystemHUD />

        {/* Konami Code Terminal */}
        <EasterEgg />
      </div>
    </>
  );
}

export default App;


