/**
 * The ONE place forms are submitted from.
 *
 * No backend is configured. When `NEXT_PUBLIC_FORM_ENDPOINT` is unset (the
 * default), nothing is sent anywhere: the UI must say so plainly and fall back
 * to copy-and-email. When the variable is set, the payload is POSTed as JSON.
 *
 * See README.md → "Remaining configuration" for setup.
 */

import type { InquiryType } from "@/lib/site.config";

export type SubmissionPayload = {
  inquiryType: InquiryType;
  fields: Record<string, string | string[]>;
  /** Campaign brief text carried over from the planner, when present. */
  carriedBrief?: string;
  submittedAt: string;
};

export type SubmissionResult =
  | { kind: "sent"; message: string }
  | { kind: "not-configured"; message: string }
  | { kind: "error"; message: string };

export const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export const isFormEndpointConfigured = formEndpoint.length > 0;

export async function submitInquiry(
  payload: SubmissionPayload,
): Promise<SubmissionResult> {
  if (!isFormEndpointConfigured) {
    return {
      kind: "not-configured",
      message:
        "This inquiry has not been sent. No form endpoint is connected to this site yet.",
    };
  }

  try {
    const response = await fetch(formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        kind: "error",
        message: `The form endpoint responded with ${response.status}. Your details were not sent — copy them below and email instead.`,
      };
    }

    return {
      kind: "sent",
      message: "Your inquiry was sent to the configured endpoint.",
    };
  } catch {
    return {
      kind: "error",
      message:
        "The form endpoint could not be reached. Your details were not sent — copy them below and email instead.",
    };
  }
}

/** Human-readable summary used by the copy button and the mailto body. */
export function serialiseSubmission(
  payload: SubmissionPayload,
  labels: Record<string, string>,
): string {
  const lines: string[] = [];
  lines.push(`Endorsely inquiry — ${payload.inquiryType}`);
  lines.push("");
  Object.entries(payload.fields).forEach(([key, value]) => {
    const label = labels[key] ?? key;
    const printed = Array.isArray(value) ? value.join(", ") : value;
    if (printed) lines.push(`${label}: ${printed}`);
  });
  if (payload.carriedBrief) {
    lines.push("");
    lines.push("--- Campaign brief carried from the planner ---");
    lines.push(payload.carriedBrief);
  }
  return lines.join("\n");
}
