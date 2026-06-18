# SmartSplit Frontend

Next.js 16 application for the SmartSplit expense-tracking platform.

## Quick Start

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```bash
npm run dev    # http://localhost:3000
npm run build  # production build
npm run start  # production server
npm run lint   # ESLint
```

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS 4**, **Framer Motion**, **Lenis** (smooth scroll)
- **shadcn/ui** components, **Lucide** icons

## Key Directories

| Path | Purpose |
|------|---------|
| `app/` | Pages and Next.js API routes |
| `components/` | UI, layout, modals, charts, auth |
| `context/AppContext.tsx` | Auth, theme, currency, splash state |
| `lib/api/` | FastAPI client modules |
| `types/` | Shared TypeScript interfaces |
| `public/` | Static assets (GIFs, logos) |

## API Client

All backend calls go through `lib/api/index.ts`:

```ts
import { api } from '@/lib/api';

await api.login(email, password);
await api.getTrips(userId);
await api.addDailyExpense(userId, data);
```

The HTTP client (`lib/api/client.ts`) reads `NEXT_PUBLIC_API_URL` and attaches the JWT from `localStorage`.

## Full Documentation

See the [root README](../README.md) for features, architecture, project structure, and backend setup.
