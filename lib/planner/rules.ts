/**
 * Campaign planner rules — simple, readable, and pure.
 *
 * What these rules ARE: a transparent mapping from what a visitor tells us to an
 * illustrative campaign brief, using the example campaign formats.
 *
 * What they are NOT: a query against a real athlete marketplace, a live
 * availability check, a model trained on MatchPoint performance history, a
 * prediction of customer acquisition, an eligibility determination, an approval
 * of compensation, or a check against any school's unpublished policy.
 */

import {
  activityOptions,
  businessCategories,
  objectives,
  packageBySlug,
  type ActivityId,
  type BusinessCategory,
  type CampaignPackage,
  type ObjectiveId,
  type PackageSlug,
} from "@/lib/data/packages";
import {
  allocateBudget,
  type BudgetAllocation,
} from "@/lib/planner/budget";

export type PlannerInput = {
  category: BusinessCategory;
  objective: ObjectiveId;
  area: string;
  budget: number;
  packageSlug: PackageSlug | "auto";
  activities: ActivityId[];
  timeline: string;
};

export type ScheduleWeek = {
  week: string;
  focus: string;
  items: string[];
};

export type CampaignBrief = {
  objectiveLabel: string;
  objectiveHelper: string;
  categoryLabel: string;
  area: string;
  recommended: CampaignPackage;
  /** Why this format, in plain language. */
  rationale: string;
  athleteCount: number;
  athleteRoles: { number: string; role: string }[];
  deliverables: string[];
  durationWeeks: number;
  schedule: ScheduleWeek[];
  measurementPlan: string[];
  documentationChecklist: string[];
  needsConfirmation: string[];
  budget: BudgetAllocation;
  activities: ActivityId[];
};

export const defaultPlannerInput: PlannerInput = {
  category: "gym-fitness",
  objective: "membership-inquiries",
  area: "",
  budget: 1250,
  packageSlug: "auto",
  activities: ["short-form-content"],
  timeline: "next-month",
};

const labelFor = <T extends { id: string; label: string }>(
  list: readonly T[],
  id: string,
): string => list.find((item) => item.id === id)?.label ?? id;

/** Objective → starting format, with category and activity overrides. */
export function recommendPackage(input: PlannerInput): {
  pkg: CampaignPackage;
  rationale: string;
} {
  if (input.packageSlug !== "auto") {
    const chosen = packageBySlug(input.packageSlug);
    if (chosen) {
      return {
        pkg: chosen,
        rationale: `You picked ${chosen.name}, so the brief below starts from that format and adjusts to your inputs. ${chosen.objective}`,
      };
    }
  }

  if (input.activities.includes("recurring-ambassador")) {
    return {
      pkg: packageBySlug("community-ambassador")!,
      rationale:
        "You asked for recurring participation, so this brief is built around one athlete appearing month after month rather than a single burst of content.",
    };
  }

  if (
    input.objective === "clinic-registrations" ||
    input.activities.includes("youth-clinic")
  ) {
    return {
      pkg: packageBySlug("clinic-builder")!,
      rationale:
        "A clinic gives families a specific thing to register for, and registrations are the cleanest customer action to count. Promotion runs in the two weeks before the date.",
    };
  }

  if (input.category === "expansion" && input.objective === "trial-visits") {
    return {
      pkg: packageBySlug("restaurant-week")!,
      rationale:
        "For a first visit to a food or retail business, concentrating several athletes into one week makes redemptions easy to see against the weeks around it. This is an expansion category rather than our initial focus.",
    };
  }

  if (
    input.objective === "local-awareness" ||
    input.activities.includes("appearance")
  ) {
    return {
      pkg: packageBySlug("local-launch")!,
      rationale:
        "This format combines a local appearance with trackable content for your awareness goal, so there is a specific day people can show up to rather than a vague invitation.",
    };
  }

  return {
    pkg: packageBySlug("membership-drive")!,
    rationale:
      "For inquiries and trial visits, a month of coordinated content from a small athlete group — each with their own offer code — gives you both volume and a read on which athlete actually moved people.",
  };
}

function deliverablesFor(
  pkg: CampaignPackage,
  activities: ActivityId[],
  athleteCount: number,
): string[] {
  const list: string[] = [];
  const perAthlete = Math.max(
    1,
    Math.round(pkg.defaults.contentPieces / Math.max(1, pkg.defaults.athleteCount)),
  );

  if (activities.includes("short-form-content")) {
    list.push(
      `${perAthlete * athleteCount} short-form videos total (${perAthlete} per athlete)`,
    );
    list.push("One reusable photo set for your own channels, with a stated usage window");
  }
  if (activities.includes("appearance")) {
    list.push("One on-site appearance on an agreed date, 60–90 minutes");
  }
  if (activities.includes("youth-clinic")) {
    list.push("One 90-minute youth clinic, run by the athlete group");
    list.push("Registration page link and printable QR code");
  }
  if (activities.includes("recurring-ambassador")) {
    list.push("Monthly on-site visit across the campaign term");
    list.push("Two content pieces per month tied to each visit");
  }
  list.push(`${athleteCount} unique offer codes, one per athlete`);
  list.push("One campaign landing link and a simple source question for sign-ups");
  return list;
}

function scheduleFor(
  durationWeeks: number,
  activities: ActivityId[],
): ScheduleWeek[] {
  const weeks: ScheduleWeek[] = [];
  const total = Math.max(1, Math.min(16, durationWeeks));
  const isLong = total > 6;
  const steps = isLong ? 4 : total;

  for (let index = 0; index < steps; index += 1) {
    const isFirst = index === 0;
    const isLast = index === steps - 1;
    const label = isLong
      ? `Month ${String(index + 1).padStart(2, "0")}`
      : `Week ${String(index + 1).padStart(2, "0")}`;

    const items: string[] = [];
    let focus = "Build";

    if (isFirst) {
      focus = "Set up";
      items.push("Brief approved, offer codes issued, landing link live");
      if (activities.includes("appearance")) items.push("Appearance date locked");
      if (activities.includes("youth-clinic"))
        items.push("Registration page opens");
      items.push("First content published");
    } else if (isLast) {
      focus = "Close";
      items.push("Final deliverables published");
      items.push("Redemption and sign-up data collected");
      items.push("Completion evidence assembled, report prepared");
    } else {
      items.push("Content published on the agreed cadence");
      if (index === 1 && activities.includes("appearance"))
        items.push("Appearance takes place");
      if (index === 1 && activities.includes("youth-clinic"))
        items.push("Clinic takes place");
      items.push("Mid-campaign redemption count");
    }

    weeks.push({ week: label, focus, items });
  }
  return weeks;
}

function measurementFor(
  objective: ObjectiveId,
  activities: ActivityId[],
): string[] {
  const plan: string[] = [
    "One unique offer code per athlete, counted when redeemed",
    "One campaign link, so traffic from the campaign is separable",
  ];

  switch (objective) {
    case "trial-visits":
      plan.push("Trial pass issued, recorded at the front desk with the code used");
      break;
    case "membership-inquiries":
      plan.push("Inquiry form with a source field, and a source question at check-in");
      break;
    case "consultation-bookings":
      plan.push("Booking tagged to the campaign in your existing scheduling tool");
      break;
    case "clinic-registrations":
      plan.push("Registration records from the campaign link, plus an attendance list");
      break;
    case "local-awareness":
      plan.push(
        "Reach and engagement per athlete, read alongside code redemptions so awareness is not the only number",
      );
      break;
  }

  if (activities.includes("appearance") || activities.includes("youth-clinic")) {
    plan.push("Attendance count on the day, collected on site");
  }
  plan.push("Weekly redemption count you provide, reconciled at the end");
  return plan;
}

const baseDocumentation = [
  "Campaign brief stating the commercial purpose",
  "Parties, dates, and deliverables written out per athlete",
  "Compensation recorded per athlete",
  "Usage-rights window for any reusable content",
  "Draft agreement structure for review — a structural example, not a reviewed document",
  "Completion evidence collected at the end of the campaign",
];

export function buildBrief(input: PlannerInput): CampaignBrief {
  const { pkg, rationale } = recommendPackage(input);
  const activities =
    input.activities.length > 0 ? input.activities : pkg.defaults.activities;

  const durationWeeks = pkg.defaults.durationWeeks;
  const budget = allocateBudget({
    total: input.budget,
    athleteCount: pkg.defaults.athleteCount,
    activities,
  });

  const athleteCount = budget.fundedAthleteCount;
  const athleteRoles = pkg.athleteGroup
    .slice(0, athleteCount)
    .map((role, index) => ({
      number: String(index + 1).padStart(2, "0"),
      role,
    }));

  // If the budget funds more athletes than the format's example group lists,
  // extend with a neutral archetype rather than inventing specific people.
  while (athleteRoles.length < athleteCount) {
    athleteRoles.push({
      number: String(athleteRoles.length + 1).padStart(2, "0"),
      role: "Additional athlete · role set during campaign design",
    });
  }

  const needsConfirmation = [
    "Athlete availability across your dates — nothing here is a booking or a hold",
    "Athlete compensation, confirmed in a written proposal rather than this preview",
    "Your school's own review process, which we do not control or predict",
    "Whether your existing systems can report redemptions, or whether counts are manual",
    ...pkg.customisation.slice(0, 2),
  ];

  if (budget.athleteCountReduced) {
    needsConfirmation.unshift(
      `This budget funds ${athleteCount} athlete${athleteCount === 1 ? "" : "s"} at the allocation shown, fewer than the ${pkg.defaults.athleteCount} in the example format.`,
    );
  }

  return {
    objectiveLabel: labelFor(objectives, input.objective),
    objectiveHelper:
      objectives.find((item) => item.id === input.objective)?.helper ?? "",
    categoryLabel: labelFor(businessCategories, input.category),
    area: input.area.trim(),
    recommended: pkg,
    rationale,
    athleteCount,
    athleteRoles,
    deliverables: deliverablesFor(pkg, activities, athleteCount),
    durationWeeks,
    schedule: scheduleFor(durationWeeks, activities),
    measurementPlan: measurementFor(input.objective, activities),
    documentationChecklist: baseDocumentation,
    needsConfirmation,
    budget,
    activities,
  };
}

export const activityLabel = (id: ActivityId): string =>
  activityOptions.find((item) => item.id === id)?.label ?? id;

export const plannerDisclosure =
  "This preview applies simple planning rules to what you entered. It does not check athlete availability, use MatchPoint performance history, predict how many customers you will get, determine anyone's eligibility, approve compensation, or check a school's policies.";

/** Plain-text brief for the copy button and the contact handoff. */
export function serialiseBrief(brief: CampaignBrief): string {
  const lines: string[] = [];
  lines.push("MATCHPOINT — ILLUSTRATIVE CAMPAIGN BRIEF");
  lines.push("(Planning preview. Not a quote, booking, or approval.)");
  lines.push("");
  lines.push(`Business type: ${brief.categoryLabel}`);
  lines.push(`Objective: ${brief.objectiveLabel}`);
  if (brief.area) lines.push(`Area: ${brief.area}`);
  lines.push(`Recommended format: ${brief.recommended.name}`);
  lines.push(`Why: ${brief.rationale}`);
  lines.push(`Duration: ${brief.durationWeeks} weeks`);
  lines.push("");
  lines.push(`ATHLETE GROUP (${brief.athleteCount})`);
  brief.athleteRoles.forEach((role) => lines.push(`  ${role.number}  ${role.role}`));
  lines.push("");
  lines.push("DELIVERABLES");
  brief.deliverables.forEach((item) => lines.push(`  - ${item}`));
  lines.push("");
  lines.push("SCHEDULE");
  brief.schedule.forEach((week) =>
    lines.push(`  ${week.week} (${week.focus}): ${week.items.join("; ")}`),
  );
  lines.push("");
  lines.push("MEASUREMENT PLAN");
  brief.measurementPlan.forEach((item) => lines.push(`  - ${item}`));
  lines.push("");
  lines.push("BUDGET (illustrative allocation)");
  brief.budget.lines.forEach((line) =>
    lines.push(`  ${line.label}: $${line.amount.toLocaleString("en-US")}`),
  );
  lines.push(`  TOTAL: $${brief.budget.total.toLocaleString("en-US")}`);
  lines.push(
    `  Per athlete (from the compensation pool): $${brief.budget.perAthlete.toLocaleString("en-US")}`,
  );
  lines.push("  Illustrative allocation. Final scope and pricing require a proposal.");
  lines.push("");
  lines.push("DOCUMENTATION CHECKLIST");
  brief.documentationChecklist.forEach((item) => lines.push(`  - ${item}`));
  lines.push("");
  lines.push("REQUIRES CONFIRMATION");
  brief.needsConfirmation.forEach((item) => lines.push(`  - ${item}`));
  lines.push("");
  lines.push(plannerDisclosure);
  return lines.join("\n");
}
