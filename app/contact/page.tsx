import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactLoader } from "@/components/contact/ContactLoader";
import { CourtDiagram } from "@/components/graphics/SportGraphics";
import { Bracketed, LaneRule } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import { inquiryForms } from "@/lib/forms/config";
import { pilotMarketPhrase, siteConfig } from "@/lib/site.config";

const description =
  "Start a conversation about a pilot campaign, athlete participation, or an institutional partnership. Nothing here is a commitment, and no inquiry is a letter of intent.";

export const metadata: Metadata = {
  title: "Contact and pilot inquiry",
  description,
};

export default function ContactPage() {
  return (
    <Section className="py-12 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Eyebrow tone="muted">Pilot inquiry</Eyebrow>
          <DisplayHeading level={1} size="xl" className="mt-5">
            Tell us which side you&apos;re on.
          </DisplayHeading>
          <Lede className="mt-6 text-ink-2">
            One short form, three audiences. Pick the one that fits and we will
            reply about a pilot — a campaign, athlete participation, or the
            institutional workflow.
          </Lede>

          <div className="mt-10 border-t-2 border-ink">
            {Object.values(inquiryForms).map((form, index) => (
              <div key={form.type} className="border-b border-rule py-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.8125rem] tabular-nums text-neutral-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display-tight text-[1.2rem]">{form.label}</h2>
                </div>
                <p className="mt-1.5 text-[0.875rem] leading-snug text-ink-2">
                  {form.audience}
                </p>
              </div>
            ))}
          </div>

          <Bracketed className="mt-10 p-5">
            <p className="mono-label text-neutral-600">Before you write</p>
            <ul className="mt-3 space-y-2.5 text-[0.875rem] leading-snug text-ink-2">
              <li>
                Nothing you send is a commitment, and an inquiry is not a letter of
                intent or a signed sponsorship.
              </li>
              <li>
                {siteConfig.status.line} {pilotMarketPhrase("sentence")}
              </li>
              <li>
                Replies go to and from{" "}
                <span className="font-mono text-[0.8125rem]">
                  {siteConfig.contactEmail}
                </span>
                , which is a placeholder address while the site is pre-launch.
              </li>
            </ul>
          </Bracketed>

          <CourtDiagram className="mt-10 block h-auto w-full max-w-sm" />
          <LaneRule lanes={3} numbered className="mt-6 max-w-xs" />
        </div>

        <div className="lg:col-span-7">
          <Suspense
            fallback={
              <p className="mono-label border-t-2 border-ink pt-4 text-neutral-600">
                Loading the inquiry form…
              </p>
            }
          >
            <ContactLoader />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}
