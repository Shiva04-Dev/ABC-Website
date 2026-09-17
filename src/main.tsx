import React from "react"

import ReactDOM from "react-dom/client"

import App from "./App"

import "./index.css"

// Gates the scroll-reveal CSS so content isn't stuck hidden if JS fails.
document.documentElement.classList.add("js")

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
