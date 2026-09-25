'use client'

import { useActionState, useId } from 'react'
import { useFormStatus } from 'react-dom'
import { ArrowRight, CheckCircle, WarningCircle } from '@phosphor-icons/react/dist/ssr'
import { submitLead, type LeadState } from '@/actions/lead'

const INITIAL: LeadState = { status: 'idle' }

const INTERESTS = [
  { value: 'connectivity', label: 'Business internet' },
  { value: 'cloudpath', label: 'CloudPath SD-WAN' },
  { value: 'voip', label: 'Business VoIP' },
  { value: 'both', label: 'Internet and VoIP together' },
  { value: 'unified-communications', label: 'Unified Communications' },
  { value: 'contact-centre', label: 'Omni-channel Contact Centre' },
  { value: 'secure-business', label: 'Secure Business' },
  { value: 'dragon-guard', label: 'Dragon Guard' },
  { value: 'integration-suite', label: 'Integration Suite' },
  { value: 'other', label: 'Not sure, or something else' },
]

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={pending}>
      {pending ? 'Sending' : 'Send message'}
      {pending ? null : <ArrowRight size={17} weight="bold" aria-hidden="true" />}
    </button>
  )
}

export function ContactForm({
  source,
  defaultInterest = 'both',
}: {
  source: string
  defaultInterest?: string
}) {
  const [state, formAction] = useActionState(submitLead, INITIAL)
  const ids = {
    name: useId(),
    business: useId(),
    email: useId(),
    phone: useId(),
    interest: useId(),
    message: useId(),
  }

  if (state.status === 'success') {
    return (
      <div className="card p-8 sm:p-10">
        <CheckCircle size={30} weight="fill" aria-hidden="true" className="text-[#3ee089]" />
        <h2 className="t-card mt-5 text-ink">Message sent</h2>
        <p className="pretty mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-slate">
          {state.message}
        </p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      noValidate
      className="card relative p-7 sm:p-10"
    >
      <input type="hidden" name="source" value={source} />

      {/* Honeypot. Hidden from people, offered to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={`${ids.name}-hp`}>Company website</label>
        <input id={`${ids.name}-hp`} type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && state.message ? (
        <p
          role="alert"
          className="mb-7 flex items-start gap-2.5 rounded-input bg-warm-soft px-4 py-3 text-[0.875rem] font-medium text-warm-text"
        >
          <WarningCircle size={18} weight="bold" aria-hidden="true" className="mt-px shrink-0" />
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className="field-label">
            Your name
          </label>
          <input
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            className="field-input"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? `${ids.name}-error` : undefined}
          />
          {state.errors?.name ? (
            <p id={`${ids.name}-error`} className="field-error">
              {state.errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={ids.business} className="field-label">
            Business name
          </label>
          <input
            id={ids.business}
            name="business"
            type="text"
            autoComplete="organization"
            className="field-input"
          />
          <p className="field-help">Optional.</p>
        </div>

        <div>
          <label htmlFor={ids.email} className="field-label">
            Email
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            required
            className="field-input"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? `${ids.email}-error` : undefined}
          />
          {state.errors?.email ? (
            <p id={`${ids.email}-error`} className="field-error">
              {state.errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={ids.phone} className="field-label">
            Phone
          </label>
          <input
            id={ids.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className="field-input"
            aria-invalid={Boolean(state.errors?.phone)}
            aria-describedby={
              state.errors?.phone ? `${ids.phone}-error` : `${ids.phone}-help`
            }
          />
          {state.errors?.phone ? (
            <p id={`${ids.phone}-error`} className="field-error">
              {state.errors.phone}
            </p>
          ) : (
            <p id={`${ids.phone}-help`} className="field-help">
              We will call you on this number.
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={ids.interest} className="field-label">
            Service
          </label>
          <select
            id={ids.interest}
            name="interest"
            defaultValue={
              INTERESTS.some((option) => option.value === defaultInterest) ? defaultInterest : 'both'
            }
            className="field-input"
            aria-invalid={Boolean(state.errors?.interest)}
          >
            {INTERESTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {state.errors?.interest ? (
            <p className="field-error">{state.errors.interest}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={ids.message} className="field-label">
            Message
          </label>
          <textarea id={ids.message} name="message" rows={5} className="field-input resize-y" />
          <p className="field-help">
            Include your address if you need connectivity. We use it to check availability.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton />
        <p className="text-[0.8125rem] leading-relaxed text-slate">
          We use these details only to reply to you.
        </p>
      </div>
    </form>
  )
}
