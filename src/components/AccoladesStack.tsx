import { useEffect, useRef } from "react"

import gsap from "gsap"

import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export interface Accolade {
  award: string

  issuer?: string

  location: string

  note?: string
}

interface AccoladesStackProps {
  accolades: Accolade[]
}

export default function AccoladesStack({ accolades }: AccoladesStackProps) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current

    if (!wrap) return

    const ctx = gsap.context(
      () => {
        const cards = gsap.utils.toArray<HTMLElement>(".stack-card")

        cards.forEach((card, index) => {
          if (index === cards.length - 1) return

          // Pin each card until the last one arrives, so they stack instead of scrolling past.

          ScrollTrigger.create({
            trigger: card,

            start: "top top",

            endTrigger: cards[cards.length - 1],

            end: "top top",

            pin: true,

            pinSpacing: false,
          })

          // Shrinks and dims as the next card arrives, scrubbed to track scroll smoothly.

          gsap.to(card, {
            scale: 0.92,

            opacity: 0.35,

            ease: "none",

            scrollTrigger: {
              trigger: cards[index + 1],

              start: "top bottom",

              end: "top top",

              scrub: true,
            },
          })
        })
      },

      wrap,
    )

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="relative">
      {accolades.map((accolade, index) => (
        <div
          key={accolade.award}
          className="stack-card sticky top-0 flex min-h-[70dvh] w-full items-center justify-center px-6 lg:px-10"
        >
          <dl className="w-full max-w-page rounded-2xl border border-white/10 bg-surface px-8 py-10 lg:px-16 lg:py-16">
            <div className="mb-6 flex items-center justify-between font-mono text-xs tracking-[0.15em] text-ink-dim">
              <span>
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(accolades.length).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
            </div>
            <dt className="max-w-2xl text-2xl font-semibold tracking-tight text-ink lg:text-4xl">
              {accolade.award}
            </dt>
            {accolade.note && (
              <dd className="mt-3 text-sm text-ink-dim lg:text-base">
                {accolade.note}
              </dd>
            )}
            <dd className="mt-8 flex flex-col gap-1 border-t border-white/10 pt-6 font-mono text-xs tracking-[0.1em] text-ink-dim lg:flex-row lg:gap-6 lg:text-sm">
              {accolade.issuer && <span>{accolade.issuer}</span>}
              <span>{accolade.location}</span>
            </dd>
          </dl>
        </div>
      ))}
    </div>
  )
}
