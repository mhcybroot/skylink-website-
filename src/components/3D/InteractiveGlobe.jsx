import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

const locations = [
    { 
        id: 'ny', 
        name: 'New York (HQ)', 
        lat: 40.7128, 
        lng: -74.0060, 
        color: '#c29b40',
        capacity: 'Executive HQ',
        time: 'EST',
        caps: ['Asset Management', 'Strategy Consulting']
    },
    { 
        id: 'dhk', 
        name: 'Dhaka Hub', 
        lat: 23.8103, 
        lng: 90.4125, 
        color: '#94a3b8',
        capacity: 'Operations Hub',
        time: 'BST',
        caps: ['BPO Operations', 'Technical Support']
    },
    { 
        id: 'blr', 
        name: 'Bangalore Center', 
        lat: 12.9716, 
        lng: 77.5946, 
        color: '#0ea5e9',
        capacity: 'Platform Dev',
        time: 'IST',
        caps: ['API Integration', 'Data Operations']
    },
    { 
        id: 'mnl', 
        name: 'Manila Center', 
        lat: 14.5995, 
        lng: 120.9842, 
        color: '#06b6d4',
        capacity: '150+ Support Agents',
        time: 'PST',
        caps: ['Omnichannel CX', 'Customer Experience']
    }
];

// Convert Lat/Lng to 3D Cartesian coordinates
const getCoordinates = (lat, lng, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));

    return [x, y, z];
};

const DataArc = ({ startPos, endPos }) => {
    const startVec = useMemo(() => new THREE.Vector3(...startPos), [startPos]);
    const endVec = useMemo(() => new THREE.Vector3(...endPos), [endPos]);
    
    const curvePoints = useMemo(() => {
        const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
        const distance = startVec.distanceTo(endVec);
        const arcHeight = 2.0 + distance * 0.35;
        const controlPoint = midPoint.clone().normalize().multiplyScalar(arcHeight);
        
        const curve = new THREE.QuadraticBezierCurve3(startVec, controlPoint, endVec);
        return curve.getPoints(50);
    }, [startVec, endVec]);

    const lineGeometry = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints(curvePoints);
    }, [curvePoints]);

    const particleRef = useRef();

    useFrame(({ clock }) => {
        if (particleRef.current) {
            const time = clock.getElapsedTime() * 0.5; // speed of movement
            const progress = time % 1;
            
            const pointIndex = Math.floor(progress * (curvePoints.length - 1));
            const point = curvePoints[pointIndex];
            if (point) {
                particleRef.current.position.copy(point);
            }
        }
    });

    return (
        <group>
            {/* Bezier Arc Line */}
            <line geometry={lineGeometry}>
                <lineBasicMaterial color="#06b6d4" transparent opacity={0.25} linewidth={1} />
            </line>
            
            {/* Flowing energy node */}
            <mesh ref={particleRef}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color="#c29b40" toneMapped={false} />
            </mesh>
        </group>
    );
};

const Earth = ({ activeOffice, setActiveOffice }) => {
    const earthRef = useRef();

    useFrame((state, delta) => {
        if (!earthRef.current) return;

        if (activeOffice) {
            const loc = locations.find(l => l.id === activeOffice);
            if (loc) {
                // Convert lat/lng to target y/x rotations to face the camera
                // lng is offset by 90 deg for standard alignment
                const targetY = - (loc.lng + 90) * (Math.PI / 180);
                const targetX = (loc.lat) * (Math.PI / 180);

                earthRef.current.rotation.y += (targetY - earthRef.current.rotation.y) * 0.08;
                earthRef.current.rotation.x += (targetX - earthRef.current.rotation.x) * 0.08;
                return;
            }
        }

        // Default auto rotate: reset X rotation and rotate Y
        earthRef.current.rotation.x += (0 - earthRef.current.rotation.x) * 0.05;
        earthRef.current.rotation.y += 0.005;
    });

    const radius = 2;

    return (
        <group ref={earthRef}>
            {/* Core Sphere */}
            <Sphere args={[radius, 64, 64]}>
                <meshStandardMaterial 
                    color="#0a192f" 
                    transparent 
                    opacity={0.8}
                    roughness={0.6}
                    metalness={0.8}
                    wireframe={true}
                />
            </Sphere>

            {/* Atmosphere Glow */}
            <Sphere args={[radius * 1.06, 32, 32]}>
                <meshBasicMaterial 
                    color="#06b6d4" 
                    transparent 
                    opacity={0.08} 
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>

            {/* Global Connection Arcs */}
            {locations.slice(1).map((loc) => {
                const startPos = getCoordinates(locations[0].lat, locations[0].lng, radius);
                const endPos = getCoordinates(loc.lat, loc.lng, radius);
                return (
                    <DataArc key={loc.id} startPos={startPos} endPos={endPos} />
                );
            })}

            {/* Location Markers */}
            {locations.map((loc) => {
                const [x, y, z] = getCoordinates(loc.lat, loc.lng, radius);
                const isActive = activeOffice === loc.id;
                
                return (
                    <group key={loc.id} position={[x, y, z]}>
                        <mesh 
                            onPointerOver={(e) => {
                                e.stopPropagation();
                                if (setActiveOffice) setActiveOffice(loc.id);
                            }}
                            onPointerOut={(e) => {
                                e.stopPropagation();
                                if (setActiveOffice) setActiveOffice(null);
                            }}
                        >
                            <sphereGeometry args={[0.04, 16, 16]} />
                            <meshBasicMaterial color={loc.color} />
                        </mesh>
                        <Html distanceFactor={8} zIndexRange={[100, 0]}>
                            <div 
                                className="flex flex-col items-center -translate-x-1/2 -translate-y-[110%] pb-2 cursor-pointer group z-40"
                                onMouseEnter={() => setActiveOffice && setActiveOffice(loc.id)}
                                onMouseLeave={() => setActiveOffice && setActiveOffice(null)}
                            >
                                {/* Glowing Ping Spot */}
                                <div className="w-4 h-4 rounded-full flex items-center justify-center relative bg-black/40">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: loc.color }} />
                                    <div 
                                        className={`w-5 h-5 rounded-full absolute animate-ping opacity-60`} 
                                        style={{ 
                                            border: `2px solid ${loc.color}`,
                                            display: (isActive || activeOffice === loc.id) ? 'block' : 'none' 
                                        }} 
                                    />
                                    <div 
                                        className="w-5 h-5 rounded-full absolute animate-ping opacity-60 group-hover:block hidden" 
                                        style={{ border: `2px solid ${loc.color}` }} 
                                    />
                                </div>
                                {/* Advanced Holographic Details Card */}
                                <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 glass-dark border border-white/10 rounded-xl p-4 shadow-2xl transition-all duration-300 pointer-events-none w-56 ${
                                    isActive ? 'scale-100 opacity-100' : 'scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100'
                                }`}>
                                    <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1.5">
                                        <h4 className="font-bold text-white text-xs tracking-wide">{loc.name}</h4>
                                        <span className="text-[9px] text-slate-400 font-semibold px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{loc.time}</span>
                                    </div>
                                    <p className="text-[10px] text-skylink-gold font-bold mb-2 uppercase tracking-wider">{loc.capacity}</p>
                                    <div className="flex flex-col gap-1">
                                        {loc.caps.map((cap, i) => (
                                            <span key={i} className="text-[9px] text-slate-300">• {cap}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Html>
                    </group>
                );
            })}
        </group>
    );
};

const InteractiveGlobe = ({ activeOffice, setActiveOffice }) => {
    return (
        <div className="w-full h-full min-h-[400px] relative z-20 cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2.5} color="#06b6d4" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#c29b40" />
                <Earth activeOffice={activeOffice} setActiveOffice={setActiveOffice} />
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate={!activeOffice} 
                    autoRotateSpeed={0.5} 
                />
            </Canvas>
        </div>
    );
};

export default InteractiveGlobe;
