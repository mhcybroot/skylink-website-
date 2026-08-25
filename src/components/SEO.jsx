import { Helmet } from 'react-helmet-async';

/**
 * Enhanced SEO & JSON-LD Structured Data Component
 * Automatically injects OpenGraph, Twitter Cards, canonical links,
 * and Schema.org JSON-LD structured data (Organization, JobPosting, Service, Breadcrumbs).
 */
const SEO = ({
    title = 'Skylink Innovations Ltd. | Global ITES & US Property Preservation',
    description = 'Next-generation IT-Enabled Services, Bespoke Software Engineering, Cloud Architecture, and Nationwide US Property Preservation.',
    keywords = 'Skylink, Skylink Innovations, Skylink Ltd, Skylink Innovations Ltd, Skylink IT, Skylink ITES, Skylink Property Preservation, Skylink Bangladesh, US Property Preservation, ITES, BPO, Software Engineering, Cloud Solutions, Dhaka Tech',
    canonical = 'https://skylinkltd.ai',
    ogType = 'website',
    ogImage = 'https://skylinkltd.ai/logo.png',
    structuredData = null
}) => {
    // Default Organization JSON-LD Schema
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Skylink Innovations Ltd.',
        alternateName: [
            'Skylink',
            'Skylink Ltd',
            'Skylink Innovations',
            'Skylink Ltd.',
            'Skylink IT',
            'Skylink ITES',
            'Skylink Property Preservation',
            'Skylink Bangladesh'
        ],
        url: 'https://skylinkltd.ai',
        logo: 'https://skylinkltd.ai/logo.png',
        description: 'Global IT-Enabled Services and Nationwide US Property Preservation provider delivering 24/7 mission-critical operations.',
        email: 'hr@skylinkltd.ai',
        telephone: '+1 (800) 555-SKYLINK',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '7th Floor, Badar Heights, House# 262-263, Road# 1, Block# B, Bashundhara R/A',
            addressLocality: 'Dhaka',
            postalCode: '1229',
            addressCountry: 'BD'
        },
        sameAs: [
            'https://github.com/mhcybroot/skylink-website',
            'https://linkedin.com/company/skylink-innovations'
        ],
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: '+1 (800) 555-SKYLINK',
                contactType: 'customer support',
                email: 'hr@skylinkltd.ai',
                availableLanguage: ['English', 'Bengali']
            },
            {
                '@type': 'ContactPoint',
                telephone: '+1 (888) 234-SKYLINK',
                contactType: 'technical support',
                email: 'contact@skylinkltd.ai',
                availableLanguage: ['English']
            }
        ]
    };

    // Combine organization schema with page-specific schema
    const combinedSchemas = structuredData
        ? Array.isArray(structuredData)
            ? [organizationSchema, ...structuredData]
            : [organizationSchema, structuredData]
        : [organizationSchema];

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title.includes('Skylink') ? title : `${title} | Skylink Innovations Ltd.`}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={canonical} />
            <meta property="og:site_name" content="Skylink Innovations Ltd." />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Inject JSON-LD Structured Data */}
            {combinedSchemas.map((schema, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEO;
