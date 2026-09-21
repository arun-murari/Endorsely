import { Fragment } from "react";
import { CtaLink } from "@/components/ui/Button";
import { Chip, ClaimLabel } from "@/components/ui/Chip";
import { DataRow } from "@/components/ui/DataRow";
import { Bracketed, LaneRule, RosterNumber } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import { packages, type CampaignPackage } from "@/lib/data/packages";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Alternating asymmetric spreads: editorial column on one side, a bracketed
 * format sheet on the other, flipping every other row. Deliberately not the
 * homepage's catalogue rows.
 */
function FormatEntry({
  pkg,
  index,
}: {
  pkg: CampaignPackage;
  index: number;
}) {
  const flip = index % 2 === 1;

  return (
    <article
      id={`format-${pkg.slug}`}
      className="scroll-mt-28 border-b border-rule-strong py-10 sm:py-14"
    >
      <div className="grid gap-9 lg:grid-cols-12 lg:gap-12">
        <div className={`lg:col-span-7 ${flip ? "lg:col-start-6" : ""}`}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <RosterNumber
              value={pad(index + 1)}
              size="sm"
              className="text-neutral-500"
            />
            <span className="mono-label text-neutral-600">{pkg.duration}</span>
            {pkg.expansionCategory ? (
              <Chip tone="warn">Expansion category</Chip>
            ) : null}
          </div>

          <h3 className="display mt-3 text-[clamp(1.9rem,4vw,3rem)]">
            {pkg.name}
          </h3>
          <p className="measure mt-4 text-[1.0625rem] leading-relaxed text-ink-2">
            {pkg.summary}
          </p>

          <div className="mt-6 border-l-2 border-lime-deep pl-4">
            <p className="mono-label text-neutral-600">Objective</p>
            <p className="measure mt-1 text-[0.9375rem] leading-relaxed text-ink">
              {pkg.objective}
            </p>
          </div>

          <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-ink-2">
            <span className="mono-label mr-2 text-neutral-600">Who it fits</span>
            {pkg.forWho}
          </p>

          {pkg.expansionCategory ? (
            <p className="measure mt-4 border border-rule-strong bg-paper-tint p-3 text-[0.875rem] leading-snug text-ink-2">
              This is an expansion category rather than the initial focus. The
              first campaigns are planned around fitness, wellness, and
              youth-sports businesses; food and drink would come later.
            </p>
          ) : null}

          <h4 className="mono-label mt-8 border-b border-rule pb-2 text-neutral-600">
            What happens during the campaign
          </h4>
          <ol className="mt-0">
            {pkg.activities.map((activity, activityIndex) => (
              <li
                key={activity}
                className="grid grid-cols-[2.25rem_1fr] gap-2 border-b border-rule py-2.5 text-[0.9375rem] leading-snug text-ink-2"
              >
                <span className="font-mono text-[0.75rem] tabular-nums text-neutral-500">
                  {pad(activityIndex + 1)}
                </span>
                <span>{activity}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap items-start gap-x-6 gap-y-3">
            <CtaLink
              href={`/campaigns?package=${pkg.slug}#planner`}
              variant="secondary"
              withArrow
            >
              Plan this format
            </CtaLink>
            <p className="max-w-xs text-[0.8125rem] leading-snug text-neutral-600">
              Loads the planner below with {pkg.name} and its default activities
              selected. Every input stays editable.
            </p>
          </div>
        </div>

        <div
          className={`lg:col-span-5 ${flip ? "lg:col-start-1 lg:row-start-1" : ""}`}
        >
          <Bracketed className="p-5 sm:p-6" accent={index === 0}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="mono-label text-neutral-600">Format sheet</p>
              <ClaimLabel kind="illustrative" />
            </div>

            <div className="mt-4">
              <DataRow label="Duration" value={pkg.duration} />
              <DataRow
                label="Athletes in the example group"
                value={pad(pkg.defaults.athleteCount)}
              />
              <DataRow
                label="Content pieces in the example"
                value={pad(pkg.defaults.contentPieces)}
              />
              <DataRow
                label="In-person appearances"
                value={pad(pkg.defaults.appearances)}
              />
            </div>

            <h4 className="mono-label mt-7 border-b border-rule-strong pb-2 text-neutral-600">
              Example athlete group
            </h4>
            <ul className="mt-0">
              {pkg.athleteGroup.map((role, roleIndex) => (
                <li
                  key={role}
                  className="grid grid-cols-[2.25rem_1fr] gap-2 border-b border-rule py-2.5"
                >
                  <span className="font-mono text-[0.8125rem] tabular-nums text-neutral-500">
                    {pad(roleIndex + 1)}
                  </span>
                  <span className="text-[0.875rem] leading-snug text-ink-2">
                    {role}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[0.8125rem] leading-snug text-neutral-600">
              Role archetypes only — no athlete is named, pictured, or held for
              these dates.
            </p>

            <h4 className="mono-label mt-7 border-b border-rule-strong pb-2 text-neutral-600">
              How it would be measured
            </h4>
            <ul className="mt-0">
              {pkg.measurement.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-rule py-2.5 text-[0.875rem] leading-snug text-ink-2"
                >
                  <span
                    className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-lime-deep"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[0.8125rem] leading-snug text-neutral-600">
              What can be counted: {pkg.trackable}
            </p>

          </Bracketed>
        </div>
      </div>
    </article>
  );
}

export function FormatCatalogue() {
  return (
    <Section className="pb-4 pt-6 sm:pt-10">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-4">
        <div>
          <Eyebrow tone="muted">Five formats</Eyebrow>
          <DisplayHeading size="lg" className="mt-4">
            What a campaign would look like
          </DisplayHeading>
        </div>
        <Lede className="max-w-md text-[0.9375rem] text-ink-2">
          Example starting formats, ordered with fitness, wellness, and
          youth-sports businesses first. Each one is a template to argue with,
          not a product to buy.
        </Lede>
      </div>

      {/* One global customisation note instead of repeating it per format. */}
      <div className="grid gap-4 border-b border-rule-strong py-6 lg:grid-cols-12 lg:gap-8">
        <p className="mono-label text-neutral-600 lg:col-span-4">
          What every format still needs
        </p>
        <p className="measure text-[0.9375rem] leading-relaxed text-ink-2 lg:col-span-8">
          Whichever format you start from, the same things get decided with you
          before anything is real: the number of athletes and the sports
          represented, the offer itself and how it is redeemed, whether an
          in-person visit or clinic is included, how customer actions will be
          counted in your systems, and athlete compensation — which is confirmed
          in a written proposal rather than on this page. Athlete availability is
          never assumed, and no format carries a published price.
        </p>
      </div>

      {packages.map((pkg, index) => (
        <Fragment key={pkg.slug}>
          {index === 3 ? (
            <div className="border-b border-rule-strong py-9">
              <LaneRule lanes={3} numbered />
              <p className="mono-label mt-4 text-neutral-600">
                Beyond the initial focus — one expansion category and one
                longer-running format
              </p>
            </div>
          ) : null}
          <FormatEntry pkg={pkg} index={index} />
        </Fragment>
      ))}
    </Section>
  );
}
