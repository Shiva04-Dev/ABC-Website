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

// Illustrative connection points only, not real office or client locations.
const MARKERS: MarkerPoint[] = [
  { location: [9.082, 8.6753], size: 0.09 }, // Nigeria
  { location: [-1.2921, 36.8219], size: 0.07 }, // Nairobi
  { location: [-26.2041, 28.0473], size: 0.07 }, // Johannesburg
  { location: [51.5072, -0.1276], size: 0.06 }, // London
  { location: [40.7128, -74.006], size: 0.06 }, // New York
  { location: [25.2048, 55.2708], size: 0.06 }, // Dubai
]

const ARCS: ArcLine[] = [
  { from: MARKERS[0].location, to: MARKERS[3].location },
  { from: MARKERS[1].location, to: MARKERS[4].location },
  { from: MARKERS[2].location, to: MARKERS[5].location },
  { from: MARKERS[0].location, to: MARKERS[5].location },
]

// ~20s per full rotation at 60fps.
const ROTATION_SPEED = 0.0052

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    let phi = 0
    let width = canvas.offsetWidth
    let rafId = 0

    const handleResize = () => {
      if (canvas) width = canvas.offsetWidth
    }
    window.addEventListener("resize", handleResize)

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.1,
      mapSamples: 16000,
      mapBrightness: 4,
      baseColor: [0.32, 0.36, 0.34],
      markerColor: [0.204, 0.827, 0.6],
      glowColor: [0.12, 0.22, 0.19],
      arcColor: [0.369, 0.918, 0.831],
      arcWidth: 1.2,
      arcHeight: 0.3,
      markers: MARKERS,
      arcs: ARCS,
      opacity: 0.7,
    })

    const frame = () => {
      if (!prefersReducedMotion) {
        phi += ROTATION_SPEED
      }
      globe.update({ phi, width: width * 2, height: width * 2 })
      rafId = requestAnimationFrame(frame)
    }
    rafId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId)
      globe.destroy()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-full w-full opacity-50"
      style={{ contain: "layout paint size" }}
    />
  )
}
