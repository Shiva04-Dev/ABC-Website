import { useEffect, useRef, useState } from "react"

import { useMediaQuery } from "../hooks/useMediaQuery"

interface SplitFlapCounterProps {
  text: string

  className?: string
}

// Decorative digit display — the accessible value lives in sibling text in

// whatever renders this, so every character here is aria-hidden.

export default function SplitFlapCounter({
  text,

  className,
}: SplitFlapCounterProps) {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const prevTextRef = useRef(text)

  const [leaving, setLeaving] = useState<string | null>(null)

  useEffect(() => {
    if (prevTextRef.current === text) return

    if (!prefersReducedMotion) setLeaving(prevTextRef.current)

    prevTextRef.current = text
  }, [text, prefersReducedMotion])

  return (
    <span
      aria-hidden="true"
      className={`inline-flex font-mono tabular-nums ${className ?? ""}`}
      style={{ perspective: "200px" }}
    >
      {text.split("").map((char, index) => {
        const leavingChar = leaving?.[index]

        return (
          <span key={index} className="flap-cell">
            <span>{char === " " ? " " : char}</span>
            {leavingChar && leavingChar !== char && (
              <span
                className="flap-leaving"
                onAnimationEnd={() => setLeaving(null)}
              >
                {leavingChar === " " ? " " : leavingChar}
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}
