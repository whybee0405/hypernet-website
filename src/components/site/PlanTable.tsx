import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Reveal } from '@/components/site/Reveal'
import type { Plan } from '@/payload-types'

/**
 * Plan table per BRAND.md section 7: left-aligned Inter labels, right-aligned
 * values, hairline rules, no zebra striping, square corners.
 *
 * Only verified plans reach this component. When nothing is signed off, the
 * table is replaced by an honest quote prompt rather than placeholder pricing.
 */
export function PlanTable({ plans }: { plans: Plan[] }) {
  if (plans.length === 0) {
    return (
      <Reveal>
        <div className="card p-8 sm:p-10">
          <h3 className="t-card text-ink">Pricing on request</h3>
          <p className="pretty mt-3 max-w-[54ch] text-[0.9375rem] leading-relaxed text-slate">
            Line speeds and VoIP options depend on what is available at your address. Send us your
            address and we will reply with the available options and prices.
          </p>
          <Link href="/contact" className="btn btn-primary mt-7">
            Contact us
            <ArrowRight size={17} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    )
  }

  return (
    <>
      {/* Desktop: a real table. Square corners, hairline rules, no fills. */}
      <Reveal className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Hypernet plan comparison: connectivity, VoIP lines, support and pricing.
          </caption>
          <thead>
            <tr className="border-b border-ink/15">
              <th scope="col" className="t-meta py-4 pr-6 text-slate">
                Plan
              </th>
              <th scope="col" className="t-meta py-4 pr-6 text-right text-slate">
                Connectivity
              </th>
              <th scope="col" className="t-meta py-4 pr-6 text-right text-slate">
                VoIP lines
              </th>
              <th scope="col" className="t-meta py-4 pr-6 text-right text-slate">
                Support
              </th>
              <th scope="col" className="t-meta py-4 text-right text-slate">
                From
              </th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id} className="border-b border-hairline align-top">
                <th scope="row" className="py-6 pr-6 font-normal">
                  <span className="block font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-ink">
                    {plan.name}
                    {plan.recommended ? (
                      <span className="t-meta ml-3 inline-block align-middle rounded-full bg-accent-soft px-2 py-1 text-accent-text">
                        Most chosen
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1.5 block max-w-[26ch] text-[0.875rem] leading-relaxed text-slate">
                    {plan.audience}
                  </span>
                </th>
                <td className="py-6 pr-6 text-right text-[0.9375rem] text-ink">
                  {plan.downstream}
                </td>
                <td className="py-6 pr-6 text-right text-[0.9375rem] text-ink">{plan.voipLines}</td>
                <td className="py-6 pr-6 text-right text-[0.9375rem] text-ink">{plan.support}</td>
                <td className="py-6 text-right">
                  {plan.price ? (
                    <>
                      <span className="block font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-ink">
                        {plan.price}
                      </span>
                      {plan.priceNote ? (
                        <span className="mt-1 block text-[0.8125rem] text-slate">
                          {plan.priceNote}
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <span className="text-[0.9375rem] text-slate">Quoted after survey</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      {/* Mobile: one block per plan. A five-column table cannot survive 390px. */}
      <Reveal className="grid gap-4 md:hidden">
        {plans.map((plan) => (
          <div key={plan.id}>
            <div className="card p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-ink">
                  {plan.name}
                </h3>
                {plan.recommended ? (
                  <span className="t-meta shrink-0 rounded-full bg-accent-soft px-2 py-1 text-accent-text">
                    Most chosen
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-slate">{plan.audience}</p>

              <dl className="mt-5 grid gap-0">
                {[
                  { label: 'Connectivity', value: plan.downstream },
                  { label: 'VoIP lines', value: plan.voipLines },
                  { label: 'Support', value: plan.support },
                  { label: 'From', value: plan.price ?? 'Quoted after survey' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-hairline py-3 last:border-b-0"
                  >
                    <dt className="t-meta text-slate">{row.label}</dt>
                    <dd className="text-right text-[0.9375rem] text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ))}
      </Reveal>
    </>
  )
}
