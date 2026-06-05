import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Environment, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

const LaptopModel = ({ mousePosition }) => {
    const groupRef = useRef();
    
    useFrame((state, delta) => {
        if (groupRef.current) {
            const targetX = (mousePosition.x - 50) * 0.05;
            const targetY = -(mousePosition.y - 50) * 0.05;
            
            groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
            groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
            
            // Rotate slightly towards mouse
            groupRef.current.rotation.y += (targetX * 0.5 - groupRef.current.rotation.y) * 0.05;
            groupRef.current.rotation.x += (targetY * 0.5 - groupRef.current.rotation.x) * 0.05;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
            <group ref={groupRef} position={[0, -0.5, 0]} rotation={[0.2, -0.4, 0]}>
                {/* Base */}
                <RoundedBox args={[3.2, 0.15, 2.2]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#1e3a8a" roughness={0.3} metalness={0.7} />
                </RoundedBox>
                
                {/* Keyboard area */}
                <RoundedBox args={[2.8, 0.02, 1.2]} radius={0.02} smoothness={4} position={[0, 0.08, 0.3]}>
                    <meshStandardMaterial color="#0a192f" roughness={0.8} />
                </RoundedBox>
                
                {/* Trackpad */}
                <RoundedBox args={[0.9, 0.02, 0.6]} radius={0.02} smoothness={4} position={[0, 0.08, -0.7]}>
                    <meshStandardMaterial color="#0a192f" roughness={0.6} />
                </RoundedBox>
                
                {/* Screen / Lid */}
                <group position={[0, 0.05, 1.05]} rotation={[-0.2, 0, 0]}>
                    {/* Lid Cover */}
                    <RoundedBox args={[3.2, 2.3, 0.1]} radius={0.05} smoothness={4} position={[0, 1.15, 0]}>
                        <meshStandardMaterial color="#1e3a8a" roughness={0.3} metalness={0.7} />
                    </RoundedBox>
                    {/* Screen Bezel */}
                    <RoundedBox args={[3.0, 2.1, 0.02]} radius={0.02} smoothness={4} position={[0, 1.15, -0.05]}>
                        <meshStandardMaterial color="#000000" roughness={0.8} />
                    </RoundedBox>
                    {/* Glowing Screen Content */}
                    <mesh position={[0, 1.15, -0.061]} rotation={[0, Math.PI, 0]}>
                        <planeGeometry args={[2.9, 2.0]} />
                        <meshBasicMaterial color="#082f49" toneMapped={false} />
                    </mesh>
                    
                    {/* Digital display text */}
                    <Text 
                        position={[0, 1.15, -0.065]} 
                        rotation={[0, Math.PI, 0]} 
                        fontSize={0.25} 
                        color="#06b6d4" 
                        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeAmM.woff"
                        anchorX="center" 
                        anchorY="middle"
                        textAlign="center"
                    >
                        SKYLINK{"\n"}SYSTEMS
                        <meshBasicMaterial color="#06b6d4" toneMapped={false} />
                    </Text>
                </group>

                {/* Floating data nodes representing IT/Cloud */}
                <Sphere args={[0.15, 16, 16]} position={[-2.5, 1.5, 1]}>
                    <meshBasicMaterial color="#c29b40" toneMapped={false} />
                </Sphere>
                <Sphere args={[0.1, 16, 16]} position={[2.5, 2.5, -1]}>
                    <meshBasicMaterial color="#06b6d4" toneMapped={false} />
                </Sphere>
                <Sphere args={[0.08, 16, 16]} position={[-1.5, 2.8, -0.5]}>
                    <meshBasicMaterial color="#ffffff" toneMapped={false} />
                </Sphere>
            </group>
        </Float>
    );
};

const Hero3DScene = ({ mousePosition }) => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />
                
                <LaptopModel mousePosition={mousePosition} />
                
                <Environment preset="city" />
            </Canvas>
        </div>
    );
};

export default Hero3DScene;
