import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, Coffee, Monitor, Users, Zap } from 'lucide-react';

const timelineEvents = [
    {
        id: 1,
        time: '08:30 AM',
        icon: Coffee,
        title: 'Morning Sync',
        description: 'Grab a coffee and sync up with the global ops team to review overnight metrics from the APAC region.',
        color: 'from-amber-500/20 to-orange-500/5',
        iconColor: 'text-amber-500'
    },
    {
        id: 2,
        time: '10:00 AM',
        icon: Monitor,
        title: 'Deep Work Block',
        description: 'Focus time. Analyzing property preservation SLA reports or optimizing dispatch algorithms.',
        color: 'from-skylink-blue/20 to-skylink-blue/5',
        iconColor: 'text-skylink-blue'
    },
    {
        id: 3,
        time: '01:00 PM',
        icon: Users,
        title: 'Cross-functional Collab',
        description: 'Working lunch with the design and engineering pods to wireframe the new client dashboard.',
        color: 'from-tech-cyan/20 to-tech-cyan/5',
        iconColor: 'text-tech-cyan'
    },
    {
        id: 4,
        time: '03:30 PM',
        icon: Zap,
        title: 'Innovation Sprint',
        description: 'Weekly hack-session where we prototype new tech-stack solutions for automated vendor onboarding.',
        color: 'from-skylink-gold/20 to-skylink-gold/5',
        iconColor: 'text-skylink-gold'
    },
    {
        id: 5,
        time: '05:30 PM',
        icon: Clock,
        title: 'Handoff & Wind Down',
        description: 'Documenting progress and handing over critical tasks to the EMEA team before logging off.',
        color: 'from-purple-500/20 to-purple-500/5',
        iconColor: 'text-purple-400'
    }
];

export default function DayInLife() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Translate horizontal scroll based on vertical scroll
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-slate-950">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                <div className="absolute top-24 left-12 lg:left-24 z-10">
                    <div className="inline-flex items-center gap-2 text-skylink-gold font-bold tracking-widest text-sm uppercase mb-4">
                        <div className="w-8 h-px bg-skylink-gold" />
                        A Day in the Life
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-tight">
                        Pacing the Future
                    </h2>
                    <p className="text-slate-400 max-w-xl text-lg border-l-2 border-white/10 pl-6">
                        Scroll down to scrub through a typical day in the life of a Skylink specialist. We balance intense focus with collaborative energy.
                    </p>
                </div>

                {/* Horizontal Timeline Container */}
                <motion.div style={{ x }} className="flex gap-16 md:gap-32 px-12 lg:px-24 pt-48 items-center w-max">
                    {timelineEvents.map((event, idx) => {
                        const Icon = event.icon;
                        return (
                            <div key={event.id} className="relative w-80 md:w-96 shrink-0 group">
                                {/* Connection Line */}
                                {idx < timelineEvents.length - 1 && (
                                    <div className="absolute top-8 left-16 w-full h-px bg-gradient-to-r from-white/20 to-transparent" />
                                )}
                                
                                {/* Time marker */}
                                <div className="flex items-center gap-4 mb-8 relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${event.color} border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                        <Icon className={event.iconColor} size={24} />
                                    </div>
                                    <div className="font-mono text-xl text-white font-bold tracking-wider">
                                        {event.time}
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300 relative overflow-hidden group-hover:-translate-y-2">
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${event.color}`} />
                                    <h3 className="text-2xl font-bold text-white mb-4 font-serif">{event.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
                
                {/* Visual noise/grain overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('/noise.png')]" />
            </div>
        </section>
    );
}
