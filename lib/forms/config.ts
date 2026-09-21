/**
 * Field definitions per inquiry type. Each form collects only what that inquiry
 * actually needs. We never ask for identity documents, financial account
 * details, health information, or institutional athlete records.
 */

import type { InquiryType } from "@/lib/site.config";

export type FieldKind = "text" | "email" | "textarea" | "select" | "checkboxes";

export type FormField = {
  name: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  placeholder?: string;
  helper?: string;
  options?: { value: string; label: string }[];
  autoComplete?: string;
};

export type InquiryForm = {
  type: InquiryType;
  label: string;
  /** Short description of who this is for. */
  audience: string;
  /** What happens next, honestly stated. */
  expectation: string;
  submitLabel: string;
  fields: FormField[];
};

const nameField: FormField = {
  name: "name",
  label: "Your name",
  kind: "text",
  required: true,
  autoComplete: "name",
};

const emailField: FormField = {
  name: "email",
  label: "Email",
  kind: "email",
  required: true,
  autoComplete: "email",
  helper: "Used only to reply to this inquiry.",
};

export const inquiryForms: Record<InquiryType, InquiryForm> = {
  business: {
    type: "business",
    label: "Business inquiry",
    audience:
      "Gyms, studios, therapy and recovery businesses, youth-sports organisations.",
    expectation:
      "We would reply to talk through a campaign, what it would involve, and what it would cost. Nothing is booked or committed by sending this.",
    submitLabel: "Request a campaign proposal",
    fields: [
      nameField,
      emailField,
      {
        name: "business",
        label: "Business name",
        kind: "text",
        required: true,
        autoComplete: "organization",
      },
      {
        name: "category",
        label: "Business type",
        kind: "select",
        required: true,
        options: [
          { value: "gym-fitness", label: "Gym or fitness studio" },
          {
            value: "therapy-recovery",
            label: "Physical therapy, recovery, or wellness",
          },
          { value: "youth-sports", label: "Youth-sports organisation" },
          { value: "expansion", label: "Another local business" },
        ],
      },
      {
        name: "area",
        label: "City or campus area",
        kind: "text",
        placeholder: "Where your customers come from",
      },
      {
        name: "objective",
        label: "What you want the campaign to do",
        kind: "select",
        options: [
          { value: "trial-visits", label: "Trial visits" },
          { value: "membership-inquiries", label: "Membership inquiries" },
          { value: "consultation-bookings", label: "Consultation bookings" },
          { value: "clinic-registrations", label: "Clinic registrations" },
          { value: "local-awareness", label: "Local awareness" },
        ],
      },
      {
        name: "budgetRange",
        label: "Rough budget range you are considering",
        kind: "select",
        helper:
          "A range helps us shape scope. Pricing is not settled, so this is not a quote.",
        options: [
          { value: "under-500", label: "Under $500" },
          { value: "500-1000", label: "$500 – $1,000" },
          { value: "1000-2500", label: "$1,000 – $2,500" },
          { value: "2500-plus", label: "$2,500 +" },
          { value: "unsure", label: "Not sure yet" },
        ],
      },
      {
        name: "notes",
        label: "Anything else about the campaign",
        kind: "textarea",
        placeholder: "Timing, the offer you have in mind, questions you have.",
      },
    ],
  },
  athlete: {
    type: "athlete",
    label: "Athlete interest",
    audience: "College athletes interested in local campaign work.",
    expectation:
      "Expressing interest is not a commitment, an offer, or a placement. A large social following is not required, and nothing here determines your eligibility — that follows your school's own process.",
    submitLabel: "Express interest",
    fields: [
      nameField,
      emailField,
      {
        name: "school",
        label: "School",
        kind: "text",
        required: true,
        helper: "So we understand which campus process would apply.",
      },
      {
        name: "sport",
        label: "Sport",
        kind: "text",
        required: true,
      },
      {
        name: "location",
        label: "Location",
        kind: "text",
        placeholder: "City or area where you are based during the term",
      },
      {
        name: "interests",
        label: "Relevant interests and experience",
        kind: "textarea",
        placeholder:
          "Coaching or clinic experience, nutrition, recovery, local clubs you are part of.",
      },
      {
        name: "activities",
        label: "Activities you are interested in",
        kind: "checkboxes",
        options: [
          { value: "short-form-content", label: "Short-form content" },
          { value: "appearance", label: "Store or studio appearances" },
          { value: "youth-clinic", label: "Youth clinics and instruction" },
          {
            value: "recurring-ambassador",
            label: "Recurring ambassador participation",
          },
        ],
      },
      {
        name: "social",
        label: "Social profile (optional)",
        kind: "text",
        placeholder: "A link, if you want to share one",
        helper: "Optional. Follower count is not how opportunities are assigned.",
      },
    ],
  },
  school: {
    type: "school",
    label: "School or partner inquiry",
    audience:
      "Athletic compliance offices, athletic departments, regional collectives, and institutional partners.",
    expectation:
      "We would reply to walk through the proposed workflow and the sample packet. Endorsely is pre-launch and has no institutional relationships, permissions, or integrations.",
    submitLabel: "Start a partnership conversation",
    fields: [
      nameField,
      emailField,
      {
        name: "organisation",
        label: "Institution or organisation",
        kind: "text",
        required: true,
        autoComplete: "organization",
      },
      {
        name: "role",
        label: "Your role",
        kind: "text",
        placeholder: "Compliance coordinator, athletic administrator, collective lead",
      },
      {
        name: "topic",
        label: "What you want to discuss",
        kind: "select",
        required: true,
        options: [
          { value: "campus-pilot", label: "Campus pilot" },
          {
            value: "department-workflow",
            label: "Athletic department workflow",
          },
          {
            value: "collective-partnership",
            label: "Regional collective partnership",
          },
          {
            value: "licensing",
            label: "Institutional licensing discussion",
          },
        ],
      },
      {
        name: "notes",
        label: "Context or questions",
        kind: "textarea",
        placeholder:
          "How campaign information reaches you today, and what is usually missing.",
      },
    ],
  },
};

export const inquiryTypes = Object.values(inquiryForms).map((form) => ({
  type: form.type,
  label: form.label,
}));

export function isInquiryType(value: string | undefined): value is InquiryType {
  return value === "business" || value === "athlete" || value === "school";
}

export const privacyNote =
  "We ask only for what an inquiry needs. Never send identity documents, financial account details, health information, or institutional athlete records.";
