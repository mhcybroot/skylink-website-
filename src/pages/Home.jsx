import CorporateHero from '../components/Home/CorporateHero';
import StatsSection from '../components/Home/StatsSection';
import IntroductionSection from '../components/Home/IntroductionSection';
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

            <IntroductionSection />

            <ServiceHighlights />
            <ImageMarquee />
            <WorkflowSection />
            <Testimonials />
            <CTASection />
        </div>
    );
};

export default Home;
