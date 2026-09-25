'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export type LeadState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'email' | 'phone' | 'interest', string>>
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const INTERESTS = [
  'connectivity',
  'voip',
  'both',
  'cloudpath',
  'unified-communications',
  'contact-centre',
  'secure-business',
  'dragon-guard',
  'integration-suite',
  'other',
] as const

const clean = (value: FormDataEntryValue | null) =>
  typeof value === 'string' ? value.trim() : ''

/**
 * Contact form handler.
 *
 * Writes through Payload's Local API, which bypasses access control. That is
 * why the Leads collection denies `create` to everyone: the only way a document
 * lands in it is this action, so the public REST endpoint cannot be used to
 * stuff the enquiry list.
 */
export async function submitLead(_previous: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot. Real people never fill a field they cannot see.
  if (clean(formData.get('company_website'))) {
    return { status: 'success', message: 'Thanks. We will be in touch.' }
  }

  const name = clean(formData.get('name'))
  const business = clean(formData.get('business'))
  const email = clean(formData.get('email'))
  const phone = clean(formData.get('phone'))
  const interest = clean(formData.get('interest'))
  const message = clean(formData.get('message'))
  const source = clean(formData.get('source')) || 'unknown'

  const errors: LeadState['errors'] = {}

  if (name.length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address.'
  if (phone.replace(/\D/g, '').length < 9) errors.phone = 'Please enter a valid phone number.'
  if (!INTERESTS.includes(interest as (typeof INTERESTS)[number])) {
    errors.interest = 'Please choose a service.'
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      errors,
    }
  }

  try {
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'leads',
      data: {
        name,
        business: business || undefined,
        email,
        phone,
        interest: interest as (typeof INTERESTS)[number],
        message: message || undefined,
        source,
        status: 'new',
      },
      overrideAccess: true,
    })

    return {
      status: 'success',
      message: 'Thank you. We will call you back on the number you provided.',
    }
  } catch (error) {
    console.error('Lead submission failed', error)
    return {
      status: 'error',
      message:
        'Your message could not be sent. Please try again or call us on the number at the top of the page.',
    }
  }
}
