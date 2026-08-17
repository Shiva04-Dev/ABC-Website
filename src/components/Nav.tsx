import { useEffect, useRef, useState } from "react"

import { NavLink } from "react-router-dom"

import { ArrowRightIcon, MenuIcon, XIcon } from "./icons"

const NAV_ITEMS = [
  { label: "Home", to: "/", built: true },

  { label: "About", to: "/about", built: true },

  { label: "Services", to: "/services", built: true },

  { label: "Team", to: "/team", built: true }
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
      <NavLink to="/" className="text-xl font-semibold tracking-tight text-ink">
        AfriBiz Connect
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

      <div className="hidden items-center gap-4 lg:flex">
        <a
          href="#"
          className="rounded-lg border border-white/20 px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Log in
        </a>
        <a
          href="#"
          className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2 text-sm font-medium text-canvas transition-colors hover:bg-signature focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Get started <ArrowRightIcon aria-hidden="true" />
        </a>
      </div>

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
          <div className="mt-auto flex flex-col gap-4">
            <a
              href="#"
              className="rounded-lg border border-white/20 px-5 py-3 text-center text-sm font-medium text-ink"
            >
              Log in
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-center text-sm font-medium text-canvas"
            >
              Get started <ArrowRightIcon aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
