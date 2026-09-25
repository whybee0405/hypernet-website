'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'
import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme'

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'

/**
 * A small switch with the sun and moon as the track ends. The thumb slides
 * with a short ease-out; the colour change itself is instant because the
 * whole page re-themes and a transition would just smear it.
 */
export function ThemeToggle({ className }: { className?: string }) {
  // Rendered as dark on the server; corrected on mount from the attribute the
  // inline script already set, so markup matches during hydration.
  const [theme, setTheme] = useState<Theme>('dark')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setTheme(readTheme())
    setReady(true)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
    setTheme(next)
  }

  const light = theme === 'light'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label="Light mode"
      title={light ? 'Switch to dark mode' : 'Switch to light mode'}
      onClick={toggle}
      className={cn(
        'relative inline-flex h-11 w-[4.5rem] shrink-0 items-center rounded-full border border-hairline-strong bg-ink/[0.05] px-1 transition-colors duration-150 hover:border-accent',
        !ready && 'invisible',
        className,
      )}
    >
      <Moon size={15} weight="fill" aria-hidden="true" className="absolute left-3 text-slate" />
      <Sun size={16} weight="fill" aria-hidden="true" className="absolute right-3 text-slate" />
      <span
        aria-hidden="true"
        className={cn(
          'relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
          light ? 'translate-x-[1.75rem]' : 'translate-x-0',
        )}
      >
        {light ? <Sun size={16} weight="fill" /> : <Moon size={15} weight="fill" />}
      </span>
    </button>
  )
}
