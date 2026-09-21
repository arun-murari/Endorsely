/**
 * The sample evidence packet, DERIVED from `demoCampaign` so the merchant view,
 * institutional view, /schools page and the export can never disagree.
 *
 * Every field carries a status chip. "Provided" means someone typed it in;
 * "verified" would require an actual verification source, which this demo does
 * not have — so nothing here is marked verified.
 */

import {
  demoBudgetTotals,
  demoCampaign,
  demoMerchantLabel,
  formatUsd,
  type FieldStatus,
} from "@/lib/data/demoCampaign";

export type PacketField = {
  label: string;
  value: string;
  status: FieldStatus;
  note?: string;
};

export type PacketGroup = {
  id: "merchant" | "commercial-terms" | "review" | "execution";
  number: string;
  title: string;
  purpose: string;
  fields: PacketField[];
};

export const fieldStatusLabel: Record<FieldStatus, string> = {
  provided: "Provided — not independently verified",
  verified: "Verified",
  pending: "Information needed",
  proposed: "Proposed capability",
  "not-applicable": "Not applicable",
};

export const fieldStatusShort: Record<FieldStatus, string> = {
  provided: "Provided",
  verified: "Verified",
  pending: "Needed",
  proposed: "Proposed",
  "not-applicable": "N/A",
};

const athleteLine = demoCampaign.athletes
  .map(
    (athlete) =>
      `${athlete.number} ${athlete.sport} — ${formatUsd(athlete.compensation)}`,
  )
  .join(" · ");

export const evidencePacket: PacketGroup[] = [
  {
    id: "merchant",
    number: "01",
    title: "Merchant",
    purpose:
      "Who the business is, what it sells, and why it is running the campaign.",
    fields: [
      {
        label: "Business name",
        value: demoMerchantLabel,
        status: "provided",
      },
      {
        label: "Registered entity",
        value: demoCampaign.merchant.identity.registeredName,
        status: "provided",
        note: "Supplied by the merchant during planning.",
      },
      {
        label: "Identity verification status",
        value: "No independent verification source connected",
        status: "pending",
        note: "A verification source would need to be configured before this could read as verified.",
      },
      {
        label: "Public business offering",
        value: demoCampaign.merchant.offering,
        status: "provided",
      },
      {
        label: "Campaign purpose",
        value: demoCampaign.objective.commercialPurpose,
        status: "provided",
      },
    ],
  },
  {
    id: "commercial-terms",
    number: "02",
    title: "Commercial terms",
    purpose: "What was agreed, with whom, for how much, and for how long.",
    fields: [
      {
        label: "Parties",
        value: `${demoCampaign.merchant.name} and ${demoCampaign.athletes.length} participating athletes (role archetypes in this sample)`,
        status: "provided",
      },
      {
        label: "Compensation per athlete",
        value: athleteLine,
        status: "provided",
        note: "Sample figures. No payment has been made.",
      },
      {
        label: "Athlete compensation pool",
        value: formatUsd(demoBudgetTotals.athletePool),
        status: "provided",
      },
      {
        label: "Campaign dates",
        value: demoCampaign.campaignWindow.display,
        status: "provided",
      },
      {
        label: "Deliverables",
        value: demoCampaign.deliverables.map((item) => item.label).join("; "),
        status: "provided",
      },
      {
        label: "Usage rights",
        value: `${demoCampaign.usageRights.summary} ${demoCampaign.usageRights.exclusions}`,
        status: "provided",
      },
      {
        label: "Supporting compensation rationale",
        value: `${demoCampaign.compensationRationale.basis} ${demoCampaign.compensationRationale.caution}`,
        status: "provided",
        note: "Scope-based reasoning only. Not an independent valuation or a confirmed fair-market determination.",
      },
      {
        label: "Agreement status",
        value: demoCampaign.agreementStatus.label,
        status: "provided",
        note: demoCampaign.agreementStatus.detail,
      },
    ],
  },
  {
    id: "review",
    number: "03",
    title: "Review",
    purpose:
      "What the supplied policy set flagged, what is still open, and where the packet sits in the school's own process.",
    fields: [
      {
        label: "Applicable policy references",
        value: `${demoCampaign.policySet.name} (${demoCampaign.policySet.fictionalNote}) — rules ${demoCampaign.policySet.rules
          .map((rule) => rule.id)
          .join(", ")}`,
        status: "provided",
        note: "Policy sets are supplied to MatchPoint. MatchPoint does not author or interpret institutional policy.",
      },
      {
        label: "Outstanding questions",
        value: demoCampaign.outstandingQuestions.join(" "),
        status: "pending",
      },
      {
        label: "Handoff status",
        value: demoCampaign.handoff.status,
        status: "provided",
        note: demoCampaign.handoff.detail,
      },
      {
        label: "Disclosure status",
        value: "Handled through the school's existing process",
        status: "pending",
        note: "MatchPoint prepares information; the school's workflow records the outcome.",
      },
    ],
  },
  {
    id: "execution",
    number: "04",
    title: "Execution",
    purpose: "What actually happened, recorded as the campaign runs.",
    fields: demoCampaign.completionEvidence.items.map((item) => ({
      label: item.label,
      value: item.note ?? "—",
      status: item.status,
    })),
  },
];

/** Plain-text/Markdown export generated entirely client-side. */
export function serialisePacket(): string {
  const lines: string[] = [];
  lines.push(`# Sample evidence packet — ${demoCampaign.id}`);
  lines.push("");
  lines.push(
    "Interactive product concept. Fictional sample data. A functioning sample export is not an official integration and has not been accepted as an institutional filing by any school.",
  );
  lines.push("");
  lines.push(`Campaign: ${demoCampaign.package.name}`);
  lines.push(`Merchant: ${demoMerchantLabel}`);
  lines.push(`Window: ${demoCampaign.campaignWindow.display}`);
  lines.push(`Status: ${demoCampaign.status}`);
  lines.push("");
  lines.push("## Budget");
  lines.push(
    `- Athlete compensation pool: ${formatUsd(demoBudgetTotals.athletePool)} (${demoCampaign.athletes.length} athletes × ${formatUsd(demoBudgetTotals.perAthlete)})`,
  );
  demoCampaign.budget.otherIncludedCosts.forEach((item) => {
    lines.push(`- ${item.label}: ${formatUsd(item.amount)}`);
  });
  lines.push(
    `- MatchPoint planning and coordination: ${formatUsd(demoBudgetTotals.planningAndCoordination)}`,
  );
  lines.push(`- Illustrative total: ${formatUsd(demoBudgetTotals.total)}`);
  lines.push("");

  evidencePacket.forEach((group) => {
    lines.push(`## ${group.number} ${group.title}`);
    lines.push(`_${group.purpose}_`);
    lines.push("");
    group.fields.forEach((field) => {
      lines.push(
        `- **${field.label}** [${fieldStatusLabel[field.status]}]: ${field.value}${
          field.note ? ` — ${field.note}` : ""
        }`,
      );
    });
    lines.push("");
  });

  lines.push("## Notes");
  lines.push(
    "- Documentation support is not legal advice or a guarantee of institutional approval.",
  );
  lines.push(
    "- MatchPoint does not hold or process payments. Payment fields are recordkeeping only.",
  );
  lines.push(
    "- Statuses never include approved, compliant, or eligible. Those determinations belong to the institution.",
  );

  return lines.join("\n");
}

export const packetDisclosure =
  "Every field shows whether information was provided or verified. In this sample nothing is marked verified, because no verification source is connected.";
