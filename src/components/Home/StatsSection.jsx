import { useRef } from 'react';
import { useInView } from 'framer-motion';
import statBg from '../../assets/Photos/DSC05870.jpg';

const StatItem = ({ value, label }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="text-center p-6 border-r last:border-r-0 border-white/20 backdrop-blur-sm bg-slate-900/40 rounded-lg mx-2">
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-tech-cyan to-skylink-blue mb-2 drop-shadow-sm">
                {isInView ? value : "0"}
            </div>
            <div className="text-blue-100 font-medium tracking-wide uppercase text-sm shadow-black drop-shadow-md">{label}</div>
        </div>
    );
};

const StatsSection = () => {
    const stats = [
        { value: "3+", label: "Continents Served" },
        { value: "500+", label: "Projects Completed" },
        { value: "24/7", label: "Operational Support" },
        { value: "98%", label: "Client Satisfaction" },
    ];

    return (
        <section className="relative py-20 border-b border-slate-800 bg-slate-900">
            {/* Parallax Background */}
            <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10" style={{ backgroundImage: `url(${statBg})` }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/80"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <StatItem key={index} value={stat.value} label={stat.label} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
