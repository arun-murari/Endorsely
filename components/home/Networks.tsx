import { TextLink } from "@/components/ui/Button";
import { ClaimLabel } from "@/components/ui/Chip";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import { groupRationale, homeNetworks } from "@/lib/data/networks";

/**
 * Roster sheet composition: four network concepts set as columns separated by
 * hairlines, each listing role archetypes with roster numbering. No names, no
 * photographs, no handles — these are concepts, not a bookable roster.
 */
export function Networks() {
  return (
    <Section className="border-t border-ink/15 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow tone="muted">Coordinated athlete networks</Eyebrow>
          <DisplayHeading size="lg" className="mt-5">
            One campaign. The right mix of athletes.
          </DisplayHeading>
          <Lede className="mt-6 text-ink-2">
            Picking the single biggest account in town is a guess about reach. A
            small group chosen for the job is a plan about customers.
          </Lede>
        </div>

        <ul className="grid gap-x-8 gap-y-6 lg:col-span-7 sm:grid-cols-2">
          {groupRationale.map((item, index) => (
            <li key={item.title} className="border-t border-ink/25 pt-3">
              <p className="mono-label text-neutral-500">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="display-tight mt-2 text-[1.15rem]">{item.title}</h3>
              <p className="mt-1.5 text-[0.875rem] leading-snug text-ink-2">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink pb-3">
        <h3 className="display text-[clamp(1.35rem,2.4vw,1.85rem)]">
          Network concepts
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <ClaimLabel kind="proposed" />
          <p className="text-[0.8125rem] text-neutral-600">
            Proposed network concepts — not active rosters, signed groups, or
            eligibility guarantees.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4">
        {homeNetworks.map((network, index) => (
          <section
            key={network.id}
            aria-label={network.name}
            className={`border-b border-rule-strong py-7 lg:border-b-0 lg:pr-6 ${
              index > 0 ? "lg:border-l lg:border-rule lg:pl-6" : ""
            }`}
          >
            <h4 className="display-tight text-[1.2rem] leading-tight">
              {network.name}
            </h4>
            <p className="mt-2 text-[0.8125rem] leading-snug text-ink-2">
              {network.focus}
            </p>
            <p className="mono-label mt-4 border-t border-rule pt-2 text-neutral-500">
              Fits · {network.businessFit}
            </p>

            <ul className="mt-4">
              {network.roster.map((member) => (
                <li
                  key={member.number}
                  className="grid grid-cols-[2rem_1fr] gap-2 border-t border-rule py-2.5"
                >
                  <span className="font-mono text-[0.8125rem] tabular-nums text-neutral-500">
                    {member.number}
                  </span>
                  <div>
                    <p className="text-[0.875rem] font-medium leading-snug text-ink">
                      {member.sport}
                    </p>
                    <p className="text-[0.8125rem] leading-snug text-ink-2">
                      {member.role}
                    </p>
                    <p className="mono-label mt-1 text-neutral-500">
                      {member.contribution}
                    </p>
                    <p className="mt-1 text-[0.8125rem] leading-snug text-neutral-600">
                      {member.localRelevance}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
        <TextLink href="/campaigns#networks">
          See the network concepts on the campaigns page
        </TextLink>
        <p className="text-[0.8125rem] text-neutral-600">
          Role archetypes are used throughout the site. No athlete is named,
          pictured, or presented as bookable.
        </p>
      </div>
    </Section>
  );
}
