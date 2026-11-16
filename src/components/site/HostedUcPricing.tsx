import Link from '@/components/site/SiteLink'
import { ArrowRight, Check } from '@phosphor-icons/react/dist/ssr'
import { Reveal } from '@/components/site/Reveal'
import { SplitHeading } from '@/components/site/motion'
import { HOSTED_UC, formatRand } from '@/content/pricing'

/** Hosted UC package prices. Three columns, so one table works at every width. */
export function HostedUcPricing() {
  const { intro, tiers, included, notes } = HOSTED_UC

  return (
    <section id="hosted-uc" className="night scroll-mt-28 border-t border-hairline">
      <div className="shell py-24 lg:py-32">
        <div className="max-w-[60rem]">
          <SplitHeading
            parts={[{ text: 'Hosted' }, { text: 'UC', accent: true }]}
            className="t-section max-w-[16ch] text-ink"
          />
          <p className="t-lead mt-6">{intro}</p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Hosted UC: monthly prices per package and number of extensions.</caption>
              <thead>
                <tr className="border-b border-ink/15">
                  <th scope="col" className="t-meta py-4 pr-4 text-slate">Package</th>
                  <th scope="col" className="t-meta py-4 pr-4 text-right text-slate">Extensions</th>
                  <th scope="col" className="t-meta py-4 text-right text-slate">Monthly</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier) => (
                  <tr key={tier.name} className="border-b border-hairline">
                    <th scope="row" className="py-5 pr-4 font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-ink">
                      {tier.name}
                    </th>
                    <td className="py-5 pr-4 text-right text-[0.9375rem] text-ink">{tier.extensions}</td>
                    <td className="py-5 text-right">
                      <span className="font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-ink">{formatRand(tier.monthly)}</span>
                      <span className="text-[0.8125rem] text-slate"> /month</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="card p-7 lg:p-8">
              <h3 className="t-card text-ink">Included free in every package</h3>
              <ul className="mt-6 grid gap-4">
                {included.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <Check size={15} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-accent-text" />
                    <span className="text-[0.9375rem] leading-relaxed">
                      <span className="font-semibold text-ink">{item.title}</span>
                      <span className="block text-slate">{item.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <ul className="mt-6 grid max-w-[64ch] gap-1.5 text-[0.875rem] leading-relaxed text-slate">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>

        <Link href="/contact?service=unified-communications" className="btn btn-primary mt-8">
          Book a free consultation
          <ArrowRight size={17} weight="bold" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
