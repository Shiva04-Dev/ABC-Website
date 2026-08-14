import { useEffect, useRef, useState } from "react"

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          observer.disconnect()
        }
      },

      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}
