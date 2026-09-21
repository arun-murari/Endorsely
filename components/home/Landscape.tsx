import { ClaimLabel } from "@/components/ui/Chip";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import {
  landscapeAdvantage,
  landscapeNeutralityNote,
  landscapePlatforms,
  landscapeSpecifics,
  landscapeSubstitutes,
} from "@/lib/data/landscape";

/**
 * The landscape, then the pull-quote. The upper half is a plain index of what
 * already exists — names set in mono at label size so nothing reads as a logo
 * wall or a comparison table. The lower half is the one pull-quote on the site,
 * because the differentiation is a sentence rather than a feature list.
 */
export function Landscape() {
  return (
    <Section tone="tint" className="border-y border-ink/15 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow tone="muted">The landscape</Eyebrow>
          <DisplayHeading size="lg" className="mt-5">
            We are not the only way to spend this budget.
          </DisplayHeading>
          <Lede className="mt-6 text-ink-2">
            NIL platforms already connect businesses and athletes, and most local
            marketing money never goes near an athlete at all. Both are worth
            saying out loud before claiming a difference.
          </Lede>
        </div>

        <div className="lg:col-span-7">
          <h3 className="mono-label border-b-2 border-ink pb-2 text-ink-2">
            Platforms that already serve this market
          </h3>
          <dl>
            {landscapePlatforms.map((platform) => (
              <div
                key={platform.name}
                className="grid gap-x-6 gap-y-1 border-b border-rule py-3.5 sm:grid-cols-[12rem_1fr]"
              >
                <dt className="display-tight text-[1.05rem]">{platform.name}</dt>
                <dd className="text-[0.875rem] leading-snug text-ink-2">
                  {platform.does}
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="mono-label mt-8 border-b-2 border-ink pb-2 text-ink-2">
            And the substitutes that take most of the budget
          </h3>
              <ul className="grid sm:grid-cols-2 sm:gap-x-8">
                {landscapeSubstitutes.map((item) => (
                  <li
                    key={item}
                    className="border-b border-rule py-2.5 text-[0.9375rem] leading-snug text-ink-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>

          <p className="measure mt-6 text-[0.8125rem] leading-snug text-neutral-600">
            {landscapeNeutralityNote}
          </p>
        </div>
      </div>

      <figure className="mt-14 border-l-4 border-lime-deep pl-5 sm:mt-16 sm:pl-8">
        <blockquote>
          <p className="display max-w-[24ch] text-[clamp(1.75rem,4.2vw,3.1rem)]">
            {landscapeAdvantage}
          </p>
        </blockquote>
        <figcaption className="mt-5 flex flex-wrap items-center gap-3">
          <ClaimLabel kind="planned" />
          <span className="text-[0.8125rem] leading-snug text-neutral-600">
            A statement of intent about how Endorsely would compete, not a claim
            about results it has produced.
          </span>
        </figcaption>
      </figure>

      <ol className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {landscapeSpecifics.map((item, index) => (
          <li key={item.label} className="border-t border-ink/25 py-4">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[0.75rem] tabular-nums text-neutral-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="display-tight text-[1.1rem]">{item.label}</h3>
            </div>
            <p className="mt-1.5 text-[0.875rem] leading-snug text-ink-2">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
