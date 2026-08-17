import { lazy, Suspense, useEffect, useRef, useState } from "react"

import { useMagneticHover } from "../hooks/useMagneticHover"

import { useMediaQuery } from "../hooks/useMediaQuery"

import { useReveal } from "../hooks/useReveal"

// Lazy: pulls in the WebGL globe renderer, and this section is below the

// fold, so it shouldn't weigh down Home's initial load.

const Globe = lazy(() => import("../components/Globe"))

import {
  BotIcon,
  CloudUploadIcon,
  GlobeIcon,
  LaptopIcon,
  SettingsIcon,
  SmartphoneIcon,
  TrendingUpIcon,
  Volume2Icon,
  VolumeXIcon,
} from "../components/icons"

const HERO_VIDEO_SRC = "/website-bg.mp4"

const HERO_POSTER_SRC = "/poster.jpg"

const SERVICES = [
  { icon: BotIcon, label: "Implement AI\nSolutions" },

  { icon: SettingsIcon, label: "Automate\nMy Business" },

  { icon: LaptopIcon, label: "Build Custom\nSoftware" },

  { icon: SmartphoneIcon, label: "Create a\nMobile App" },

  { icon: CloudUploadIcon, label: "Alquiheri\nMobile Analytics" },

  { icon: GlobeIcon, label: "Transform My\nDigital Presence" },

  { icon: TrendingUpIcon, label: "Grow My\nBusiness" },
]

const PROCESS_STEPS = [
  {
    step: "01",

    title: "Discover",

    description:
      "We start by understanding the actual problem, not just the request as written.",
  },

  {
    step: "02",

    title: "Design",

    description:
      "Solutions are scoped around your existing systems, not a rebuild from scratch.",
  },

  {
    step: "03",

    title: "Build",

    description:
      "Implementation happens in the open, with regular check-ins along the way.",
  },

  {
    step: "04",

    title: "Support",

    description:
      "We stay on after launch — software that ships is software that gets maintained.",
  },
]

const APPROACH_POINTS = [
  {
    title: "We ship implementations.",

    description: "Not decks, not audits — working software your team can use.",
  },

  {
    title: "One team, start to finish.",

    description:
      "The people who scope the work are the same people who build it.",
  },

  {
    title: "Built for how you operate.",

    description:
      "Solutions designed around your existing systems, not a rebuild from scratch.",
  },
]

function ServiceButton({ service }: { service: typeof SERVICES[number] }) {
  const magneticRef = useMagneticHover<HTMLButtonElement>()

  return (
    <button
      ref={magneticRef}
      type="button"
      className="glow-btn group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:gap-4 lg:px-5 lg:py-4"
    >
      <div className="flex items-center gap-3 transition-transform duration-150 active:scale-[0.97] lg:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/20">
          <service.icon
            className="h-5 w-5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
        <span className="text-sm leading-tight font-medium tracking-wide whitespace-pre-line text-ink-dim transition-colors group-hover:text-ink">
          {service.label}
        </span>
      </div>
    </button>
  )
}

function Hero() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const showVideo = !prefersReducedMotion

  const videoRef = useRef<HTMLVideoElement>(null)

  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const video = videoRef.current

    if (!video || !showVideo) return

    // Try playing with sound on the first playthrough. Browsers commonly

    // block unmuted autoplay for first-time visitors — if that happens,

    // fall back to a muted play so the video still runs instead of

    // sitting frozen on the poster.

    video.muted = false

    setIsMuted(false)

    video.play().catch(() => {
      video.muted = true

      setIsMuted(true)

      video.play().catch(() => {})
    })
  }, [showVideo])

  const handleEnded = () => {
    const video = videoRef.current

    if (!video) return

    // After the first full playthrough, mute and keep looping silently.

    video.muted = true

    setIsMuted(true)

    video.play().catch(() => {})
  }

  const toggleMuted = () => {
    const video = videoRef.current

    if (!video) return

    video.muted = !video.muted

    setIsMuted(video.muted)
  }

  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-canvas">
      <div className="absolute inset-0">
        {showVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted // MUST HAVE THIS for autoPlay to work
            loop // Usually wanted for backgrounds
            playsInline
            preload="metadata"
            poster={HERO_POSTER_SRC}
            aria-hidden="true"
            className="h-full w-full object-cover opacity-70"
            onEnded={handleEnded}
            onError={(event) => {
              const video = event.currentTarget

              video.style.display = "none"
            }}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <img
            src={HERO_POSTER_SRC}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-70"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/60 via-transparent to-canvas/60" />

        {/* Signature: reticle overlay locked onto the hero video, decorative only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-24 right-6 bottom-6 left-6 lg:top-28 lg:right-10 lg:bottom-10 lg:left-10"
        >
          <span className="absolute top-0 left-0 h-8 w-8 border-t border-l border-signature/40" />
          <span className="absolute top-0 right-0 h-8 w-8 border-t border-r border-signature/40" />
          <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-signature/40" />
          <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-signature/40" />
          <span className="scan-line absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signature/70 to-transparent" />
          <span className="absolute top-3 right-3 font-mono text-[11px] tracking-[0.2em] text-signature/70">
            UNIT&nbsp;01
          </span>
          <span className="absolute bottom-3 left-3 font-mono text-[11px] tracking-[0.2em] text-signature/70">
            SIGNAL&nbsp;LOCKED
          </span>
        </div>

        {showVideo && (
          <button
            type="button"
            onClick={toggleMuted}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="absolute top-1/2 right-6 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-canvas/60 text-ink backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:right-10"
          >
            {isMuted ? (
              <VolumeXIcon aria-hidden="true" />
            ) : (
              <Volume2Icon aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {/* Visually hidden: keeps one real h1 for screen readers and route-change
          focus management (see RouteEffects) without a headline on screen. */}
      <h1 id="page-title" tabIndex={-1} className="sr-only">
        AfriBiz Connect
      </h1>

      <div className="relative z-10 mt-auto mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-4 pt-32 pb-10">
        <div className="flex w-fit items-center gap-3 rounded-md border border-white/10 bg-canvas/60 px-4 py-2 font-mono text-xs tracking-[0.15em] text-ink-dim backdrop-blur-sm">
          <span className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            STATUS&nbsp;—&nbsp;OPERATIONAL
          </span>
          <span className="text-ink-dim/50">·</span>
          <span className="text-ink">International Award-Winning Company</span>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
          {SERVICES.map((service) => (
            <ServiceButton key={service.label} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

function GlobeBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <div className="relative h-[420px] w-[420px] lg:h-[620px] lg:w-[620px]">
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
      </div>
    </div>
  )
}

function Process() {
  const { ref, isVisible } = useReveal<HTMLDivElement>()

  return (
    <section className="relative z-10 border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-page">
        <div className="mb-12 flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">
            PROCESS
          </span>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
            How we work
          </h2>
        </div>

        <div
          ref={ref}
          className={`reveal-stagger grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 ${
            isVisible ? "is-visible" : ""
          }`}
        >
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="flex flex-col gap-3 border-t border-accent-dim pt-4"
            >
              <span className="font-mono text-xs text-accent">{step.step}</span>
              <p className="font-medium text-ink">{step.title}</p>
              <p className="text-sm text-ink-dim">{step.description}</p>
              <span className="wipe-cover" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Approach() {
  const { ref, isVisible } = useReveal<HTMLDivElement>()

  return (
    <section className="relative z-10 border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-page">
        <div className="mb-12 flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">
            APPROACH
          </span>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
            Built in-house, not outsourced
          </h2>
        </div>

        <div
          ref={ref}
          className={`reveal-stagger grid grid-cols-1 gap-8 lg:grid-cols-3 ${
            isVisible ? "is-visible" : ""
          }`}
        >
          {APPROACH_POINTS.map((point) => (
            <div key={point.title} className="flex flex-col gap-2">
              <p className="text-lg font-medium text-ink">{point.title}</p>
              <p className="text-sm text-ink-dim">{point.description}</p>
              <span className="wipe-cover" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative">
        <GlobeBackground />
        <Process />
        <Approach />
      </div>
    </>
  )
}
