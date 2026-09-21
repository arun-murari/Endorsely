/**
 * Example starting campaign formats. These are illustrative templates a
 * business can customise — not guaranteed inventory, fixed offers, or priced
 * products. No package here carries a price.
 */

export type BusinessCategory =
  | "gym-fitness"
  | "therapy-recovery"
  | "youth-sports"
  | "expansion";

export type ObjectiveId =
  | "trial-visits"
  | "membership-inquiries"
  | "consultation-bookings"
  | "clinic-registrations"
  | "local-awareness";

export type ActivityId =
  | "short-form-content"
  | "appearance"
  | "youth-clinic"
  | "recurring-ambassador";

export type PackageSlug =
  | "membership-drive"
  | "local-launch"
  | "clinic-builder"
  | "restaurant-week"
  | "community-ambassador";

export type CampaignPackage = {
  slug: PackageSlug;
  name: string;
  /** One-line summary of the format. */
  summary: string;
  /** Who the format is designed for. */
  forWho: string;
  /** Business objective the format supports. */
  objective: string;
  primaryObjective: ObjectiveId;
  categories: BusinessCategory[];
  /** What the athletes actually do. */
  activities: string[];
  /** Example athlete group — role archetypes only, never named people. */
  athleteGroup: string[];
  duration: string;
  /** Customer action that can be recorded. */
  trackable: string;
  measurement: string[];
  /** Items a business would need to confirm before the format is real. */
  customisation: string[];
  defaults: {
    athleteCount: number;
    durationWeeks: number;
    activities: ActivityId[];
    contentPieces: number;
    appearances: number;
  };
  /** Featured on the homepage (first three formats). */
  featuredOnHome: boolean;
  /** Clearly marked as an expansion category rather than initial focus. */
  expansionCategory?: boolean;
};

export const packages: CampaignPackage[] = [
  {
    slug: "membership-drive",
    name: "Membership Drive",
    summary:
      "Three athletes promote a gym or recovery studio for one month, each pointing to the same trackable offer.",
    forWho:
      "Gyms, strength studios, and recovery or wellness studios that want more people through the door this month.",
    objective:
      "Turn local attention into trial visits and membership inquiries.",
    primaryObjective: "membership-inquiries",
    categories: ["gym-fitness", "therapy-recovery"],
    activities: [
      "Three athletes each publish short-form content across four weeks",
      "One shared offer code and trackable link per athlete",
      "One coordinated launch week so posts do not land at random",
      "Optional single studio visit for photo and video capture",
    ],
    athleteGroup: [
      "Distance runner · training-routine content",
      "Volleyball player · recovery-and-mobility content",
      "Swimmer · off-season strength content",
    ],
    duration: "Four weeks",
    trackable:
      "Offer-code redemptions and trial sign-ups attributed to each athlete's link.",
    measurement: [
      "Unique offer code per athlete",
      "Trackable link to a single landing destination",
      "Merchant-reported redemptions at the front desk",
      "Trial sign-up source recorded at check-in",
    ],
    customisation: [
      "Number of athletes and sports represented",
      "The offer itself, and whether it is discount- or trial-based",
      "Whether an in-studio visit is included",
      "Athlete compensation, confirmed in a proposal",
    ],
    defaults: {
      athleteCount: 3,
      durationWeeks: 4,
      activities: ["short-form-content"],
      contentPieces: 6,
      appearances: 0,
    },
    featuredOnHome: true,
  },
  {
    slug: "local-launch",
    name: "Local Launch",
    summary:
      "Four athletes, eight posts, and one store appearance built around a new location, class, or service.",
    forWho:
      "A business opening a location, launching a class format, or introducing a new service to the neighbourhood.",
    objective:
      "Create local awareness with a reason to show up on a specific day.",
    primaryObjective: "local-awareness",
    categories: ["gym-fitness", "therapy-recovery", "youth-sports"],
    activities: [
      "Four athletes publish eight pieces of short-form content in total",
      "One in-person appearance at the store or studio on launch day",
      "A shared campaign hashtag and one trackable destination link",
      "A simple check-in question so walk-ins can be attributed",
    ],
    athleteGroup: [
      "Track sprinter · launch-day appearance and content",
      "Softball player · community and family audience",
      "Tennis player · class demonstration content",
      "Swimmer · behind-the-scenes content",
    ],
    duration: "Three weeks, with one fixed appearance date",
    trackable:
      "Launch-day attendance, registrations from the campaign link, and redemptions of the launch offer.",
    measurement: [
      "Registration or RSVP list for launch day",
      "Trackable link and QR code on in-store signage",
      "Offer redemptions recorded by staff",
      "Post-event follow-up list, where the business collects one",
    ],
    customisation: [
      "Appearance length and what athletes do on site",
      "Content volume per athlete",
      "Whether the offer is time-boxed to launch day",
      "Athlete compensation, confirmed in a proposal",
    ],
    defaults: {
      athleteCount: 4,
      durationWeeks: 3,
      activities: ["short-form-content", "appearance"],
      contentPieces: 8,
      appearances: 1,
    },
    featuredOnHome: true,
  },
  {
    slug: "clinic-builder",
    name: "Clinic Builder",
    summary:
      "Two athletes host a 90-minute youth clinic, with registrations as the measured outcome.",
    forWho:
      "Youth-sports organisations, training facilities, and studios that sell programmes to families.",
    objective: "Fill a programme with registered participants.",
    primaryObjective: "clinic-registrations",
    categories: ["youth-sports", "gym-fitness"],
    activities: [
      "Two athletes plan and run a 90-minute skills clinic",
      "Pre-clinic content to drive registrations",
      "Registration page with a campaign-specific link and QR code",
      "Post-clinic recap content and a next-step offer for attendees",
    ],
    athleteGroup: [
      "Track and field athlete · speed and movement instruction",
      "Volleyball player · skills instruction and demonstrations",
    ],
    duration: "Two weeks of promotion, one clinic date",
    trackable:
      "Clinic registrations, attendance, and conversions into an ongoing programme.",
    measurement: [
      "Registration records from the campaign link",
      "Attendance list on the clinic date",
      "Follow-on programme sign-ups recorded by the business",
      "Parent contact list, where the business collects one",
    ],
    customisation: [
      "Age group, sport focus, and clinic format",
      "Venue, insurance, and supervision requirements",
      "Registration cap and pricing, set by the business",
      "Athlete compensation, confirmed in a proposal",
    ],
    defaults: {
      athleteCount: 2,
      durationWeeks: 2,
      activities: ["youth-clinic", "short-form-content"],
      contentPieces: 4,
      appearances: 1,
    },
    featuredOnHome: true,
  },
  {
    slug: "restaurant-week",
    name: "Restaurant Week",
    summary:
      "Five athletes create content and distribute trackable offers across a single week.",
    forWho:
      "Food and drink businesses near campus. An expansion category — the initial focus stays on fitness, wellness, and youth sports.",
    objective: "Concentrate trial visits into one defined week.",
    primaryObjective: "trial-visits",
    categories: ["expansion"],
    activities: [
      "Five athletes each publish content during the same week",
      "One trackable offer per athlete, redeemable in person",
      "A shared campaign window so demand is concentrated",
      "Optional team visit as a single content moment",
    ],
    athleteGroup: [
      "Cross-country runner · fuelling and routine content",
      "Rowing athlete · team-meal content",
      "Tennis player · study-and-recovery content",
      "Softball player · family-audience content",
      "Swimmer · early-morning routine content",
    ],
    duration: "One campaign week",
    trackable:
      "In-person offer redemptions per athlete code, and order counts during the campaign window.",
    measurement: [
      "Unique offer code per athlete",
      "Redemption counts collected by staff",
      "Order volume during the campaign week, compared with the weeks around it",
      "Point-of-sale reporting where the merchant already produces it",
    ],
    customisation: [
      "Offer structure and margin the business is comfortable with",
      "Whether redemption is tracked manually or through existing systems",
      "Number of athletes and content volume",
      "Athlete compensation, confirmed in a proposal",
    ],
    defaults: {
      athleteCount: 5,
      durationWeeks: 1,
      activities: ["short-form-content"],
      contentPieces: 10,
      appearances: 0,
    },
    featuredOnHome: false,
    expansionCategory: true,
  },
  {
    slug: "community-ambassador",
    name: "Community Ambassador",
    summary:
      "One athlete makes monthly appearances across a semester, with content between visits.",
    forWho:
      "Businesses that want a recognisable local presence rather than a one-off spike.",
    objective:
      "Build repeat familiarity and a steady stream of referred customers.",
    primaryObjective: "local-awareness",
    categories: ["gym-fitness", "therapy-recovery", "youth-sports"],
    activities: [
      "One athlete visits the business once a month across a semester",
      "Two content pieces per month tied to each visit",
      "A standing offer code the athlete uses all semester",
      "One community event appearance inside the term",
    ],
    athleteGroup: [
      "Multi-sport athlete · recurring appearances and youth instruction",
    ],
    duration: "One semester, roughly four months",
    trackable:
      "Redemptions of the standing offer code, plus attendance at each monthly visit.",
    measurement: [
      "Standing offer code redeemed over time",
      "Visit-by-visit attendance notes from the business",
      "Referral question at sign-up",
      "Retention of customers acquired during the term, where the business tracks it",
    ],
    customisation: [
      "Visit cadence and length",
      "Content expectations between visits",
      "Whether the arrangement is exclusive to one business category",
      "Athlete compensation and schedule, confirmed in a proposal",
    ],
    defaults: {
      athleteCount: 1,
      durationWeeks: 16,
      activities: ["recurring-ambassador", "short-form-content", "appearance"],
      contentPieces: 8,
      appearances: 4,
    },
    featuredOnHome: false,
  },
];

export const packageBySlug = (slug: string): CampaignPackage | undefined =>
  packages.find((item) => item.slug === slug);

export const featuredPackages = packages.filter((item) => item.featuredOnHome);

export const objectives: { id: ObjectiveId; label: string; helper: string }[] = [
  {
    id: "trial-visits",
    label: "Trial visits",
    helper: "People coming in once to try the business.",
  },
  {
    id: "membership-inquiries",
    label: "Membership inquiries",
    helper: "People asking about joining or signing up.",
  },
  {
    id: "consultation-bookings",
    label: "Consultation bookings",
    helper: "Booked assessments, evaluations, or first appointments.",
  },
  {
    id: "clinic-registrations",
    label: "Clinic registrations",
    helper: "Registrations for a class, camp, or clinic.",
  },
  {
    id: "local-awareness",
    label: "Local awareness",
    helper: "Being known in the neighbourhood around campus.",
  },
];

export const activityOptions: {
  id: ActivityId;
  label: string;
  helper: string;
}[] = [
  {
    id: "short-form-content",
    label: "Short-form content",
    helper: "Athlete-made video or photo posts with a trackable link.",
  },
  {
    id: "appearance",
    label: "Store or studio appearance",
    helper: "An athlete on site for a set window on an agreed date.",
  },
  {
    id: "youth-clinic",
    label: "Youth clinic",
    helper: "A 60–90 minute instructional session for young participants.",
  },
  {
    id: "recurring-ambassador",
    label: "Recurring ambassador participation",
    helper: "Repeat visits and content across a term.",
  },
];

export const businessCategories: {
  id: BusinessCategory;
  label: string;
  helper: string;
}[] = [
  {
    id: "gym-fitness",
    label: "Gym or fitness studio",
    helper: "Strength, group fitness, cycling, climbing, martial arts.",
  },
  {
    id: "therapy-recovery",
    label: "Physical therapy, recovery, or wellness",
    helper: "PT clinics, recovery studios, nutrition, sports chiropractic.",
  },
  {
    id: "youth-sports",
    label: "Youth-sports organisation",
    helper: "Clubs, leagues, camps, and training academies.",
  },
  {
    id: "expansion",
    label: "Another local business (expansion category)",
    helper:
      "Restaurants, cafés, auto shops, student housing. Possible later — not the initial focus.",
  },
];

export const timelineOptions: { id: string; label: string }[] = [
  { id: "asap", label: "As soon as it is workable" },
  { id: "next-month", label: "Next month" },
  { id: "next-term", label: "Next academic term" },
  { id: "exploring", label: "Just exploring for now" },
];
