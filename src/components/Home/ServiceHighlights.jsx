import { ArrowRight, CheckCircle2, Building, Monitor, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import propertyBg from '../../assets/Photos/DSC05810.jpg';
import techBg from '../../assets/Photos/DSC05839.jpg';

const ServiceHighlights = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-slate-200 pb-8">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-bold text-skylink-navy mb-4">COMPREHENSIVE VERTICALS</h2>
                        <p className="text-xl text-slate-500 font-light leading-relaxed">
                            We operate at the intersection of physical asset management and digital process optimization.
                        </p>
                    </div>
                    <Link to="/property" className="hidden md:flex items-center text-sm font-bold text-skylink-blue uppercase tracking-widest hover:text-skylink-navy transition-colors">
                        View All Capabilities <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-slate-200 shadow-2xl">
                    {/* Real Estate Asset Solutions */}
                    <div className="group relative border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50 hover:bg-white transition-colors duration-500">
                        <div className="relative h-64 overflow-hidden border-b border-slate-200">
                            <div className="absolute inset-0 bg-skylink-navy/20 group-hover:bg-transparent transition-colors z-10"></div>
                            <img src={propertyBg} alt="Property Services" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                            <div className="absolute top-6 left-6 z-20 bg-skylink-navy text-white px-4 py-2 text-sm font-bold uppercase tracking-widest">
                                Vertical 01
                            </div>
                        </div>

                        <div className="p-10">
                            <div className="flex items-start justify-between mb-6">
                                <Building size={40} className="text-skylink-navy" />
                                <ArrowUpRight size={24} className="text-slate-300 group-hover:text-skylink-gold transition-colors" />
                            </div>

                            <h3 className="text-2xl font-bold text-skylink-navy mb-4 font-serif">Real Estate Asset Solutions</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                End-to-end stewardship for distressed and REO properties. We restore value through precision renovation and maintenance.
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {["Debris Removal", "Value-Add Renovations", "Compliance Checks", "Winterization"].map((item, idx) => (
                                    <li key={idx} className="flex items-center text-sm font-bold text-slate-700">
                                        <div className="w-1.5 h-1.5 bg-skylink-gold mr-3"></div> {item}
                                    </li>
                                ))}
                            </ul>

                            <Link to="/property" className="inline-block w-full text-center py-4 border border-slate-300 text-skylink-navy font-bold uppercase text-sm tracking-widest hover:bg-skylink-navy hover:text-white transition-all">
                                Explore Property
                            </Link>
                        </div>
                    </div>

                    {/* Digital Strategy */}
                    <div className="group relative bg-slate-50 hover:bg-white transition-colors duration-500">
                        <div className="relative h-64 overflow-hidden border-b border-slate-200">
                            <div className="absolute inset-0 bg-skylink-navy/20 group-hover:bg-transparent transition-colors z-10"></div>
                            <img src={techBg} alt="Tech Services" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                            <div className="absolute top-6 left-6 z-20 bg-skylink-blue text-white px-4 py-2 text-sm font-bold uppercase tracking-widest">
                                Vertical 02
                            </div>
                        </div>

                        <div className="p-10">
                            <div className="flex items-start justify-between mb-6">
                                <Monitor size={40} className="text-skylink-blue" />
                                <ArrowUpRight size={24} className="text-slate-300 group-hover:text-skylink-gold transition-colors" />
                            </div>

                            <h3 className="text-2xl font-bold text-skylink-navy mb-4 font-serif">Digital Strategy & Operations</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Scalable BPO frameworks designed for high-growth enterprises. We handle the backend so you can focus on innovation.
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {["Omnichannel CX", "Data Processing", "Workflow Dev", "Back-Office Ops"].map((item, idx) => (
                                    <li key={idx} className="flex items-center text-sm font-bold text-slate-700">
                                        <div className="w-1.5 h-1.5 bg-skylink-blue mr-3"></div> {item}
                                    </li>
                                ))}
                            </ul>

                            <Link to="/ites" className="inline-block w-full text-center py-4 border border-slate-300 text-skylink-navy font-bold uppercase text-sm tracking-widest hover:bg-skylink-blue hover:text-white hover:border-skylink-blue transition-all">
                                Explore ITES
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceHighlights;
