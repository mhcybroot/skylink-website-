import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SpotlightText({ children, className = '', highlightColor = '#06b6d4' }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const textRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!textRef.current) return;
        const rect = textRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <div
            ref={textRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative inline-block overflow-hidden ${className}`}
        >
            {/* The underlying dark text */}
            <div className="text-slate-800">
                {children}
            </div>

            {/* The overlaid gradient text that acts as a mask */}
            <motion.div
                className="absolute inset-0 pointer-events-none text-transparent bg-clip-text"
                style={{
                    backgroundImage: `linear-gradient(45deg, #fff, ${highlightColor}, #c29b40)`,
                    WebkitMaskImage: `radial-gradient(circle 80px at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 100%)`,
                    maskImage: `radial-gradient(circle 80px at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 100%)`
                }}
                animate={{
                    opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
            >
                {children}
            </motion.div>
        </div>
    );
}
