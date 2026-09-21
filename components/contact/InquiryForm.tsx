"use client";

import { useId, useState } from "react";
import {
  discardPlannerHandoff,
  usePlannerHandoff,
} from "@/components/contact/usePlannerHandoff";
import { Artifact } from "@/components/ui/Artifact";
import { ActionButton } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { CopyButton } from "@/components/ui/CopyButton";
import { DataRow } from "@/components/ui/DataRow";
import { Bracketed, Icon } from "@/components/ui/Marks";
import {
  inquiryForms,
  inquiryTypes,
  privacyNote,
  type FormField,
} from "@/lib/forms/config";
import {
  isFormEndpointConfigured,
  serialiseSubmission,
  submitInquiry,
  type SubmissionResult,
} from "@/lib/forms/submit";
import type { PlannerHandoff } from "@/lib/planner/handoff";
import { mailtoLink, siteConfig, type InquiryType } from "@/lib/site.config";

type Values = Record<string, string | string[]>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function budgetRangeFor(total: number): string {
  if (total < 500) return "under-500";
  if (total <= 1000) return "500-1000";
  if (total <= 2500) return "1000-2500";
  return "2500-plus";
}

function emptyValues(type: InquiryType, handoff: PlannerHandoff | null): Values {
  const values: Values = {};
  inquiryForms[type].fields.forEach((field) => {
    values[field.name] =
      field.kind === "checkboxes"
        ? []
        : field.kind === "select"
          ? (field.options?.[0]?.value ?? "")
          : "";
  });

  // Carry over what the planner already collected.
  if (type === "business" && handoff) {
    values.category = handoff.input.category;
    values.objective = handoff.input.objective;
    values.area = handoff.summary.area;
    values.budgetRange = budgetRangeFor(handoff.summary.total);
  }
  return values;
}

/**
 * One form for all three inquiry types. No backend is connected, so submitting
 * never claims to have sent anything: it validates, then hands the visitor their
 * own details to copy or email.
 */
export function InquiryForm({
  initialType = "business",
  fixedType,
}: {
  initialType?: InquiryType;
  /** Lock the form to one inquiry type (used on /athletes). */
  fixedType?: InquiryType;
}) {
  const ids = useId();
  const handoff = usePlannerHandoff();
  const [type, setType] = useState<InquiryType>(fixedType ?? initialType);
  const [values, setValues] = useState<Values>(() =>
    emptyValues(fixedType ?? initialType, handoff),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = inquiryForms[type];
  const carriedBrief = type === "business" ? handoff?.briefText : undefined;

  const switchType = (next: InquiryType) => {
    setType(next);
    setValues(emptyValues(next, handoff));
    setErrors({});
    setResult(null);
  };

  const setValue = (name: string, value: string | string[]) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const toggleCheckbox = (name: string, option: string) => {
    const current = values[name];
    const list = Array.isArray(current) ? current : [];
    setValue(
      name,
      list.includes(option)
        ? list.filter((item) => item !== option)
        : [...list, option],
    );
  };

  const validate = (): Record<string, string> => {
    const found: Record<string, string> = {};
    form.fields.forEach((field) => {
      const value = values[field.name];
      const filled = Array.isArray(value) ? value.length > 0 : String(value ?? "").trim() !== "";
      if (field.required && !filled) {
        found[field.name] = `${field.label} is required.`;
        return;
      }
      if (field.kind === "email" && filled && !emailPattern.test(String(value))) {
        found[field.name] = "Enter an email address in the form name@example.com.";
      }
    });
    return found;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setResult(null);
      const firstName = form.fields.find((field) => found[field.name])?.name;
      if (firstName) {
        document.getElementById(`${ids}-${firstName}`)?.focus();
      }
      return;
    }
    setSubmitting(true);
    const outcome = await submitInquiry({
      inquiryType: type,
      fields: values,
      carriedBrief,
      submittedAt: new Date().toISOString(),
    });
    setSubmitting(false);
    setResult(outcome);
  };

  const labels: Record<string, string> = Object.fromEntries(
    form.fields.map((field) => [field.name, field.label]),
  );
  const summaryText = serialiseSubmission(
    {
      inquiryType: type,
      fields: values,
      carriedBrief,
      submittedAt: new Date().toISOString(),
    },
    labels,
  );

  const errorList = form.fields.filter((field) => errors[field.name]);

  return (
    <div>
      {fixedType ? null : (
        <fieldset className="border-t-2 border-ink pt-4">
          <legend className="mono-label text-ink-2">What is this about?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {inquiryTypes.map((option) => {
              const selected = option.type === type;
              return (
                <div key={option.type}>
                  <input
                    type="radio"
                    id={`${ids}-type-${option.type}`}
                    name={`${ids}-type`}
                    className="peer sr-only"
                    checked={selected}
                    onChange={() => switchType(option.type)}
                  />
                  <label
                    htmlFor={`${ids}-type-${option.type}`}
                    className={`display-tight inline-flex cursor-pointer items-center gap-2 border px-4 py-2 text-[1.0625rem] peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime ${
                      selected
                        ? "border-ink bg-ink text-paper"
                        : "border-rule-strong text-ink-2 hover:border-ink hover:text-ink"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 shrink-0 border ${
                        selected ? "border-lime bg-lime" : "border-rule-strong"
                      }`}
                      aria-hidden
                    />
                    {option.label}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      )}

      <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-ink-2">
        {form.expectation}
      </p>

      {carriedBrief && handoff ? (
        <Artifact
          className="mt-8"
          title="Carried over from the planner"
          meta={<Chip tone="warn">Illustrative</Chip>}
        >
          <div className="-mt-3">
            <DataRow label="Objective" value={handoff.summary.objective} />
            <DataRow label="Business type" value={handoff.summary.category} />
            {handoff.summary.area ? (
              <DataRow label="Area" value={handoff.summary.area} />
            ) : null}
            <DataRow label="Format" value={handoff.summary.packageName} />
            <DataRow
              label="Athlete group"
              value={String(handoff.summary.athleteCount)}
            />
            <DataRow
              label="Duration"
              value={`${handoff.summary.durationWeeks} weeks`}
            />
            <DataRow
              label="Illustrative total"
              value={`$${handoff.summary.total.toLocaleString("en-US")}`}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <p className="text-[0.8125rem] leading-snug text-neutral-600">
              Read-only. It travels with your message so you do not have to retype
              it, and it is not a quote or a booking.
            </p>
            <ActionButton
              type="button"
              variant="quiet"
              onClick={() => {
                discardPlannerHandoff();
                setValues(emptyValues(type, null));
              }}
            >
              Clear this brief
            </ActionButton>
          </div>
        </Artifact>
      ) : null}

      <form className="mt-8" onSubmit={onSubmit} noValidate>
        {errorList.length > 0 ? (
          <div
            role="alert"
            className="mb-6 border-l-2 border-ink bg-paper-tint p-4"
          >
            <p className="display-tight text-[1.05rem]">
              {errorList.length === 1
                ? "One field needs attention"
                : `${errorList.length} fields need attention`}
            </p>
            <ul className="mt-2 space-y-1">
              {errorList.map((field) => (
                <li key={field.name} className="text-[0.875rem] text-ink-2">
                  {errors[field.name]}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {form.fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            idPrefix={ids}
            value={values[field.name]}
            error={errors[field.name]}
            onText={(value) => setValue(field.name, value)}
            onToggle={(option) => toggleCheckbox(field.name, option)}
          />
        ))}

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-ink/25 pt-6">
          <ActionButton type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Checking…" : form.submitLabel}
          </ActionButton>
          {!isFormEndpointConfigured ? (
            <p className="mono-label text-neutral-600">
              No form endpoint connected — nothing is transmitted
            </p>
          ) : null}
        </div>
        <p className="measure mt-4 text-[0.8125rem] leading-snug text-neutral-600">
          {privacyNote}
        </p>
      </form>

      {result ? (
        <Bracketed className="mt-10 p-5" accent>
          <div className="flex flex-wrap items-center gap-3">
            <Icon name="alert" className="h-4 w-4 text-ink-2" />
            <p className="display-tight text-[1.2rem]">
              {result.kind === "sent"
                ? "Sent to the configured endpoint"
                : "Your inquiry has not been sent"}
            </p>
          </div>
          <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
            {result.message}
            {result.kind !== "sent"
              ? " Copy your details below and email them, and they will reach us as soon as a real inbox is connected."
              : ""}
          </p>

          <div className="mt-5 border border-rule-strong bg-paper p-4">
            <p className="mono-label text-neutral-600">What you filled in</p>
            <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap font-mono text-[0.8125rem] leading-relaxed text-ink">
              {summaryText}
            </pre>
          </div>

          <div className="mt-5 flex flex-wrap items-start gap-x-6 gap-y-4">
            <CopyButton
              text={summaryText}
              label="Copy my details"
              copiedLabel="Details copied"
              variant="primary"
            />
            <a
              href={mailtoLink(
                `${form.label} — ${siteConfig.name}`,
                summaryText,
              )}
              className="display-tight inline-flex items-center gap-2 border border-ink-2 px-5 py-2.5 text-[1.0625rem] text-ink hover:bg-ink hover:text-paper"
            >
              Email {siteConfig.contactEmail}
              <Icon name="arrow-right" className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-[0.8125rem] leading-snug text-neutral-600">
            {siteConfig.contactEmail} is a placeholder address while the site is
            pre-launch.
          </p>
        </Bracketed>
      ) : null}
    </div>
  );
}

function Field({
  field,
  idPrefix,
  value,
  error,
  onText,
  onToggle,
}: {
  field: FormField;
  idPrefix: string;
  value: string | string[] | undefined;
  error?: string;
  onText: (value: string) => void;
  onToggle: (option: string) => void;
}) {
  const id = `${idPrefix}-${field.name}`;
  const describedBy = [
    field.helper ? `${id}-helper` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  if (field.kind === "checkboxes") {
    const list = Array.isArray(value) ? value : [];
    return (
      <fieldset className="border-t border-ink/25 py-5">
        <legend className="mono-label text-ink-2">{field.label}</legend>
        <div className="mt-3 space-y-2.5">
          {field.options?.map((option) => (
            <div key={option.value} className="flex gap-3">
              <input
                type="checkbox"
                id={`${id}-${option.value}`}
                className="mt-1 h-4 w-4 shrink-0 accent-lime-deep"
                checked={list.includes(option.value)}
                onChange={() => onToggle(option.value)}
              />
              <label
                htmlFor={`${id}-${option.value}`}
                className="text-[0.9375rem] leading-snug text-ink"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {field.helper ? (
          <p id={`${id}-helper`} className="mt-2 text-[0.8125rem] text-neutral-600">
            {field.helper}
          </p>
        ) : null}
      </fieldset>
    );
  }

  return (
    <div className="border-t border-ink/25 py-5">
      <label htmlFor={id} className="mono-label block text-ink-2">
        {field.label}
        {field.required ? (
          <span className="ml-1.5 text-lime-deep" aria-hidden>
            *
          </span>
        ) : null}
        {field.required ? <span className="sr-only"> (required)</span> : null}
      </label>

      {field.kind === "textarea" ? (
        <textarea
          id={id}
          rows={4}
          className="field-input mt-2"
          placeholder={field.placeholder}
          value={String(value ?? "")}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          onChange={(event) => onText(event.target.value)}
        />
      ) : field.kind === "select" ? (
        <select
          id={id}
          className="field-input mt-2"
          value={String(value ?? "")}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          onChange={(event) => onText(event.target.value)}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={field.kind === "email" ? "email" : "text"}
          className="field-input mt-2"
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          value={String(value ?? "")}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          onChange={(event) => onText(event.target.value)}
        />
      )}

      {field.helper ? (
        <p id={`${id}-helper`} className="mt-1.5 text-[0.8125rem] leading-snug text-neutral-600">
          {field.helper}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink"
        >
          <Icon name="alert" className="h-3.5 w-3.5" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
