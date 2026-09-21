import { CtaLink, TextLink } from "@/components/ui/Button";
import { ClaimLabel } from "@/components/ui/Chip";
import { RosterNumber } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import { featuredPackages } from "@/lib/data/packages";

/**
 * Campaign formats as full-width editorial rows — a spread from a catalogue
 * rather than three identical cards. Each row deep-links into the planner with
 * the format preselected.
 */
export function Packages() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow tone="muted">Campaign formats</Eyebrow>
          <DisplayHeading size="lg" className="mt-5">
            Three formats to start from
          </DisplayHeading>
        </div>
        <div className="flex flex-col items-start gap-3">
          <ClaimLabel kind="proposed" />
          <Lede className="max-w-md text-[0.9375rem] text-ink-2">
            Example starting formats, not fixed products or guaranteed inventory.
            Every one is customised around your objective, and none of them carries
            a published price.
          </Lede>
        </div>
      </div>

      <div className="mt-12 border-t-2 border-ink">
        {featuredPackages.map((pkg, index) => (
          <article
            key={pkg.slug}
            className="grid gap-6 border-b border-rule-strong py-9 lg:grid-cols-12 lg:gap-8"
          >
            <div className="lg:col-span-4">
              <div className="flex items-baseline gap-4">
                <RosterNumber
                  value={String(index + 1).padStart(2, "0")}
                  size="lg"
                  className="text-neutral-400"
                />
                <h3 className="display text-[clamp(1.75rem,3.2vw,2.5rem)]">
                  {pkg.name}
                </h3>
              </div>
              <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
                {pkg.summary}
              </p>
              <p className="mono-label mt-5 text-neutral-600">{pkg.duration}</p>
            </div>

            <dl className="grid gap-6 lg:col-span-6 sm:grid-cols-2">
              <div>
                <dt className="mono-label border-b border-rule pb-1.5 text-neutral-600">
                  Who it&apos;s for
                </dt>
                <dd className="mt-2 text-[0.875rem] leading-snug text-ink-2">
                  {pkg.forWho}
                </dd>
                <dt className="mono-label mt-5 border-b border-rule pb-1.5 text-neutral-600">
                  Objective it supports
                </dt>
                <dd className="mt-2 text-[0.875rem] leading-snug text-ink-2">
                  {pkg.objective}
                </dd>
              </div>
              <div>
                <dt className="mono-label border-b border-rule pb-1.5 text-neutral-600">
                  What happens
                </dt>
                <dd className="mt-2">
                  <ul className="space-y-1.5">
                    {pkg.activities.slice(0, 3).map((activity) => (
                      <li
                        key={activity}
                        className="flex gap-2 text-[0.875rem] leading-snug text-ink-2"
                      >
                        <span
                          className="mt-[0.45rem] h-1 w-1 shrink-0 bg-lime-deep"
                          aria-hidden
                        />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
                <dt className="mono-label mt-5 border-b border-rule pb-1.5 text-neutral-600">
                  What can be counted
                </dt>
                <dd className="mt-2 text-[0.875rem] leading-snug text-ink-2">
                  {pkg.trackable}
                </dd>
              </div>
            </dl>

            <div className="lg:col-span-2 lg:pl-4">
              <CtaLink
                href={`/campaigns?package=${pkg.slug}#planner`}
                variant="secondary"
                className="w-full lg:w-auto"
              >
                Customize this campaign
              </CtaLink>
              <p className="mt-3 text-[0.8125rem] leading-snug text-neutral-600">
                Opens the planner with this format loaded. You can change anything.
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.9375rem] text-ink-2">
        <span>Two more formats — Restaurant Week and Community Ambassador —</span>
        <TextLink href="/campaigns">see all five formats</TextLink>
      </div>
    </Section>
  );
}
