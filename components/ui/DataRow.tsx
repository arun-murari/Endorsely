import type { ReactNode } from "react";

/**
 * Receipt-style row with a dotted leader between label and value.
 * Stacks under 640px so report and packet data stays readable on a phone
 * instead of scrolling sideways.
 */
export function DataRow({
  label,
  value,
  note,
  emphasis = false,
  invert = false,
  meta,
}: {
  label: ReactNode;
  value: ReactNode;
  note?: ReactNode;
  emphasis?: boolean;
  invert?: boolean;
  /** Small trailing element such as a status chip. */
  meta?: ReactNode;
}) {
  const leader = invert ? "leader-invert" : "leader";
  const labelColor = invert ? "text-neutral-300" : "text-ink-2";
  const noteColor = invert ? "text-neutral-400" : "text-neutral-600";

  return (
    <div
      className={`grid gap-1 border-t py-3 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4 ${
        invert ? "border-rule-invert" : "border-rule"
      } ${emphasis ? "font-semibold" : ""}`}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          className={`${labelColor} text-[0.9375rem] ${emphasis ? "text-ink font-semibold" : ""} ${
            emphasis && invert ? "text-paper" : ""
          }`}
        >
          {label}
        </span>
        <span className={`hidden flex-1 self-stretch sm:block ${leader}`} aria-hidden />
        {meta}
      </div>
      <span
        className={`font-mono text-[0.9375rem] tabular-nums ${
          emphasis ? (invert ? "text-lime" : "text-ink") : invert ? "text-paper" : "text-ink"
        }`}
      >
        {value}
      </span>
      {note ? (
        <p className={`measure text-[0.8125rem] leading-snug sm:col-span-2 ${noteColor}`}>
          {note}
        </p>
      ) : null}
    </div>
  );
}

/** Definition-list variant for long-form field/value pairs. */
export function FieldRow({
  label,
  value,
  note,
  meta,
}: {
  label: string;
  value: ReactNode;
  note?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="grid gap-2 border-t border-rule py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
      <dt className="mono-label flex flex-col gap-2 text-ink-2">
        <span>{label}</span>
        {meta ? <span className="flex">{meta}</span> : null}
      </dt>
      <dd className="measure text-[0.9375rem] leading-relaxed text-ink">
        {value}
        {note ? (
          <span className="mt-1.5 block text-[0.8125rem] leading-snug text-neutral-600">
            {note}
          </span>
        ) : null}
      </dd>
    </div>
  );
}
