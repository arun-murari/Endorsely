/**
 * PROPOSED PRICING ASSUMPTIONS — NOT APPROVED, NOT TESTED WITH CUSTOMERS.
 *
 * The model: a merchant agrees one all-in campaign budget. Endorsely takes a
 * management fee of 20% of that budget; the remaining 80% is campaign spending —
 * athlete compensation plus any explicitly included delivery costs. Athlete
 * compensation is pass-through campaign money, not platform revenue.
 *
 * Worked example: a $2,000 campaign = $1,600 to athletes and delivery,
 * $400 Endorsely management fee.
 *
 * This is a proposal. Willingness to pay has not been tested, so the site says
 * so next to every figure and publishes no pricing tiers, rate card, or quote.
 * Public calls to action stay "discuss a pilot" / "request a campaign proposal".
 *
 * Unvalidated revenue possibilities, deliberately absent from the UI:
 *   - a recurring reporting subscription (a $149/month figure has been floated
 *     internally; no demand evidence exists, so it is not a product)
 *   - institutional licensing for schools or collectives (scope, price and what
 *     a school would receive are all undecided, and would require demand
 *     validation before being offered)
 * Neither is a published price and neither should be rendered anywhere.
 *
 * Internal P&L scenarios — overhead, campaign-volume cases, break-even, margin,
 * per-campaign delivery cost — live in the business plan, not in this repo. The
 * site shows no projected revenue or profit.
 */

export const feeModel = {
  /** Endorsely management fee, taken within the agreed campaign budget. */
  managementFeeRate: 0.2,
  /**
   * Proposed minimum campaign budget. Below this the site stops printing an
   * allocation and points to a conversation about a smaller pilot instead.
   * A minimum budget, not a minimum fee.
   */
  minimumCampaignBudget: 1000,
  /** Materials allowance assumed when a campaign includes an in-person clinic. */
  clinicMaterialsAllowance: 120,
  /** Materials allowance assumed for a store or studio appearance. */
  appearanceMaterialsAllowance: 100,
  /** Assumed floor for a single athlete's compensation in an allocation. */
  athleteAllocationFloor: 150,
  /** Worked example referenced in copy, derived from the rule above. */
  workedExample: {
    total: 2000,
    managementFee: 400,
    athleteAndDelivery: 1600,
  },
} as const;

export type FeeModel = typeof feeModel;

/** Fee on a budget, in whole dollars. Pure. */
export const managementFeeFor = (total: number): number =>
  Math.round(Math.max(0, total) * feeModel.managementFeeRate);

/** The honest label that must accompany any fee figure shown to a visitor. */
export const pricingDisclosure =
  "Proposed pricing. We will test willingness to pay before finalizing.";

/** One-line description of the split, for copy that needs it inline. */
export const feeSplitSummary =
  "One all-in campaign budget: 20% is the Endorsely management fee, 80% is campaign spending — athlete compensation and any included delivery costs.";
