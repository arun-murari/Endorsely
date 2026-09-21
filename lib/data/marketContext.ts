/**
 * Third-party market figures, with the attribution and the caveat attached to
 * each one. These are other organisations' counts and projections, not
 * Endorsely data, not validated facts, and not addressable revenue.
 *
 * Rules for this file:
 *   - every figure carries a `source` and a `caveat`, and the UI renders both
 *   - nothing here is presented as a result, a forecast for Endorsely, or a
 *     number the business has verified
 *   - no unsourced statistics. A widely repeated claim about the share of
 *     athletes without agency representation was deliberately left out because
 *     no supportable source for it was found.
 */

export type MarketFigure = {
  id: string;
  /** The number itself, formatted for display. */
  figure: string;
  /** What the number counts, in a few words. */
  unit: string;
  /** The claim, phrased the way the source phrases it. */
  claim: string;
  source: string;
  /** Why the figure is smaller or less relevant than it looks. */
  caveat: string;
};

export const marketFigures: MarketFigure[] = [
  {
    id: "ncaa-participants",
    figure: "554,298",
    unit: "championship-sport participants",
    claim:
      "The NCAA reported 554,298 championship-sport participants across nearly 20,000 teams in 2024-25.",
    source: "NCAA, 2024-25 participation figures",
    caveat:
      "A potential athlete pool, not a count of commercially marketable athletes. Most of these athletes have no local sponsor and may never want one.",
  },
  {
    id: "nil-market",
    figure: "$4.5B",
    unit: "projected NIL market, 2026-27",
    claim: "Opendorse projects a $4.5 billion NIL market in 2026-27.",
    source: "Opendorse projection",
    caveat:
      "Includes school payments and other spending well outside what Endorsely would touch. The merchant-funded local slice is a small fraction of it.",
  },
  {
    id: "creator-advertising",
    figure: "$37B",
    unit: "U.S. creator advertising, 2025",
    claim:
      "The IAB projected U.S. creator advertising at $37 billion in 2025, up 26% year over year.",
    source: "IAB projection",
    caveat:
      "An adjacent market, not addressable NIL revenue. It shows that businesses buy this kind of marketing; it says nothing about what local merchants would pay for athlete campaigns.",
  },
];

export const marketContextNote =
  "Figures are third-party counts and projections as published by the organisations cited. Endorsely has not verified them, does not present them as its own data, and does not treat any of them as revenue it can address.";

export const marketContextFraming =
  "None of these numbers say that a gym owner three miles from campus will pay for an athlete campaign. That is the question our pilot exists to answer.";
