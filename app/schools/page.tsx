import type { Metadata } from "next";
import { HandoffDiagram, HalftoneBlock } from "@/components/graphics/SportGraphics";
import { Artifact } from "@/components/ui/Artifact";
import { CtaLink, TextLink } from "@/components/ui/Button";
import { ClaimLabel } from "@/components/ui/Chip";
import { DataRow } from "@/components/ui/DataRow";
import { Bracketed, LaneRule, RosterNumber } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import { evidencePacket } from "@/lib/data/evidencePacket";
import { siteConfig } from "@/lib/site.config";

const description =
  "For athletic compliance offices, athletic departments, regional collectives, and institutional partners: better-structured campaign information that fits the review workflow a school already runs.";

export const metadata: Metadata = {
  title: "For schools and partners",
  description,
};

const concerns = [
  {
    concern: "Incomplete information",
    response:
      "A campaign arrives with the same fields every time: parties, dates, deliverables, compensation, usage rights.",
  },
  {
    concern: "Unclear commercial purpose",
    response:
      "The purpose is written during planning, in business terms, because the campaign was designed around a customer action.",
  },
  {
    concern: "Inconsistent deliverables",
    response:
      "Deliverables are itemised per athlete with an owner and a due date rather than described loosely.",
  },
  {
    concern: "Scattered documentation",
    response:
      "One packet in four readable groups instead of a thread of screenshots and forwarded messages.",
  },
  {
    concern: "Missing completion records",
    response:
      "Published-content links, appearance confirmations, and redemption counts are collected as the campaign runs.",
  },
  {
    concern: "Compatibility with existing workflows",
    response:
      "Plain, copyable information that goes into whatever disclosure and review process is already in place.",
  },
];

const value = [
  "Better-structured incoming campaign information",
  "A clearer statement of commercial purpose",
  "Standardised deliverable records across campaigns",
  "Organised completion evidence rather than reconstruction after the fact",
  "An easier handoff into the workflow a school already runs",
];

const division = {
  endorsely: [
    "Merchant-facing campaign planning and scoping",
    "Athlete group assembly and coordination",
    "Deliverable tracking and completion evidence",
    "Assembling one consistent information packet",
  ],
  school: [
    "Its own disclosure and review workflow",
    "Any decision about eligibility, approval, or permissibility",
    "Its system of record and retention requirements",
    "Whatever NIL software it already licenses",
  ],
};

const inquiryOptions = [
  {
    number: "01",
    title: "Campus pilot",
    body: "A small number of local businesses and a handful of campaign formats, with the review process mapped before anything runs.",
  },
  {
    number: "02",
    title: "Athletic department workflow",
    body: "Walk through where campaign information currently arrives incomplete, and what a consistent packet would need to contain.",
  },
  {
    number: "03",
    title: "Regional collective partnership",
    body: "A collective is a local organisation that raises money and arranges paid opportunities for athletes at a school. Campaign packaging and measurement could sit alongside that work.",
  },
  {
    number: "04",
    title: "Institutional licensing discussion",
    body: "What a department-level view of campaign information could look like. Terms, scope, and pricing are all undecided.",
  },
];

const limits = [
  "No institutional relationships, permissions, or approvals exist today",
  "No integration with any NIL disclosure or recordkeeping software",
  "No API access, no procurement readiness, no security review completed",
  "No export format has been accepted as an institutional filing by any school",
  "No eligibility determinations, and no automated compliance decisions",
];

export default function SchoolsPage() {
  return (
    <>
      <Section className="pb-12 pt-10 sm:pt-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>For schools and partners</Eyebrow>
            <DisplayHeading level={1} size="xl" className="mt-6">
              Better-organized deals. Your existing process.
            </DisplayHeading>
            <Lede className="mt-6 text-ink">
              Endorsely packages local NIL —{" "}
              <strong className="font-semibold">name, image, and likeness</strong> —
              campaigns for businesses near a campus: it plans them, coordinates
              the athletes, measures the business result, and assembles the
              information a school&apos;s own review process asks for.
            </Lede>
            <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
              It is not a compliance system, not a system of record, and not a
              replacement for anything you run. The proposition is narrower and
              more useful: when a campaign reaches you, it is already complete,
              consistent, and legible.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CtaLink href="/demo" variant="primary" withArrow>
                Inspect the sample packet
              </CtaLink>
              <CtaLink href="/contact?type=school" variant="secondary">
                Discuss a partnership
              </CtaLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ClaimLabel kind="proposed" />
              <p className="text-[0.8125rem] leading-snug text-neutral-600">
                {siteConfig.status.shortLine}
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ul className="border-t-2 border-ink">
              {value.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-rule py-3.5"
                >
                  <span className="font-mono text-[0.8125rem] tabular-nums text-neutral-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <HalftoneBlock className="mt-8 block h-auto w-full" />
          </div>
        </div>
      </Section>

      <Section tone="tint" className="border-y border-ink/15 py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-4">
          <div>
            <Eyebrow tone="muted">What usually goes wrong</Eyebrow>
            <DisplayHeading size="lg" className="mt-4">
              Six recurring gaps
            </DisplayHeading>
          </div>
          <Lede className="max-w-md text-[0.9375rem] text-ink-2">
            Left column: what tends to arrive. Right column: what Endorsely is
            designed to send instead.
          </Lede>
        </div>
        <dl className="grid lg:grid-cols-2 lg:gap-x-12">
          {concerns.map((row) => (
            <div key={row.concern} className="border-b border-rule py-5">
              <dt className="display-tight flex items-baseline gap-3 text-[1.15rem]">
                <span className="h-2 w-2 shrink-0 translate-y-[-2px] bg-ink/40" aria-hidden />
                {row.concern}
              </dt>
              <dd className="mt-2 flex gap-3 pl-5 text-[0.9375rem] leading-relaxed text-ink-2">
                <span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 bg-lime-deep" aria-hidden />
                <span>{row.response}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="muted">Division of responsibility</Eyebrow>
            <DisplayHeading size="lg" className="mt-5">
              We prepare. You decide.
            </DisplayHeading>
            <Lede className="mt-6 text-ink-2">
              Endorsely does not submit on a school&apos;s behalf, does not
              determine eligibility, does not approve campaigns, and does not
              control any institutional process.
            </Lede>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mono-label border-b-2 border-lime pb-2 text-ink-2">
                  Endorsely does
                </h3>
                <ul>
                  {division.endorsely.map((item) => (
                    <li
                      key={item}
                      className="border-b border-rule py-2.5 text-[0.9375rem] leading-snug text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mono-label border-b-2 border-ink/40 pb-2 text-ink-2">
                  The school keeps
                </h3>
                <ul>
                  {division.school.map((item) => (
                    <li
                      key={item}
                      className="border-b border-rule py-2.5 text-[0.9375rem] leading-snug text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="border border-ink/20 bg-paper-tint p-4 sm:p-6">
              <HandoffDiagram className="block h-auto w-full" />
            </div>
            <p className="mt-4 text-[0.8125rem] leading-snug text-neutral-600">
              Documentation support is not legal advice or a guarantee of
              institutional approval.
            </p>
          </div>
        </div>
      </Section>

      <Section
        tone="ink"
        id="packet"
        className="scroll-mt-24 py-14 sm:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Eyebrow tone="invert">The sample packet</Eyebrow>
            <DisplayHeading size="lg" className="mt-5 text-paper">
              Four groups, read in order.
            </DisplayHeading>
            <Lede className="mt-6 text-neutral-300">
              Every campaign produces the same structure, so a reviewer always
              knows where to look. The full sample packet — with every field, note,
              and status — is inside the interactive demo.
            </Lede>
            <p className="measure mt-4 text-[0.875rem] leading-relaxed text-neutral-400">
              Information in a packet is provided by the merchant or the athlete.
              Nothing is marked verified, because no verification source is
              connected. No institution has accepted this format.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <CtaLink href="/demo" variant="onInk" withArrow>
                Open the sample packet in the demo
              </CtaLink>
              <TextLink href="/campaigns#planner" invert>
                See how a campaign is planned
              </TextLink>
            </div>
            <LaneRule lanes={3} invert numbered className="mt-10 max-w-xs" />
          </div>
          <div className="lg:col-span-6">
            <Artifact
              invert
              perforated
              title="Evidence packet — structure"
              meta={<ClaimLabel kind="sample" />}
            >
              <ol>
                {evidencePacket.map((group) => (
                  <li key={group.id} className="border-t border-rule-invert py-4 first:border-t-0 first:pt-0">
                    <div className="flex items-baseline gap-3">
                      <RosterNumber value={group.number} size="sm" invert />
                      <h3 className="display-tight text-[1.2rem] text-paper">
                        {group.title}
                      </h3>
                      <span className="mono-label ml-auto text-neutral-500">
                        {String(group.fields.length).padStart(2, "0")} fields
                      </span>
                    </div>
                    <p className="mt-1.5 text-[0.875rem] leading-snug text-neutral-400">
                      {group.purpose}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-6 border-t border-rule-invert pt-4">
                <DataRow
                  invert
                  label="Fields in the sample packet"
                  value={String(
                    evidencePacket.reduce(
                      (count, group) => count + group.fields.length,
                      0,
                    ),
                  )}
                />
                <DataRow invert label="Marked verified" value="0" note="No verification source is connected in this sample." />
              </div>
            </Artifact>
          </div>
        </div>
      </Section>

      <Section className="py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-4">
          <div>
            <Eyebrow tone="muted">Start a conversation</Eyebrow>
            <DisplayHeading size="lg" className="mt-4">
              Four ways to engage
            </DisplayHeading>
          </div>
          <Lede className="max-w-md text-[0.9375rem] text-ink-2">
            Each one goes to the same short form, with the school and partner
            inquiry preselected. There is nothing to buy on this page.
          </Lede>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {inquiryOptions.map((option, index) => (
            <div
              key={option.number}
              className={`border-b border-rule-strong py-6 lg:border-b-0 lg:pr-6 ${
                index > 0 ? "lg:border-l lg:border-rule lg:pl-6" : ""
              }`}
            >
              <RosterNumber value={option.number} size="md" className="text-neutral-400" />
              <h3 className="display-tight mt-3 text-[1.2rem]">{option.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-snug text-ink-2">
                {option.body}
              </p>
              <div className="mt-4">
                <TextLink href="/contact?type=school">Start here</TextLink>
              </div>
            </div>
          ))}
        </div>

        <Bracketed className="mt-14 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="mono-label text-neutral-600">Honest limits</p>
            <ClaimLabel kind="proposed" />
          </div>
          <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
            {limits.map((limit) => (
              <li
                key={limit}
                className="border-t border-rule py-2.5 text-[0.875rem] leading-snug text-ink-2"
              >
                {limit}
              </li>
            ))}
          </ul>
        </Bracketed>
      </Section>
    </>
  );
}
