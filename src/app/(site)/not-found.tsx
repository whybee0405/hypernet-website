import { RecoveryLinks } from '@/components/site/RecoveryLinks'
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
          <RecoveryLinks />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="render-stage mx-auto w-full max-w-[460px]">
            <Render alt="CloudPath network service illustration" src="/brand/cloudpath.webp" className="aspect-[4/5] w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
