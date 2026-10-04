# Evolve Management Suite

Current platform baseline inspected and rebuilt on 4 October 2026 from `main`
at `e5f6feec7f19427be37de3dd0dd6506b74d3701d` (8 March 2026).
The repository is the reference; no live deployment or separate visual reference
was supplied. No product features were added.

## Run and build

Verification used Node 24.19.0 and npm 10.9.4.

```sh
npm ci
npm run dev
npm run build
npm run preview
npm test
npx tsc --noEmit -p tsconfig.app.json
```

Development uses port 8080; production output is `dist/`. Static hosting must
serve `index.html` for application paths so the client router can render its
existing 404. A rebuild does not publish or change a live deployment.
`package-lock.json` is the verified installation baseline. Existing `bun.lock`
and `bun.lockb` were preserved; Bun installation was not verified.

## Structure and routes

| File or directory | Current responsibility |
| --- | --- |
| `index.html` | Root element, Vite entry, Lovable browser title and social metadata |
| `src/main.tsx` | Mounts React and imports global Tailwind CSS |
| `src/App.tsx` | React Query, tooltip and toast providers; browser routing |
| `src/pages/Index.tsx` | Renders Evolve at `/` |
| `src/pages/Evolve.tsx` | Entire product shell, seed records, styling and five screen components |
| `src/pages/NotFound.tsx` | Catch-all `*` route and return-home link |
| `src/components/ui/` | 49 shadcn/Radix scaffold UI files |
| `src/components/NavLink.tsx` | Router link helper, unused by Evolve navigation |
| `src/hooks/` | Toast state and mobile-width hook; mobile hook unused by Evolve |
| `src/lib/utils.ts` | Class-name utility |
| `src/index.css`, `tailwind.config.ts` | Scaffold theme and Tailwind configuration |
| `src/App.css` | Unimported starter stylesheet |
| `public/` | Favicon, placeholder SVG and robots file |
| `vite.config.ts` | React SWC, source alias, development component tagging |
| `vitest.config.ts`, `src/test/` | jsdom setup and platform regression tests |

The five screens are local React views selected by `Evolve.view`. They all use
`/`; there are no separate screen routes, deep links or navigation history
entries. Dashboard shortcuts set the same view state as the sidebar.

Scaffold components include forms/inputs, dialogs/drawers/sheets, tables,
navigation, menus, cards, badges, charts, carousels, calendars, sidebar controls,
tooltips and toasts. Evolve uses its own inline markup and styles. The app shell
connects the tooltip/toast infrastructure; React Query makes no data requests.

## Screens and existing interactions

| Component | Content and behavior |
| --- | --- |
| `Dashboard` | Command Centre with five summary cards, needs-attention list, next confirmed shows, six-track preview, financial snapshot and four shortcuts. Reads seed records directly. |
| `Bookings` | 24 seed records, search by promoter/city/venue/event type/status, collapsible status groups, totals, detail drawer, add/edit form, immediate deletion, travel-party selection and document/logistics text fields. |
| `Pipeline` | One FREE Deluxe project, 12 tracks, ten sequential stages, negotiation badges and ZAR beat fees, track drawer, stage completion updates, five delivery flags and readiness indicator. |
| `Financials` | Platoon Deal, Invoices, Revenue and UMG Royalties tabs. $200,000 drawdown: $50,000 non-recoupable and $150,000 recoupable; 60/40 revenue share and recoupment estimate. 12 invoices and six revenue records; add/edit invoices; read-only revenue. |
| `Contacts` | 14 contacts: three partners, ten producers and one engineer. Search name/role/company/notes, category filters, cards/detail panel, add/edit contacts, add negotiations and change their status. |

Booking statuses: Enquiry, Invoice Submitted, Confirmed, Contract Issued,
Contract Signed, Deposit Received, Fully Paid, Completed and Cancelled.
Empty groups are hidden. Invoice Submitted, Confirmed, Contract Issued and
Deposit Received start expanded.

Pipeline stages: MP3 Received, Producer ID'd, Licence Negotiation, Beat Payment,
Stems Requested, Stems Received, Sent to Mix, Mix Returned, Artist Approval,
Platoon Delivery. Clicking a later stage completes preceding stages; clicking
the last completed stage rolls back one stage. The independent delivery flags
cover audio, signed contracts, split sheet, lyrics and cover art. They record
booleans, not uploaded files.

## Data flows and persistence

All records are constants in `Evolve.tsx`: `IB`, `IP`, `PLATOON_DEAL`,
`INIT_INVOICES`, `INIT_REVENUE`, `INIT_CONTACTS`. Each screen initializes its
own `useState` from them. Forms update local arrays; filters and totals derive
from those arrays. Detail selections are separate state, explicitly synchronized
by pipeline and contact updates.

Changing screens unmounts the previous component and discards edits. Reloading
also resets records. Dashboard always reads seed data and does not reflect edits
in other views. There is no backend, database, browser storage, authentication,
file storage, GitHub API integration, payment service, or live Platoon/UMG
connection. Repository connector access is separate from app functionality.

## Visual identity

Preserved: fixed 220px sidebar, full-height scrolling content, dark background
`#0A0A0C`, surface `#111113`, border `#1E1E22`, off-white text `#E8E6E1`, gold
`#C9A84C`, colored workflow statuses, thin rounded cards, right-side sliding
forms/drawers, emoji icons and segmented progress bars.

Syne headings, DM Sans body text and DM Mono figures load from Google Fonts.
Inline styles and an injected CSS string override much of the scaffold light
Tailwind theme. The 404 retains the scaffold light theme. Evolve has no responsive
breakpoint system: fixed sidebar and desktop grids remain on narrow screens,
causing clipping and overflow.

## Changes and validation

- Repaired the stale npm lock file. Clean `npm ci` failed because existing test
  dependencies were missing from the lock. `package.json` and direct runtime
  dependency versions were preserved. npm also resolved three existing transitive
  packages to newer compatible versions: sourcemap-codec, debug and hasown.
- Added seven behavior regression tests alongside the original example test:
  all views and unchanged URLs; booking add/search/edit/delete; navigation reset;
  pipeline delivery toggles; invoice creation and financial tabs; contact and
  negotiation creation/status changes; existing 404 route.
- Replaced the placeholder README with this inventory and reproducible setup.
- Product source, markup, seed data, public assets, routing and styling are
  unchanged. The platform was built directly from its original source.

Verified: clean npm installation, production build, application TypeScript
check, eight passing tests, browser inspection of all five product screens,
and empty browser error logs. Desktop (1440px) and narrow (390px) previews were
inspected; the original narrow-screen limitation remains.

Lint is a pre-existing failing check: 144 errors and seven warnings, primarily
explicit `any` types, empty scaffold interfaces, a require-style import and
Fast Refresh export warnings. These were documented without broad source edits.
The build also reports stale Browserslist data; no broad dependency upgrade was
included.

## Gaps requiring owner decisions

1. Supply the live platform URL or authoritative reference if the current
   platform differs from this repository. Exact parity with an unseen deployment
   cannot be confirmed. Only `main` was present remotely at inspection.
2. Confirm whether embedded records are approved current records or demonstration
   data. Dates, contacts and financial assumptions were preserved.
3. Confirm intended persistence/dashboard synchronization before changing the
   existing reset-on-navigation behavior or connecting a backend.
4. Define `+ Add Track`, `+ Upload Statement` and statement attachment actions.
   These buttons have no handlers. Text saying Uploaded does not link to a file.
   Implementing them would add functionality.
5. Confirm date and currency rules: Next Confirmed Shows uses fixed cutoff
   `2026-03-08`; the header and financial estimate use the browser clock.
   Booking payment totals do not convert currencies. Beat fees/contact notes
   use ZAR while invoices for the same work use USD; totals do not convert.
6. Existing invoice edits can store amount text instead of numbers and affect
   totals. Negotiation changes do not synchronize pipeline statuses or contact
   tags. These behaviors remain pending a separate correction request.
7. Decide whether later work should address mobile layout, accessibility
   (visual form labels/clickable divs), lint errors, light 404 styling, and
   remaining Lovable browser/social metadata and favicon. No redesign or rebrand
   was included.
