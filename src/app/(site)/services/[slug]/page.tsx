import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServicePage } from '@/components/services/ServicePage'
import { SERVICES, SERVICE_BY_SLUG } from '@/content/services'
import { getSiteSettings } from '@/lib/payload'

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICE_BY_SLUG[slug]
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [{ url: service.image }],
    },
  }
}

export default async function ServiceRoute({ params }: Params) {
  const { slug } = await params
  const service = SERVICE_BY_SLUG[slug]
  if (!service) notFound()

  const settings = await getSiteSettings()
  return <ServicePage service={service} phone={settings.phone} phoneHref={settings.phoneHref} />
}
