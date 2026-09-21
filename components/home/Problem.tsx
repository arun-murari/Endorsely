import { RosterNumber } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";

const ownerDecisions = [
  {
    label: "Which athletes",
    body: "Names and follower counts tell you almost nothing about whether someone will bring customers three miles down the road.",
  },
  {
    label: "What to ask for",
    body: "Posts? A visit? A clinic? How many, over how long, and who decides what good looks like.",
  },
  {
    label: "Coordination",
    body: "Scheduling content and appearances around training, travel, and exams, one message thread at a time.",
  },
  {
    label: "A budget",
    body: "No reference points for what an arrangement like this should cost, or what the money is buying.",
  },
  {
    label: "The paperwork",
    body: "Terms, usage rights, and whatever the athlete's school needs to see, in whatever form it needs to see it.",
  },
  {
    label: "Measurement",
    body: "A week later: did anything actually happen, and how would you know.",
  },
];

const plannedApproach = [
  {
    label: "Start with the objective",
    body: "Trial visits, membership inquiries, consultation bookings, clinic registrations, or plain local awareness. One goal, written down.",
  },
  {
    label: "Build the group around it",
    body: "The athlete mix follows the objective — sports, contribution types, and local connections chosen for the job.",
  },
  {
    label: "Define the work",
    body: "Deliverables, dates, and a schedule that survives a competition weekend.",
  },
  {
    label: "Set up the counting first",
    body: "Offer codes, a campaign link, and a source question agreed before anything is published.",
  },
  {
    label: "Prepare the paperwork alongside",
    body: "The information a school needs is assembled as the campaign is built, not reconstructed afterwards.",
  },
];

/**
 * Two-column contrast. Deliberately not cards: the left column is the pile of
 * decisions that lands on an owner, the right is the alternative order of work.
 */
export function Problem() {
  return (
    <Section tone="tint" className="border-y border-ink/15 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow tone="muted">The practical problem</Eyebrow>
          <DisplayHeading size="lg" className="mt-5">
            A sponsorship should start with a plan—not a search.
          </DisplayHeading>
          <Lede className="mt-6 text-ink-2">
            Most ways into athlete marketing hand a business owner a list of people
            and leave every real decision on the counter. The decisions are the
            hard part.
          </Lede>
        </div>

        <div className="grid gap-10 lg:col-span-7 lg:grid-cols-2 lg:gap-8">
          <div>
            <h3 className="mono-label border-b border-ink/25 pb-2 text-ink-2">
              What lands on the owner
            </h3>
            <ul className="mt-1">
              {ownerDecisions.map((item, index) => (
                <li
                  key={item.label}
                  className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-rule py-3.5"
                >
                  <RosterNumber
                    value={String(index + 1).padStart(2, "0")}
                    size="sm"
                    className="mt-0.5 text-neutral-500"
                  />
                  <div>
                    <p className="display-tight text-[1.05rem]">{item.label}</p>
                    <p className="mt-1 text-[0.875rem] leading-snug text-ink-2">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-ink/20 lg:pl-8">
            <h3 className="mono-label border-b border-ink/25 pb-2 text-ink-2">
              The order we think works
            </h3>
            <ul className="mt-1">
              {plannedApproach.map((item, index) => (
                <li
                  key={item.label}
                  className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-rule py-3.5"
                >
                  <span
                    className="mt-1.5 h-2 w-2 bg-lime"
                    aria-hidden
                    style={{ marginLeft: `${index * 2}px` }}
                  />
                  <div>
                    <p className="display-tight text-[1.05rem]">{item.label}</p>
                    <p className="mt-1 text-[0.875rem] leading-snug text-ink-2">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
