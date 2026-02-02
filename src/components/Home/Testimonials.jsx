import { Quote, Star, ShieldCheck } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            quote: "Skylink has been a game-changer for our REO portfolio. Their turnaround time on preservation orders is unmatched.",
            author: "Sarah Johnson",
            role: "Asset Manager, NY Asset Corp",
            initials: "SJ",
            vertical: "Property"
        },
        {
            quote: "We outsourced our entire Tier-1 support to Skylink's BPO division. The transition was seamless and CSAT scores went up 15%.",
            author: "James Chen",
            role: "CTO, TechFlow Solutions",
            initials: "JC",
            vertical: "ITES"
        },
        {
            quote: "The renovation team transformed our distressed property into a market-ready gem in just 3 weeks. Incredible efficiency.",
            author: "Michael Ross",
            role: "Real Estate Investor",
            initials: "MR",
            vertical: "Property"
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-skylink-blue font-bold tracking-widest text-sm uppercase mb-3 block">Success Stories</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Trusted by Industry Leaders</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        We don't just deliver services; we build lasting partnerships that drive growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="group relative p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            {/* Verified Badge */}
                            <div className="absolute top-6 right-6 flex items-center space-x-1 text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-400/10 px-2 py-1 rounded-full border border-green-200 dark:border-green-400/20">
                                <ShieldCheck size={14} />
                                <span>Verified Partner</span>
                            </div>

                            {/* Stars */}
                            <div className="flex space-x-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <Quote className="w-8 h-8 text-skylink-blue/20 dark:text-skylink-blue/50 mb-4" />
                            <p className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed mb-8 font-serif italic relative z-10">
                                "{item.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-skylink-blue dark:text-white font-bold text-lg mr-4">
                                    {item.initials}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{item.author}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
