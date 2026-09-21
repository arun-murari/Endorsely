/**
 * Carrying planner state between routes.
 *
 * The planner writes a small JSON payload to sessionStorage; /contact and /demo
 * read it back. Nothing is persisted beyond the browser session and nothing is
 * sent anywhere — this is purely so a visitor does not have to retype what they
 * already told the planner.
 */

import type { CampaignBrief, PlannerInput } from "@/lib/planner/rules";

export const HANDOFF_KEY = "matchpoint:planner-handoff";

export type PlannerHandoff = {
  input: PlannerInput;
  /** Plain-text brief, ready to drop into a message. */
  briefText: string;
  summary: {
    objective: string;
    category: string;
    area: string;
    packageName: string;
    athleteCount: number;
    total: number;
    perAthlete: number;
    durationWeeks: number;
  };
  savedAt: string;
};

export function buildHandoff(
  input: PlannerInput,
  brief: CampaignBrief,
  briefText: string,
): PlannerHandoff {
  return {
    input,
    briefText,
    summary: {
      objective: brief.objectiveLabel,
      category: brief.categoryLabel,
      area: brief.area,
      packageName: brief.recommended.name,
      athleteCount: brief.athleteCount,
      total: brief.budget.total,
      perAthlete: brief.budget.perAthlete,
      durationWeeks: brief.durationWeeks,
    },
    savedAt: new Date().toISOString(),
  };
}

export function savePlannerHandoff(handoff: PlannerHandoff): void {
  try {
    window.sessionStorage.setItem(HANDOFF_KEY, JSON.stringify(handoff));
  } catch {
    // Private-mode or storage-disabled browsers simply lose the convenience.
  }
}

export function readPlannerHandoff(): PlannerHandoff | null {
  try {
    const raw = window.sessionStorage.getItem(HANDOFF_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "summary" in parsed &&
      "briefText" in parsed
    ) {
      return parsed as PlannerHandoff;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearPlannerHandoff(): void {
  try {
    window.sessionStorage.removeItem(HANDOFF_KEY);
  } catch {
    // no-op
  }
}
