import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const IntroductionSection = () => {
    return (
        <section className="relative py-24 bg-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-32 z-0 opacity-50"></div>
            <div className="absolute top-20 left-12 w-24 h-24 rounded-full bg-skylink-blue/5 blur-3xl"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Headlines & Impact */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="h-0.5 w-12 bg-skylink-blue"></div>
                            <span className="text-skylink-blue font-bold tracking-widest text-sm uppercase">The Skylink Advantage</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-8">
                            Engineering Precision for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-skylink-blue to-tech-cyan">Your Asset Lifecycle.</span>
                        </h2>

                        <div className="space-y-5">
                            <div className="flex items-start">
                                <CheckCircle2 className="text-skylink-blue mt-1 mr-3 flex-shrink-0" size={20} />
                                <p className="text-slate-600 font-medium">Unified solutions for physical and digital infrastructure.</p>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle2 className="text-skylink-blue mt-1 mr-3 flex-shrink-0" size={20} />
                                <p className="text-slate-600 font-medium">Scalable BPO workflows that reduce operational overhead.</p>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle2 className="text-skylink-blue mt-1 mr-3 flex-shrink-0" size={20} />
                                <p className="text-slate-600 font-medium">End-to-end project management with transparent reporting.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Narrative & CTA */}
                    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100 relative">
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-tech-cyan to-skylink-blue opacity-10 rounded-full blur-2xl"></div>

                        <h3 className="text-xl font-bold text-slate-900 mb-4">Bridging the Gap</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            In a rapidly evolving market, fragmented services slow you down. Skylink Innovations Ltd. integrates top-tier property preservation with cutting-edge IT enabled services.
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            Whether you need to revitalize a distressed asset or optimize a customer support system, we provide the singular expertise to drive efficiency and growth.
                        </p>

                        <Link to="/about" className="group inline-flex items-center font-bold text-skylink-blue hover:text-blue-800 transition-colors">
                            Discover Our Mission
                            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntroductionSection;
