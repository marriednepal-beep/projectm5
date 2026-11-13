# Married Nepal — V8.1 runtime fix

The homepage crashed with `ReferenceError: brand is not defined` at `app/page.tsx` because the final WhatsApp CTA used `brand.whatsapp` without importing it.

Fixed by adding:

```tsx
import {brand} from "@/lib/constants";
```

Also made the homepage WhatsApp button respect the admin-configured contact number and clarified TypeScript typing of the administrator record map to avoid misleading inference errors. This release does **not** alter the approved website design or the Firebase rules.

## To test

1. Use this project folder (do not merge with old versions).
2. Run `npm install` (requires internet).
3. Run `npm run dev`.
4. Open `http://localhost:3000` and check homepage, ` /fees`, `/register`, and `/login`.
5. Add the Firebase configuration under `.env.local` (from `.env.local.example`) and test a registration with valid rules before going live.

The local source validation does not replace a full `npm run build` and integration test.
