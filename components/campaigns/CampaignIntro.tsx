import { ClaimLabel } from "@/components/ui/Chip";
import { Bracketed, Icon, LaneRule } from "@/components/ui/Marks";
import { DisplayHeading, Eyebrow, Lede, Section } from "@/components/ui/Section";
import { packages } from "@/lib/data/packages";
import { siteConfig } from "@/lib/site.config";

/**
 * Page opener: an editorial masthead on the left, a contents index on the
 * right. The index doubles as the jump list into the planner.
 */
export function CampaignIntro() {
  return (
    <Section className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Eyebrow tone="muted">Campaigns for local businesses</Eyebrow>
          <DisplayHeading level={1} size="xl" className="mt-5">
            Campaign formats built around one objective
          </DisplayHeading>
          <Lede className="mt-6 text-ink-2">
            Each format starts from a customer action a business wants more of —
            a trial visit, an inquiry, a registration — and works backwards to
            what a small group of college athletes would actually do. Local{" "}
            {siteConfig.nilDefinition} (NIL) work is only worth the effort when
            someone can count what happened afterwards.
          </Lede>
          <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-neutral-600">
            {siteConfig.status.line} Nothing on this page is inventory, a quote,
            or a booking, and no format carries a published price.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#planner"
              className="underline-grow display-tight inline-flex items-center gap-2 text-[1.125rem] tracking-[0.02em] text-ink"
            >
              <span>Build an illustrative brief in the planner</span>
              <Icon name="arrow-down" className="h-4 w-4" />
            </a>
            <ClaimLabel kind="proposed" />
          </div>
        </div>

        <div className="lg:col-span-5">
          <Bracketed className="p-5 sm:p-6">
            <p className="mono-label text-neutral-600">On this page</p>
            <ol className="mt-4">
              {packages.map((pkg, index) => (
                <li
                  key={pkg.slug}
                  className="grid grid-cols-[2.5rem_1fr] items-baseline gap-2 border-t border-rule py-2.5"
                >
                  <span className="font-mono text-[0.8125rem] tabular-nums text-neutral-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#format-${pkg.slug}`}
                    className="underline-grow display-tight self-start text-[1.0625rem] text-ink"
                  >
                    {pkg.name}
                  </a>
                </li>
              ))}
              <li className="grid grid-cols-[2.5rem_1fr] items-baseline gap-2 border-t border-rule py-2.5">
                <span className="font-mono text-[0.8125rem] tabular-nums text-neutral-500">
                  06
                </span>
                <a
                  href="#networks"
                  className="underline-grow display-tight self-start text-[1.0625rem] text-ink"
                >
                  Network concepts
                </a>
              </li>
              <li className="grid grid-cols-[2.5rem_1fr] items-baseline gap-2 border-y border-rule py-2.5">
                <span className="font-mono text-[0.8125rem] tabular-nums text-neutral-500">
                  07
                </span>
                <a
                  href="#planner"
                  className="underline-grow display-tight self-start text-[1.0625rem] text-ink"
                >
                  Campaign planner
                </a>
              </li>
            </ol>
            <LaneRule lanes={3} numbered className="mt-5" />
          </Bracketed>
        </div>
      </div>
    </Section>
  );
}
