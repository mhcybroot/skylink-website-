import { Hammer, Home, PenTool, Trash2, CheckCircle } from 'lucide-react';
import Card from '../components/UI/Card';

const PropertyServices = () => {
    const services = [
        {
            title: "Property Inspections & Preservation",
            description: "Comprehensive audits and preservation to protect your assets from deterioration and damage. We ensure your property remains compliant and secure.",
            icon: Home
        },
        {
            title: "Renovation & Remodeling",
            description: "Full-scale Fix & Flip renovation services. From kitchen upgrades to structural repairs, we increase property value for maximum ROI.",
            icon: Hammer
        },
        {
            title: "Maintenance Solutions",
            description: "Routine and emergency maintenance including HVAC checkups, plumbing repairs, and electrical system diagnostics.",
            icon: PenTool
        },
        {
            title: "Cleaning & Trash-out",
            description: "Professional debris removal and deep cleaning services to prepare properties for sale or new tenants immediately.",
            icon: Trash2
        }
    ];

    return (
        <div className="pt-24 pb-16 bg-slate-50">
            {/* Header */}
            <div className="bg-skylink-blue text-white py-16 mb-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Property Preservation & Real Estate Services</h1>
                    <p className="text-xl max-w-3xl mx-auto text-blue-100">
                        Protecting assets, renovating homes, and maximizing value for investors in the USA and Australia.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Service Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            className="border-t-4 border-skylink-blue"
                        />
                    ))}
                </div>

                {/* Gallery Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Project Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Before/After Placeholders */}
                        <div className="group relative overflow-hidden rounded-xl shadow-lg">
                            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-bold z-10">Before</div>
                            <div className="h-64 bg-slate-300 flex items-center justify-center text-slate-500">
                                Renovation Placeholder A (Before)
                            </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-xl shadow-lg">
                            <div className="absolute top-4 left-4 bg-skylink-blue text-white px-3 py-1 rounded-full text-sm font-bold z-10">After</div>
                            <div className="h-64 bg-slate-200 flex items-center justify-center text-slate-500">
                                Renovation Placeholder A (After)
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <button className="text-skylink-blue font-semibold hover:underline">View Full Portfolio &rarr;</button>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Asset Managers Choose Skylink</h2>
                            <ul className="space-y-4">
                                {[
                                    "Fast Turnaround Times (24-48h for initial inspections)",
                                    "Licensed & Insured Professionals",
                                    "Real-time Photo Documentation via App",
                                    "Cost-Effective 'Fix & Flip' Strategies"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <CheckCircle className="text-skylink-blue mr-3 mt-1 flex-shrink-0" size={20} />
                                        <span className="text-slate-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="h-full bg-slate-100 rounded-xl min-h-[300px] flex items-center justify-center text-slate-400">
                            Team Photo Placeholder
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PropertyServices;
