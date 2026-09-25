import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'
import {
  CASE_STUDIES_COPY,
  HOME_COPY,
  PLANS_COPY,
  POSTS_COPY,
  SITE_SETTINGS_COPY,
  TESTIMONIALS_COPY,
} from './content'

/**
 * Seeds a complete, presentable Hypernet site.
 *
 * Everything created here is PLACEHOLDER CONTENT. The case studies,
 * testimonials and client names are built from the personas in BRAND.md
 * section 10, not from real Hypernet customers. Replace them with signed-off
 * customer stories before this site goes anywhere near production.
 *
 * Run with:  npm run seed
 */

const dirname = path.dirname(fileURLToPath(import.meta.url))
const asset = (name: string) => path.resolve(dirname, 'assets', name)

const IMAGES: Record<string, { file: string; alt: string }> = {
  heroOwnerCall: {
    file: 'hero-owner-call.jpg',
    alt: 'A shop owner takes a call on a desk phone at her counter, beside a point of sale terminal',
  },
  detailFibrePatch: {
    file: 'detail-fibre-patch.jpg',
    alt: "A technician's hands terminating fibre into a labelled patch panel",
  },
  detailDeskPhone: {
    file: 'detail-desk-phone.jpg',
    alt: 'A hand lifting the handset of a desk phone on a sunlit office desk',
  },
  installAccessPoint: {
    file: 'install-access-point.jpg',
    alt: 'A technician on a ladder mounting a wireless access point under the eaves of a shopfront',
  },
  voipAccountingOffice: {
    file: 'voip-accounting-office.jpg',
    alt: 'An accountant speaking on a desk phone at a tidy office desk with two monitors',
  },
  networkCabinet: {
    file: 'network-cabinet.jpg',
    alt: 'A wall-mounted network cabinet with a router, switch and neatly combed patch cables',
  },
  workshopDashboard: {
    file: 'workshop-dashboard.jpg',
    alt: 'A laptop on a workshop bench showing a network status dashboard among hand tools',
  },
  caseRetailShop: {
    file: 'case-retail-shop.jpg',
    alt: 'A shopkeeper serving a customer at a card payment terminal in a busy independent shop',
  },
  caseAccountingOffice: {
    file: 'case-accounting-office.jpg',
    alt: 'Three people working at desks in a small professional services office with a large window',
  },
  caseLogisticsOffice: {
    file: 'case-logistics-office.jpg',
    alt: 'A dispatcher wearing a headset at a desk with route screens and a handwritten whiteboard',
  },
  teamVanMorning: {
    file: 'team-van-morning.jpg',
    alt: 'Two field technicians loading cable drums and a ladder into a service van at sunrise',
  },
  cableLabelling: {
    file: 'cable-labelling.jpg',
    alt: 'Hands applying a printed label to a network cable in a bundle of combed patch leads',
  },
  rooftopWireless: {
    file: 'rooftop-wireless.jpg',
    alt: 'A small wireless antenna mounted on the parapet of a low commercial building',
  },
  fibreTrench: {
    file: 'fibre-trench.jpg',
    alt: 'An open pavement trench with orange fibre duct being laid, cones and a worker alongside',
  },
  voipPhonesBench: {
    file: 'voip-phones-bench.jpg',
    alt: 'Four desk phones lined up on a table being configured, with coiled network cables beside them',
  },
  supportTeam: {
    file: 'support-team.jpg',
    alt: 'Three support staff gathered around a monitor showing a network map, one taking notes on a call',
  },
  supportTechDesk: {
    file: 'support-tech-desk.jpg',
    alt: 'A support technician writing on a notepad with a phone handset at their shoulder',
  },
  ecommercePacking: {
    file: 'ecommerce-packing.jpg',
    alt: 'A person scanning a parcel barcode at a packing bench beside stacked shipping boxes',
  },
  routerHandover: {
    file: 'router-handover.jpg',
    alt: 'Two people at a shop back office counter, one pointing at the indicator lights on a business router',
  },
  sectorsShopCounter: {
    file: 'sectors-shop-counter.jpg',
    alt: 'A shopkeeper handing change to a customer over a hardware shop counter with a card machine beside the till',
  },
  installCloseUp: {
    file: 'install-close-up.jpg',
    alt: "A technician's hands testing a freshly labelled network port at a wall-mounted patch panel",
  },
  trustPaperworkDesk: {
    file: 'trust-paperwork-desk.jpg',
    alt: 'Hands turning pages in a lever-arch file of registration paperwork beside an open laptop on an office desk',
  },
}

const run = async () => {
  const payload = await getPayload({ config })

  payload.logger.info('Seeding Hypernet placeholder content')

  /* ---------------------------------------------------------------------- */
  /* Reset content collections so the script can be run repeatedly.          */
  /* ---------------------------------------------------------------------- */

  for (const collection of ['posts', 'case-studies', 'plans', 'testimonials', 'media'] as const) {
    await payload.delete({ collection, where: { id: { exists: true } } })
  }

  /* ---------------------------------------------------------------------- */
  /* Admin user                                                              */
  /* ---------------------------------------------------------------------- */

  const email = process.env.SEED_ADMIN_EMAIL || 'hello@hypernet.co.za'
  const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!'

  const existingUsers = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  const admin =
    existingUsers.docs[0] ??
    (await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name: 'Hypernet Team',
        role: 'admin',
        jobTitle: 'Hypernet',
      },
    }))

  /* ---------------------------------------------------------------------- */
  /* Media                                                                   */
  /* ---------------------------------------------------------------------- */

  const media: Record<string, number> = {}

  for (const [key, entry] of Object.entries(IMAGES)) {
    const created = await payload.create({
      collection: 'media',
      data: { alt: entry.alt },
      filePath: asset(entry.file),
    })
    media[key] = created.id as number
    payload.logger.info(`  media: ${entry.file}`)
  }

  /* ---------------------------------------------------------------------- */
  /* Plans                                                                   */
  /*                                                                         */
  /* Specifications come from the plan table in BRAND.md section 7, which is  */
  /* Hypernet's own document, so they are marked verified. Prices are left    */
  /* blank on purpose: no price has been confirmed.                           */
  /* ---------------------------------------------------------------------- */

  const planSpecs = [
    { downstream: 'Up to 50 Mbps', voipLines: '2 lines', support: 'Business hours' },
    { downstream: 'Up to 100 Mbps', voipLines: '5 lines', support: 'Extended hours', recommended: true },
    { downstream: 'Up to 200 Mbps', voipLines: '10 lines', support: 'Priority and after-hours' },
  ]

  for (const [index, plan] of PLANS_COPY.entries()) {
    await payload.create({
      collection: 'plans',
      data: {
        name: plan.name,
        audience: plan.audience,
        ...planSpecs[index],
        order: index,
        verified: true,
        includes: plan.includes.map((item) => ({ item })),
      },
    })
  }

  /* ---------------------------------------------------------------------- */
  /* Testimonials (placeholder, built from the BRAND.md personas)             */
  /* ---------------------------------------------------------------------- */

  const testimonialDetails: Record<
    string,
    { role: string; business: string; location: string; portrait: number }
  > = {
    'Nomvula Khumalo': {
      role: 'Owner',
      business: 'Khumalo Hardware and Paint',
      location: 'Tembisa, Gauteng',
      portrait: media.caseRetailShop,
    },
    'Riaan Botha': {
      role: 'Partner',
      business: 'Botha and Pretorius',
      location: 'Stellenbosch, Western Cape',
      portrait: media.caseAccountingOffice,
    },
    'Farai Moyo': {
      role: 'Owner',
      business: 'Moyo Freight Coordination',
      location: 'Germiston, Gauteng',
      portrait: media.caseLogisticsOffice,
    },
  }

  for (const [index, testimonial] of TESTIMONIALS_COPY.entries()) {
    await payload.create({
      collection: 'testimonials',
      data: { ...testimonial, ...testimonialDetails[testimonial.name], order: index },
    })
  }

  /* ---------------------------------------------------------------------- */
  /* Case studies (placeholder)                                              */
  /* ---------------------------------------------------------------------- */

  const caseStudies = [
    {
      client: 'Khumalo Hardware and Paint',
      slug: 'khumalo-hardware-and-paint' as const,
      sector: 'retail' as const,
      location: 'Tembisa, Gauteng',
      services: ['fibre', 'failover', 'voip'],
      heroImage: media.caseRetailShop,
      featured: true,
      publishedAt: '2026-06-18T08:00:00.000Z',
      quoteBy: { name: 'Nomvula Khumalo', role: 'Owner' },
    },
    {
      client: 'Botha and Pretorius',
      slug: 'botha-and-pretorius' as const,
      sector: 'professional' as const,
      location: 'Stellenbosch, Western Cape',
      services: ['fibre', 'voip', 'managed'],
      heroImage: media.caseAccountingOffice,
      featured: true,
      publishedAt: '2026-05-02T08:00:00.000Z',
      quoteBy: { name: 'Riaan Botha', role: 'Partner' },
    },
    {
      client: 'Moyo Freight Coordination',
      slug: 'moyo-freight-coordination' as const,
      sector: 'logistics' as const,
      location: 'Germiston, Gauteng',
      services: ['wireless', 'failover', 'voip'],
      heroImage: media.caseLogisticsOffice,
      featured: true,
      publishedAt: '2026-03-11T08:00:00.000Z',
      quoteBy: { name: 'Farai Moyo', role: 'Owner' },
    },
    {
      client: 'Sabela Home Goods',
      slug: 'sabela-home-goods' as const,
      sector: 'ecommerce' as const,
      location: 'Durban, KwaZulu-Natal',
      services: ['fibre', 'failover', 'voip', 'managed'],
      heroImage: media.ecommercePacking,
      featured: false,
      publishedAt: '2026-01-29T08:00:00.000Z',
      quoteBy: { name: 'Aisha Patel', role: 'Founder' },
    },
  ]

  for (const { quoteBy, ...study } of caseStudies) {
    const { quote, ...copy } = CASE_STUDIES_COPY[study.slug]
    await payload.create({
      collection: 'case-studies',
      data: { ...study, ...copy, quote: { text: quote, ...quoteBy }, _status: 'published' } as never,
    })
    payload.logger.info(`  case study: ${study.client}`)
  }

  /* ---------------------------------------------------------------------- */
  /* Articles (placeholder)                                                  */
  /* ---------------------------------------------------------------------- */

  const posts = [
    {
      slug: 'fibre-fixed-wireless-or-lte' as const,
      category: 'connectivity' as const,
      heroImage: media.fibreTrench,
      readingMinutes: 6,
      featured: true,
      publishedAt: '2026-08-14T07:00:00.000Z',
    },
    {
      slug: 'what-porting-your-numbers-involves' as const,
      category: 'voip' as const,
      heroImage: media.voipPhonesBench,
      readingMinutes: 5,
      featured: false,
      publishedAt: '2026-07-22T07:00:00.000Z',
    },
    {
      slug: 'why-calls-break-up' as const,
      category: 'voip' as const,
      heroImage: media.detailDeskPhone,
      readingMinutes: 4,
      featured: false,
      publishedAt: '2026-06-30T07:00:00.000Z',
    },
    {
      slug: 'the-first-five-minutes-of-downtime' as const,
      category: 'support' as const,
      heroImage: media.supportTechDesk,
      readingMinutes: 4,
      featured: false,
      publishedAt: '2026-05-19T07:00:00.000Z',
    },
    {
      slug: 'load-shedding-and-your-network-cabinet' as const,
      category: 'business' as const,
      heroImage: media.networkCabinet,
      readingMinutes: 5,
      featured: false,
      publishedAt: '2026-04-08T07:00:00.000Z',
    },
  ]

  for (const post of posts) {
    const copy = POSTS_COPY[post.slug]
    await payload.create({
      collection: 'posts',
      data: { ...post, ...copy, author: admin.id, _status: 'published' } as never,
    })
    payload.logger.info(`  article: ${copy.title}`)
  }

  /* ---------------------------------------------------------------------- */
  /* Globals                                                                 */
  /* ---------------------------------------------------------------------- */

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      phone: '011 568 4192',
      phoneHref: '+27115684192',
      email: 'hello@hypernet.co.za',
      supportHours: SITE_SETTINGS_COPY.supportHours,
      addressLines: [
        { line: 'Unit 7, Kramerville Commercial Park' },
        { line: '12 Desmond Street, Kramerville' },
        { line: 'Sandton, 2090' },
      ],
      metricsStatement: SITE_SETTINGS_COPY.metricsStatement,
      metricsSupport: SITE_SETTINGS_COPY.metricsSupport,
      // Only the first figure is confirmed. The others stay hidden until verified.
      metrics: SITE_SETTINGS_COPY.metrics.map((metric, index) => ({
        ...metric,
        verified: index === 0,
      })),
      footerNote: SITE_SETTINGS_COPY.footerNote,
      legalLinks: [{ label: 'Privacy', href: '/legal/privacy' }],
      trustHeading: SITE_SETTINGS_COPY.trustHeading,
      trustIntro: SITE_SETTINGS_COPY.trustIntro,
      accreditations: SITE_SETTINGS_COPY.accreditations.map((entry) => ({
        ...entry,
        verified: false,
      })),
    },
  })

  const serviceImages = [media.installAccessPoint, media.voipPhonesBench]

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      ...HOME_COPY,
      services: HOME_COPY.services.map((service, index) => ({
        ...service,
        points: service.points.map((point) => ({ point })),
        image: serviceImages[index],
      })),
      heroImage: media.heroOwnerCall,
      heroDetailA: media.detailFibrePatch,
      heroDetailB: media.detailDeskPhone,
      proofImageA: media.networkCabinet,
      proofImageB: media.cableLabelling,
    },
  })

  payload.logger.info('Seed complete')
  payload.logger.info(`Admin: ${email}`)
  process.exit(0)
}

await run()
