import type { Icon } from '@phosphor-icons/react'
import {
  ChatsCircle,
  EnvelopeSimple,
  Phone,
  ShareNetwork,
  UsersThree,
  WhatsappLogo,
} from '@phosphor-icons/react/dist/ssr'
import { SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'

const CHANNELS: { name: string; body: string; icon: Icon }[] = [
  { name: 'Voice', body: 'Smart routing, IVR, call recording and live reporting.', icon: Phone },
  { name: 'WhatsApp', body: 'Message customers on WhatsApp with the full thread visible to your team.', icon: WhatsappLogo },
  { name: 'Email', body: 'A shared inbox that tracks each enquiry until it is resolved.', icon: EnvelopeSimple },
  { name: 'Live chat', body: 'Answer website visitors in real time.', icon: ChatsCircle },
  { name: 'Social media', body: 'Reply to messages from your social media pages in the same workspace.', icon: ShareNetwork },
]

/**
 * Contact centre: five channels arranged around one team.
 */
export function ChannelsModule() {
  return (
    <section className="night relative overflow-hidden">
      <div className="shell relative py-24 lg:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SplitHeading
              parts={[{ text: 'Supported' }, { text: 'channels', accent: true }]}
              className="t-section max-w-[12ch] text-ink"
            />
            <ul className="mt-10 grid gap-1">
              {CHANNELS.map((channel, index) => {
                const IconComponent = channel.icon
                return (
                  <Reveal as="li" key={channel.name} delay={index * 0.05}>
                    <div className="flex items-start gap-4 border-t border-hairline py-4">
                      <IconComponent size={22} weight="duotone" aria-hidden="true" className="mt-0.5 shrink-0 text-accent-text" />
                      <div>
                        <p className="font-semibold text-ink">{channel.name}</p>
                        <p className="mt-1 text-[0.9375rem] leading-relaxed text-slate">{channel.body}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7" aria-hidden="true">
            <div className="relative mx-auto aspect-square w-full max-w-[560px]">
              <div className="absolute inset-[6%] rounded-full border border-dashed border-hairline-strong" />
              <div className="absolute inset-[22%] rounded-full border border-hairline" />
              <div className="absolute inset-[6%]">
                {CHANNELS.map((channel, index) => {
                  const angle = (index / CHANNELS.length) * Math.PI * 2 - Math.PI / 2
                  const IconComponent = channel.icon
                  return (
                    <div
                      key={channel.name}
                      className="absolute flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full border border-hairline-strong bg-raised shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8)] sm:h-[5.5rem] sm:w-[5.5rem]"
                      style={{ left: `${50 + Math.cos(angle) * 50}%`, top: `${50 + Math.sin(angle) * 50}%` }}
                    >
                      <IconComponent size={24} weight="duotone" className="text-accent-text" />
                      <span className="text-[0.625rem] font-semibold uppercase tracking-wider text-slate">
                        {channel.name.split(' ')[0]}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Your team */}
              <div className="absolute inset-[34%] flex flex-col items-center justify-center rounded-full border border-warm/40 bg-[radial-gradient(circle,var(--warm-soft),var(--raised))] text-center">
                <UsersThree size={36} weight="duotone" className="text-warm" />
                <span className="mt-2 font-display text-[1.125rem] font-bold tracking-[-0.03em] text-ink">Your team</span>
                <span className="text-[0.75rem] text-slate">one screen, full history</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
