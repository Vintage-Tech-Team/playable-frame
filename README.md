# EstateUtil — Real Estate Productivity Platform (MVP)

Modern utility platform with **17 real estate calculators**, **10 global tools**, and **10 measurement converters**. Built as a production-ready monorepo.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn-style UI |
| Forms | React Hook Form + Zod |
| State | Zustand |
| Charts | Recharts |
| Backend | NestJS, REST, Swagger |
| Database | PostgreSQL + Prisma |
| Shared | `@estate/formulas` — modular calculator & conversion engine |

## Project Structure

```
apps/
  web/          # Next.js frontend
  api/          # NestJS backend + Prisma
packages/
  formulas/     # Shared pure formula functions
docker-compose.yml
```

## Prerequisites

- Node.js 20+
- Docker (for PostgreSQL)
- npm 10+

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Start PostgreSQL

```bash
docker compose up -d
```

### 3. Configure environment

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

### 4. Database setup

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 5. Build shared formulas

```bash
npm run build -w @estate/formulas
```

### 6. Run development servers

```bash
npm run dev
```

- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001/api
- **Swagger:** http://localhost:3001/api/docs

Or run separately:

```bash
npm run dev:api
npm run dev:web
```

## API Modules

| Module | Path prefix | Description |
|--------|-------------|-------------|
| `calculators` | `/api/calculators/*` | 17 real estate calculators |
| `global-tools` | `/api/global-tools/*` | Currency, weather, time, holidays |
| `converters` | `/api/converters/*` | Unit conversion engine |
| `utilities` | `/api/utilities/*` | Tool metadata, seed, history (structure-ready) |

## Real Estate Calculators

Mortgage, Commission, Seller Net, Closing Costs, ROI, Rental Income, Affordability, Down Payment, Refinance, Cash Flow, Cap Rate, Mortgage Payoff, DTI, Price Per Sq Ft, Appreciation, Investment Analyzer, Offer Comparison.

Formulas live in `packages/formulas` with placeholder comments where client-specific business rules may apply.

## Global Tools

Currency (ExchangeRate-API), World Clock, Time Zone Compare, Meeting Planner, Date Difference, Duration, Weather (Open-Meteo), UTC Converter, City Distance (Haversine), Holiday Calendar (sample data — swap for Nager.Date in production).

External APIs are abstracted in `apps/api/src/modules/global-tools/services/`.

## Database

- **Tool** — metadata for all tools (seeded on first list request)
- **CalculatorHistory** — optional history (structure ready)
- **AppConfig** — key/value configuration
- **ApiCache** — external API response cache

## Deployment

The frontend deploys to **Vercel**. The NestJS API and PostgreSQL must run elsewhere (Railway, Render, Fly.io, etc.) — Vercel hosts the Next.js app only.

### 1. Deploy API + database (do this first)

1. Create a PostgreSQL database ([Neon](https://neon.tech), [Supabase](https://supabase.com), or Railway).
2. Deploy `apps/api` to Railway/Render/Fly.io with:
   - `DATABASE_URL` — Postgres connection string
   - `PORT` — platform default (often injected automatically)
   - `CORS_ORIGIN` — your Vercel URL, e.g. `https://estate-util.vercel.app`
   - `CORS_ALLOW_VERCEL=true` — optional, allows `*.vercel.app` preview deployments
3. Build command: `npm install && npm run build -w @estate/formulas && npm run build -w api`
4. Start command: `npm run start:prod -w api` (from repo root) or `node dist/main` from `apps/api`
5. Run migrations: `npx prisma migrate deploy` (or `db push` for MVP) in `apps/api`
6. Seed tools: `npm run db:seed -w api`
7. Note your public API URL, e.g. `https://your-api.railway.app/api`

### 2. Deploy frontend to Vercel

**Option A — Vercel Dashboard (recommended)**

1. Push the repo to GitHub/GitLab/Bitbucket.
2. [vercel.com/new](https://vercel.com/new) → Import the repository.
3. **Root Directory:** `apps/web` (Edit → Root Directory).
4. Framework should auto-detect **Next.js** (uses `apps/web/vercel.json` for monorepo install).
5. **Environment variables:**

   | Name | Value |
   |------|--------|
   | `NEXT_PUBLIC_API_URL` | `https://your-api-host.com/api` |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` |
   | `NEXT_PUBLIC_SITE_NAME` | `EstateUtil` |

6. Deploy.

**Option B — Vercel CLI**

```bash
npm i -g vercel
cd apps/web
vercel login
vercel link
vercel env add NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_SITE_NAME production
vercel --prod
```

After the first deploy, set `NEXT_PUBLIC_SITE_URL` to your final production domain and redeploy.

### 3. Wire CORS on the API

Set on your API host:

```env
CORS_ORIGIN=https://your-project.vercel.app,https://your-custom-domain.com
CORS_ALLOW_VERCEL=true
```

### Environment variables reference

See `apps/api/.env.example` and `apps/web/.env.example`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | API + Web concurrently |
| `npm run build` | Build formulas, API, and web |
| `npm run db:push` | Push Prisma schema |
| `npm run db:seed` | Seed tool metadata |

## Out of Scope (MVP)

Authentication, billing, CRM, admin dashboards, and AI features are intentionally excluded.

## License

Private — all rights reserved.
