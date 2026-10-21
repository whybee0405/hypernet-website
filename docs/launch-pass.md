# Launch pass — 20 October 2026

Deployed to https://hypernet.co.za and verified against the live site.

## Completed

1. **404 recovery:** both global and nested custom 404 pages return HTTP 404 and link to Home, Services, Pricing, About, Insights, Case studies and Contact. The global fallback does not depend on CMS content.
2. **Successful-submission confirmation:** the site's single public enquiry form on `/contact` redirects to `/thank-you` after the record has been saved. Homepage and service-page CTAs lead to that form. Invalid or failed submissions remain in an error/retry flow and do not falsely report success. The confirmation page contains no submitted personal information and is marked noindex.
3. **Loading, errors and retry:** form submission has a disabled pending button, accessible submit/pending names, form busy state, focused error summary and per-field errors. Network failure has retry and the confirmed email fallback. Entered name, email, phone, business, message and service selection remain in client state outside the form error boundary. Internal page links have pending feedback; existing streamed sections have accessible loading placeholders and section retry boundaries. Page and root-layout failures have recovery UI. No route-level loading boundary was introduced that would turn missing content into a soft 404. CMS authentication/admin keeps Payload's own workflows rather than redirecting those forms to a marketing thank-you page.
4. **Image descriptions:** all 141 image elements across the 26 public pages checked have non-empty descriptive alt text. Service illustrations and CMS illustration descriptions are identified as illustrations. Decorative backgrounds remain hidden from screen readers where appropriate, despite their image descriptions. CSS logos have an accessible image label.
5. **Image budget and formats:** compressed 22 existing served raster files over 200,000 bytes, from 6,891,854 to 3,570,753 bytes (48.2% saved). This includes the large map artwork and CMS originals/variants. Existing resource paths remain valid; CMS byte sizes and image dimensions were refreshed. Website CMS photographs use cached WebP URLs and Next's negotiated image optimisation; JPEG social cards remain for preview compatibility. The WebP endpoint also bounds future delivered photo copies to 200,000 bytes. Required PNG/ICO browser icons remain in their compatible formats. Unserved source-logo masters and documentation screenshots are outside the published-image budget.
6. **Real contact routes:** public phone/placeholder WhatsApp routes were replaced by `mailto:hello@hypernet.co.za`, including navigation, closing CTAs, footer, contact page, desktop shortcut and error recovery. The CMS contact settings were updated too. The registered address uses the owner's confirmed 33 Adrienne Street, Sandown, Gauteng, 2191, South Africa. No telephone or WhatsApp number was invented.

## Verification

- Production build, TypeScript and whitespace checks passed.
- All 26 public HTML pages, including confirmation, returned 200. The inventory found one public form, 141 image elements with descriptions, and only the confirmed mailbox in public email/phone/messaging contact links.
- Both 404 layouts returned 404 and exposed all seven recovery links.
- Empty form submission produced three field errors. A delayed/aborted request showed the pending state, prevented duplicate button submission, displayed network recovery, and preserved entered details on retry.
- Successful submissions were tested directly from Contact and via the homepage CTA. Both created the expected CMS record and reached the confirmation page. Both test records were verified and deleted; no genuine enquiries were deleted.
- After the accessible-label correction, the final browser check passed accessible submit/pending names, validation, disabled pending state, network failure/retry, preserved name and selected service, and confirmation metadata. This final check created no records.
- WebP delivery returned `image/webp` at 177,294 bytes for the tested large photo; missing media returned 404.
- Mobile 390px and desktop 1440px contact layouts were checked; no horizontal overflow and no desktop leakage of the mobile CTA were found.
- Browser viewport/touch checks are emulation, not physical-device certification.

## Review artifacts

- [Thank-you page](./launch-pass/thank-you.png)
- [Mobile form with unsent verification values](./launch-pass/form-mobile.png)
- [Desktop contact page](./launch-pass/contact-desktop.png)
- [Page and image inventory](./launch-pass/page-inventory.json)
- [Compression manifest](./launch-pass/image-compression.json)

Original public assets, uploaded images and a consistent SQLite snapshot were backed up privately under `/var/backups/hypernet/launch-pass-20261020` before the media/contact changes. This is a local rollback copy, not an off-site backup.

## What I would fix next

1. **Enquiry operations:** configure an email provider and reliable staff notifications to the confirmed mailbox, delivery retries/alerts, spam rate limits and submission idempotency. Enquiries currently save in the CMS; automated email delivery is not configured and was not claimed or tested.
2. **Verified customer evidence:** replace example case studies, testimonials and illustrative staff/customer photography with approved material; verify published support hours, pricing and service claims.
3. **Legal and analytics alignment:** have the existing legal drafts reviewed, complete their unresolved fields and publish approved versions. Align the actual custom analytics with the approved consent controls. The current live privacy page still says analytics is not used, contrary to the owner's confirmed custom analytics; this pass did not publish the earlier legal drafts or invent tracking details.
4. **Operations:** monitored uptime/error alerts, off-site backups and a restore test. The private local snapshot is useful for rollback but does not cover loss of the VPS.

## Main implementation files

- `src/actions/lead.ts`, `src/components/site/ContactForm.tsx`, `src/app/(site)/thank-you/page.tsx`
- `src/components/site/RecoveryLinks.tsx`, both not-found pages
- `src/components/site/SiteLink.tsx`, `src/components/site/AsyncBoundary.tsx`, `src/app/(site)/error.tsx`, `src/app/global-error.tsx`
- Public link callers and homepage streamed sections
- `src/lib/contact.ts`, `src/lib/payload.ts`, contact/navigation/footer/CTA components
- Public image callers, `src/lib/utils.ts`, `src/lib/optimize-image.ts`, `src/app/(site)/optimized-media/[filename]/route.ts`
- `ops/optimize-images.cjs`, `ops/refresh-media.ts`, `ops/refresh-contact.ts`
- `public/brand/sa-map-high.webp`, CMS image files/metadata, and illustration descriptions in seed content
