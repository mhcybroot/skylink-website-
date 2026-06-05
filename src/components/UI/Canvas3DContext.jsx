import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const Scene = () => {
    const sceneRef = useRef();

    useFrame((state) => {
        if (sceneRef.current) {
            sceneRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            sceneRef.current.rotation.x = state.clock.elapsedTime * 0.02;
            
            // Subtle scroll effect
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            sceneRef.current.position.y = scrollY * 0.005;
        }
    });

    return (
        <group ref={sceneRef}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={15} size={2} speed={0.4} opacity={0.5} color="#06b6d4" />
        </group>
    );
};

const Canvas3DContext = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-skylink-navy">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={0.5} />
                <Scene />
                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} opacity={1.5} />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default Canvas3DContext;
