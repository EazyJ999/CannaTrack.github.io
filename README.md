# LeafFinder ZA

National locator for cannabis stores in South Africa: search by province/city/near me, published menus per store, WhatsApp ordering, store applications, admin approval and owner self-service editing.

Stack: Next.js 15 (App Router), TypeScript, Tailwind, Supabase (Postgres). Deploys to Vercel.

## Run locally
    npm install
    npm run dev
With no env vars set it runs in **demo mode** with fictional seed stores (read-only).

## Go live (about 15 minutes)
1. Create a free Supabase project. In the SQL editor, run `supabase/schema.sql`.
2. Copy `.env.example` to `.env.local` and fill in the Supabase URL, anon key and **service role key** (server only, never expose it), plus `ADMIN_PASSWORD`, `ADMIN_SECRET` (any long random string), `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ADMIN_WHATSAPP`.
3. Push to GitHub, import into Vercel, add the same env vars, deploy.
4. Open `/admin`, sign in, add or approve stores.

## How onboarding works
- Owners apply at `/list-your-store` (status: pending, hidden from the public).
- You review at `/admin`, approve, then tap **Send edit link** to WhatsApp the owner their private `/manage/<token>` page.
- Owners edit store details and menu there. They can't change status or URL.
- You can also add stores yourself at `/admin`.

## Customise
- Name, tagline, provinces and cities: `lib/site.ts`
- Colours: `tailwind.config.ts`
- Menu categories: `CATEGORIES` in `lib/site.ts`

## Before launch
Cannabis commerce in South Africa is legally sensitive. Get legal advice, tighten `/legal`, and consider what you require from stores (licences, product limits) before approving them.
