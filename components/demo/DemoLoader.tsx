"use client";

import { useSearchParams } from "next/navigation";
import { DemoExperience } from "@/components/demo/DemoExperience";

/**
 * Reads `?view=institutional`, which the campaign planner deep-links to. Kept in
 * its own client component so the page can wrap it in a Suspense boundary and
 * still build as a static export.
 */
export function DemoLoader() {
  const params = useSearchParams();
  const requested = params.get("view");
  return (
    <DemoExperience
      initialPerspective={requested === "institutional" ? "institutional" : "merchant"}
    />
  );
}
