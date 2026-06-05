import { useRef } from 'react';
import { motion, useInView, motionValue, useTransform } from 'framer-motion';
import { ArrowRight, Building, Monitor, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import propertyBg from '../../assets/Photos/DSC05810.jpg';
import techBg from '../../assets/Photos/DSC05839.jpg';

const TiltCard = ({ children, index, isInView }) => {
    const cardRef = useRef(null);
    const x = motionValue(0);
    const y = motionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
        })
    };

    return (
        <motion.div
            ref={cardRef}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="perspective-1000 w-full"
        >
            <div className="group relative bg-skylink-navy/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:shadow-2xl hover:shadow-tech-cyan/20 transition-all duration-500 h-full">
                {/* Glare effect */}
                <motion.div 
                    className="absolute inset-0 pointer-events-none z-30"
                    style={{
                        background: useTransform(
                            [x, y],
                            ([latestX, latestY]) => `radial-gradient(circle at ${(latestX + 0.5) * 100}% ${(latestY + 0.5) * 100}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
                        )
                    }}
                />
                {children}
            </div>
        </motion.div>
    );
};


const ServiceHighlights = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    const services = [
        {
            vertical: '01',
            icon: Building,
            title: 'Real Estate Asset Solutions',
            description: 'End-to-end stewardship for distressed and REO properties. We restore value through precision renovation and maintenance.',
            features: ['Debris Removal', 'Value-Add Renovations', 'Compliance Checks', 'Winterization'],
            image: propertyBg,
            link: '/property',
            linkText: 'Explore Property',
            color: 'skylink-navy',
            hoverColor: 'skylink-blue',
        },
        {
            vertical: '02',
            icon: Monitor,
            title: 'Digital Strategy & Operations',
            description: 'Scalable BPO frameworks designed for high-growth enterprises. We handle the backend so you can focus on innovation.',
            features: ['Omnichannel CX', 'Data Processing', 'Workflow Dev', 'Back-Office Ops'],
            image: techBg,
            link: '/ites',
            linkText: 'Explore ITES',
            color: 'tech-cyan',
            hoverColor: 'tech-cyan',
        }
    ];

    // cardVariants moved to TiltCard

    return (
        <section ref={sectionRef} className="py-28 relative overflow-hidden bg-transparent z-10">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-200"
                >
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-skylink-gold font-bold tracking-widest text-sm uppercase mb-4">
                            <div className="w-8 h-px bg-skylink-gold" />
                            Our Verticals
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Comprehensive Solutions
                        </h2>
                        <p className="text-xl text-slate-300 font-light leading-relaxed">
                            We operate at the intersection of physical asset management and digital process optimization.
                        </p>
                    </div>
                    <motion.div whileHover={{ x: 5 }}>
                        <Link
                            to="/property"
                            className="hidden md:flex items-center text-sm font-bold text-skylink-blue uppercase tracking-widest hover:text-skylink-gold transition-colors group mt-6 md:mt-0"
                        >
                            View All Capabilities
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 perspective-1000">
                    {services.map((service, index) => (
                        <TiltCard key={index} index={index} isInView={isInView}>
                            {/* Image section */}
                            <div className="relative h-64 overflow-hidden transform-style-3d transform translate-z-[50px]">
                                <div className="absolute inset-0 bg-gradient-to-t from-skylink-navy via-skylink-navy/20 to-transparent z-10" />
                                <motion.img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.7 }}
                                />
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20" />

                                {/* Vertical badge */}
                                <div className={`absolute top-6 left-6 z-20 bg-${service.color} text-white px-4 py-2 text-sm font-bold uppercase tracking-widest rounded-lg shadow-lg transform translate-z-[30px]`}>
                                    Vertical {service.vertical}
                                </div>
                            </div>

                            {/* Content section */}
                            <div className="p-8 transform-style-3d transform translate-z-[40px]">
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-3 bg-${service.color}/10 rounded-xl group-hover:bg-${service.color} transition-colors duration-300 transform translate-z-[20px]`}>
                                        <service.icon size={32} className={`text-${service.color} group-hover:text-white transition-colors`} />
                                    </div>
                                    <motion.div
                                        animate={{ rotate: 0 }}
                                        whileHover={{ rotate: 45 }}
                                        className="p-2 transform translate-z-[20px]"
                                    >
                                        <ArrowUpRight size={24} className="text-slate-300 group-hover:text-skylink-gold transition-colors" />
                                    </motion.div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 font-serif group-hover:text-tech-cyan transition-colors transform translate-z-[30px]">
                                    {service.title}
                                </h3>
                                <p className="text-slate-300 mb-6 leading-relaxed transform translate-z-[20px]">
                                    {service.description}
                                </p>

                                {/* Feature list */}
                                <ul className="grid grid-cols-2 gap-3 mb-8 transform translate-z-[10px]">
                                    {service.features.map((item, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ delay: 0.4 + idx * 0.1 }}
                                            className="flex items-center text-sm font-medium text-slate-300"
                                        >
                                            <div className={`w-2 h-2 bg-${service.color} rounded-full mr-3 group-hover:animate-pulse`} />
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Link
                                    to={service.link}
                                    className={`inline-flex items-center justify-center w-full py-4 border-2 border-white/20 text-white font-bold uppercase text-sm tracking-widest rounded-xl hover:bg-${service.color} hover:text-white hover:border-${service.color} transition-all duration-300 group/btn transform translate-z-[30px]`}
                                >
                                    {service.linkText}
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceHighlights;

