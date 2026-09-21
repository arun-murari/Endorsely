import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon } from "@/components/ui/Marks";

type Variant = "primary" | "secondary" | "onInk" | "quiet";

const base =
  "inline-flex items-center justify-center gap-2 border px-5 py-2.5 display-tight text-[1.0625rem] tracking-[0.02em] transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary: "border-ink bg-ink text-paper hover:bg-lime hover:border-lime hover:text-ink",
  secondary: "border-ink-2 bg-transparent text-ink hover:bg-ink hover:text-paper",
  onInk: "border-lime bg-lime text-ink hover:bg-paper hover:border-paper",
  quiet:
    "border-transparent bg-transparent px-0 py-1 text-ink hover:text-ink-2 underline-grow",
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  withArrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      {withArrow ? <Icon name="arrow-right" className="h-4 w-4" /> : null}
    </Link>
  );
}

export function ActionButton({
  children,
  variant = "secondary",
  withIcon,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  withIcon?: "copy" | "download" | "check" | "arrow-right";
}) {
  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} disabled:opacity-60 ${className}`}
    >
      {withIcon ? <Icon name={withIcon} className="h-4 w-4" /> : null}
      <span>{children}</span>
    </button>
  );
}

/** Text link with the growing accent underline. */
export function TextLink({
  href,
  children,
  invert = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`underline-grow inline-flex items-center gap-1.5 font-medium ${
        invert ? "text-paper" : "text-ink"
      } ${className}`}
    >
      <span>{children}</span>
      <Icon name="arrow-right" className="h-3.5 w-3.5" />
    </Link>
  );
}
