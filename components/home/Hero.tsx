import { LaneField } from "@/components/graphics/SportGraphics";
import { Artifact } from "@/components/ui/Artifact";
import { CtaLink } from "@/components/ui/Button";
import { ClaimLabel, StatusChip } from "@/components/ui/Chip";
import { DataRow } from "@/components/ui/DataRow";
import { Bracketed, LaneRule } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Section } from "@/components/ui/Section";

/**
 * Asymmetric editorial hero: oversized headline on the left, an original
 * track-lane graphic and one compact campaign artifact on the right. The
 * artifact exists to explain what a campaign actually is, not to decorate.
 */
export function Hero() {
  return (
    <Section className="pb-14 pt-10 sm:pt-14">
      <LaneRule lanes={3} numbered className="mb-10 max-w-md" />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Eyebrow>College-athlete marketing for local businesses</Eyebrow>

          <DisplayHeading level={1} size="hero" className="mt-6">
            Make local
            <br />
            NIL perform<span className="text-lime-deep">.</span>
          </DisplayHeading>

          <p className="measure mt-7 text-lg leading-relaxed text-ink sm:text-xl">
            Plan coordinated campaigns with college athletes. MatchPoint helps you
            assemble the athlete group, manage deliverables, prepare the paperwork,
            and track the customer actions that matter.
          </p>

          <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
            NIL means <strong className="font-semibold">name, image, and likeness</strong> —
            the rules that let college athletes be paid to promote a business. You
            do not need to know anything about college sports to run one of these
            campaigns.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <CtaLink href="/campaigns#planner" variant="primary" withArrow>
              Build my campaign
            </CtaLink>
            <CtaLink href="/#how-it-works" variant="secondary">
              See how it works
            </CtaLink>
          </div>

          <p className="mono-label mt-7 text-neutral-600">
            For fitness, wellness, and youth-sports businesses
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="border border-ink/20">
            <LaneField className="block h-auto w-full" />
          </div>

          <Bracketed className="mt-6 p-1.5" accent>
            <Artifact
              title={`Campaign artifact — Membership Drive`}
              meta={<ClaimLabel kind="illustrative" />}
              perforated
            >
              <div className="-mt-3">
                <DataRow label="Objective" value="Membership inquiries" />
                <DataRow label="Athlete group" value="3 athletes · 3 sports" />
                <DataRow label="Deliverables" value="7 videos · 1 visit" />
                <DataRow label="Measurement" value="Offer code per athlete" />
                <DataRow
                  label="Documentation"
                  value="Draft"
                  meta={<StatusChip status="pending" />}
                />
              </div>
              <p className="mt-4 text-[0.8125rem] leading-snug text-neutral-600">
                A campaign is a defined package: who participates, what they make,
                how a customer action gets counted, and what paperwork the school
                receives.
              </p>
            </Artifact>
          </Bracketed>
        </div>
      </div>
    </Section>
  );
}
