import { WeekStrip } from "@/components/ui/Artifact";
import { ClaimLabel } from "@/components/ui/Chip";
import { LaneRule } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import {
  pilotPhases,
  pilotRiskNote,
  pilotRisks,
} from "@/lib/data/pilotPlan";

/**
 * The plan, on the only other dark band of the homepage. Composed as a
 * horizontal timeline — the schedule motif used inside the demo — so it reads
 * as a sequence of dated intentions rather than a list of accomplishments. The
 * risk register underneath is a two-column ledger, not a card grid.
 */
export function PilotRoadmap() {
  return (
    <Section tone="ink" id="pilot-plan" className="scroll-mt-24 py-16 sm:py-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow tone="invert">The plan</Eyebrow>
          <DisplayHeading size="lg" className="mt-5 text-paper">
            Ninety days by hand, then build what was used.
          </DisplayHeading>
        </div>
        <div className="flex flex-col items-start gap-3 lg:max-w-md">
          <ClaimLabel kind="planned" />
          <Lede className="text-[0.9375rem] text-neutral-300">
            Every item below is intended work on a schedule that has not started.
            None of it is an achievement, and no date here is a commitment to
            anyone.
          </Lede>
        </div>
      </div>

      <WeekStrip
        invert
        className="mt-10"
        weeks={pilotPhases.map((phase) => ({
          week: phase.label,
          focus: phase.focus,
          items: [...phase.items],
        }))}
      />

      <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {pilotPhases
          .filter((phase) => phase.readsAs)
          .map((phase) => (
            <li key={phase.id} className="border-t border-rule-invert pt-3">
              <p className="mono-label text-neutral-500">{phase.label}</p>
              <p className="mt-1.5 text-[0.8125rem] leading-snug text-neutral-400">
                {phase.readsAs}
              </p>
            </li>
          ))}
      </ul>

      <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h3 className="display text-[clamp(1.35rem,2.4vw,1.85rem)] text-paper">
            What could go wrong, and how we would find out
          </h3>
          <p className="measure mt-4 text-[0.875rem] leading-relaxed text-neutral-400">
            {pilotRiskNote}
          </p>
          <LaneRule lanes={3} invert numbered className="mt-8 max-w-[14rem]" />
        </div>

        <dl className="lg:col-span-8">
          {pilotRisks.map((item, index) => (
            <div
              key={item.risk}
              className="grid gap-x-8 gap-y-1.5 border-t border-rule-invert py-4 first:border-t-2 first:border-white/30 sm:grid-cols-[1fr_1fr]"
            >
              <dt className="flex items-baseline gap-3">
                <span className="font-mono text-[0.75rem] tabular-nums text-lime">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="display-tight text-[1.05rem] text-paper">
                  {item.risk}
                </span>
              </dt>
              <dd className="text-[0.875rem] leading-snug text-neutral-300 sm:pl-6">
                <span className="mono-label mr-2 text-neutral-500">
                  How it gets tested
                </span>
                {item.test}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
