/**
 * Budget allocation — pure functions only.
 *
 * The model: a single all-in campaign budget. 20% is the Endorsely management
 * fee; the remaining 80% is campaign spending — included delivery costs first,
 * then athlete compensation. Athlete money is pass-through, not platform revenue.
 *
 * Rules that must always hold:
 *   total = athletePool + otherIncludedCosts + managementFee + unallocated
 *   managementFee is always 20% of total, never scaled by anything else
 *   perAthlete is derived from athletePool, never from total
 *   everything is whole dollars, so what renders always sums
 */

import { feeModel as fees, managementFeeFor } from "@/lib/data/fees";
import type { ActivityId } from "@/lib/data/packages";

export type BudgetLine = {
  label: string;
  amount: number;
  note?: string;
};

export type BudgetAllocation = {
  total: number;
  /** The 80% of the budget that is campaign spending, before it is split up. */
  campaignSpend: number;
  athletePool: number;
  managementFee: number;
  otherIncludedCosts: BudgetLine[];
  otherIncludedTotal: number;
  /** Rounding remainder kept visible so the column always adds up. */
  unallocated: number;
  athleteCount: number;
  perAthlete: number;
  /** True when the total sits under the proposed minimum campaign budget. */
  belowMinimumBudget: boolean;
  /** True when the pool cannot fund the requested athlete count sensibly. */
  athleteCountReduced: boolean;
  /** Athlete count the allocation actually funds. */
  fundedAthleteCount: number;
  /** False when the pool cannot fund even one athlete at the assumed floor. */
  fundsAnyAthlete: boolean;
  lines: BudgetLine[];
};

const round = (value: number) => Math.round(value);

export function otherCostsFor(activities: ActivityId[]): BudgetLine[] {
  const lines: BudgetLine[] = [];
  if (activities.includes("youth-clinic")) {
    lines.push({
      label: "Clinic materials allowance",
      amount: fees.clinicMaterialsAllowance,
      note: "Equipment, printed registration material, and name tags.",
    });
  }
  if (activities.includes("appearance") || activities.includes("recurring-ambassador")) {
    lines.push({
      label: "Appearance materials allowance",
      amount: fees.appearanceMaterialsAllowance,
      note: "Signage with a QR code, and printed offer cards.",
    });
  }
  return lines;
}

/**
 * Allocate a total campaign budget into line items.
 *
 * `athleteCount` is a request, not a guarantee: if the remaining pool cannot
 * give each athlete the assumed floor, the funded count is reduced rather than
 * pretending a small pool pays a large group.
 */
export function allocateBudget(input: {
  total: number;
  athleteCount: number;
  activities: ActivityId[];
}): BudgetAllocation {
  const total = Math.max(0, round(input.total));
  const requestedAthletes = Math.max(1, Math.round(input.athleteCount));

  const managementFee = managementFeeFor(total);
  const campaignSpend = Math.max(0, total - managementFee);

  const otherCandidates = otherCostsFor(input.activities);
  const otherIncludedCosts: BudgetLine[] = [];
  let remaining = campaignSpend;

  // Only include a materials line if the budget can actually carry it.
  for (const line of otherCandidates) {
    if (remaining - line.amount >= fees.athleteAllocationFloor) {
      otherIncludedCosts.push(line);
      remaining -= line.amount;
    }
  }

  const otherIncludedTotal = otherIncludedCosts.reduce(
    (sum, line) => sum + line.amount,
    0,
  );
  const athletePool = Math.max(0, remaining);

  const affordableAthletes = Math.max(
    1,
    Math.min(
      requestedAthletes,
      Math.floor(athletePool / fees.athleteAllocationFloor) || 1,
    ),
  );
  const perAthlete = Math.floor(athletePool / affordableAthletes);
  const unallocated = athletePool - perAthlete * affordableAthletes;

  const lines: BudgetLine[] = [
    {
      label: `Athlete compensation (${affordableAthletes} × $${perAthlete.toLocaleString("en-US")})`,
      amount: perAthlete * affordableAthletes,
      note: "Paid to participating athletes under the campaign agreement. Campaign spending, not Endorsely revenue.",
    },
    ...otherIncludedCosts,
    {
      label: `Endorsely management fee (${Math.round(fees.managementFeeRate * 100)}%)`,
      amount: managementFee,
      note: "Campaign design, athlete coordination, documentation preparation, reporting.",
    },
  ];

  if (unallocated > 0) {
    lines.push({
      label: "Unallocated balance",
      amount: unallocated,
      note: "Rounding remainder held for schedule adjustments.",
    });
  }

  return {
    total,
    campaignSpend,
    athletePool,
    managementFee,
    otherIncludedCosts,
    otherIncludedTotal,
    unallocated,
    athleteCount: requestedAthletes,
    perAthlete,
    belowMinimumBudget: total < fees.minimumCampaignBudget,
    athleteCountReduced: affordableAthletes < requestedAthletes,
    fundedAthleteCount: affordableAthletes,
    fundsAnyAthlete: athletePool >= fees.athleteAllocationFloor,
    lines,
  };
}

/** Sanity check used by the UI: rendered lines must equal the stated total. */
export function allocationBalances(allocation: BudgetAllocation): boolean {
  const sum = allocation.lines.reduce((total, line) => total + line.amount, 0);
  return sum === allocation.total;
}

export const budgetDisclosure =
  "Illustrative allocation of a proposed fee model. Final scope and pricing require a proposal.";
