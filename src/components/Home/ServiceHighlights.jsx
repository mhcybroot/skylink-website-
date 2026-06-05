import { useRef, useState, useMemo } from 'react';
import { motion, useInView, motionValue, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ArrowRight, Building, Monitor, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import propertyBg from '../../assets/Photos/DSC05810.jpg';
import techBg from '../../assets/Photos/DSC05839.jpg';

const HouseModel = ({ isHovered }) => {
    const meshRef = useRef();

    useFrame(({ clock }) => {
        if (meshRef.current) {
            const time = clock.getElapsedTime();
            meshRef.current.rotation.y = time * 0.2;
            if (isHovered) {
                meshRef.current.rotation.y = time * 0.7;
                meshRef.current.position.y = Math.sin(time * 3) * 0.08;
                meshRef.current.scale.setScalar(1.1);
            } else {
                meshRef.current.position.y = 0;
                meshRef.current.scale.setScalar(1.0);
            }
        }
    });

    return (
        <group ref={meshRef} position={[0, -0.1, 0]}>
            {/* Base */}
            <mesh position={[0, -0.25, 0]}>
                <boxGeometry args={[1.2, 0.7, 1.0]} />
                <meshStandardMaterial color="#c29b40" wireframe roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Roof */}
            <mesh position={[0, 0.4, 0]} rotation={[0, Math.PI / 4, 0]}>
                <coneGeometry args={[0.95, 0.6, 4]} />
                <meshStandardMaterial color="#06b6d4" wireframe roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Chimney */}
            <mesh position={[0.25, 0.25, 0.2]}>
                <boxGeometry args={[0.12, 0.35, 0.12]} />
                <meshStandardMaterial color="#ffffff" wireframe />
            </mesh>
            {/* Active 3D Bounding Coordinate Box Overlay */}
            {isHovered && (
                <mesh position={[0, 0.05, 0]}>
                    <boxGeometry args={[1.5, 1.3, 1.3]} />
                    <meshBasicMaterial 
                        color="#c29b40" 
                        wireframe 
                        transparent 
                        opacity={0.35} 
                        blending={THREE.AdditiveBlending} 
                    />
                </mesh>
            )}
        </group>
    );
};

const ServerNetworkModel = ({ isHovered }) => {
    const groupRef = useRef();
    
    const nodes = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 8; i++) {
            temp.push({
                pos: [
                    (Math.random() - 0.5) * 1.5,
                    (Math.random() - 0.5) * 1.2,
                    (Math.random() - 0.5) * 1.2
                ],
                scale: Math.random() * 0.05 + 0.03
            });
        }
        return temp;
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const time = clock.getElapsedTime();
            groupRef.current.rotation.y = time * 0.15;
            groupRef.current.rotation.x = time * 0.08;
            
            if (isHovered) {
                groupRef.current.rotation.y = time * 0.5;
                groupRef.current.scale.setScalar(1.15);
            } else {
                groupRef.current.scale.setScalar(1.0);
            }
        }
    });

    return (
        <group ref={groupRef}>
            {nodes.map((node, i) => (
                <mesh key={i} position={node.pos}>
                    <sphereGeometry args={[node.scale, 8, 8]} />
                    <meshBasicMaterial color={isHovered ? "#06b6d4" : "#ffffff"} />
                </mesh>
            ))}
            <mesh>
                <sphereGeometry args={[0.7, 10, 10]} />
                <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.4} />
            </mesh>
            {/* Active 3D Bounding Coordinate Box Overlay */}
            {isHovered && (
                <mesh>
                    <boxGeometry args={[1.8, 1.6, 1.6]} />
                    <meshBasicMaterial 
                        color="#06b6d4" 
                        wireframe 
                        transparent 
                        opacity={0.35} 
                        blending={THREE.AdditiveBlending} 
                    />
                </mesh>
            )}
        </group>
    );
};

const IsometricExplodedPillar = ({ type, isHovered }) => {
    const layers = type === 'property' ? [
        { title: "Client Portal & Handover", kpi: "24/7 Monitoring", color: "border-skylink-gold text-skylink-gold" },
        { title: "Renovation & Dev", kpi: "+15% Value", color: "border-white text-white" },
        { title: "Asset Preservation", kpi: "99.8% Compliance", color: "border-tech-cyan text-tech-cyan" }
    ] : [
        { title: "Omnichannel CX", kpi: "CSAT 4.8/5.0", color: "border-tech-cyan text-tech-cyan" },
        { title: "Process Automation", kpi: "-40% Handled Time", color: "border-white text-white" },
        { title: "Cloud Infrastructure", kpi: "99.99% Uptime", color: "border-skylink-gold text-skylink-gold" }
    ];

    return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-visible z-30 pointer-events-none">
            <div 
                className="relative w-64 h-64 flex items-center justify-center transition-transform duration-700"
                style={{ 
                    perspective: '1200px', 
                    transformStyle: 'preserve-3d',
                }}
            >
                <div 
                    className="relative w-48 h-28 transition-transform duration-700"
                    style={{ 
                        transform: 'rotateX(60deg) rotateZ(-45deg)', 
                        transformStyle: 'preserve-3d' 
                    }}
                >
                    {layers.map((layer, idx) => {
                        const zOffset = isHovered 
                            ? (2 - idx) * 75 - 20 
                            : (2 - idx) * 20 - 10;
                        
                        return (
                            <div
                                key={idx}
                                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md border rounded-xl p-2.5 flex flex-col justify-between transition-all duration-700 shadow-2xl"
                                style={{
                                    transform: `translateZ(${zOffset}px)`,
                                    transformStyle: 'preserve-3d',
                                    boxShadow: isHovered 
                                        ? '0 20px 30px rgba(0,0,0,0.6), inset 0 0 15px rgba(6,182,212,0.2)' 
                                        : '0 5px 15px rgba(0,0,0,0.4)',
                                    borderColor: type === 'property' ? 'rgba(194, 155, 64, 0.4)' : 'rgba(6, 182, 212, 0.4)'
                                }}
                            >
                                <div className="transform translate-z-[10px]" style={{ transformStyle: 'preserve-3d' }}>
                                    <div className="text-[8px] font-mono uppercase tracking-widest text-slate-400">
                                        Layer 0{3 - idx}
                                    </div>
                                    <div className="text-[11px] font-bold text-white mt-0.5 leading-tight">
                                        {layer.title}
                                    </div>
                                </div>
                                <div className="text-right mt-1 transform translate-z-[15px]" style={{ transformStyle: 'preserve-3d' }}>
                                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 border ${layer.color}`}>
                                        {layer.kpi}
                                    </span>
                                </div>
                                
                                {isHovered && idx < 2 && (
                                    <div 
                                        className="absolute w-px border-l border-dashed border-tech-cyan/40"
                                        style={{
                                            height: '75px',
                                            bottom: '-75px',
                                            left: '15%',
                                            transform: 'rotateX(-90deg) translateZ(37.5px) translateY(-37.5px)',
                                        }}
                                    />
                                )}
                                {isHovered && idx < 2 && (
                                    <div 
                                        className="absolute w-px border-l border-dashed border-skylink-gold/40"
                                        style={{
                                            height: '75px',
                                            bottom: '-75px',
                                            right: '15%',
                                            transform: 'rotateX(-90deg) translateZ(37.5px) translateY(-37.5px)',
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const Service3DCanvas = ({ type, isHovered }) => {
    return (
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[5, 5, 5]} intensity={1.5} color={type === 'property' ? '#c29b40' : '#06b6d4'} />
                {type === 'property' ? (
                    <HouseModel isHovered={isHovered} />
                ) : (
                    <ServerNetworkModel isHovered={isHovered} />
                )}
                {/* Holographic floor grid overlay */}
                {isHovered && (
                    <gridHelper 
                        args={[4, 12, type === 'property' ? '#c29b40' : '#06b6d4', 'rgba(255, 255, 255, 0.08)']} 
                        position={[0, -0.95, 0]} 
                    />
                )}
            </Canvas>
        </div>
    );
};

const TiltCard = ({ children, index, isInView }) => {
    const cardRef = useRef(null);
    const x = motionValue(0);
    const y = motionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Parallax translations for background cover image (opposite to mouse)
    const imgX = useTransform(x, [-0.5, 0.5], ["12px", "-12px"]);
    const imgY = useTransform(y, [-0.5, 0.5], ["12px", "-12px"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
        })
    };

    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={cardRef}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                handleMouseLeave();
                setIsHovered(false);
            }}
            onMouseEnter={() => setIsHovered(true)}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="perspective-1000 w-full"
        >
            <div className="group relative bg-skylink-navy/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:shadow-2xl hover:shadow-tech-cyan/20 transition-all duration-500 h-full">
                {/* Glare effect */}
                <motion.div 
                    className="absolute inset-0 pointer-events-none z-30"
                    style={{
                        background: useTransform(
                            [x, y],
                            ([latestX, latestY]) => `radial-gradient(circle at ${(latestX + 0.5) * 100}% ${(latestY + 0.5) * 100}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
                        )
                    }}
                />
                {typeof children === 'function' ? children({ isHovered, imgX, imgY }) : children}
            </div>
        </motion.div>
    );
};


const ServiceHighlights = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    const services = [
        {
            vertical: '01',
            icon: Building,
            title: 'Real Estate Asset Solutions',
            description: 'End-to-end stewardship for distressed and REO properties. We restore value through precision renovation and maintenance.',
            features: ['Debris Removal', 'Value-Add Renovations', 'Compliance Checks', 'Winterization'],
            image: propertyBg,
            link: '/property',
            linkText: 'Explore Property',
            color: 'skylink-navy',
            hoverColor: 'skylink-blue',
        },
        {
            vertical: '02',
            icon: Monitor,
            title: 'Digital Strategy & Operations',
            description: 'Scalable BPO frameworks designed for high-growth enterprises. We handle the backend so you can focus on innovation.',
            features: ['Omnichannel CX', 'Data Processing', 'Workflow Dev', 'Back-Office Ops'],
            image: techBg,
            link: '/ites',
            linkText: 'Explore ITES',
            color: 'tech-cyan',
            hoverColor: 'tech-cyan',
        }
    ];

    // cardVariants moved to TiltCard

    return (
        <section ref={sectionRef} className="py-28 relative overflow-hidden bg-transparent z-10">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-200"
                >
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-skylink-gold font-bold tracking-widest text-sm uppercase mb-4">
                            <div className="w-8 h-px bg-skylink-gold" />
                            Our Verticals
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Comprehensive Solutions
                        </h2>
                        <p className="text-xl text-slate-300 font-light leading-relaxed">
                            We operate at the intersection of physical asset management and digital process optimization.
                        </p>
                    </div>
                    <motion.div whileHover={{ x: 5 }}>
                        <Link
                            to="/property"
                            className="hidden md:flex items-center text-sm font-bold text-skylink-blue uppercase tracking-widest hover:text-skylink-gold transition-colors group mt-6 md:mt-0"
                        >
                            View All Capabilities
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 perspective-1000">
                    {services.map((service, index) => (
                        <TiltCard key={index} index={index} isInView={isInView}>
                            {({ isHovered, imgX, imgY }) => (
                                <>
                                    {/* Image section */}
                                    <div className="relative h-64 overflow-hidden transform-style-3d transform translate-z-[50px]">
                                        <div className="absolute inset-0 bg-gradient-to-t from-skylink-navy via-skylink-navy/20 to-transparent z-10" />
                                        
                                        {/* 3D wireframe overlay */}
                                        <Service3DCanvas type={index === 0 ? 'property' : 'ites'} isHovered={isHovered} />

                                        {/* 3D Isometric Service Exploded Pillars */}
                                        <IsometricExplodedPillar type={index === 0 ? 'property' : 'ites'} isHovered={isHovered} />

                                        <motion.img
                                            src={service.image}
                                            alt={service.title}
                                            style={{ x: imgX, y: imgY, scale: 1.15 }}
                                            className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-45 transition-all duration-500"
                                            transition={{ duration: 0.7 }}
                                        />
                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20" />

                                        {/* Vertical badge */}
                                        <div className={`absolute top-6 left-6 z-20 bg-${service.color} text-white px-4 py-2 text-sm font-bold uppercase tracking-widest rounded-lg shadow-lg transform translate-z-[30px]`}>
                                            Vertical {service.vertical}
                                        </div>
                                    </div>

                                    {/* Content section */}
                                    <div className="p-8 transform-style-3d transform translate-z-[40px]">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className={`p-3 bg-${service.color}/10 rounded-xl group-hover:bg-${service.color} transition-colors duration-300 transform translate-z-[20px]`}>
                                                <service.icon size={32} className={`text-${service.color} group-hover:text-white transition-colors`} />
                                            </div>
                                            <motion.div
                                                animate={{ rotate: 0 }}
                                                whileHover={{ rotate: 45 }}
                                                className="p-2 transform translate-z-[20px]"
                                            >
                                                <ArrowUpRight size={24} className="text-slate-300 group-hover:text-skylink-gold transition-colors" />
                                            </motion.div>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 font-serif group-hover:text-tech-cyan transition-colors transform translate-z-[30px]">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-300 mb-6 leading-relaxed transform translate-z-[20px]">
                                            {service.description}
                                        </p>

                                        {/* Feature list */}
                                        <ul className="grid grid-cols-2 gap-3 mb-8 transform translate-z-[10px]">
                                            {service.features.map((item, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                    transition={{ delay: 0.4 + idx * 0.1 }}
                                                    className="flex items-center text-sm font-medium text-slate-300"
                                                >
                                                    <div className={`w-2 h-2 bg-${service.color} rounded-full mr-3 group-hover:animate-pulse`} />
                                                    {item}
                                                </motion.li>
                                            ))}
                                        </ul>

                                        {/* CTA Button */}
                                        <Link
                                            to={service.link}
                                            className={`inline-flex items-center justify-center w-full py-4 border-2 border-white/20 text-white font-bold uppercase text-sm tracking-widest rounded-xl hover:bg-${service.color} hover:text-white hover:border-${service.color} transition-all duration-300 group/btn transform translate-z-[30px]`}
                                        >
                                            {service.linkText}
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </>
                            )}
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceHighlights;

