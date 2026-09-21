import { MotionMarks } from "@/components/graphics/SportGraphics";
import { ClaimLabel } from "@/components/ui/Chip";
import { Bracketed } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";

const support = [
  {
    label: "Campaign design",
    body: "Objective, format, offer, and what success would look like in numbers you can actually collect.",
  },
  {
    label: "Athlete selection and coordination",
    body: "Proposing the group, handling scheduling, and keeping the campaign moving around training and travel.",
  },
  {
    label: "Content briefs",
    body: "What each piece needs to say and show, so athletes are not guessing and you are not rewriting captions.",
  },
  {
    label: "Scheduling",
    body: "Publication cadence, appearance dates, and reminders that keep a four-week campaign from becoming a four-week silence.",
  },
  {
    label: "Documentation preparation",
    body: "Assembling the campaign information and completion evidence in one place for the school's own process.",
  },
  {
    label: "Performance reporting",
    body: "A plain report of recorded customer actions, by athlete, with the attribution rules stated.",
  },
];

/**
 * Editorial text + artifact. The support list is set as a two-column index with
 * bracketed framing rather than a grid of cards.
 */
export function ManagedSupport() {
  return (
    <Section tone="tint" className="border-y border-ink/15 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Eyebrow tone="muted">Managed support</Eyebrow>
          <DisplayHeading size="lg" className="mt-5">
            You run the business. We help run the campaign.
          </DisplayHeading>
          <Lede className="mt-6 text-ink-2">
            The intended service model: a business owner should spend an hour on a
            campaign, not a month. That means someone else does the coordination.
          </Lede>
          <div className="mt-6 flex flex-col items-start gap-3">
            <ClaimLabel kind="proposed" />
            <p className="measure text-[0.8125rem] leading-snug text-neutral-600">
              This is the service MatchPoint intends to provide. There is no
              staffed operations team behind it today, and none of it is automated
              yet.
            </p>
          </div>
          <MotionMarks className="mt-10 block h-auto w-full max-w-sm" />
        </div>

        <div className="lg:col-span-8">
          <Bracketed className="p-5 sm:p-8">
            <ol className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
              {support.map((item, index) => (
                <li
                  key={item.label}
                  className="border-t border-ink/20 py-4 first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.75rem] tabular-nums text-neutral-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display-tight text-[1.2rem]">{item.label}</h3>
                  </div>
                  <p className="mt-1.5 text-[0.875rem] leading-snug text-ink-2">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </Bracketed>
        </div>
      </div>
    </Section>
  );
}
