import type { ReactNode } from "react";

/**
 * Track-lane motif: a set of repeating hairlines with optional lane numbers.
 * Used as a structural divider rather than decoration.
 */
export function LaneRule({
  lanes = 4,
  invert = false,
  numbered = false,
  className = "",
}: {
  lanes?: number;
  invert?: boolean;
  numbered?: boolean;
  className?: string;
}) {
  const border = invert ? "border-rule-invert" : "border-rule";
  return (
    <div className={`w-full ${className}`} aria-hidden>
      {Array.from({ length: lanes }).map((_, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 border-t ${border} ${
            index === 0 ? "border-t-2" : ""
          }`}
          style={{ height: `${6 + index * 2}px` }}
        >
          {numbered ? (
            <span
              className={`mono-label -translate-y-2 ${
                invert ? "text-neutral-500" : "text-neutral-400"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** Court-geometry corner brackets around any block of content. */
export function Bracketed({
  children,
  invert = false,
  className = "",
  accent = false,
}: {
  children: ReactNode;
  invert?: boolean;
  className?: string;
  /** Tint the top-left bracket with the accent. */
  accent?: boolean;
}) {
  const line = invert ? "border-rule-invert" : "border-rule-strong";
  const corner = "pointer-events-none absolute h-4 w-4";
  return (
    <div className={`relative ${className}`}>
      <span
        className={`${corner} left-0 top-0 border-l-2 border-t-2 ${
          accent ? "border-lime-deep" : line
        }`}
        aria-hidden
      />
      <span className={`${corner} right-0 top-0 border-r-2 border-t-2 ${line}`} aria-hidden />
      <span
        className={`${corner} bottom-0 left-0 border-b-2 border-l-2 ${line}`}
        aria-hidden
      />
      <span
        className={`${corner} bottom-0 right-0 border-b-2 border-r-2 ${line}`}
        aria-hidden
      />
      {children}
    </div>
  );
}

/** Roster / stage number set in mono with a lane rule beneath it. */
export function RosterNumber({
  value,
  size = "md",
  invert = false,
  className = "",
}: {
  value: string;
  size?: "sm" | "md" | "lg";
  invert?: boolean;
  className?: string;
}) {
  const sizes = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-[clamp(2rem,4vw,3rem)]",
  } as const;
  return (
    <span
      className={`block font-mono tabular-nums leading-none ${sizes[size]} ${
        invert ? "text-lime" : "text-ink"
      } ${className}`}
    >
      {value}
    </span>
  );
}

/** Small inline icons, hand-rolled. No icon package. */
export function Icon({
  name,
  className = "h-4 w-4",
}: {
  name: "arrow-right" | "arrow-down" | "check" | "copy" | "download" | "menu" | "close" | "alert" | "external";
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };
  switch (name) {
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
        </svg>
      );
    case "arrow-down":
      return (
        <svg {...common}>
          <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M3 8.5 6.5 12 13 4.5" />
        </svg>
      );
    case "copy":
      return (
        <svg {...common}>
          <rect x="5.5" y="5.5" width="8" height="8" />
          <path d="M10.5 2.5h-8v8" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M2.5 13.5h11" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M2 4.5h12M2 8h12M2 11.5h12" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
        </svg>
      );
    case "alert":
      return (
        <svg {...common}>
          <path d="M8 2.5 15 13.5H1L8 2.5ZM8 6.5v3.2M8 11.6v.4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M6.5 2.5h7v7M13.5 2.5 7 9M11 13.5H2.5V5" />
        </svg>
      );
  }
}
