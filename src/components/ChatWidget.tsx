import { useEffect, useRef, useState, type FormEvent } from "react"

import { ArrowRightIcon, BotIcon } from "./icons"

// Sessions on the connected assistant expire after 30 minutes of
// inactivity — mirror that here so a stale conversation doesn't linger
// on screen past when the backend would have already dropped it.
const INACTIVITY_LIMIT_MS = 30 * 60 * 1000

const PLACEHOLDER_REPLY =
  "Thanks for the message — I'm not connected to the live assistant yet. Once integration is complete, I'll be able to answer questions about AfriBiz Connect and our services."

type ChatRole = "user" | "assistant"

interface ChatMessage {
  id: string
  role: ChatRole
  text: string
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const listEndRef = useRef<HTMLDivElement>(null)

  const scheduleInactivityClear = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current)

    inactivityTimer.current = setTimeout(() => {
      setMessages([])
    }, INACTIVITY_LIMIT_MS)
  }

  useEffect(() => {
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
      if (replyTimer.current) clearTimeout(replyTimer.current)
    }
  }, [])

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ block: "nearest" })
  }, [messages])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const text = input.trim()
    if (!text) return

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    scheduleInactivityClear()

    // Stand-in reply until the assistant is wired up to the live model.
    replyTimer.current = setTimeout(() => {
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: PLACEHOLDER_REPLY,
      }

      setMessages((prev) => [...prev, reply])
      scheduleInactivityClear()
    }, 600)
  }

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <BotIcon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-ink">
            Ask AfriBiz Connect
          </span>
          <span className="text-xs text-ink-dim">
            Questions about our services — answers coming soon
          </span>
        </div>
      </div>

      <div
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
        className="flex h-72 flex-col gap-3 overflow-y-auto px-4 py-4 lg:h-40"
      >
        {messages.length === 0 ? (
          <p className="m-auto max-w-xs text-center text-sm text-ink-dim">
            Ask a question about our services and we'll get back to you here.
          </p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <p
                className={`max-w-[80%] rounded-xl px-3.5 py-2 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "bg-accent text-canvas"
                    : "border border-white/10 bg-white/5 text-ink-dim"
                }`}
              >
                {message.text}
              </p>
            </div>
          ))
        )}
        <div ref={listEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-white/10 p-3"
      >
        <label htmlFor="chat-input" className="sr-only">
          Message
        </label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type your question…"
          autoComplete="off"
          className="h-11 flex-1 rounded-lg border border-white/10 bg-canvas/60 px-3.5 text-sm text-ink placeholder:text-ink-dim/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-canvas transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowRightIcon aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}
