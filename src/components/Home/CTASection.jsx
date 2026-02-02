import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ctaBg from '../../assets/Photos/DSC05860.jpg';

const CTASection = () => {
    return (
        <section className="relative py-32 bg-slate-900 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ctaBg})` }}></div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-skylink-blue/90 mix-blend-multiply"></div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Elevate Your Operations?</h2>
                <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                    Whether you need to preserve a property portfolio or scale your customer support, Skylink is your partner in growth.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    {/* Updated Buttons for dark background */}
                    <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-skylink-blue bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-transform transform hover:scale-105">
                        Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <Link to="/about" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition">
                        Learn More About Us
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
