import { CheckIcon } from "./icons"
import SplitFlapCounter from "./SplitFlapCounter"

export interface Tier {
  name: string
  tagline: string
  addedFeatures: string[]
}

export type TierCountMode = "added" | "total"

interface TierCardContentProps {
  tier: Tier
  cumulativeFeatures: string[]
  addedCount: number
  totalCount: number
  mode: TierCountMode
}

function formatCount(mode: TierCountMode, added: number, total: number) {
  return mode === "added" ? `+${added}` : String(total).padStart(2, " ")
}

export default function TierCardContent({
  tier,
  cumulativeFeatures,
  addedCount,
  totalCount,
  mode,
}: TierCardContentProps) {
  const newFeatures = new Set(tier.addedFeatures)

  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-surface px-8 py-10 lg:px-12 lg:py-12">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
            {tier.name}
          </p>
          <p className="mt-2 text-sm text-ink-dim">{tier.tagline}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <SplitFlapCounter
            text={formatCount(mode, addedCount, totalCount)}
            className="text-2xl text-accent"
          />
          <span className="sr-only">
            {mode === "added"
              ? `${addedCount} features added at this tier`
              : `${totalCount} features included in total`}
          </span>
          <span
            aria-hidden="true"
            className="font-mono text-[10px] tracking-[0.15em] text-ink-dim"
          >
            {mode === "added" ? "ADDED" : "TOTAL"}
          </span>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {cumulativeFeatures.map((feature) => {
          const isNew = newFeatures.has(feature)
          return (
            <li
              key={feature}
              data-new-feature={isNew ? "" : undefined}
              className="flex items-start gap-3 text-sm"
            >
              <CheckIcon
                aria-hidden="true"
                className={`mt-0.5 h-4 w-4 shrink-0 ${
                  isNew ? "text-accent" : "text-ink-dim/50"
                }`}
              />
              <span className={isNew ? "text-ink" : "text-ink-dim"}>
                {feature}
              </span>
              {isNew && (
                <span
                  aria-hidden="true"
                  className="ml-auto shrink-0 font-mono text-[10px] tracking-[0.1em] text-accent"
                >
                  NEW
                </span>
              )}
            </li>
          )
        })}
      </ul>

      <a
        href="#contact-quote"
        className="glow-btn mt-8 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Get a quote for {tier.name}
      </a>
    </div>
  )
}
