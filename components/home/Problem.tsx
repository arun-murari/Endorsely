import { RosterNumber } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";

const ownerDecisions = [
  {
    label: "Which athletes",
    body: "A follower count does not tell you whether that audience is inside your service area, or whether any of it pays for anything.",
  },
  {
    label: "What to ask for",
    body: "Posts? A visit? A clinic? How many, over how long, and who decides what good looks like.",
  },
  {
    label: "Negotiating the deliverables",
    body: "Agreeing scope and payment with someone who has never sold this before, with no reference point on either side.",
  },
  {
    label: "Coordination",
    body: "Scheduling content and appearances around training, travel, and exams, one message thread at a time — while running the business.",
  },
  {
    label: "The paperwork",
    body: "Terms, usage rights, and whatever the athlete's school needs to see, in whatever form it needs to see it.",
  },
  {
    label: "Measurement",
    body: "A week later: did anything actually happen, and how would you know. Without that, there is no basis for renewing.",
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
            A local gym owner does not need another advertising platform to manage.
            They need customers, out of a marketing budget that has to stretch
            while the business runs every day.
          </Lede>
          <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
            College-athlete partnerships could reach the students and families
            nearby. But choosing athletes, negotiating deliverables, coordinating
            content and measuring results is enough work that a $1,000–$2,000
            campaign stops being worth pursuing. The decisions are the hard part,
            and they all land on the same desk.
          </p>

          <div className="mt-8 border-l-2 border-lime-deep pl-4">
            <p className="mono-label text-neutral-600">Our hypothesis</p>
            <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-ink">
              Businesses will pay for organized campaigns when results are
              measurable and the workload is low. We will test that through paid
              pilots and repeat purchases — not assume that NIL enthusiasm equals
              demand.
            </p>
          </div>
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
