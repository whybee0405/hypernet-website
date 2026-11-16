/**
 * Service catalogue.
 *
 * Source material: the partner brochures in `extra reference service packages/`,
 * summarised in `docs/services/*.md`. No prices exist in the source material,
 * so every package is quoted per customer. Vendor figures are presented as
 * platform specifications, never as Hypernet service levels.
 */

export type PillarId = 'connect' | 'communicate' | 'protect' | 'automate'

export type Pillar = {
  id: PillarId
  name: string
  verb: string
  line: string
}

export const PILLARS: Pillar[] = [
  {
    id: 'connect',
    name: 'Connect',
    verb: 'Stay online',
    line: 'Business internet and backup links.',
  },
  {
    id: 'communicate',
    name: 'Communicate',
    verb: 'Stay reachable',
    line: 'Phone systems, video and customer channels.',
  },
  {
    id: 'protect',
    name: 'Protect',
    verb: 'Stay secure',
    line: 'Managed email, device and network security.',
  },
  {
    id: 'automate',
    name: 'Automate',
    verb: 'Save time',
    line: 'Data sync between your business systems.',
  },
]

export type ServicePackage = {
  name: string
  tag?: string
  summary: string
  points: string[]
}

export type ServiceFeature = { title: string; body: string }

export type ServiceModule =
  | 'process'
  | 'failover'
  | 'porting'
  | 'compare'
  | 'channels'
  | 'zero-trust'
  | 'layers'
  | 'recipes'

export type Service = {
  slug: string
  name: string
  /** One line for the megamenu and cards. */
  short: string
  pillar: PillarId
  image: string
  /** Realistic scene of the service in use. */
  photo: string
  photoAlt: string
  poweredBy?: string
  metaTitle: string
  metaDescription: string
  title: string
  /** The part of the title set in the serif accent. */
  titleAccent: string
  lead: string
  /** Scroll-lit statement under the hero. */
  statement: string
  /** Words in the statement set in the warm serif accent. */
  statementAccent: string[]
  packagesHeading: string
  packagesIntro: string
  packages: ServicePackage[]
  featuresHeading: string
  features: ServiceFeature[]
  fitHeading: string
  fit: string[]
  /** Bespoke middle section(s), rendered in order. */
  module?: ServiceModule | ServiceModule[]
  /** Published prices for this service, if any. */
  pricingHref?: string
  related: string[]
  ctaHeading: string
  ctaBody: string
}

export const SERVICES: Service[] = [
  /* ---------------------------------------------------------------- CONNECT */
  {
    slug: 'connectivity',
    name: 'Business internet',
    short: 'Fibre, fixed wireless and automatic failover for business sites.',
    pillar: 'connect',
    image: '/brand/connectivity.webp',
    photo: '/brand/people/svc-connectivity.webp',
    photoAlt: 'Illustration: Two technicians mounting a fixed-wireless antenna on a rooftop at golden hour',
    metaTitle: 'Business internet: fibre, wireless and failover',
    metaDescription:
      'Dedicated business fibre, microwave and fixed-wireless links, and managed SD-WAN for South African businesses, installed and monitored by Hypernet engineers.',
    title: 'Business fibre, wireless and',
    titleAccent: 'failover.',
    lead: 'Fibre where it is available, a wireless link where it is not, and a backup connection that takes over automatically if the main line is cut. We design each setup around the site and monitor it around the clock.',
    statement:
      'Card machines, phones and cloud software all stop when the connection drops. We design every installation with a backup path, so a cut cable does not close the business.',
    statementAccent: ['backup', 'path,'],
    packagesHeading: 'Connectivity packages',
    packagesIntro:
      'Each design is sized to your traffic, the equipment already on site and any compliance requirements. Most sites combine two of these.',
    packages: [
      {
        name: 'Dedicated business fibre',
        tag: 'Primary line',
        summary: 'Symmetrical fibre for the main connection.',
        points: [
          'Equal upload and download speeds for cloud apps, video calls and backups',
          'Uptime and latency commitments agreed in writing',
          'Bandwidth increases without new cabling or hardware',
        ],
      },
      {
        name: 'Microwave and fixed wireless',
        tag: 'Fast install, backup',
        summary: 'A radio link that can be installed in days.',
        points: [
          'No trenching, so the site is live sooner than with a new fibre build',
          'Links branches, warehouses and yards to one network',
          'Can run as an automatic backup when the fibre is cut',
        ],
      },
      {
        name: 'Managed SD-WAN',
        tag: 'Traffic management',
        summary: 'Routes each type of traffic over the best available link.',
        points: [
          'Calls and cloud apps sent over the fastest healthy link',
          'Branches, remote staff and cloud services managed from one console',
          'Zero-trust access rules at every network edge',
        ],
      },
    ],
    featuresHeading: 'Included with every connection',
    features: [
      {
        title: 'Site survey before quoting',
        body: 'We check the building, the cabling and where the equipment will go before we give you a price.',
      },
      {
        title: 'Tier-one transit',
        body: 'Traffic is carried over top-tier carrier networks, chosen for the lowest latency from your site.',
      },
      {
        title: '24/7 monitoring',
        body: 'Engineers watch the line around the clock and fix routing problems before they affect your staff.',
      },
      {
        title: 'Traffic priorities',
        body: 'Voice calls and card payments are prioritised over backups and browsing.',
      },
      {
        title: 'Documented installation',
        body: 'We label the cabling, photograph the cabinet and record serial numbers and ports.',
      },
      {
        title: 'Service desk support',
        body: 'Faults go straight to our service desk, which already has your site configuration on record.',
      },
    ],
    fitHeading: 'Suited to',
    fit: [
      'Offices that run on cloud software',
      'Retailers that rely on card payments',
      'Multi-branch and national networks',
      'Sites without fibre coverage',
    ],
    module: 'process',
    related: ['cloudpath', 'unified-communications', 'secure-business'],
    ctaHeading: 'Check availability at your address',
    ctaBody:
      'Send us your address and we will tell you which connections can be installed there and what they cost.',
  },
  {
    slug: 'cloudpath',
    name: 'CloudPath SD-WAN',
    short: 'Bonded internet links with automatic failover.',
    pillar: 'connect',
    image: '/brand/cloudpath.webp',
    photo: '/brand/people/svc-cloudpath.webp',
    photoAlt: 'Illustration: A retail operations manager checking a laptop beside a network appliance in a store back office',
    metaTitle: 'CloudPath SD-WAN: bonded business connectivity with failover',
    metaDescription:
      'CloudPath bonds fibre, LTE, 5G, satellite and Starlink into one connection with automatic failover that keeps your static IP. Managed by Hypernet.',
    title: 'Bonded internet with',
    titleAccent: 'automatic failover.',
    lead: 'CloudPath combines two or more internet links into one connection. If a link fails, traffic moves to the others in under a second and your static IP address stays the same, so calls and card payments keep working.',
    statement:
      'A standard internet line gives you no protection against outages and no control over which traffic comes first. CloudPath treats all your links as one pool and decides every second which traffic goes where.',
    statementAccent: ['one', 'pool'],
    packagesHeading: 'CloudPath features',
    packagesIntro:
      'The network and security layers are separate, so you can change firewall vendor later without rebuilding the network.',
    packages: [
      {
        name: 'Resilience',
        tag: 'Uptime',
        summary: 'Several links working as one.',
        points: [
          'Link bonding for more total bandwidth',
          'Automatic failover that keeps the same static IP',
          'Two-way quality of service, configured automatically',
        ],
      },
      {
        name: 'Traffic routing',
        tag: 'Application-aware',
        summary: 'Priority for the applications that matter most.',
        points: [
          'Application-aware routing with sub-second failover',
          'Works over fibre, LTE, 5G, satellite or Starlink',
          '52+ international points of presence for remote sites',
        ],
      },
      {
        name: 'Security',
        tag: 'Choice of firewall',
        summary: 'Built-in protection with your preferred firewall.',
        points: [
          'Built-in firewall and SASE that block threats in real time',
          'AES 128/256 encryption with HMAC authentication',
          'Supports pfSense, Fortinet and Cisco firewalls',
        ],
      },
    ],
    featuresHeading: 'Management portal',
    features: [
      {
        title: 'Single dashboard',
        body: 'Set up, monitor and support every site from one interface.',
      },
      {
        title: 'Zero-touch provisioning',
        body: 'New devices configure themselves from their MAC address when they are plugged in.',
      },
      {
        title: 'Traffic visibility',
        body: 'Layer 7 inspection shows live bandwidth use per application and flags threats.',
      },
      {
        title: 'SecureConnect',
        body: 'Remote access to equipment on both sides of the CloudPath device, from the modem to printers and cameras.',
      },
    ],
    fitHeading: 'Suited to',
    fit: [
      'Businesses where downtime is expensive',
      'Sites without one reliable line',
      'Branches, kiosks and remote sites',
      'Systems that whitelist your static IP',
    ],
    module: 'failover',
    related: ['connectivity', 'secure-business', 'unified-communications'],
    ctaHeading: 'Plan a CloudPath installation',
    ctaBody:
      'We recommend which links to combine based on how many sites you run and what each one depends on.',
  },

  /* ------------------------------------------------------------ COMMUNICATE */
  {
    slug: 'unified-communications',
    name: 'Unified Communications',
    short: 'Hosted phone extensions that keep your existing numbers.',
    pillar: 'communicate',
    image: '/brand/unified-communications.webp',
    photo: '/brand/people/svc-voip.webp',
    photoAlt: 'Illustration: A receptionist answering a desk phone at a professional practice in Cape Town',
    metaTitle: 'Unified Communications: hosted business phone system',
    metaDescription:
      'Hosted phone extensions for South African businesses from R75 a month. Keep your existing numbers, take calls on a desk phone, PC or mobile app, and add video meetings.',
    title: 'Hosted business',
    titleAccent: 'phone system.',
    lead: 'Keep your existing numbers and take calls on a desk phone, the PC app or the mobile app. Video and team meetings can be added on the same platform, and we manage the connection underneath.',
    statement:
      'Every extension keeps your existing numbers, rings on the desk phone, the PC and the mobile app, and is monitored for call quality alongside the connection it runs on.',
    statementAccent: ['existing', 'numbers,'],
    packagesHeading: 'What you get',
    packagesIntro:
      'Packages start at R75 a month for one extension, month to month with one calendar month’s notice.',
    packages: [
      {
        name: 'Hosted extensions',
        tag: 'Every package',
        summary: 'Your existing numbers, on every device.',
        points: [
          'Number porting handled by us',
          'Desk phone, PC app and mobile app on one extension',
          'Free calls between extensions and between branches',
        ],
      },
      {
        name: 'Call handling',
        tag: 'Included',
        summary: 'The call features most offices use.',
        points: [
          'Auto attendant (virtual reception) and ring groups set by business hours',
          'Call recording, kept for 30 days',
          'Voicemail to email, forwarding, hold and transfer',
        ],
      },
      {
        name: 'Meetings and collaboration',
        tag: 'Additional cost',
        summary: 'Added on the same platform when you need it.',
        points: [
          'Multi-party HD video meetings',
          'Team meetings with screen sharing',
          'Group chat and file sharing',
        ],
      },
    ],
    featuresHeading: 'Phone system features',
    features: [
      {
        title: 'Calls on any device',
        body: 'One extension rings on the desk phone, the PC app and the mobile app at the same time.',
      },
      {
        title: 'Month to month',
        body: 'No fixed term. Cancel with one calendar month’s notice, and add extensions as your team grows.',
      },
      {
        title: 'Competitive call rates',
        body: 'Show us a written call rate from another provider and we will beat it.',
      },
      {
        title: 'Call quality monitored',
        body: 'On a Hypernet connection, voice is prioritised over backups and file sync, and jitter and packet loss are monitored on your line.',
      },
      {
        title: 'One provider for calls and internet',
        body: 'We manage both, so we can trace a call fault from the handset to the network.',
      },
      {
        title: 'Geo-redundant hosting',
        body: 'The platform runs on an active-active cluster across data centres, so calls continue if one site fails.',
      },
      {
        title: 'Security by default',
        body: 'Firewalling, country blocking, fraud controls with daily spend limits and rate-limited APIs.',
      },
      {
        title: 'Integrations',
        body: 'Connects to Office 365, CRM systems and Active Directory or LDAP.',
      },
    ],
    fitHeading: 'Suited to',
    fit: [
      'Practices and offices with frequent client calls',
      'Businesses replacing an on-site PBX',
      'Hybrid teams who take calls away from the office',
      'Shops that want the landline number on a mobile',
    ],
    module: ['porting', 'compare'],
    pricingHref: '/pricing#hosted-uc',
    related: ['contact-centre', 'connectivity', 'integration-suite'],
    ctaHeading: 'Move your phones to Hypernet',
    ctaBody:
      'Tell us how your calls sound today. We will check whether the problem is the line, the configuration or the handsets before you spend anything.',
  },
  {
    slug: 'contact-centre',
    name: 'Omni-channel Contact Centre',
    short: 'Calls, WhatsApp, email, chat and social media in one workspace.',
    pillar: 'communicate',
    image: '/brand/contact-centre.webp',
    photo: '/brand/people/svc-contact-centre.webp',
    photoAlt: 'Illustration: A customer support team replying to chat messages and calls in a bright office',
    metaTitle: 'Omni-channel contact centre software',
    metaDescription:
      'One cloud workspace for calls, WhatsApp, email, live chat and social media, with a built-in CRM, live reporting and AI translation. One price per user.',
    title: 'Omni-channel',
    titleAccent: 'contact centre.',
    lead: "Handle calls, WhatsApp, email, website chat and social media messages from one workspace, with each customer's history on screen.",
    statement:
      'When calls, WhatsApp messages and emails sit in different places, customers wait longer and have to repeat themselves. One workspace gives your team every conversation and the full customer history in one place.',
    statementAccent: ['one', 'place.'],
    packagesHeading: 'Contact centre features',
    packagesIntro:
      'One price per user with every feature included. New features are added weekly at no extra cost.',
    packages: [
      {
        name: 'Channels',
        tag: 'Inbound and outbound',
        summary: 'Five channels in one queue.',
        points: [
          'Voice with routing, IVR, recording and live statistics',
          'WhatsApp, email and website live chat',
          'Social media messages',
        ],
      },
      {
        name: 'Agent workspace',
        tag: 'For agents',
        summary: 'Everything an agent needs on one screen.',
        points: [
          'Built-in CRM with full customer history',
          'Workflows for handing work between people and teams',
          'Works in the office, at home or across branches',
        ],
      },
      {
        name: 'AI and reporting',
        tag: 'For managers',
        summary: 'Faster replies and live performance data.',
        points: [
          'Real-time translation in 100+ languages',
          'Suggested replies based on your knowledge base, orders and tickets',
          'Live queues, service levels and agent performance',
        ],
      },
    ],
    featuresHeading: 'Implementation',
    features: [
      {
        title: 'Needs assessment',
        body: 'We start by mapping how your team handles customers today.',
      },
      {
        title: 'Integrations',
        body: 'Connects to Shopify, Salesforce, Office 365 and other systems through a full open API.',
      },
      {
        title: 'Setup and training',
        body: 'We configure the platform, move your channels across and train your agents.',
      },
      {
        title: 'Scalable',
        body: 'Runs a five-person support desk or a large contact centre on the same platform.',
      },
    ],
    fitHeading: 'Results',
    fit: [
      'Customers do not repeat themselves',
      'Every enquiry reaches the right person',
      'All conversations in one place',
      'Faster response times',
    ],
    module: 'channels',
    related: ['unified-communications', 'connectivity', 'integration-suite'],
    ctaHeading: 'Arrange a consultation',
    ctaBody:
      'We map how customers contact you today and show you how the platform would handle the same enquiries.',
  },

  /* ---------------------------------------------------------------- PROTECT */
  {
    slug: 'secure-business',
    name: 'Secure Business',
    short: 'Managed Cloudflare zero-trust access, DNS filtering and web protection.',
    pillar: 'protect',
    image: '/brand/secure-business.webp',
    photo: '/brand/people/svc-secure-business.webp',
    photoAlt: 'Illustration: A professional logging in securely from home with a laptop and phone approval',
    poweredBy: 'Cloudflare',
    metaTitle: 'Secure Business: zero-trust security powered by Cloudflare',
    metaDescription:
      'Replace your VPN with Cloudflare zero-trust access, filtered and encrypted DNS and a web application firewall, set up and managed by Hypernet.',
    title: 'Managed security powered by',
    titleAccent: 'Cloudflare.',
    lead: "Secure Business puts Cloudflare's security platform in front of your staff, systems and websites, and we manage it for you. Staff can reach business applications from anywhere without exposing your network to the internet.",
    statement:
      'A traditional VPN gives anyone with a valid login access to the whole office network. Zero trust checks each user and device every time and grants access only to the application requested.',
    statementAccent: ['every', 'time'],
    packagesHeading: 'Secure Business features',
    packagesIntro: 'Three layers of protection, managed as one service.',
    packages: [
      {
        name: 'Secure access',
        tag: 'Users',
        summary: 'Access to business apps without exposing the network.',
        points: [
          'Identity-based access with multi-factor authentication',
          'No public RDP and no open ports',
          'Replaces VPN hardware and works with Microsoft 365 and Google Workspace',
        ],
      },
      {
        name: 'Connectivity and DNS',
        tag: 'Connections',
        summary: 'Encrypted connections and filtered browsing.',
        points: [
          'Cloudflare Tunnel and Mesh for private access to internal systems',
          'DNS filtering that blocks malware and phishing domains',
          'Encrypted DNS over HTTPS and TLS in the office, at home or travelling',
        ],
      },
      {
        name: 'Web application protection',
        tag: 'Websites',
        summary: 'A firewall for your websites and web apps.',
        points: [
          'Web application firewall against SQL injection and other attacks',
          'DDoS mitigation and bot protection',
          'Policy management, reporting and onboarding by Hypernet',
        ],
      },
    ],
    featuresHeading: 'Benefits',
    features: [
      {
        title: 'No VPN hardware',
        body: 'Access is managed in the cloud, so there is no appliance to patch, license or replace.',
      },
      {
        title: 'Faster remote access',
        body: 'Staff connect through the nearest Cloudflare location, so remote traffic does not pass through the office line.',
      },
      {
        title: 'Quick deployment',
        body: 'Nothing is installed in your server room. We agree policies with you and move users across.',
      },
      {
        title: 'Monitoring and reports',
        body: 'We monitor the service, update policies as your business changes and send regular reports.',
      },
    ],
    fitHeading: 'Suited to',
    fit: [
      'Businesses of every size',
      'Hybrid and remote teams',
      'Professional services firms',
      'Retail and multi-branch businesses',
    ],
    module: 'zero-trust',
    related: ['hyperguard', 'cloudpath', 'connectivity'],
    ctaHeading: 'Request a security review',
    ctaBody:
      'We review how your staff reach business systems today and propose a zero-trust setup to replace it.',
  },
  {
    slug: 'hyperguard',
    name: 'HyperGuard',
    short: 'Managed email, endpoint and network security from Sendmarc, Sophos and Cloudflare.',
    pillar: 'protect',
    image: '/brand/hyperguard.webp',
    photo: '/brand/people/svc-hyperguard.webp',
    photoAlt: 'Illustration: A finance officer and colleague checking a suspicious email in the evening',
    poweredBy: 'Sendmarc, Sophos and Cloudflare',
    metaTitle: 'HyperGuard: three-layer cybersecurity',
    metaDescription:
      'HyperGuard combines Sendmarc email authentication, Sophos endpoint protection with 24/7 MDR, and Cloudflare edge security in one managed package.',
    title: 'Three-layer',
    titleAccent: 'cybersecurity.',
    lead: 'HyperGuard covers the three main routes attackers use: email, devices and the internet-facing edge of your network. Each layer runs on a specialist platform, and we manage all three as one service.',
    statement:
      'Most attacks start with email. Once an attacker is inside, malware spreads quickly, and anything you run online is scanned constantly. HyperGuard puts a separate specialist platform on each of these three routes.',
    statementAccent: ['three', 'routes.'],
    packagesHeading: 'HyperGuard layers',
    packagesIntro: 'We deploy, configure and monitor all three platforms.',
    packages: [
      {
        name: 'Email authentication',
        tag: 'Sendmarc',
        summary: 'Stops others sending email as your domain.',
        points: [
          'DMARC enforcement against spoofing and phishing',
          'Better inbox delivery for your legitimate email',
          'A full view of every service that sends from your domain',
        ],
      },
      {
        name: 'Endpoint and network protection',
        tag: 'Sophos',
        summary: 'Blocks malware before it runs.',
        points: [
          'Intercept X deep-learning protection against new malware and ransomware',
          'Firewall and devices share alerts and isolate infected machines automatically',
          '24/7 managed detection and response by threat hunters',
        ],
      },
      {
        name: 'Edge protection',
        tag: 'Cloudflare',
        summary: 'Protection for everything you run online.',
        points: [
          'Zero-trust access for verified users on healthy devices',
          'DDoS mitigation',
          'Web application firewall against SQL injection and cross-site scripting',
        ],
      },
    ],
    featuresHeading: 'Benefits',
    features: [
      {
        title: 'Specialist platforms',
        body: 'Email, endpoints and the network edge are each covered by a platform built for that job.',
      },
      {
        title: '24/7 threat response',
        body: 'Sophos MDR provides a team that monitors and responds to threats around the clock.',
      },
      {
        title: 'Brand protection',
        body: 'DMARC enforcement stops fake invoices being sent from your domain.',
      },
      {
        title: 'Single service desk',
        body: 'Our service desk handles all three layers and coordinates with each vendor on your behalf.',
      },
    ],
    fitHeading: 'Suited to',
    fit: [
      'Businesses that send invoices by email',
      'Firms that hold client data',
      'Businesses that cannot afford ransomware downtime',
      'Companies without an in-house security team',
    ],
    module: 'layers',
    related: ['secure-business', 'integration-suite', 'cloudpath'],
    ctaHeading: 'Book a HyperGuard assessment',
    ctaBody:
      'We review your email domain, devices and online services and report which areas need attention first.',
  },

  /* --------------------------------------------------------------- AUTOMATE */
  {
    slug: 'integration-suite',
    name: 'Integration Suite',
    short: 'Automated data sync between your CRM, ERP, e-commerce and phone systems.',
    pillar: 'automate',
    image: '/brand/integration-suite.webp',
    photo: '/brand/people/svc-integration-suite.webp',
    photoAlt: 'Illustration: An operations manager reviewing dashboards with a colleague in a fulfilment warehouse office',
    poweredBy: 'Flowgear',
    metaTitle: 'Integration Suite: business system integration',
    metaDescription:
      'A managed integration service on the Flowgear platform. 250+ connectors link your CRM, ERP, e-commerce and phone systems. Free proof of concept.',
    title: 'Business system',
    titleAccent: 'integration.',
    lead: 'Integration Suite connects the software you already use so data moves between systems automatically: orders into accounting, customers into the CRM, and phone lines set up when they are sold. It runs on the Flowgear platform and we manage it.',
    statement:
      'Copying data from one system into another by hand is slow and causes errors. Integration Suite moves that data automatically between the systems you already run.',
    statementAccent: ['automatically'],
    packagesHeading: 'Platform features',
    packagesIntro: 'A low-code integration platform, with a free proof of concept on your own systems.',
    packages: [
      {
        name: 'Low-code builder',
        tag: 'Fast delivery',
        summary: 'Integrations built in a visual designer.',
        points: [
          'Visual workflow designer',
          'No-code to low-code, built on .NET',
          'Changes delivered in days',
        ],
      },
      {
        name: 'Connectors',
        tag: '250+ connectors',
        summary: 'Cloud and on-premise systems from one place.',
        points: [
          'Pre-built connectors including Salesforce, HubSpot, SAP and AWS',
          'Cloud and on-premise environments in one interface',
          'Direct database connections where there is no API',
        ],
      },
      {
        name: 'Data handling',
        tag: 'Complex integrations',
        summary: 'Data processing across several systems.',
        points: [
          'Multi-endpoint integrations with full ETL',
          'Data mapping and format conversion',
          'Real-time processing',
        ],
      },
    ],
    featuresHeading: 'Free proof of concept',
    features: [
      {
        title: 'No obligation',
        body: 'We build a working proof of concept on your systems for the problem you want solved first.',
      },
      {
        title: 'No cost to start',
        body: 'No credit card or contract is needed.',
      },
      {
        title: 'Ongoing management',
        body: 'After go-live we monitor your integrations and update them when a vendor changes an API.',
      },
    ],
    fitHeading: 'Common problems',
    fit: [
      'Orders re-typed between systems',
      'Customer records that differ between tools',
      'Reports built from exported spreadsheets',
      'New services set up by hand',
    ],
    module: 'recipes',
    related: ['contact-centre', 'unified-communications', 'hyperguard'],
    ctaHeading: 'Request a proof of concept',
    ctaBody:
      'Tell us which two systems you want connected and we will build a free proof of concept on your own data.',
  },
]

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service]),
)

export const servicesInPillar = (pillar: PillarId) =>
  SERVICES.filter((service) => service.pillar === pillar)

export const serviceHref = (slug: string) => `/services/${slug}`
