/**
 * FAQ content. Answers are written to keep planned capabilities and functioning
 * ones clearly apart, and to state the two hard limits plainly: Endorsely does
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
      "No. You start with a business objective, a budget, and a rough timeline. Endorsely proposes an athlete group that fits — a mix of sports, contribution types, and local connections — and you approve or adjust it.",
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
    question: "What would the campaign budget include, and how does Endorsely get paid?",
    answer: [
      "One all-in figure, split by a fixed rule. Endorsely proposes a 20% management fee taken within the campaign budget; the other 80% is campaign spending — athlete compensation and any explicitly included delivery costs such as clinic materials. On a $2,000 campaign that is $1,600 of campaign spending and a $400 fee.",
      "Athlete compensation is campaign money passing through, not Endorsely revenue. The planner shows every line added up so nothing is hidden, and per-athlete amounts always come from the compensation pool rather than from the total.",
      "This is proposed pricing. We will test willingness to pay before finalizing it, which is why there are no pricing tiers on this site and why final scope and cost would come in a written proposal.",
    ],
  },
  {
    id: "minimum-budget",
    question: "Is there a minimum campaign budget?",
    answer: [
      "The proposed minimum is $1,000 for the whole campaign. It is a minimum budget, not a minimum fee: below that level the management fee does not cover the work of designing, coordinating, documenting and reporting on a campaign, and we would rather say so than run something badly.",
      "If your budget is smaller, the planner says so and points you at a conversation instead of printing an allocation that does not mean anything. A smaller single-athlete pilot may still be worth doing, and that is worth talking about.",
    ],
  },
  {
    id: "nil-platforms",
    question: "How does Endorsely relate to platforms like Opendorse or Teamworks?",
    answer: [
      "Those platforms already exist and already do a lot. Teamworks Exchange connects businesses and athletes and supports payments and reporting; Opendorse offers athlete campaigns, a marketplace, contracts and measurement; MOGL combines brand partnerships with campaign and compliance tools; Athliance serves disclosure workflows. Naming them is context, not a claim — Endorsely has no integration, partnership, or access arrangement with any of them.",
      "Endorsely is not trying to have the largest athlete directory. The intended difference is focused execution: affordable, repeatable campaigns for local fitness, wellness and youth-sports businesses, delivered by small groups of college athletes and judged against customer actions, starting in one category in one campus market.",
      "The honest framing is that Endorsely is complementary. Whatever a school or an athlete already uses stays where it is; Endorsely originates and runs the campaign and hands over organised information at the end.",
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
      "The school keeps using it. Endorsely is designed to prepare better-organised campaign information and completion evidence that a school can take into whatever disclosure and review workflow it already runs — including software it already licenses.",
      "Endorsely has no integration with any such product, and mentioning that this software exists is not a claim of a connection to it.",
    ],
  },
  {
    id: "compliance",
    question: "Does Endorsely guarantee compliance or approval?",
    answer: [
      "No. Endorsely does not determine eligibility, does not approve campaigns, and cannot guarantee that any institution will approve anything. Review and approval sit with the school.",
      "What Endorsely intends to do is make the incoming information complete and consistent: commercial purpose, parties, compensation, dates, deliverables, usage rights, and completion evidence. Documentation support is not legal advice or a guarantee of institutional approval.",
    ],
  },
  {
    id: "payments",
    question: "Is Endorsely currently holding or processing payments?",
    answer: [
      "No. Endorsely does not hold, move, or process funds. There is no escrow, no wallet, and no balance.",
      "Payment coordination appears in the product concept as a proposed supporting step and as recordkeeping — a note of whether a payment happened — not as a live financial service.",
    ],
  },
  {
    id: "what-exists",
    question: "What actually exists today?",
    answer: [
      "The complete list: we have developed the concept, researched competitors, and outlined the business and pilot models. That is it.",
      "Customer interviews, paying clients, partnerships and a working platform are all planned milestones rather than achievements. No campaign has run, no merchant has paid, no athlete is signed, and no school has agreed to anything. Everything described on this site as a capability is described as intended.",
    ],
  },
  {
    id: "pilot",
    question: "How can I participate in the pilot?",
    answer: [
      "Tell us which side you are on — business, athlete, or school and partner — and what you would want out of it. Nothing about an inquiry is a commitment, and an inquiry is not a letter of intent.",
      "The first pilot market is Austin, Texas. No campus is confirmed and no school has agreed to anything, so early conversations are about shaping a small number of repeatable campaign formats rather than booking work.",
    ],
  },
];
