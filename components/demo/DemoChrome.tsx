import { CampaignStatusChip, Chip } from "@/components/ui/Chip";
import { LaneRule } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import { demoCampaign, demoMerchantLabel } from "@/lib/data/demoCampaign";

/** Dark demo chrome: the single dark band on this page. */
export function DemoChrome() {
  return (
    <Section tone="ink" className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Eyebrow tone="invert">Interactive product concept — sample data</Eyebrow>
          <DisplayHeading level={1} size="xl" className="mt-5 text-paper">
            One campaign, two perspectives.
          </DisplayHeading>
          <Lede className="mt-6 text-neutral-300">
            Below is a single fictional campaign rendered twice: once for the
            business running it, once for an institutional reviewer reading it.
            Both views read from the same record, so the deliverables, dates and
            figures are identical.
          </Lede>
          <p className="measure mt-4 text-[0.875rem] leading-relaxed text-neutral-400">
            These are demo perspectives, not authenticated account roles. There is
            no sign-in, no real business, no real athlete, and no money has moved.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="border border-rule-invert p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="mono-label text-neutral-400">
                Record {demoCampaign.id}
              </p>
              <Chip tone="invert">Sample — fictional data</Chip>
            </div>
            <dl className="mt-5">
              {[
                ["Campaign", demoCampaign.package.name],
                ["Merchant", demoMerchantLabel],
                ["Window", demoCampaign.campaignWindow.display],
                ["Objective", demoCampaign.objective.label],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-0.5 border-t border-rule-invert py-2.5 sm:grid-cols-[7rem_1fr] sm:gap-3"
                >
                  <dt className="mono-label text-neutral-500">{label}</dt>
                  <dd className="text-[0.9375rem] leading-snug text-paper">
                    {value}
                  </dd>
                </div>
              ))}
              <div className="grid gap-1.5 border-t border-rule-invert py-2.5 sm:grid-cols-[7rem_1fr] sm:gap-3">
                <dt className="mono-label text-neutral-500">Status</dt>
                <dd>
                  <CampaignStatusChip status={demoCampaign.status} />
                </dd>
              </div>
            </dl>
            <LaneRule lanes={3} invert numbered className="mt-5" />
          </div>
        </div>
      </div>
    </Section>
  );
}
