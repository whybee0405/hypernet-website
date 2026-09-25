import { doc, h, p, ul } from './lexical'

/**
 * Text for every seeded CMS record, in one place.
 *
 * Used by seed.ts to build a fresh database, and by refresh-copy.ts to update
 * the text of an existing one without touching media, flags or relationships.
 *
 * All case studies, testimonials and client names are placeholders built from
 * the BRAND.md personas. Replace them with approved customer stories.
 */

/* -------------------------------------------------------------------------- */
/* Globals                                                                     */
/* -------------------------------------------------------------------------- */

export const HOME_COPY = {
  badge: 'Local support',
  headlineLead: 'Connectivity with',
  headlineAccent: 'a human voice.',
  subtext:
    'Internet, phone systems, customer contact, security and system integration for South African businesses, from single sites to national networks.',
  heroCallout: { value: 'One provider', label: 'Every service, one service desk' },
  sectorsHeading: 'Industries',
  sectors: [
    { label: 'Retail and franchise networks', detail: 'Card payments, stock systems and phones across every store.' },
    { label: 'Professional services', detail: 'Clear client calls, secure remote access and reliable cloud software.' },
    { label: 'Logistics and distribution', detail: 'Dispatch lines, depot connectivity and uninterrupted tracking systems.' },
    { label: 'Ecommerce', detail: 'Order processing, integrations and customer service through peak season.' },
    { label: 'Healthcare practices and groups', detail: 'Booking lines, patient data protection and connectivity between sites.' },
    { label: 'Manufacturing and industrial sites', detail: 'Fixed wireless where fibre does not reach, and failover for production systems.' },
  ],
  servicesHeading: 'Services',
  servicesIntro: 'Connectivity and VoIP sized to each business.',
  services: [
    {
      title: 'Connectivity',
      body: 'Fibre, fixed wireless and LTE failover, so a cut cable does not stop trading.',
      points: [
        'Site survey before quoting',
        'Business routers we configure, label and support',
        'Automatic failover for card payments',
        'Line monitoring with alerts',
      ],
      href: '/services/connectivity',
      linkLabel: 'Business internet',
    },
    {
      title: 'VoIP',
      body: 'Hosted lines that keep your existing numbers and work on desk phones or a mobile app.',
      points: [
        'Number porting handled by us',
        'Desk phones, softphones or both',
        'Call recording and reporting',
        'Call quality monitored with your connection',
      ],
      href: '/services/voip',
      linkLabel: 'Business VoIP',
    },
  ],
  processHeading: 'Support process',
  processIntro: 'Every fault follows the same four steps.',
  process: [
    {
      title: 'Logged and triaged',
      body: 'Contact the service desk by phone, email or WhatsApp. The fault is logged and prioritised immediately.',
    },
    {
      title: 'Remote diagnosis',
      body: 'Engineers check your documented setup and live line status, and resolve most faults without a site visit.',
    },
    {
      title: 'Clear updates',
      body: 'We tell you the cause and the expected fix time, including when the fault is with a third party that we are following up.',
    },
    {
      title: 'Escalation and on-site repair',
      body: 'Faults that need hands-on work go to our field team, and the service desk keeps you updated until the fault is closed.',
    },
  ],
  proofHeading: 'Why Hypernet',
  proofPoints: [
    {
      title: 'South African service desk and engineers',
      body: 'Support and engineering teams in your time zone who understand load shedding and local infrastructure.',
    },
    {
      title: 'Tidy, documented installations',
      body: 'We label the cabling, mount the equipment and keep a photo of your setup on file.',
    },
    {
      title: 'Clear contract terms',
      body: 'Contracts are written in plain language, including what happens if you cancel.',
    },
  ],
  ctaHeading: 'Get a quote',
  ctaBody:
    'Call or send a message and we will tell you what can be installed at your address and what it costs.',
}

export const SITE_SETTINGS_COPY = {
  supportHours: 'Monday to Friday, 07:00 to 18:00. After-hours cover on Pro plans.',
  metricsStatement: 'Local support, national reach',
  metricsSupport:
    'Our service desk, network engineers and field technicians are based in South Africa. Every site is documented, so faults are diagnosed quickly and escalated to the right team.',
  metrics: [
    { value: '100%', label: 'SA-based support team', detail: 'Service desk and engineering are based in South Africa.' },
    { value: '99.9%', label: 'Network uptime', detail: 'Target uptime across the core network.' },
    { value: 'Under 2 min', label: 'Average support response', detail: 'Measured across inbound support calls.' },
  ],
  footerNote: 'Connectivity, communications, security and integration services for South African businesses.',
  trustHeading: 'Registrations and memberships',
  trustIntro: 'The current status of our registrations and compliance work.',
  accreditations: [
    { name: 'ICASA registration', detail: 'Registration number pending.' },
    { name: 'ISPA membership', detail: 'Application in progress.' },
    { name: 'POPIA compliance review', detail: 'Data handling policy drafted, external review pending.' },
  ],
}

/* -------------------------------------------------------------------------- */
/* Plans                                                                       */
/* -------------------------------------------------------------------------- */

export const PLANS_COPY = [
  {
    name: 'SME Starter',
    audience: 'Two to five people in one location.',
    includes: ['Business router, configured and labelled', 'LTE failover available as an add-on', 'Support by phone and email'],
  },
  {
    name: 'SME Growth',
    audience: 'Five to twenty people across one or two sites.',
    includes: ['Everything in SME Starter', 'LTE failover included', 'Network monitoring with alerts', 'Call reporting'],
  },
  {
    name: 'SME Pro',
    audience: 'Twenty or more people, or a site that cannot go offline.',
    includes: ['Everything in SME Growth', 'Priority fault handling', 'After-hours cover', 'A named account contact'],
  },
]

/* -------------------------------------------------------------------------- */
/* Testimonials                                                                */
/* -------------------------------------------------------------------------- */

export const TESTIMONIALS_COPY = [
  {
    name: 'Nomvula Khumalo',
    quote:
      'The card machine went down on a Saturday morning. The service desk had it rerouted before the queue got long.',
  },
  {
    name: 'Riaan Botha',
    quote:
      'Our clients did not notice that we changed providers. After eleven years of apologising for dropped calls, that is what I wanted.',
  },
  {
    name: 'Farai Moyo',
    quote: 'They quoted for what we needed and nothing more. Three years later, that has not changed.',
  },
]

/* -------------------------------------------------------------------------- */
/* Case studies                                                                */
/* -------------------------------------------------------------------------- */

export const CASE_STUDIES_COPY = {
  'khumalo-hardware-and-paint': {
    title: 'Fibre with LTE failover for a hardware shop',
    summary:
      'A Tembisa hardware shop that lost Saturday trading whenever card payments stopped now keeps trading through line faults.',
    results: [
      { value: 'Same day', label: 'From first call to a technician on site' },
      { value: 'Zero', label: 'Trading hours lost in the last three outages' },
    ],
    quote: 'The service desk had it rerouted before the queue got long.',
    challenge: doc([
      p(
        "Saturday morning is the shop's busiest four hours. When the line failed, the card machine and stock system stopped and customers left without buying.",
      ),
      p(
        'The previous provider handled faults by email and quoted a two-working-day response, which meant waiting until Monday.',
      ),
    ]),
    approach: doc([
      p(
        'Our site survey found that the fibre into the building shared a duct with the neighbouring block and had already been damaged twice.',
      ),
      ul([
        'Fibre as the primary line, with the router moved out of the storeroom',
        'LTE failover that carries card payments and the stock system',
        'Two VoIP lines so the shop and office phones no longer compete',
        'A photo and labelled diagram of the installation kept on file',
      ]),
      p('We tested failover with the owner on a trading day so she could see how it works.'),
    ]),
    outcome: doc([
      p(
        'The duct was cut again in March and card payments continued. We called the shop to report the fault before staff noticed it.',
      ),
      p('After reviewing the traffic, we also moved the stock system sync to overnight.'),
    ]),
  },
  'botha-and-pretorius': {
    title: 'Porting twelve numbers for an accounting practice',
    summary: 'A Stellenbosch practice moved to hosted VoIP and kept every number on its letterhead.',
    results: [
      { value: '12', label: 'Numbers ported and retained' },
      { value: 'After hours', label: 'Cutover time' },
    ],
    quote: 'Our clients did not notice that we changed providers, which is what I wanted.',
    challenge: doc([
      p(
        'The practice has fourteen staff and direct numbers printed on eleven years of correspondence. Call quality was so poor that partners were calling clients back from their mobiles.',
      ),
      p(
        'Two other providers had said keeping the numbers was possible but risky, with some downtime expected during business hours.',
      ),
    ]),
    approach: doc([
      h('h3', 'Porting before hardware'),
      p(
        'We started the number port before changing any handsets, because the port timeline depends on the current provider. New handsets were configured and tested in parallel with the old system.',
      ),
      p(
        'The cutover ran at 18:30 on a Thursday. We tested every direct number from outside the building before leaving.',
      ),
    ]),
    outcome: doc([
      p('All twelve numbers moved across, and the practice kept its letterheads, email signatures and listings.'),
      p('Call quality is now monitored with the connection, so we see a degrading line before the partners do.'),
    ]),
  },
  'moyo-freight-coordination': {
    title: 'Fixed wireless and six VoIP lines for a dispatch office',
    summary:
      'A Germiston logistics office had been quoted an enterprise contract. We installed what its eleven desks needed.',
    results: [{ value: 'One bill', label: 'Connectivity and six lines together' }],
    quote: 'They quoted for what we needed and nothing more.',
    challenge: doc([
      p(
        'The office is in an industrial park where fibre had been promised for three years. Two providers had quoted 36-month enterprise agreements with more lines than the office needed.',
      ),
      p('Dispatch was running on a consumer LTE router that dropped the tracking system whenever the office was busy.'),
    ]),
    approach: doc([
      p(
        'We installed fixed wireless from a mast with line of sight to the park, with LTE failover on a separate network so one tower fault cannot take both links down.',
      ),
      ul([
        'Six VoIP lines for six dispatchers',
        'Tracking system traffic prioritised on the link',
        'A managed router we can access remotely',
      ]),
    ]),
    outcome: doc([
      p(
        'The tracking system has stayed online as the office grew from eight desks to eleven, and two lines were added without a new contract.',
      ),
      p('When fibre reaches the park, the VoIP lines will move across with the same numbers.'),
    ]),
  },
  'sabela-home-goods': {
    title: 'Peak-season connectivity for an online homeware store',
    summary:
      'A Durban e-commerce business whose packing bench stalled during its busiest weeks now handles peak season without delays.',
    results: [{ value: 'No backlog', label: 'At the packing bench during peak season' }],
    quote: 'For once, we planned for our busiest weeks.',
    challenge: doc([
      p(
        'Orders, courier labels and customer calls all ran on one consumer line. During the November peak, label printing queued behind other traffic and the phone was unusable.',
      ),
    ]),
    approach: doc([
      p(
        "We reviewed the business's peak-week workload before recommending anything, then sized the line for label printing and call volume.",
      ),
      ul([
        'Fibre upgrade with courier integration traffic prioritised',
        'LTE failover so packing continues during a line fault',
        'Three VoIP lines with after-hours overflow to a mobile',
      ]),
    ]),
    outcome: doc([
      p(
        'The next peak ran without a backlog at the packing bench, and customer calls were answered on the business line instead of a personal mobile.',
      ),
    ]),
  },
}

/* -------------------------------------------------------------------------- */
/* Articles                                                                    */
/* -------------------------------------------------------------------------- */

export const POSTS_COPY = {
  'fibre-fixed-wireless-or-lte': {
    title: 'Fibre, fixed wireless or LTE: choosing a business connection',
    excerpt: 'A comparison of three ways to connect a business, and the factors that matter more than speed.',
    content: doc([
      p(
        'Most quotes lead with speed because it is easy to compare. A shop that takes card payments and a design studio that uploads large files need very different connections, so speed alone is a poor guide.',
      ),
      h('h2', 'What stops during an outage'),
      p(
        'List what your business cannot do without a connection. For a retailer, that is usually card payments and the stock system. For a professional practice, it is calls and cloud accounting. For a logistics office, it is the tracking system.',
      ),
      p(
        'That list shows whether you need a second, independent connection, which matters more than choosing between 50 and 200 Mbps.',
      ),
      h('h2', 'Fibre'),
      p(
        'The best option where it is available. Fibre is stable, symmetrical on business packages and unaffected by weather or tower congestion. Installation can take weeks if a new duct is needed.',
      ),
      h('h2', 'Fixed wireless'),
      p(
        'A radio link between your building and a nearby mast. It needs line of sight, which a site survey confirms. In industrial parks and older suburbs it is often a better option than waiting for fibre.',
      ),
      h('h2', 'LTE'),
      p(
        'LTE works well as a backup and is rarely the right primary line for a business. It shares a tower with everyone nearby, so it slows down during busy hours.',
      ),
      h('h2', 'The usual combination'),
      p(
        'Most businesses use one primary line plus LTE failover set to carry only essential traffic. Payments and calls continue during an outage while general browsing pauses, and the router switches over automatically.',
      ),
    ]),
  },
  'what-porting-your-numbers-involves': {
    title: 'How number porting works',
    excerpt: 'The steps involved in moving your business numbers to a new provider.',
    content: doc([
      p(
        'Your number is on your signage, invoices and email signatures, so a port needs to be planned carefully.',
      ),
      h('h2', 'Number ownership'),
      p(
        'Number portability is regulated in South Africa. Your number belongs to you, and your current provider must release it, although they can take the full period allowed.',
      ),
      h('h2', 'Paperwork'),
      p(
        'A port request needs the account holder details exactly as your current provider holds them. Most rejected ports are caused by a mismatched company name or an incorrect account number.',
      ),
      h('h2', 'Setting up new lines'),
      p(
        'Handsets are configured and tested on the new service while the old one still carries calls, so the port does not depend on hardware being ready on the day.',
      ),
      h('h2', 'The cutover'),
      p(
        'The switch takes minutes. Schedule it outside trading hours and have someone call every number from outside the building afterwards, so any missed line is found that evening.',
      ),
      h('h2', 'Porting dates'),
      p(
        'The date depends on your current provider, so no provider can guarantee it. We give you a status update whenever you ask.',
      ),
    ]),
  },
  'why-calls-break-up': {
    title: 'Why VoIP calls break up on a fast connection',
    excerpt: 'Why a good speed test result does not guarantee clear calls, and how to fix the problem.',
    content: doc([
      p(
        'A speed test can show a fast connection while calls still sound choppy, because speed and call quality depend on different things.',
      ),
      h('h2', 'Throughput and consistency'),
      p(
        'A voice call uses very little bandwidth, but it needs packets to arrive at a steady rate. A fast line that delivers packets unevenly produces choppy audio.',
      ),
      h('h2', 'Common causes'),
      ul([
        'A backup or cloud sync using the full upload while calls are in progress',
        'Wi-Fi instead of cable between the handset and the router, especially in buildings with a lot of metal',
        'Consumer routers that give voice traffic no priority',
        'A shared LTE link during the busiest hour of the day',
      ]),
      h('h2', 'The fix'),
      p(
        'Prioritising voice traffic on the router solves most cases without changing the line. Moving desk phones from Wi-Fi to cable solves most of the rest. A faster package usually does not help.',
      ),
    ]),
  },
  'the-first-five-minutes-of-downtime': {
    title: 'What to check before you report a fault',
    excerpt: 'Four checks that help us find and fix a fault faster.',
    content: doc([
      p('Faults are fixed faster when the first call includes the right information. None of these checks is technical.'),
      h('h2', 'Scope of the problem'),
      p(
        'Check whether the whole office is offline or only one computer, system or phone. The answer tells us where to start and can save twenty minutes.',
      ),
      h('h2', 'Start time'),
      p(
        'Note the exact time the problem started. If it was 10:42, we can check that moment on your line, which often shows the cause.',
      ),
      h('h2', 'Router lights'),
      p(
        'Do not restart the router yet. Its lights show what happened, and restarting clears them. Tell us what the lights are doing first.',
      ),
      h('h2', 'Calling us'),
      p('Call the support number with this information and we can usually locate the fault straight away.'),
    ]),
  },
  'load-shedding-and-your-network-cabinet': {
    title: 'Load shedding: backup power for your network cabinet',
    excerpt: 'Which equipment needs backup power to keep your business online during load shedding.',
    content: doc([
      p(
        'Many businesses have a UPS on the router and still lose connectivity during load shedding, usually because one piece of equipment was left off the backup supply.',
      ),
      h('h2', 'Equipment to include'),
      ul([
        'The fibre or wireless termination unit, which is often a separate box',
        'The router',
        'The network switch',
        'The Wi-Fi access point, if staff or the card machine use Wi-Fi',
        'The card payment terminal, if it runs on mains power',
      ]),
      p('If any one of these loses power, the rest of the equipment cannot connect.'),
      h('h2', 'Battery runtime'),
      p(
        'A UPS that runs for ten minutes covers a brief outage and will not last through a load-shedding slot. Size the battery for the longest scheduled outage you need to trade through, with a margin.',
      ),
      h('h2', 'Testing'),
      p(
        'Switch off the mains on a quiet morning and check what stays online. The test takes about ten minutes and is better done on a quiet weekday than during a busy Saturday.',
      ),
    ]),
  },
}
