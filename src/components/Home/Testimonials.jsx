import { Quote } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            quote: "Skylink has been a game-changer for our REO portfolio. Their turnaround time on preservation orders is unmatched.",
            author: "Sarah Johnson",
            role: "Asset Manager, NY Asset Corp",
            vertical: "Property"
        },
        {
            quote: "We outsourced our entire Tier-1 support to Skylink's BPO division. The transition was seamless and CSAT scores went up 15%.",
            author: "James Chen",
            role: "CTO, TechFlow Solutions",
            vertical: "ITES"
        },
        {
            quote: "The renovation team transformed our distressed property into a market-ready gem in just 3 weeks.",
            author: "Michael Ross",
            role: "Real Estate Investor",
            vertical: "Property"
        }
    ];

    return (
        <section className="py-24 bg-skylink-blue text-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-tech-cyan/20 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
                    <p className="text-lg text-blue-100">See what our partners say about our dual-vertical expertise.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition">
                            <Quote className="w-10 h-10 text-tech-cyan mb-6 opacity-80" />
                            <p className="text-lg leading-relaxed mb-6 italic">"{item.quote}"</p>
                            <div>
                                <h4 className="font-bold text-white">{item.author}</h4>
                                <p className="text-sm text-blue-200">{item.role}</p>
                                <span className={`inline-block mt-3 px-2 py-1 text-xs font-semibold rounded ${item.vertical === 'Property' ? 'bg-skylink-blue/20 text-blue-200' : 'bg-tech-cyan/20 text-cyan-200'}`}>
                                    {item.vertical} Services
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
