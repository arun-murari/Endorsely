import { CampaignStatusChip, Chip, StatusChip } from "@/components/ui/Chip";
import { FieldRow } from "@/components/ui/DataRow";
import { Bracketed } from "@/components/ui/Marks";
import {
  demoBudgetTotals,
  demoCampaign,
  demoMerchantLabel,
  formatUsd,
} from "@/lib/data/demoCampaign";

/**
 * Institutional review view. Same campaign object as the merchant view, ordered
 * the way a reviewer would read it. Nothing here approves anything: statuses are
 * limited to the allowed set and no determination is generated.
 */
export function InstitutionalView() {
  const compensationLine = demoCampaign.athletes
    .map(
      (athlete) => `${athlete.number} ${athlete.sport} — ${formatUsd(athlete.compensation)}`,
    )
    .join(" · ");

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <section aria-labelledby="inst-terms">
          <h3
            id="inst-terms"
            className="display border-b-2 border-ink pb-2 text-[clamp(1.5rem,2.8vw,2rem)]"
          >
            Campaign summary
          </h3>
          <dl>
            <FieldRow
              label="Commercial purpose"
              value={demoCampaign.objective.commercialPurpose}
            />
            <FieldRow
              label="Parties"
              value={`${demoMerchantLabel} and ${demoCampaign.athletes.length} participating athletes (role archetypes in this sample)`}
            />
            <FieldRow
              label="Compensation"
              value={
                <>
                  {compensationLine}
                  <span className="mt-1 block font-mono text-[0.875rem] tabular-nums text-ink">
                    Pool {formatUsd(demoBudgetTotals.athletePool)} ·{" "}
                    {demoCampaign.athletes.length} ×{" "}
                    {formatUsd(demoBudgetTotals.perAthlete)}
                  </span>
                </>
              }
              note="Sample figures. No payment has occurred and no payment is held by anyone."
              meta={<StatusChip status="provided" />}
            />
            <FieldRow
              label="Campaign dates"
              value={demoCampaign.campaignWindow.display}
            />
            <FieldRow
              label="Deliverables"
              value={
                <ul className="space-y-1.5">
                  {demoCampaign.deliverables.map((item) => (
                    <li key={item.id}>
                      <span className="font-mono text-[0.8125rem] text-neutral-500">
                        {item.id}
                      </span>{" "}
                      {item.label}
                    </li>
                  ))}
                </ul>
              }
            />
            <FieldRow
              label="Usage rights"
              value={demoCampaign.usageRights.summary}
              note={`${demoCampaign.usageRights.exclusions} Duration: ${demoCampaign.usageRights.duration}.`}
            />
            <FieldRow
              label="Compensation rationale"
              value={demoCampaign.compensationRationale.summary}
              note={demoCampaign.compensationRationale.caution}
            />
            <FieldRow
              label="Agreement status"
              value={demoCampaign.agreementStatus.label}
              note={demoCampaign.agreementStatus.detail}
            />
          </dl>
        </section>

        <section aria-labelledby="inst-policy" className="mt-12">
          <h3
            id="inst-policy"
            className="display-tight border-b-2 border-ink pb-2 text-[1.35rem]"
          >
            Supplied policy references
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Chip tone="warn">Fictional sample</Chip>
            <p className="text-[0.875rem] text-ink-2">
              {demoCampaign.policySet.name} ({demoCampaign.policySet.fictionalNote})
            </p>
          </div>
          <p className="measure mt-3 text-[0.875rem] leading-relaxed text-neutral-600">
            {demoCampaign.policySet.description} Review assistance against a
            supplied policy set is a proposed capability. Endorsely does not
            author or interpret institutional policy, and nothing in this demo is a
            compliance determination.
          </p>
          <ul className="mt-5">
            {demoCampaign.policySet.rules.map((rule) => (
              <li
                key={rule.id}
                className="grid gap-1 border-t border-rule py-3 sm:grid-cols-[4rem_1fr] sm:gap-4"
              >
                <span className="font-mono text-[0.8125rem] tabular-nums text-neutral-500">
                  {rule.id}
                </span>
                <div>
                  <p className="text-[0.9375rem] font-medium text-ink">
                    {rule.label}
                  </p>
                  <p className="mt-0.5 text-[0.875rem] leading-snug text-ink-2">
                    {rule.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="lg:col-span-5">
        <Bracketed accent className="p-5">
          <p className="mono-label text-neutral-600">Where this packet sits</p>
          <div className="mt-4 space-y-4">
            <div>
              <CampaignStatusChip status={demoCampaign.status} />
              <p className="mt-2 text-[0.875rem] leading-snug text-ink-2">
                The merchant has asked for the campaign to be reviewed through the
                school&apos;s own process.
              </p>
            </div>
            <div className="border-t border-rule pt-4">
              <CampaignStatusChip status={demoCampaign.handoff.status} />
              <p className="mt-2 text-[0.875rem] leading-snug text-ink-2">
                {demoCampaign.handoff.detail}
              </p>
            </div>
            <div className="border-t border-rule pt-4">
              <CampaignStatusChip status={demoCampaign.completionEvidence.status} />
              <p className="mt-2 text-[0.875rem] leading-snug text-ink-2">
                Evidence is collected as the campaign runs, not at the end.
              </p>
            </div>
          </div>
          <p className="mt-5 border-t border-rule pt-4 text-[0.8125rem] leading-snug text-neutral-600">
            Statuses are limited to: Draft, Information needed, Ready for handoff,
            Review requested, Awaiting external response, and Completion evidence
            pending. No status in this product asserts that a campaign is approved,
            compliant, or eligible — those are institutional decisions.
          </p>
        </Bracketed>

        <div className="mt-8 border border-ink/20 p-5">
          <h3 className="display-tight text-[1.2rem]">Outstanding questions</h3>
          <ul className="mt-3">
            {demoCampaign.outstandingQuestions.map((question) => (
              <li
                key={question}
                className="border-t border-rule py-3 text-[0.875rem] leading-snug text-ink-2"
              >
                {question}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border border-ink/20 p-5">
          <h3 className="display-tight text-[1.2rem]">Completion evidence</h3>
          <ul className="mt-3">
            {demoCampaign.completionEvidence.items.map((item) => (
              <li
                key={item.label}
                className="grid gap-1.5 border-t border-rule py-3 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-3"
              >
                <div>
                  <p className="text-[0.9375rem] leading-snug text-ink">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] leading-snug text-neutral-600">
                    {item.note}
                  </p>
                </div>
                <StatusChip status={item.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
