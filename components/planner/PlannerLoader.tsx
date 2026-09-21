"use client";

import { useSearchParams } from "next/navigation";
import { CampaignPlanner } from "@/components/planner/CampaignPlanner";
import { packageBySlug, type PackageSlug } from "@/lib/data/packages";

/**
 * Reads `?package=<slug>` so a format CTA opens the planner with that format
 * preselected. Isolated in its own client component so the Suspense boundary in
 * the page keeps the static export build happy.
 */
export function PlannerLoader() {
  const params = useSearchParams();
  const requested = params.get("package");
  const preselected: PackageSlug | null =
    requested && packageBySlug(requested)
      ? (requested as PackageSlug)
      : null;

  // Remount when the requested format changes so the form resets to its defaults.
  return <CampaignPlanner key={preselected ?? "auto"} preselectedPackage={preselected} />;
}
