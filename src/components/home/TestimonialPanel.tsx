import { Reveal } from '@/components/site/Reveal'
import { ScrollLitText } from '@/components/site/motion'
import type { Testimonial } from '@/payload-types'

/**
 * One quote, set huge in the serif and lit as it scrolls. Initials instead of
 * a portrait: the placeholder portraits are generated, and a monogram is more
 * honest than a stock face standing in for a real customer.
 */
export function TestimonialPanel({ testimonial }: { testimonial: Testimonial | undefined }) {
  if (!testimonial) return null

  const initials = testimonial.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  return (
    <section className="night relative overflow-hidden">
      <div className="shell relative py-28 lg:py-40">
        <figure className="mx-auto max-w-[62rem] text-center">
          <blockquote>
            <ScrollLitText
              text={`\u201c${testimonial.quote}\u201d`}
              className="balance font-display text-[clamp(1.6rem,3vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink"
            />
          </blockquote>
          <Reveal>
            <figcaption className="mt-12 inline-flex items-center gap-4 text-left">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-raised font-display text-[1rem] font-bold text-warm-text ring-1 ring-hairline-strong">
                {initials}
              </span>
              <span className="text-[0.9375rem] leading-snug">
                <span className="block font-semibold text-ink">{testimonial.name}</span>
                <span className="block text-slate">
                  {testimonial.role}, {testimonial.business}, {testimonial.location}
                </span>
              </span>
            </figcaption>
          </Reveal>
        </figure>
      </div>
    </section>
  )
}
