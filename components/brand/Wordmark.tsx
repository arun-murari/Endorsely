/**
 * ENDORSELY wordmark: condensed uppercase type split by a lime square, which
 * carries the accent through the lockup. Built from styled text so it inherits
 * the display face and stays crisp at any size.
 */
export function Wordmark({
  size = "md",
  invert = false,
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  invert?: boolean;
  className?: string;
}) {
  const sizes = {
    sm: { text: "text-[1.05rem]", square: "h-[0.5rem] w-[0.5rem]", gap: "gap-[0.28rem]" },
    md: { text: "text-[1.4rem]", square: "h-[0.6rem] w-[0.6rem]", gap: "gap-[0.34rem]" },
    lg: { text: "text-[2.2rem]", square: "h-[0.95rem] w-[0.95rem]", gap: "gap-[0.5rem]" },
  } as const;
  const s = sizes[size];

  return (
    <span
      className={`display inline-flex items-center ${s.gap} ${s.text} leading-none tracking-[-0.02em] ${
        invert ? "text-paper" : "text-ink"
      } ${className}`}
    >
      <span className="sr-only">Endorsely</span>
      <span aria-hidden>Endorse</span>
      <span className={`${s.square} shrink-0 bg-lime`} aria-hidden />
      <span aria-hidden>ly</span>
    </span>
  );
}

/** The standalone square mark, used where the full lockup will not fit. */
export function SquareMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <rect x="0" y="0" width="24" height="24" fill="var(--color-ink)" />
      <rect x="6" y="6" width="12" height="12" fill="var(--color-lime)" />
      <rect x="6" y="19" width="12" height="1.5" fill="var(--color-lime)" opacity="0.5" />
    </svg>
  );
}
