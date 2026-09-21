import { ClaimLabel } from "@/components/ui/Chip";
import { RosterNumber } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";

const stages = [
  {
    number: "01",
    title: "Define the goal",
    body: "Audience, location, objective, timeline, and budget. One sentence about what a good outcome looks like, written before anyone is contacted.",
    detail: ["Audience and area", "Objective", "Timeline", "Budget range"],
  },
  {
    number: "02",
    title: "Assemble the campaign",
    body: "The athlete group, the activities, and the deliverables — sports and contribution types chosen against the objective rather than against follower counts.",
    detail: ["Athlete group", "Activities", "Deliverables", "Schedule"],
  },
  {
    number: "03",
    title: "Prepare the review packet",
    body: "Terms, commercial purpose, supporting information, and the materials a school's own process asks for, assembled while the campaign is being built.",
    detail: [
      "Commercial purpose",
      "Parties and compensation",
      "Usage rights",
      "Handoff materials",
    ],
    note: "Institutions review campaigns through their own workflow where that applies. MatchPoint prepares information; it does not approve anything and cannot guarantee an outcome.",
  },
  {
    number: "04",
    title: "Coordinate delivery",
    body: "Scheduling, reminders, the campaign work itself, and collecting evidence that each deliverable actually happened.",
    detail: ["Scheduling", "Content briefs", "Appearance logistics", "Completion evidence"],
    note: "Payment coordination is a proposed supporting step. MatchPoint does not hold or process funds.",
  },
  {
    number: "05",
    title: "Review the results",
    body: "Recorded customer actions against the plan, plus a plain read on what to change: the offer, the mix of athletes, the format, or the timing.",
    detail: ["Recorded actions", "By-athlete read", "What to change"],
  },
];

/**
 * Numbered vertical ladder. Each rung is a full-width row with the stage number
 * set large in mono, so the section reads as a sequence rather than a grid.
 */
export function HowItWorks() {
  return (
    <Section tone="tint" id="how-it-works" className="border-y border-ink/15 py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow tone="muted">How it works</Eyebrow>
          <DisplayHeading size="lg" className="mt-5">
            Five stages, start to report.
          </DisplayHeading>
          <Lede className="mt-6 text-ink-2">
            The same sequence every time, so a business owner always knows what is
            being decided, what is being prepared, and who is waiting on whom.
          </Lede>
          <ClaimLabel kind="planned" className="mt-6" />
          <p className="measure mt-3 text-[0.8125rem] leading-snug text-neutral-600">
            This is the process MatchPoint is being built to run. It is described as
            intended, not as a record of campaigns already delivered.
          </p>
        </div>

        <ol className="lg:col-span-7">
          {stages.map((stage) => (
            <li
              key={stage.number}
              className="grid gap-4 border-t border-ink/25 py-7 sm:grid-cols-[5.5rem_1fr] sm:gap-6"
            >
              <div>
                <RosterNumber value={stage.number} size="lg" className="text-ink" />
                <span className="mt-2 block h-[2px] w-10 bg-lime" aria-hidden />
              </div>
              <div>
                <h3 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                  {stage.title}
                </h3>
                <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                  {stage.body}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                  {stage.detail.map((item) => (
                    <li key={item} className="mono-label text-neutral-600">
                      {item}
                    </li>
                  ))}
                </ul>
                {stage.note ? (
                  <p className="measure mt-4 border-l-2 border-ink/25 pl-3 text-[0.8125rem] leading-snug text-neutral-600">
                    {stage.note}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
