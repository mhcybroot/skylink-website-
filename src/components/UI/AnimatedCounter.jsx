import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * AnimatedCounter Component
 * Animates numbers smoothly when scrolled into view.
 * 
 * Props:
 * - value: Target numeric value (number or string like "99.99%", "24/7/365", "< 5 Mins", "1,840+")
 * - duration: Duration in seconds (default: 1.5)
 * - className: CSS classes for styling
 */
const AnimatedCounter = ({ value, duration = 1.5, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        if (!isInView) return;

        // Parse numerical part and prefix/suffix
        const str = String(value).trim();
        const match = str.match(/^([^\d]*)([\d,.]+)(.*)$/);

        if (!match) {
            setDisplayValue(value);
            return;
        }

        const prefix = match[1];
        const rawNumStr = match[2].replace(/,/g, '');
        const suffix = match[3];
        const targetNum = parseFloat(rawNumStr);

        if (isNaN(targetNum)) {
            setDisplayValue(value);
            return;
        }

        const isFloat = rawNumStr.includes('.');
        const decimals = isFloat ? rawNumStr.split('.')[1].length : 0;
        const hasCommas = match[2].includes(',');

        let startTime = null;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = targetNum * easeOutProgress;

            let formattedNum = currentNum.toFixed(decimals);
            if (hasCommas) {
                const parts = formattedNum.split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                formattedNum = parts.join('.');
            }

            setDisplayValue(`${prefix}${formattedNum}${suffix}`);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(value);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className={className}>
            {displayValue}
        </span>
    );
};

export default AnimatedCounter;
