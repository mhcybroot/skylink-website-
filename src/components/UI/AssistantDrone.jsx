import React, { useRef } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { Float, Sphere, Torus, Html } from '@react-three/drei';

const DroneCore = () => {
    const coreRef = useRef();
    const ringRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (coreRef.current) {
            // Track mouse
            const targetX = (state.mouse.x * 2);
            const targetY = (state.mouse.y * 2);
            
            coreRef.current.rotation.y += (targetX - coreRef.current.rotation.y) * 0.1;
            coreRef.current.rotation.x += (-targetY - coreRef.current.rotation.x) * 0.1;
        }

        if (ringRef.current) {
            ringRef.current.rotation.z = time * 2;
            ringRef.current.rotation.x = Math.sin(time) * 0.5;
        }
    });

    return (
        <Float speed={4} rotationIntensity={0.5} floatIntensity={2}>
            <group ref={coreRef}>
                {/* Core Eye */}
                <Sphere args={[0.4, 32, 32]}>
                    <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.1} />
                </Sphere>
                <Sphere args={[0.2, 16, 16]} position={[0, 0, 0.35]}>
                    <meshBasicMaterial color="#06b6d4" />
                </Sphere>

                {/* Spinning Rings */}
                <group ref={ringRef}>
                    <Torus args={[0.7, 0.05, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial color="#c29b40" metalness={0.8} roughness={0.2} />
                    </Torus>
                    <Torus args={[0.9, 0.02, 16, 32]} rotation={[0, Math.PI / 2, 0]}>
                        <meshBasicMaterial color="#06b6d4" transparent opacity={0.5} />
                    </Torus>
                </group>

                {/* Floating data tag */}
                <Html position={[1.2, 0, 0]} center>
                    <div className="bg-black/80 border border-tech-cyan/30 text-tech-cyan font-mono text-[8px] px-2 py-1 rounded tracking-widest whitespace-nowrap animate-pulse">
                        SYS.AI // ACTIVE
                    </div>
                </Html>
            </group>
        </Float>
    );
};

export default function AssistantDrone() {
    return (
        <div className="fixed right-6 bottom-32 w-32 h-32 z-50 pointer-events-none mix-blend-screen">
            <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={1} />
                <directionalLight position={[2, 2, 2]} intensity={2} />
                <directionalLight position={[-2, -2, -2]} intensity={1} color="#06b6d4" />
                <DroneCore />
            </Canvas>
        </div>
    );
}
