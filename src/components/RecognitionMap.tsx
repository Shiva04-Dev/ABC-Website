import { useEffect, useRef } from "react"

import createGlobe from "cobe"

type LatLng = [number, number]

interface MarkerPoint {
  location: LatLng

  size: number
}

interface ArcLine {
  from: LatLng

  to: LatLng
}

const HOME: MarkerPoint = { location: [-26.2041, 28.0473], size: 0.12 } // Johannesburg, South Africa

// Countries an accolade in the ledger was awarded from, connected back to home.

const DESTINATIONS: MarkerPoint[] = [
  { location: [9.0765, 7.3986], size: 0.07 }, // Abuja, Nigeria

  { location: [51.5072, -0.1276], size: 0.07 }, // United Kingdom

  { location: [1.3521, 103.8198], size: 0.07 }, // Singapore

  { location: [5.6037, -0.187], size: 0.07 }, // Ghana
]

const ARCS: ArcLine[] = DESTINATIONS.map((point) => ({
  from: HOME.location,

  to: point.location,
}))

const ROTATION_SPEED = 0.0035

// Each arc appears this long after the previous one, once the section is in view.

const ARC_STAGGER_MS = 380

export default function RecognitionMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    const section = sectionRef.current

    if (!canvas || !section) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    let phi = 0

    let width = canvas.offsetWidth

    let rafId = 0

    let visibleArcs: ArcLine[] = prefersReducedMotion ? ARCS : []

    const handleResize = () => {
      if (canvas) width = canvas.offsetWidth
    }

    window.addEventListener("resize", handleResize)

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,

      width: width * 2,

      height: width * 2,

      phi: 0,

      theta: 0.28,

      dark: 1,

      diffuse: 1.1,

      mapSamples: 16000,

      mapBrightness: 4,

      baseColor: [0.32, 0.36, 0.34],

      markerColor: [0.204, 0.827, 0.6],

      glowColor: [0.12, 0.22, 0.19],

      arcColor: [0.369, 0.918, 0.831],

      arcWidth: 1.4,

      arcHeight: 0.32,

      markers: [HOME, ...DESTINATIONS],

      arcs: visibleArcs,

      opacity: 0.85,
    })

    const frame = () => {
      if (!prefersReducedMotion) phi += ROTATION_SPEED

      globe.update({
        phi,

        width: width * 2,

        height: width * 2,

        arcs: visibleArcs,
      })

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    // Reveal arcs one at a time once the map scrolls into view, rather than

    // all at once — the connections read as being traced, not dumped in.

    let staggerTimeouts: ReturnType<typeof setTimeout>[] = []

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || prefersReducedMotion) return

        ARCS.forEach((arc, index) => {
          const timeout = setTimeout(() => {
            visibleArcs = ARCS.slice(0, index + 1)
          }, index * ARC_STAGGER_MS)

          staggerTimeouts.push(timeout)
        })

        observer.disconnect()
      },

      { threshold: 0.4 },
    )

    observer.observe(section)

    return () => {
      cancelAnimationFrame(rafId)

      staggerTimeouts.forEach(clearTimeout)

      observer.disconnect()

      globe.destroy()

      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative mx-auto h-[320px] w-[320px] lg:h-[420px] lg:w-[420px]"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full"
        style={{ contain: "layout paint size" }}
      />
    </div>
  )
}
