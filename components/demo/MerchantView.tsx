import { Artifact, WeekStrip } from "@/components/ui/Artifact";
import { Chip, StatusChip } from "@/components/ui/Chip";
import { DataRow } from "@/components/ui/DataRow";
import { Bracketed, RosterNumber } from "@/components/ui/Marks";
import {
  demoBudgetTotals,
  demoCampaign,
  formatUsd,
} from "@/lib/data/demoCampaign";

/**
 * Merchant campaign view. Everything is read from the shared demo campaign
 * object, and all money is rendered from `demoBudgetTotals` so the figures here
 * match the institutional view exactly.
 */
export function MerchantView() {
  const { objective, athletes, deliverables, schedule, measurement } = demoCampaign;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <section aria-labelledby="merchant-objective">
          <h3
            id="merchant-objective"
            className="display text-[clamp(1.5rem,2.8vw,2rem)]"
          >
            The objective
          </h3>
          <p className="measure mt-3 text-[1.0625rem] leading-relaxed text-ink">
            {objective.statement}
          </p>
          <div className="mt-5 border-l-2 border-lime-deep pl-4">
            <p className="mono-label text-neutral-600">Commercial purpose</p>
            <p className="measure mt-1 text-[0.9375rem] leading-relaxed text-ink-2">
              {objective.commercialPurpose}
            </p>
          </div>
        </section>

        <section aria-labelledby="merchant-athletes" className="mt-12">
          <h3
            id="merchant-athletes"
            className="display-tight border-b-2 border-ink pb-2 text-[1.35rem]"
          >
            Athlete group · {demoCampaign.package.name}
          </h3>
          <ul>
            {athletes.map((athlete) => (
              <li
                key={athlete.number}
                className="grid gap-3 border-b border-rule py-4 sm:grid-cols-[3rem_1fr_auto] sm:gap-5"
              >
                <RosterNumber value={athlete.number} size="md" className="text-neutral-500" />
                <div>
                  <p className="text-[0.9375rem] font-medium text-ink">
                    {athlete.sport}
                  </p>
                  <p className="text-[0.875rem] leading-snug text-ink-2">
                    {athlete.role} · {athlete.contribution}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    {athlete.deliverables.map((item) => (
                      <li key={item} className="mono-label text-neutral-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="font-mono text-[0.9375rem] tabular-nums text-ink sm:text-right">
                  {formatUsd(athlete.compensation)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[0.8125rem] leading-snug text-neutral-600">
            Role archetypes, not people. Compensation figures are sample data and
            no payment has been made.
          </p>
        </section>

        <section aria-labelledby="merchant-deliverables" className="mt-12">
          <h3
            id="merchant-deliverables"
            className="display-tight border-b-2 border-ink pb-2 text-[1.35rem]"
          >
            Deliverables
          </h3>
          <ul>
            {deliverables.map((item) => (
              <li
                key={item.id}
                className="grid gap-2 border-b border-rule py-3.5 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-4"
              >
                <span className="font-mono text-[0.8125rem] tabular-nums text-neutral-500">
                  {item.id}
                </span>
                <div>
                  <p className="text-[0.9375rem] leading-snug text-ink">
                    {item.label}
                  </p>
                  <p className="mono-label mt-1 text-neutral-600">
                    {item.owner} · due {item.due}
                  </p>
                </div>
                <Chip tone="neutral">{item.status}</Chip>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="merchant-schedule" className="mt-12">
          <h3
            id="merchant-schedule"
            className="display-tight border-b-2 border-ink pb-3 text-[1.35rem]"
          >
            Schedule · {demoCampaign.campaignWindow.display}
          </h3>
          <WeekStrip
            className="mt-2"
            weeks={schedule.map((week) => ({
              week: `Week ${week.week}`,
              focus: week.focus,
              items: [...week.milestones],
            }))}
          />
        </section>
      </div>

      <div className="lg:col-span-5">
        <Artifact
          title="Budget · illustrative allocation"
          meta={<Chip tone="warn">Sample — fictional data</Chip>}
          perforated
        >
          <div className="-mt-3">
            <DataRow
              label={`Athlete compensation (${athletes.length} × ${formatUsd(demoBudgetTotals.perAthlete)})`}
              value={formatUsd(demoBudgetTotals.athletePool)}
            />
            {demoCampaign.budget.otherIncludedCosts.map((cost) => (
              <DataRow
                key={cost.label}
                label={cost.label}
                value={formatUsd(cost.amount)}
              />
            ))}
            <DataRow
              label="Planning and coordination"
              value={formatUsd(demoBudgetTotals.planningAndCoordination)}
            />
            <DataRow
              emphasis
              label="Illustrative total"
              value={formatUsd(demoBudgetTotals.total)}
            />
          </div>
          <p className="mt-4 text-[0.8125rem] leading-snug text-neutral-600">
            {demoCampaign.budget.note} Per-athlete amounts come from the
            compensation pool, not from the total.
          </p>
        </Artifact>

        <Bracketed className="mt-8 p-5">
          <h3 className="display-tight text-[1.2rem]">Measurement setup</h3>
          <p className="mono-label mt-2 text-neutral-600">
            Primary action · {measurement.primaryAction}
          </p>
          <ul className="mt-4">
            {measurement.setup.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 border-t border-rule py-2.5 text-[0.875rem] leading-snug text-ink-2"
              >
                <span
                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-lime-deep"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.875rem] leading-snug text-ink-2">
            <span className="mono-label mr-2 text-neutral-600">Attribution rule</span>
            {measurement.attributionRule}
          </p>
          <p className="mt-3 text-[0.8125rem] leading-snug text-neutral-600">
            {measurement.limits}
          </p>
          <p className="mono-label mt-5 border-t border-rule pt-3 text-neutral-600">
            Proposed, not built
          </p>
          <ul className="mt-2 space-y-1.5">
            {measurement.proposed.map((item) => (
              <li key={item} className="text-[0.8125rem] leading-snug text-neutral-600">
                {item}
              </li>
            ))}
          </ul>
        </Bracketed>

        <div className="mt-8 border border-ink/20 p-5">
          <h3 className="display-tight text-[1.2rem]">Documentation checklist</h3>
          <ul className="mt-4">
            {demoCampaign.documentationChecklist.map((item) => (
              <li
                key={item.label}
                className="grid gap-1.5 border-t border-rule py-3 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-3"
              >
                <div>
                  <p className="text-[0.9375rem] leading-snug text-ink">
                    {item.label}
                  </p>
                  {item.note ? (
                    <p className="mt-0.5 text-[0.8125rem] leading-snug text-neutral-600">
                      {item.note}
                    </p>
                  ) : null}
                </div>
                <StatusChip status={item.status} />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.8125rem] leading-snug text-neutral-600">
            Documentation support is not legal advice or a guarantee of
            institutional approval.
          </p>
        </div>
      </div>
    </div>
  );
}
