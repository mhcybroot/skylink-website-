import { motion } from 'framer-motion';

const AnimatedBackground = ({
    variant = 'default', // 'default', 'dark', 'subtle'
    className = ''
}) => {
    const shapes = [
        { size: 'w-32 h-32', position: 'top-1/4 left-1/4', delay: 0 },
        { size: 'w-24 h-24', position: 'top-1/3 right-1/3', delay: 0.5 },
        { size: 'w-40 h-40', position: 'bottom-1/4 right-1/4', delay: 1 },
        { size: 'w-20 h-20', position: 'bottom-1/3 left-1/3', delay: 1.5 },
        { size: 'w-16 h-16', position: 'top-1/2 left-1/2', delay: 2 },
    ];

    const getColors = () => {
        switch (variant) {
            case 'dark':
                return {
                    primary: 'bg-skylink-blue/10',
                    secondary: 'bg-tech-cyan/10',
                    accent: 'bg-skylink-gold/5',
                };
            case 'subtle':
                return {
                    primary: 'bg-skylink-blue/5',
                    secondary: 'bg-tech-cyan/5',
                    accent: 'bg-slate-200/30',
                };
            default:
                return {
                    primary: 'bg-skylink-blue/10',
                    secondary: 'bg-tech-cyan/15',
                    accent: 'bg-skylink-gold/10',
                };
        }
    };

    const colors = getColors();

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Gradient mesh background */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-50/50 to-transparent" />

            {/* Animated floating shapes */}
            {shapes.map((shape, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${shape.size} ${shape.position} rounded-full blur-3xl ${index % 3 === 0 ? colors.primary : index % 3 === 1 ? colors.secondary : colors.accent
                        }`}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 15, 0],
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 6 + index,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: shape.delay,
                    }}
                />
            ))}

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #1e3a8a 1px, transparent 1px),
                        linear-gradient(to bottom, #1e3a8a 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Radial gradient for depth */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/50" />
        </div>
    );
};

export default AnimatedBackground;
