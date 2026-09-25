import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * CMS photography in the house treatment: desaturated, pushed into the night
 * blue, with the coral light bleeding in from one corner. The placeholder
 * library is AI-generated, and this makes every image read as part of one
 * art-directed system rather than as stock. Hover (in a `group`) restores
 * some colour, so the image still rewards attention.
 */
export function Duotone({
  src,
  alt,
  sizes,
  className,
  priority,
}: {
  src: string
  alt: string
  sizes: string
  className?: string
  priority?: boolean
}) {
  return (
    <div className={cn('relative overflow-hidden bg-[#0a1230]', className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover opacity-80 mix-blend-luminosity grayscale-[0.9] contrast-[1.1] transition-[transform,filter,opacity] duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:opacity-95 group-hover:grayscale-[0.35]"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_100%_100%,rgb(255_122_69/0.35),transparent_55%),linear-gradient(180deg,rgb(21_94_239/0.28),rgb(3_6_15/0.35))] mix-blend-screen"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#03060f]/50 to-transparent" />
    </div>
  )
}
