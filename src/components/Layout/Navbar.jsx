import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Building, Monitor, ArrowRight, Search, Volume2, VolumeX, Terminal, Settings, Globe, Users, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// FEATURE 2: INTERACTIVE LOGO PARTICLE SYSTEM
// ============================================
const LogoParticleContainer = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    // Particle nodes for "S" and "L" letters mapped on a 100x40 scale
    const particles = [
        // Letter 'S' nodes (9 points)
        { origX: 16, origY: 10, letter: 'S' },
        { origX: 24, origY: 8, letter: 'S' },
        { origX: 10, origY: 14, letter: 'S' },
        { origX: 18, origY: 20, letter: 'S' },
        { origX: 26, origY: 25, letter: 'S' },
        { origX: 11, origY: 30, letter: 'S' },
        { origX: 20, origY: 32, letter: 'S' },
        { origX: 26, origY: 14, letter: 'S' },
        { origX: 11, origY: 24, letter: 'S' },
        
        // Letter 'L' nodes (7 points)
        { origX: 46, origY: 8, letter: 'L' },
        { origX: 46, origY: 15, letter: 'L' },
        { origX: 46, origY: 22, letter: 'L' },
        { origX: 46, origY: 32, letter: 'L' },
        { origX: 53, origY: 32, letter: 'L' },
        { origX: 60, origY: 32, letter: 'L' },
        { origX: 50, origY: 20, letter: 'L' }
    ];

    const threshold = 18;
    const forceFactor = 15;

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-24 h-10 flex items-center justify-center cursor-pointer relative"
        >
            <svg viewBox="0 0 76 40" className="w-full h-full overflow-visible">
                {/* Connect adjacent points inside each letter to form constellation */}
                {particles.map((p1, idx1) => {
                    return particles.map((p2, idx2) => {
                        if (idx2 <= idx1 || p1.letter !== p2.letter) return null;
                        const dist = Math.hypot(p1.origX - p2.origX, p1.origY - p2.origY);
                        if (dist > 15) return null;

                        const getPos = (p) => {
                            if (!isHovered) return { x: p.origX, y: p.origY };
                            const dx = p.origX * 1.3 - mousePos.x * (76 / 96);
                            const dy = p.origY * 1.0 - mousePos.y * (40 / 40);
                            const d = Math.hypot(dx, dy);
                            if (d < threshold) {
                                const force = (threshold - d) / threshold;
                                return {
                                    x: p.origX + (dx / (d || 1)) * force * forceFactor,
                                    y: p.origY + (dy / (d || 1)) * force * forceFactor
                                };
                            }
                            return { x: p.origX, y: p.origY };
                        };

                        const pos1 = getPos(p1);
                        const pos2 = getPos(p2);

                        return (
                            <motion.line
                                key={`${idx1}-${idx2}`}
                                x1={pos1.x}
                                y1={pos1.y}
                                x2={pos2.x}
                                y2={pos2.y}
                                stroke={p1.letter === 'S' ? 'rgba(194, 155, 64, 0.4)' : 'rgba(6, 182, 212, 0.4)'}
                                strokeWidth="1"
                            />
                        );
                    });
                })}

                {/* Particle spheres */}
                {particles.map((p, idx) => {
                    let targetX = p.origX;
                    let targetY = p.origY;

                    if (isHovered) {
                        const dx = p.origX * 1.3 - mousePos.x * (76 / 96);
                        const dy = p.origY * 1.0 - mousePos.y * (40 / 40);
                        const d = Math.hypot(dx, dy);
                        if (d < threshold) {
                            const force = (threshold - d) / threshold;
                            targetX = p.origX + (dx / (d || 1)) * force * forceFactor;
                            targetY = p.origY + (dy / (d || 1)) * force * forceFactor;
                        }
                    }

                    return (
                        <motion.circle
                            key={idx}
                            cx={p.origX}
                            cy={p.origY}
                            animate={{ cx: targetX, cy: targetY }}
                            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                            r={1.8}
                            fill={p.letter === 'S' ? '#c29b40' : '#06b6d4'}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

const MarketTicker = () => {
    return (
        <div className="w-full bg-tech-cyan text-slate-900 overflow-hidden py-1 border-b border-white/10 z-[60] fixed top-0">
            <motion.div 
                className="whitespace-nowrap font-mono text-[9px] font-bold tracking-widest uppercase flex gap-12"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            >
                <span>SYS_UPTIME: 99.998%</span>
                <span>GLOBAL_NODES: ONLINE</span>
                <span>BANDWIDTH: 1.2 TB/s</span>
                <span>ACTIVE_AGENTS: 1,402</span>
                <span>SEC_PROTOCOL: ENABLED</span>
                <span>PING: 12ms</span>
                {/* Duplicate for infinite seamless scroll */}
                <span>SYS_UPTIME: 99.998%</span>
                <span>GLOBAL_NODES: ONLINE</span>
                <span>BANDWIDTH: 1.2 TB/s</span>
                <span>ACTIVE_AGENTS: 1,402</span>
                <span>SEC_PROTOCOL: ENABLED</span>
                <span>PING: 12ms</span>
            </motion.div>
        </div>
    );
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCmdIdx, setSelectedCmdIdx] = useState(0);
    const [soundMuted, setSoundMuted] = useState(false);
    const [cursorTelemetry, setCursorTelemetry] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    // Settings helpers for localstorage persistence
    useEffect(() => {
        const audioSetting = localStorage.getItem('skylink_sound_enabled') !== 'false';
        const cursorSetting = localStorage.getItem('skylink_cursor_hud_enabled') !== 'false';
        setSoundMuted(!audioSetting);
        setCursorTelemetry(cursorSetting);
    }, []);

    const toggleSoundSetting = () => {
        const nextMuted = !soundMuted;
        setSoundMuted(nextMuted);
        localStorage.setItem('skylink_sound_enabled', String(!nextMuted));
        window.dispatchEvent(new CustomEvent('skylink_settings_changed', { 
            detail: { soundEnabled: !nextMuted, cursorHudEnabled: cursorTelemetry } 
        }));
    };

    const toggleCursorSetting = () => {
        const nextTelemetry = !cursorTelemetry;
        setCursorTelemetry(nextTelemetry);
        localStorage.setItem('skylink_cursor_hud_enabled', String(nextTelemetry));
        window.dispatchEvent(new CustomEvent('skylink_settings_changed', { 
            detail: { soundEnabled: !soundMuted, cursorHudEnabled: nextTelemetry } 
        }));
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Command-Line HUD searchable items
    const commands = [
        { cmd: '/home', label: 'Go to Homepage', action: 'nav', path: '/' },
        { cmd: '/property', label: 'Explore Property Services & Budgets', action: 'nav', path: '/property' },
        { cmd: '/ites', label: 'Explore ITES & Omnichannel Simulation', action: 'nav', path: '/ites' },
        { cmd: '/about', label: 'Explore About Page & Cylindrical Timeline', action: 'nav', path: '/about' },
        { cmd: '/careers', label: 'Explore Job Board & Aptitude Spider Matrix', action: 'nav', path: '/careers' },
        { cmd: '/contact', label: 'Connect with Skylink team', action: 'nav', path: '/contact' },
        { cmd: '/audio', label: `Toggle UI Acoustics Soundscape (Muted: ${soundMuted ? 'YES' : 'NO'})`, action: 'audio' },
        { cmd: '/telemetry', label: `Toggle Cursor Telemetry HUD (Active: ${cursorTelemetry ? 'YES' : 'NO'})`, action: 'telemetry' }
    ];

    const filteredCommands = commands.filter(c => 
        c.cmd.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Keyboard handlers inside Command Terminal
    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsTerminalOpen(prev => !prev);
            } else if (e.key === '/') {
                if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    setIsTerminalOpen(true);
                }
            }
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    const handleTerminalKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsTerminalOpen(false);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedCmdIdx(prev => (prev + 1) % filteredCommands.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedCmdIdx(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCommands[selectedCmdIdx]) {
                executeCommand(filteredCommands[selectedCmdIdx]);
            }
        }
    };

    const executeCommand = (cmdItem) => {
        setIsTerminalOpen(false);
        setSearchQuery('');
        if (cmdItem.action === 'nav') {
            navigate(cmdItem.path);
        } else if (cmdItem.action === 'audio') {
            toggleSoundSetting();
        } else if (cmdItem.action === 'telemetry') {
            toggleCursorSetting();
        }
    };

    const isActivePath = (path) => location.pathname === path;

    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            className="relative flex flex-col items-center justify-center text-sm font-semibold tracking-wide uppercase transition-colors group text-white/80 hover:text-skylink-gold"
        >
            {children}
            {isActivePath(to) ? (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                    <motion.div
                        layoutId="navActiveIndicator"
                        className="w-1.5 h-1.5 rounded-full bg-skylink-gold shadow-[0_0_8px_rgba(194,155,64,0.8)] z-10 relative"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                    <motion.div 
                        className="absolute w-6 h-6 rounded-full border border-skylink-gold/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                        style={{ background: 'conic-gradient(from 0deg, transparent 0%, transparent 80%, rgba(194,155,64,0.4) 100%)' }}
                    />
                </div>
            ) : (
                <span className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-skylink-gold scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_rgba(194,155,64,0.8)]" />
            )}
        </Link>
    );

    const menuItemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.3 }
        })
    };

    return (
        <>
            <MarketTicker />
            {/* FEATURE 1: HOLOGRAPHIC CAPSULE NAVBAR */}
            <motion.nav 
                className="fixed z-50 flex items-center border border-transparent"
                style={{ left: '50%' }}
                animate={{
                    top: isScrolled ? '40px' : '24px',
                    width: isScrolled ? 'calc(100% - 2rem)' : '100%',
                    maxWidth: isScrolled ? '1024px' : '100%',
                    x: '-50%',
                    borderRadius: isScrolled ? '9999px' : '0px',
                    backgroundColor: isScrolled ? 'rgba(15, 23, 42, 0.75)' : 'rgba(15, 23, 42, 0)',
                    backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
                    boxShadow: isScrolled ? '0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 25px rgba(6, 182, 212, 0.15)' : 'none',
                    borderColor: isScrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0)',
                    height: isScrolled ? '56px' : '80px',
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
                {/* Bottom border glow line for full-width view */}
                {!isScrolled && (
                    <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-skylink-gold/50 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />
                )}

                <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex justify-between items-center h-full">
                    {/* Logo Area */}
                    <div className="flex items-center">
                        <Link to="/" className="group relative z-10 flex items-center">
                            <LogoParticleContainer />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/">Home</NavLink>

                        {/* Mega Menu Trigger */}
                        <div className="relative group flex flex-col items-center justify-center h-full py-4"
                            onMouseEnter={() => setActiveDropdown('services')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center text-sm font-semibold tracking-wide uppercase transition-colors focus:outline-none group text-white/80 hover:text-skylink-gold">
                                Services
                                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                            </button>
                            <span className={`absolute bottom-0 w-1.5 h-1.5 rounded-full bg-skylink-gold transition-transform duration-300 shadow-[0_0_8px_rgba(194,155,64,0.8)] ${activeDropdown === 'services' ? 'scale-100' : 'scale-0'}`} />

                            {/* Mega Menu Dropdown */}
                            <AnimatePresence>
                                {activeDropdown === 'services' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scaleY: 0.95, transformOrigin: "top" }}
                                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                        exit={{ opacity: 0, y: 15, scaleY: 0.95 }}
                                        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                                        className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-[800px] bg-slate-950/95 backdrop-blur-2xl rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-skylink-blue via-tech-cyan to-skylink-gold" />
                                        
                                        {/* Grid layout with left previews and right text */}
                                        <div className="grid grid-cols-2 gap-0 relative z-10 divide-x divide-white/5">
                                            
                                            {/* Property Services Column */}
                                            <motion.div custom={0} variants={menuItemVariants} initial="hidden" animate="visible" className="p-4">
                                                <Link
                                                    to="/property"
                                                    className="group/item relative flex flex-col p-5 rounded-xl hover:bg-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-skylink-gold/50"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-skylink-gold/5 to-transparent opacity-0 group-hover/item:opacity-100 rounded-xl transition-opacity duration-500" />
                                                    
                                                    {/* Miniature SVG Preview */}
                                                    <div className="h-32 mb-4 rounded-lg bg-slate-900/50 border border-white/5 flex items-center justify-center overflow-hidden relative">
                                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-skylink-gold/10 via-slate-900/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                                                        <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-skylink-gold stroke-[1.5] fill-none group-hover/item:stroke-white transition-colors duration-500 relative z-10">
                                                            <motion.path 
                                                               d="M10,90 L90,90 L90,40 L50,10 L10,40 Z"
                                                               initial={{ pathLength: 0 }}
                                                               animate={{ pathLength: 1 }}
                                                               transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
                                                            />
                                                            <path d="M30,90 L30,50 L70,50 L70,90 M40,90 L40,65 L60,65 L60,90" className="opacity-40 group-hover/item:opacity-80 transition-opacity" />
                                                        </svg>
                                                    </div>

                                                    <div className="flex items-center mb-2 relative z-10">
                                                        <div className="p-2.5 bg-skylink-gold/10 rounded-lg mr-3 group-hover/item:bg-skylink-gold group-hover/item:shadow-[0_0_15px_rgba(194,155,64,0.5)] transition-all">
                                                            <Building className="w-5 h-5 text-skylink-gold group-hover/item:text-slate-900" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-white text-lg group-hover/item:text-skylink-gold transition-colors">Property Services</h3>
                                                            <p className="text-[10px] text-skylink-gold/70 uppercase font-mono tracking-widest mt-0.5">Physical Asset Lifecycle</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-slate-400 leading-relaxed mt-2 relative z-10">Interactive 3D structural preservation, maintenance, and rehab dashboards for asset managers.</p>
                                                </Link>
                                            </motion.div>

                                            {/* ITES Services Column */}
                                            <motion.div custom={1} variants={menuItemVariants} initial="hidden" animate="visible" className="p-4">
                                                <Link
                                                    to="/ites"
                                                    className="group/item relative flex flex-col p-5 rounded-xl hover:bg-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-tech-cyan/50"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-tech-cyan/5 to-transparent opacity-0 group-hover/item:opacity-100 rounded-xl transition-opacity duration-500" />
                                                    
                                                    {/* Miniature SVG Preview */}
                                                    <div className="h-32 mb-4 rounded-lg bg-slate-900/50 border border-white/5 flex items-center justify-center overflow-hidden relative">
                                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-tech-cyan/10 via-slate-900/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                                                        <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-tech-cyan stroke-[1.5] fill-none group-hover/item:stroke-white transition-colors duration-500 relative z-10">
                                                            <motion.circle cx="50" cy="50" r="15" 
                                                               animate={{ scale: [1, 1.25, 1], opacity: [0.3, 1, 0.3] }}
                                                               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                            />
                                                            <path d="M50,35 L50,10 M50,65 L50,90 M35,50 L10,50 M65,50 L90,50" className="opacity-40 group-hover/item:opacity-80 transition-opacity" />
                                                            <circle cx="50" cy="10" r="4" className="fill-tech-cyan group-hover/item:fill-white transition-colors" />
                                                            <circle cx="50" cy="90" r="4" className="fill-tech-cyan group-hover/item:fill-white transition-colors" />
                                                            <circle cx="10" cy="50" r="4" className="fill-tech-cyan group-hover/item:fill-white transition-colors" />
                                                            <circle cx="90" cy="50" r="4" className="fill-tech-cyan group-hover/item:fill-white transition-colors" />
                                                        </svg>
                                                    </div>

                                                    <div className="flex items-center mb-2 relative z-10">
                                                        <div className="p-2.5 bg-tech-cyan/10 rounded-lg mr-3 group-hover/item:bg-tech-cyan group-hover/item:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
                                                            <Monitor className="w-5 h-5 text-tech-cyan group-hover/item:text-slate-900" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-white text-lg group-hover/item:text-tech-cyan transition-colors">ITES & BPO</h3>
                                                            <p className="text-[10px] text-tech-cyan/70 uppercase font-mono tracking-widest mt-0.5">Digital Process Outsourcing</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-slate-400 leading-relaxed mt-2 relative z-10">Scalable data pipeline visualizations, simulated omnichannel hubs, and global load balancer analytics.</p>
                                                </Link>
                                            </motion.div>
                                        </div>
                                        
                                        {/* Bottom Terminal Hint */}
                                        <div className="bg-slate-900/60 p-3 text-center border-t border-white/5">
                                            <p className="text-[10px] text-slate-500 font-mono flex items-center justify-center gap-2">
                                                <Terminal size={12} className="text-skylink-blue" />
                                                USE <span>↑</span><span>↓</span> OR <kbd className="px-1 py-0.5 bg-slate-800 rounded">TAB</kbd> FOR KEYBOARD NAVIGATION
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mega Menu Trigger for ABOUT */}
                        <div className="relative group flex flex-col items-center justify-center h-full py-4"
                            onMouseEnter={() => setActiveDropdown('about')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center text-sm font-semibold tracking-wide uppercase transition-colors focus:outline-none group text-white/80 hover:text-skylink-gold">
                                About
                                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                            </button>
                            <span className={`absolute bottom-0 w-1.5 h-1.5 rounded-full bg-skylink-gold transition-transform duration-300 shadow-[0_0_8px_rgba(194,155,64,0.8)] ${activeDropdown === 'about' ? 'scale-100' : 'scale-0'}`} />

                            <AnimatePresence>
                                {activeDropdown === 'about' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scaleY: 0.95, transformOrigin: "top" }}
                                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                        exit={{ opacity: 0, y: 15, scaleY: 0.95 }}
                                        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                                        className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-[400px] bg-slate-950/95 backdrop-blur-2xl rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-skylink-blue via-tech-cyan to-skylink-gold" />
                                        
                                        <div className="p-4 flex flex-col gap-2">
                                            <Link
                                                to="/about"
                                                className="group/item relative flex items-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                <div className="p-2.5 bg-skylink-blue/10 rounded-lg mr-4 group-hover/item:bg-skylink-blue transition-all">
                                                    <Globe className="w-5 h-5 text-skylink-blue group-hover/item:text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-md group-hover/item:text-skylink-blue transition-colors">Global Footprint</h3>
                                                    <p className="text-xs text-slate-400 mt-1">Explore our Live Operations Map.</p>
                                                </div>
                                            </Link>

                                            <Link
                                                to="/about"
                                                className="group/item relative flex items-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                <div className="p-2.5 bg-tech-cyan/10 rounded-lg mr-4 group-hover/item:bg-tech-cyan transition-all">
                                                    <Target className="w-5 h-5 text-tech-cyan group-hover/item:text-slate-900" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-md group-hover/item:text-tech-cyan transition-colors">Our History</h3>
                                                    <p className="text-xs text-slate-400 mt-1">A decade of continuous innovation.</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mega Menu Trigger for CAREERS */}
                        <div className="relative group flex flex-col items-center justify-center h-full py-4"
                            onMouseEnter={() => setActiveDropdown('careers')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center text-sm font-semibold tracking-wide uppercase transition-colors focus:outline-none group text-white/80 hover:text-skylink-gold">
                                Careers
                                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${activeDropdown === 'careers' ? 'rotate-180' : ''}`} />
                            </button>
                            <span className={`absolute bottom-0 w-1.5 h-1.5 rounded-full bg-skylink-gold transition-transform duration-300 shadow-[0_0_8px_rgba(194,155,64,0.8)] ${activeDropdown === 'careers' ? 'scale-100' : 'scale-0'}`} />

                            <AnimatePresence>
                                {activeDropdown === 'careers' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scaleY: 0.95, transformOrigin: "top" }}
                                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                        exit={{ opacity: 0, y: 15, scaleY: 0.95 }}
                                        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                                        className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-[400px] bg-slate-950/95 backdrop-blur-2xl rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-skylink-blue via-tech-cyan to-skylink-gold" />
                                        
                                        <div className="p-4">
                                            <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-skylink-gold/10 to-transparent border border-skylink-gold/20 flex flex-col items-center justify-center text-center">
                                                <div className="relative w-full h-12 flex items-center justify-center mb-2 overflow-hidden rounded-lg bg-slate-900">
                                                    <motion.div 
                                                        className="absolute inset-0 bg-skylink-gold/20"
                                                        animate={{ x: ['-100%', '100%'] }}
                                                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                                    />
                                                    <span className="font-mono text-xs font-bold text-skylink-gold relative z-10 tracking-widest">ACTIVELY RECRUITING: 42 ROLES</span>
                                                </div>
                                            </div>

                                            <Link
                                                to="/careers"
                                                className="group/item relative flex items-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                <div className="p-2.5 bg-skylink-gold/10 rounded-lg mr-4 group-hover/item:bg-skylink-gold transition-all">
                                                    <Users className="w-5 h-5 text-skylink-gold group-hover/item:text-slate-900" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-md group-hover/item:text-skylink-gold transition-colors">Join The Roster</h3>
                                                    <p className="text-xs text-slate-400 mt-1">See open positions and our unique culture.</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <a
                            href="http://76.13.221.43:8083"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative flex flex-col items-center justify-center text-sm font-semibold tracking-wide uppercase transition-colors group text-white/80 hover:text-skylink-gold"
                        >
                            Login
                            <span className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-skylink-gold scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_rgba(194,155,64,0.8)]" />
                        </a>

                        {/* Interactive UI settings toggles & HUD Search */}
                        <div className="flex items-center space-x-3 border-l border-white/10 pl-6">
                            {/* Search Prompt trigger */}
                            <button 
                                onClick={() => setIsTerminalOpen(true)}
                                className="p-2 rounded-full text-slate-400 hover:text-white transition-colors relative group"
                                aria-label="Open CLI Terminal"
                            >
                                <Search size={16} />
                                <span className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-slate-900 text-[9px] font-mono px-2 py-1 rounded text-white border border-white/10 whitespace-nowrap">
                                    Search (/)
                                </span>
                            </button>

                            {/* Sound Synth trigger */}
                            <button 
                                onClick={toggleSoundSetting}
                                className="p-2 rounded-full text-slate-400 hover:text-white transition-colors relative group"
                                aria-label="Toggle UI acoustics"
                            >
                                {soundMuted ? <VolumeX size={16} className="text-red-400/80" /> : <Volume2 size={16} className="text-tech-cyan" />}
                                <span className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-slate-900 text-[9px] font-mono px-2 py-1 rounded text-white border border-white/10 whitespace-nowrap">
                                    {soundMuted ? "Acoustics Off" : "Acoustics On"}
                                </span>
                            </button>

                            {/* Telemetry settings toggle */}
                            <button 
                                onClick={toggleCursorSetting}
                                className="p-2 rounded-full text-slate-400 hover:text-white transition-colors relative group"
                                aria-label="Toggle telemetry"
                            >
                                <Settings size={16} className={cursorTelemetry ? "text-skylink-gold" : ""} />
                                <span className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-slate-900 text-[9px] font-mono px-2 py-1 rounded text-white border border-white/10 whitespace-nowrap">
                                    {cursorTelemetry ? "HUD Cursor On" : "HUD Cursor Off"}
                                </span>
                            </button>
                        </div>

                        {/* Contact Us button */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/contact"
                                className="px-5 py-2.5 rounded-full font-bold text-xs bg-gradient-to-r from-skylink-blue to-tech-cyan text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all shadow-md"
                            >
                                Contact Us
                            </Link>
                        </motion.div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white focus:outline-none p-2 transition-colors relative"
                            whileTap={{ scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                                        <Menu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: '-100%' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '-100%' }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="md:hidden fixed inset-x-0 top-0 h-screen z-40 pt-20 px-6 flex flex-col bg-slate-950/95 backdrop-blur-2xl overflow-y-auto"
                        >
                            {/* Decorative background gradients */}
                            <div className="absolute top-1/4 -right-20 w-64 h-64 rounded-full bg-tech-cyan/10 blur-3xl -z-10" />
                            <div className="absolute bottom-1/4 -left-20 w-48 h-48 rounded-full bg-skylink-gold/10 blur-3xl -z-10" />

                            <nav className="flex flex-col space-y-2 mt-8 z-10 relative">
                                {[
                                    { to: '/', label: 'Home', icon: null },
                                    { to: '/property', label: 'Property Services', icon: Building, color: 'text-skylink-gold' },
                                    { to: '/ites', label: 'ITES & BPO', icon: Monitor, color: 'text-tech-cyan' },
                                    { to: '/about', label: 'About Us', icon: null },
                                    { to: '/careers', label: 'Careers', icon: null },
                                    { isExternal: true, href: 'http://76.13.221.43:8083', label: 'Login', icon: null }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.to || item.href}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                    >
                                        {item.isExternal ? (
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center text-lg font-semibold py-3 border-b border-white/5 text-white hover:text-skylink-gold"
                                            >
                                                {item.icon && <item.icon className={`mr-3 ${item.color}`} size={20} />}
                                                <span>{item.label}</span>
                                                <ArrowRight className="ml-auto w-4 h-4 text-skylink-gold" />
                                            </a>
                                        ) : (
                                            <Link
                                                to={item.to}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`flex items-center text-lg font-semibold py-3 border-b border-white/5 transition-all group ${isActivePath(item.to) ? 'text-skylink-gold' : 'text-white'
                                                    }`}
                                            >
                                                {item.icon && <item.icon className={`mr-3 ${item.color}`} size={20} />}
                                                <span>{item.label}</span>
                                                {isActivePath(item.to) && (
                                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-skylink-gold" />
                                                )}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="mt-auto mb-10 pt-8">
                                <Link
                                    to="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full bg-gradient-to-r from-skylink-blue to-tech-cyan text-white text-center py-3.5 rounded-full font-bold shadow-lg"
                                >
                                    Contact Us
                                </Link>
                                <div className="flex justify-center space-x-6 mt-6">
                                    <button 
                                        onClick={() => { setIsMobileMenuOpen(false); setIsTerminalOpen(true); }}
                                        className="text-xs text-slate-400 flex items-center gap-1 hover:text-white"
                                    >
                                        <Search size={14} /> Search Hub
                                    </button>
                                    <button 
                                        onClick={toggleSoundSetting} 
                                        className="text-xs text-slate-400 flex items-center gap-1 hover:text-white"
                                    >
                                        {soundMuted ? <VolumeX size={14} /> : <Volume2 size={14} />} UI Sound
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* FEATURE 3: COMMAND-LINE HUD SEARCH OVERLAY */}
            <AnimatePresence>
                {isTerminalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="w-full max-w-2xl bg-slate-950/90 border border-white/10 rounded-2xl shadow-3xl overflow-hidden p-6 relative"
                            onKeyDown={handleTerminalKeyDown}
                        >
                            {/* Cybernetic details */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-skylink-blue via-tech-cyan to-skylink-gold" />
                            <div className="absolute top-2 right-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
                                SECURE TERMINAL
                            </div>

                            {/* Header search bar */}
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                                <Terminal className="text-tech-cyan w-5 h-5 shrink-0" />
                                <span className="font-mono text-slate-400 select-none">&gt;</span>
                                <input
                                    type="text"
                                    placeholder="Enter directory commands (e.g. /home, /audio)..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setSelectedCmdIdx(0);
                                    }}
                                    autoFocus
                                    className="w-full bg-transparent border-none outline-none text-white font-mono text-base placeholder:text-slate-600 focus:ring-0 p-0"
                                />
                                <button 
                                    onClick={() => setIsTerminalOpen(false)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Command Results */}
                            <div className="max-h-72 overflow-y-auto pr-1 flex flex-col gap-1.5 scrollbar-hide">
                                {filteredCommands.length > 0 ? (
                                    filteredCommands.map((c, idx) => {
                                        const isSelected = idx === selectedCmdIdx;
                                        return (
                                            <div
                                                key={c.cmd}
                                                onClick={() => executeCommand(c)}
                                                onMouseEnter={() => setSelectedCmdIdx(idx)}
                                                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all duration-150 font-mono ${
                                                    isSelected 
                                                        ? 'bg-white/5 border-tech-cyan/40 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                                                        : 'bg-transparent border-transparent text-slate-400'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`font-semibold ${isSelected ? 'text-tech-cyan' : 'text-slate-300'}`}>
                                                        {c.cmd}
                                                    </span>
                                                    <span className="text-xs text-slate-400 select-none">|</span>
                                                    <span className="text-xs">
                                                        {c.label}
                                                    </span>
                                                </div>
                                                {isSelected && (
                                                    <span className="text-[10px] bg-tech-cyan/10 border border-tech-cyan/20 px-2 py-0.5 rounded text-tech-cyan uppercase font-bold text-xxs tracking-wider">
                                                        Execute
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="p-8 text-center font-mono text-slate-500 text-sm">
                                        No telemetry match for search query.
                                    </div>
                                )}
                            </div>

                            {/* Help Footer */}
                            <div className="border-t border-white/10 pt-4 mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
                                <div>
                                    Use <span className="text-slate-300 font-semibold">↑↓</span> to navigate, <span className="text-slate-300 font-semibold">Enter</span> to execute
                                </div>
                                <div>
                                    <span className="text-slate-300 font-semibold">ESC</span> to exit
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
