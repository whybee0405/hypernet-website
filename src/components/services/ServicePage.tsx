import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CheckCircle } from '@phosphor-icons/react/dist/ssr'
import { CtaBand } from '@/components/site/CtaBand'
import { Parallax, Render, ScrollLitText, SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'
import { SERVICE_BY_SLUG, serviceHref, type Service } from '@/content/services'
import { PackageStack } from './PackageStack'
import { ServiceModule } from './modules'

/**
 * One template for all eight services. Each page has its own render and a
 * bespoke module in the middle (failover demo, attack layers, channel orbit
 * and so on) that explains how the service works.
 */
export function ServicePage({
  service,
  phone,
  phoneHref,
}: {
  service: Service
  phone: string
  phoneHref: string
}) {
  const related = service.related.map((slug) => SERVICE_BY_SLUG[slug]).filter(Boolean)

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="night relative isolate overflow-hidden pt-32 lg:pt-36">

        <div className="shell">
          <nav aria-label="Breadcrumb" className="t-meta flex items-center gap-2 text-slate">
            <Link href="/services" className="transition-colors hover:text-ink">
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-warm-text">{service.name}</span>
          </nav>

          <div className="grid items-center gap-6 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-8">
            <div className="relative z-10 lg:col-span-7">
              <SplitHeading
                as="h1"
                immediate
                delay={0.1}
                parts={[{ text: service.title }, { text: service.titleAccent, accent: true }]}
                className="t-display balance mt-8 max-w-[14ch] text-ink"
              />
              <Reveal delay={0.35}>
                <p className="t-lead mt-8 max-w-[54ch]">{service.lead}</p>
              </Reveal>
              <Reveal delay={0.45}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href={`/contact?service=${service.slug}`} className="btn btn-primary">
                    Contact us
                    <ArrowRight size={16} weight="bold" aria-hidden="true" className="btn-arrow" />
                  </Link>
                  <a href="#packages" className="btn btn-secondary">
                    View packages
                  </a>
                </div>
                {service.poweredBy ? (
                  <p className="mt-8 text-[0.875rem] text-slate">
                    Powered by <span className="font-semibold text-ink">{service.poweredBy}</span>, managed and supported by Hypernet.
                  </p>
                ) : null}
              </Reveal>
            </div>

            <div className="relative lg:col-span-5">
              <div className="render-stage mx-auto w-full max-w-[520px] lg:-mr-10 lg:max-w-none">
                <Render
                  src={service.image}
                  priority
                  className="aspect-[4/5] w-full"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Statement */}
      <section className="night">
        <div className="shell py-24 lg:py-36">
          <ScrollLitText
            text={service.statement}
            accentWords={service.statementAccent}
            className="max-w-[30ch] font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink"
          />

          {/* The service in use: people and a real setting after the render. */}
          <Reveal className="mt-16 block lg:mt-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-sunken sm:aspect-[21/9]">
              <Parallax offset={50} className="absolute inset-x-0 -inset-y-16">
                <Image
                  src={service.photo}
                  alt={service.photoAlt}
                  fill
                  sizes="(max-width: 1480px) 100vw, 1400px"
                  className="object-cover"
                />
              </Parallax>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- Packages */}
      <PackageStack
        id="packages"
        heading={service.packagesHeading}
        intro={service.packagesIntro}
        packages={service.packages}
      />

      {/* ---------------------------------------------------------- Module */}
      {service.module ? <ServiceModule kind={service.module} /> : null}

      {/* ------------------------------------------------- Features + fit */}
      <section className="night relative">
        <div className="shell py-24 lg:py-36">
          <SplitHeading parts={[{ text: service.featuresHeading }]} className="t-section balance max-w-[18ch] text-ink" />

          <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
            {/* Features as an open list: the content is a set of facts, so
                hairlines and space separate them rather than card chrome. */}
            <dl className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
              {service.features.map((feature, index) => (
                <Reveal key={feature.title} delay={(index % 2) * 0.05}>
                  <div className="border-t border-hairline pb-9 pt-6">
                    <dt className="font-display text-[1.25rem] font-semibold tracking-[-0.025em] text-ink">
                      {feature.title}
                    </dt>
                    <dd className="pretty mt-2.5 text-[0.9375rem] leading-relaxed text-slate">{feature.body}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={0.1} className="lg:col-span-4">
              <aside className="card p-7 lg:sticky lg:top-28">
                <h3 className="text-[1rem] font-semibold text-ink">{service.fitHeading}</h3>
                <ul className="mt-5 grid gap-3.5">
                  {service.fit.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink/90">
                      <CheckCircle size={19} weight="duotone" aria-hidden="true" className="mt-px shrink-0 text-warm" />
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Related */}
      {related.length ? (
        <section className="dusk">
          <div className="shell py-24 lg:py-32">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SplitHeading
                parts={[{ text: 'Related' }, { text: 'services', accent: true }]}
                className="t-section text-ink"
              />
              <Link href="/services" className="link-arrow">
                View services
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </Link>
            </div>
            {/* Related services as rows: a short list to scan, not a gallery. */}
            <ul className="mt-10 border-b border-hairline">
              {related.map((item, index) => (
                <Reveal as="li" key={item.slug} delay={index * 0.05}>
                  <Link
                    href={serviceHref(item.slug)}
                    className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-5 border-t border-hairline py-5 sm:grid-cols-[5.5rem_1fr_auto] sm:gap-8"
                  >
                    <span className="relative aspect-[4/5] overflow-hidden rounded-xl bg-sunken">
                      <Image
                        src={item.image.replace('.webp', '-thumb.webp')}
                        alt=""
                        fill
                        sizes="88px"
                        className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[clamp(1.25rem,2vw,1.625rem)] font-semibold tracking-[-0.03em] text-ink">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-[0.9375rem] leading-relaxed text-slate">{item.short}</span>
                    </span>
                    <ArrowUpRight
                      size={20}
                      weight="bold"
                      aria-hidden="true"
                      className="text-slate transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-warm"
                    />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand heading={service.ctaHeading} body={service.ctaBody} phone={phone} phoneHref={phoneHref} />
    </>
  )
}
