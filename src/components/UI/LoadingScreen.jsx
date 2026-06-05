import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import logo from '../../assets/logo-.webp';

// FEATURE 3: 3D ICOSAHEDRON — morphing hex lattice
const MorphingShape = ({ progress }) => {
    const groupRef = useRef();
    const particlesRef = useRef();

    const hexNodes = useMemo(() => [
        [0, 0, 0], // Center core node
        [1.3, 0, 0],
        [0.65, 1.12, 0],
        [-0.65, 1.12, 0],
        [-1.3, 0, 0],
        [-0.65, -1.12, 0],
        [0.65, -1.12, 0]
    ], []);

    const scatterPositions = useMemo(() => {
        const positions = [];
        for (let i = 0; i < 200; i++) {
            positions.push(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
            );
        }
        return new Float32Array(positions);
    }, []);

    const particleSizes = useMemo(() => {
        const sizes = [];
        for (let i = 0; i < 200; i++) {
            sizes.push(Math.random() * 0.08 + 0.02);
        }
        return new Float32Array(sizes);
    }, []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        if (groupRef.current) {
            // Spin entire hex lattice grid
            groupRef.current.rotation.x = t * 0.4;
            groupRef.current.rotation.y = t * 0.5;

            // Compiling effect: contract satellites radius as progress reaches 100%
            const currentRadius = 1.5 - progress * 0.85;

            const pulse = 1 + Math.sin(t * 3.5) * 0.03;
            groupRef.current.scale.setScalar(pulse);

            // Re-position satellite nodes
            groupRef.current.children.forEach((child, index) => {
                if (index > 0 && index <= 6) {
                    const angle = ((index - 1) * Math.PI) / 3;
                    child.position.x = Math.cos(angle) * currentRadius;
                    child.position.y = Math.sin(angle) * currentRadius;
                }
            });
        }

        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                const idx = i / 3;
                const angle = t * (0.25 + idx * 0.005) + idx;
                const radius = 2 + Math.sin(t * 0.6 + idx) * 0.45;
                positions[i] = Math.cos(angle) * radius * Math.sin(idx);
                positions[i + 1] = Math.sin(angle) * radius * Math.cos(idx * 0.75);
                positions[i + 2] = Math.sin(angle + idx) * radius * 0.5;
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    const glowColor = new THREE.Color('#06b6d4');
    const goldColor = new THREE.Color('#c29b40');

    return (
        <group>
            {/* Morphing Hex Lattice Group */}
            <group ref={groupRef}>
                {hexNodes.map((pos, idx) => (
                    <group key={idx} position={pos}>
                        {/* Solid Spherical Joints */}
                        <mesh>
                            <sphereGeometry args={[idx === 0 ? 0.28 : 0.16, 16, 16]} />
                            <meshStandardMaterial
                                color={idx === 0 ? goldColor : glowColor}
                                emissive={idx === 0 ? goldColor : glowColor}
                                emissiveIntensity={0.6}
                                roughness={0.1}
                                metalness={0.9}
                            />
                        </mesh>
                        {/* Wireframe Box Envelopes */}
                        <mesh>
                            <boxGeometry args={[idx === 0 ? 0.42 : 0.26, idx === 0 ? 0.42 : 0.26, idx === 0 ? 0.42 : 0.26]} />
                            <meshBasicMaterial
                                color={idx === 0 ? glowColor : goldColor}
                                wireframe
                                transparent
                                opacity={0.6 + progress * 0.3}
                            />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Orbiting particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[scatterPositions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-size"
                        args={[particleSizes, 1]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color="#06b6d4"
                    size={0.04}
                    transparent
                    opacity={0.5}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
        </group>
    );
};

// ============================================
// LOADING SCREEN COMPONENT
// ============================================
const LoadingScreen = ({ isLoading = true, minDuration = 1500 }) => {
    const [showLoader, setShowLoader] = useState(isLoading);
    const [progress, setProgress] = useState(0);
    const [taglineIndex, setTaglineIndex] = useState(0);
    const [isExploding, setIsExploding] = useState(false);

    const taglines = [
        "Initializing Systems...",
        "Loading Assets...",
        "Building Environment...",
        "Calibrating Interface...",
        "Almost Ready...",
    ];

    useEffect(() => {
        if (!isLoading) return;

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                const remaining = 100 - prev;
                const increment = Math.min(remaining * 0.15 + 2, 18);
                return Math.min(prev + increment, 100);
            });
        }, 70);

        const taglineInterval = setInterval(() => {
            setTaglineIndex(prev => (prev + 1) % taglines.length);
        }, 700);

        const timer = setTimeout(() => {
            setIsExploding(true);
            setTimeout(() => setShowLoader(false), 500);
        }, minDuration);

        return () => {
            clearInterval(progressInterval);
            clearInterval(taglineInterval);
            clearTimeout(timer);
        };
    }, [isLoading, minDuration]);

    const normalizedProgress = Math.min(progress / 100, 1);

    return (
        <AnimatePresence>
            {showLoader && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.2,
                        filter: 'blur(20px)',
                        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
                    }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-skylink-navy"
                >
                    {/* WebGL 3D Scene */}
                    <div className="absolute inset-0">
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                            <ambientLight intensity={0.4} />
                            <pointLight position={[5, 5, 5]} intensity={1.5} color="#06b6d4" />
                            <pointLight position={[-5, -5, 3]} intensity={0.8} color="#c29b40" />
                            <MorphingShape progress={normalizedProgress} />
                        </Canvas>
                    </div>

                    {/* UI Overlay */}
                    <div className="relative z-10 flex flex-col items-center pointer-events-none">
                        {/* Brand Logo */}
                        <motion.img
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            src={logo}
                            alt="Skylink Logo"
                            className="h-16 w-auto"
                        />

                        {/* Progress Bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-10 w-72"
                        >
                            <div className="h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-skylink-gold via-tech-cyan to-skylink-gold"
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-tech-cyan blur-md"
                                    style={{ left: `${Math.min(progress, 100)}%`, transform: 'translate(-50%, -50%)' }}
                                />
                            </div>

                            {/* Tagline + Percentage */}
                            <div className="flex items-center justify-between mt-3">
                                <div className="h-4 overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={taglineIndex}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.25 }}
                                            className="text-[10px] text-slate-500 tracking-[0.15em] uppercase font-mono"
                                        >
                                            {taglines[taglineIndex]}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                                <p className="text-[10px] text-tech-cyan/60 font-mono tabular-nums">
                                    {Math.floor(Math.min(progress, 100))}%
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
