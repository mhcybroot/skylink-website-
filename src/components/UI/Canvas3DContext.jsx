import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

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

const Ripples = () => {
    const [ripples, setRipples] = useState([]);

    useEffect(() => {
        const handleClick = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            
            const newRipple = {
                id: Date.now() + Math.random(),
                x: x * 10,
                y: y * 10,
                birth: Date.now()
            };
            setRipples(prev => [...prev, newRipple]);
        };
        
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    useFrame(() => {
        setRipples(prev => prev.filter(r => Date.now() - r.birth < 2000));
    });

    return (
        <group>
            {ripples.map(r => (
                <RippleMesh key={r.id} ripple={r} />
            ))}
        </group>
    );
};

const RippleMesh = ({ ripple }) => {
    const ref = useRef();
    
    useFrame(() => {
        if (ref.current) {
            const age = (Date.now() - ripple.birth) / 1000;
            const scale = 1 + age * 15;
            ref.current.scale.set(scale, scale, scale);
            ref.current.material.opacity = Math.max(0, 0.6 - age * 0.8);
        }
    });

    return (
        <mesh position={[ripple.x, ripple.y, -5]} ref={ref}>
            <ringGeometry args={[0.95, 1, 64]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
    );
};

const Canvas3DContext = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-skylink-navy">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={0.5} />
                <Scene />
                <Ripples />
                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} opacity={1.5} />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default Canvas3DContext;
