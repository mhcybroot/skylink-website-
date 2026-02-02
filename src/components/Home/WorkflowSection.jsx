import { ClipboardList, Settings, CheckSquare, Rocket } from 'lucide-react';
import step1Img from '../../assets/Photos/DSC05831.jpg';
import step2Img from '../../assets/Photos/DSC05832.jpg';
import step3Img from '../../assets/Photos/DSC05838.jpg';
import step4Img from '../../assets/Photos/DSC05849.jpg';

const WorkflowSection = () => {
    const steps = [
        {
            icon: ClipboardList,
            title: "Analysis & Consulting",
            description: "We start by understanding your specific needs—whether it's a property audit or a BPO workflow assessment.",
            image: step1Img
        },
        {
            icon: Settings,
            title: "Strategic Planning",
            description: "Our experts design a tailored roadmap, selecting the right technologies and resource allocation for you.",
            image: step2Img
        },
        {
            icon: CheckSquare,
            title: "Execution & Quality",
            description: "We deploy our trained teams to execute with precision, adhering to strict quality control standards.",
            image: step3Img
        },
        {
            icon: Rocket,
            title: "Delivery & Growth",
            description: "We deliver results on time, helping you scale operations and maximize ROI efficiently.",
            image: step4Img
        }
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How We Work</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        A seamless, transparent process designed to deliver excellence from start to finish.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 bg-white rounded-xl shadow-lg flex flex-col items-center text-center overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                            {/* Image Header */}
                            <div className="h-40 w-full bg-gray-200 relative">
                                <div className="absolute inset-0 bg-skylink-blue/20 group-hover:bg-transparent transition-colors z-10"></div>
                                <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                            </div>
                            {/* Icon Wrapper (Overlapping) */}
                            <div className="-mt-10 w-20 h-20 bg-white border-4 border-skylink-blue rounded-full flex items-center justify-center text-skylink-blue shadow-md z-20">
                                <step.icon size={32} />
                            </div>

                            <div className="p-6 pt-4">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                            </div>
                            {/* Step Number */}
                            <div className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 font-bold text-skylink-blue shadow-sm z-20">{index + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkflowSection;
