import { Check, Minus } from '@phosphor-icons/react/dist/ssr'
import { SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'

const ROWS = [
  { label: 'Platform capacity', ours: 'One user to 500,000+', typical: 'Roughly 100 to 10,000' },
  { label: 'Redundancy', ours: 'Geo-redundant cluster', typical: 'Single site, or a paid add-on' },
  { label: 'Architecture', ours: 'Active-active', typical: 'Active-passive or single server' },
  { label: 'Survives a data centre outage', ours: true, typical: false },
  { label: 'Video, chat and file sharing built in', ours: true, typical: 'Often a separate app' },
  { label: 'Office 365, CRM and LDAP integration', ours: true, typical: 'Varies, often extra' },
  { label: 'Fraud controls and daily spend limits', ours: true, typical: 'Rarely by default' },
  { label: 'One-click user onboarding', ours: true, typical: 'Manual set-up per user' },
] as const

function Cell({ value, strong }: { value: string | boolean; strong?: boolean }) {
  if (value === true)
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-warm/15 text-warm-text">
        <Check size={14} weight="bold" aria-label="Yes" />
      </span>
    )
  if (value === false)
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 text-slate">
        <Minus size={14} weight="bold" aria-label="No" />
      </span>
    )
  return <span className={strong ? 'font-semibold text-ink' : 'text-slate'}>{value}</span>
}

/** Unified Communications: how the platform compares with a typical hosted PBX. */
export function CompareModule() {
  return (
    <section className="night relative overflow-hidden">
      <div className="shell relative py-24 lg:py-36">
        <div className="max-w-[60rem]">
            <SplitHeading
              parts={[{ text: 'Platform' }, { text: 'comparison', accent: true }]}
              className="t-section max-w-[13ch] text-ink"
            />
          <p className="t-lead mt-6">
            Unified Communications runs on carrier-grade infrastructure and keeps working if a data
            centre fails.
          </p>
        </div>

        <Reveal className="mt-14 lg:mt-20">
          <div className="card overflow-x-auto" data-lenis-prevent-wheel>
            <table className="w-full min-w-[620px] border-collapse text-left">
              <caption className="sr-only">Hypernet Unified Communications compared with a typical hosted PBX</caption>
              <thead>
                <tr className="border-b border-hairline">
                  <th scope="col" className="t-meta px-6 py-5 text-slate lg:px-8">Feature</th>
                  <th scope="col" className="px-6 py-5 lg:px-8">
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-[0.8125rem] font-semibold text-white">
                      Hypernet UC
                    </span>
                  </th>
                  <th scope="col" className="t-meta px-6 py-5 text-slate lg:px-8">Typical hosted PBX</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-hairline last:border-b-0">
                    <th scope="row" className="px-6 py-5 text-[0.9375rem] font-medium text-ink lg:px-8">
                      {row.label}
                    </th>
                    <td className="bg-accent/[0.05] px-6 py-5 text-[0.9375rem] lg:px-8">
                      <Cell value={row.ours} strong />
                    </td>
                    <td className="px-6 py-5 text-[0.9375rem] lg:px-8">
                      <Cell value={row.typical} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[0.8125rem] text-slate">
            Platform specifications from the vendor. Service levels are agreed in writing.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
