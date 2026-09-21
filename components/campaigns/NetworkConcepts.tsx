import { TextLink } from "@/components/ui/Button";
import { ClaimLabel } from "@/components/ui/Chip";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import { networks, type NetworkConcept } from "@/lib/data/networks";

/**
 * Network concepts as a data module: a column header rule and aligned roster
 * rows on desktop, the same rows as labelled definition lists on a phone.
 */
function RosterTable({ network }: { network: NetworkConcept }) {
  return (
    <div className="mt-4">
      <div className="mono-label hidden grid-cols-[3rem_13rem_11rem_1fr] gap-4 border-b border-rule-strong pb-2 text-neutral-500 sm:grid">
        <span>No.</span>
        <span>Sport / role</span>
        <span>Contributes</span>
        <span>Local relevance</span>
      </div>
      <ul>
        {network.roster.map((member) => (
          <li
            key={member.number}
            className="grid gap-x-4 gap-y-2 border-b border-rule py-3 sm:grid-cols-[3rem_13rem_11rem_1fr] sm:items-baseline sm:gap-y-0"
          >
            <span className="font-mono text-[0.8125rem] tabular-nums text-neutral-500">
              {member.number}
            </span>
            <div>
              <p className="text-[0.9375rem] font-medium leading-snug text-ink">
                {member.sport}
              </p>
              <p className="text-[0.875rem] leading-snug text-ink-2">
                {member.role}
              </p>
            </div>
            <div>
              <span className="mono-label block text-neutral-500 sm:hidden">
                Contributes
              </span>
              <p className="text-[0.875rem] leading-snug text-ink-2">
                {member.contribution}
              </p>
            </div>
            <div>
              <span className="mono-label block text-neutral-500 sm:hidden">
                Local relevance
              </span>
              <p className="text-[0.875rem] leading-snug text-neutral-600">
                {member.localRelevance}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NetworkConcepts() {
  return (
    <Section
      tone="tint"
      id="networks"
      className="scroll-mt-28 border-t border-ink/15 py-14 sm:py-20"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Eyebrow tone="muted">Athlete networks</Eyebrow>
          <DisplayHeading size="lg" className="mt-5">
            Four network concepts
          </DisplayHeading>
          <Lede className="mt-5 text-ink-2">
            A campaign draws from a small group chosen for the job rather than
            one account with the largest following. These four groupings describe
            the kind of athlete each campaign type would need.
          </Lede>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
          <div className="border-l-2 border-lime-deep pl-4">
            <ClaimLabel kind="proposed" />
            <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
              These are proposed concepts, not active rosters or eligibility
              guarantees. Every entry is a role archetype: no names, no
              photographs, no handles, nobody signed, and nothing here confirms
              that a given athlete could participate.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        {networks.map((network) => (
          <section
            key={network.id}
            aria-labelledby={`network-${network.id}`}
            className="border-t-2 border-ink pt-4 pb-9"
          >
            <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <h3
                  id={`network-${network.id}`}
                  className="display-tight text-[clamp(1.25rem,2.2vw,1.65rem)]"
                >
                  {network.name}
                </h3>
                <p className="mono-label mt-2 text-neutral-500">
                  {String(network.roster.length).padStart(2, "0")} archetypes
                </p>
              </div>
              <div className="lg:col-span-8">
                <p className="measure text-[0.9375rem] leading-relaxed text-ink-2">
                  {network.focus}
                </p>
                <p className="mono-label mt-2 text-neutral-600">
                  Fits · {network.businessFit}
                </p>
              </div>
            </div>
            <RosterTable network={network} />
          </section>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <TextLink href="/athletes">
          How participation would work for athletes
        </TextLink>
        <p className="text-[0.8125rem] leading-snug text-neutral-600">
          Which archetypes a campaign actually needs is decided during planning,
          and every participant would be confirmed in writing first.
        </p>
      </div>
    </Section>
  );
}
