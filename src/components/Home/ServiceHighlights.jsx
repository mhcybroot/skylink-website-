import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import propertyBg from '../../assets/Photos/DSC05810.jpg';
import meeting02 from '../../assets/meeting-02.webp';

const ServiceHighlights = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Solutions</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Distinct verticals, united by excellence. We deliver precision in both physical infrastructure and digital operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Property Card */}
                    <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-all hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-skylink-blue/90 to-blue-900/90 z-10 opacity-90"></div>
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${propertyBg})` }}></div>
                        <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-6">Property Preservation</h3>
                                <ul className="space-y-4 mb-8">
                                    {[
                                        "Initial Inspections & Reporting",
                                        "REO Maintenance & Trash-out",
                                        "Complete Fix & Flip Renovations"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center text-white/90">
                                            <CheckCircle2 className="mr-3 w-5 h-5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link to="/property" className="inline-block w-full py-3 text-center bg-white text-skylink-blue font-semibold rounded-lg hover:bg-blue-50 transition">
                                View Capabilities
                            </Link>
                        </div>
                    </div>

                    {/* ITES Card */}
                    <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-all hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-tech-cyan/90 to-blue-900/90 z-10 opacity-90"></div>
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${meeting02})` }}></div>
                        <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-6">ITES & BPO Services</h3>
                                <ul className="space-y-4 mb-8">
                                    {[
                                        "24/7 Global Customer Support",
                                        "Back Office & Data Processing",
                                        "Custom Software Development"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center text-white/90">
                                            <CheckCircle2 className="mr-3 w-5 h-5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link to="/ites" className="inline-block w-full py-3 text-center bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition">
                                View Solutions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceHighlights;
