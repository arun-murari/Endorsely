"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { CtaLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Marks";
import { siteConfig } from "@/lib/site.config";

export function SiteHeader() {
  const pathname = usePathname();
  const [nav, setNav] = useState({ open: false, path: pathname });

  // Derive the disclosure from the current route: any navigation closes it,
  // including browser back/forward, without an effect.
  const open = nav.path === pathname && nav.open;
  const setOpen = (value: boolean) => setNav({ open: value, path: pathname });

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (!base || base === "/") return pathname === "/" && href === "/";
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  return (
    <>
      {/* Masthead kicker: the positioning line, above the navigation. */}
      <div className="border-b border-rule bg-paper-tint">
        <div className="mx-auto flex w-full max-w-[84rem] items-center gap-3 px-5 py-1.5 sm:px-8 lg:px-12">
          <p className="mono-label truncate text-neutral-600">
            College-athlete marketing campaigns for local businesses
          </p>
          <span className="mono-label ml-auto hidden shrink-0 text-neutral-500 sm:block">
            Pre-launch
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-ink/20 bg-paper/95 backdrop-blur-[2px]">
        <div className="mx-auto flex w-full max-w-[84rem] items-center gap-4 px-5 py-3 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="shrink-0"
            aria-label={`${siteConfig.name} — home`}
          >
            <Wordmark size="md" />
          </Link>

          <nav aria-label="Primary" className="ml-6 hidden lg:block">
            <ul className="flex items-center gap-7">
              {siteConfig.primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={isActive(item.href)}
                    className="underline-grow display-tight text-[1.0625rem] tracking-[0.015em] text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto hidden items-center gap-5 lg:flex">
            {siteConfig.secondaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive(item.href)}
                className="underline-grow text-sm text-ink-2"
              >
                {item.label}
              </Link>
            ))}
            <CtaLink href={siteConfig.primaryCta.href} variant="primary">
              {siteConfig.primaryCta.label}
            </CtaLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="ml-auto inline-flex items-center gap-2 border border-ink px-3 py-2 lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-4 w-4" />
            <span className="mono-label">{open ? "Close" : "Menu"}</span>
          </button>
        </div>

        {open ? (
          <div id="mobile-nav" className="border-t border-rule bg-paper lg:hidden">
            <nav aria-label="Primary mobile" className="px-5 pb-5 pt-2 sm:px-8">
              <ul>
                {[...siteConfig.primaryNav, ...siteConfig.secondaryNav].map((item) => (
                  <li key={item.href} className="border-b border-rule">
                    <Link
                      href={item.href}
                      className="display-tight flex items-center justify-between py-3.5 text-[1.35rem] text-ink"
                    >
                      {item.label}
                      <Icon name="arrow-right" className="h-4 w-4 text-neutral-500" />
                    </Link>
                  </li>
                ))}
              </ul>
              <CtaLink
                href={siteConfig.primaryCta.href}
                variant="primary"
                className="mt-5 w-full"
                withArrow
              >
                {siteConfig.primaryCta.label}
              </CtaLink>
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}
