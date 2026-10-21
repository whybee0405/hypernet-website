import Link from '@/components/site/SiteLink'
import { pageMetadata } from '@/lib/seo'
import { CONTACT_EMAIL, CONTACT_HREF } from '@/lib/contact'

export const metadata = {
  ...pageMetadata({ path: '/thank-you', title: 'Enquiry Received — Thank You', description: 'Your enquiry has been received by Hypernet. Our team will review your request and reply to the email address you provided. Explore our business services.' }),
  robots: { index: false, follow: true },
}

export default function ThankYouPage() {
  return (
    <section className="shell py-36 lg:py-44">
      <p className="t-meta text-accent-text">Enquiry received</p>
      <h1 className="t-display mt-6 text-ink">Thank <span className="accent-word">you.</span></h1>
      <p className="t-lead mt-8">Your enquiry has been saved. Our team will review it and reply to the email address you provided.</p>
      <p className="mt-5 text-base text-slate">Need to add something? Email <a href={CONTACT_HREF} className="inline-flex min-h-11 items-center text-accent-text underline">{CONTACT_EMAIL}</a>.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">Back to the homepage</Link>
        <Link href="/services" className="btn btn-secondary">Explore services</Link>
      </div>
    </section>
  )
}
