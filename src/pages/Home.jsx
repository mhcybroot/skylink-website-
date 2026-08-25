import SEO from '../components/SEO';
import AuraHero from '../components/Home/AuraHero';
import TechMarquee from '../components/UI/TechMarquee';
import AuraAbout from '../components/Home/AuraAbout';
import AuraFeatures from '../components/Home/AuraFeatures';
import AuraWhyChoose from '../components/Home/AuraWhyChoose';
import AuraWorkflow from '../components/Home/AuraWorkflow';
import AuraShowcase from '../components/Home/AuraShowcase';
import AuraTestimonials from '../components/Home/AuraTestimonials';
import AuraCTA from '../components/Home/AuraCTA';
import ScrollReveal from '../components/UI/ScrollReveal';

const Home = () => {
    const homeStructuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Skylink Innovations Ltd.',
            url: 'https://skylinkltd.ai',
            potentialAction: {
                '@type': 'SearchAction',
                target: 'https://skylinkltd.ai/#services?q={search_term_string}',
                'query-input': 'required name=search_term_string'
            }
        }
    ];

    return (
        <div className="flex flex-col min-h-screen relative z-10 bg-black">
            <SEO
                title="Skylink Innovations Ltd. | Next-Generation IT Solutions & US Property Preservation"
                description="We transform complex technological challenges into scalable, efficient, and secure digital workflows. Partner with Skylink Innovations Ltd to accelerate your digital transformation."
                canonical="https://skylinkltd.ai"
                structuredData={homeStructuredData}
            />

            {/* Aura Hero Section */}
            <section id="hero">
                <AuraHero />
            </section>

            {/* Infinite Horizontal Dual Marquee */}
            <TechMarquee />

            {/* About Us & Strategic Mission/Vision */}
            <ScrollReveal type="fadeUp">
                <AuraAbout />
            </ScrollReveal>

            {/* Core IT-Enabled Services Bento Section */}
            <ScrollReveal type="fadeUp">
                <AuraFeatures />
            </ScrollReveal>

            {/* Why Choose Skylink Innovations */}
            <ScrollReveal type="fadeUp">
                <AuraWhyChoose />
            </ScrollReveal>

            {/* Execution Methodology & Workflow */}
            <AuraWorkflow />

            {/* Real-time Telemetry Showcase */}
            <ScrollReveal type="fadeUp">
                <AuraShowcase />
            </ScrollReveal>

            {/* Social Proof & Testimonials */}
            <ScrollReveal type="fadeUp">
                <AuraTestimonials />
            </ScrollReveal>

            {/* High-Impact Bottom CTA */}
            <ScrollReveal type="fadeUp">
                <AuraCTA />
            </ScrollReveal>
        </div>
    );
};

export default Home;
