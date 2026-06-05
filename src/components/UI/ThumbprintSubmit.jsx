import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function ThumbprintSubmit({ onSubmit, disabled }) {
    const [progress, setProgress] = useState(0);
    const [isScanning, setIsScanning] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        let interval;
        if (isScanning && !disabled) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsScanning(false);
                        onSubmit();
                        return 100;
                    }
                    return prev + 5;
                });
            }, 50);
        } else {
            if (progress > 0 && progress < 100) {
                interval = setInterval(() => {
                    setProgress((prev) => {
                        if (prev <= 0) {
                            clearInterval(interval);
                            return 0;
                        }
                        return prev - 5;
                    });
                }, 30);
            }
        }
        return () => clearInterval(interval);
    }, [isScanning, disabled, onSubmit, progress]);

    return (
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            {/* Background scanner ring */}
            <motion.div 
                className="absolute inset-0 rounded-full border-2 border-tech-cyan/20"
                animate={{ scale: isScanning ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 1, repeat: Infinity }}
            />
            
            {/* Progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle 
                    cx="80" 
                    cy="80" 
                    r="76" 
                    fill="none" 
                    stroke="var(--tech-cyan, #06b6d4)" 
                    strokeWidth="4" 
                    strokeDasharray="477.5"
                    strokeDashoffset={477.5 - (477.5 * progress) / 100}
                    className="transition-all duration-75"
                />
            </svg>

            {/* Thumbprint Icon Area */}
            <button
                disabled={disabled}
                onMouseDown={() => setIsScanning(true)}
                onMouseUp={() => setIsScanning(false)}
                onMouseLeave={() => setIsScanning(false)}
                onTouchStart={() => setIsScanning(true)}
                onTouchEnd={() => setIsScanning(false)}
                className={`w-28 h-32 rounded-[2rem] bg-slate-950 border ${
                    disabled ? 'border-red-500/50 cursor-not-allowed opacity-50' : isScanning ? 'border-tech-cyan shadow-[0_0_20px_#06b6d4]' : 'border-tech-cyan/50 hover:bg-slate-900 cursor-pointer'
                } flex flex-col items-center justify-center transition-all relative overflow-hidden`}
            >
                {/* Scanner bar */}
                {isScanning && (
                    <motion.div 
                        className="absolute left-0 right-0 h-1 bg-skylink-gold shadow-[0_0_10px_#c29b40] z-20"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                )}

                <div className="text-4xl font-light text-tech-cyan mb-2">
                    <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" className={`${isScanning ? 'opacity-100 drop-shadow-[0_0_5px_#06b6d4]' : 'opacity-60'}`}>
                        <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2Z"></path>
                        <path d="M12 6a6 6 0 0 0-6 6c0 3.314 2.686 6 6 6s6-2.686 6-6a6 6 0 0 0-6-6Z"></path>
                        <path d="M12 10a2 2 0 0 0-2 2c0 1.105.895 2 2 2s2-.895 2-2a2 2 0 0 0-2-2Z"></path>
                    </svg>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-tech-cyan uppercase">
                    {progress === 100 ? 'Verified' : isScanning ? 'Scanning...' : 'Hold to Submit'}
                </span>
            </button>
        </div>
    );
}
