# Hypernet security pass — 20 October 2026

Scope: application source, installed production dependencies, CMS permissions, form and media endpoints, HTTPS reverse proxy, container exposure, SSH and available OS security updates. This is a targeted hardening review, not a penetration test or assurance that every vulnerability has been found.

## Findings and remedies

| Severity | Finding | Remedy |
| --- | --- | --- |
| Critical | Installed Next/Payload versions had published critical advisories | Upgrade Next 16.3.4 → 16.4.2 and all Payload packages 3.88.0 → 3.91.0. Generate types and additive SQLite migration for `users.reset_password_requested_at`. |
| High | An editor could update any user's account, including an administrator's password | Restrict updates to administrators or the account owner; prohibit editor role promotion and user creation. Restrict email reads to administrators/account owners. |
| High | Broad image upload allowlist included active SVG content | Restrict uploads to JPEG/PNG/WebP/AVIF/GIF; 40M pixel decoding cap and single-frame processing; retain 12MB file limit and add 20MB multipart limit. Upgrade sharp 0.34.4 → 0.35.5. |
| Medium | Legacy proxy supplied a same-origin context when browser headers were missing | Remove the temporary HTTP/IP authentication workaround; use canonical HTTPS origins explicitly for CMS CORS/CSRF. |
| High | Rich-text renderer trusted heading tags and link protocols in CMS JSON | Whitelist heading tags h2/h3/h4 and safe link destinations; regression-check hostile stored content. |
| Medium | Contact input lacked length bounds and edge throttling | Add server-side bounds (name100/email254/phone40/business200/message5000/source200), a bounded in-process handler throttle (10attempts/10min/IP), per-IP edge limits for writes, server actions and authentication. Return HTTP429 on excess. |
| Medium | Preview relative URL validation allowed backslashes/control escapes | Reject slash/backslash authority escapes, control characters and encoded separators before enabling draft mode. Authentication and preview secret remain required. |
| Medium | Concurrent image cache misses could repeat expensive encoding | Coalesce identical work; allow only two distinct conversions at a time, return503/Retry-After when busy; cap source size and decoded pixels. |
| Medium | Missing transport/browser response protections | Add HSTS, nosniff, same-origin framing, referrer/permissions policies and baseline CSP; block sensitive filesystem-style URLs and disable unused GraphQL. |
| Medium | Public SSH accepts password authentication/root login | Preserve existing access because no recovery public key is configured. Install Fail2ban with SSH systemd journal backend, 8 failures/10min, 1h bans. Password/root policy remains an open finding. |
| Medium | Available OS security updates | Apply available patches for OpenSSH, curl, Git, Python JWT and X11 libraries; services checked afterward. |
| Low | Framework/server version disclosure; preview query secrets in access log URLs | Hide framework header, set Nginx server_tokens off; dedicated access-log format omits query strings and referrers. Previous logs were not deleted. |
| Medium | Production could silently use a hardcoded development CMS secret | Fail startup when PAYLOAD_SECRET is absent in production. Development fallback remains only for nonproduction. |

## Dependency result

`npm audit --omit=dev`: before: 21 findings (2 critical,8 high,11 moderate); after: 5 moderate, 0 critical/high/low. The remaining five entries are the esbuild advisory and its dependency chain through Drizzle/@esbuild-kit/@payloadcms/db-sqlite. The vulnerable esbuild development-server behavior is not exposed by this production deployment. No compatible upstream resolution is offered by npm audit; do not describe this as a clean dependency scan. Sass and DOMPurify overrides remove additional transitive findings; retain them until upstream catches up.

Upstream references:
- https://payloadcms.com/posts/blog/payload-security-update-available-for-3x-and-40
- https://github.com/payloadcms/payload/releases/tag/v3.90.0
- https://github.com/payloadcms/payload/releases/tag/v3.91.0
- https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j
- https://github.com/advisories/GHSA-67mh-4wv8-2f99

Audit package counts are dependency findings, not counts of demonstrated exploitable application vulnerabilities. The next/og advisory, for example, requires attacker-controlled SVG values; no exploit was attempted.

## Verification

- TypeScript check passed.
- Fresh database migrations and production-database-copy migration passed. New migration adds one nullable column and preserves existing content.
- Sixteen access/rendering checks passed on a disposable database clone: editor cannot modify admin account/password, create users or elevate own role; self edits work; other user emails hidden; anonymous users cannot read users/enquiries or create enquiries; public posts are published-only; raster MIME allowlist enforced in configuration; hostile heading tags and link protocols cannot render as active content.
- Final production build and type checking passed; deployed container healthy. Fourteen live HTTP checks passed (private APIs403, sensitive files/disabled GraphQL/missing pages404, secretless preview403, valid image200 at177,294bytes). See docs/security/http-checks.json. Browser results recorded below.
- Nginx config test passed; public app listener remains on127.0.0.1:3060. Only SSH/HTTP/HTTPS listen publicly.

## Open work, ranked

1. Configure and verify a recovery SSH key, then disable root/password SSH login. Existing sessions alone do not prove a working recovery login. Fail2ban reduces guessing but does not replace keys.
2. Reboot the VPS during a maintenance window to load the already-pending `linux-image-7.0.0-38-generic` kernel. No reboot performed during the live pass.
3. Track remaining moderate esbuild/Drizzle dependency advisories and update when a compatible upstream release is available.
4. Add tested offsite backups/restore drills and uptime/security alerting. A local backup is not disaster recovery.
5. Configure authenticated email delivery for password resets and enquiry notifications. Payload currently logs email instead of delivering it. Protect application logs because reset messages can contain tokens.
6. Introduce CMS MFA/SSO or a private admin access layer; current protection is password/session controls, account permissions and request limits.
7. Move from baseline CSP to a tested nonce/hash script policy. Current CSP restricts objects, base URLs, framing and form destinations; it does not provide a strict script allowlist or claim full XSS mitigation.
8. Complete the existing legal/analytics review, including enquiry/log retention and analytics consent behavior. This pass does not certify POPIA compliance or publish the draft legal pages.

## Changed application files

package.json; package-lock.json; .dockerignore; next.config.mjs; src/access/index.ts; src/collections/Users.ts; src/collections/Media.ts; src/actions/lead.ts; src/payload.config.ts; src/payload-types.ts; src/lib/optimize-image.ts; src/lib/lead-rate-limit.ts; src/components/site/RichText.tsx; src/app/(payload)/next/preview/route.ts; src/app/(site)/optimized-media/[filename]/route.ts; src/migrations/20261020_102237_security_auth.ts and .json; src/migrations/index.ts. Removed src/proxy.ts.

Added operations/evidence: ops/security-check.ts, ops/nginx/hypernet.conf, ops/nginx/security-limits.conf, ops/sshd-jail.conf, docs/security-pass.md, docs/security/dependency-audit.json.

Host configuration: /etc/nginx/sites-available/hypernet; /etc/nginx/conf.d/hypernet-security.conf; server_tokens in /etc/nginx/nginx.conf; /etc/fail2ban/jail.d/hypernet-sshd.local. OS packages updated. Runtime data migration is additive.

Private rollback material: /var/backups/hypernet/security-20261020/; previous web/seed images retained with :pre-security tags. Do not publish the database backup or secrets. The additive migration is backward-compatible with the previous app; avoid restoring an old database over new real enquiries.

The in-process enquiry throttle is supplementary: it resets on restart and applies per process. Nginx enforces independent request limits. Revisit shared rate-limit storage if deploying multiple instances. CMS server-function requests use the general write limit instead of the tighter public form limit.

Deployment note: stopping the first deployment to include the final renderer hardening coincided with container replacement and left the replacement unstarted. The site briefly returned 502 (approximately12:30–12:33 SAST); starting the container restored 200. The final deployment then completed normally, with its seed/migration service successful and its web container healthy.

## Final live results

- All 25 sitemap pages returned 200 in a 390px mobile browser with no horizontal overflow or JavaScript page errors.
- Contact validation and 5,001-character message rejection passed. Valid enquiry stored once, redirected to thank-you, and the precisely identified test record was deleted.
- CMS login, Secure/HttpOnly/SameSite=Lax cookie flags and dashboard navigation passed without the removed proxy workaround.
- Cross-origin cookie authentication returned no user. Cross-origin server action was rejected by Next (its current implementation returns 500 for this invalid request). No enquiry was created by that request.
- Unsafe preview destinations returned 400; authenticated same-origin preview returned 307 to the requested internal page. A test client without Origin/Fetch Metadata was correctly unauthenticated; same-origin browser navigation/authentication worked.
- Bounded throttle probe: first 6 invalid requests returned 400, next 6 returned 429; no valid action/enquiry body supplied. Evidence: docs/security/rate-limit-check.json.
- Temporary audit containers removed; production image/container retained; backups and rollback images retained.

Additional preview-session follow-up: the public page loaders currently trust Next's signed draft-mode cookie after it is issued to an authenticated editor. Draft-mode lifetime is separate from the CMS session. Recheck active CMS authentication when reading draft content, and explicitly disable draft mode on logout, to support immediate preview revocation. The preview cookie is not publicly forgeable; this review did not attempt cookie theft. This remains an application hardening item, alongside SSH access and the other open work above.

Browser evidence: docs/security/browser-checks.json. No credentials or authentication tokens are included in the evidence files.
