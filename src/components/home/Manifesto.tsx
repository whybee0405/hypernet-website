import { Marquee, ScrollLitText } from '@/components/site/motion'
import { SERVICES } from '@/content/services'

/**
 * The positioning in one paragraph, lit word by word as it scrolls.
 */
export function Manifesto() {
  return (
    <section className="night relative overflow-hidden pb-24 pt-10 lg:pb-36">
      <div className="shell">
        <ScrollLitText
          className="max-w-[26ch] font-display text-[clamp(2rem,4.6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-ink"
          text="Hypernet designs, installs and manages the internet, phone systems, customer contact, security and integrations that South African businesses run on. Our engineers monitor your services around the clock, and our service desk answers when you need us."
          accentWords={['clock,']}
        />
      </div>

      <Marquee className="mt-20 border-y border-hairline py-6 lg:mt-28" items={SERVICES.map((service) => service.name)} />
    </section>
  )
}
