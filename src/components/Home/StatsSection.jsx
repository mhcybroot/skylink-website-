import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Globe, Briefcase, Clock, Users } from 'lucide-react';
import statBg from '../../assets/Photos/DSC05870.jpg';

const StatItem = ({ value, label, icon: Icon }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-skylink-blue/30 hover:shadow-[0_0_30px_rgba(15,76,129,0.2)]">
            {/* Icon Wrapper */}
            <div className="mb-6 inline-flex p-3 rounded-lg bg-skylink-blue/20 text-blue-200 group-hover:bg-skylink-blue group-hover:text-white transition-colors duration-300">
                <Icon size={32} />
            </div>

            {/* Animated Number */}
            <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 group-hover:from-skylink-blue group-hover:to-tech-cyan transition-all duration-300 mb-2">
                {isInView ? value : "0"}
            </div>

            {/* Label */}
            <div className="text-blue-100/80 font-medium tracking-wider uppercase text-sm group-hover:text-white transition-colors">{label}</div>

            {/* Decorative Glow */}
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
        </div>
    );
};

const StatsSection = () => {
    const stats = [
        { value: "3+", label: "Continents Served", icon: Globe },
        { value: "500+", label: "Projects Completed", icon: Briefcase },
        { value: "24/7", label: "Operational Support", icon: Clock },
        { value: "98%", label: "Client Satisfaction", icon: Users },
    ];

    return (
        <section className="relative py-24 bg-slate-900 border-b border-white/5">
            {/* Parallax Background */}
            <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-20 mix-blend-overlay" style={{ backgroundImage: `url(${statBg})` }}></div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <StatItem key={index} value={stat.value} label={stat.label} icon={stat.icon} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
