import { useEffect, useRef, useState } from "react"

import { NavLink } from "react-router-dom"

import { MenuIcon, XIcon } from "./icons"

const NAV_ITEMS = [
  { label: "Home", to: "/", built: true },

  { label: "About", to: "/about", built: true },

  { label: "Services", to: "/services", built: true },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors hover:text-ink ${isActive ? "text-ink" : "text-ink-dim"}`

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const menuNode = menuRef.current

    if (!menuNode) return

    const focusable = menuNode.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    )

    const first = focusable[0]

    const last = focusable[focusable.length - 1]

    first?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)

        toggleRef.current?.focus()

        return
      }

      if (event.key !== "Tab") return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()

        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()

        first?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [menuOpen])

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 lg:px-10">
      <NavLink to="/" aria-label="Shiva's Solutions home" className="block">
        <img src="/favicon.svg" alt="" aria-hidden="true" className="h-9 w-9" />
      </NavLink>

      <nav
        aria-label="Primary"
        className="hidden items-center gap-8 text-sm font-medium lg:flex"
      >
        {NAV_ITEMS.map((item) =>
          item.built ? (
            <NavLink key={item.label} to={item.to} end className={navLinkClass}>
              {item.label}
            </NavLink>
          ) : (
            <a
              key={item.label}
              href={item.to}
              className="text-ink-dim transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ),
        )}
      </nav>

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((open) => !open)}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-ink lg:hidden"
      >
        {menuOpen ? (
          <XIcon aria-hidden="true" />
        ) : (
          <MenuIcon aria-hidden="true" />
        )}
      </button>

      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 flex flex-col gap-8 bg-canvas px-8 pt-24 pb-10 lg:hidden"
        >
          <nav
            aria-label="Primary"
            className="flex flex-col gap-6 text-2xl font-medium"
          >
            {NAV_ITEMS.map((item) =>
              item.built ? (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ) : (
                <a
                  key={item.label}
                  href={item.to}
                  className="text-ink-dim transition-colors hover:text-ink"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
