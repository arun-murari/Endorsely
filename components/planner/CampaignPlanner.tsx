"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Artifact } from "@/components/ui/Artifact";
import { ActionButton, CtaLink } from "@/components/ui/Button";
import { ClaimLabel } from "@/components/ui/Chip";
import { CopyButton } from "@/components/ui/CopyButton";
import { DataRow } from "@/components/ui/DataRow";
import { Bracketed, Icon, RosterNumber } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import {
  activityOptions,
  businessCategories,
  objectives,
  packageBySlug,
  packages,
  timelineOptions,
  type ActivityId,
  type BusinessCategory,
  type ObjectiveId,
  type PackageSlug,
} from "@/lib/data/packages";
import { feeModel, pricingDisclosure } from "@/lib/data/fees";
import {
  allocationBalances,
  budgetDisclosure,
} from "@/lib/planner/budget";
import { buildHandoff, savePlannerHandoff } from "@/lib/planner/handoff";
import {
  buildBrief,
  defaultPlannerInput,
  plannerDisclosure,
  serialiseBrief,
  type PlannerInput,
} from "@/lib/planner/rules";

const usd = (amount: number) => `$${amount.toLocaleString("en-US")}`;

const quickBudgets = [750, 1000, 1500, 2000];

function initialInput(preselected: PackageSlug | null): PlannerInput {
  if (!preselected) return defaultPlannerInput;
  const pkg = packageBySlug(preselected);
  if (!pkg) return defaultPlannerInput;
  return {
    ...defaultPlannerInput,
    packageSlug: pkg.slug,
    objective: pkg.primaryObjective,
    category: pkg.categories[0] ?? defaultPlannerInput.category,
    activities: [...pkg.defaults.activities],
  };
}

/**
 * The campaign planner. All recommendation and budget logic lives in
 * lib/planner/*; this component only collects inputs and renders the brief.
 * Everything is computed during render, so the preview updates live.
 */
export function CampaignPlanner({
  preselectedPackage = null,
}: {
  preselectedPackage?: PackageSlug | null;
}) {
  const router = useRouter();
  const ids = useId();
  const [input, setInput] = useState<PlannerInput>(() =>
    initialInput(preselectedPackage),
  );

  const brief = buildBrief(input);
  const balances = allocationBalances(brief.budget);
  const budget = brief.budget;

  const update = <K extends keyof PlannerInput>(key: K, value: PlannerInput[K]) =>
    setInput((current) => ({ ...current, [key]: value }));

  const toggleActivity = (id: ActivityId) =>
    setInput((current) => ({
      ...current,
      activities: current.activities.includes(id)
        ? current.activities.filter((item) => item !== id)
        : [...current.activities, id],
    }));

  const handoffThen = (href: string) => () => {
    savePlannerHandoff(buildHandoff(input, brief, serialiseBrief(brief)));
    router.push(href);
  };

  return (
    <Section id="planner" className="scroll-mt-24 border-t-2 border-ink py-14 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow tone="muted">Campaign planner</Eyebrow>
          <DisplayHeading size="lg" className="mt-5">
            Build an illustrative brief
          </DisplayHeading>
          <Lede className="mt-5 text-ink-2">
            Answer six questions and the brief on the right fills in as you go. No
            account, no contact details, and nothing is sent anywhere.
          </Lede>

          <form
            className="mt-9"
            onSubmit={(event) => event.preventDefault()}
            aria-label="Campaign planner inputs"
          >
            <div className="border-t border-ink/25 py-5">
              <label
                htmlFor={`${ids}-category`}
                className="mono-label block text-ink-2"
              >
                01 · Business type
              </label>
              <select
                id={`${ids}-category`}
                className="field-input mt-2"
                value={input.category}
                onChange={(event) =>
                  update("category", event.target.value as BusinessCategory)
                }
              >
                {businessCategories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[0.8125rem] leading-snug text-neutral-600">
                {
                  businessCategories.find((item) => item.id === input.category)
                    ?.helper
                }
              </p>
            </div>

            <div className="border-t border-ink/25 py-5">
              <label
                htmlFor={`${ids}-objective`}
                className="mono-label block text-ink-2"
              >
                02 · What you want more of
              </label>
              <select
                id={`${ids}-objective`}
                className="field-input mt-2"
                value={input.objective}
                onChange={(event) =>
                  update("objective", event.target.value as ObjectiveId)
                }
              >
                {objectives.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[0.8125rem] leading-snug text-neutral-600">
                {objectives.find((item) => item.id === input.objective)?.helper}
              </p>
            </div>

            <div className="border-t border-ink/25 py-5">
              <label htmlFor={`${ids}-area`} className="mono-label block text-ink-2">
                03 · City or campus area
              </label>
              <input
                id={`${ids}-area`}
                type="text"
                className="field-input mt-2"
                placeholder="Where your customers come from"
                value={input.area}
                onChange={(event) => update("area", event.target.value)}
              />
            </div>

            <div className="border-t border-ink/25 py-5">
              <label
                htmlFor={`${ids}-budget`}
                className="mono-label block text-ink-2"
              >
                04 · Budget you are considering
              </label>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm text-neutral-600">$</span>
                <input
                  id={`${ids}-budget`}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={50}
                  className="field-input max-w-[9rem] font-mono tabular-nums"
                  value={input.budget}
                  onChange={(event) =>
                    update("budget", Math.max(0, Number(event.target.value) || 0))
                  }
                />
                <span className="mono-label text-neutral-500">total</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {quickBudgets.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => update("budget", amount)}
                    aria-pressed={input.budget === amount}
                    className={`mono-label border px-2.5 py-1.5 ${
                      input.budget === amount
                        ? "border-lime-deep bg-lime text-ink"
                        : "border-rule-strong text-ink-2 hover:border-ink"
                    }`}
                  >
                    {usd(amount)}
                  </button>
                ))}
              </div>
              <p className="mt-2.5 text-[0.8125rem] leading-snug text-neutral-600">
                One all-in figure. {usd(feeModel.minimumCampaignBudget)} is the
                proposed minimum campaign budget — enter less and the brief says
                so rather than pretending the numbers work.
              </p>
            </div>

            <div className="border-t border-ink/25 py-5">
              <label
                htmlFor={`${ids}-package`}
                className="mono-label block text-ink-2"
              >
                05 · Preferred format
              </label>
              <select
                id={`${ids}-package`}
                className="field-input mt-2"
                value={input.packageSlug}
                onChange={(event) =>
                  update(
                    "packageSlug",
                    event.target.value as PlannerInput["packageSlug"],
                  )
                }
              >
                <option value="auto">Recommend one for me</option>
                {packages.map((pkg) => (
                  <option key={pkg.slug} value={pkg.slug}>
                    {pkg.name}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="border-t border-ink/25 py-5">
              <legend className="mono-label text-ink-2">
                06 · Activities you are interested in
              </legend>
              <div className="mt-3 space-y-2.5">
                {activityOptions.map((option) => (
                  <div key={option.id} className="flex gap-3">
                    <input
                      id={`${ids}-activity-${option.id}`}
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 accent-lime-deep"
                      checked={input.activities.includes(option.id)}
                      onChange={() => toggleActivity(option.id)}
                    />
                    <label
                      htmlFor={`${ids}-activity-${option.id}`}
                      className="text-[0.9375rem] leading-snug text-ink"
                    >
                      {option.label}
                      <span className="mt-0.5 block text-[0.8125rem] text-neutral-600">
                        {option.helper}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="border-y border-ink/25 py-5">
              <label
                htmlFor={`${ids}-timeline`}
                className="mono-label block text-ink-2"
              >
                07 · Timeline
              </label>
              <select
                id={`${ids}-timeline`}
                className="field-input mt-2"
                value={input.timeline}
                onChange={(event) => update("timeline", event.target.value)}
              >
                {timelineOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <p className="measure mt-6 text-[0.8125rem] leading-snug text-neutral-600">
            {plannerDisclosure}
          </p>
        </div>

        <div className="lg:col-span-7">
          <Artifact
            title="Illustrative campaign brief"
            meta={<ClaimLabel kind="illustrative" />}
            perforated
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="display text-[clamp(1.6rem,3.2vw,2.25rem)]">
                {brief.recommended.name}
              </h3>
              <p className="mono-label text-neutral-600">
                {brief.objectiveLabel}
                {brief.area ? ` · ${brief.area}` : ""}
              </p>
            </div>
            <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
              {brief.rationale}
            </p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 className="mono-label border-b border-rule-strong pb-2 text-neutral-600">
                  Athlete group ({brief.athleteCount})
                </h4>
                <ul className="mt-0">
                  {brief.athleteRoles.map((role) => (
                    <li
                      key={role.number}
                      className="grid grid-cols-[2.25rem_1fr] gap-2 border-b border-rule py-2.5"
                    >
                      <RosterNumber
                        value={role.number}
                        size="sm"
                        className="text-neutral-500"
                      />
                      <span className="text-[0.875rem] leading-snug text-ink-2">
                        {role.role}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[0.8125rem] leading-snug text-neutral-600">
                  Role archetypes. Nobody is named, held, or confirmed here.
                </p>
              </div>

              <div>
                <h4 className="mono-label border-b border-rule-strong pb-2 text-neutral-600">
                  Deliverables
                </h4>
                <ul className="mt-0">
                  {brief.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 border-b border-rule py-2.5 text-[0.875rem] leading-snug text-ink-2"
                    >
                      <span
                        className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-lime-deep"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h4 className="mono-label mt-9 border-b border-rule-strong pb-2 text-neutral-600">
              Indicative phases · {brief.durationWeeks} weeks
            </h4>
            <ol className="mt-0">
              {brief.schedule.map((phase) => (
                <li
                  key={phase.week}
                  className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[7rem_1fr] sm:gap-4"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[0.8125rem] tabular-nums text-ink">
                      {phase.week}
                    </span>
                    <span className="mono-label text-neutral-500">
                      {phase.focus}
                    </span>
                  </div>
                  <span className="text-[0.875rem] leading-snug text-ink-2">
                    {phase.items.join(" · ")}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-9 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 className="mono-label border-b border-rule-strong pb-2 text-neutral-600">
                  Measurement plan
                </h4>
                <ul className="mt-0">
                  {brief.measurementPlan.map((item) => (
                    <li
                      key={item}
                      className="border-b border-rule py-2.5 text-[0.875rem] leading-snug text-ink-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mono-label border-b border-rule-strong pb-2 text-neutral-600">
                  Documentation checklist
                </h4>
                <ul className="mt-0">
                  {brief.documentationChecklist.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[1.25rem_1fr] gap-2 border-b border-rule py-2.5 text-[0.875rem] leading-snug text-ink-2"
                    >
                      <span
                        className="mt-[0.35rem] h-2.5 w-2.5 shrink-0 border border-rule-strong"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[0.8125rem] leading-snug text-neutral-600">
                  Documentation support is not legal advice or a guarantee of
                  institutional approval.
                </p>
              </div>
            </div>

            <h4 className="mono-label mt-9 border-b border-rule-strong pb-2 text-neutral-600">
              Budget allocation
            </h4>
            <div className="mt-1">
              {budget.lines.map((line) => (
                <DataRow
                  key={line.label}
                  label={line.label}
                  value={usd(line.amount)}
                  note={line.note}
                />
              ))}
              {balances ? (
                <DataRow
                  emphasis
                  label="All-in campaign budget"
                  value={usd(budget.total)}
                />
              ) : (
                <p className="mt-3 text-[0.8125rem] leading-snug text-neutral-600">
                  Line items shown individually. Enter a whole-dollar budget to see
                  a total.
                </p>
              )}
            </div>
            <p className="measure mt-3 text-[0.875rem] leading-snug text-ink-2">
              One budget, split by a fixed rule: {usd(budget.managementFee)} is the
              Endorsely management fee and {usd(budget.campaignSpend)} is campaign
              spending. Athlete compensation is campaign money, not Endorsely
              revenue. The pool of {usd(budget.athletePool)} ÷{" "}
              {budget.fundedAthleteCount} athlete
              {budget.fundedAthleteCount === 1 ? "" : "s"} ={" "}
              <span className="font-mono tabular-nums">
                {usd(budget.perAthlete)}
              </span>{" "}
              each — per-athlete amounts come from the pool, not from the total.
            </p>
            <p className="mt-2 text-[0.8125rem] leading-snug text-neutral-600">
              {pricingDisclosure} {budgetDisclosure}
            </p>

            {budget.belowMinimumBudget ? (
              <div className="mt-6 border-l-2 border-ink/40 bg-paper-tint p-4">
                <p className="display-tight text-[1.05rem]">
                  {budget.fundsAnyAthlete
                    ? `Below the proposed ${usd(feeModel.minimumCampaignBudget)} minimum campaign budget`
                    : "This budget is too small to allocate honestly"}
                </p>
                <p className="measure mt-2 text-[0.875rem] leading-snug text-ink-2">
                  {budget.fundsAnyAthlete
                    ? `At ${usd(budget.total)} the allocation above funds ${budget.fundedAthleteCount} athlete${
                        budget.fundedAthleteCount === 1 ? "" : "s"
                      } and a content-led scope. That can still be worth doing — one athlete, fewer deliverables, one offer code — but the proposed minimum for a coordinated group campaign is ${usd(feeModel.minimumCampaignBudget)}, because below it the management fee does not cover the work of running one. That minimum is a proposal we intend to test, not a settled price.`
                    : `Below a few hundred dollars there is not enough left after the management fee to pay an athlete a sensible amount, so we would rather talk than print an allocation that does not mean anything. The proposed minimum campaign budget is ${usd(feeModel.minimumCampaignBudget)}.`}
                </p>
                <div className="mt-4">
                  <CtaLink href="/contact?type=business" variant="secondary">
                    Let&apos;s talk about a smaller pilot
                  </CtaLink>
                </div>
              </div>
            ) : null}

            <h4 className="mono-label mt-9 border-b border-rule-strong pb-2 text-neutral-600">
              Requires confirmation
            </h4>
            <ul className="mt-0">
              {brief.needsConfirmation.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 border-b border-rule py-2.5 text-[0.875rem] leading-snug text-ink-2"
                >
                  <Icon name="alert" className="mt-1 h-3.5 w-3.5 shrink-0 text-neutral-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Artifact>

          <Bracketed className="mt-8 p-5">
            <p className="mono-label text-neutral-600">Do something with this brief</p>
            <div className="mt-4 flex flex-wrap items-start gap-x-6 gap-y-4">
              <CopyButton
                text={() => serialiseBrief(brief)}
                label="Copy campaign brief"
                copiedLabel="Brief copied"
              />
              <ActionButton
                type="button"
                variant="secondary"
                onClick={handoffThen("/demo?view=institutional")}
              >
                Explore the documentation
              </ActionButton>
              <ActionButton
                type="button"
                variant="primary"
                onClick={handoffThen("/contact?type=business&from=planner")}
              >
                Discuss this campaign
              </ActionButton>
            </div>
            <p className="mt-4 text-[0.8125rem] leading-snug text-neutral-600">
              The last two carry these answers with you — the demo opens on the
              institutional review view, and the inquiry form arrives prefilled.
              Nothing is submitted until you choose to send it.
            </p>
          </Bracketed>
        </div>
      </div>
    </Section>
  );
}
