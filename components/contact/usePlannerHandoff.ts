"use client";

import { useSyncExternalStore } from "react";
import {
  clearPlannerHandoff,
  HANDOFF_KEY,
  type PlannerHandoff,
} from "@/lib/planner/handoff";

/**
 * Tiny external store around the planner handoff in sessionStorage.
 *
 * Using `useSyncExternalStore` keeps the read out of an effect (the codebase
 * lints against setState inside effects) and gives a stable server snapshot of
 * `null`, so static prerendering and hydration agree.
 */

let cache: { raw: string | null; value: PlannerHandoff | null } = {
  raw: null,
  value: null,
};

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function snapshot(): PlannerHandoff | null {
  let raw: string | null = null;
  try {
    raw = window.sessionStorage.getItem(HANDOFF_KEY);
  } catch {
    raw = null;
  }
  if (raw === cache.raw) return cache.value;

  let value: PlannerHandoff | null = null;
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "summary" in parsed &&
        "briefText" in parsed
      ) {
        value = parsed as PlannerHandoff;
      }
    } catch {
      value = null;
    }
  }
  cache = { raw, value };
  return value;
}

export function usePlannerHandoff(): PlannerHandoff | null {
  return useSyncExternalStore(subscribe, snapshot, () => null);
}

export function discardPlannerHandoff(): void {
  clearPlannerHandoff();
  cache = { raw: null, value: null };
  listeners.forEach((listener) => listener());
}
