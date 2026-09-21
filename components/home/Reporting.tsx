import { Artifact } from "@/components/ui/Artifact";
import { TextLink } from "@/components/ui/Button";
import { Chip, ClaimLabel } from "@/components/ui/Chip";
import { DataRow } from "@/components/ui/DataRow";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import {
  measurementHonesty,
  measurementSources,
  reportingCaveats,
  sampleReport,
  sampleReportRatio,
} from "@/lib/data/reporting";

const statusCopy = {
  available: "Available",
  "merchant-dependent": "Depends on your setup",
  proposed: "Proposed",
} as const;

/**
 * Full-bleed dark band. The sample report is styled as a receipt / scorecard
 * with tabular numerals, and is labelled as fictional in two places because it
 * is the single most misreadable module on the site.
 */
export function Reporting() {
  return (
    <Section tone="ink" id="reporting" className="py-16 sm:py-24">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Eyebrow tone="invert">Performance reporting</Eyebrow>
          <DisplayHeading size="lg" className="mt-5 text-paper">
            Know what happened after the post.
          </DisplayHeading>
          <Lede className="mt-6 text-neutral-300">
            Campaigns are set up so a customer action can be recorded before
            anything is published. Then the report says what was counted, what was
            inferred, and what nobody can see.
          </Lede>

          <h3 className="mono-label mt-12 border-b border-rule-invert pb-2 text-neutral-400">
            How actions get recorded
          </h3>
          <ul className="mt-1">
            {measurementSources.map((source) => (
              <li
                key={source.label}
                className="grid gap-1 border-b border-rule-invert py-3 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-4"
              >
                <div>
                  <p className="text-[0.9375rem] text-paper">{source.label}</p>
                  <p className="mt-0.5 text-[0.8125rem] leading-snug text-neutral-400">
                    {source.detail}
                  </p>
                </div>
                <Chip tone="invert" className="shrink-0">
                  {statusCopy[source.status]}
                </Chip>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.8125rem] leading-snug text-neutral-400">
            There is no passive foot-traffic tracking. Connections to point-of-sale,
            booking, or reservation systems are proposed and depend on what your
            business already runs.
          </p>
        </div>

        <div className="lg:col-span-6">
          <Artifact
            invert
            perforated
            title={sampleReport.label}
            meta={<ClaimLabel kind="fictional" />}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="display text-[clamp(1.5rem,3vw,2rem)] text-paper">
                {sampleReport.campaignName}
              </p>
              <p className="mono-label text-neutral-400">{sampleReport.window}</p>
            </div>
            <p className="mt-1 text-[0.8125rem] text-neutral-400">
              {sampleReport.merchant}
            </p>

            <div className="mt-6">
              {sampleReport.lines.map((line) => (
                <DataRow
                  key={line.label}
                  invert
                  emphasis={line.emphasis}
                  label={line.label}
                  value={line.value}
                  note={line.source}
                />
              ))}
              <DataRow
                invert
                label={sampleReport.ratioLabel}
                value={sampleReportRatio}
                note="$2,450 of tracked revenue divided by $900 of campaign spend. Revenue, not profit — and not a measure of what the campaign caused."
              />
            </div>

            <h4 className="mono-label mt-8 border-b border-rule-invert pb-2 text-neutral-400">
              By athlete
            </h4>
            <table className="mt-2 w-full text-left">
              <caption className="sr-only">
                Sample redemptions and attributed new customers by athlete. Fictional data.
              </caption>
              <thead>
                <tr className="mono-label text-neutral-500">
                  <th scope="col" className="py-2 font-normal">
                    No.
                  </th>
                  <th scope="col" className="py-2 font-normal">
                    Sport
                  </th>
                  <th scope="col" className="py-2 text-right font-normal">
                    Redemptions
                  </th>
                  <th scope="col" className="py-2 text-right font-normal">
                    New customers
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono text-[0.8125rem] tabular-nums text-paper">
                {sampleReport.perAthlete.map((row) => (
                  <tr key={row.number} className="border-t border-rule-invert">
                    <td className="py-2 text-lime">{row.number}</td>
                    <td className="py-2 font-sans text-neutral-300">{row.sport}</td>
                    <td className="py-2 text-right">{row.redemptions}</td>
                    <td className="py-2 text-right">{row.newCustomers}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-6 text-[0.8125rem] leading-snug text-neutral-400">
              Sample report — fictional campaign data for a campaign that has not
              happened. Not a benchmark, a projection, or an expectation.
            </p>
          </Artifact>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {measurementHonesty.map((item) => (
              <div
                key={item.heading}
                className="border-t-2 pt-3"
                style={{
                  borderTopColor:
                    item.tone === "recorded"
                      ? "var(--color-lime)"
                      : item.tone === "rule"
                        ? "var(--color-neutral-500)"
                        : "var(--color-rule-invert)",
                }}
              >
                <h4 className="display-tight text-[1.05rem] text-paper">
                  {item.heading}
                </h4>
                <p className="mt-2 text-[0.8125rem] leading-snug text-neutral-400">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <ul className="mt-8 space-y-2">
            {reportingCaveats.map((caveat) => (
              <li
                key={caveat}
                className="flex gap-2 text-[0.8125rem] leading-snug text-neutral-400"
              >
                <span className="mt-[0.4rem] h-1 w-1 shrink-0 bg-neutral-500" aria-hidden />
                <span>{caveat}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <TextLink href="/demo" invert>
              See the reporting inside the product demo
            </TextLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
