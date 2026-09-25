import Image from 'next/image'
import { SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'
import type { HomePage } from '@/payload-types'

type Sector = NonNullable<HomePage['sectors']>[number]

/**
 * Sector photography, matched to the CMS sector labels by keyword so editors
 * can reorder or rename sectors without breaking the images. Anything that
 * does not match falls back to the image in the same position.
 */
const SECTOR_IMAGES: { match: RegExp; src: string; alt: string }[] = [
  { match: /retail|franchise|shop|hospitality/i, src: '/brand/people/ind-retail.webp', alt: 'A shop owner handing a card machine to a customer at a hardware store counter' },
  { match: /professional|accounting|legal/i, src: '/brand/people/ind-professional.webp', alt: 'Two partners at an accounting practice reviewing a document on a laptop' },
  { match: /logistic|distribution|dispatch/i, src: '/brand/people/ind-logistics.webp', alt: 'A dispatcher on a desk phone with delivery trucks loading outside' },
  { match: /ecommerce|e-commerce|online/i, src: '/brand/people/ind-ecommerce.webp', alt: 'Staff packing and scanning orders at a fulfilment bench' },
  { match: /health|clinic|medical/i, src: '/brand/people/ind-healthcare.webp', alt: 'A receptionist booking a patient at a medical practice front desk' },
  { match: /manufactur|industrial|factory/i, src: '/brand/people/ind-manufacturing.webp', alt: 'A production supervisor checking a tablet on a factory floor' },
]

const imageFor = (sector: Sector, index: number) =>
  SECTOR_IMAGES.find((entry) => entry.match.test(sector.label)) ?? SECTOR_IMAGES[index % SECTOR_IMAGES.length]

/** The sectors we serve, each with a scene from that kind of business. */
export function Sectors({ heading, sectors }: { heading: string; sectors: Sector[] }) {
  return (
    <section className="dusk relative">
      <div className="shell py-24 lg:py-36">
        <div className="max-w-[60rem]">
          <SplitHeading parts={[{ text: heading }]} className="t-section balance max-w-[14ch] text-ink" />
          <Reveal delay={0.1} className="mt-6 block">
            <p className="t-lead">
              We work with businesses of every size where an outage has a direct cost.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {sectors.map((sector, index) => {
            const image = imageFor(sector, index)
            return (
              <Reveal as="li" key={sector.id ?? sector.label} delay={(index % 3) * 0.05}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sunken">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.03em] text-ink">
                  {sector.label}
                </h3>
                <p className="pretty mt-2 max-w-[42ch] text-[0.9375rem] leading-relaxed text-slate">{sector.detail}</p>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
