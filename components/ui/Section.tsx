import type { ElementType, ReactNode } from "react";

type Tone = "paper" | "tint" | "ink";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  tint: "bg-paper-tint text-ink",
  ink: "bg-ink text-paper on-ink",
};

/**
 * Page section shell. Deliberately minimal: it owns the surface, the vertical
 * rhythm and the container, and nothing about inner composition — each section
 * on the site arranges itself differently.
 */
export function Section({
  children,
  tone = "paper",
  id,
  className = "",
  bleed = false,
  as: Tag = "section",
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  /** Full-bleed band: the surface runs edge to edge. */
  bleed?: boolean;
  as?: ElementType;
  labelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={`${toneClass[tone]} ${bleed ? "w-full" : ""} ${className}`}
    >
      <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12">
        {children}
      </div>
    </Tag>
  );
}

export function Eyebrow({
  children,
  tone = "ink",
  className = "",
}: {
  children: ReactNode;
  tone?: "ink" | "muted" | "invert";
  className?: string;
}) {
  const color =
    tone === "muted"
      ? "text-neutral-600"
      : tone === "invert"
        ? "text-neutral-400"
        : "text-ink-2";
  return (
    <p className={`mono-label ${color} ${className}`}>
      <span className="mr-2 inline-block h-2 w-2 translate-y-[1px] bg-lime" aria-hidden />
      {children}
    </p>
  );
}

export function DisplayHeading({
  children,
  level = 2,
  size = "lg",
  className = "",
  id,
}: {
  children: ReactNode;
  level?: 1 | 2 | 3;
  size?: "hero" | "xl" | "lg" | "md" | "sm";
  className?: string;
  id?: string;
}) {
  const Tag = (`h${level}` as const) satisfies ElementType;
  const sizes: Record<string, string> = {
    hero: "text-[clamp(3.25rem,11.5vw,9.5rem)]",
    xl: "text-[clamp(2.5rem,7vw,5.5rem)]",
    lg: "text-[clamp(2rem,4.6vw,3.5rem)]",
    md: "text-[clamp(1.6rem,3vw,2.35rem)]",
    sm: "text-[clamp(1.25rem,2vw,1.6rem)]",
  };
  return (
    <Tag id={id} className={`display ${sizes[size]} ${className}`}>
      {children}
    </Tag>
  );
}

/** Body copy held to an editorial measure. */
export function Lede({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`measure text-[1.0625rem] leading-relaxed sm:text-lg ${className}`}>
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  heading,
  lede,
  size = "lg",
  tone = "ink",
  headingId,
  className = "",
}: {
  eyebrow?: string;
  heading: ReactNode;
  lede?: ReactNode;
  size?: "xl" | "lg" | "md";
  tone?: "ink" | "invert";
  headingId?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? (
        <Eyebrow tone={tone === "invert" ? "invert" : "muted"}>{eyebrow}</Eyebrow>
      ) : null}
      <DisplayHeading id={headingId} size={size} className="mt-4">
        {heading}
      </DisplayHeading>
      {lede ? (
        <Lede
          className={`mt-5 ${tone === "invert" ? "text-neutral-300" : "text-ink-2"}`}
        >
          {lede}
        </Lede>
      ) : null}
    </div>
  );
}
