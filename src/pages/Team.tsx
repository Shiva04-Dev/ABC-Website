import { lazy, Suspense } from "react"

import TeamCard from "../components/TeamCard"

import type { TeamMember } from "../components/TeamCard"

const LogoMarquee = lazy(() => import("../components/LogoMarquee"))

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "SHIVA",

    city: "JOHANNESBURG",

    phone: "(+27)12 345 6789",

    role: "AI Engineer & Systems Developer Intern",

    quip: "Our Systems Sorcerer! He builds AI so sharp, you'd swear it reads your mind before you've finished the sentence. When it comes to engineering, he's the one that turns 'server down' into 'systems go'!",

    division: "technical",

    photo: "/shiva.jpg",
  },

  {
    name: "THATO",

    city: "JOHANNESBURG",

    phone: "(+27)12 345 6789",

    role: "Data Engineer",

    quip: "Builds scalable data infrastructure using platforms like AWS & Apache Spark. She engineers the super-highways data travels on.",

    division: "technical",

    photo: "/thato.jpg",
  },

  {
    name: "TRISTAN",

    city: "JOHANNESBURG",

    phone: "(+27)12 345 6789",

    role: "Project Management Intern",

    quip: "Our Deadline Whisperer! He plans projects so tight, you'd think he has a crystal ball for delivery dates. When it comes to project management, he's the one that turns 'scope creep' into 'scope complete'!",

    division: "non-technical",

    photo: "/tristan.jpg",
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

function TrustSection() {
  return (
    <section className="relative border-t border-white/10 px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-page">
        <h2 className="mb-12 text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
          Companies who trust us
        </h2>
        <Suspense fallback={<div className="h-20" />}>
          <LogoMarquee />
        </Suspense>
      </div>
    </section>
  )
}

export default function Team() {
  const technical = TEAM_MEMBERS.filter(
    (member) => member.division === "technical",
  )

  const nonTechnical = TEAM_MEMBERS.filter(
    (member) => member.division === "non-technical",
  )

  return (
    <>
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
            The people who build and run AfriBiz Connect.
          </h1>
        </div>
      </section>
      <Division title="Technical Team" members={technical} />
      <Division title="Non-Technical Team" members={nonTechnical} />
      <TrustSection />
    </>
  )
}
