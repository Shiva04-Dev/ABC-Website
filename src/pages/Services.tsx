import { lazy, Suspense, useState } from "react"

import { useMediaQuery } from "../hooks/useMediaQuery"

import { useReveal } from "../hooks/useReveal"

import TierCardContent from "../components/TierCardContent"

import type { Tier, TierCountMode } from "../components/TierCardContent"

import { ArrowRightIcon } from "../components/icons"

const TierFlythrough = lazy(() => import("../components/TierFlythrough"))

const TIERS: Tier[] = [
  {
    name: "Core",

    tagline: "Tier 1 - Core Services to Enhance Your Current Model",

    addedFeatures: [
      "Grpahic Design & Social Media Management",

      "Brand Photography & Videography",

      "Google Packages (Google Affiliate)",

      "Business Registration",
    ],
  },

  {
    name: "Growth",

    tagline: "Tier 2 - Grow and Redesign Your Business",

    addedFeatures: [
      "Website Development",

      "Digital Audit & Strategy",

      "Search Engine Optimization (SEO)",
    ],
  },

  {
    name: "Entreprise",

    tagline: "Tier 3 - Not just a Business. Become a Brand.",

    addedFeatures: [
      "AI Solutions & Cybersecurity",

      "App Development & Cloud Engineering",

      "Brand Architecture & Style Guide",

      "CRM System Implementation",

      "PR, Events & 3D Mapping",
    ],
  },
]

function TierListStatic({
  tiers,

  mode,
}: {
  tiers: Tier[]

  mode: TierCountMode
}) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()

  let cumulative: string[] = []

  return (
    <div
      ref={ref}
      className={`reveal mx-auto grid max-w-page grid-cols-1 justify-items-center gap-8 px-6 pb-20 lg:grid-cols-3 lg:px-10 lg:pb-28 ${
        isVisible ? "is-visible" : ""
      }`}
    >
      {tiers.map((tier) => {
        cumulative = [...cumulative, ...tier.addedFeatures]

        const cardFeatures = cumulative

        return (
          <TierCardContent
            key={tier.name}
            tier={tier}
            cumulativeFeatures={cardFeatures}
            addedCount={tier.addedFeatures.length}
            totalCount={cardFeatures.length}
            mode={mode}
          />
        )
      })}
    </div>
  )
}

function TierToggle({
  mode,

  onChange,
}: {
  mode: TierCountMode

  onChange: (mode: TierCountMode) => void
}) {
  return (
    <div
      role="group"
      aria-label="Feature count display"
      className="flex w-fit items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1 font-mono text-xs tracking-[0.1em]"
    >
      {(["added", "total"] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={mode === option}
          onClick={() => onChange(option)}
          className={`rounded-md px-3 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            mode === option
              ? "bg-accent text-canvas"
              : "text-ink-dim hover:text-ink"
          }`}
        >
          {option === "added" ? "ADDED" : "TOTAL"}
        </button>
      ))}
    </div>
  )
}

function TierSection() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const [mode, setMode] = useState<TierCountMode>("added")

  return (
    <section className="relative border-t border-white/10">
      <div className="mx-auto max-w-page px-6 pt-20 lg:px-10 lg:pt-28">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">
              TIERS
            </span>
          </div>
          <TierToggle mode={mode} onChange={setMode} />
        </div>
      </div>

      {prefersReducedMotion ? (
        <TierListStatic tiers={TIERS} mode={mode} />
      ) : (
        <Suspense fallback={<TierListStatic tiers={TIERS} mode={mode} />}>
          <TierFlythrough tiers={TIERS} mode={mode} />
        </Suspense>
      )}
    </section>
  )
}

function ContactQuote() {
  return (
    <section
      id="contact-quote"
      className="relative border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto flex max-w-page flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-xl flex-col gap-4">
          <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">
            PRICING
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
            None of these tiers are one-size-fits-all pricing.
          </h2>
          <p className="text-sm text-ink-dim lg:text-base">
            Every engagement is scoped around your existing systems, so we quote
            it directly rather than force it into a fixed number. Tell us which
            tier fits and we'll get back to you with a real number.
          </p>
        </div>

        <a
          href="mailto:hello@shivasolutions.dev"
          className="flex shrink-0 items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-canvas transition-colors hover:bg-signature focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Contact us for a quote <ArrowRightIcon aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <div className="relative bg-gradient-to-b from-accent/10 via-canvas to-canvas">
      <section className="relative border-t border-white/10 px-6 pt-32 pb-20 lg:px-10 lg:pt-40 lg:pb-28">
        <div className="mx-auto flex max-w-page flex-col gap-8">
          <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">
            SERVICES
          </span>
          <h1
            id="page-title"
            tabIndex={-1}
            className="max-w-3xl text-3xl font-semibold tracking-tight text-ink lg:text-5xl"
          >
            Three tiers, each one building on the last.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-ink-dim lg:text-lg">
            A tiered service structure designed for growing SMEs: each tier
            builds on the last, so a business can scale up support as it
            grows rather than starting over.
          </p>
        </div>
      </section>
      <TierSection />
      <ContactQuote />
    </div>
  )
}
