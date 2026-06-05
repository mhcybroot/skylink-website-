import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ============================================
// FEATURE 14: INTERACTIVE CURSOR HUD TELEMETRY RING
// FEATURE 2: CYBERNETIC NEURAL NETWORK CURSOR TRAIL
// ============================================

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [cursorVariant, setCursorVariant] = useState('default');
    const [cursorText, setCursorText] = useState('');
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [hudEnabled, setHudEnabled] = useState(true);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    // Smooth spring animation for trailing HUD delay
    const springConfig = { damping: 24, stiffness: 280, mass: 0.45 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    const canvasRef = useRef(null);

    // Watch settings persistence
    useEffect(() => {
        setHudEnabled(localStorage.getItem('skylink_cursor_hud_enabled') !== 'false');

        const checkSettings = () => {
            setHudEnabled(localStorage.getItem('skylink_cursor_hud_enabled') !== 'false');
        };

        window.addEventListener('skylink_settings_changed', checkSettings);
        return () => window.removeEventListener('skylink_settings_changed', checkSettings);
    }, []);

    // Physics trail loop
    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        let points = [];
        const maxPoints = 25;

        const onMouseMove = (e) => {
            points.push({
                x: e.clientX,
                y: e.clientY,
                age: 0,
                vx: (Math.random() - 0.5) * 1.6,
                vy: (Math.random() - 0.5) * 1.6
            });
        };
        window.addEventListener('mousemove', onMouseMove);

        let animationFrameId;
        const tick = () => {
            ctx.clearRect(0, 0, width, height);

            // Read theme colors from root CSS custom properties
            const rootStyle = getComputedStyle(document.documentElement);
            const primaryColor = rootStyle.getPropertyValue('--tech-cyan').trim() || '#06b6d4';
            const secondaryColor = rootStyle.getPropertyValue('--skylink-gold').trim() || '#c29b40';

            // Update & draw trail points
            points = points.filter(p => p.age < maxPoints);

            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                p.age += 1;
                p.x += p.vx;
                p.y += p.vy;

                const opacity = 1 - p.age / maxPoints;

                // Draw point dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.8 * opacity, 0, Math.PI * 2);
                ctx.fillStyle = i % 2 === 0 ? primaryColor : secondaryColor;
                ctx.globalAlpha = opacity * 0.6;
                ctx.fill();

                // Draw network trace connectors
                if (i < points.length - 1) {
                    const next = points[i + 1];
                    const dist = Math.hypot(p.x - next.x, p.y - next.y);
                    if (dist < 45) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(next.x, next.y);
                        ctx.strokeStyle = primaryColor;
                        ctx.lineWidth = 0.6 * opacity;
                        ctx.globalAlpha = opacity * 0.2;
                        ctx.stroke();
                    }
                }
            }

            ctx.globalAlpha = 1.0;
            animationFrameId = requestAnimationFrame(tick);
        };
        animationFrameId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        setIsVisible(true);

        const handleMouseMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setCoords({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        const addHoverListeners = () => {
            document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach(el => {
                el.addEventListener('mouseenter', () => setCursorVariant('link'));
                el.addEventListener('mouseleave', () => setCursorVariant('default'));
            });

            document.querySelectorAll('img, canvas, .project-card-image').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    setCursorVariant('image');
                    setCursorText('VIEW');
                });
                el.addEventListener('mouseleave', () => {
                    setCursorVariant('default');
                    setCursorText('');
                });
            });

            document.querySelectorAll('[data-cursor]').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    setCursorVariant(el.dataset.cursor || 'default');
                    setCursorText(el.dataset.cursorText || '');
                });
                el.addEventListener('mouseleave', () => {
                    setCursorVariant('default');
                    setCursorText('');
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        addHoverListeners();

        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    const dotVariants = {
        default: {
            width: 8,
            height: 8,
            backgroundColor: 'var(--tech-cyan, #06b6d4)',
            boxShadow: '0 0 10px var(--tech-cyan, rgba(6, 182, 212, 0.8))',
        },
        link: {
            width: 12,
            height: 12,
            backgroundColor: 'var(--skylink-gold, #c29b40)',
            boxShadow: '0 0 12px var(--skylink-gold, rgba(194, 155, 64, 0.8))',
        },
        image: {
            width: 64,
            height: 64,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid var(--tech-cyan, rgba(6, 182, 212, 0.4))',
            boxShadow: '0 0 15px var(--tech-cyan, rgba(6, 182, 212, 0.2))',
        }
    };

    const hudColor = cursorVariant === 'link' ? 'var(--skylink-gold, #c29b40)' : 'var(--tech-cyan, #06b6d4)';

    return (
        <>
            {/* Full-screen Trail Canvas */}
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9997]" />

            {/* Center Pointer Dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center font-mono text-[9px] font-bold text-white tracking-wider"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={cursorVariant}
                variants={dotVariants}
                transition={{ type: 'spring', stiffness: 600, damping: 30 }}
            >
                {cursorVariant === 'image' && cursorText}
            </motion.div>

            {/* Trailing HUD Telemetry Ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: cursorVariant === 'link' ? 44 : cursorVariant === 'image' ? 84 : 28,
                    height: cursorVariant === 'link' ? 44 : cursorVariant === 'image' ? 84 : 28,
                    opacity: 1
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                {/* Rotating Dashed Circle */}
                <div 
                    className="absolute inset-0 rounded-full border border-dashed transition-colors duration-300"
                    style={{ 
                        borderColor: hudColor,
                        animation: cursorVariant === 'link' 
                            ? 'spin 3s linear infinite' 
                            : 'spin 8s linear infinite'
                    }}
                />

                {/* Outer Targeting Tick Lines */}
                <div className="absolute inset-[-4px] pointer-events-none">
                    {/* Top vertical tick */}
                    <div 
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[4px] transition-colors duration-300"
                        style={{ backgroundColor: hudColor }}
                    />
                    {/* Bottom vertical tick */}
                    <div 
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-[4px] transition-colors duration-300"
                        style={{ backgroundColor: hudColor }}
                    />
                    {/* Left horizontal tick */}
                    <div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[1px] transition-colors duration-300"
                        style={{ backgroundColor: hudColor }}
                    />
                    {/* Right horizontal tick */}
                    <div 
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-[4px] h-[1px] transition-colors duration-300"
                        style={{ backgroundColor: hudColor }}
                    />
                </div>

                {/* Real-time coordinates HUD readout overlay */}
                {hudEnabled && cursorVariant !== 'image' && (
                    <div 
                        className="absolute left-8 top-1 flex flex-col font-mono text-[7px] pointer-events-none bg-slate-950/70 border border-white/5 px-1 rounded transition-colors duration-300"
                        style={{ color: hudColor, borderColor: hudColor }}
                    >
                        <span className="leading-none py-0.5">X:{coords.x}</span>
                        <span className="leading-none py-0.5">Y:{coords.y}</span>
                    </div>
                )}
            </motion.div>

            {/* Global style to inject cursor override */}
            <style>{`
                * {
                    cursor: none !important;
                }
                a, button, [role="button"], input, select, textarea {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
};

export default CustomCursor;
