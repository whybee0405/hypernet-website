import { SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'

const PORTING = [
  {
    title: 'Number ownership',
    body: 'Number portability is regulated. Your number belongs to you, and your current provider must release it.',
  },
  {
    title: 'Paperwork',
    body: 'We submit your account details exactly as your current provider holds them. A mismatched company name is the most common reason a port is rejected.',
  },
  {
    title: 'Setup in advance',
    body: 'Handsets are configured and tested on the new service while the old one is still active.',
  },
  {
    title: 'After-hours cutover',
    body: 'The switch takes minutes and is scheduled after hours. We test every direct number from outside the building before we leave.',
  },
]

/** VoIP: the number porting steps, plus a note on porting dates. */
export function PortingModule() {
  return (
    <section className="night relative overflow-hidden">
      <div className="shell relative py-24 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SplitHeading
                parts={[{ text: 'Number' }, { text: 'porting', accent: true }]}
                className="t-section max-w-[12ch] text-ink"
              />
              <div className="card mt-10 p-7">
                <p className="t-meta text-warm-text">Porting dates</p>
                <p className="pretty mt-3 text-[0.9375rem] leading-relaxed text-slate">
                  The porting date depends on your current provider, so we cannot guarantee it. We
                  give you a status update whenever you ask.
                </p>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {PORTING.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 0.05} className="border-t border-hairline py-10 first:border-t-0 first:pt-0 lg:py-14">
                <span className="font-display text-[4.5rem] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(255_122_69/0.6)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-display text-[clamp(1.5rem,2.4vw,2.125rem)] font-semibold leading-tight tracking-[-0.035em] text-ink">
                  {step.title}
                </h3>
                <p className="pretty mt-3 max-w-[50ch] text-[1rem] leading-relaxed text-slate">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
