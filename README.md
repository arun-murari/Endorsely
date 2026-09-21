# Endorsely — marketing site

Marketing site and product concept demo for **Endorsely**: a campaign-first
platform that helps local fitness, wellness, and youth-sports businesses run
measurable marketing campaigns with college athletes.

Endorsely is **pre-launch**. Everything on this site is either a description of
an intended capability or clearly labelled illustrative/fictional sample data.
There are no customers, athletes, school relationships, integrations, results, or
prices behind it.

Built with Next.js (App Router), TypeScript, and Tailwind CSS v4. No runtime
dependencies beyond what `create-next-app` installs — icons and graphics are
hand-rolled inline SVG, fonts come from `next/font/google` (Barlow Condensed,
Inter, IBM Plex Mono).

## Setup

```bash
npm install       # install dependencies
npm run dev       # development server at http://localhost:3000
npm run build     # production build
npm run start     # serve the production build
npm run lint      # eslint
```

Node 22 and npm 10 were used for development.

## Routes

| Route        | What it is                                                              |
| ------------ | ----------------------------------------------------------------------- |
| `/`          | Homepage narrative: problem, formats, reporting, networks, process, pilot, FAQ |
| `/campaigns` | All five example campaign formats, the network concepts, and the campaign planner (`#planner`) |
| `/athletes`  | What participation would involve for a college athlete (`#process`)     |
| `/schools`   | Proposed workflow for schools and partners, with the sample evidence packet (`#packet`) |
| `/demo`      | Interactive product concept: one campaign seen from a merchant and an institutional perspective |
| `/contact`   | One inquiry form that adapts to business / athlete / school inquiries (`?type=`) |

## How the content is organised

Data and copy are kept out of the components:

- `lib/site.config.ts` — brand strings, navigation, footer groups, the placeholder
  contact address, feature flags, and the **pilot market**. While
  `pilotMarket.confirmed` is `false`, `pilotMarketPhrase()` returns
  campus-agnostic language ("Built to start locally, one campus at a time"). Set
  `confirmed: true` with a `campus`/`city` and the copy on the site changes with it.
- `lib/data/packages.ts` — the five example campaign formats, objectives,
  activities, business categories.
- `lib/data/networks.ts` — the four proposed network concepts, described with role
  archetypes only (no names, photos, or handles).
- `lib/data/reporting.ts` — the fictional sample merchant report.
- `lib/data/demoCampaign.ts` — **the single shared demo campaign object**. Both demo
  perspectives, the evidence packet, and `/schools` derive from it, so figures
  reconcile. `demoBudgetTotals` recomputes the totals from the parts.
- `lib/data/evidencePacket.ts` — the four packet groups, derived from the campaign,
  plus the plain-text serialiser used by the copy action.
- `lib/data/faq.ts`, `lib/data/fees.ts` — FAQ content and **prototype fee
  assumptions** (see below).
- `lib/planner/rules.ts` + `lib/planner/budget.ts` — pure functions behind the
  planner: format recommendation, brief assembly, and budget allocation.
- `lib/planner/handoff.ts` — carries planner state to `/contact` and `/demo` via
  `sessionStorage`.
- `lib/forms/config.ts` + `lib/forms/submit.ts` — field definitions per inquiry type
  and the single submission path.

Fee assumptions in `lib/data/fees.ts` are **unapproved internal planning
assumptions**, used only to keep the planner's illustrative arithmetic consistent.
They are deliberately not published as a price list, and the site has no pricing
tiers.

## Forms: no backend is connected

`lib/forms/submit.ts` is the only place a form submits from.

- With `NEXT_PUBLIC_FORM_ENDPOINT` **unset** (the default), nothing is sent
  anywhere. The form validates, then says plainly that the inquiry has **not**
  been sent, shows the completed details back to the visitor, and offers a working
  "copy my details" button and a `mailto:` link.
- With `NEXT_PUBLIC_FORM_ENDPOINT` **set**, the payload is `POST`ed to it as JSON.

To connect a real endpoint:

```bash
echo 'NEXT_PUBLIC_FORM_ENDPOINT=https://example.com/api/inquiries' > .env.local
```

The endpoint receives `{ inquiryType, fields, carriedBrief?, submittedAt }`. Note
that `NEXT_PUBLIC_*` variables are visible in the browser — put no secrets there;
use a server route or a form service that accepts public posts with its own
abuse protection.

`hello@endorsely.example` in `lib/site.config.ts` is a **placeholder address** and
does not receive mail. Replace it before any real traffic reaches the site.

## Remaining configuration (all currently absent)

- **Form endpoint** — no backend, queue, CRM, or inbox is connected
  (`NEXT_PUBLIC_FORM_ENDPOINT` is unset). Inquiries are copy-and-email only.
- **Real contact address** — the site uses a placeholder domain.
- **Analytics** — none installed. No tag manager, no product analytics, no cookie
  banner (and none is needed until analytics are added).
- **Campaign measurement plumbing** — offer codes, campaign links, QR generation,
  and landing pages are described, not implemented.
- **POS / booking / reservation connections** — described as proposed only. No
  integration with any merchant system exists.
- **Evidence packet export and filing** — the demo copies a packet to the
  clipboard, generated in the browser. There is no export format accepted by any
  institution, no submission path, and no integration with any NIL disclosure
  software.
- **Verification sources** — nothing in the packet is independently verified;
  identity, compensation, payment and disclosure fields read as "provided". A real
  verification source would be needed before any field could read "verified".
- **Payments** — Endorsely holds and processes nothing. Any payment element is
  fictional recordkeeping or an explicitly proposed future workflow.
- **Sitemap, robots, and OG images** — not configured.

## Business decisions to confirm before public launch

1. **Pricing model and fee structure** — merchant campaign fees, managed-service
   fees, possible subscriptions, and institutional licensing are all unresolved
   hypotheses. Nothing in `lib/data/fees.ts` is approved.
2. **Pilot campus and city** — currently unconfirmed
   (`siteConfig.pilotMarket.confirmed === false`).
3. **Institutional licensing terms** — scope, price, and what a school would
   actually receive.
4. **Athlete compensation policy** — how amounts are set, floors, and how scope
   changes are handled.
5. **Legal review of agreement templates** — the demo shows a draft structural
   example only; nothing has been reviewed by counsel.
6. **Verification sources for the evidence packet** — business identity, content
   publication, redemption counts, payment records, disclosure confirmation.
7. **Real contact details and legal pages** — a working address, and privacy/terms
   pages written by someone qualified. The site deliberately links to no legal
   pages rather than publishing fabricated ones.
8. **Claim review** — a final pass confirming every capability on the site is
   labelled correctly as implemented, proposed, or illustrative.

## Deployment (GitHub Pages)

The site is a static export deployed to GitHub Pages at
**https://arun-murari.github.io/Endorsely/**.

`.github/workflows/deploy.yml` runs on every push to `main` (and on manual
`workflow_dispatch`). It builds with Node 22, exports to `out/`, adds
`out/.nojekyll` so Pages serves the `_next/` directory, and publishes the folder
with `actions/deploy-pages`. Pages is configured with GitHub Actions as its
source — there is no `gh-pages` branch, and `out/` is never committed.

### `NEXT_PUBLIC_BASE_PATH`

Pages serves this repo from the `/Endorsely/` subpath, not a domain root, so
every asset and internal link needs that prefix. `next.config.ts` reads it from
`NEXT_PUBLIC_BASE_PATH` and applies it as both `basePath` and `assetPrefix`:

```bash
NEXT_PUBLIC_BASE_PATH=/Endorsely npm run build   # what CI runs
npm run build                                    # root-relative, for local checks
```

The variable is unset locally so `npm run dev` keeps working at
`http://localhost:3000` without the prefix; only the workflow sets it. Build
without it and the deployed page will load HTML but request its CSS and JS from
`/_next/...`, which 404s on Pages.

### Consequences of static export

`output: 'export'` means there is no server at runtime. Server Actions, Route
Handlers that read the request, `cookies()`, `headers()`, middleware, ISR, and
`next/image` optimization are unavailable — `images.unoptimized` is on for that
reason. The site is a pure marketing site today, so nothing depends on them, but
adding any server-side feature means moving off Pages to a host that runs Node
(Vercel, or a container). `trailingSlash: true` is set so Pages resolves
directory-style URLs such as `/Endorsely/campaigns/` to `campaigns/index.html`.
