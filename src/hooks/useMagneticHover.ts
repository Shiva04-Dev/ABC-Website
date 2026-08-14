import { useEffect, useRef } from "react"

const STIFFNESS = 0.18

const DAMPING = 0.72

const PULL = 0.3

const MAX_OFFSET = 14

export function useMagneticHover<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current

    if (!node) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    let raf = 0

    let targetX = 0

    let targetY = 0

    let x = 0

    let y = 0

    let vx = 0

    let vy = 0

    const tick = () => {
      const ax = (targetX - x) * STIFFNESS

      const ay = (targetY - y) * STIFFNESS

      vx = (vx + ax) * DAMPING

      vy = (vy + ay) * DAMPING

      x += vx

      y += vy

      node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`

      const settled =
        Math.abs(vx) < 0.01 &&
        Math.abs(vy) < 0.01 &&
        Math.abs(targetX - x) < 0.01 &&
        Math.abs(targetY - y) < 0.01

      raf = settled ? 0 : requestAnimationFrame(tick)
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const handleMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()

      const relX = event.clientX - (rect.left + rect.width / 2)

      const relY = event.clientY - (rect.top + rect.height / 2)

      targetX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relX * PULL))

      targetY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relY * PULL))

      start()
    }

    const handleLeave = () => {
      targetX = 0

      targetY = 0

      start()
    }

    node.addEventListener("pointermove", handleMove)

    node.addEventListener("pointerleave", handleLeave)

    return () => {
      node.removeEventListener("pointermove", handleMove)

      node.removeEventListener("pointerleave", handleLeave)

      if (raf) cancelAnimationFrame(raf)

      node.style.transform = ""
    }
  }, [])

  return ref
}
