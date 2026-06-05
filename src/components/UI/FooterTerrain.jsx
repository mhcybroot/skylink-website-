import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TerrainMesh = () => {
    const meshRef = useRef();

    // Create a terrain geometry
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(30, 15, 60, 30);
        
        // Add random height displacement
        const positions = geo.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            
            // Simplex noise-like displacement using sine waves
            const z = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 1.5 + 
                      Math.sin(x * 1.5) * Math.cos(y * 1.2) * 0.5;
            
            positions.setZ(i, z);
        }
        
        geo.computeVertexNormals();
        return geo;
    }, []);

    // Animate the terrain scrolling towards the camera
    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        
        const elapsedTime = clock.getElapsedTime();
        
        // Move the vertices to simulate forward movement
        const positions = geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const originalY = (i % 31) * (15/30) - 7.5; // recreate original Y grid
            
            // Offset Y based on time to simulate scrolling
            const yOffset = (originalY + elapsedTime * 2) % 15 - 7.5;
            
            // Recalculate Z based on new virtual position
            const z = Math.sin(x * 0.5) * Math.cos(yOffset * 0.5) * 1.5 + 
                      Math.sin(x * 1.5) * Math.cos(yOffset * 1.2) * 0.5;
                      
            positions.setZ(i, z);
        }
        positions.needsUpdate = true;
    });

    return (
        <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -2, -5]}>
            <meshBasicMaterial 
                color="#06b6d4" 
                wireframe={true} 
                transparent={true} 
                opacity={0.15} 
            />
        </mesh>
    );
};

export default function FooterTerrain() {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ height: '100%', width: '100%' }}>
            {/* Gradient overlay to fade out the top of the terrain */}
            <div className="absolute inset-0 bg-gradient-to-b from-skylink-navy via-transparent to-skylink-navy z-10 pointer-events-none" />
            
            <Canvas camera={{ position: [0, 1, 5], fov: 60 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <TerrainMesh />
                
                {/* Fog to hide the far edge of the terrain */}
                <fog attach="fog" args={['#0f172a', 2, 10]} />
            </Canvas>
        </div>
    );
}
