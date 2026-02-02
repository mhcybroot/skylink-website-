import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Globe, Briefcase, Clock, Users } from 'lucide-react';

const StatItem = ({ value, label, icon: Icon, isLast }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className={`flex flex-col items-center justify-center p-12 hover:bg-slate-800 transition-colors duration-300 ${!isLast ? 'border-b md:border-b-0 md:border-r border-slate-700' : ''}`}>
            <Icon size={32} className="text-skylink-gold mb-6" />

            <div className="text-5xl font-bold text-white mb-2 tracking-tight">
                {isInView ? value : "0"}
            </div>

            <div className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">{label}</div>
        </div>
    );
};

const StatsSection = () => {
    const stats = [
        { value: "3+", label: "Continents", icon: Globe },
        { value: "500+", label: "Projects", icon: Briefcase },
        { value: "24/7", label: "Support", icon: Clock },
        { value: "98%", label: "Satisfaction", icon: Users },
    ];

    return (
        <section className="bg-skylink-navy border-t border-slate-700">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={index}
                            value={stat.value}
                            label={stat.label}
                            icon={stat.icon}
                            isLast={index === stats.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
