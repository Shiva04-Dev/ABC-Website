import { useEffect, useRef } from "react"

import gsap from "gsap"

import { ScrollTrigger } from "gsap/ScrollTrigger"

import TierCardContent from "./TierCardContent"

import type { Tier, TierCountMode } from "./TierCardContent"

gsap.registerPlugin(ScrollTrigger)

interface TierFlythroughProps {
  tiers: Tier[]

  mode: TierCountMode
}

export default function TierFlythrough({ tiers, mode }: TierFlythroughProps) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current

    if (!wrap) return

    const ctx = gsap.context(
      () => {
        const stage = wrap.querySelector<HTMLElement>(".tier-stage")

        const track = wrap.querySelector<HTMLElement>(".tier-track")

        const slides = gsap.utils.toArray<HTMLElement>(".tier-slide")

        if (!stage || !track || slides.length < 2) return

        // Pixel widths, not percentages: scrub needs an exact travel distance.

        const stageWidth = stage.getBoundingClientRect().width

        slides.forEach((slide) => {
          slide.style.width = `${stageWidth}px`
        })

        track.style.width = `${stageWidth * slides.length}px`

        gsap.set(slides.slice(1), { scale: 0.82, opacity: 0.35 })

        // One pin, one timeline: cards sit side by side and the strip pans
        // left on scroll, so no invisible neighbor can overlap a card's button.

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,

            start: "top top",

            end: "bottom bottom",

            pin: stage,

            pinSpacing: false,

            scrub: true,

            invalidateOnRefresh: true,
          },
        })

        tl.to(
          track,

          {
            x: -(stageWidth * (slides.length - 1)),

            ease: "none",

            duration: slides.length - 1,
          },

          0,
        )

        slides.forEach((slide, index) => {
          if (index > 0) {
            tl.fromTo(
              slide,

              { scale: 0.82, opacity: 0.35 },

              { scale: 1, opacity: 1, ease: "none", duration: 1 },

              index - 1,
            )

            // Only this slide's newly-added features fly in; inherited ones stay put.

            const chips =
              slide.querySelectorAll<HTMLElement>("[data-new-feature]")

            gsap.set(chips, { y: 40, opacity: 0 })

            tl.to(
              chips,

              { y: 0, opacity: 1, stagger: 0.08, ease: "none", duration: 0.4 },

              index - 1 + 0.5,
            )
          }

          if (index < slides.length - 1) {
            tl.to(
              slide,

              { scale: 0.82, opacity: 0.35, ease: "none", duration: 1 },

              index,
            )
          }
        })
      },

      wrap,
    )

    return () => ctx.revert()
  }, [tiers.length])

  let cumulative: string[] = []

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ height: `${tiers.length * 100}dvh` }}
    >
      <div className="tier-stage relative h-[100dvh] w-full overflow-hidden">
        <div className="tier-track flex h-full">
          {tiers.map((tier) => {
            cumulative = [...cumulative, ...tier.addedFeatures]

            const cardFeatures = cumulative

            return (
              <div
                key={tier.name}
                className="tier-slide flex h-full shrink-0 items-center justify-center px-6 lg:px-10"
              >
                <TierCardContent
                  tier={tier}
                  cumulativeFeatures={cardFeatures}
                  addedCount={tier.addedFeatures.length}
                  totalCount={cardFeatures.length}
                  mode={mode}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
