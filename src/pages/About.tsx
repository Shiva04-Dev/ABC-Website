import { lazy, Suspense } from "react"

import { useMediaQuery } from "../hooks/useMediaQuery"

import TeamCard from "../components/TeamCard"

import type { TeamMember } from "../components/TeamCard"

import type { Accolade } from "../components/AccoladesStack"

const RecognitionMap = lazy(() => import("../components/RecognitionMap"))

const AccoladesStack = lazy(() => import("../components/AccoladesStack"))

const SHIVA: TeamMember = {
  name: "SHIVA",

  city: "JOHANNESBURG",

  role: "Core Full Stack Developer & AI Engineer",

  quip: "Designed and built this project end to end: frontend, AI chat integration, and backend infrastructure.",

  division: "technical",

  photo: "/shiva.jpg",
}

const REACH_COUNTRIES = [
  "South Africa",

  "Nigeria",

  "United Kingdom",

  "Singapore",

  "United States",

  "Brazil",

  "Australia",
]

const HIGHLIGHTS: Accolade[] = [
  {
    award: "Full-stack build",

    location: "Frontend + backend",

    note: "React 19 + Vite frontend, FastAPI chat backend deployed on Azure App Service.",
  },

  {
    award: "AI-integrated customer chat",

    location: "AI + backend",

    note: "Session handling, rate limiting, and a CORS-scoped API in front of the LLM.",
  },

  {
    award: "Accessible, animation-driven UI",

    location: "Frontend",

    note: "WCAG-conscious contrast and full reduced-motion support throughout.",
  },

  {
    award: "Security-tested end to end",

    location: "Security",

    note: "Independently pentested for injection, auth, and rate-limit abuse.",
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
          A solo software & AI portfolio, built from South Africa.
        </h1>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex max-w-2xl flex-col gap-5 text-base leading-relaxed text-ink-dim lg:text-lg">
            <p>
              Shiva's Solutions is a personal portfolio showcasing full-stack
              builds, from AI-integrated chat products to brand-ready
              marketing sites.
            </p>
            <p>
              The work draws on Information Systems Architecture, Data
              Engineering, and AI, paired with an eye for interface and
              motion design: end-to-end builds, not just one layer of the
              stack.
            </p>
            <p className="text-ink">
              Not just writing code, but building the structural,
              intelligent, and visual framework behind a product.
            </p>
          </div>
          <div className="shrink-0 lg:pt-2" style={{ transform: "translate(150px, -80px)" }}>
            <TeamCard member={SHIVA} />
          </div>
        </div>
      </div>
    </section>
  )
}

function GlobalReachSection() {
  return (
    <section className="relative border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto flex max-w-page flex-col items-center gap-10 text-center">
        <div className="flex max-w-xl flex-col gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
            Built for a global audience
          </h2>
          <p className="text-sm text-ink-dim lg:text-base">
            Decorative: illustrative connection points, not real offices or
            clients.
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
          {REACH_COUNTRIES.map((country, index) => (
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

function HighlightsLedgerStatic() {
  return (
    <dl className="flex flex-col">
      {HIGHLIGHTS.map((item) => (
        <div
          key={item.award}
          className="grid grid-cols-1 gap-x-6 gap-y-2 border-t border-white/10 py-6 lg:grid-cols-[1fr_auto]"
        >
          <div className="flex flex-col gap-1">
            <dt className="text-base font-medium text-ink lg:text-lg">
              {item.award}
            </dt>
            {item.note && (
              <dd className="text-sm text-ink-dim">{item.note}</dd>
            )}
          </div>
          <dd className="flex flex-col gap-1 font-mono text-xs tracking-[0.08em] text-ink-dim lg:items-end lg:text-right">
            <span>{item.location}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

function HighlightsLedger() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  return (
    <section className="relative border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-page">
        <h2 className="mb-12 text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
          Project highlights
        </h2>

        {prefersReducedMotion ? (
          <HighlightsLedgerStatic />
        ) : (
          <Suspense fallback={<HighlightsLedgerStatic />}>
            <AccoladesStack accolades={HIGHLIGHTS} />
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
      <GlobalReachSection />
      <HighlightsLedger />
    </div>
  )
}
