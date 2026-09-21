"use client";

import { useSearchParams } from "next/navigation";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { isInquiryType } from "@/lib/forms/config";

/**
 * Reads `?type=business|athlete|school` so audience CTAs and the planner arrive
 * with the right inquiry preselected. Kept separate so the page can wrap it in a
 * Suspense boundary for the static export build.
 */
export function ContactLoader() {
  const params = useSearchParams();
  const requested = params.get("type") ?? undefined;
  return <InquiryForm initialType={isInquiryType(requested) ? requested : "business"} />;
}
