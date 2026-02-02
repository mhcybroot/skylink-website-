import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="bg-skylink-navy py-24 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
                    Ready to Optimize Operations?
                </h2>
                <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
                    Join the industry leaders who rely on Skylink for precision, compliance, and scale.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-0">
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-10 py-5 bg-skylink-gold text-white font-bold text-lg uppercase tracking-wider hover:bg-yellow-600 transition-colors"
                    >
                        Schedule Consultation <ArrowRight className="ml-3 w-5 h-5" />
                    </Link>
                    <Link
                        to="/about"
                        className="inline-flex items-center justify-center px-10 py-5 bg-transparent border border-white text-white font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-skylink-navy transition-colors"
                    >
                        View Corporate Profile
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
