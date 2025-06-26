# Forezy Prediction Markets (MVP/POC)

A hackathon-ready, full-stack prediction market dApp built with Next.js, TypeScript, Tailwind, and Express (mocked backend). All UI and flows are mocked for rapid prototyping.

## Monorepo Structure

```
forezy-web/
  apps/
    forezy/      # Next.js 14 App Router frontend (UI only, all data mocked)
    backend/     # Express backend (mock API, not required for UI to work)
  packages/
    shared/      # Shared types (for future use)
```

## Features (MVP)
- Wallet connect & deposit UI (mocked)
- Market listing page (mocked)
- Market detail & betting UI (mocked)
- User portfolio/my bets page (mocked)
- Withdraw UI (mocked)
- Admin market creation UI (mocked)

## How to Run (Frontend Only)

1. **Install dependencies:**
   ```bash
   cd apps/forezy
   npm install
   ```
2. **Start the dev server:**
   ```bash
   npm run dev
   ```
3. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

> All data is mocked. No wallet, Supabase, or blockchain integration is required for the MVP.

## How to Run (Mock Backend, optional)

1. **Install dependencies:**
   ```bash
   cd apps/backend
   npm install
   ```
2. **Start the backend:**
   ```bash
   npm run dev
   ```
3. **API runs at** [http://localhost:3001](http://localhost:3001)

> The frontend does not require the backend to run for the MVP.

## Tech Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Shadcn UI conventions
- Lucide Icons
- Express (mock API)

## Customization
- All UI colors and branding are set in `tailwind.config.js` and `globals.css`.
- All data is mocked in the UI components for rapid iteration.

---

**Built for hackathons. Ready for real integrations when you are!**