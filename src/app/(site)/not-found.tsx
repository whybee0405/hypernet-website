import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Render } from '@/components/site/motion'

export default function NotFound() {
  return (
    <section className="night relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32">
      <div className="shell grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h1 className="t-display balance text-ink">
            Page <span className="accent-word">not found</span>
          </h1>
          <p className="t-lead mt-7">
            The link may be out of date or mistyped. Use the links below to continue.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-primary">
              Back to the homepage
              <ArrowRight size={16} weight="bold" aria-hidden="true" className="btn-arrow" />
            </Link>
            <Link href="/services" className="btn btn-secondary">
              View services
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="render-stage mx-auto w-full max-w-[460px]">
            <Render src="/brand/cloudpath.webp" className="aspect-[4/5] w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
