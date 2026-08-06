import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function RouteEffects() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    const heading = document.getElementById("page-title")
    heading?.focus()
  }, [location.pathname])

  return null
}
