# Mobile audit and fixes at 390px

Verified live on 20 October 2026 at https://hypernet.co.za.

## Result

All 25 public sitemap pages and both global/nested 404 layouts were checked sequentially at 390×844 with touch input. The final measurements found no visible text below 16px, no measured visible link/control targets below 44×44px, no page-wide overflow, and no horizontally scrolling content regions. The checks include shared headers, footers and CTA controls. Decorative/screen-reader-only text is excluded from the visual-size count.

There was no page-wide horizontal overflow in the baseline; the sideways homepage rails and Unified Communications comparison table were scrolling regions within the page. Those now have vertical mobile layouts rather than being hidden behind an overflow mask.

## Shared changes

- Mobile labels, small print, buttons, form fields and error messages have a 16px minimum. Headings retain their hierarchy. Rules apply below 640px.
- Visible links and controls have minimum 44×44px targets, including inline privacy/contact links, back links, the logo link and footer links.
- A fixed bottom bar provides 52px-high Menu and Contact us actions. It respects the device safe area, and body/scroll spacing reserves room for it.
- Contact us links directly to the enquiry form. Service pages carry their service into the form. On Contact the label is Send an enquiry, and repeated taps scroll back to the form even when closing a scroll-locked menu.
- The menu has primary page links first, its own scroll area above the bottom bar, and a persistent thumb-accessible Close control. Same-page and route-changing links close it and restore scrolling. Background main/footer content is inert while it is open.
- The floating WhatsApp shortcut is hidden on phones so it does not overlap or compete with the mobile action bar. Desktop behaviour remains as before.
- Package cards no longer stick, shrink or dim over one another on phones. Desktop presentation remains available.

## Page-by-page findings and changes

Counts are text-node/control instances, not unique wording, and include shared header/footer elements. The baseline small text ranged from 12px to 15px. Every row's final small-text and undersized-target counts are zero.

| Page | Before: text under 16px | Before: targets under 44px | What changed |
| --- | ---: | ---: | --- |
| `/` | 145 | 21 | Sideways services and case-study rails now stack vertically. Narrow proof copy uses the available width. Plan-finder result facts stack. Small link targets enlarged. |
| `/about` | 41 | 17 | Supporting copy, team captions and shared labels raised to 16px; shared header/footer links enlarged. |
| `/services` | 55 | 17 | Service descriptions, powered-by notes and shared labels raised to 16px; shared links enlarged. |
| `/pricing` | 81 | 17 | Plan facts now stack as label/value pairs, recommendation badges wrap, and plan notes use 16px text; links enlarged. |
| `/contact` | 48 | 18 | Fields, labels, help, errors and privacy note use 16px. Email/call links enlarged. The bottom CTA returns to the form after closing the menu, including repeat/same-hash use. |
| `/legal/privacy` | 30 | 18 | Draft-policy notice and shared small print raised to 16px. Inline email links and footer links enlarged. Legal wording unchanged. |
| `/case-studies` | 48 | 17 | Chips, summaries, client/location captions and shared labels raised to 16px; shared links enlarged. |
| `/insights` | 52 | 17 | Categories, dates, excerpts and shared labels raised to 16px; shared links enlarged. |
| `/services/connectivity` | 53 | 19 | Breadcrumbs, package notes, supporting text and buttons raised to 16px. Call/back links enlarged. Package cards flow vertically instead of pinning/scaling over one another. Bottom CTA preserves the service selection. |
| `/services/cloudpath` | 61 | 19 | Breadcrumbs, package notes, supporting text and buttons raised to 16px. Call/back links enlarged. Package cards flow vertically instead of pinning/scaling over one another. Bottom CTA preserves the service selection. |
| `/services/voip` | 53 | 19 | Breadcrumbs, package notes, supporting text and buttons raised to 16px. Call/back links enlarged. Package cards flow vertically instead of pinning/scaling over one another. Bottom CTA preserves the service selection. |
| `/services/unified-communications` | 75 | 19 | Breadcrumbs, package notes, supporting text and buttons raised to 16px. Call/back links enlarged. Package cards flow vertically instead of pinning/scaling over one another. Bottom CTA preserves the service selection. The 620px sideways comparison table is replaced with eight mobile comparison cards. |
| `/services/contact-centre` | 56 | 19 | Breadcrumbs, package notes, supporting text and buttons raised to 16px. Call/back links enlarged. Package cards flow vertically instead of pinning/scaling over one another. Bottom CTA preserves the service selection. |
| `/services/secure-business` | 62 | 19 | Breadcrumbs, package notes, supporting text and buttons raised to 16px. Call/back links enlarged. Package cards flow vertically instead of pinning/scaling over one another. Bottom CTA preserves the service selection. |
| `/services/dragon-guard` | 60 | 19 | Breadcrumbs, package notes, supporting text and buttons raised to 16px. Call/back links enlarged. Package cards flow vertically instead of pinning/scaling over one another. Bottom CTA preserves the service selection. |
| `/services/integration-suite` | 70 | 19 | Breadcrumbs, package notes, supporting text and buttons raised to 16px. Call/back links enlarged. Package cards flow vertically instead of pinning/scaling over one another. Bottom CTA preserves the service selection. |
| `/insights/fibre-fixed-wireless-or-lte` | 41 | 18 | Category, byline, date and reading-time text raised to 16px. The All insights back link and shared links now have 44px minimum targets. |
| `/insights/what-porting-your-numbers-involves` | 41 | 18 | Category, byline, date and reading-time text raised to 16px. The All insights back link and shared links now have 44px minimum targets. |
| `/insights/why-calls-break-up` | 41 | 18 | Category, byline, date and reading-time text raised to 16px. The All insights back link and shared links now have 44px minimum targets. |
| `/insights/the-first-five-minutes-of-downtime` | 41 | 18 | Category, byline, date and reading-time text raised to 16px. The All insights back link and shared links now have 44px minimum targets. |
| `/insights/load-shedding-and-your-network-cabinet` | 41 | 18 | Category, byline, date and reading-time text raised to 16px. The All insights back link and shared links now have 44px minimum targets. |
| `/case-studies/khumalo-hardware-and-paint` | 49 | 18 | Client facts, captions, badges and supporting text raised to 16px. The All case studies back link and shared links now have 44px minimum targets. |
| `/case-studies/botha-and-pretorius` | 49 | 18 | Client facts, captions, badges and supporting text raised to 16px. The All case studies back link and shared links now have 44px minimum targets. |
| `/case-studies/moyo-freight-coordination` | 48 | 18 | Client facts, captions, badges and supporting text raised to 16px. The All case studies back link and shared links now have 44px minimum targets. |
| `/case-studies/sabela-home-goods` | 48 | 18 | Client facts, captions, badges and supporting text raised to 16px. The All case studies back link and shared links now have 44px minimum targets. |
| `/mobile-audit-missing` | 2 | 1 | 404 recovery buttons use 16px text; home link enlarged. Mobile contact CTA added; the nested layout also receives the thumb menu and shared footer fixes. |
| `/insights/mobile-audit-missing` | 31 | 17 | 404 recovery buttons use 16px text; home link enlarged. Mobile contact CTA added; the nested layout also receives the thumb menu and shared footer fixes. |

## Interaction and regression checks

The production build and TypeScript checks passed. Browser checks verified:

- Thumb menu access after scrolling, including normal animation and reduced-motion modes.
- Menu geometry, 44px menu targets, route navigation, same-page closing and restored scrolling.
- Contextual service CTA, service selection in the form, and the repeat form-anchor/menu-close edge case.
- Invalid form submission, three accessible field errors and 16px error text. No valid enquiry was submitted.
- Contact layout at 390×600 and absence of the mobile action bar at desktop width 1440px.
- All 25 public pages plus both 404 layouts at 390×844.

These are browser-emulated touch/viewport checks, not a claim of physical-device testing on every mobile browser.

## Screenshots and measurements

- [Homepage and mobile actions](./mobile-390/home.png)
- [Thumb navigation](./mobile-390/menu.png)
- [Mobile comparison cards](./mobile-390/comparison.png)
- [Contact form at a shorter viewport](./mobile-390/contact.png)
- [Page-by-page measurements](./mobile-390/measurements.json)

## Application files changed

- `src/app/(site)/globals.css`
- `src/app/(site)/contact/page.tsx`
- `src/app/global-not-found.tsx`
- `src/components/site/MobileActionBar.tsx` (new)
- `src/components/site/Nav.tsx`
- `src/components/site/WhatsAppButton.tsx`
- `src/components/site/PlanTable.tsx`
- `src/components/home/ServicesTrack.tsx`
- `src/components/home/CaseStudyRail.tsx`
- `src/components/home/PlanFinder.tsx`
- `src/components/home/ProofBento.tsx`
- `src/components/services/PackageStack.tsx`
- `src/components/services/modules/CompareModule.tsx`

This report and its screenshot/measurement files are review artifacts. Legal draft documents and live legal wording were not changed in this task.
