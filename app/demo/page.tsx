import type { Metadata } from "next";
import { Suspense } from "react";
import { DemoChrome } from "@/components/demo/DemoChrome";
import { DemoLoader } from "@/components/demo/DemoLoader";
import { EvidencePacket } from "@/components/demo/EvidencePacket";
import { MerchantView } from "@/components/demo/MerchantView";
import { CtaLink, TextLink } from "@/components/ui/Button";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";

const description =
  "An interactive product concept: one fictional campaign shown from a merchant campaign view and an institutional review view, with the sample evidence packet it produces.";

export const metadata: Metadata = {
  title: "Product demo",
  description,
};

export default function DemoPage() {
  return (
    <>
      <DemoChrome />

      <Suspense
        fallback={
          <Section className="py-12 sm:py-16">
            <p className="mono-label border-t-2 border-ink pt-4 text-neutral-600">
              Merchant campaign view
            </p>
            <div className="mt-10">
              <MerchantView />
            </div>
          </Section>
        }
      >
        <DemoLoader />
      </Suspense>

      <Section tone="tint" id="packet" className="scroll-mt-24 border-y border-ink/15 py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="muted">Evidence packet</Eyebrow>
            <DisplayHeading size="lg" className="mt-5">
              What gets handed over
            </DisplayHeading>
            <Lede className="mt-5 text-ink-2">
              The same campaign, assembled into four groups a reviewer can read in
              order: the merchant, the commercial terms, the review information,
              and what actually happened.
            </Lede>
            <p className="measure mt-4 text-[0.875rem] leading-relaxed text-neutral-600">
              Endorsely prepares this packet. The school&apos;s own disclosure and
              review workflow stays exactly where it is, and no institution has
              accepted this format.
            </p>
          </div>
          <div className="lg:col-span-7">
            <EvidencePacket />
          </div>
        </div>
      </Section>

      <Section className="py-14 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <DisplayHeading size="md">
              Plan a campaign, or talk about the workflow.
            </DisplayHeading>
            <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
              The planner builds a brief like this one from your own objective and
              budget. Institutional conversations start from the packet above.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <CtaLink href="/campaigns#planner" variant="primary" withArrow>
              Build a campaign
            </CtaLink>
            <TextLink href="/contact?type=school">
              Talk about an institutional partnership
            </TextLink>
          </div>
        </div>
      </Section>
    </>
  );
}
