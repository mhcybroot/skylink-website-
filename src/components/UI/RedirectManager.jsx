import { useLocation, Navigate } from 'react-router-dom';

/**
 * Common typo, alias, and legacy URL mappings
 */
const aliasMap = {
    // About aliases
    '/about-us': '/about',
    '/company': '/about',
    '/who-we-are': '/about',
    '/team': '/about',
    
    // Culture & Gallery aliases
    '/gallery': '/culture',
    '/culture-and-gallery': '/culture',
    '/life-at-skylink': '/culture',
    '/our-culture': '/culture',
    '/photos': '/culture',
    '/workplace': '/culture',
    
    // Contact aliases
    '/contact-us': '/contact',
    '/get-in-touch': '/contact',
    '/reach-us': '/contact',
    '/support': '/contact',
    '/inquiry': '/contact',

    // Careers aliases
    '/career': '/careers',
    '/jobs': '/careers',
    '/job': '/careers',
    '/join-us': '/careers',
    '/hiring': '/careers',
    '/recruitment': '/careers',

    // US Property Preservation aliases
    '/property-preservation': '/property',
    '/preservation': '/property',
    '/reo': '/property',
    '/reo-services': '/property',
    '/us-property': '/property',
    '/property-services': '/property',

    // Global ITES & BPO aliases
    '/bpo': '/ites',
    '/bpo-services': '/ites',
    '/ites-services': '/ites',
    '/ites-bpo': '/ites',
    '/call-center': '/ites',

    // Services domain aliases
    '/service': '/#services',
    '/services': '/#services',
    '/services/cloud': '/services/cloud-solutions',
    '/services/cloud-infrastructure': '/services/cloud-solutions',
    '/services/aws': '/services/cloud-solutions',
    '/services/security': '/services/cybersecurity',
    '/services/cyber-security': '/services/cybersecurity',
    '/services/soc': '/services/cybersecurity',
    '/services/software': '/services/software-development',
    '/services/web-development': '/services/software-development',
    '/services/app-development': '/services/software-development',
    '/services/managed-it-services': '/services/managed-it',
    '/services/helpdesk': '/services/managed-it',
    '/services/analytics': '/services/data-analytics',
    '/services/bi': '/services/data-analytics',
    '/services/consulting': '/services/it-consulting',
    '/services/strategy': '/services/it-consulting'
};

/**
 * RedirectManager Component
 * Normalizes trailing slashes, case variations, and common URL typos/aliases.
 */
const RedirectManager = () => {
    const location = useLocation();
    const rawPath = location.pathname;

    // 1. Normalize trailing slash (if length > 1, e.g. '/about-us/' -> '/about-us')
    let cleanPath = rawPath;
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
        cleanPath = cleanPath.slice(0, -1);
    }

    // 2. Normalize to lowercase
    cleanPath = cleanPath.toLowerCase();

    // 3. Check exact match in alias dictionary
    if (aliasMap[cleanPath]) {
        const target = aliasMap[cleanPath] + (location.search || '') + (location.hash || '');
        return <Navigate to={target} replace />;
    }

    // 4. If path had trailing slash or uppercase characters, redirect to clean path
    if (cleanPath !== rawPath && !rawPath.startsWith('/#')) {
        const target = cleanPath + (location.search || '') + (location.hash || '');
        return <Navigate to={target} replace />;
    }

    return null;
};

export default RedirectManager;
