import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone } from '@phosphor-icons/react/dist/ssr'
import { Parallax, SplitHeading } from './motion'
import { Reveal } from './Reveal'

/**
 * Closing band on every page. The night city sits behind on a slow parallax,
 * and the phone number is set large because calling is the main action.
 */
export function CtaBand({
  heading,
  body,
  phone,
  phoneHref,
}: {
  heading: string
  body: string
  phone: string
  phoneHref: string
}) {
  return (
    <section className="stay-dark relative isolate overflow-hidden border-t border-hairline">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Parallax offset={70} className="absolute inset-x-0 -inset-y-24">
          <Image
            src="/brand/city-night.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-55"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/70 to-surface/30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />
      </div>

      <div className="shell py-28 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SplitHeading
              parts={[{ text: heading }]}
              className="t-display balance max-w-[16ch] text-ink"
            />
            <Reveal delay={0.1}>
              <p className="t-lead mt-7">{body}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="card p-7 sm:p-8">
              <p className="t-meta text-slate">Call the office</p>
              <a
                href={`tel:${phoneHref}`}
                className="mt-3 flex items-center gap-3 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-bold tracking-[-0.045em] text-ink transition-colors hover:text-accent-text"
              >
                <Phone size={30} weight="duotone" aria-hidden="true" className="text-warm" />
                {phone}
              </a>
              <p className="mt-2 text-[0.875rem] text-slate">Our service desk answers during business hours.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn btn-primary flex-1">
                  Contact us
                  <ArrowRight size={16} weight="bold" aria-hidden="true" className="btn-arrow" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
