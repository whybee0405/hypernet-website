import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Marquee, SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'

const RECIPES: { title: string; body: string; flow: [string, string, string]}[] = [
  {
    title: 'Hosted VoIP integration',
    body: 'Automatic setup and monitoring of phone services, synced between your CRM and back-end systems.',
    flow: ['Order placed', 'Line auto-provisioned', 'Jitter and uptime pulled via API'],
  },
  {
    title: 'Master data management',
    body: 'A single source of customer and product data across all your systems.',
    flow: ['Customer updated in CRM', 'Synced to ERP and support', 'Codes and regions governed centrally'],
  },
  {
    title: 'IoT and network monitoring',
    body: 'Real-time processing of device data with automatic anomaly detection.',
    flow: ['Sensor or device reports', 'Ingested over MQTT or REST', 'Anomaly flagged instantly'],
  },
  {
    title: 'IP management',
    body: 'Automatic synchronisation of IP address records.',
    flow: ['Dataset exported', 'Watched and detected', 'Synced to the database'],
  },
]

// Only connectors the source material names. The full catalogue is 250+.
const CONNECTORS = ['Salesforce', 'HubSpot', 'SAP', 'AWS', 'SQL databases', 'REST APIs', 'MQTT', 'IoT hubs']

/** Integration Suite: four common integrations drawn as trigger, platform, result. */
export function RecipesModule() {
  return (
    <section className="night relative overflow-hidden">
      <div className="shell relative py-24 lg:py-36">
        <div className="max-w-[60rem]">
            <SplitHeading
              parts={[{ text: 'Integration' }, { text: 'examples', accent: true }]}
              className="t-section max-w-[14ch] text-ink"
            />
          <p className="t-lead mt-6">
            Common integrations across CRM, ERP, e-commerce and phone systems.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-20">
          {RECIPES.map((recipe, index) => {
            return (
              <Reveal key={recipe.title} delay={(index % 2) * 0.06}>
                <article className="card h-full p-7 lg:p-9">
                  <h3 className="t-card text-ink">{recipe.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{recipe.body}</p>
                  <ol className="mt-7 flex flex-wrap items-center gap-2 border-t border-hairline pt-6">
                    {recipe.flow.map((stepText, stepIndex) => (
                      <li key={stepText} className="flex items-center gap-2">
                        <span
                          className={
                            stepIndex === 1
                              ? 'rounded-full border border-warm/50 bg-warm/10 px-3 py-1.5 text-[0.8125rem] font-medium text-ink'
                              : 'rounded-full border border-hairline-strong px-3 py-1.5 text-[0.8125rem] text-slate'
                          }
                        >
                          {stepText}
                        </span>
                        {stepIndex < recipe.flow.length - 1 ? (
                          <ArrowRight size={13} weight="bold" aria-hidden="true" className="text-slate" />
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </article>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-20">
          <p className="t-meta text-center text-slate">250+ connectors, including</p>
          <Marquee className="mt-6" items={CONNECTORS} />
        </div>
      </div>
    </section>
  )
}
