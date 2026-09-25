import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'

/**
 * PLACEHOLDER number. Used until a WhatsApp link is entered in Site settings
 * (Settings > WhatsApp), which then takes over automatically.
 */
export const WHATSAPP_PLACEHOLDER = 'https://wa.me/27110000000'

/**
 * Floating WhatsApp shortcut, bottom right on every page. WhatsApp green, darkened
 * so the white label passes AA contrast; the label slides out on hover with a mouse and is
 * always available to screen readers.
 */
export function WhatsAppButton({ href }: { href?: string | null }) {
  return (
    <a
      href={href || WHATSAPP_PLACEHOLDER}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Hypernet on WhatsApp"
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 items-center gap-0 rounded-full bg-[#0e7a3f] pl-4 pr-4 text-white shadow-[0_12px_30px_-10px_rgb(0_0_0/0.5)] transition-[transform,background-color] duration-150 ease-out hover:bg-[#0c6b37] active:scale-[0.96] sm:right-6 sm:bottom-6 motion-safe:animate-[wa-in_400ms_cubic-bezier(0.23,1,0.32,1)_800ms_both]"
    >
      <WhatsappLogo size={26} weight="fill" aria-hidden="true" />
      <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:grid-cols-[1fr]">
        <span className="overflow-hidden whitespace-nowrap pl-0 text-[0.9375rem] font-semibold transition-[padding] duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:pl-2.5">
          WhatsApp us
        </span>
      </span>
    </a>
  )
}
