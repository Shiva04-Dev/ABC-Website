import { Link } from "react-router-dom"

const FOOTER_NAV = [
  { label: "Home", to: "/" },

  { label: "About", to: "/about" },

  { label: "Services", to: "/services" },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-canvas px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-page flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="text-xs text-ink-dim tracking-tight text-ink">
            &copy; {new Date().getFullYear()} Shiva's Solutions. All rights
            reserved.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-dim"
        >
          {FOOTER_NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-1 font-mono text-xs text-ink-dim">
          <span
            aria-hidden="true"
            className="mb-1 tracking-[0.15em] text-ink-dim/70"
          >
            CONTACT
          </span>
          <span>hello@shivasolutions.dev</span>
          <span>South Africa</span>
        </div>
      </div>
    </footer>
  )
}
