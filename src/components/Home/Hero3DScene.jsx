import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Environment, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

// ============================================
// FEATURE 4: 3D INTERACTIVE ORBITAL RINGS
// ============================================

const LaptopModel = ({ mousePosition, currentIndex, setCurrentIndex }) => {
    const groupRef = useRef();
    const ring1Ref = useRef();
    const ring2Ref = useRef();
    const [hoveredNode, setHoveredNode] = useState(null);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();

        // Rotate laptop model slightly towards cursor coords
        if (groupRef.current) {
            const targetX = (mousePosition.x - 50) * 0.05;
            const targetY = -(mousePosition.y - 50) * 0.05;
            
            groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
            groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
            
            groupRef.current.rotation.y += (targetX * 0.4 - groupRef.current.rotation.y) * 0.05;
            groupRef.current.rotation.x += (targetY * 0.4 - groupRef.current.rotation.x) * 0.05;
        }

        // Spin orbital rings in opposite directions
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z = time * 0.12;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.z = -time * 0.08;
        }
    });

    const nodesData = [
        { id: 0, name: "GLOBAL SYSTEMS", color: "#ffffff", slide: 0 },
        { id: 1, name: "PROPERTY REHAB", color: "#c29b40", slide: 1 },
        { id: 2, name: "ITES OPERATIONS", color: "#06b6d4", slide: 2 }
    ];

    // Get screen label text corresponding to current slide
    const screenTexts = [
        "SKYLINK\nGLOBAL",
        "PROPERTY\nREHABS",
        "ITES & BPO\nSYSTEMS"
    ];

    const screenColors = [
        "#ffffff",
        "#c29b40",
        "#06b6d4"
    ];

    return (
        <Float speed={2.2} rotationIntensity={0.4} floatIntensity={1.2}>
            <group ref={groupRef} position={[0, -0.4, 0]} rotation={[0.2, -0.4, 0]}>
                
                {/* Laptop Base */}
                <RoundedBox args={[3.2, 0.15, 2.2]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#0b1329" roughness={0.3} metalness={0.8} />
                </RoundedBox>
                
                {/* Keyboard track area */}
                <RoundedBox args={[2.8, 0.02, 1.2]} radius={0.02} smoothness={4} position={[0, 0.08, 0.3]}>
                    <meshStandardMaterial color="#020617" roughness={0.8} />
                </RoundedBox>
                
                {/* Trackpad */}
                <RoundedBox args={[0.9, 0.02, 0.6]} radius={0.02} smoothness={4} position={[0, 0.08, -0.7]}>
                    <meshStandardMaterial color="#020617" roughness={0.6} />
                </RoundedBox>
                
                {/* Screen Lid */}
                <group position={[0, 0.05, 1.05]} rotation={[-0.25, 0, 0]}>
                    <RoundedBox args={[3.2, 2.3, 0.1]} radius={0.05} smoothness={4} position={[0, 1.15, 0]}>
                        <meshStandardMaterial color="#0b1329" roughness={0.3} metalness={0.8} />
                    </RoundedBox>
                    <RoundedBox args={[3.0, 2.1, 0.02]} radius={0.02} smoothness={4} position={[0, 1.15, -0.05]}>
                        <meshStandardMaterial color="#000000" roughness={0.8} />
                    </RoundedBox>
                    {/* Glowing Screen Plane */}
                    <mesh position={[0, 1.15, -0.061]} rotation={[0, Math.PI, 0]}>
                        <planeGeometry args={[2.9, 2.0]} />
                        <meshBasicMaterial color="#020617" toneMapped={false} />
                    </mesh>
                    
                    {/* Telemetry text output on laptop screen */}
                    <Text 
                        position={[0, 1.15, -0.065]} 
                        rotation={[0, Math.PI, 0]} 
                        fontSize={0.24} 
                        color={screenColors[currentIndex]}
                        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeAmM.woff"
                        anchorX="center" 
                        anchorY="middle"
                        textAlign="center"
                    >
                        {screenTexts[currentIndex]}
                    </Text>
                </group>

                {/* Ring 1 (Gold Node Assembly) */}
                <group ref={ring1Ref} rotation={[Math.PI / 2, 0.15, 0]}>
                    {/* Torus wireframe ring */}
                    <mesh>
                        <torusGeometry args={[2.4, 0.008, 8, 64]} />
                        <meshBasicMaterial color="#c29b40" transparent opacity={0.2} />
                    </mesh>

                    {/* Interactive Spheres */}
                    {nodesData.map((node, idx) => {
                        const angle = (idx * Math.PI * 2) / 3;
                        const x = Math.cos(angle) * 2.4;
                        const y = Math.sin(angle) * 2.4;
                        const isHovered = hoveredNode === idx;
                        const isActive = currentIndex === node.slide;

                        return (
                            <group key={idx} position={[x, y, 0]} rotation={[0, 0, -angle - Math.PI / 2]}>
                                <mesh 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex(node.slide);
                                    }}
                                    onPointerOver={(e) => {
                                        e.stopPropagation();
                                        setHoveredNode(idx);
                                    }}
                                    onPointerOut={(e) => {
                                        e.stopPropagation();
                                        setHoveredNode(null);
                                    }}
                                >
                                    <sphereGeometry args={[isHovered || isActive ? 0.16 : 0.11, 16, 16]} />
                                    <meshBasicMaterial 
                                        color={isActive ? "#06b6d4" : node.color} 
                                        toneMapped={false}
                                    />
                                </mesh>
                                {/* Floating mini label projected on active/hover */}
                                {(isHovered || isActive) && (
                                    <Text
                                        position={[0, 0.32, 0]}
                                        fontSize={0.11}
                                        color="#ffffff"
                                        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeAmM.woff"
                                        anchorX="center"
                                        anchorY="middle"
                                    >
                                        {node.name}
                                    </Text>
                                )}
                            </group>
                        );
                    })}
                </group>

                {/* Ring 2 (Decorative Outer Tech Cyan ring) */}
                <group ref={ring2Ref} rotation={[Math.PI / 2, -0.25, 0.3]}>
                    <mesh>
                        <torusGeometry args={[2.7, 0.005, 6, 64]} />
                        <meshBasicMaterial color="#06b6d4" transparent opacity={0.15} />
                    </mesh>
                    {/* Ring indicator nodes */}
                    <Sphere args={[0.04, 8, 8]} position={[2.7, 0, 0]}>
                        <meshBasicMaterial color="#06b6d4" />
                    </Sphere>
                    <Sphere args={[0.04, 8, 8]} position={[-2.7, 0, 0]}>
                        <meshBasicMaterial color="#06b6d4" />
                    </Sphere>
                </group>

            </group>
        </Float>
    );
};

const HolographicGlobe = () => {
    const groupRef = useRef();
    const count = 500;

    const positions = useMemo(() => {
        const temp = new Float32Array(count * 3);
        const phi = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            
            // Sphere radius 2.6
            const r = 2.6;
            temp[i * 3] = x * r;
            temp[i * 3 + 1] = y * r;
            temp[i * 3 + 2] = z * r;
        }
        return temp;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.05;
            groupRef.current.rotation.x = Math.sin(time * 0.02) * 0.08;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.2, -3.2]}>
            {/* Particle Grid */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color="#06b6d4"
                    size={0.04}
                    sizeAttenuation={true}
                    transparent={true}
                    opacity={0.25}
                />
            </points>

            {/* Latitude Ring 1 */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.6, 0.004, 4, 40]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.1} />
            </mesh>
            
            {/* Latitude Ring 2 (upper offset) */}
            <mesh position={[0, 1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.25, 0.003, 4, 32]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.07} />
            </mesh>

            {/* Latitude Ring 3 (lower offset) */}
            <mesh position={[0, -1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.25, 0.003, 4, 32]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.07} />
            </mesh>

            {/* Longitudinal Ring 1 */}
            <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[2.6, 0.004, 4, 40]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.08} />
            </mesh>

            {/* Longitudinal Ring 2 */}
            <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[2.6, 0.004, 4, 40]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.08} />
            </mesh>
        </group>
    );
};

const Hero3DScene = ({ mousePosition, currentIndex, setCurrentIndex }) => {
    return (
        <div className="absolute inset-0 pointer-events-auto z-10">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />
                
                <LaptopModel 
                    mousePosition={mousePosition} 
                    currentIndex={currentIndex} 
                    setCurrentIndex={setCurrentIndex} 
                />

                <HolographicGlobe />
                
                <Environment preset="city" />
            </Canvas>
        </div>
    );
};

export default Hero3DScene;
