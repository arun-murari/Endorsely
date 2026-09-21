import { Bracketed } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";

/**
 * Static shell rendered while the planner's client bundle loads. Matches the
 * planner's own layout so the section does not jump when it swaps in.
 */
export function PlannerFallback() {
  return (
    <Section id="planner" className="scroll-mt-24 border-t-2 border-ink py-14 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow tone="muted">Campaign planner</Eyebrow>
          <DisplayHeading size="lg" className="mt-5">
            Build an illustrative brief
          </DisplayHeading>
          <Lede className="mt-5 text-ink-2">
            Answer six questions and the brief fills in as you go. No account, no
            contact details, and nothing is sent anywhere.
          </Lede>
        </div>
        <div className="lg:col-span-7">
          <Bracketed className="p-6">
            <p className="mono-label text-neutral-600">Loading the planner…</p>
            <div className="mt-6 space-y-3" aria-hidden>
              {[0, 1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="h-3 border-b border-rule" />
              ))}
            </div>
          </Bracketed>
        </div>
      </div>
    </Section>
  );
}
