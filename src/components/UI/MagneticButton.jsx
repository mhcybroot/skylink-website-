import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className = '' }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        
        // Intensity of the pull
        setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative inline-block ${className}`}
        >
            {/* The actual content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
            {/* Soft magnetic glow behind it */}
            <motion.div 
                className="absolute inset-0 rounded-xl pointer-events-none transition-opacity bg-tech-cyan/30 blur-xl -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: x !== 0 || y !== 0 ? 1 : 0 }}
            />
        </motion.div>
    );
}
