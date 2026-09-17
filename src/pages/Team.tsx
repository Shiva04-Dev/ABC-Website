import TeamCard from "../components/TeamCard"

import type { TeamMember } from "../components/TeamCard"

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "SHIVA",

    city: "JOHANNESBURG",

    role: "Core Full Stack Developer & AI Engineer",

    quip: "Designed and built this project end to end — frontend, AI chat integration, and backend infrastructure.",

    division: "technical",

    photo: "/shiva.jpg",
  },
]

function Division({
  title,

  members,
}: {
  title: string

  members: TeamMember[]
}) {
  return (
    <section className="relative border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-page">
        <h2 className="mb-12 text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
          {title}
        </h2>
        <div className="flex flex-wrap justify-center gap-12">
          {members.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Team() {
  return (
    <div className="relative bg-gradient-to-b from-accent/10 via-canvas to-canvas">
      <section className="relative border-t border-white/10 px-6 pt-32 pb-20 lg:px-10 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-page">
          <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">
            TEAM
          </span>
          <h1
            id="page-title"
            tabIndex={-1}
            className="mt-8 max-w-3xl text-3xl font-semibold tracking-tight text-ink lg:text-5xl"
          >
            The person who built this project.
          </h1>
        </div>
      </section>
      <Division title="Team" members={TEAM_MEMBERS} />
    </div>
  )
}
