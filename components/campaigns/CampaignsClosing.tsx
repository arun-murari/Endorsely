import { CtaLink, TextLink } from "@/components/ui/Button";
import { LaneRule } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";

/** Single dark band on the page: a compact closing row, not a hero. */
export function CampaignsClosing() {
  return (
    <Section tone="ink" className="py-12 sm:py-16">
      <LaneRule lanes={3} invert numbered />
      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow tone="invert">Next step</Eyebrow>
          <DisplayHeading size="md" className="mt-4 text-paper">
            Discuss a pilot campaign
          </DisplayHeading>
          <Lede className="mt-4 text-neutral-300">
            Tell us the objective, the area, and the budget you had in mind. We
            come back with a written proposal — scope, athlete group, and
            compensation — before anything is agreed or anyone is approached.
          </Lede>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-6">
          <CtaLink href="/contact?type=business" variant="onInk" withArrow>
            Discuss a pilot
          </CtaLink>
          <TextLink href="/demo" invert>
            See the product demo
          </TextLink>
        </div>
      </div>
    </Section>
  );
}
