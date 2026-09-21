import { HalftoneBlock } from "@/components/graphics/SportGraphics";
import { CtaLink } from "@/components/ui/Button";
import { LaneRule } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Section } from "@/components/ui/Section";

export function FinalCta({
  eyebrow = "Next step",
  heading = "Start with a goal. Build the right campaign.",
  body = "The planner gives you an illustrative brief in about a minute: format, athlete group, deliverables, schedule, measurement plan, and a budget broken into line items. No account, no contact details, no obligation.",
  primary = { label: "Build my campaign", href: "/campaigns#planner" },
  secondary = { label: "Discuss a pilot", href: "/contact?type=business" },
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section className="py-16 sm:py-24">
      <div className="grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow tone="muted">{eyebrow}</Eyebrow>
          <DisplayHeading size="xl" className="mt-5">
            {heading}
          </DisplayHeading>
          <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-ink-2">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href={primary.href} variant="primary" withArrow>
              {primary.label}
            </CtaLink>
            <CtaLink href={secondary.href} variant="secondary">
              {secondary.label}
            </CtaLink>
          </div>
        </div>
        <div className="lg:col-span-4">
          <HalftoneBlock className="block h-auto w-full" />
          <LaneRule lanes={3} className="mt-6" />
        </div>
      </div>
    </Section>
  );
}
