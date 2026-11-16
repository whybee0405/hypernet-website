import Link from '@/components/site/SiteLink'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Reveal } from '@/components/site/Reveal'
import { SplitHeading } from '@/components/site/motion'
import { MOBILE_DATA, formatRand } from '@/content/pricing'

/** 5G/LTE package prices. Same table conventions as PlanTable (BRAND.md section 7). */
export function MobileDataPricing() {
  const { heading, intro, tiers, notes, networks } = MOBILE_DATA

  return (
    <section id="5g-lte" className="night scroll-mt-28">
      <div className="shell pb-24 lg:pb-32">
        <div className="max-w-[60rem]">
          <SplitHeading
            parts={[{ text: '5G and LTE' }, { text: 'data', accent: true }]}
            className="t-section max-w-[16ch] text-ink"
          />
          <p className="t-lead mt-6">{intro}</p>
        </div>

        {/* Desktop and tablet: one comparable table. */}
        <Reveal className="mt-12 hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              {heading}: monthly prices per package, SIM only or with a router.
            </caption>
            <thead>
              <tr className="border-b border-ink/15">
                <th scope="col" className="t-meta py-4 pr-6 text-slate">Package</th>
                <th scope="col" className="t-meta py-4 pr-6 text-slate">Data</th>
                <th scope="col" className="t-meta py-4 pr-6 text-right text-slate">
                  SIM only
                  <span className="mt-1 block normal-case tracking-normal">Your own router</span>
                </th>
                <th scope="col" className="t-meta py-4 text-right text-slate">
                  With router
                  <span className="mt-1 block normal-case tracking-normal">{networks}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier) => (
                <tr key={tier.name} className="border-b border-hairline">
                  <th scope="row" className="py-5 pr-6 font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-ink">
                    {tier.name}
                  </th>
                  <td className="py-5 pr-6 text-[0.9375rem] text-ink">
                    Uncapped
                    <span className="block text-[0.8125rem] text-slate">{tier.fairUseGb}GB fair use</span>
                  </td>
                  <td className="py-5 pr-6 text-right">
                    <span className="font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-ink">{formatRand(tier.simOnly)}</span>
                    <span className="text-[0.8125rem] text-slate"> /month</span>
                  </td>
                  <td className="py-5 text-right">
                    <span className="font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-ink">{formatRand(tier.withRouter)}</span>
                    <span className="text-[0.8125rem] text-slate"> /month</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile: one card per package with both prices. */}
        <Reveal className="mt-10 grid gap-4 md:hidden">
          {tiers.map((tier) => (
            <div key={tier.name} className="card p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-ink">{tier.name}</h3>
                <span className="text-[0.875rem] text-slate">Uncapped, {tier.fairUseGb}GB fair use</span>
              </div>
              <dl className="mt-4">
                <div className="flex items-baseline justify-between gap-4 border-b border-hairline py-3">
                  <dt className="text-[0.875rem] text-slate">SIM only <span className="block text-[0.8125rem]">Your own router</span></dt>
                  <dd className="font-display text-[1.0625rem] font-bold text-ink">{formatRand(tier.simOnly)}<span className="text-[0.8125rem] font-normal text-slate"> /month</span></dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-[0.875rem] text-slate">With router <span className="block text-[0.8125rem]">{networks}</span></dt>
                  <dd className="font-display text-[1.0625rem] font-bold text-ink">{formatRand(tier.withRouter)}<span className="text-[0.8125rem] font-normal text-slate"> /month</span></dd>
                </div>
              </dl>
            </div>
          ))}
        </Reveal>

        <ul className="mt-6 grid max-w-[64ch] gap-1.5 text-[0.875rem] leading-relaxed text-slate">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>

        <Link href="/contact?service=connectivity" className="btn btn-primary mt-8">
          Book a free consultation
          <ArrowRight size={17} weight="bold" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
