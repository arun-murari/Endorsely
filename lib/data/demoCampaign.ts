/**
 * THE single shared demo campaign object.
 *
 * Both demo perspectives (merchant campaign view and institutional review view)
 * and the sample evidence packet read from this object, so every name, date,
 * deliverable and dollar figure reconciles across the whole demo.
 *
 * All of it is fictional sample data. The business does not exist, the athletes
 * are role archetypes rather than people, the school policy set is invented for
 * demonstration, and no money has moved.
 */

export type CampaignStatus =
  | "Draft"
  | "Information needed"
  | "Ready for handoff"
  | "Review requested"
  | "Awaiting external response"
  | "Completion evidence pending";

/** Every displayed field declares how trustworthy it is. */
export type FieldStatus =
  | "provided"
  | "verified"
  | "pending"
  | "proposed"
  | "not-applicable";

export type DemoAthlete = {
  number: string;
  sport: string;
  role: string;
  contribution: string;
  deliverables: string[];
  compensation: number;
};

export type DemoDeliverable = {
  id: string;
  label: string;
  owner: string;
  due: string;
  status: "Scheduled" | "Submitted" | "Completion evidence pending";
};

export type DemoScheduleWeek = {
  week: string;
  dates: string;
  focus: string;
  milestones: string[];
};

export type DemoChecklistItem = {
  label: string;
  status: FieldStatus;
  note?: string;
};

export type DemoPolicyRule = {
  id: string;
  label: string;
  text: string;
};

export type DemoPotentialIssue = {
  triggeredBy: string;
  ruleId: string;
  summary: string;
  detail: string;
};

export const demoCampaign = {
  id: "MP-SAMPLE-0142",
  label: "Interactive product concept — sample data",
  merchant: {
    name: "Rivergate Strength Co.",
    fictionalNote: "fictional sample business",
    category: "Gym and strength studio",
    offering:
      "Monthly memberships, small-group strength classes, and a two-week trial pass.",
    identity: {
      registeredName: "Rivergate Strength Co. LLC (fictional)",
      contactRole: "Owner / operator",
      publicListing: "Public website and class schedule provided by the merchant",
    },
  },
  package: {
    slug: "membership-drive",
    name: "Membership Drive",
  },
  objective: {
    label: "Membership inquiries",
    statement:
      "Increase membership inquiries and two-week trial sign-ups from people who live or study within roughly three miles of the studio.",
    commercialPurpose:
      "Paid promotion of an existing commercial fitness offering to a local consumer audience, with a trackable trial offer.",
  },
  campaignWindow: {
    label: "Four weeks",
    start: "2026-03-02",
    end: "2026-03-29",
    display: "Mar 2 – Mar 29, 2026",
  },
  athletes: [
    {
      number: "01",
      sport: "Track · distance",
      role: "Training-routine content lead",
      contribution: "Content + one studio visit",
      deliverables: [
        "3 short-form videos",
        "1 studio visit for capture",
        "Offer code RG-LANE1",
      ],
      compensation: 350,
    },
    {
      number: "02",
      sport: "Volleyball",
      role: "Mobility and recovery demonstrator",
      contribution: "Content only",
      deliverables: ["2 short-form videos", "1 photo set", "Offer code RG-LANE2"],
      compensation: 350,
    },
    {
      number: "03",
      sport: "Swimming",
      role: "Off-season strength storyteller",
      contribution: "Content only",
      deliverables: ["2 short-form videos", "1 story series", "Offer code RG-LANE3"],
      compensation: 350,
    },
  ] satisfies DemoAthlete[],
  deliverables: [
    {
      id: "D-01",
      label: "7 short-form videos across three athletes",
      owner: "Athlete group",
      due: "Rolling, weeks 01–04",
      status: "Scheduled",
    },
    {
      id: "D-02",
      label: "1 photo set for merchant reuse (90-day usage window)",
      owner: "Athlete 02",
      due: "Week 02",
      status: "Scheduled",
    },
    {
      id: "D-03",
      label: "1 studio visit for content capture (60 minutes)",
      owner: "Athlete 01",
      due: "Week 01",
      status: "Scheduled",
    },
    {
      id: "D-04",
      label: "3 unique offer codes distributed and tracked",
      owner: "MatchPoint coordination",
      due: "Week 01",
      status: "Submitted",
    },
    {
      id: "D-05",
      label: "Published-content links collected for the record",
      owner: "MatchPoint coordination",
      due: "Week 04",
      status: "Completion evidence pending",
    },
  ] satisfies DemoDeliverable[],
  schedule: [
    {
      week: "01",
      dates: "Mar 2 – Mar 8",
      focus: "Launch",
      milestones: [
        "Offer codes issued",
        "Studio visit and capture",
        "First two videos published",
      ],
    },
    {
      week: "02",
      dates: "Mar 9 – Mar 15",
      focus: "Build",
      milestones: ["Photo set delivered", "Two videos published"],
    },
    {
      week: "03",
      dates: "Mar 16 – Mar 22",
      focus: "Push",
      milestones: ["Two videos published", "Mid-campaign redemption count"],
    },
    {
      week: "04",
      dates: "Mar 23 – Mar 29",
      focus: "Close",
      milestones: [
        "Final video published",
        "Redemption data collected",
        "Completion evidence assembled",
      ],
    },
  ] satisfies DemoScheduleWeek[],
  budget: {
    /** athletePool must equal the sum of athlete compensation below. */
    athletePool: 1050,
    planningAndCoordination: 250,
    otherIncludedCosts: [
      { label: "Appearance materials allowance", amount: 60 },
    ],
    total: 1360,
    note: "Illustrative allocation for a sample campaign. Final scope and pricing require a proposal.",
  },
  measurement: {
    primaryAction: "Two-week trial sign-ups and membership inquiries",
    setup: [
      "One unique offer code per athlete, redeemed at the front desk",
      "One campaign landing link shared by all three athletes",
      "A source question on the merchant's own sign-up form",
      "Weekly redemption count provided by the merchant",
    ],
    attributionRule:
      "A sign-up counts as attributed when it arrives with a campaign code, through the campaign link, or names the campaign on the merchant's source question.",
    limits:
      "Walk-ins with no code and delayed sign-ups are not counted. Recorded actions are not proof of incremental impact.",
    proposed: [
      "Direct point-of-sale connection for redemption counts",
      "Booking-system tagging for class reservations",
    ],
  },
  documentationChecklist: [
    {
      label: "Campaign brief and commercial purpose",
      status: "provided",
      note: "Written with the merchant during planning.",
    },
    {
      label: "Parties, dates, and deliverables listed per athlete",
      status: "provided",
    },
    {
      label: "Compensation amounts recorded per athlete",
      status: "provided",
      note: "Amounts are sample figures in this demo.",
    },
    {
      label: "Usage-rights window stated for reusable content",
      status: "provided",
    },
    {
      label: "Draft agreement structure attached",
      status: "provided",
      note: "Structural example only — requires appropriate legal and institutional review.",
    },
    {
      label: "Merchant identity details",
      status: "provided",
      note: "Provided by the merchant, not independently verified.",
    },
    {
      label: "Athlete contact and school information",
      status: "pending",
      note: "Collected before handoff; withheld from this demo.",
    },
    {
      label: "Completion evidence pack",
      status: "pending",
      note: "Assembled at the end of the campaign window.",
    },
  ] satisfies DemoChecklistItem[],
  usageRights: {
    summary:
      "Merchant may reuse the delivered photo set and video clips on its own channels for 90 days from delivery.",
    exclusions:
      "No paid advertising use, no third-party resale, no use implying an endorsement by any school or team.",
    duration: "90 days from delivery",
  },
  compensationRationale: {
    summary:
      "Flat per-athlete amount for a defined deliverable set: video count, one photo set, and one 60-minute studio visit.",
    basis:
      "Scope-based. Time, deliverable count, and in-person hours were used to set a flat amount for each athlete.",
    caution:
      "Supporting rationale for review purposes. Not an independent valuation and not a confirmed fair-market determination.",
  },
  status: "Review requested" as CampaignStatus,
  agreementStatus: {
    label: "Draft — structural example requiring review",
    detail:
      "A draft agreement structure is attached to the packet. It is an example of the fields a campaign agreement would cover, not a reviewed or ready-to-sign document.",
  },
  handoff: {
    status: "Ready for handoff" as CampaignStatus,
    detail:
      "The packet is organised for the school's existing disclosure and review workflow. MatchPoint does not submit on a school's behalf and no institution has accepted this format.",
  },
  policySet: {
    name: "Sample Policy Set — Northside State",
    fictionalNote: "fictional, configured for this demo",
    description:
      "A small set of example rules supplied to the demo so review assistance has something to check against. Real policy sets would be supplied by the institution.",
    rules: [
      {
        id: "SP-01",
        label: "Restricted categories",
        text: "Campaigns involving alcohol, tobacco, cannabis, gambling, or supplements marketed for performance enhancement require additional review before handoff.",
      },
      {
        id: "SP-02",
        label: "Sponsorship conflict",
        text: "Campaigns with a business in a category already covered by a departmental sponsorship require additional review before handoff.",
      },
      {
        id: "SP-03",
        label: "Marks and affiliation",
        text: "Campaign materials may not use institutional marks or imply an institutional endorsement.",
      },
      {
        id: "SP-04",
        label: "Youth programming",
        text: "Campaigns involving instruction of minors require venue, supervision, and insurance details.",
      },
    ] satisfies DemoPolicyRule[],
  },
  potentialIssues: [
    {
      triggeredBy: "Merchant add-on offering: branded recovery supplement retail",
      ruleId: "SP-02",
      summary:
        "Merchant sells a retail supplement line; the sample policy set flags supplement-adjacent categories and departmental sponsorship overlap for additional review.",
      detail:
        "The campaign brief promotes memberships and trial passes only, and excludes supplement products from all deliverables. Flagged for a human to confirm whether the merchant's retail line matters under the supplied rule.",
    },
  ] satisfies DemoPotentialIssue[],
  outstandingQuestions: [
    "Does the merchant's retail supplement line fall under the supplied restricted-category rule, given it is excluded from the campaign deliverables?",
    "Is a 90-day content usage window acceptable for this campaign type?",
    "Should athlete contact details be routed through the department or provided directly with the packet?",
  ],
  completionEvidence: {
    status: "Completion evidence pending" as CampaignStatus,
    items: [
      {
        label: "Published-content links",
        status: "pending" as FieldStatus,
        note: "5 of 7 videos published at the time of this sample.",
      },
      {
        label: "Appearance confirmation",
        status: "provided" as FieldStatus,
        note: "Studio visit confirmed by merchant note, week 01.",
      },
      {
        label: "Redemption counts by code",
        status: "provided" as FieldStatus,
        note: "Merchant-reported. Not independently verified.",
      },
      {
        label: "Payment record",
        status: "not-applicable" as FieldStatus,
        note: "No payment has occurred. MatchPoint does not hold or process funds — recordkeeping only.",
      },
      {
        label: "Disclosure confirmation",
        status: "pending" as FieldStatus,
        note: "Confirmed by the athlete or the school through the school's own process.",
      },
    ],
  },
} as const;

export type DemoCampaign = typeof demoCampaign;

/** Arithmetic guard: the displayed total always derives from the parts. */
export const demoBudgetTotals = (() => {
  const athletePool = demoCampaign.athletes.reduce(
    (sum, athlete) => sum + athlete.compensation,
    0,
  );
  const other = demoCampaign.budget.otherIncludedCosts.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  return {
    athletePool,
    perAthlete: athletePool / demoCampaign.athletes.length,
    otherIncludedCosts: other,
    planningAndCoordination: demoCampaign.budget.planningAndCoordination,
    total: athletePool + other + demoCampaign.budget.planningAndCoordination,
  };
})();

export const formatUsd = (amount: number): string =>
  `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export const demoMerchantLabel = `${demoCampaign.merchant.name} (${demoCampaign.merchant.fictionalNote})`;
