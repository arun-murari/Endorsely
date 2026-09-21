/**
 * FAQ content. Answers are written to keep planned capabilities and functioning
 * ones clearly apart, and to state the two hard limits plainly: MatchPoint does
 * not hold or process payments, and it does not guarantee compliance or approval.
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

export const faq: FaqItem[] = [
  {
    id: "choose-athletes",
    question: "Do I have to choose the athletes myself?",
    answer: [
      "No. You start with a business objective, a budget, and a rough timeline. MatchPoint proposes an athlete group that fits — a mix of sports, contribution types, and local connections — and you approve or adjust it.",
      "You can absolutely name preferences. The point is that you should not have to browse profiles and guess.",
    ],
  },
  {
    id: "followings",
    question: "Do athletes need large social followings?",
    answer: [
      "No, and a follower count is not the route into a campaign. Plenty of the most useful contributions are in person: running a youth clinic, demonstrating a class, showing up on a launch day, or being a familiar face over a semester.",
      "Where content matters, what matters more is whether an athlete can make something credible about the thing your business actually sells.",
    ],
  },
  {
    id: "multiple-sports",
    question: "Can campaigns involve multiple sports?",
    answer: [
      "Yes — that is the intended default. A group drawn from different sports reaches overlapping but distinct parts of the same town, and gives you comparable signal about which kind of athlete moved customers for your business.",
    ],
  },
  {
    id: "business-types",
    question: "What types of businesses are the initial focus?",
    answer: [
      "Gyms and fitness studios; physical therapy, recovery, and wellness businesses; and youth-sports organisations. These are businesses where an athlete's daily life and the product genuinely overlap.",
      "Restaurants, cafés, auto shops, and student housing are possible expansion categories later. They are not the initial focus.",
    ],
  },
  {
    id: "budget-includes",
    question: "What would the campaign budget include?",
    answer: [
      "A campaign budget is planned as separate line items: athlete compensation, MatchPoint planning and coordination, and any other explicitly included costs such as clinic materials. The planner shows those lines added up so nothing is hidden.",
      "Figures in the planner are illustrative allocations for planning conversations. Pricing is not settled, and final scope and cost would come in a written proposal.",
    ],
  },
  {
    id: "tracking",
    question: "How are customer actions tracked?",
    answer: [
      "Through things that get written down: a unique offer code per athlete, a campaign link, QR codes on in-store signage, a source question on your own sign-up or registration form, and redemption counts you report.",
      "Direct connections to point-of-sale, booking, or reservation systems are proposed and would depend on what your business already runs. There is no passive foot-traffic tracking, and there is no way to measure the person who saw a post and walked in three months later.",
    ],
  },
  {
    id: "existing-software",
    question: "What happens when a school already has NIL software?",
    answer: [
      "The school keeps using it. MatchPoint is designed to prepare better-organised campaign information and completion evidence that a school can take into whatever disclosure and review workflow it already runs — including software it already licenses.",
      "MatchPoint has no integration with any such product, and mentioning that this software exists is not a claim of a connection to it.",
    ],
  },
  {
    id: "compliance",
    question: "Does MatchPoint guarantee compliance or approval?",
    answer: [
      "No. MatchPoint does not determine eligibility, does not approve campaigns, and cannot guarantee that any institution will approve anything. Review and approval sit with the school.",
      "What MatchPoint intends to do is make the incoming information complete and consistent: commercial purpose, parties, compensation, dates, deliverables, usage rights, and completion evidence. Documentation support is not legal advice or a guarantee of institutional approval.",
    ],
  },
  {
    id: "payments",
    question: "Is MatchPoint currently holding or processing payments?",
    answer: [
      "No. MatchPoint does not hold, move, or process funds. There is no escrow, no wallet, and no balance.",
      "Payment coordination appears in the product concept as a proposed supporting step and as recordkeeping — a note of whether a payment happened — not as a live financial service.",
    ],
  },
  {
    id: "pilot",
    question: "How can I participate in the pilot?",
    answer: [
      "Tell us which side you are on — business, athlete, or school and partner — and what you would want out of it. Nothing about an inquiry is a commitment, and an inquiry is not a letter of intent.",
      "MatchPoint is pre-launch. The first campus is not confirmed, so early conversations are about shaping a small number of repeatable campaign formats rather than booking work.",
    ],
  },
];
