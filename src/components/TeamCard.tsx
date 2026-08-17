import { useRef } from "react"

import Tilt from "react-parallax-tilt"

import { useMediaQuery } from "../hooks/useMediaQuery"

export interface TeamMember {
  name: string

  city: string

  role: string

  phone?: string

  quip: string

  division: "technical" | "non-technical"

  photo: string
}

interface TeamCardProps {
  member: TeamMember
}

// A soft arc of light that chases the cursor around the photo's ring,

// instead of spinning on its own — the same cursor input that drives the

// tilt also drives this, so it's one combined cursor-motion animation.

const GLOW_GRADIENT =
  "conic-gradient(from var(--glow-angle, 0deg), var(--color-signature) 0deg, var(--color-accent) 20deg, transparent 60deg, transparent 300deg, var(--color-accent) 340deg, var(--color-signature) 360deg)"

export default function TeamCard({ member }: TeamCardProps) {
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)")

  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const interactionEnabled = canHover && !prefersReducedMotion

  const glowRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactionEnabled || !glowRef.current) return

    const rect = event.currentTarget.getBoundingClientRect()

    const centerX = rect.left + rect.width / 2

    const centerY = rect.top + rect.height / 2

    const angle =
      Math.atan2(event.clientY - centerY, event.clientX - centerX) *
      (180 / Math.PI)

    glowRef.current.style.setProperty("--glow-angle", `${angle + 90}deg`)
  }

  const photo = (
    <img
      src={member.photo}
      alt={member.name}
      className="h-full w-full rounded-full object-cover"
      style={{ transform: "scale(1) translateX(2%)" }}
    />
  )

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-4 text-center">
      <div
        className="group relative h-32 w-32 lg:h-40 lg:w-40"
        onPointerMove={handlePointerMove}
      >
        {interactionEnabled && (
          <>
            <div
              ref={glowRef}
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1.5 rounded-full opacity-0 blur-[3px] transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: GLOW_GRADIENT }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-canvas"
            />
          </>
        )}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {interactionEnabled ? (
            <Tilt
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              scale={1.04}
              transitionSpeed={1200}
              glareEnable={false}
              className="h-full w-full rounded-full"
            >
              {photo}
            </Tilt>
          ) : (
            photo
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium text-ink">{member.name}</p>
        <p className="font-mono text-xs tracking-[0.08em] text-ink-dim">
          {member.city}
        </p>
        <p className="font-mono text-xs tracking-[0.08em] text-accent">
          {member.role}
        </p>
        {member.phone && (
          <p className="font-mono text-xs tracking-[0.08em] text-ink-dim">
            {member.phone}
          </p>
        )}
        <p className="max-w-xs text-sm text-ink-dim">{member.quip}</p>
      </div>
    </div>
  )
}
