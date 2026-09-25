'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowRight, ArrowUpRight, CaretDown, List, Phone, X } from '@phosphor-icons/react/dist/ssr'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { PILLARS, SERVICES, serviceHref, servicesInPillar, type Service } from '@/content/services'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

const LINKS = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/case-studies', label: 'Case studies' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About' },
]

export function Nav({ phone, phoneHref }: { phone: string; phoneHref: string }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [preview, setPreview] = useState<Service>(SERVICES[0])
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const panelId = useId()
  const { scrollY } = useScroll()

  // Hide on the way down, return on the way up. The bar gets out of the way of
  // the content being read and is back the moment the reader reaches for it.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 24)
    if (menuOpen || mobileOpen) return
    setHidden(latest > 320 && latest > previous + 2)
    if (latest < previous - 2) setHidden(false)
  })

  useEffect(() => {
    setMenuOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!menuOpen && !mobileOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setMobileOpen(false)
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [menuOpen, mobileOpen])

  // Hover intent: a short grace period so crossing the gap between the
  // trigger and the panel does not close it.
  const openMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMenuOpen(true)
  }, [])
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMenuOpen(false), 160)
  }, [])

  const servicesActive = pathname.startsWith('/services')

  return (
    <motion.header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div
        className="relative mx-auto max-w-[1440px]"
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') scheduleClose()
        }}
      >
        <div
          className={cn(
            'night relative flex h-16 items-center justify-between gap-4 rounded-full border pl-5 pr-2 transition-[background-color,border-color,box-shadow] duration-500',
            scrolled || menuOpen
              ? 'nav-solid border-hairline-strong shadow-[0_20px_50px_-24px_rgb(0_0_0/0.45)] backdrop-blur-xl'
              : 'nav-idle',
          )}
        >
          <Link href="/" aria-label="Hypernet home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li>
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls={panelId}
                  onClick={() => setMenuOpen((value) => !value)}
                  onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse') openMenu()
                  }}
                  className={cn(
                    'inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-[0.9375rem] font-medium transition-colors',
                    menuOpen || servicesActive
                      ? 'bg-ink/[0.07] text-ink'
                      : 'text-ink/80 hover:text-ink',
                  )}
                >
                  Services
                  <CaretDown
                    size={13}
                    weight="bold"
                    aria-hidden="true"
                    className={cn('transition-transform duration-300', menuOpen && 'rotate-180')}
                  />
                </button>
              </li>
              {LINKS.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      onPointerEnter={() => setMenuOpen(false)}
                      className={cn(
                        'inline-flex h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors',
                        active ? 'bg-ink/[0.07] text-ink' : 'text-ink/80 hover:text-ink',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <a
              href={`tel:${phoneHref}`}
              className="hidden h-11 items-center gap-2 rounded-full px-3 text-[0.9375rem] font-medium text-ink/85 transition-colors hover:text-ink xl:inline-flex"
            >
              <Phone size={16} weight="bold" aria-hidden="true" />
              {phone}
            </a>
            <Link href="/contact" className="btn btn-primary hidden !py-3 !text-sm sm:inline-flex">
              Contact us
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-hairline-strong bg-ink/[0.04] text-ink transition-transform active:scale-95 lg:hidden"
            >
              {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------- Megamenu */}
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id={panelId}
              key="mega"
              initial={{ opacity: 0, y: -6, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: EASE } }}
              exit={{ opacity: 0, y: -4, scale: 0.99, transition: { duration: 0.14, ease: EASE } }}
              onPointerEnter={openMenu}
              className="night absolute inset-x-0 top-[calc(100%+10px)] hidden origin-top overflow-hidden rounded-[28px] border border-hairline-strong bg-[color-mix(in_srgb,var(--panel)_96%,transparent)] shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)] backdrop-blur-2xl lg:block"
            >
              <div className="grid grid-cols-12">
                <div className="col-span-9 grid grid-cols-4 gap-2 p-4">
                  {PILLARS.map((pillar, pillarIndex) => (
                    <motion.div
                      key={pillar.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.03 + pillarIndex * 0.03, ease: EASE }}
                      className="rounded-[20px] p-3"
                    >
                      <p className="t-meta text-warm-text">{pillar.name}</p>
                      <p className="mt-1.5 text-[0.8125rem] leading-snug text-slate">{pillar.line}</p>
                      <ul className="mt-4 grid gap-1">
                        {servicesInPillar(pillar.id).map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={serviceHref(service.slug)}
                              onPointerEnter={() => setPreview(service)}
                              onFocus={() => setPreview(service)}
                              className={cn(
                                'group flex items-start gap-3 rounded-2xl p-2 transition-colors',
                                preview.slug === service.slug
                                  ? 'bg-ink/[0.06]'
                                  : 'hover:bg-ink/[0.04]',
                              )}
                            >
                              <span className="relative mt-0.5 h-12 w-10 shrink-0 overflow-hidden rounded-xl bg-sunken">
                                <Image
                                  src={service.image.replace('.webp', '-thumb.webp')}
                                  alt=""
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              </span>
                              <span className="min-w-0">
                                <span className="flex items-center gap-1 text-[0.9375rem] font-semibold text-ink">
                                  {service.name}
                                  <ArrowUpRight
                                    size={12}
                                    weight="bold"
                                    aria-hidden="true"
                                    className="opacity-0 transition-opacity group-hover:opacity-70"
                                  />
                                </span>
                                <span className="mt-0.5 block text-[0.8125rem] leading-snug text-slate">
                                  {service.short}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                {/* Live preview of the hovered service. */}
                <div className="stay-dark relative col-span-3 m-3 ml-0 overflow-hidden rounded-[22px] border border-hairline">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={preview.slug}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={preview.image}
                        alt=""
                        fill
                        sizes="300px"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050915] via-[#050915]/30 to-transparent" />
                  <div className="relative flex h-full min-h-[340px] flex-col justify-end p-5">
                    <p className="t-meta text-slate">Now viewing</p>
                    <p className="mt-2 font-display text-2xl font-bold leading-tight tracking-[-0.03em] text-ink">
                      {preview.name}
                    </p>
                    <Link
                      href={serviceHref(preview.slug)}
                      className="link-arrow mt-3 text-[0.875rem]"
                    >
                      Explore
                      <ArrowRight size={14} weight="bold" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 border-t border-hairline px-7 py-4">
                <p className="text-[0.875rem] text-slate">
                  Help choosing a service:{' '}
                  <a href={`tel:${phoneHref}`} className="font-semibold text-ink hover:text-accent-text">
                    {phone}
                  </a>
                </p>
                <Link href="/services" className="link-arrow text-[0.875rem]">
                  All services
                  <ArrowRight size={14} weight="bold" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* ------------------------------------------------------- Mobile */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav"
            key="mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="night fixed inset-x-3 bottom-3 top-[84px] overflow-y-auto rounded-[28px] border border-hairline-strong bg-[color-mix(in_srgb,var(--panel)_98%,transparent)] p-5 backdrop-blur-2xl lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Primary mobile">
              {PILLARS.map((pillar) => (
                <div key={pillar.id} className="border-b border-hairline py-4 first:pt-1">
                  <p className="t-meta text-warm-text">{pillar.name}</p>
                  <ul className="mt-3 grid gap-1">
                    {servicesInPillar(pillar.id).map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={serviceHref(service.slug)}
                          className="flex items-center gap-3 rounded-2xl py-2"
                        >
                          <span className="relative h-11 w-9 shrink-0 overflow-hidden rounded-lg bg-sunken">
                            <Image
                              src={service.image.replace('.webp', '-thumb.webp')}
                              alt=""
                              fill
                              sizes="36px"
                              className="object-cover"
                            />
                          </span>
                          <span className="text-[1.0625rem] font-semibold text-ink">{service.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <ul className="grid grid-cols-2 gap-2 py-5">
                {[{ href: '/services', label: 'All services' }, ...LINKS].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex h-12 items-center rounded-2xl border border-hairline px-4 text-[0.9375rem] font-medium text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mb-5 flex items-center justify-between rounded-2xl border border-hairline px-4 py-2">
                <span className="text-[0.9375rem] font-medium text-ink">Light mode</span>
                <ThemeToggle />
              </div>
              <div className="grid gap-3">
                <Link href="/contact" className="btn btn-primary w-full">
                  Contact us
                </Link>
                <a href={`tel:${phoneHref}`} className="btn btn-secondary w-full">
                  <Phone size={17} weight="bold" aria-hidden="true" />
                  {phone}
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
