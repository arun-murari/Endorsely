/**
 * Sample merchant report figures. FICTIONAL illustrative data for a campaign
 * that did not happen. Nothing here reflects a real result, and none of these
 * numbers should be described as a benchmark or an expectation.
 */

export type ReportLine = {
  label: string;
  value: string;
  /** Short note on where the number would come from. */
  source: string;
  emphasis?: boolean;
};

export type MeasurementSource = {
  label: string;
  detail: string;
  status: "available" | "merchant-dependent" | "proposed";
};

export const sampleReport = {
  label: "Sample report — fictional campaign data",
  campaignName: "Membership Drive · four weeks",
  merchant: "Rivergate Strength Co. (fictional sample business)",
  window: "Weeks 01–04",
  /** Matches the shared demo campaign's all-in budget so the two never diverge. */
  spend: 2000,
  redemptions: 63,
  attributedNewCustomers: 28,
  trackedRevenue: 3400,
  /** Named precisely. This is not ROI and not profit. */
  ratioLabel: "Tracked revenue ÷ campaign spend",
  lines: [
    {
      label: "Campaign spend",
      value: "$2,000",
      source: "Agreed all-in campaign budget for the period, management fee included",
    },
    {
      label: "Offer redemptions",
      value: "63",
      source: "Codes recorded at the front desk",
    },
    {
      label: "Attributed new customers",
      value: "28",
      source: "New sign-ups matched to a campaign code or link",
    },
    {
      label: "Tracked revenue",
      value: "$3,400",
      source: "Merchant-reported sales tied to those sign-ups",
      emphasis: true,
    },
  ] satisfies ReportLine[],
  perAthlete: [
    { number: "01", sport: "Track · distance", redemptions: 24, newCustomers: 11 },
    { number: "02", sport: "Volleyball", redemptions: 21, newCustomers: 9 },
    { number: "03", sport: "Swimming", redemptions: 18, newCustomers: 8 },
  ],
} as const;

/** Derived so the printed ratio can never drift from the printed line items. */
export const sampleReportRatio = `${(
  sampleReport.trackedRevenue / sampleReport.spend
).toFixed(2)}×`;

const usd = (amount: number) => `$${amount.toLocaleString("en-US")}`;

export const sampleReportRatioNote = `${usd(
  sampleReport.trackedRevenue,
)} of tracked revenue divided by ${usd(
  sampleReport.spend,
)} of campaign spend. Revenue, not profit — and not a measure of what the campaign caused.`;

export const measurementSources: MeasurementSource[] = [
  {
    label: "Unique offer codes",
    detail: "One code per athlete, redeemed in person and counted by staff.",
    status: "available",
  },
  {
    label: "Trackable links",
    detail: "Campaign-specific links to a single landing destination.",
    status: "available",
  },
  {
    label: "QR codes",
    detail: "Printed on in-store signage and used during appearances.",
    status: "available",
  },
  {
    label: "Lead and registration sources",
    detail: "A source field on the business's own sign-up or registration form.",
    status: "merchant-dependent",
  },
  {
    label: "Booking records",
    detail:
      "Appointment or class bookings tagged to the campaign in the tools the business already uses.",
    status: "merchant-dependent",
  },
  {
    label: "Merchant-provided redemption data",
    detail: "A simple weekly count the business sends, or exports from its own systems.",
    status: "merchant-dependent",
  },
  {
    label: "Point-of-sale, appointment, or reservation connections",
    detail:
      "Direct connections to merchant systems. Proposed, and dependent on what each business already runs.",
    status: "proposed",
  },
];

/** The honest three-way split between what is counted, inferred, and unknown. */
export const measurementHonesty: {
  heading: string;
  body: string;
  tone: "recorded" | "rule" | "unmeasured";
}[] = [
  {
    heading: "Recorded customer actions",
    body: "Events that actually got written down: a code redeemed, a form submitted with a campaign source, a registration through a campaign link, a booking tagged to the campaign.",
    tone: "recorded",
  },
  {
    heading: "Attribution rules",
    body: "Choices about which recorded action counts as campaign-driven, agreed with the business before the campaign starts. Rules are assumptions, not proof that the campaign caused the visit.",
    tone: "rule",
  },
  {
    heading: "Unmeasured activity",
    body: "People who saw a post and walked in two months later, word of mouth, and anyone who ignored the offer. No campaign report covers this, including ours.",
    tone: "unmeasured",
  },
];

export const reportingCaveats: string[] = [
  "Tracked revenue is revenue, not profit — it does not account for cost of delivery, discounting, or refunds.",
  "A ratio of tracked revenue to campaign spend is a summary of recorded activity, not a measure of incremental impact.",
  "Attribution shows which recorded actions carried a campaign code or link. It cannot prove the campaign caused them.",
];
