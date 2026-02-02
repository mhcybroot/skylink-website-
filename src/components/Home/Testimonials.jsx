import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            quote: "Skylink has been a game-changer for our REO portfolio. Their turnaround time on preservation orders is unmatched.",
            author: "Sarah Johnson",
            role: "Asset Manager, NY Asset Corp",
            company: "NY ASSET CORP"
        },
        {
            quote: "We outsourced our entire Tier-1 support to Skylink's BPO division. The transition was seamless and CSAT scores went up 15%.",
            author: "James Chen",
            role: "CTO, TechFlow Solutions",
            company: "TECHFLOW"
        },
        {
            quote: "The renovation team transformed our distressed property into a market-ready gem in just 3 weeks. Incredible efficiency.",
            author: "Michael Ross",
            role: "Investment Director",
            company: "ROSS CAPITAL"
        }
    ];

    return (
        <section className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 border-l-4 border-skylink-navy pl-6">
                    <h2 className="text-3xl font-bold text-skylink-navy uppercase tracking-tight">Executive Trust</h2>
                    <p className="text-slate-500 mt-2">Validated performance across sectors.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200 bg-white">
                    {testimonials.map((item, index) => (
                        <div key={index} className={`p-10 border-b md:border-b-0 border-slate-200 ${index !== 2 ? 'md:border-r' : ''} hover:bg-slate-50 transition-colors`}>
                            <div className="flex space-x-1 mb-8">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="text-skylink-gold fill-skylink-gold" />
                                ))}
                            </div>

                            <p className="text-xl font-serif text-skylink-navy mb-8 leading-relaxed italic">
                                "{item.quote}"
                            </p>

                            <div className="border-t border-slate-100 pt-6">
                                <h4 className="font-bold text-skylink-navy text-sm uppercase tracking-wide">{item.author}</h4>
                                <p className="text-xs text-slate-500 mt-1">{item.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
