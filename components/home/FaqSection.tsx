import { Accordion } from "@/components/ui/Accordion";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import { faq } from "@/lib/data/faq";

export function FaqSection({
  eyebrow = "Questions",
  heading = "The questions owners actually ask",
  lede = "Where a capability is planned rather than built, it says so.",
}: {
  eyebrow?: string;
  heading?: string;
  lede?: string;
}) {
  return (
    <Section tone="tint" id="faq" className="border-y border-ink/15 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Eyebrow tone="muted">{eyebrow}</Eyebrow>
          <DisplayHeading size="lg" className="mt-5">
            {heading}
          </DisplayHeading>
          <Lede className="mt-6 text-ink-2">{lede}</Lede>
        </div>
        <div className="lg:col-span-8">
          <Accordion
            items={faq.map((item) => ({
              id: item.id,
              question: item.question,
              answer: item.answer.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              )),
            }))}
          />
        </div>
      </div>
    </Section>
  );
}
