import { useEffect, useRef } from 'react';

// ============================================
// FEATURE 13: 3D PROJECTED PARTICLE VORTEX BACKGROUND
// ============================================

const AnimatedBackground = ({ className = '' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        let centerX = width / 2;
        let centerY = height / 2;

        const particleCount = 120;
        const particles = [];
        const maxZ = 800; // max depth
        const focalLength = 320; // 3D projection depth

        const mouse = { x: null, y: null, targetX: 0, targetY: 0, radius: 180 };

        const colors = [
            'rgba(6, 182, 212, ',   // Tech Cyan
            'rgba(194, 155, 64, ',  // Skylink Gold
            'rgba(30, 58, 138, '    // Navy
        ];

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            centerX = width / 2;
            centerY = height / 2;
        };
        window.addEventListener('resize', handleResize);

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            // Target coordinates relative to center
            mouse.targetX = (e.clientX - centerX) * 0.5;
            mouse.targetY = (e.clientY - centerY) * 0.5;
        };
        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
            mouse.targetX = 0;
            mouse.targetY = 0;
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Scroll momentum tracking
        let lastScrollY = window.scrollY;
        let scrollVelocity = 0;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            scrollVelocity = (currentScrollY - lastScrollY) * 0.8;
            lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initialize particles in 3D cylindrical space
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 450 + 50; // distance from vortex core
            particles.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                z: Math.random() * maxZ,
                angle: angle,
                radius: radius,
                speed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
                zSpeed: Math.random() * 1.2 + 0.8,
                baseRadius: Math.random() * 1.5 + 0.8,
                colorBase: colors[Math.floor(Math.random() * colors.length)]
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Decay scroll momentum
            scrollVelocity *= 0.94;

            // Extra warp speed added by scroll movement
            const scrollWarp = Math.min(Math.abs(scrollVelocity) * 1.5, 25);

            particles.forEach((p) => {
                // 1. Vortex rotation around Z-axis
                p.angle += p.speed;
                p.x = Math.cos(p.angle) * p.radius;
                p.y = Math.sin(p.angle) * p.radius;

                // 2. Fly forward on Z-axis (adding scroll warp speed)
                p.z -= p.zSpeed + scrollWarp;

                // If particle flies past screen, reset to the back
                if (p.z <= 0) {
                    p.z = maxZ;
                    p.angle = Math.random() * Math.PI * 2;
                    p.radius = Math.random() * 450 + 50;
                    p.x = Math.cos(p.angle) * p.radius;
                    p.y = Math.sin(p.angle) * p.radius;
                }

                // 3. 3D Project to 2D coordinates
                const scale = focalLength / (focalLength + p.z);
                let projX = centerX + p.x * scale;
                let projY = centerY + p.y * scale;

                // 4. Cursor magnetism/warp in 3D
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = projX - mouse.x;
                    const dy = projY - mouse.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        // Warp 2D projected coordinates slightly towards mouse vector
                        projX += (dx / (dist || 1)) * force * 15;
                        projY += (dy / (dist || 1)) * force * 15;
                    }
                }

                // Fade coordinates as they go deeper in Z-space
                const alpha = (1 - p.z / maxZ) * 0.7;
                const radiusSize = p.baseRadius * scale * 2;

                // Draw Particle Glow
                ctx.beginPath();
                ctx.arc(projX, projY, radiusSize, 0, Math.PI * 2);
                ctx.fillStyle = `${p.colorBase}${alpha})`;
                ctx.fill();

                // Save projected coordinates for connection computations
                p.projX = projX;
                p.projY = projY;
            });

            // 5. Draw 3D-bound connection webs
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];

                    // Check Z depth alignment (prevents connections across Z-depth layers)
                    const zDist = Math.abs(p1.z - p2.z);
                    if (zDist > 80) continue;

                    // Check 2D projected distance
                    const dist = Math.hypot(p1.projX - p2.projX, p1.projY - p2.projY);
                    if (dist < 90) {
                        const alpha = (1 - (p1.z + p2.z) / (maxZ * 2)) * 0.15 * (1 - dist / 90);
                        ctx.beginPath();
                        ctx.moveTo(p1.projX, p1.projY);
                        ctx.lineTo(p2.projX, p2.projY);
                        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                        ctx.lineWidth = 0.5 * (focalLength / (focalLength + p1.z));
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen" />
            
            {/* Subtle holographic grid lines background overlay */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #1e3a8a 1px, transparent 1px),
                        linear-gradient(to bottom, #1e3a8a 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                }}
            />
        </div>
    );
};

export default AnimatedBackground;
