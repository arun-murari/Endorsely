/**
 * The competitive landscape, described neutrally.
 *
 * Rules for this file:
 *   - platforms are named only as context, in their own terms, with no
 *     criticism, no comparison table and no suggestion that any of them fails
 *   - naming a platform is never a claim of integration, partnership, access or
 *     any other relationship; there are none
 *   - the substitutes matter as much as the platforms: most of this budget is
 *     spent somewhere other than an NIL product
 *   - no logos, ever
 */

export type LandscapePlatform = {
  name: string;
  /** What the platform does, phrased as the platform positions itself. */
  does: string;
};

export const landscapePlatforms: LandscapePlatform[] = [
  {
    name: "Teamworks Exchange",
    does: "Connects businesses and athletes, and supports payments and reporting.",
  },
  {
    name: "Opendorse",
    does: "Offers athlete campaigns, a marketplace, contracts and measurement.",
  },
  {
    name: "MOGL",
    does: "Combines brand partnerships with campaign and compliance tools.",
  },
  {
    name: "Athliance",
    does: "Serves disclosure workflows.",
  },
];

/** Where a local marketing budget actually goes today, athletes or not. */
export const landscapeSubstitutes: string[] = [
  "Local marketing agencies",
  "Non-athlete creators",
  "Paid social advertising",
  "Direct outreach to an athlete",
];

export const landscapeAdvantage =
  "Our advantage will come from focused execution, not an exclusive feature.";

export const landscapeSpecifics: { label: string; body: string }[] = [
  {
    label: "Affordable and repeatable",
    body: "Campaigns a small business can buy more than once, at a budget it can commit without a planning cycle.",
  },
  {
    label: "One category",
    body: "Local fitness, wellness and youth-sports businesses, rather than every business near a campus.",
  },
  {
    label: "Small athlete groups",
    body: "Delivered by a handful of college athletes working together, not by finding the biggest account in town.",
  },
  {
    label: "Judged on customer actions",
    body: "Evaluated against what customers did, not against impressions or the size of an athlete directory.",
  },
  {
    label: "One campus market first",
    body: "Depth in a single market before breadth, because reliable delivery is the thing that has to be proven.",
  },
];

export const landscapeNeutralityNote =
  "These platforms are named as context, in their own terms. Endorsely has no integration, partnership, agreement or access arrangement with any of them, and nothing here says they do their work badly. Endorsely is designed to be complementary to the systems a school or an athlete already uses: it originates and runs the campaign, and existing systems stay where they are.";
