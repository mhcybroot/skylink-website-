import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// FEATURE 7: 3D TESTIMONIAL SENTIMENT SPHERE
// ============================================
const SentimentSphere = ({ activeIndex }) => {
    const groupRef = useRef();
    const coreRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const speedFactor = [1.2, 2.0, 1.0, 1.6][activeIndex] || 1.0;

        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.15 * speedFactor;
            groupRef.current.rotation.x = time * 0.08 * speedFactor;
        }

        if (coreRef.current) {
            coreRef.current.rotation.z = -time * 0.25 * speedFactor;
            // Beating pulse effect
            const pulse = 1.0 + Math.sin(time * 2.5 * speedFactor) * 0.06;
            coreRef.current.scale.setScalar(pulse);
        }
    });

    const colors = ["#c29b40", "#06b6d4", "#eab308", "#10b981"];
    const activeColor = colors[activeIndex] || "#c29b40";

    return (
        <group ref={groupRef}>
            {/* Outer wireframe shell */}
            <mesh>
                <sphereGeometry args={[1.35, 12, 12]} />
                <meshStandardMaterial 
                    color={activeColor} 
                    wireframe 
                    transparent 
                    opacity={0.3} 
                    emissive={activeColor}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Inner morphing core */}
            <mesh ref={coreRef}>
                <dodecahedronGeometry args={[0.9, 1]} />
                <meshStandardMaterial 
                    color={activeColor}
                    wireframe
                    roughness={0.1}
                    metalness={0.9}
                    emissive={activeColor}
                    emissiveIntensity={0.4}
                />
            </mesh>

            {/* Glowing envelope points */}
            <mesh position={[0, 1.35, 0]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshBasicMaterial color={activeColor} />
            </mesh>
            <mesh position={[0, -1.35, 0]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshBasicMaterial color={activeColor} />
            </mesh>
        </group>
    );
};

const SentimentSphereCanvas = ({ activeIndex }) => {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={1.5} />
                <SentimentSphere activeIndex={activeIndex} />
            </Canvas>
        </div>
    );
};

// FEATURE 5: TESTIMONIALS RATINGS PARTICLE BURST
const StarBurst = ({ activeIndex }) => {
    const particles = useMemo(() => {
        return Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI) / 4 + (Math.random() - 0.5) * 0.25;
            const distance = Math.random() * 50 + 40;
            return {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                size: Math.random() * 3 + 2,
                delay: Math.random() * 0.08
            };
        });
    }, [activeIndex]);

    return (
        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                    transition={{ duration: 0.7, delay: p.delay, ease: 'easeOut' }}
                    className="absolute bg-skylink-gold rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                    }}
                />
            ))}
        </div>
    );
};

const TestimonialEqualizer = ({ activeIndex }) => {
    const [barHeights, setBarHeights] = useState(Array(18).fill(12));
    
    useEffect(() => {
        let ticks = 0;
        const interval = setInterval(() => {
            setBarHeights(Array.from({ length: 18 }, () => Math.floor(Math.random() * 38) + 4));
            ticks++;
            if (ticks > 10) {
                clearInterval(interval);
            }
        }, 80);

        const ambientInterval = setInterval(() => {
            if (ticks > 10) {
                setBarHeights(Array.from({ length: 18 }, (_, i) => {
                    const base = 8 + Math.sin(Date.now() / 200 + i) * 6;
                    return Math.max(3, Math.floor(base + Math.random() * 4));
                }));
            }
        }, 100);

        return () => {
            clearInterval(interval);
            clearInterval(ambientInterval);
        };
    }, [activeIndex]);

    return (
        <div className="absolute bottom-2 left-0 right-0 flex items-end justify-center gap-1 h-12 z-20 pointer-events-none">
            {barHeights.map((height, i) => (
                <motion.div
                    key={i}
                    animate={{ height }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="w-1.5 rounded-full"
                    style={{
                        background: activeIndex === 0 
                            ? 'linear-gradient(to top, rgba(194, 155, 64, 0.2), #c29b40)' 
                            : activeIndex === 1
                            ? 'linear-gradient(to top, rgba(6, 182, 212, 0.2), #06b6d4)'
                            : activeIndex === 2
                            ? 'linear-gradient(to top, rgba(234, 179, 8, 0.2), #eab308)'
                            : 'linear-gradient(to top, rgba(16, 185, 129, 0.2), #10b981)'
                    }}
                />
            ))}
        </div>
    );
};

// ============================================
// TILT CARD — mouse-reactive 3D tilt on active card
// ============================================
const TiltTestimonialCard = ({ children, isActive }) => {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

    const handleMouseMove = (e) => {
        if (!isActive || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouseX.set(x / rect.width - 0.5);
        mouseY.set(y / rect.height - 0.5);

        cardRef.current.style.setProperty('--x', `${x}px`);
        cardRef.current.style.setProperty('--y', `${y}px`);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: isActive ? rotateX : 0,
                rotateY: isActive ? rotateY : 0,
                transformStyle: 'preserve-3d',
            }}
        >
            {children}
        </motion.div>
    );
};

// ============================================
// TESTIMONIALS SECTION
// ============================================
const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [dragStartX, setDragStartX] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    const testimonials = [
        {
            quote: "Skylink has been a game-changer for our REO portfolio. Their turnaround time on preservation orders is unmatched in the industry.",
            author: "Sarah Johnson",
            role: "Asset Manager",
            company: "NY Asset Corp",
            initials: "SJ",
            rating: 5,
            gradient: "from-blue-500 to-purple-600",
        },
        {
            quote: "We outsourced our entire Tier-1 support to Skylink's BPO division. The transition was seamless and CSAT scores went up 15%.",
            author: "James Chen",
            role: "CTO",
            company: "TechFlow Solutions",
            initials: "JC",
            rating: 5,
            gradient: "from-cyan-500 to-blue-600",
        },
        {
            quote: "The renovation team transformed our distressed property into a market-ready gem in just 3 weeks. Incredible efficiency.",
            author: "Michael Ross",
            role: "Investment Director",
            company: "Ross Capital",
            initials: "MR",
            rating: 5,
            gradient: "from-amber-500 to-orange-600",
        },
        {
            quote: "Their 24/7 global support model has been instrumental in improving our customer satisfaction across time zones.",
            author: "Elena Rodriguez",
            role: "VP Operations",
            company: "Global Ventures Inc",
            initials: "ER",
            rating: 5,
            gradient: "from-emerald-500 to-teal-600",
        },
    ];

    const count = testimonials.length;

    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % count);
        }, 5000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, count]);

    const navigate = useCallback((dir) => {
        setIsAutoPlaying(false);
        setActiveIndex((prev) => {
            if (dir === 'next') return (prev + 1) % count;
            return (prev - 1 + count) % count;
        });
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, [count]);

    const handleDragStart = (e) => {
        const x = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        setDragStartX(x);
    };

    const handleDragEnd = (e) => {
        const x = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
        const diff = dragStartX - x;
        if (Math.abs(diff) > 50) {
            navigate(diff > 0 ? 'next' : 'prev');
        }
    };

    const getCardStyle = (index) => {
        let offset = index - activeIndex;
        if (offset > count / 2) offset -= count;
        if (offset < -count / 2) offset += count;

        const isActive = offset === 0;
        const absOffset = Math.abs(offset);

        return {
            x: offset * 260,
            scale: isActive ? 1 : Math.max(0.72 - absOffset * 0.1, 0.45),
            rotateY: offset * -15,
            z: isActive ? 50 : -absOffset * 100,
            opacity: absOffset <= 1 ? 1 : 0.25,
            zIndex: count - absOffset,
            isActive,
        };
    };

    return (
        <section ref={sectionRef} className="py-28 bg-transparent relative overflow-hidden z-10">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-skylink-blue/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-tech-cyan/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 text-skylink-gold font-bold tracking-widest text-sm uppercase mb-4">
                        <div className="w-8 h-px bg-skylink-gold" />
                        Testimonials
                        <div className="w-8 h-px bg-skylink-gold" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">
                        Trusted by Industry Leaders
                    </h2>
                </motion.div>

                {/* Grid Layout containing Sentiment Sphere (Left) and Card Stack (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left: Sentiment Sphere column */}
                    <div className="lg:col-span-4 h-64 lg:h-[380px] relative w-full flex items-center justify-center">
                        <SentimentSphereCanvas activeIndex={activeIndex} />
                        <TestimonialEqualizer activeIndex={activeIndex} />
                    </div>

                    {/* Right: Card Stack column */}
                    <div className="lg:col-span-8">
                        <div
                            className="relative h-[400px] md:h-[350px] flex items-center justify-center perspective-1000"
                            onMouseDown={handleDragStart}
                            onMouseUp={handleDragEnd}
                            onTouchStart={handleDragStart}
                            onTouchEnd={handleDragEnd}
                            style={{ cursor: 'grab' }}
                        >
                            {testimonials.map((t, index) => {
                                const style = getCardStyle(index);

                                return (
                                    <motion.div
                                        key={index}
                                        animate={{
                                            x: style.x,
                                            scale: style.scale,
                                            rotateY: style.rotateY,
                                            opacity: style.opacity,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 200,
                                            damping: 24,
                                            mass: 0.8,
                                        }}
                                        className="absolute w-full max-w-xl px-4"
                                        style={{
                                            zIndex: style.zIndex,
                                            transformStyle: 'preserve-3d',
                                            pointerEvents: style.isActive ? 'auto' : 'none',
                                        }}
                                    >
                                        <TiltTestimonialCard isActive={style.isActive}>
                                            <div className={`glass-dark rounded-2xl shadow-xl p-6 md:p-8 border transition-all duration-500 glow-hover ${style.isActive
                                                ? 'border-skylink-gold/30 shadow-[0_0_35px_rgba(194,155,64,0.12)]'
                                                : 'border-white/5'
                                                }`}>
                                                
                                                {style.isActive && (
                                                    <StarBurst activeIndex={activeIndex} />
                                                )}

                                                {/* Quote icon */}
                                                <div className="absolute -top-5 left-8 w-10 h-10 bg-skylink-gold rounded-full flex items-center justify-center shadow-lg z-20">
                                                    <Quote size={16} className="text-white" />
                                                </div>

                                                {/* Stars */}
                                                <div className="flex gap-1 mb-4 relative">
                                                    {[...Array(t.rating)].map((_, i) => (
                                                        <Star key={i} size={15} className="text-skylink-gold fill-skylink-gold" />
                                                    ))}
                                                </div>

                                                {/* Quote text */}
                                                <blockquote className="text-base md:text-lg font-serif text-slate-200 leading-relaxed mb-6 italic">
                                                    "{t.quote}"
                                                </blockquote>

                                                {/* Author info */}
                                                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-xs shadow-lg flex-shrink-0`}>
                                                        {t.initials}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm text-white">{t.author}</h4>
                                                        <p className="text-xs text-slate-400">
                                                            {t.role}, {t.company}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Active progress */}
                                                {style.isActive && isAutoPlaying && (
                                                    <div className="absolute top-4 right-4 w-5 h-5">
                                                        <svg viewBox="0 0 24 24" className="w-full h-full -rotate-90">
                                                            <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                                                            <motion.circle
                                                                cx="12" cy="12" r="10"
                                                                fill="none"
                                                                stroke="#c29b40"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeDasharray={62.83}
                                                                initial={{ strokeDashoffset: 62.83 }}
                                                                animate={{ strokeDashoffset: 0 }}
                                                                transition={{ duration: 5, ease: 'linear' }}
                                                                key={`progress-${activeIndex}`}
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </TiltTestimonialCard>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-center gap-6 mt-8">
                    <button
                        onClick={() => navigate('prev')}
                        className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-skylink-blue transition-colors"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Navigation Dots */}
                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setActiveIndex(i);
                                    setIsAutoPlaying(false);
                                    setTimeout(() => setIsAutoPlaying(true), 10000);
                                }}
                                className={`relative h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-skylink-gold' : 'w-2 bg-white/20 hover:bg-white/40'
                                    }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => navigate('next')}
                        className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-skylink-blue transition-colors"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
