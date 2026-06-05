import CorporateHero from '../components/Home/CorporateHero';
import SEO from '../components/SEO';
import StatsSection from '../components/Home/StatsSection';
import IntroductionSection from '../components/Home/IntroductionSection';
import ServiceHighlights from '../components/Home/ServiceHighlights';
import ImageMarquee from '../components/Home/ImageMarquee';
import WorkflowSection from '../components/Home/WorkflowSection';
import Testimonials from '../components/Home/Testimonials';
import CTASection from '../components/Home/CTASection';
import ScrollReveal from '../components/UI/ScrollReveal';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen relative z-10 bg-transparent">
            <SEO title="Home" description="Skylink Innovations Ltd. - Strategic Asset Management & Global BPO Solutions." />
            
            <section id="hero"><CorporateHero /></section>
            
            <ScrollReveal type="fadeUp" delay={0.2}>
                <section id="stats" className="relative z-20"><StatsSection /></section>
            </ScrollReveal>
            
            <ScrollReveal type="3D" parallax={true}>
                <section id="about" className="relative z-10"><IntroductionSection /></section>
            </ScrollReveal>
            
            <ScrollReveal type="fadeUp">
                <section id="services" className="relative z-20"><ServiceHighlights /></section>
            </ScrollReveal>
            
            <ScrollReveal type="fadeUp" delay={0.1}>
                <section id="gallery" className="relative z-10"><ImageMarquee /></section>
            </ScrollReveal>
            
            <ScrollReveal type="3D">
                <section id="workflow" className="relative z-20"><WorkflowSection /></section>
            </ScrollReveal>
            
            <ScrollReveal type="fadeUp">
                <section id="testimonials" className="relative z-10"><Testimonials /></section>
            </ScrollReveal>
            
            <ScrollReveal type="zoomIn">
                <section id="contact" className="relative z-20"><CTASection /></section>
            </ScrollReveal>
        </div>
    );
};

export default Home;
