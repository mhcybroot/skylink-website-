import { Headset, Database, Code, PieChart, ShieldCheck, Clock } from 'lucide-react';
import Card from '../components/UI/Card';

const ITESServices = () => {
    const services = [
        {
            title: "Customer Support (BPO)",
            description: "24/7 inbound and outbound call center services, live chat support, and email handling to keep your customers happy around the clock.",
            icon: Headset
        },
        {
            title: "Back Office Processing",
            description: "Efficient data entry, document processing, and virtual assistant services to streamline your operations and reduce overhead.",
            icon: Database
        },
        {
            title: "Digital Services",
            description: "Custom software development, web application design, and AI-driven solutions tailored to modernize your business infrastructure.",
            icon: Code
        },
        {
            title: "Finance & Accounting",
            description: "Comprehensive bookkeeping, payroll processing, and financial reporting services ensuring accuracy and compliance.",
            icon: PieChart
        }
    ];

    return (
        <div className="pt-24 pb-16 bg-slate-900 text-white min-h-screen">
            {/* Header */}
            <div className="bg-tech-cyan/10 border-b border-tech-cyan/20 py-16 mb-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">ITES & BPO Solutions</h1>
                    <p className="text-xl max-w-3xl mx-auto text-cyan-100">
                        Driving digital transformation with scalable, secure, and 24/7 global support services.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Service Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            className="bg-slate-800 border border-slate-700 text-white hover:border-tech-cyan/50"
                        />
                    ))}
                </div>

                {/* Why ITES */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-12">The Skylink Digital Advantage</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-slate-800 rounded-xl shadow-lg border-t-4 border-tech-cyan">
                            <Clock size={48} className="text-tech-cyan mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">24/7 Availability</h3>
                            <p className="text-slate-400">Our teams work in shifts to ensure your business never sleeps, covering all global time zones.</p>
                        </div>
                        <div className="p-6 bg-slate-800 rounded-xl shadow-lg border-t-4 border-tech-cyan">
                            <ShieldCheck size={48} className="text-tech-cyan mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Data Security</h3>
                            <p className="text-slate-400">ISO-compliant security protocols to protect your sensitive business and customer data.</p>
                        </div>
                        <div className="p-6 bg-slate-800 rounded-xl shadow-lg border-t-4 border-tech-cyan">
                            <Users size={48} className="text-tech-cyan mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Skilled Talent</h3>
                            <p className="text-slate-400">Access to a pool of highly trained professionals and university graduates in Bangladesh.</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Background Network Graphic Placeholder */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
    );
};

import { Users } from 'lucide-react'; // Late import for usage

export default ITESServices;
