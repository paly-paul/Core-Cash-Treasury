# Handoff: Core Cash — Treasury Application

> **Purpose of this document**: This is a handoff from a chat-based design/prototyping session to Claude Code for implementation. Everything below reflects decisions and artifacts already produced in chat. Claude Code should treat the HTML prototype referenced here as the **source of truth for UX, layout, copy, and interaction patterns** — not as code to port directly, but as a spec to rebuild correctly in the target stack.

---

## 1. Project Identity

| | |
|---|---|
| **Name** | Core Cash |
| **Type** | Treasury / Agentic AI Cash & Liquidity Decision Layer (corporate treasury intelligence product) |
| **Positioning** | TMS-agnostic AI layer — not a TMS replacement. Reads data from banks/ERP/TMS/Excel/aggregators, validates it, explains liquidity risk, and recommends next-best treasury action with human approval required. |
| **MVP risk posture** | Read-only. No autonomous fund movement. Every recommendation requires human approval. |

---

## 2. Tech Stack

### Frontend
- **Framework**: Next.js 16.2.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (utility classes only — **no inline styles**) + Styled Components for complex/stateful component styling
- **State management**: Redux
- **Charts**: To be decided in Claude Code — prototype uses Chart.js (line/bar) and hand-coded SVG (waterfall). Recommend Recharts or keep Chart.js via a wrapper component; confirm before implementing broadly.

### Backend
- **Language**: Python
- **API framework**: FastAPI
- **Agent orchestration**: LangGraph
- **Database**: PostgreSQL
- **Architecture**: Microservices

### Required Project Structure (frontend)
```
core-cash-app/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   └── dashboard/
│   │       ├── _components/
│   │       └── page.tsx
│   ├── components/
│   │   └── ui/
│   ├── features/
│   │   └── profile/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── actions.ts
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── utils/
├── .env.local
├── next.config.ts
├── package.json
└── tsconfig.json
```
**This structure must be preserved exactly.** Every new page below should map to `src/app/<route>/page.tsx`, with route-specific components in that route's `_components/` folder, and any domain logic (e.g. forecast calculations, liquidity risk scoring) living under `src/features/<domain>/`.

---

## 3. Where We Are

### Completed
- **Product strategy & positioning** fully defined (see `Core Cash Agent - Executive Summary.md` and `Core Cash Agent - Blueprint.md` in project files — these are the authoritative product/business documents, covering integration architecture, connector roadmap, controls/security model, commercial model, and the 90-day execution plan).
- **Full UX prototype** built and iterated as a single-file HTML/CSS/JS SPA (no framework) — this is a *design reference*, not production code. Location: `design-reference/core-cash-agent-full-MVP.html`
- **Design system** locked in (light theme only — dark theme explicitly rejected):
  - Colors: BG `#F4F6FA`, Surface `#FFFFFF`, Blue `#0057D9`, Green `#059669`, Amber `#D97706`, Red `#DC2626`, Info `#0369A1`
  - Typography: Inter (UI text), JetBrains Mono (financial figures / data only)
  - Layout: 3-column shell — collapsible sidebar (220px ↔ 52px icon rail) · main content (flex:1) · collapsible AI chat panel (356px ↔ 36px)
  - Signature motif: breathing "pulse dot" animation on all live/real-time status indicators
- **6 fully designed pages** (all interaction states, copy, and layout finalized in the prototype):
  1. **Dashboard** — daily cash position, currency breakdown, account drill-down table, AI recommendation card, liquidity risk section, exceptions/alerts panel
  2. **Forecast** — 7/30/60-day tabs, bar/line/waterfall chart views, entity forecast table, manual assumptions editor, variance analysis with driver breakdown
  3. **Uploads** — file upload zones (bank balances, AR, AP, manual assumptions), column mapping UI, Account Master table with add/edit
  4. **CFO Summary** — full exportable executive report (cover, 7 sections), Live AI Insights panel (auto-refreshing metrics + trend chart), email/PDF/print export
  5. **Daily Briefing** *(new)* — plain-text "Behind Us / Ahead of Us" (±4 days) narrative briefing for CFO leadership conversations, includes precedent callouts and conditional outlook
  6. **Trends & History** *(new)* — 9-section analytical page: YoY same-quarter comparison, self-benchmarking, 6-month trend chart, surprise inflow/outflow ledger, "quietly got worse" creep detector, counterparty concentration, pattern-based predictions (explicitly separated from forecast engine output), scenario stress lines, cost-of-cash strip
- **Navigation & interaction patterns validated**: SPA routing, sidebar collapse-to-icons with hover tooltips, AI chat panel collapse, modal patterns (risk analysis, add assumption, add account), toast notifications, table row collapse/expand.
- **Known UI bugs found and fixed in prototype** (useful context for QA, not to be re-introduced):
  - Flex-child `overflow:hidden` clipping tall content silently instead of scrolling — affected CFO report and Daily Briefing; root cause was `flex-shrink` compressing a card combined with `overflow:hidden`. Fix pattern: `flex-shrink:0` on content wrapper cards inside scrollable containers, never `overflow:hidden` on a card whose content height is variable/unbounded.
  - Sidebar collapse: bare text nodes (not wrapped in a `<span>`) cannot be targeted/hidden via CSS — every nav label **must** be wrapped in its own element for any show/hide or truncation logic to work.
  - Duplicate/conflicting CSS rule blocks from iterative prototyping caused intermittent visual bugs — Claude Code should NOT carry forward old CSS wholesale; treat as a clean rebuild using the prototype as a reference, not a copy source.

### In Progress
- Backend service architecture not yet started (no FastAPI services, no LangGraph agent definitions, no DB schema yet — this is pure frontend prototype to date).
- No real data integration — all data in the prototype is hardcoded/mocked.
- No auth implementation yet (login route exists in required folder structure but has no logic).

### Blockers
- None identified yet from the design phase. Anticipated early blockers to flag in Claude Code:
  - Need decision on chart library before building Forecast/Trends pages broadly (affects bundle size and SSR behavior in Next.js).
  - Need to confirm how LangGraph agent outputs (recommendations, insights, narrative briefing text) will be delivered to frontend — REST polling vs. streaming vs. websockets — since several UI components (Live AI Insights auto-refresh, chat panel) assume near-real-time updates.
  - Backend data model for the "normalized cash model" (per the Blueprint doc: entity/bank/account/currency/statement/balance/transaction fields) needs to be finalized before frontend data-fetching hooks can be built against real shapes instead of mocks.

---

## 4. What Claude Code Should Focus On

1. **Scaffold the Next.js project** using the exact folder structure specified above. Set up Tailwind config with the design system tokens (colors, fonts) as theme extensions — do not hardcode hex values in components. Set up Styled Components with the same token set (likely via a shared `theme.ts` in `src/lib/`). Wire up Redux store skeleton (`src/lib/` or a dedicated `src/store/` if preferred — confirm convention).

2. **Rebuild the Dashboard and Forecast pages first** as the two most data-dense, highest-priority screens. Use `core-cash-agent-full.html` purely as a UX/copy/layout reference — re-implement all markup as proper React components under `src/app/dashboard/_components/` (and a corresponding `src/app/forecast/` route), with shared primitives (buttons, badges, metric cards, status pills, tables) extracted into `src/components/ui/`. Do not copy raw HTML/inline styles from the prototype; translate every inline style into Tailwind utility classes or a Styled Component.

3. **Stand up the FastAPI backend skeleton** with a microservices boundary that mirrors the product's agent model (per the Blueprint's 8 agents: Daily Cash Position, Forecast Intelligence, Liquidity Risk, Action Recommendation, Variance Explanation, CFO Summary, Treasury Continuity, Policy-aware Control). Initial scope: read-only endpoints serving mocked-but-realistically-shaped data so frontend integration can begin in parallel with real LangGraph agent development.

4. **Define the normalized cash data model in PostgreSQL** per the Blueprint's internal model spec (client, legal entity, bank, account, currency, statement date, opening/closing/available/current balance, transaction date, value date, amount, debit/credit, bank transaction code, description, counterparty, reference, source file, ingestion timestamp). This unblocks both backend services and frontend type definitions (`src/types/`).

5. **Build out remaining 4 pages** (Uploads, CFO Summary, Daily Briefing, Trends & History) once the component primitives and data layer from steps 2–4 are stable, to avoid rebuilding shared components multiple times.

6. **Implement auth** under `(auth)/login` — not specified in chat; flag this as an open decision (provider, session strategy) before building.

---

## 5. Reference Materials Available

- `Core Cash Agent - Executive Summary.md` — 4-page condensed business case, useful for quick context.
- `Core Cash Agent - Blueprint.md` — 21-page detailed blueprint; authoritative source for: product scope/agent ownership, integration architecture, bank connectivity flow, connector priority list (BAI2/camt.053/camt.052/MT940/CSV), controls & security model, commercial model, technical complexity ratings, ROI logic, competitive positioning, pilot success criteria, security deep-dive, and the 90-day execution plan.
- `core-cash-agent-full.html` — interactive HTML/CSS/JS prototype, all 6 pages, fully clickable. **Open this in a browser as the primary UX reference** before building each page. Pay attention to: exact copy/microcopy (CFO-facing tone matters — see Daily Briefing and CFO Summary pages especially), empty/warning/error states on metric cards and table rows, and the specific distinction in the Trends & History page between "forecast" output and "prediction/pattern signal" output (these must remain visually and semantically distinct in the real implementation — this was a deliberate product decision, not a style choice).

---

## 6. Design System Quick Reference

```css
/* Colors */
--bg-base: #F4F6FA;
--bg-surface: #FFFFFF;
--blue: #0057D9;     /* primary action / brand */
--green: #059669;    /* positive / normal / success */
--amber: #D97706;    /* warning / attention */
--red: #DC2626;       /* error / critical / breach */
--info: #0369A1;      /* informational */

/* Typography */
--font-ui: 'Inter', sans-serif;
--font-data: 'JetBrains Mono', monospace; /* financial figures ONLY */

/* Layout */
sidebar: 220px expanded / 52px collapsed (icon rail + hover tooltips)
ai-panel: 356px expanded / 36px collapsed
```

**Non-negotiable product/UX principles carried from strategy docs** (Claude Code should enforce these in implementation, not just visuals):
- Every AI recommendation must answer: **Why? What? When? Control?** — this is a structural requirement for the Action Recommendation component, not optional copy.
- Read-only first. No UI affordance should imply autonomous fund movement in MVP.
- Predictions (pattern-based signals) must be visually and architecturally distinct from forecasts (model output) — never merge these data sources or components.
- Human approval is central — recommendation/action components must always surface an approval owner and require explicit confirmation before any "action taken" state.
