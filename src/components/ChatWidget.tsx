import { useEffect, useRef, useState, type FormEvent } from "react"

import { ArrowRightIcon, BotIcon } from "./icons"

// Mirrors the backend's 30-minute session expiry so the UI doesn't linger.
const INACTIVITY_LIMIT_MS = 30 * 60 * 1000

// Mirrors the backend's 2000-char cap so a normal user can't trigger a 422.
const MAX_MESSAGE_LENGTH = 2000

const CHAT_API_URL = import.meta.env.VITE_CHATBOT_API_URL as string | undefined

const CONFIG_ERROR_MESSAGE =
  "Chat isn't configured yet — VITE_CHATBOT_API_URL is missing."
const NETWORK_ERROR_MESSAGE =
  "Couldn't reach the assistant — check that the backend is running and try again."
const VALIDATION_ERROR_MESSAGE =
  "That message couldn't be sent — please rephrase and try again."
const FALLBACK_ERROR_MESSAGE = "Something went wrong. Please try again shortly."

class ConfigError extends Error {}

type ChatRole = "user" | "assistant"

interface ChatMessage {
  id: string
  role: ChatRole
  text: string
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const listEndRef = useRef<HTMLDivElement>(null)

  // One id per visit, kept in memory only — never persisted to localStorage.
  const sessionIdRef = useRef<string | null>(null)
  if (sessionIdRef.current === null) {
    sessionIdRef.current = crypto.randomUUID()
  }

  const scheduleInactivityClear = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current)

    inactivityTimer.current = setTimeout(() => {
      setMessages([])
    }, INACTIVITY_LIMIT_MS)
  }

  useEffect(() => {
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
    }
  }, [])

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ block: "nearest" })
  }, [messages, isSending])

  const addAssistantMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "assistant", text },
    ])
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const text = input.trim()
    if (!text || isSending) return

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text },
    ])
    setInput("")
    setIsSending(true)
    scheduleInactivityClear()

    try {
      if (!CHAT_API_URL) throw new ConfigError()

      const response = await fetch(`${CHAT_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionIdRef.current,
          message: text,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        addAssistantMessage(data.reply)
      } else if (response.status === 422) {
        addAssistantMessage(VALIDATION_ERROR_MESSAGE)
      } else {
        const data = await response.json().catch(() => null)
        addAssistantMessage(
          typeof data?.detail === "string"
            ? data.detail
            : FALLBACK_ERROR_MESSAGE,
        )
      }
    } catch (error) {
      addAssistantMessage(
        error instanceof ConfigError ? CONFIG_ERROR_MESSAGE : NETWORK_ERROR_MESSAGE,
      )
    } finally {
      setIsSending(false)
      scheduleInactivityClear()
    }
  }

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <BotIcon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-ink">
            Ask Shiva's Solutions
          </span>
          <span className="text-xs text-ink-dim">
            Ask about our services and what we can build for you
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
        {isSending && (
          <div className="flex justify-start" aria-hidden="true">
            <p className="max-w-[80%] rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-ink-dim">
              …
            </p>
          </div>
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
          maxLength={MAX_MESSAGE_LENGTH}
          disabled={isSending}
          className="h-11 flex-1 rounded-lg border border-white/10 bg-canvas/60 px-3.5 text-sm text-ink placeholder:text-ink-dim/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!input.trim() || isSending}
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-canvas transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowRightIcon aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}
