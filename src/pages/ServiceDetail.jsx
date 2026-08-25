import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Code2, 
    Cloud, 
    Headphones, 
    ShieldCheck, 
    BarChart3, 
    Compass, 
    ArrowRight, 
    Sparkles, 
    CheckCircle2, 
    Layers, 
    Cpu, 
    ChevronDown, 
    Server, 
    Shield, 
    Check,
    ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';
import AnimatedCounter from '../components/UI/AnimatedCounter';
import CyberBackground from '../components/UI/CyberBackground';

const servicesData = {
    'software-development': {
        slug: 'software-development',
        title: 'Custom Software & Mobile App Development',
        category: 'Engineering & Full-Stack Architecture',
        badge: 'Bespoke Software Engineering',
        icon: Code2,
        subtitle: 'Bespoke web platforms, native mobile apps, and enterprise microservices engineered for extreme reliability, performance, and scale.',
        stats: [
            { value: '100%', label: 'Custom Architecture', detail: 'Zero cookie-cutter templates' },
            { value: '< 2 wks', label: 'Rapid MVP Sprints', detail: 'Fast-paced agile delivery cycles' },
            { value: '99.99%', label: 'API Uptime SLA', detail: 'High-availability microservices' },
            { value: '100%', label: 'IP & Code Ownership', detail: 'Complete client asset transfer' }
        ],
        overview: 'Off-the-shelf software often constrains your business with rigid workflows and bloated subscriptions. At Skylink Innovations Ltd, we build tailored software solutions crafted around your exact business logic. From high-throughput SaaS platforms and customer portals to cross-platform mobile apps, our engineering squads deliver clean, documented, and thoroughly tested codebases.',
        capabilities: [
            {
                title: 'Full-Stack Web Platforms',
                description: 'Scalable React, Next.js, and Node/Python backends engineered for speed, SEO, and flawless UX.'
            },
            {
                title: 'Cross-Platform Mobile Apps',
                description: 'High-performance iOS and Android applications utilizing React Native and Flutter for unified codebases.'
            },
            {
                title: 'Microservices & API Gateways',
                description: 'Decoupled, containerized service architectures communicating through secure REST and GraphQL interfaces.'
            },
            {
                title: 'Legacy System Modernization',
                description: 'Refactoring monolithic legacy applications into agile, cloud-native microservices with zero downtime.'
            },
            {
                title: 'Automated CI/CD & Testing',
                description: 'End-to-end automated testing pipelines ensuring every production deployment is bug-free and compliant.'
            },
            {
                title: 'Database Architecture & Tuning',
                description: 'High-throughput relational (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) data tier optimizations.'
            }
        ],
        techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Go', 'React Native', 'PostgreSQL', 'Docker', 'GraphQL', 'TailwindCSS', 'Redis'],
        faqs: [
            {
                question: 'Do we own the source code and intellectual property (IP)?',
                answer: 'Yes, absolutely. You retain 100% full ownership of all source code, design assets, and intellectual property developed during the engagement.'
            },
            {
                question: 'How do you handle project management and communication?',
                answer: 'We utilize transparent two-week agile sprint cycles with regular standup updates, shared Jira/Linear backlogs, and dedicated Slack/Teams communication channels.'
            },
            {
                question: 'Can you work with our existing backend or third-party APIs?',
                answer: 'Yes. Our engineers specialize in integrating with legacy enterprise backends, third-party ERPs, payment gateways, CRM systems, and custom internal APIs.'
            }
        ]
    },

    'cloud-infrastructure': {
        slug: 'cloud-infrastructure',
        title: 'Cloud Infrastructure & Migration',
        category: 'Multi-Cloud & DevOps Architecture',
        badge: 'AWS / Azure / Google Cloud',
        icon: Cloud,
        subtitle: 'Architecting, migrating, and managing resilient cloud environments across AWS, Azure, and GCP with zero downtime and optimized costs.',
        stats: [
            { value: 'Zero', label: 'Downtime Migration', detail: 'Phased live traffic transitions' },
            { value: '30-45%', label: 'Cloud Cost Reduction', detail: 'FinOps infrastructure optimization' },
            { value: '99.99%', label: 'Target Availability', detail: 'Redundant multi-zone failover' },
            { value: '24/7', label: 'Cloud SRE Monitoring', detail: 'Continuous health telemetry' }
        ],
        overview: 'Transitioning to or scaling within the cloud requires rigorous architecture planning to balance performance, high availability, and cost efficiency. Skylink Innovations Ltd guides organizations through seamless cloud migrations, Kubernetes cluster orchestration, and Infrastructure as Code (IaC) automation across Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP).',
        capabilities: [
            {
                title: 'Zero-Downtime Cloud Migration',
                description: 'Carefully staged lift-and-shift or cloud-native refactoring transitions that keep your business operating continuously.'
            },
            {
                title: 'Kubernetes & Container Orchestration',
                description: 'Production-grade container deployments with automated scaling, load balancing, and self-healing pods.'
            },
            {
                title: 'Infrastructure as Code (IaC)',
                description: 'Reproducible, version-controlled cloud environments automated with Terraform, CloudFormation, and Ansible.'
            },
            {
                title: 'FinOps Cloud Cost Optimization',
                description: 'Auditing resource utilization, right-sizing compute instances, and eliminating redundant cloud spend.'
            },
            {
                title: 'Multi-Region High Availability',
                description: 'Automated cross-region database replication and DNS failover architectures for disaster recovery.'
            },
            {
                title: 'Serverless Application Architecture',
                description: 'Building ultra-scalable, low-cost serverless pipelines using AWS Lambda, Azure Functions, and Google Cloud Run.'
            }
        ],
        techStack: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes', 'Terraform', 'Docker', 'Ansible', 'Cloudflare', 'Helm', 'Prometheus', 'Grafana', 'Datadog'],
        faqs: [
            {
                question: 'Which cloud provider is best suited for our business?',
                answer: 'We evaluate your application requirements, compliance mandates, and existing software ecosystem to recommend the ideal environment—whether single cloud or hybrid multi-cloud.'
            },
            {
                question: 'How do you prevent data loss during migration?',
                answer: 'We execute comprehensive dry runs, dual-write data replication, and real-time checksum validation to ensure 100% data integrity before DNS cutover.'
            },
            {
                question: 'Do you manage ongoing cloud infrastructure after migration?',
                answer: 'Yes. We offer continuous 24/7 Site Reliability Engineering (SRE), patch management, security auditing, and FinOps cost optimization.'
            }
        ]
    },

    'managed-it': {
        slug: 'managed-it',
        title: 'Managed IT Services & 24/7 Support',
        category: 'Proactive Operations & Helpdesk',
        badge: '99.99% Availability SLA',
        icon: Headphones,
        subtitle: 'Round-the-clock proactive monitoring, rapid helpdesk resolution, and network management ensuring zero downtime and peak productivity.',
        stats: [
            { value: '24/7/365', label: 'Active NOC Coverage', detail: 'Round-the-clock monitoring pods' },
            { value: '< 5 Mins', label: 'Average Response Time', detail: 'Urgent incident SLA response' },
            { value: '99.9%', label: 'First-Contact Resolution', detail: 'Experienced senior engineers' },
            { value: '100%', label: 'Compliance Tracking', detail: 'Full audit trails & logging' }
        ],
        overview: 'Technology failures disrupt revenue, frustrate employees, and damage reputation. Skylink Innovations Ltd acts as your complete dedicated IT department. We deliver 24/7 Network Operations Center (NOC) monitoring, enterprise helpdesk support, server administration, and security patch management so leadership can focus on growth.',
        capabilities: [
            {
                title: '24/7 NOC Telemetry & Monitoring',
                description: 'Real-time telemetry tracking server CPU, memory, network latency, database health, and API availability.'
            },
            {
                title: 'Enterprise Multi-Tier Helpdesk',
                description: 'Fast, empathetic technical support for internal employees across email, chat, phone, and ticketing.'
            },
            {
                title: 'Network & Firewall Administration',
                description: 'Configuring secure VPN tunnels, switches, routers, SD-WAN, and enterprise firewall perimeter defense.'
            },
            {
                title: 'Automated Patch Management',
                description: 'Systematic operating system and software patch updates scheduled to prevent vulnerabilities with zero downtime.'
            },
            {
                title: 'Identity & Access Management (IAM)',
                description: 'Streamlined employee onboarding/offboarding, single sign-on (SSO), multi-factor authentication (MFA), and RBAC.'
            },
            {
                title: 'Disaster Recovery & Backup Verification',
                description: 'Automated daily immutable backups with periodic restore verification drills.'
            }
        ],
        techStack: ['Datadog', 'Jira Service Management', 'PagerDuty', 'Grafana', 'Microsoft 365', 'Active Directory', 'Cisco Meraki', 'Splunk', 'Freshservice', 'Zendesk'],
        faqs: [
            {
                question: 'What is your guaranteed response time for critical outages?',
                answer: 'For Tier-1 critical outages, our SLA guarantees response and triage within 5 minutes, backed by 24/7 escalation engineers.'
            },
            {
                question: 'Can you support remote and distributed teams across time zones?',
                answer: 'Yes. Our follow-the-sun operations support distributed workforces across North America, Europe, Asia, and remote hubs.'
            },
            {
                question: 'How do you handle employee IT onboarding and offboarding?',
                answer: 'We implement automated provisioning workflows ensuring new hires receive credentials and device setups on Day 1, with instant revoking upon departure.'
            }
        ]
    },

    'cybersecurity': {
        slug: 'cybersecurity',
        title: 'Cybersecurity & Compliance Audits',
        category: 'Threat Defense & Risk Management',
        badge: 'Bank-Grade Defense',
        icon: ShieldCheck,
        subtitle: 'Multi-layered threat monitoring, vulnerability assessments, zero-trust architectures, and regulatory compliance to safeguard critical assets.',
        stats: [
            { value: 'Zero-Trust', label: 'Foundational Model', detail: 'Strict identity verification at all layers' },
            { value: '100%', label: 'SOC 2 & ISO Aligned', detail: 'Complete compliance roadmap' },
            { value: '24/7', label: 'SOC Threat Hunting', detail: 'Real-time SIEM anomaly detection' },
            { value: 'Bank-Grade', label: 'Data Encryption', detail: 'AES-256 in transit and at rest' }
        ],
        overview: 'Cyber threats evolve at breakneck speed, making proactive defense non-negotiable. Skylink Innovations Ltd provides enterprise-grade cybersecurity frameworks designed to identify vulnerabilities before attackers do. From penetrating testing and continuous SOC threat hunting to SOC 2 / ISO 27001 audit preparation, we keep your systems impenetrable.',
        capabilities: [
            {
                title: 'Continuous SOC & SIEM Monitoring',
                description: 'Real-time log ingestion and AI anomaly detection to spot and neutralize unauthorized access attempts.'
            },
            {
                title: 'Penetration Testing & Code Audits',
                description: 'Simulated adversary attacks and static/dynamic source code analysis to eliminate zero-day vulnerabilities.'
            },
            {
                title: 'Zero-Trust Network Architecture',
                description: 'Micro-segmentation, continuous authentication, and strict least-privilege access enforcement.'
            },
            {
                title: 'Regulatory & Compliance Readiness',
                description: 'Guiding organizations through SOC 2 Type II, ISO 27001, HIPAA, and GDPR compliance certifications.'
            },
            {
                title: 'Vulnerability Management & Scans',
                description: 'Automated weekly dependency scanning and prioritized CVE remediation roadmaps.'
            },
            {
                title: 'Incident Response & Forensic Planning',
                description: 'Rapid containment playbooks, forensic analysis, and continuity protocols for instant recovery.'
            }
        ],
        techStack: ['CrowdStrike', 'SentinelOne', 'Splunk', 'Cloudflare Zero Trust', 'HashiCorp Vault', 'Burp Suite', 'Wazuh', 'Tenable', 'Wireshark', 'Snyk'],
        faqs: [
            {
                question: 'How do you conduct a cybersecurity audit?',
                answer: 'We analyze your network perimeter, cloud configurations, employee access controls, and code repositories, providing a detailed risk matrix and prioritized remediation plan.'
            },
            {
                question: 'Can you help our company achieve SOC 2 Type II certification?',
                answer: 'Yes. We assist with gap analysis, security policy drafting, technical control implementation, and auditor coordination.'
            },
            {
                question: 'What happens if a security incident occurs?',
                answer: 'Our 24/7 Incident Response squad immediately isolates affected nodes, identifies the attack vector, eliminates the threat, and restores clean verified backups.'
            }
        ]
    },

    'data-analytics': {
        slug: 'data-analytics',
        title: 'Data Analytics & Business Intelligence',
        category: 'Data Engineering & Predictive BI',
        badge: 'Actionable Intelligence',
        icon: BarChart3,
        subtitle: 'Transforming complex data pipelines into interactive executive dashboards, automated reporting, and predictive machine learning models.',
        stats: [
            { value: '10x', label: 'Faster Reporting', detail: 'Automated executive dashboards' },
            { value: '100%', label: 'Data Accuracy', detail: 'Automated ETL validation rules' },
            { value: 'Real-Time', label: 'Streaming Telemetry', detail: 'Instant KPI visibility' },
            { value: 'Predictive', label: 'ML Forecasting', detail: 'Actionable trend insights' }
        ],
        overview: 'Data is only valuable when it drives decisive action. Skylink Innovations Ltd builds modern data stacks that consolidate siloed information from databases, CRMs, APIs, and marketing platforms into unified data warehouses and executive visual dashboards. We empower leadership to make strategic decisions backed by real-time analytics.',
        capabilities: [
            {
                title: 'Executive BI Dashboards',
                description: 'Custom PowerBI, Tableau, and web dashboards offering real-time visibility into revenue, operations, and KPIs.'
            },
            {
                title: 'Data Warehousing & ETL Pipelines',
                description: 'Scalable data lakes built on Snowflake, BigQuery, and Databricks with robust automated dbt transformations.'
            },
            {
                title: 'Predictive Analytics & Forecasting',
                description: 'Statistical modeling and machine learning algorithms forecasting customer churn, demand, and revenue trends.'
            },
            {
                title: 'Customer & Operations Telemetry',
                description: 'Granular user event tracking and operational funnel analysis to pinpoint conversion bottlenecks.'
            },
            {
                title: 'Data Governance & Quality Assurance',
                description: 'Double-entry validation, schema enforcement, and deduplication ensuring single-source-of-truth accuracy.'
            },
            {
                title: 'Embedded Analytics for SaaS',
                description: 'Building customer-facing analytics dashboards directly into your web applications.'
            }
        ],
        techStack: ['Snowflake', 'Google BigQuery', 'PowerBI', 'Tableau', 'dbt', 'Apache Spark', 'Python', 'PostgreSQL', 'Apache Kafka', 'Looker'],
        faqs: [
            {
                question: 'Can you integrate data from different CRMs, ERPs, and marketing tools?',
                answer: 'Yes. We construct automated ingestion pipelines pulling data from Salesforce, HubSpot, Stripe, SQL databases, and external APIs into a central warehouse.'
            },
            {
                question: 'How secure is our data in your analytics pipeline?',
                answer: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256), with column-level role-based access control (RBAC) and anonymization protocols.'
            },
            {
                question: 'Do you provide training for our in-house business teams?',
                answer: 'Yes. We provide complete documentation and interactive training sessions so your stakeholders can easily build custom reports.'
            }
        ]
    },

    'it-consulting': {
        slug: 'it-consulting',
        title: 'IT Consulting & Digital Transformation',
        category: 'Strategic Roadmaps & Audits',
        badge: 'Strategic Advisory',
        icon: Compass,
        subtitle: 'Aligning technology investments with business objectives through comprehensive architecture audits, bottleneck elimination, and digital roadmaps.',
        stats: [
            { value: 'Clear', label: 'Digital Roadmaps', detail: 'Prioritized quarterly milestones' },
            { value: '30%+', label: 'Efficiency Gains', detail: 'Eliminating manual bottlenecks' },
            { value: 'Fractional', label: 'CTO / CIO Advisory', detail: 'Senior technology leadership' },
            { value: 'Zero', label: 'Vendor Bias', detail: 'Objective technology selection' }
        ],
        overview: 'Selecting the wrong technology stack or architecture can stall growth and waste substantial capital. Skylink Innovations Ltd provides senior consulting and advisory services. We analyze your operational workflows, audit legacy software, benchmark cloud infrastructure, and produce an actionable transformation roadmap to drive velocity.',
        capabilities: [
            {
                title: 'Architecture & Scalability Audits',
                description: 'In-depth assessment of your software architecture, identify bottlenecks, and recommend high-impact fixes.'
            },
            {
                title: 'Fractional CTO / CIO Leadership',
                description: 'Senior strategic technology guidance for scaling startups and enterprises navigating digital transformation.'
            },
            {
                title: 'Vendor & Tooling Due Diligence',
                description: 'Objective evaluation of third-party platforms, SaaS software, and vendor contracts to maximize ROI.'
            },
            {
                title: 'Digital Process Automation Blueprints',
                description: 'Mapping repetitive manual workflows and designing automated software solutions to cut overhead.'
            },
            {
                title: 'Tech Debt Remediation Plans',
                description: 'Structured, phased roadmaps to refactor legacy technical debt without halting ongoing feature delivery.'
            },
            {
                title: 'Security & Compliance Roadmapping',
                description: 'Aligning infrastructure and company policies with institutional investor and enterprise client requirements.'
            }
        ],
        techStack: ['TOGAF Framework', 'Agile / Scrum Governance', 'Jira / Confluence', 'FinOps Auditing', 'Lucidchart Architecture', 'Enterprise Security Baselines'],
        faqs: [
            {
                question: 'What does an initial IT consulting engagement look like?',
                answer: 'We begin with a discovery phase interviewing your key stakeholders, auditing your tech stack and workflows, and delivering a comprehensive Architecture & Strategy Report.'
            },
            {
                question: 'Can Skylink also implement the recommendations from the audit?',
                answer: 'Yes. We provide end-to-end execution, providing the engineering, cloud, and QA squads needed to implement every milestone on the roadmap.'
            },
            {
                question: 'How do you measure the ROI of digital transformation consulting?',
                answer: 'We establish clear quantitative KPIs at project kickoff, including OpEx cost savings, deployment velocity, system uptime, and manual hours saved.'
            }
        ]
    }
};

const ServiceDetail = () => {
    const { serviceSlug } = useParams();
    const service = servicesData[serviceSlug];
    const [openFaq, setOpenFaq] = useState(null);

    // If slug not found, redirect to home services section
    if (!service) {
        return <Navigate to="/#services" replace />;
    }

    const Icon = service.icon;

    // Contextual Cyber Variant mapping per service domain
    const getServiceVariant = (slug) => {
        switch (slug) {
            case 'software-development':
                return 'synapse';
            case 'cloud-solutions':
                return 'highway';
            case 'cybersecurity':
                return 'circuit';
            case 'managed-it':
                return 'globe';
            case 'data-analytics':
                return 'highway';
            case 'it-consulting':
                return 'waves';
            default:
                return 'synapse';
        }
    };

    const serviceStructuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            serviceType: service.badge,
            provider: {
                '@type': 'Organization',
                name: 'Skylink Innovations Ltd.',
                url: 'https://skylinkltd.ai'
            },
            description: service.subtitle,
            url: `https://skylinkltd.ai/services/${serviceSlug}`
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://skylinkltd.ai' },
                { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://skylinkltd.ai/#services' },
                { '@type': 'ListItem', position: 3, name: service.title, item: `https://skylinkltd.ai/services/${serviceSlug}` }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-20 px-6 font-sans relative overflow-hidden">
            <SEO
                title={service.title}
                description={service.subtitle}
                canonical={`https://skylinkltd.ai/services/${serviceSlug}`}
                structuredData={serviceStructuredData}
            />

            {/* Contextual Cybernetic Mesh & Ambient Cyan Spotlight Background */}
            <CyberBackground variant={getServiceVariant(serviceSlug)} glowPosition="both" meshOpacity="opacity-25" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
                    <Link to="/" className="hover:text-[#00E5BE] transition-colors">Home</Link>
                    <ChevronRight size={13} />
                    <Link to="/#services" className="hover:text-[#00E5BE] transition-colors">Services</Link>
                    <ChevronRight size={13} />
                    <span className="text-[#00E5BE]">{service.badge}</span>
                </div>

                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="aura-badge mb-4">
                        <Sparkles size={14} className="text-[#00E5BE]" />
                        <span>{service.category}</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                        {service.title}
                    </h1>
                    <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
                        {service.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact" className="btn-aura-primary w-full sm:w-auto">
                            <span>Get a Free Consultation</span>
                            <ArrowRight size={16} />
                        </Link>
                        <a href="#capabilities" className="btn-aura-secondary w-full sm:w-auto">
                            Explore Capabilities
                        </a>
                    </div>
                </div>

                {/* Key Metrics Bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl bg-zinc-950/70 border border-white/10 mb-28 shadow-2xl">
                    {service.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00E5BE] font-mono mb-1">
                                <AnimatedCounter value={stat.value} duration={1.5} />
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-white mb-0.5">
                                {stat.label}
                            </div>
                            <div className="text-[11px] text-slate-400">
                                {stat.detail}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detailed Overview */}
                <div className="aura-glass-card p-6 sm:p-8 md:p-14 bg-zinc-950/70 border border-white/10 mb-28">
                    <div className="max-w-3xl">
                        <div className="text-xs font-mono uppercase tracking-wider text-[#00E5BE] mb-2">
                            Strategic Approach
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                            Engineered for high-throughput enterprise execution.
                        </h2>
                        <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                            {service.overview}
                        </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="pt-8 border-t border-white/10 mt-8">
                        <div className="text-xs font-mono uppercase text-slate-400 mb-4">
                            Technologies & Standards We Utilize:
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {service.techStack.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200 hover:border-[#00E5BE]/40 hover:text-[#00E5BE] transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Core Capabilities Grid */}
                <div id="capabilities" className="mb-28">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="aura-badge mb-3">
                            <Layers size={14} className="text-[#00E5BE]" />
                            <span>Detailed Deliverables</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
                            Key Capabilities & Services
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.capabilities.map((cap, i) => (
                            <div
                                key={i}
                                className="aura-glass-card p-8 bg-zinc-950/70 border border-white/10 hover:border-[#00E5BE]/30 transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-[#00E5BE]/10 border border-[#00E5BE]/30 flex items-center justify-center text-[#00E5BE] font-mono font-bold text-xs mb-6 shadow-aura-sm">
                                        0{i + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00E5BE] transition-colors">
                                        {cap.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {cap.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto mb-28">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                            Frequently Asked Questions
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Common questions about our {service.title.toLowerCase()} engagements.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {service.faqs.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className="aura-glass-card overflow-hidden bg-zinc-950/60 border border-white/10"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                                    >
                                        <span className="font-semibold text-sm sm:text-base text-white">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            size={18}
                                            className={`text-[#00E5BE] transition-transform duration-300 shrink-0 ${
                                                isOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4"
                                            >
                                                {faq.answer}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Call to Action */}
                <div className="aura-glass-card p-10 md:p-16 text-center relative overflow-hidden bg-zinc-950 border border-white/10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00E5BE]/10 rounded-full blur-[140px] pointer-events-none -z-0" />
                    
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="aura-badge mb-4 mx-auto">
                            <ShieldCheck size={14} className="text-[#00E5BE]" />
                            <span>Work With Skylink</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
                            Ready to build your next-generation solution?
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                            Partner with Skylink Innovations Ltd for senior architects, agile execution, and measurable business outcomes.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="btn-aura-primary w-full sm:w-auto">
                                <span>Get a Free Consultation</span>
                                <ArrowRight size={16} />
                            </Link>
                            <Link to="/contact" className="btn-aura-secondary w-full sm:w-auto">
                                <span>Contact Solution Architects</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
