import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform sampler2D texture1;
    uniform sampler2D texture2;
    uniform float progress;
    varying vec2 vUv;

    void main() {
        vec4 tex1 = texture2D(texture1, vUv);
        vec4 tex2 = texture2D(texture2, vUv);
        
        // Add a slight angled wipe effect
        float wipe = smoothstep(progress - 0.05, progress + 0.05, vUv.x + (vUv.y * 0.1) - 0.05);
        
        vec4 finalColor = mix(tex2, tex1, wipe);
        
        // Add a bright glowing edge at the boundary
        float edge = smoothstep(0.0, 0.02, abs(vUv.x + (vUv.y * 0.1) - 0.05 - progress));
        vec4 glowColor = vec4(0.02, 0.71, 0.83, 1.0); // tech-cyan
        
        // Apply glow only near the edge line
        finalColor = mix(finalColor + glowColor * 0.5, finalColor, edge);

        gl_FragColor = finalColor;
    }
`;

const TransitionPlane = ({ beforeImg, afterImg, progress }) => {
    const meshRef = useRef();
    
    // Load textures
    const [tex1, tex2] = useLoader(THREE.TextureLoader, [beforeImg, afterImg]);
    
    // Use useMemo to prevent recreating the material on every render
    const uniforms = useMemo(() => ({
        texture1: { value: tex1 },
        texture2: { value: tex2 },
        progress: { value: progress }
    }), [tex1, tex2, progress]);

    useFrame(() => {
        if (meshRef.current) {
            // Smoothly interpolate the uniform to the target progress
            meshRef.current.material.uniforms.progress.value += 
                (progress - meshRef.current.material.uniforms.progress.value) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[16, 9]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
};

export default function RoomTransition3D({ beforeImg, afterImg }) {
    const [sliderPos, setSliderPos] = useState(0.5); // 0 to 1
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        setSliderPos(x / rect.width);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !containerRef.current || e.touches.length === 0) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
        setSliderPos(x / rect.width);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsDragging(false)}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="w-full h-[300px] md:h-[450px] lg:h-[550px] relative overflow-hidden rounded-3xl shadow-2xl cursor-ew-resize group"
        >
            <div className="absolute top-4 left-4 z-10 bg-black/60 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider rounded backdrop-blur-sm border border-white/10">
                Distressed
            </div>
            
            <div className="absolute top-4 right-4 z-10 bg-skylink-gold/80 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider rounded backdrop-blur-sm border border-skylink-gold/20 shadow-[0_0_15px_rgba(194,155,64,0.4)]">
                Market-Ready
            </div>

            {/* Three.js Canvas */}
            <div className="w-full h-full pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5.5], fov: 75 }}>
                    <TransitionPlane beforeImg={beforeImg} afterImg={afterImg} progress={sliderPos} />
                </Canvas>
            </div>

            {/* Slider Handle (HTML Overlay) */}
            <div 
                className="absolute top-0 bottom-0 pointer-events-none z-20 flex items-center justify-center transition-all duration-75"
                style={{ left: `calc(${sliderPos * 100}% - 2px)` }}
            >
                {/* Physical Handle UI */}
                <div className="w-12 h-12 bg-slate-900 border-2 border-tech-cyan rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)] group-hover:scale-110 transition-transform">
                    <div className="flex gap-1.5">
                        <div className="w-1 h-4 bg-tech-cyan rounded-full" />
                        <div className="w-1 h-4 bg-tech-cyan rounded-full" />
                    </div>
                </div>
            </div>
            
            {/* Instruction Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 font-mono text-[10px] text-slate-300 tracking-widest uppercase opacity-100 group-hover:opacity-0 transition-opacity z-10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tech-cyan animate-pulse" />
                Drag to reveal 3D transformation
            </div>
        </div>
    );
}
