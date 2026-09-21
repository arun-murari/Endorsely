import type { ReactNode } from "react";
import type { FieldStatus } from "@/lib/data/demoCampaign";
import { fieldStatusShort } from "@/lib/data/evidencePacket";

type ChipTone = "neutral" | "accent" | "ink" | "invert" | "warn";

const chipTone: Record<ChipTone, string> = {
  neutral: "border-rule-strong text-ink-2",
  accent: "border-lime-deep bg-lime text-ink",
  ink: "border-ink bg-ink text-paper",
  invert: "border-rule-invert text-neutral-300",
  warn: "border-ink-2 bg-paper-tint text-ink",
};

export function Chip({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
}) {
  return (
    <span
      className={`mono-label inline-flex items-center gap-1.5 border px-2 py-1 leading-none ${chipTone[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Claim label. The site separates verified facts, proposed capabilities,
 * illustrative material and future ambitions — this is how that is marked.
 */
export function ClaimLabel({
  kind,
  className = "",
}: {
  kind: "proposed" | "planned" | "sample" | "illustrative" | "future" | "fictional";
  className?: string;
}) {
  const copy: Record<string, { label: string; tone: ChipTone }> = {
    proposed: { label: "Proposed", tone: "neutral" },
    planned: { label: "Planned", tone: "neutral" },
    sample: { label: "Sample — fictional data", tone: "warn" },
    illustrative: { label: "Illustrative", tone: "neutral" },
    future: { label: "Future possibility", tone: "neutral" },
    fictional: { label: "Fictional sample", tone: "warn" },
  };
  const { label, tone } = copy[kind];
  return (
    <Chip tone={tone} className={className}>
      {label}
    </Chip>
  );
}

const statusDot: Record<FieldStatus, string> = {
  provided: "bg-ink-2",
  verified: "bg-lime-deep",
  pending: "bg-paper-tint",
  proposed: "bg-neutral-400",
  "not-applicable": "bg-neutral-300",
};

/** Per-field trust chip used in the evidence packet and checklists. */
export function StatusChip({
  status,
  full = false,
  className = "",
}: {
  status: FieldStatus;
  /** Show the long label instead of the short one. */
  full?: boolean;
  className?: string;
}) {
  const label = full
    ? status === "provided"
      ? "Provided — not independently verified"
      : fieldStatusShort[status]
    : fieldStatusShort[status];
  return (
    <span
      className={`mono-label inline-flex shrink-0 items-center gap-1.5 border border-rule-strong px-2 py-1 leading-none text-ink-2 ${className}`}
    >
      <span
        className={`inline-block h-1.5 w-1.5 border border-ink/40 ${statusDot[status]}`}
        aria-hidden
      />
      {label}
    </span>
  );
}

/** Campaign status chip — only the allowed statuses ever reach this. */
export function CampaignStatusChip({
  status,
  className = "",
}: {
  status: string;
  className?: string;
}) {
  const isAttention =
    status === "Information needed" || status === "Completion evidence pending";
  return (
    <Chip tone={isAttention ? "warn" : "ink"} className={className}>
      {status}
    </Chip>
  );
}
