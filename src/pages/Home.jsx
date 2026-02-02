import CorporateHero from '../components/Home/CorporateHero';
import StatsSection from '../components/Home/StatsSection';
import ServiceHighlights from '../components/Home/ServiceHighlights';
import ImageMarquee from '../components/Home/ImageMarquee';
import WorkflowSection from '../components/Home/WorkflowSection';
import Testimonials from '../components/Home/Testimonials';
import CTASection from '../components/Home/CTASection';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <CorporateHero />
            <StatsSection />

            {/* Introduction */}
            <section className="py-20 bg-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <span className="text-skylink-blue font-semibold tracking-wider text-sm uppercase mb-2 block">Our Promise</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Global Excellence. Dual Expertise.</h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Skylink Innovations Ltd. bridges the gap between physical infrastructure preservation and digital operational efficiency.
                        Whether you need to restore a property or streamline your business processes, we have the specialized teams to deliver.
                    </p>
                </div>
            </section>

            <ServiceHighlights />
            <ImageMarquee />
            <WorkflowSection />
            <Testimonials />
            <CTASection />
        </div>
    );
};

export default Home;
