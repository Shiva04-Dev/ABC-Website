const FOOTER_NAV = ["Home", "About", "Services", "Team", "Projects"]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-canvas px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-page flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="text-xs text-ink-dim tracking-tight text-ink">
            &copy; {new Date().getFullYear()} AfriBiz Connect. All rights
            reserved.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-dim"
        >
          {FOOTER_NAV.map((label) => (
            <a
              key={label}
              href={label === "Home" ? "/" : label === "About" ? "/about" : "#"}
              className="transition-colors hover:text-ink"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-1 font-mono text-xs text-ink-dim">
          <span
            aria-hidden="true"
            className="mb-1 tracking-[0.15em] text-ink-dim/70"
          >
            CONTACT
          </span>
          {/* PLACEHOLDER: no real contact details exist yet — replace before launch */}
          <span>hello@example.com [PLACEHOLDER]</span>
          <span>+000 000 0000 [PLACEHOLDER]</span>
          <span>Location on request [PLACEHOLDER]</span>
        </div>
      </div>
    </footer>
  )
}
