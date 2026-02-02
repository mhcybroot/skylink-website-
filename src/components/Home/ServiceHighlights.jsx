import { ArrowRight, CheckCircle2, Building, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import propertyBg from '../../assets/Photos/DSC05810.jpg';
import techBg from '../../assets/Photos/DSC05839.jpg';

const ServiceHighlights = () => {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-skylink-blue font-bold tracking-widest text-sm uppercase mb-3 block">Our Ecosystem</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Comprehensive Vertical Solutions</h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        We operate at the intersection of physical asset management and digital process optimization.
                        Two distinct verticals, one unified standard of excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Real Estate Asset Solutions Card */}
                    <div className="group relative h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                        {/* Background Image with Zoom Effect */}
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${propertyBg})` }}></div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95"></div>

                        {/* Content */}
                        <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                            <div className="mb-auto">
                                <div className="inline-flex p-3 rounded-xl bg-white/10 backdrop-blur-md text-white mb-6 border border-white/20">
                                    <Building size={28} />
                                </div>
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-4">Real Estate Asset Solutions</h3>
                            <p className="text-slate-300 mb-8 max-w-md">
                                End-to-end stewardship for distressed and REO properties. We restore value through precision renovation and maintenance.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-white/90 font-medium">
                                    <CheckCircle2 className="mr-3 text-skylink-blue" size={20} /> Debris Removal & Reclamation
                                </li>
                                <li className="flex items-center text-white/90 font-medium">
                                    <CheckCircle2 className="mr-3 text-skylink-blue" size={20} /> Value-Add Renovations
                                </li>
                                <li className="flex items-center text-white/90 font-medium">
                                    <CheckCircle2 className="mr-3 text-skylink-blue" size={20} /> Regulatory Compliance Inspections
                                </li>
                            </ul>

                            <Link to="/property" className="inline-flex items-center font-bold text-white hover:text-skylink-blue transition-colors group/link">
                                Explore Capability <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover/link:translate-x-2" />
                            </Link>
                        </div>
                    </div>

                    {/* Digital Strategy & Operations Card */}
                    <div className="group relative h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                        {/* Background Image with Zoom Effect */}
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${techBg})` }}></div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95"></div>

                        {/* Content */}
                        <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                            <div className="mb-auto">
                                <div className="inline-flex p-3 rounded-xl bg-white/10 backdrop-blur-md text-white mb-6 border border-white/20">
                                    <Monitor size={28} />
                                </div>
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-4">Digital Strategy & Operations</h3>
                            <p className="text-slate-300 mb-8 max-w-md">
                                Scalable BPO frameworks designed for high-growth enterprises. We handle the backend so you can focus on innovation.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-white/90 font-medium">
                                    <CheckCircle2 className="mr-3 text-tech-cyan" size={20} /> Omnichannel CX Management
                                </li>
                                <li className="flex items-center text-white/90 font-medium">
                                    <CheckCircle2 className="mr-3 text-tech-cyan" size={20} /> Data Processing & Analytics
                                </li>
                                <li className="flex items-center text-white/90 font-medium">
                                    <CheckCircle2 className="mr-3 text-tech-cyan" size={20} /> Custom Workflow Development
                                </li>
                            </ul>

                            <Link to="/ites" className="inline-flex items-center font-bold text-white hover:text-tech-cyan transition-colors group/link">
                                Explore Solutions <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover/link:translate-x-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceHighlights;
