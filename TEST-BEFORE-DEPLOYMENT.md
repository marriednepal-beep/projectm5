# Married Nepal V7 — test before deployment

## What the developer has checked
- 50 TypeScript/TSX source files parsed without syntax errors; this **is not a TypeScript typecheck**.
- 39 structural/source checks and 12 V7-specific source checks passed.
- CSS stylesheet parsed with no top-level syntax errors.
- Offline visual layout previews generated for desktop, mobile and owner-admin appearance; the admin preview intentionally contains **sample data**. This does **not** verify Next.js runtime behavior or Firebase permissions.
- A full `npm run build`, `npm run typecheck`, Firestore Emulator rules test, and live registration-to-admin test **remain to be done** because package installation timed out in this environment.

## Preview your real website
1. Extract ZIP to a NEW folder. Do not mix its source files with the old Python server or V6 folder.
2. Install Node.js 22 or newer.
3. Review `.env.local.example`; double-click `RUN-WEBSITE-WINDOWS.bat`, or in a terminal run:
   ```bat
   npm install
   npm run dev
   ```
4. Open **http://localhost:3000**, not port 8000.
5. Confirm the white navigation, **Playfair Display** headline (Google Font), cream/maroon colors and Boudhanath hero. Check at phone width too.
6. Run `npm run typecheck` and `npm run build`. Resolve all build errors before deploying.

## Firebase checklist
1. Publish the bundled `firestore.rules` (see `COPY-INTO-FIRESTORE-RULES.txt`) in the correct Firebase project `marriednepal-282f5`.
2. In Firebase Authentication, enable Email/Password, create or verify the intended owner email and confirm its **actual UID**.
3. Create `admins/{uid}` in Firestore using the console, never through a public signup form.
4. Log in at `/login`; browse to `/admin`. It must show the new owner dashboard.
5. Register a **test** member, submit a photo and optional fake test payment proof. Confirm the new request reaches `/admin` automatically without reloading.
6. Review the full dossier, confirm private contact, address, education, family details, preferences and photos are there.
7. Approve application first; approve photo separately; confirm it remains private without publication consent.
8. Test consent and publish. Check publicly available Firestore `publicProfiles/{uid}` contains **ONLY `name` and `photo`**.
9. Verify a signed-out browser **cannot fetch** private `applications`, `members`, `profiles`, `profilePhotos` or `paymentProofs` via the Firebase SDK, even when it knows a UID.
10. Check unpaid or falsely uploaded test receipts are never treated as verified payments.
11. Test withdrawal of consent, profile hiding, rejection and report/change-request screens.
12. Delete test personal information after completion.

## Release conditions
Do not collect real sensitive matrimonial information until the site passes a live build, database permission tests, admin approval flow, photo/receipt privacy tests, abuse controls and review of privacy/terms. The bundled rules protect data only once deployed.
