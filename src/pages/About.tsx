import { lazy, Suspense } from "react"

import { useMediaQuery } from "../hooks/useMediaQuery"

import type { Accolade } from "../components/AccoladesStack"

const RecognitionMap = lazy(() => import("../components/RecognitionMap"))

const AccoladesStack = lazy(() => import("../components/AccoladesStack"))

const CONNECTED_COUNTRIES = [
  "South Africa",

  "Nigeria",

  "United Kingdom",

  "Singapore",

  "Ghana",
]

const ACCOLADES: Accolade[] = [
  {
    award: "Hands Up For Small Business Owner — Winner",

    issuer: "Nedbank",

    location: "South Africa",
  },

  {
    award: "Most Empowering Software & Marketing Agency, 2025",

    location: "International",
  },

  {
    award: "Techpreneur of the Year, 2025",

    location: "Africa",
  },

  {
    award: "Forty Under 40 — 1st Runner Up",

    location: "South Africa",

    note: "Telecom, Mobile & Software Development",
  },

  {
    award: "Best Software & Marketing Agency in Africa, 2025 — Winner",

    issuer: "World Business Outlook",

    location: "Singapore",
  },

  {
    award: "Ministry of Foreign Affairs Recognition",

    issuer: "Africa Intercontinental Network",

    location: "Abuja, Nigeria",
  },

  {
    award: "KZN Youth Business Awards — Technology",

    issuer: "Hollywood Bets Foundation",

    location: "KwaZulu-Natal, South Africa",
  },

  {
    award: "Digital Solutions of the Year",

    issuer: "Corporate Livewire",

    location: "United Kingdom",
  },

  {
    award: "Nexus 100: Africa's Most Influential Tech Minds",

    issuer: "Empire Magazine Africa",

    location: "Ghana",
  },
]

function Statement() {
  return (
    <section className="relative border-t border-white/10 px-6 pt-32 pb-20 lg:px-10 lg:pt-40 lg:pb-28">
      <div className="mx-auto flex max-w-page flex-col gap-8">
        <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">
          ABOUT
        </span>
        <h1
          id="page-title"
          tabIndex={-1}
          className="max-w-3xl text-3xl font-semibold tracking-tight text-ink lg:text-5xl"
        >
          A multi-award-winning agency, operating from South Africa.
        </h1>
        <div className="flex max-w-2xl flex-col gap-5 text-base leading-relaxed text-ink-dim lg:text-lg">
          <p>
            AfriBiz Connect is a distinguished international,
            multi-award-winning agency proudly operating from South Africa. We
            are a diverse collective of specialized experts in Digital Software
            and Marketing, structured to seamlessly introduce brands to their
            target audience.
          </p>
          <p>
            Our power is rooted in the strategic fusion of advanced
            technological knowledge, including Information Systems Architecture,
            Data Engineering, and AI, with deep local expertise. We guarantee
            that our clients are equipped with all the essential elements
            necessary for digital dominance, managing recognized brands that
            value our monthly growth analytics.
          </p>
          <p className="text-ink">
            We don't just revolutionize your business; we build the structural,
            intelligent, and visual framework for its future success.
          </p>
        </div>
      </div>
    </section>
  )
}

function RecognitionSection() {
  return (
    <section className="relative border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto flex max-w-page flex-col items-center gap-10 text-center">
        <div className="flex max-w-xl flex-col gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
            Recognition that reaches beyond South Africa
          </h2>
          <p className="text-sm text-ink-dim lg:text-base">
            The accolades on this page were awarded from five countries. Every
            connection below traces back to where we work from.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="h-[320px] w-[320px] lg:h-[420px] lg:w-[420px]" />
          }
        >
          <RecognitionMap />
        </Suspense>

        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-xs tracking-[0.1em] text-ink-dim">
          {CONNECTED_COUNTRIES.map((country, index) => (
            <li key={country} className="flex items-center gap-3">
              {index > 0 && <span aria-hidden="true">·</span>}
              {country}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function AccoladesLedgerStatic() {
  return (
    <dl className="flex flex-col">
      {ACCOLADES.map((accolade) => (
        <div
          key={accolade.award}
          className="grid grid-cols-1 gap-x-6 gap-y-2 border-t border-white/10 py-6 lg:grid-cols-[1fr_auto]"
        >
          <div className="flex flex-col gap-1">
            <dt className="text-base font-medium text-ink lg:text-lg">
              {accolade.award}
            </dt>
            {accolade.note && (
              <dd className="text-sm text-ink-dim">{accolade.note}</dd>
            )}
          </div>
          <dd className="flex flex-col gap-1 font-mono text-xs tracking-[0.08em] text-ink-dim lg:items-end lg:text-right">
            {accolade.issuer && <span>{accolade.issuer}</span>}
            <span>{accolade.location}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

function AccoladesLedger() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  return (
    <section className="relative border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-page">
        <h2 className="mb-12 text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
          Accolades &amp; awards
        </h2>

        {prefersReducedMotion ? (
          <AccoladesLedgerStatic />
        ) : (
          <Suspense fallback={<AccoladesLedgerStatic />}>
            <AccoladesStack accolades={ACCOLADES} />
          </Suspense>
        )}
      </div>
    </section>
  )
}

export default function About() {
  return (
    <div className="relative bg-gradient-to-b from-accent/10 via-canvas to-canvas">
      <Statement />
      <RecognitionSection />
      <AccoladesLedger />
    </div>
  )
}
