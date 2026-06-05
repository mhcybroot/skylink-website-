import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+{}[]";

export default function ScrambleText({ text, className = "", delay = 0, duration = 1000 }) {
    const [displayText, setDisplayText] = useState(text.replace(/[a-zA-Z0-9]/g, '-'));
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const isAnimating = useRef(false);

    useEffect(() => {
        if (!inView || isAnimating.current) return;
        
        isAnimating.current = true;
        let startTime = null;
        let timeout;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            let newStr = "";
            for (let i = 0; i < text.length; i++) {
                if (text[i] === " " || text[i] === "\n") {
                    newStr += text[i];
                    continue;
                }

                // Reveal letters progressively from left to right
                const revealThreshold = i / text.length;
                
                if (progress > revealThreshold) {
                    // Final letter
                    newStr += text[i];
                } else if (progress > revealThreshold - 0.2) {
                    // Scrambling phase
                    newStr += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                } else {
                    // Hidden phase
                    newStr += "-";
                }
            }

            setDisplayText(newStr);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                isAnimating.current = false;
            }
        };

        timeout = setTimeout(() => {
            requestAnimationFrame(animate);
        }, delay);

        return () => clearTimeout(timeout);
    }, [inView, text, delay, duration]);

    return (
        <span ref={ref} className={`inline-block whitespace-pre-wrap ${className}`}>
            {displayText}
        </span>
    );
}
