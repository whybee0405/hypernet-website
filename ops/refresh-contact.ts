import { getPayload } from 'payload'
import config from '../src/payload.config'
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, COMPANY_ADDRESS, WHATSAPP_HREF } from '../src/lib/contact'

const payload = await getPayload({ config })
await payload.updateGlobal({ slug: 'site-settings', data: {
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
  phoneHref: CONTACT_PHONE_HREF,
  whatsapp: WHATSAPP_HREF,
  addressLines: COMPANY_ADDRESS.map((line) => ({ line })),
} })
console.log('Confirmed contact details saved to the CMS.')
await payload.destroy()
