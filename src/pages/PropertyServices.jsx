import { Hammer, Home, PenTool, Trash2, CheckCircle, ArrowRight, ShieldCheck, ClipboardCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/Photos/DSC05810.jpg';

const PropertyServices = () => {
    const services = [
        {
            title: "INSPECTIONS & QC",
            description: "Detailed occupancy checks, disaster inspections, and quality control audits with real-time photo reporting.",
            icon: ClipboardCheck,
            features: ["Occupancy Checks", "Disaster Reporting", "QC Audits"]
        },
        {
            title: "PRESERVATION",
            description: "Lock changes, board-ups, lawn maintenance, and winterization to protect assets from deterioration.",
            icon: ShieldCheck,
            features: ["Securing & Re-keying", "Winterization", "Lawn Care"]
        },
        {
            title: "RENOVATION",
            description: "Full-scale rehabs designed to maximize ROI. Kitchens, baths, flooring, and paint with rapid turnaround.",
            icon: Hammer,
            features: ["Full Rehabs", "Kitchen/Bath", "Roofing/Siding"]
        },
        {
            title: "DEBRIS REMOVAL",
            description: "Complete interior and exterior debris removal, hazard cleanup, and maid services for market readiness.",
            icon: Trash2,
            features: ["Trash-outs", "Hazard Removal", "Maid Services"]
        }
    ];

    const workflowSteps = [
        { id: "01", title: "Assignment", desc: "Order received via portal/API." },
        { id: "02", title: "Dispatch", desc: "Crew deployed within 24h." },
        { id: "03", title: "Execution", desc: "Work performed & documented." },
        { id: "04", title: "QC Audit", desc: "Internal review & submission." }
    ];

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* COMPACT INDUSTRIAL HERO */}
            <section className="relative h-96 flex items-center bg-skylink-navy border-b-4 border-skylink-gold">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale-[50%] opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: `url(${heroBg})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-skylink-navy via-skylink-navy/90 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                        PROPERTY PRESERVATION
                    </h1>
                    <p className="text-xl text-slate-300 font-light tracking-wide uppercase">
                        Nationwide Asset Management & Protection
                    </p>
                </div>
            </section>

            {/* STRICT GRID SERVICES */}
            <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-2xl border border-slate-200">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`group p-12 border-b md:border-b-0 border-slate-200 hover:bg-slate-50 transition-colors duration-300 ${index % 2 === 0 ? 'md:border-r' : ''
                                } ${index < 2 ? 'md:border-b' : ''}`}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <service.icon size={32} className="text-skylink-navy" />
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    Service 0{index + 1}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-skylink-navy mb-4 font-serif">{service.title}</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed max-w-md">
                                {service.description}
                            </p>

                            <ul className="space-y-2 mb-8">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-sm font-semibold text-skylink-blue">
                                        <ChevronRight size={14} className="mr-2" /> {feature}
                                    </li>
                                ))}
                            </ul>

                            <a href="#" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 border-b-2 border-transparent group-hover:border-skylink-gold transition-all">
                                Specifications <ArrowRight size={14} className="ml-2" />
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* LINEAR WORKFLOW (DATA STRIP) */}
            <section className="bg-slate-50 py-20 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-skylink-navy">OPERATIONAL LIFECYCLE</h2>
                            <p className="text-slate-500 mt-2">Standardized execution protocol for all assets.</p>
                        </div>
                        <Link to="/contact" className="hidden md:inline-flex items-center px-6 py-3 bg-skylink-navy text-white font-bold text-sm tracking-wide hover:bg-slate-800 transition-colors">
                            INITIATE WORK ORDER
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 border-t border-slate-200">
                        {workflowSteps.map((step, index) => (
                            <div key={index} className="relative p-8 border-b md:border-b-0 md:border-r border-slate-200 last:border-r-0 bg-white hover:bg-slate-50 transition-colors">
                                <span className="text-5xl font-bold text-slate-100 absolute top-4 right-4">{step.id}</span>
                                <h3 className="text-lg font-bold text-skylink-navy mb-2 relative z-10">{step.title}</h3>
                                <p className="text-sm text-slate-500 relative z-10">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="md:hidden mt-8">
                        <Link to="/contact" className="block w-full text-center px-6 py-3 bg-skylink-navy text-white font-bold text-sm tracking-wide hover:bg-slate-800 transition-colors">
                            INITIATE WORK ORDER
                        </Link>
                    </div>
                </div>
            </section>

            {/* PERFORMANCE METRICS (TEXT BASED) */}
            <section className="py-24 bg-skylink-navy text-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                    <div>
                        <div className="text-4xl font-bold text-skylink-gold mb-2">98.5%</div>
                        <div className="text-sm font-bold tracking-widest text-slate-400 uppercase">On-Time Completion</div>
                        <p className="text-slate-400 text-sm mt-4 leading-relaxed">Rigorous timeline management ensures assets move to market without delay.</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-skylink-gold mb-2">24h</div>
                        <div className="text-sm font-bold tracking-widest text-slate-400 uppercase">Initial Inspection</div>
                        <p className="text-slate-400 text-sm mt-4 leading-relaxed">Rapid deployment to assess occupancy and condition immediately upon assignment.</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-skylink-gold mb-2">50 States</div>
                        <div className="text-sm font-bold tracking-widest text-slate-400 uppercase">Coverage Area</div>
                        <p className="text-slate-400 text-sm mt-4 leading-relaxed">A unified vendor network managing assets across the entire continental US.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PropertyServices;
