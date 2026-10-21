# Discoverability deployment

Verified live at https://hypernet.co.za on 19 October 2026.

All 25 public HTML pages return 200, have unique titles of 34–59 characters,
and unique descriptions of 140–155 characters. Each page has its own canonical
URL, complete Open Graph metadata, and a Twitter summary_large_image card.
The sharing images return image responses. Privacy is included in the sitemap
and is crawlable. Admin, API endpoints and authenticated previews stay excluded;
public CMS media files are allowed so crawlers can fetch the share images.
The sitemap paginates published CMS content and revalidates hourly.

The favicon set contains a multi-size ICO (16, 32, 48), PNGs (16, 32, 48),
an Apple touch icon (180), Android icons (192, 512), and a maskable icon (512),
with a web app manifest. The shared brand card is a 1200×630 JPEG.

The production build and TypeScript checks passed. Live checks validated all
25 pages, title and description uniqueness/length, canonical and social tags,
image accessibility, icon dimensions, the manifest, robots.txt, sitemap, and
404 HTTP responses. Full rendered homepage head: [discoverability-home-head.html](./discoverability-home-head.html).

## Files created or changed in this task

- `docs/discoverability-home-head.html`
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`
- `public/apple-touch-icon.png`
- `public/brand/social-card.jpg`
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/favicon-48x48.png`
- `public/maskable-icon-512x512.png`
- `scripts/generate-brand-assets.cjs`
- `src/app/(site)/about/page.tsx`
- `src/app/(site)/case-studies/[slug]/page.tsx`
- `src/app/(site)/case-studies/page.tsx`
- `src/app/(site)/contact/page.tsx`
- `src/app/(site)/insights/[slug]/page.tsx`
- `src/app/(site)/insights/page.tsx`
- `src/app/(site)/layout.tsx`
- `src/app/(site)/legal/privacy/page.tsx`
- `src/app/(site)/page.tsx`
- `src/app/(site)/pricing/page.tsx`
- `src/app/(site)/services/[slug]/page.tsx`
- `src/app/(site)/services/page.tsx`
- `src/app/apple-icon.png`
- `src/app/favicon.ico`
- `src/app/icon.png`
- `src/app/manifest.ts`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/content/seo.ts`
- `src/lib/seo.ts`
- `docs/discoverability.md`

## Metadata maintenance

`src/content/seo.ts` holds the edited copy for existing routes. The shared builder
in `src/lib/seo.ts` supplies canonical, Open Graph and Twitter metadata. New CMS
slugs use their SEO fields or content title/excerpt as bounded fallbacks. Add
reviewed copy to the route map when publishing a new page. CMS share-image
choices remain active for articles and case studies.

`scripts/generate-brand-assets.cjs` regenerates the icon and sharing assets from
the supplied brand artwork using Sharp. It requires fontconfig and an installed
sans-serif font when rendering the social-card text.

## Verified page metadata

| Page | Title | Title length | Description length |
| --- | --- | --- | --- |
| / | Business Internet, VoIP & IT Services &#124; Hypernet | 48 | 140 |
| /about | About Our Business Connectivity Team &#124; Hypernet | 47 | 141 |
| /services | Business Connectivity & IT Services &#124; Hypernet | 46 | 143 |
| /pricing | Business Internet & VoIP Plans and Pricing &#124; Hypernet | 53 | 148 |
| /contact | Contact Sales & Support &#124; Hypernet | 34 | 141 |
| /legal/privacy | Privacy Policy & Personal Information &#124; Hypernet | 48 | 146 |
| /case-studies | Business Connectivity Case Studies &#124; Hypernet | 45 | 149 |
| /insights | Business Internet, VoIP & Security Insights &#124; Hypernet | 54 | 145 |
| /services/connectivity | Business Fibre, Wireless & Internet Failover &#124; Hypernet | 55 | 147 |
| /services/cloudpath | CloudPath SD-WAN & Internet Failover &#124; Hypernet | 47 | 148 |
| /services/voip | Business VoIP & Hosted Phone Lines &#124; Hypernet | 45 | 152 |
| /services/unified-communications | Cloud PBX, Video Meetings & Team Chat &#124; Hypernet | 48 | 152 |
| /services/contact-centre | Omni-channel Contact Centre Software &#124; Hypernet | 47 | 148 |
| /services/secure-business | Secure Business & Cloudflare Zero Trust &#124; Hypernet | 50 | 150 |
| /services/dragon-guard | Dragon Guard Managed Cybersecurity &#124; Hypernet | 45 | 152 |
| /services/integration-suite | Business System Integration with Flowgear &#124; Hypernet | 52 | 154 |
| /insights/fibre-fixed-wireless-or-lte | Business Fibre, Fixed Wireless or LTE? &#124; Hypernet | 49 | 153 |
| /insights/what-porting-your-numbers-involves | How Business Phone Number Porting Works &#124; Hypernet | 50 | 149 |
| /insights/why-calls-break-up | Why VoIP Calls Break Up & What to Check &#124; Hypernet | 50 | 151 |
| /insights/the-first-five-minutes-of-downtime | Internet Downtime: Checks Before Calling Support &#124; Hypernet | 59 | 152 |
| /insights/load-shedding-and-your-network-cabinet | Load Shedding & Network Backup Power &#124; Hypernet | 47 | 155 |
| /case-studies/khumalo-hardware-and-paint | Hardware Shop Fibre & LTE Failover Case Study &#124; Hypernet | 56 | 149 |
| /case-studies/botha-and-pretorius | Accounting Practice VoIP Porting Case Study &#124; Hypernet | 54 | 148 |
| /case-studies/moyo-freight-coordination | Freight Office Wireless & VoIP Case Study &#124; Hypernet | 52 | 155 |
| /case-studies/sabela-home-goods | Online Store Connectivity Case Study &#124; Hypernet | 47 | 151 |
