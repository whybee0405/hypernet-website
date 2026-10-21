'use client'

import Link from '@/components/site/SiteLink'
import { usePathname } from 'next/navigation'
import { ArrowRight, List, X } from '@phosphor-icons/react/dist/ssr'

export function MobileActionBar({ menuOpen = false, onMenuToggle, onNavigate }: {
  menuOpen?: boolean
  onMenuToggle?: () => void
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const onContact = pathname === '/contact'
  const service = pathname.startsWith('/services/') ? pathname.split('/')[2] : undefined
  const href = onContact ? '#enquiry-form' : service ? `/contact?service=${service}#enquiry-form` : '/contact#enquiry-form'

  return (
    <nav aria-label="Mobile quick actions" className="mobile-action-bar night">
      {onMenuToggle ? <button type="button" aria-controls="mobile-nav" aria-expanded={menuOpen}
        onClick={onMenuToggle} className="mobile-menu-button">
        {menuOpen ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
        {menuOpen ? 'Close' : 'Menu'}
      </button> : null}
      <Link href={href} onClick={(event) => {
        onNavigate?.()
        if (onContact) {
          event.preventDefault()
          // Closing the menu releases its scroll lock in an effect. Wait for
          // that before scrolling, including when this hash is already active.
          const revealForm = () => {
            if (document.documentElement.style.overflow === 'hidden') {
              requestAnimationFrame(revealForm)
              return
            }
            document.getElementById('enquiry-form')?.scrollIntoView({ block: 'start' })
          }
          requestAnimationFrame(revealForm)
        }
      }} className="btn btn-primary flex-1">
        {onContact ? 'Send an enquiry' : 'Contact us'}
        <ArrowRight size={20} aria-hidden="true" />
      </Link>
    </nav>
  )
}
