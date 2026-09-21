import type { ReactNode } from "react";

/**
 * Artifact frame: the printed-document look used for campaign cards, sample
 * reports and evidence packets. Square corners, hairline border, mono header —
 * closer to a scorecard than to a web card.
 */
export function Artifact({
  title,
  meta,
  children,
  footer,
  invert = false,
  perforated = false,
  className = "",
}: {
  title: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  invert?: boolean;
  /** Receipt-style perforated bottom edge. */
  perforated?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${
        invert
          ? "border-rule-invert bg-ink-soft text-paper on-ink"
          : "border-ink/25 bg-paper text-ink"
      } border ${perforated ? "perforate-b pb-3" : ""} ${className}`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2.5 sm:px-5 ${
          invert ? "border-rule-invert" : "border-rule"
        }`}
      >
        <p className={`mono-label ${invert ? "text-neutral-300" : "text-ink-2"}`}>
          {title}
        </p>
        {meta}
      </div>
      <div className="px-4 py-4 sm:px-5 sm:py-5">{children}</div>
      {footer ? (
        <div
          className={`border-t px-4 py-3 sm:px-5 ${
            invert ? "border-rule-invert" : "border-rule"
          }`}
        >
          {footer}
        </div>
      ) : null}
    </div>
  );
}

/** Week-strip timeline: campaign-schedule motif. */
export function WeekStrip({
  weeks,
  invert = false,
  className = "",
}: {
  weeks: { week: string; focus?: string; items: string[] }[];
  invert?: boolean;
  className?: string;
}) {
  return (
    <ol
      className={`grid gap-0 border-t sm:grid-flow-col sm:auto-cols-fr ${
        invert ? "border-rule-invert" : "border-rule-strong"
      } ${className}`}
    >
      {weeks.map((week, index) => (
        <li
          key={week.week}
          className={`border-b px-0 py-4 sm:border-b-0 sm:border-l sm:px-4 sm:first:border-l-0 sm:first:pl-0 ${
            invert ? "border-rule-invert" : "border-rule"
          }`}
        >
          <div className="flex items-baseline gap-2">
            <span
              className={`font-mono text-sm tabular-nums ${
                invert ? "text-lime" : "text-ink"
              }`}
            >
              {week.week}
            </span>
            {week.focus ? (
              <span
                className={`mono-label ${invert ? "text-neutral-400" : "text-neutral-600"}`}
              >
                {week.focus}
              </span>
            ) : null}
          </div>
          <span
            className={`mt-2 block h-[2px] w-full ${
              index === 0 ? "bg-lime" : invert ? "bg-white/20" : "bg-ink/20"
            }`}
            aria-hidden
          />
          <ul
            className={`mt-3 space-y-1.5 text-[0.8125rem] leading-snug ${
              invert ? "text-neutral-300" : "text-ink-2"
            }`}
          >
            {week.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span
                  className={`mt-[0.45rem] h-1 w-1 shrink-0 ${
                    invert ? "bg-neutral-500" : "bg-neutral-400"
                  }`}
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

/** Simple bulleted list with lane-hairline separators. */
export function RuleList({
  items,
  invert = false,
  className = "",
}: {
  items: ReactNode[];
  invert?: boolean;
  className?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li
          key={index}
          className={`flex gap-3 border-t py-2.5 text-[0.9375rem] leading-snug ${
            invert ? "border-rule-invert text-neutral-300" : "border-rule text-ink-2"
          }`}
        >
          <span
            className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 bg-lime-deep"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
