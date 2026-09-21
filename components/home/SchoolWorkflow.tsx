import { HandoffDiagram } from "@/components/graphics/SportGraphics";
import { TextLink } from "@/components/ui/Button";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";

const endorselyDoes = [
  "Merchant-facing campaign planning and scoping",
  "Athlete group assembly and coordination",
  "Deliverable tracking and completion evidence",
  "Assembling the campaign information in one consistent packet",
];

const schoolKeeps = [
  "Its own disclosure and review workflow",
  "Any decision about eligibility or approval",
  "Its recordkeeping system of record",
  "Whatever software it already licenses",
];

/**
 * Editorial two-column with a hand-built diagram. The division of responsibility
 * is the point of the section: Endorsely prepares, the school decides.
 */
export function SchoolWorkflow() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow tone="muted">School workflow</Eyebrow>
          <DisplayHeading size="lg" className="mt-5">
            Better-organized deals. The school&apos;s existing process.
          </DisplayHeading>
          <Lede className="mt-6 text-ink-2">
            Endorsely is not a compliance system and does not try to become a
            school&apos;s system of record. It does the campaign-side work, then hands
            over information that is already complete and consistent.
          </Lede>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-ink/20 bg-paper-tint p-4 sm:p-6">
            <HandoffDiagram className="block h-auto w-full" />
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mono-label border-b-2 border-lime pb-2 text-ink-2">
                Endorsely does
              </h3>
              <ul className="mt-1">
                {endorselyDoes.map((item) => (
                  <li
                    key={item}
                    className="border-b border-rule py-2.5 text-[0.9375rem] leading-snug text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mono-label border-b-2 border-ink/40 pb-2 text-ink-2">
                The school keeps
              </h3>
              <ul className="mt-1">
                {schoolKeeps.map((item) => (
                  <li
                    key={item}
                    className="border-b border-rule py-2.5 text-[0.9375rem] leading-snug text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <TextLink href="/schools">Explore the school workflow</TextLink>
            <p className="measure text-[0.8125rem] leading-snug text-neutral-600">
              Documentation support is not legal advice or a guarantee of
              institutional approval.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
