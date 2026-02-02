import { Users, Globe, Target, UserCheck } from 'lucide-react';
import Card from '../components/UI/Card';

import chairmanImg from '../assets/chairman.webp';
import mdImg from '../assets/managing-director.webp';
import ceoImg from '../assets/ceo.webp';

const About = () => {
    // Placeholder function for images until integrated
    const leaders = [
        { name: "Chairman Name", role: "Chairman", img: chairmanImg },
        { name: "MD Name", role: "Managing Director", img: mdImg },
        { name: "CEO Name", role: "Chief Executive Officer", img: ceoImg },
    ];

    return (
        <div className="pt-24 pb-16 bg-white">
            {/* Hero Section */}
            <div className="bg-skylink-blue text-white py-20 mb-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About Skylink Innovations</h1>
                    <p className="text-xl max-w-3xl mx-auto text-blue-100">
                        A global dual-vertical powerhouse delivering excellence in Property Preservation and IT Enabled Services.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-skylink-blue">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                            <Globe className="mr-3 text-skylink-blue" /> Our Mission
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            To revolutionize the service industry by delivering top-tier property preservation solutions while simultaneously empowering global businesses through cutting-edge BPO and IT support. We strive to create value for our clients, opportunities for our talent, and growth for our communities.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-tech-cyan">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                            <UserCheck className="mr-3 text-tech-cyan" /> Our Vision
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            To be the most trusted global partner for both real estate investors and technology-driven enterprises, recognized for our speed, precision, and unwavering commitment to quality across USA, Australia, and Bangladesh.
                        </p>
                    </div>
                </div>

                {/* Leadership Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Leadership Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {leaders.map((leader, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="w-48 h-48 bg-slate-200 rounded-full mb-4 overflow-hidden shadow-lg border-4 border-white">
                                    {/* {leader.img && <img src={leader.img} alt={leader.name} className="w-full h-full object-cover" />} */}
                                    {leader.img && <img src={leader.img} alt={leader.name} className="w-full h-full object-cover" />}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{leader.name}</h3>
                                <p className="text-skylink-blue font-medium">{leader.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Group Info */}
                <div className="text-center bg-slate-900 text-white rounded-2xl p-12">
                    <h2 className="text-2xl font-bold mb-4">Part of a Global Network</h2>
                    <p className="text-slate-300 mb-6">
                        Skylink Innovations Ltd. is proud to be a sister concern of <span className="font-bold text-white">NEXUS Netro Limited</span>, leveraging shared expertise in technology and infrastructure.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default About;
