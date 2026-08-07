import { lazy, Suspense } from "react"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import Nav from "./components/Nav"

import Footer from "./components/Footer"

import RouteEffects from "./components/RouteEffects"

const Home = lazy(() => import("./pages/Home"))

const About = lazy(() => import("./pages/About"))

export default function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <div className="flex min-h-screen w-full flex-col bg-canvas selection:bg-accent/30">
        <Nav />
        <main id="main-content" className="flex-1">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
