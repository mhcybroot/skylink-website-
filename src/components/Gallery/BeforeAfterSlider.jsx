import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// BEFORE/AFTER SLIDER
// Interactive comparison slider for before/after images
// ============================================

const BeforeAfterSlider = ({
    beforeImage,
    afterImage,
    beforeLabel = 'Before',
    afterLabel = 'After',
    initialPosition = 50,
    className = '',
}) => {
    const [sliderPosition, setSliderPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = (clientX) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
        setSliderPosition(percentage);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !e.touches[0]) return;
        handleMove(e.touches[0].clientX);
    };

    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleDragEnd);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleDragEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleDragEnd);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full aspect-video overflow-hidden rounded-xl select-none cursor-ew-resize ${className}`}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
        >
            {/* After image (background) */}
            <div className="absolute inset-0">
                <img
                    src={afterImage}
                    alt={afterLabel}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
            </div>

            {/* Before image (clipped) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
            >
                <img
                    src={beforeImage}
                    alt={beforeLabel}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        width: containerRef.current?.offsetWidth || '100%',
                        maxWidth: 'none'
                    }}
                    draggable={false}
                />
            </div>

            {/* Slider line */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
                {/* Handle */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="flex gap-1">
                        <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-slate-600" />
                        <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-slate-600" />
                    </div>
                </motion.div>
            </div>

            {/* Labels */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-4 left-4 bg-skylink-navy/90 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
            >
                {beforeLabel}
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-4 right-4 bg-skylink-gold/90 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
            >
                {afterLabel}
            </motion.div>
        </div>
    );
};

export default BeforeAfterSlider;
