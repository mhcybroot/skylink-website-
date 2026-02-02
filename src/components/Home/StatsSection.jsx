import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Globe, Briefcase, Clock, Users } from 'lucide-react';

const StatItem = ({ value, label, icon: Icon }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="group relative p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            {/* Icon Wrapper */}
            <div className="mb-6 inline-flex p-3 rounded-xl bg-blue-50 dark:bg-slate-700 text-skylink-blue dark:text-blue-400 group-hover:bg-skylink-blue group-hover:text-white transition-colors duration-300">
                <Icon size={32} />
            </div>

            {/* Animated Number */}
            <div className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-2">
                {isInView ? value : "0"}
            </div>

            {/* Label */}
            <div className="text-slate-500 dark:text-slate-400 font-bold tracking-wider uppercase text-sm group-hover:text-skylink-blue dark:group-hover:text-blue-400 transition-colors">{label}</div>
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
        <section className="relative py-24 bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <StatItem key={index} value={stat.value} label={stat.label} icon={stat.icon} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
