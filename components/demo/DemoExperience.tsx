"use client";

import { useState } from "react";
import { InstitutionalView } from "@/components/demo/InstitutionalView";
import { MerchantView } from "@/components/demo/MerchantView";
import { Section } from "@/components/ui/Section";

export type DemoPerspective = "merchant" | "institutional";

const tabs: { id: DemoPerspective; label: string; blurb: string }[] = [
  {
    id: "merchant",
    label: "Merchant campaign view",
    blurb:
      "What the business sees: the objective, the athlete group, deliverables, schedule, budget, measurement setup, and what paperwork still needs filling in.",
  },
  {
    id: "institutional",
    label: "Institutional review view",
    blurb:
      "The same campaign ordered for a reviewer: commercial purpose, parties, compensation, dates, deliverables, usage rights, supplied policy references, open questions, and completion evidence.",
  },
];

/**
 * Perspective switch. These are two renderings of one campaign object, not two
 * authenticated accounts — there is no login anywhere in this demo.
 */
export function DemoExperience({
  initialPerspective = "merchant",
}: {
  initialPerspective?: DemoPerspective;
}) {
  const [active, setActive] = useState<DemoPerspective>(initialPerspective);
  const activeTab = tabs.find((tab) => tab.id === active) ?? tabs[0];

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const index = tabs.findIndex((tab) => tab.id === active);
    const next = tabs[(index + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    setActive(next.id);
  };

  return (
    <Section className="py-12 sm:py-16">
      <div
        role="tablist"
        aria-label="Demo perspective"
        onKeyDown={onKeyDown}
        className="flex flex-col border-t-2 border-ink sm:flex-row"
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={`flex-1 border-b border-rule-strong px-0 py-4 text-left transition-colors duration-150 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-rule ${
                selected ? "bg-paper" : "bg-paper text-ink-2 hover:text-ink"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={`h-2.5 w-2.5 shrink-0 border ${
                    selected ? "border-lime-deep bg-lime" : "border-rule-strong"
                  }`}
                  aria-hidden
                />
                <span className="display-tight text-[1.2rem]">{tab.label}</span>
              </span>
              <span className="mt-2 block max-w-md text-[0.8125rem] leading-snug text-neutral-600">
                {tab.blurb}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mono-label mt-4 text-neutral-600">
        Demo perspectives — not logged-in account roles. There is no sign-in, no
        account, and no data of yours involved.
      </p>

      <div
        role="tabpanel"
        id={`panel-${activeTab.id}`}
        aria-labelledby={`tab-${activeTab.id}`}
        className="mt-10"
      >
        {active === "merchant" ? <MerchantView /> : <InstitutionalView />}
      </div>
    </Section>
  );
}
