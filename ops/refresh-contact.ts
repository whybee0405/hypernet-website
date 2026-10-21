import { getPayload } from 'payload'
import config from '../src/payload.config'

const payload = await getPayload({ config })
await payload.updateGlobal({ slug: 'site-settings', data: {
  email: 'hello@hypernet.co.za',
  // Legacy string fields remain in the existing schema; public widgets now use email.
  phone: 'hello@hypernet.co.za',
  phoneHref: 'mailto:hello@hypernet.co.za',
  whatsapp: null,
  addressLines: [{ line: '33 Adrienne Street' }, { line: 'Sandown, Gauteng' }, { line: '2191, South Africa' }],
} })
console.log('Confirmed contact details saved to the CMS.')
await payload.destroy()
