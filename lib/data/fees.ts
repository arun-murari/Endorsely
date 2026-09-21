/**
 * PROTOTYPE ASSUMPTIONS — NOT APPROVED PRICING.
 *
 * Every number in this file is an internal planning assumption used to make the
 * illustrative campaign planner arithmetic consistent. None of it has been
 * approved, tested with customers, or reviewed. It must never be presented on
 * the site as a price list, a quote, or a rate card. Public calls to action are
 * always "discuss a pilot" / "request a campaign proposal".
 *
 * Revenue hypotheses under consideration (unresolved, deliberately not public):
 *   - per-campaign coordination fee paid by the merchant
 *   - managed-service fee for businesses that want campaigns run for them
 *   - possible recurring subscription for repeat campaign programmes
 *   - institutional licensing for schools/partners
 * Earlier internal proposals floated annual figures in different ranges. None
 * are settled, so none appear anywhere in the UI.
 */

export const prototypeFeeAssumptions = {
  /**
   * Share of a campaign budget assumed to cover Endorsely planning and
   * coordination in prototype allocations. 0.20 keeps the worked example clean:
   * a $1,250 total → $250 coordination + $1,000 athlete compensation pool.
   */
  coordinationRate: 0.2,
  /** Floor so very small budgets do not imply unpaid coordination work. */
  coordinationMinimum: 150,
  /** Ceiling so large budgets do not scale the fee indefinitely. */
  coordinationMaximum: 900,
  /** Materials allowance assumed when a campaign includes an in-person clinic. */
  clinicMaterialsAllowance: 120,
  /** Materials allowance assumed for a store or studio appearance. */
  appearanceMaterialsAllowance: 60,
  /**
   * Planning hypothesis only: total budgets around this level are where the
   * team currently believes a multi-athlete campaign is sustainable to run.
   * This is not a minimum spend, a promise, or a published requirement.
   */
  sustainabilityHypothesisTotal: 1000,
  /** Assumed floor for a single athlete's compensation in an allocation. */
  athleteAllocationFloor: 150,
  /** Worked prototype example referenced in copy. */
  workedExample: {
    athleteCompensationPool: 1000,
    planningAndCoordination: 250,
    total: 1250,
    athleteCount: 4,
    perAthlete: 250,
  },
} as const;

export type PrototypeFeeAssumptions = typeof prototypeFeeAssumptions;
