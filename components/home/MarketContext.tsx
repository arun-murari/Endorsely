import {
  marketContextFraming,
  marketContextNote,
  marketFigures,
} from "@/lib/data/marketContext";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";

/**
 * Cited-figures ledger. Deliberately NOT stat counters: each number sits in a
 * narrow left column at modest size, and the caveat that undercuts it gets the
 * same weight as the claim, on a hanging mono label. The section reads as a
 * references block in a publication rather than as a wall of growth metrics.
 */
export function MarketContext() {
  return (
    <Section className="border-t border-ink/15 py-14 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow tone="muted">Market context</Eyebrow>
          <DisplayHeading size="md" className="mt-5">
            Three numbers, and what each one does not say.
          </DisplayHeading>
          <Lede className="mt-5 text-ink-2">{marketContextFraming}</Lede>
        </div>

        <dl className="lg:col-span-7">
          {marketFigures.map((item) => (
            <div
              key={item.id}
              className="grid gap-x-6 gap-y-2 border-t border-ink/25 py-6 first:border-t-2 first:border-ink sm:grid-cols-[9.5rem_1fr]"
            >
              <dt>
                <span className="display block text-[clamp(1.5rem,3vw,2.1rem)] tabular-nums">
                  {item.figure}
                </span>
                <span className="mono-label mt-1.5 block text-neutral-600">
                  {item.unit}
                </span>
              </dt>
              <dd>
                <p className="measure text-[0.9375rem] leading-relaxed text-ink">
                  {item.claim}
                </p>
                <p className="mono-label mt-3 text-neutral-600">{item.source}</p>
                <p className="measure mt-3 grid gap-1.5 border-l-2 border-lime-deep pl-3 text-[0.875rem] leading-snug text-ink-2">
                  <span className="mono-label text-neutral-600">Caveat</span>
                  <span>{item.caveat}</span>
                </p>
              </dd>
            </div>
          ))}
          <p className="measure mt-5 text-[0.8125rem] leading-snug text-neutral-600">
            {marketContextNote}
          </p>
        </dl>
      </div>
    </Section>
  );
}
