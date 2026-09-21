import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { LaneRule } from "@/components/ui/Marks";
import { siteConfig, pilotMarketPhrase } from "@/lib/site.config";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ink/20 bg-paper-tint">
      <div className="mx-auto w-full max-w-[84rem] px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Wordmark size="lg" />
            <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-ink-2">
              {siteConfig.positioning}
            </p>
            <p className="mt-4 text-[0.875rem] leading-relaxed text-neutral-600">
              {siteConfig.status.line} {pilotMarketPhrase("sentence")}
            </p>
            <LaneRule lanes={3} className="mt-6 max-w-[14rem]" />
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {siteConfig.footerGroups.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="mono-label text-ink-2">{group.heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="underline-grow text-[0.9375rem] text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label text-neutral-600">
            Contact —{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="underline-grow text-ink"
            >
              {siteConfig.contactEmail}
            </a>{" "}
            <span className="text-neutral-500">(placeholder address)</span>
          </p>
          <p className="mono-label text-neutral-500">
            {siteConfig.name} — {siteConfig.status.shortLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
