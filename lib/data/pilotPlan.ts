/**
 * The pilot plan. Everything in this file is INTENDED work, not a record.
 *
 * `workCompleted` is the exact, complete list of what has actually been done.
 * If something is not in that array, it has not happened — interviews included.
 * Nothing in `phases` has started.
 */

export type PilotPhase = {
  id: string;
  label: string;
  focus: string;
  items: string[];
  /** The honest read on what finishing this phase would and would not prove. */
  readsAs?: string;
};

/** The complete list of work done to date. Do not pad this. */
export const workCompleted: string[] = [
  "Developed the concept",
  "Researched competitors",
  "Outlined the business and pilot models",
];

/** Still ahead — stated as milestones so they are never mistaken for progress. */
export const workPlanned: string[] = [
  "Customer interviews",
  "Paying clients",
  "Partnerships",
  "A working platform",
];

export const pilotPhases: PilotPhase[] = [
  {
    id: "days-1-30",
    label: "Days 1–30",
    focus: "Discovery",
    items: [
      "Interview 15 athletes, 10 merchants and three NIL or compliance professionals",
      "Map the institution's disclosure process and identify required permissions",
      "Have pilot templates reviewed",
      "Target owners who make purchasing decisions",
      "Goal: five paid campaign commitments, not expressions of interest",
    ],
  },
  {
    id: "days-31-60",
    label: "Days 31–60",
    focus: "Deliver by hand",
    items: [
      "Deliver the first five campaigns manually, using existing scheduling, payment and reporting tools",
      "Establish each merchant's success metric before launch",
      "Create trackable offers and document athlete deliverables",
      "Record acquisition effort, delivery hours, completion rates and merchant feedback",
    ],
    readsAs:
      "This stage tests whether the service creates value before any software is built.",
  },
  {
    id: "days-61-90",
    label: "Days 61–90",
    focus: "Test for repeat demand",
    items: [
      "Seek repeat purchases from at least three of the first five merchants",
      "Document $10,000 in cumulative campaign spending",
      "Calculate contribution after servicing and acquisition costs",
      "Revise pricing or scope where the numbers say to",
    ],
    readsAs:
      "Repeat purchasing is an early signal of interest, not proof of product-market fit.",
  },
  {
    id: "months-4-6",
    label: "Months 4–6",
    focus: "Build only what was used",
    items: [
      "Build the validated workflows: onboarding, briefs, scheduling, completion evidence, disclosure exports, reporting",
      "Seek referrals from merchant associations, campus organisations and local agencies",
      "Treat school partnerships and integrations as future opportunities, not dependencies",
    ],
    readsAs:
      "Expansion to three campuses follows repeat demand and positive contribution economics — not a calendar.",
  },
];

export type PilotRisk = {
  risk: string;
  /** How the risk gets tested rather than argued about. */
  test: string;
};

export const pilotRisks: PilotRisk[] = [
  {
    risk: "Campaigns do not return enough for merchants",
    test: "Paid pilots with a success metric agreed before launch, and repeat-purchase tracking afterwards.",
  },
  {
    risk: "Selling to small businesses costs more than it earns",
    test: "Acquisition effort recorded per campaign and set against contribution, not against revenue.",
  },
  {
    risk: "Athlete availability moves with the season",
    test: "Recruiting across two or three sports, and recording completion rates rather than assuming them.",
  },
  {
    risk: "Merchants and athletes go around the platform",
    test: "Clear cancellation terms, and watching whether renewals happen when nothing forces them to.",
  },
  {
    risk: "A larger incumbent copies a package that works",
    test: "Measured delivery costs and merchant relationships in one market, which is what would be hard to copy quickly.",
  },
];

export const pilotRiskNote =
  "Rules, school policies and platform access can change. The plan is to retain qualified legal support, use authorized review processes, avoid guaranteeing compliance, and fall back to manual exports if integrations are unavailable.";
