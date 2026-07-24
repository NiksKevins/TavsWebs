# TavsWebs

Premium portfolio website for **TavsWebs** — a web development agency.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber / Drei
- Lenis smooth scrolling
- next-intl (LV / EN)
- Resend (contact form)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Resend (contact form)

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys)
2. Copy `.env.example` → `.env.local` and set:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` (defaults to `tavswebs@gmail.com`)
   - `RESEND_FROM_EMAIL` — use `TavsWebs <onboarding@resend.dev>` for testing, or a sender on your [verified domain](https://resend.com/docs/dashboard/domains/introduction)
3. Restart `npm run dev`

Inquiries post to `/api/contact` and arrive at `CONTACT_TO_EMAIL` with the visitor set as `replyTo`.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm start` — serve production build
- `npm run lint` — ESLint

## Customize

Update contact details in `src/lib/data.ts`. Copy lives in `messages/lv.json` and `messages/en.json`.
