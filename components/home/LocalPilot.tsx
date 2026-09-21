import { CtaLink } from "@/components/ui/Button";
import { ClaimLabel } from "@/components/ui/Chip";
import { LaneRule, RosterNumber } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import { pilotMarketPhrase, siteConfig } from "@/lib/site.config";

const pilotShape = [
  {
    label: "A focused business category",
    body: "Fitness, wellness, and youth sports first — where an athlete's daily life and the product genuinely overlap.",
  },
  {
    label: "A manageable athlete group",
    body: "A small number of athletes across several sports, mostly Olympic and less commercially visible programmes.",
  },
  {
    label: "Clear campaign formats",
    body: "A handful of repeatable formats rather than bespoke work for every business.",
  },
  {
    label: "An understood institutional process",
    body: "Mapping how the local review process actually works before promising anything about it.",
  },
  {
    label: "Measurable pilot learning",
    body: "Recorded customer actions per campaign, so the next campaign is better designed than the last.",
  },
];

const validationPlan = [
  "Speak with ten nearby businesses about objectives and budgets",
  "Seek two sponsor letters of intent",
  "Prepare one common campaign agreement for review",
  "Interview a compliance coordinator or athletic advisor",
  "Map the existing school review process end to end",
];

const nextSteps = [
  {
    number: "01",
    audience: "Business",
    body: "Talk through an objective, a format, and what a first campaign would involve.",
    cta: "Discuss a pilot campaign",
    href: "/contact?type=business",
  },
  {
    number: "02",
    audience: "Athlete",
    body: "Tell us your sport, your local connections, and the kind of work you want.",
    cta: "Express interest",
    href: "/contact?type=athlete",
  },
  {
    number: "03",
    audience: "School or partner",
    body: "Walk through the proposed workflow and the sample evidence packet.",
    cta: "Explore a pilot partnership",
    href: "/contact?type=school",
  },
] as const;

/**
 * Three-column next-step block separated by vertical hairlines, plus the pilot
 * shape and the clearly-labelled validation plan. No counts, no dates, no
 * signed anything.
 */
export function LocalPilot() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow tone="muted">Local pilot</Eyebrow>
          <DisplayHeading size="lg" className="mt-5">
            {pilotMarketPhrase("headline")}. Build something repeatable.
          </DisplayHeading>
          <Lede className="mt-6 text-ink-2">{pilotMarketPhrase("sentence")}</Lede>
          <p className="mono-label mt-6 text-neutral-600">
            {pilotMarketPhrase("campusLabel")}
          </p>
          <LaneRule lanes={4} numbered className="mt-8 max-w-xs" />

          <div className="mt-10 border border-ink/20 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="display-tight text-[1.15rem]">Validation plan</h3>
              <ClaimLabel kind="planned" />
            </div>
            <p className="mt-2 text-[0.8125rem] leading-snug text-neutral-600">
              Activities we intend to complete before launch. None of these have
              happened yet, and an inquiry through this site is not a letter of
              intent.
            </p>
            <ul className="mt-4">
              {validationPlan.map((item) => (
                <li
                  key={item}
                  className="border-t border-rule py-2 text-[0.875rem] leading-snug text-ink-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {pilotShape.map((item) => (
              <li key={item.label} className="border-t border-ink/25 pt-3">
                <h3 className="display-tight text-[1.15rem]">{item.label}</h3>
                <p className="mt-1.5 text-[0.875rem] leading-snug text-ink-2">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <h3 className="display mt-14 border-b-2 border-ink pb-3 text-[clamp(1.35rem,2.4vw,1.85rem)]">
            Next step, by who you are
          </h3>
          <div className="grid sm:grid-cols-3">
            {nextSteps.map((step, index) => (
              <div
                key={step.number}
                className={`border-b border-rule-strong py-6 sm:border-b-0 sm:pr-6 ${
                  index > 0 ? "sm:border-l sm:border-rule sm:pl-6" : ""
                }`}
              >
                <RosterNumber value={step.number} size="md" className="text-neutral-400" />
                <h4 className="display-tight mt-3 text-[1.2rem]">{step.audience}</h4>
                <p className="mt-2 text-[0.875rem] leading-snug text-ink-2">
                  {step.body}
                </p>
                <CtaLink
                  href={step.href}
                  variant={index === 0 ? "primary" : "secondary"}
                  className="mt-4 w-full justify-between sm:justify-center"
                >
                  {step.cta}
                </CtaLink>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[0.8125rem] leading-snug text-neutral-600">
            Inquiries reach a placeholder address ({siteConfig.contactEmail}) while
            the site is pre-launch, and nothing you send is a commitment.
          </p>
        </div>
      </div>
    </Section>
  );
}
