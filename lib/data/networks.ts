/**
 * Proposed network concepts. These describe the KIND of athlete group MatchPoint
 * intends to assemble — they are not active rosters, signed groups, or
 * eligibility guarantees. Members are role archetypes only: no names, no
 * photographs, no handles, no identifiable individuals.
 */

export type RosterArchetype = {
  /** Roster number used as a typographic device (01, 02, ...). */
  number: string;
  /** Sport, kept general and non-identifying. */
  sport: string;
  /** Role the archetype plays in a campaign. */
  role: string;
  /** What they contribute: content, in-person, instruction, or a mix. */
  contribution: string;
  /** Why they are locally relevant to a business. */
  localRelevance: string;
};

export type NetworkConcept = {
  id: string;
  name: string;
  focus: string;
  businessFit: string;
  roster: RosterArchetype[];
  featuredOnHome: boolean;
};

export const networks: NetworkConcept[] = [
  {
    id: "campus-fitness",
    name: "Campus Fitness Network",
    focus:
      "Athletes whose daily training is genuinely about strength, conditioning, and recovery.",
    businessFit: "Gyms, strength studios, recovery and mobility businesses.",
    roster: [
      {
        number: "01",
        sport: "Track · distance",
        role: "Training-routine content lead",
        contribution: "Content + one studio visit",
        localRelevance: "Trains near campus six days a week; known in run clubs.",
      },
      {
        number: "02",
        sport: "Swimming",
        role: "Off-season strength storyteller",
        contribution: "Content only",
        localRelevance: "Early-morning routine overlaps with off-peak gym hours.",
      },
      {
        number: "03",
        sport: "Volleyball",
        role: "Mobility and recovery demonstrator",
        contribution: "Content + appearance",
        localRelevance: "Connected to local club and high-school programmes.",
      },
      {
        number: "04",
        sport: "Rowing",
        role: "Group-training participant",
        contribution: "In-person sessions",
        localRelevance: "Brings teammates to group classes as a visible cohort.",
      },
    ],
    featuredOnHome: true,
  },
  {
    id: "womens-sports",
    name: "Women's Sports Network",
    focus:
      "A cross-sport group built for businesses whose customers are mostly women.",
    businessFit:
      "Studios, wellness businesses, and youth programmes with a family audience.",
    roster: [
      {
        number: "01",
        sport: "Softball",
        role: "Family-audience content",
        contribution: "Content + clinic instruction",
        localRelevance: "Coaches at weekend youth camps in the area.",
      },
      {
        number: "02",
        sport: "Tennis",
        role: "Class demonstration",
        contribution: "Appearance + content",
        localRelevance: "Teaches junior lessons at local courts.",
      },
      {
        number: "03",
        sport: "Track · sprints",
        role: "Launch-day presence",
        contribution: "In-person appearance",
        localRelevance: "Recognised at regional meets held nearby.",
      },
    ],
    featuredOnHome: true,
  },
  {
    id: "local-wellness",
    name: "Local Wellness Ambassadors",
    focus:
      "Athletes who can speak credibly about rehabilitation, sleep, nutrition, and recovery.",
    businessFit:
      "Physical therapy clinics, recovery studios, nutrition and sports-medicine businesses.",
    roster: [
      {
        number: "01",
        sport: "Cross country",
        role: "Return-from-injury narrative",
        contribution: "Content + consultation walkthrough",
        localRelevance: "Has used local clinics as a patient, not as a spokesperson.",
      },
      {
        number: "02",
        sport: "Gymnastics",
        role: "Mobility and prehab content",
        contribution: "Content only",
        localRelevance: "Trains with youth club athletes in the same facility.",
      },
      {
        number: "03",
        sport: "Wrestling",
        role: "Weight-management and fuelling content",
        contribution: "Content + appearance",
        localRelevance: "Known through high-school feeder programmes.",
      },
    ],
    featuredOnHome: true,
  },
  {
    id: "youth-coaches",
    name: "Youth Sports Coaches",
    focus:
      "Athletes who already instruct young participants and can run a session competently.",
    businessFit:
      "Youth-sports organisations, camps, academies, and training facilities.",
    roster: [
      {
        number: "01",
        sport: "Track and field",
        role: "Speed and movement clinic lead",
        contribution: "Clinic instruction",
        localRelevance: "Has run summer speed sessions for local clubs.",
      },
      {
        number: "02",
        sport: "Volleyball",
        role: "Skills-station instructor",
        contribution: "Clinic instruction + content",
        localRelevance: "Former player in the area's club system.",
      },
      {
        number: "03",
        sport: "Baseball",
        role: "Position-skills instructor",
        contribution: "Clinic instruction",
        localRelevance: "Coaches at weekend youth tournaments.",
      },
    ],
    featuredOnHome: true,
  },
];

export const homeNetworks = networks.filter((item) => item.featuredOnHome);

/** Reasons a coordinated group is proposed instead of a single large account. */
export const groupRationale: { title: string; body: string }[] = [
  {
    title: "Coverage instead of one audience",
    body: "Several athletes in different sports reach overlapping but distinct parts of the same town, rather than one feed repeatedly.",
  },
  {
    title: "Different contributions",
    body: "One athlete is better on camera, another is better in a room with twelve twelve-year-olds. A group lets a campaign use both.",
  },
  {
    title: "Schedule resilience",
    body: "Competition travel, exams, and injuries happen. A group means a campaign week does not depend on one person's availability.",
  },
  {
    title: "Comparable signal",
    body: "Separate offer codes across a group show which kind of athlete and message actually moved customers for your business.",
  },
];
