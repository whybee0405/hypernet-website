import { LockKey, LockKeyOpen, ShieldCheck, Warning } from '@phosphor-icons/react/dist/ssr'
import { SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'

const APPS = ['Accounts', 'File server', 'CRM', 'Remote desktop']

/**
 * Secure Business: a traditional VPN and zero trust, side by side.
 */
export function ZeroTrustModule() {
  return (
    <section className="night relative overflow-hidden">
      <div className="shell relative py-24 lg:py-36">
        <div className="max-w-[46rem]">
          <SplitHeading
            parts={[{ text: 'VPN compared with' }, { text: 'zero trust', accent: true }]}
            className="t-section text-ink"
          />
        </div>

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2">
          <Reveal>
            <article className="card h-full p-8 lg:p-10">
              <div className="flex items-center justify-between">
                <p className="t-meta text-slate">Traditional VPN</p>
                <Warning size={22} weight="duotone" className="text-[#ff5a5a]" aria-hidden="true" />
              </div>
              <div className="mt-8 flex items-center gap-4" aria-hidden="true">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-hairline-strong bg-ink/5">
                  <LockKeyOpen size={26} weight="duotone" className="text-slate" />
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-slate/50 to-[#ff5a5a]/60" />
                <div className="grid grid-cols-2 gap-2">
                  {APPS.map((app) => (
                    <span key={app} className="rounded-lg border border-[#ff5a5a]/30 bg-[#ff5a5a]/10 px-2.5 py-1.5 text-[0.75rem] font-medium text-[#ffb3b3]">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="t-card mt-8 text-ink">Network-wide access</h3>
              <ul className="mt-4 grid gap-2 text-[0.9375rem] leading-relaxed text-slate">
                <li>One stolen password gives access to the whole network.</li>
                <li>Open ports and public remote desktop are exposed to attackers.</li>
                <li>VPN hardware needs patching, licensing and eventual replacement.</li>
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="card relative h-full overflow-hidden p-8 lg:p-10">
              <div className="relative flex items-center justify-between">
                <p className="t-meta text-accent-text">Zero trust with Secure Business</p>
                <ShieldCheck size={22} weight="duotone" className="text-[#3ee089]" aria-hidden="true" />
              </div>
              <div className="relative mt-8 grid gap-2" aria-hidden="true">
                {APPS.map((app) => (
                  <span key={app} className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-[0.75rem] font-medium text-ink">
                    <LockKey size={13} weight="bold" className="text-accent-text" />
                    {app}
                    <span className="ml-auto text-[0.625rem] text-slate">user, device, MFA</span>
                  </span>
                ))}
              </div>
              <h3 className="t-card relative mt-8 text-ink">Per-application access</h3>
              <ul className="relative mt-4 grid gap-2 text-[0.9375rem] leading-relaxed text-slate">
                <li>Each request checks the user, the device and its security status.</li>
                <li>Users reach only the applications they are allowed to use, and nothing is exposed to the internet.</li>
                <li>Managed in the cloud through Cloudflare, with no hardware to maintain.</li>
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
