import { Briefcase, ArrowRight } from 'lucide-react';
import Button from '../components/UI/Button';

const Careers = () => {
    const jobs = [
        {
            title: "Senior Business Development Executive",
            department: "Corporate",
            location: "Dhaka (HQ)",
            type: "Full-Time",
            description: "Driving growth for our BPO and Real Estate verticals in international markets."
        },
        {
            title: "BPO Team Lead (Voice Process)",
            department: "ITES / BPO",
            location: "Dhaka",
            type: "Full-Time (Night Shift)",
            description: "Leading a team of support agents handling US-based client accounts."
        },
        {
            title: "Property Preservation Coordinator",
            department: "Real Estate Operations",
            location: "Remote / Hybrid",
            type: "Full-Time",
            description: "Managing work orders and coordinating with field vendors in the USA."
        }
    ];

    return (
        <div className="pt-24 pb-16 bg-white min-h-screen">
            <div className="bg-gradient-to-r from-skylink-blue to-blue-900 text-white py-16 mb-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Skylink Innovations</h1>
                    <p className="text-xl max-w-2xl mx-auto text-blue-100">
                        Build a career with a global leader. We are always looking for passionate talent to join our growing family.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row gap-12">

                    {/* Job Listings */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                            <Briefcase className="mr-3 text-skylink-blue" /> Current Openings
                        </h2>
                        <div className="space-y-6">
                            {jobs.map((job, index) => (
                                <div key={index} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 hover:text-skylink-blue cursor-pointer transition">{job.title}</h3>
                                            <div className="flex space-x-4 mt-2 text-sm text-slate-500">
                                                <span className="bg-blue-50 text-skylink-blue px-2 py-1 rounded">{job.department}</span>
                                                <span>{job.location}</span>
                                                <span>{job.type}</span>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="hidden sm:inline-flex py-2 px-4 text-sm">Apply Now</Button>
                                    </div>
                                    <p className="text-slate-600 mb-4">{job.description}</p>
                                    <button className="text-skylink-blue font-semibold text-sm flex items-center sm:hidden">
                                        Apply Now <ArrowRight size={16} className="ml-1" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Resume Drop */}
                    <div className="w-full md:w-80">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 sticky top-28">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Don't see a fit?</h3>
                            <p className="text-slate-600 text-sm mb-6">
                                We are always hiring great talent. Drop your resume and we will contact you when a position matches your skills.
                            </p>
                            <a
                                href="https://forms.google.com/your-form-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center py-3 bg-skylink-blue text-white rounded-md font-semibold hover:bg-blue-800 transition"
                            >
                                Submit General Application
                            </a>
                            <p className="text-xs text-slate-400 mt-4 text-center">
                                Or email us at <a href="mailto:careers@skylinkltd.ai" className="text-skylink-blue hover:underline">careers@skylinkltd.ai</a>
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Careers;
