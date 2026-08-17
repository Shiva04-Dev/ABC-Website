import { useEffect, useRef } from "react"

import gsap from "gsap"

import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useMediaQuery } from "../hooks/useMediaQuery"

gsap.registerPlugin(ScrollTrigger)

const COMPANIES = [
  { name: "Shell", logo: "/SHELL.png" },

  { name: "SPAR", logo: "/SPAR.png" },

  { name: "PostNet", logo: "/PostNet.png" },

  { name: "DMC", logo: "/DMC.png" },

  { name: "VISION", logo: "/VISION.png" },

  { name: "ENGEN", logo: "/ENGEN.png" },

  { name: "LOTUS", logo: "/LOTUS.png" },
]

interface LogoTileProps {
  name: string

  logo?: string
}

function LogoTile({ name, logo }: LogoTileProps) {
  return (
    <div className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink p-4">
      {logo ? (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          width={160}
          height={80}
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-sm font-medium text-canvas">{name}</span>
          <span className="font-mono text-[10px] tracking-[0.1em] text-canvas/50">
            [LOGO PLACEHOLDER]
          </span>
        </div>
      )}
    </div>
  )
}

export default function LogoMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const trackRef = useRef<HTMLDivElement>(null)

  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  useEffect(() => {
    if (prefersReducedMotion) return

    const section = sectionRef.current

    const track = trackRef.current

    if (!section || !track) return

    const ctx = gsap.context(() => {
      // The track holds two copies of the logo set back to back. With an

      // even number of tiles and a gap between every pair, the total

      // number of gaps is odd, so "50% of the track" lands half a gap

      // short of "one full set plus its connecting gap" — a visible

      // half-gap jump at the loop point. Measuring the real distance

      // between the first tile and its duplicate avoids that entirely.

      const tiles = Array.from(track.children) as HTMLElement[]

      const half = tiles.length / 2

      const loopDistance =
        tiles[half].getBoundingClientRect().left -
        tiles[0].getBoundingClientRect().left

      // It drifts continuously on its own — never fully stops — and

      // scrolling speeds it up (or reverses it, scrolling back up)

      // proportional to scroll velocity. One continuous, scroll-reactive

      // animation, not a separate autoplay bolted on top.

      const marquee = gsap.timeline({ repeat: -1 }).to(track, {
        x: -loopDistance,

        ease: "none",

        duration: 26,
      })

      ScrollTrigger.create({
        trigger: section,

        start: "top bottom",

        end: "bottom top",

        onUpdate: (self) => {
          const boost = gsap.utils.clamp(-4, 4, self.getVelocity() / 500)

          gsap.to(marquee, {
            timeScale: 1 + boost,

            duration: 0.4,

            overwrite: true,
          })
        },

        onLeave: () => gsap.to(marquee, { timeScale: 1, duration: 0.6 }),

        onLeaveBack: () => gsap.to(marquee, { timeScale: 1, duration: 0.6 }),
      })
    }, section)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-6">
        {COMPANIES.map((company) => (
          <LogoTile
            key={company.name}
            name={company.name}
            logo={company.logo}
          />
        ))}
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <div ref={trackRef} className="flex w-max items-center gap-6">
        {[...COMPANIES, ...COMPANIES].map((company, index) => (
          <LogoTile
            key={`${company.name}-${index}`}
            name={company.name}
            logo={company.logo}
          />
        ))}
      </div>
    </div>
  )
}
