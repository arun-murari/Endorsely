"use client";

import { useId, useState, type ReactNode } from "react";

export type AccordionItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

/**
 * Button + aria-expanded accordion. Keyboard operable, one panel at a time,
 * and the panel is removed from the DOM when closed so nothing hidden is
 * reachable by tab.
 */
export function Accordion({
  items,
  className = "",
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <div className={`border-t border-ink/25 ${className}`}>
      {items.map((item, index) => {
        const expanded = open === item.id;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id} className="border-b border-rule">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : item.id)}
                className="group flex w-full items-start gap-4 py-5 text-left"
              >
                <span className="mono-label mt-1.5 shrink-0 text-neutral-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="display-tight flex-1 text-[1.15rem] leading-tight sm:text-[1.35rem]">
                  {item.question}
                </span>
                <span
                  className={`relative mt-1 grid h-5 w-5 shrink-0 place-items-center border transition-colors duration-150 ${
                    expanded
                      ? "border-lime-deep bg-lime"
                      : "border-rule-strong group-hover:border-ink"
                  }`}
                  aria-hidden
                >
                  <span className="absolute h-[1.5px] w-2.5 bg-ink" />
                  <span
                    className={`absolute h-2.5 w-[1.5px] bg-ink transition-transform duration-150 ${
                      expanded ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>
            {expanded ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="pb-6 pl-0 sm:pl-12"
              >
                <div className="measure space-y-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  {item.answer}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
