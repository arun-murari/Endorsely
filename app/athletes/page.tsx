import type { Metadata } from "next";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { MotionMarks } from "@/components/graphics/SportGraphics";
import { Accordion } from "@/components/ui/Accordion";
import { CtaLink } from "@/components/ui/Button";
import { ClaimLabel } from "@/components/ui/Chip";
import { DataRow } from "@/components/ui/DataRow";
import { Artifact } from "@/components/ui/Artifact";
import { Bracketed, LaneRule, RosterNumber } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site.config";

const description =
  "How local campaign work with Endorsely would function for college athletes: content, appearances, youth clinics, recurring ambassador work, and group campaigns across sports.";

export const metadata: Metadata = {
  title: "For athletes",
  description,
};

const opportunities = [
  {
    number: "01",
    title: "Content campaigns",
    what: "Short-form video or photo work about something you genuinely do — a training block, a recovery routine, a class you actually take.",
    buying:
      "A business is buying credibility with people who live near it, plus content it can reuse for an agreed window.",
    scope: "Typically two to three pieces across a campaign, briefed in advance.",
  },
  {
    number: "02",
    title: "Store or studio appearances",
    what: "A set window on an agreed date: meeting customers, demonstrating a class, or being part of a launch day.",
    buying:
      "A reason for people to turn up on a specific day, and a face they recognise afterwards.",
    scope: "Usually 60–90 minutes, with the date fixed before anything is announced.",
  },
  {
    number: "03",
    title: "Youth clinics and instruction",
    what: "Running a session for younger participants — stations, drills, and the parts of your sport you know best.",
    buying:
      "A programme families register for, taught by someone who competes in the sport.",
    scope: "A 90-minute clinic is the common shape, planned with the venue.",
  },
  {
    number: "04",
    title: "Recurring ambassador work",
    what: "Monthly visits across a term with content between them, rather than one burst of posts.",
    buying:
      "Steady familiarity in the neighbourhood, and a standing offer people associate with you.",
    scope: "One semester, with the cadence agreed at the start.",
  },
  {
    number: "05",
    title: "Group campaigns across sports",
    what: "Taking part alongside athletes from other sports, each with a different role in the same campaign.",
    buying:
      "Coverage across different parts of the same town, and a schedule that survives a competition weekend.",
    scope: "Your part is scoped individually even though the campaign is shared.",
  },
];

const valueSignals = [
  {
    label: "Local relevance",
    body: "Whether the people who already know you are the people this business wants through the door.",
  },
  {
    label: "Sport expertise",
    body: "What you can explain or teach credibly — movement, recovery, fuelling, technique.",
  },
  {
    label: "Community relationships",
    body: "Clubs, youth programmes, and groups you are genuinely part of.",
  },
  {
    label: "In-person contribution",
    body: "Whether you are good in a room: a clinic, a launch day, a class demonstration.",
  },
  {
    label: "Content quality",
    body: "Whether a piece is worth watching, not how many people already follow you.",
  },
  {
    label: "Reliability",
    body: "Turning up, hitting agreed dates, and telling someone early when travel changes.",
  },
];

const process = [
  {
    number: "01",
    title: "Express interest",
    body: "Sport, school, where you are based during the term, and the kind of work you want. No portfolio required.",
  },
  {
    number: "02",
    title: "Identify a relevant opportunity",
    body: "We match campaigns to the athletes they actually need — local fit, contribution type, and the sport mix a business is looking for.",
  },
  {
    number: "03",
    title: "Review scope and compensation",
    body: "Before you agree to anything: what you would make, how many pieces, which dates, the usage window, and the amount. In writing.",
  },
  {
    number: "04",
    title: "Follow the applicable institutional process",
    body: "Your school's own disclosure and review process applies. Endorsely prepares the information it asks for; it does not control, replace, or speed up that process, and it cannot tell you whether something is permitted.",
  },
  {
    number: "05",
    title: "Complete the agreed work",
    body: "Publish or show up as scoped, with reminders and briefs rather than guesswork.",
  },
  {
    number: "06",
    title: "Provide completion evidence",
    body: "Links to what was published, confirmation an appearance happened — the record that the work was done as agreed.",
  },
];

const notDoing = [
  "Determine your eligibility or tell you what your school permits",
  "Guarantee opportunities, placements, or earnings of any size",
  "Hold or process payments — Endorsely does not move money",
  "Act on behalf of your school, your team, or your compliance office",
  "Require a follower count, an agent, or an existing brand deal",
];

const athleteFaq = [
  {
    id: "following",
    question: "Do I need a big following?",
    answer:
      "No. A large following is not required and is not how opportunities are assigned. Several of the campaign formats are built around in-person work — clinics, appearances, demonstrations — where a follower count is beside the point.",
  },
  {
    id: "sports",
    question: "Are Olympic and less commercially visible sports included?",
    answer:
      "Deliberately, yes. Track and field, swimming, volleyball, tennis, softball, cross country, rowing, wrestling and gymnastics athletes are the intended core of these campaigns, because their training and community relationships line up closely with what local fitness, wellness, and youth-sports businesses sell.",
  },
  {
    id: "pay",
    question: "How is compensation decided?",
    answer:
      "Per campaign, from scope: how many deliverables, how much in-person time, and what usage rights the business gets. The amount is written down before you agree, and Endorsely does not publish rates because none are settled.",
  },
  {
    id: "time",
    question: "How much time does it take?",
    answer:
      "It depends on the format, and the scope says so before you commit. A content-only campaign is a few pieces over a month; a clinic is a planning conversation and one 90-minute session.",
  },
  {
    id: "school",
    question: "What if my school already has NIL software?",
    answer:
      "You keep using it. Endorsely prepares the campaign information and completion evidence in one place so whatever process your school runs has what it needs. There is no integration with any such product.",
  },
];

export default function AthletesPage() {
  return (
    <>
      <Section className="pb-12 pt-10 sm:pt-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>For college athletes</Eyebrow>
            <DisplayHeading level={1} size="xl" className="mt-6">
              Paid local work, scoped before you say yes.
            </DisplayHeading>
            <Lede className="mt-6 text-ink">
              Endorsely builds campaigns for gyms, recovery studios, and
              youth-sports organisations near campus, then assembles the athlete
              group those campaigns need. NIL —{" "}
              <strong className="font-semibold">name, image, and likeness</strong> —
              is what makes that possible.
            </Lede>
            <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
              The work is local and specific: content about training you actually
              do, a clinic for twelve-year-olds, an hour at a launch. What you
              would make, what you would deliver, and which dates are involved are
              written down before you agree to anything.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CtaLink href="/contact?type=athlete" variant="primary" withArrow>
                Express interest
              </CtaLink>
              <CtaLink href="/athletes#process" variant="secondary">
                How it would work
              </CtaLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ClaimLabel kind="planned" />
              <p className="text-[0.8125rem] leading-snug text-neutral-600">
                {siteConfig.status.shortLine} No campaigns are running yet and no
                athletes are signed.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <MotionMarks className="block h-auto w-full" />
            <LaneRule lanes={4} numbered className="mt-6" />
            <Artifact className="mt-8" title="What a scope looks like" meta={<ClaimLabel kind="illustrative" />}>
              <div className="-mt-3">
                <DataRow label="Deliverables" value="3 videos · 1 photo set" />
                <DataRow label="In-person" value="1 visit · 60 min" />
                <DataRow label="Dates" value="Agreed before launch" />
                <DataRow label="Usage window" value="90 days, stated" />
                <DataRow label="Compensation" value="Written, per campaign" />
              </div>
              <p className="mt-4 text-[0.8125rem] leading-snug text-neutral-600">
                Structure only — an illustrative example of what gets written down,
                not an offer, a rate, or a live opportunity.
              </p>
            </Artifact>
          </div>
        </div>
      </Section>

      <Section tone="tint" className="border-y border-ink/15 py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-4">
          <div>
            <Eyebrow tone="muted">Opportunity types</Eyebrow>
            <DisplayHeading size="lg" className="mt-4">
              Five kinds of work
            </DisplayHeading>
          </div>
          <Lede className="max-w-md text-[0.9375rem] text-ink-2">
            Each one is a different thing a business is actually paying for. Most
            campaigns combine two.
          </Lede>
        </div>
        <ol>
          {opportunities.map((item) => (
            <li
              key={item.number}
              className="grid gap-4 border-b border-rule py-7 lg:grid-cols-12 lg:gap-8"
            >
              <div className="lg:col-span-4">
                <RosterNumber value={item.number} size="lg" className="text-neutral-400" />
                <h3 className="display mt-2 text-[clamp(1.4rem,2.6vw,1.9rem)]">
                  {item.title}
                </h3>
              </div>
              <div className="lg:col-span-4">
                <p className="text-[0.9375rem] leading-relaxed text-ink">
                  {item.what}
                </p>
                <p className="mono-label mt-3 text-neutral-600">{item.scope}</p>
              </div>
              <div className="lg:col-span-4 lg:border-l lg:border-rule lg:pl-6">
                <p className="mono-label text-neutral-600">
                  What the business is buying
                </p>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">
                  {item.buying}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="muted">How value is assessed</Eyebrow>
            <DisplayHeading size="lg" className="mt-5">
              A follower count is the least interesting number about you.
            </DisplayHeading>
            <Lede className="mt-6 text-ink-2">
              Campaigns are built for a local business trying to get people through
              a door three miles from campus. What matters is whether you can help
              with that — and there are several routes in.
            </Lede>
            <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
              Value here comes from local relationships and what you know, not from
              celebrity. A runner can credibly introduce a training studio; a
              volleyball player can attract families to a skills event. Neither
              needs to be nationally recognised to be the right person for the
              campaign.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-5 lg:col-span-7 sm:grid-cols-2">
            {valueSignals.map((signal) => (
              <li key={signal.label} className="border-t border-ink/25 pt-3">
                <h3 className="display-tight text-[1.15rem]">{signal.label}</h3>
                <p className="mt-1.5 text-[0.875rem] leading-snug text-ink-2">
                  {signal.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        tone="tint"
        id="process"
        className="scroll-mt-24 border-y border-ink/15 py-14 sm:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Eyebrow tone="muted">The intended process</Eyebrow>
            <DisplayHeading size="lg" className="mt-5">
              Six steps, nothing hidden.
            </DisplayHeading>
            <div className="mt-6 flex flex-col items-start gap-3">
              <ClaimLabel kind="proposed" />
              <p className="measure text-[0.8125rem] leading-snug text-neutral-600">
                This is how participation is designed to work. It is not a running
                system, and no step here is an approval.
              </p>
            </div>
            <Bracketed className="mt-8 p-4">
              <p className="mono-label text-neutral-600">
                What Endorsely does not do
              </p>
              <ul className="mt-3">
                {notDoing.map((item) => (
                  <li
                    key={item}
                    className="border-t border-rule py-2.5 text-[0.875rem] leading-snug text-ink-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Bracketed>
          </div>
          <ol className="lg:col-span-8">
            {process.map((step) => (
              <li
                key={step.number}
                className="grid gap-3 border-t border-ink/25 py-6 sm:grid-cols-[5rem_1fr] sm:gap-6"
              >
                <div>
                  <RosterNumber value={step.number} size="lg" />
                  <span className="mt-2 block h-[2px] w-8 bg-lime" aria-hidden />
                </div>
                <div>
                  <h3 className="display text-[clamp(1.3rem,2.4vw,1.75rem)]">
                    {step.title}
                  </h3>
                  <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Eyebrow tone="muted">Questions</Eyebrow>
            <DisplayHeading size="lg" className="mt-5">
              Before you write in
            </DisplayHeading>
          </div>
          <div className="lg:col-span-8">
            <Accordion
              items={athleteFaq.map((item) => ({
                id: item.id,
                question: item.question,
                answer: <p>{item.answer}</p>,
              }))}
            />
          </div>
        </div>
      </Section>

      <Section tone="tint" id="interest" className="scroll-mt-24 border-t border-ink/15 py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Eyebrow tone="muted">Express interest</Eyebrow>
            <DisplayHeading size="lg" className="mt-5">
              Tell us your sport and your town.
            </DisplayHeading>
            <Lede className="mt-6 text-ink-2">
              Expressing interest is not a commitment, an offer, or a placement.
              It tells us what kind of work you want so that when a local campaign
              needs it, we know who to ask.
            </Lede>
            <p className="measure mt-4 text-[0.875rem] leading-relaxed text-neutral-600">
              We ask only what an inquiry needs. Never send identity documents,
              financial account details, health information, or anything from your
              compliance file.
            </p>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm fixedType="athlete" />
          </div>
        </div>
      </Section>
    </>
  );
}
