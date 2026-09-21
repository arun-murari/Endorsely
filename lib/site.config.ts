/**
 * Single source of truth for brand strings, navigation, the (unconfirmed)
 * pilot market and feature flags. Copy across the site reads from here so a
 * change to the pilot market actually changes the language visitors see.
 */

export type PilotMarket = {
  /**
   * Flip to true only when a campus partnership is genuinely confirmed. A named
   * `city` does NOT imply a confirmed campus: the pilot city can be settled
   * while every school in it remains a stranger.
   */
  confirmed: boolean;
  campus: string | null;
  city: string | null;
};

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type InquiryType = "business" | "athlete" | "school";

export const siteConfig = {
  name: "Endorsely",
  /** Short positioning line, used in metadata and the footer. */
  positioning:
    "Endorsely helps local fitness, wellness, and youth-sports businesses run measurable marketing campaigns with college athletes.",
  promise: "Make local NIL perform.",
  nilDefinition: "name, image, and likeness",
  /**
   * Placeholder address. No inbox exists behind it — see README before launch.
   */
  contactEmail: "hello@endorsely.example",
  status: {
    stage: "pre-launch" as const,
    line: "Endorsely is pre-launch. The capabilities described here are proposed, and sample data is fictional.",
    shortLine: "Pre-launch. Proposed capabilities, fictional sample data.",
  },
  pilotMarket: {
    confirmed: false,
    campus: null,
    city: "Austin, Texas",
  } satisfies PilotMarket,
  primaryNav: [
    { label: "Campaigns", href: "/campaigns" },
    { label: "For Athletes", href: "/athletes" },
    { label: "Schools & Partners", href: "/schools" },
    { label: "How It Works", href: "/#how-it-works" },
  ] satisfies NavLink[],
  secondaryNav: [{ label: "Product demo", href: "/demo" }] satisfies NavLink[],
  primaryCta: { label: "Build a campaign", href: "/campaigns#planner" },
  footerGroups: [
    {
      heading: "For businesses",
      links: [
        { label: "Campaign formats", href: "/campaigns" },
        { label: "Campaign planner", href: "/campaigns#planner" },
        { label: "How it works", href: "/#how-it-works" },
        { label: "Request a campaign proposal", href: "/contact?type=business" },
      ],
    },
    {
      heading: "For athletes",
      links: [
        { label: "Opportunity types", href: "/athletes" },
        { label: "How participation would work", href: "/athletes#process" },
        { label: "Express interest", href: "/contact?type=athlete" },
      ],
    },
    {
      heading: "Schools & partners",
      links: [
        { label: "Proposed workflow", href: "/schools" },
        { label: "Sample evidence packet", href: "/schools#packet" },
        { label: "Product demo", href: "/demo" },
        {
          label: "Talk about a partnership",
          href: "/contact?type=school",
        },
      ],
    },
  ] satisfies { heading: string; links: NavLink[] }[],
  featureFlags: {
    /**
     * The fee model in `lib/data/fees.ts` is a proposal, not a rate card. The
     * planner may show how a budget splits; the site must never publish pricing
     * tiers, a subscription, or institutional licensing terms.
     */
    showPublicPricingTiers: false,
  },
} as const;

/**
 * Pilot-market phrasing helper. Three states, and every surface asks for the
 * phrase it needs instead of hardcoding one:
 *
 *   1. nothing known        — campus-agnostic language
 *   2. city known only      — name the city, say the campus is unconfirmed
 *   3. campus confirmed     — name the campus
 *
 * State 2 is where the site sits today. Naming a city is a statement about
 * where we intend to work; it is never a claim about a school in that city, so
 * no phrase below pairs the city with an institution.
 */
export function pilotMarketPhrase(
  variant: "headline" | "sentence" | "inline" | "campusLabel" = "sentence",
): string {
  const { confirmed, campus, city } = siteConfig.pilotMarket;

  if (!confirmed || !campus) {
    if (city) {
      switch (variant) {
        case "headline":
          return `Start in ${city}`;
        case "inline":
          return `in ${city}, one campus at a time`;
        case "campusLabel":
          return `First market — ${city} · campus to be confirmed`;
        default:
          return `Our first pilot market is ${city}, working one campus at a time. No campus is confirmed yet and no school has agreed to anything.`;
      }
    }

    switch (variant) {
      case "headline":
        return "Start with one campus";
      case "inline":
        return "one campus at a time";
      case "campusLabel":
        return "First campus — to be confirmed";
      default:
        return "Built to start locally, one campus at a time. The first campus is not confirmed yet.";
    }
  }

  const place = city ? `${campus} in ${city}` : campus;
  switch (variant) {
    case "headline":
      return `Start at ${campus}`;
    case "inline":
      return `around ${place}`;
    case "campusLabel":
      return `First campus — ${campus}`;
    default:
      return `Built to start locally, beginning with businesses near ${place}.`;
  }
}

export const mailtoLink = (subject: string, body?: string) =>
  `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;
