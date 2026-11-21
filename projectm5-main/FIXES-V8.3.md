# Married Nepal V8.3 — Public UI and Payment Improvements

- Restores full top navigation: Home, About Us, Services & Fees, Registration Form, Rules & Guidelines, Privacy Policy, Contact Us. Active tab uses readable dark text on light gold. Mobile menu contains all pages.
- Fixes public-consent checkbox wrapping by preventing shared input styles from stretching checkboxes.
- Shows three payment tabs (eSewa, Khalti, Bank Transfer) with no “Unavailable” or “Pay Later” tabs. If no verified receiving account is set by the administrator, shows a professional WhatsApp verification panel and permits unpaid registration without inventing bank details.
- Once an admin enables a method with actual account details, the corresponding account and QR appear and visitors can submit a private receipt. Proof is validated when the admin requires it.
- The Firebase web-app PUBLIC identifiers provided by the owner are set as overridable defaults. **They are not administrator credentials**. Admins must still enable Email/Password and Anonymous Auth and publish Firestore rules. Vercel environment variables override the defaults.
- Technical configuration errors are not exposed to visitors. Failures get generic service messages and cannot be mistaken for successful registration.

## Updating an existing GitHub repository
Replace the changed files (`app/globals.css`, `app/register/register-form.tsx`, `components/shell.tsx`, `components/alerts.tsx`, `lib/firebase.ts`) with this package and commit. For convenience, the complete source project is also included. Keep `node_modules`, `.next`, `.env.local` and other secret environment files out of GitHub.

## Firebase setup
Firebase Console: Authentication → Sign-in method → Enable Anonymous and Email/Password. Firestore Database → Rules → publish `firestore.rules`. For your deployment, add `marriednepal.vercel.app` under Authentication → Settings → Authorized domains. Verify administrator UID and `admins/{uid}` document. Never publish placeholder payment details.

## Status
Source-level checks only in this environment. Run `npm install && npm run build` and verify registration, payment and admin review with real Firestore before accepting payments or personal data.

## Admin-uploaded payment QR codes
Payment defaults are exactly the accounts supplied in the screenshots: eSewa `9801234567`, Khalti `9801234567`, and Nabil Bank A/C `01201017500123` (New Baneshwor, Kathmandu); account name `Married Nepal Pvt. Ltd.`. These are **owner-provided defaults**, not independently verified banking details. Check them before accepting actual payments.

Sign in as the authorized administrator, open **Admin Studio → Fees, Payment Methods & FAQs**, and use **Upload QR** in each method's card. You can replace or remove the QR there. The same QRs can also be managed under **Website Media & Official Branding**. The site will show the uploaded QR automatically; it never generates a pretend QR. This works with Firestore Spark as compressed image data in the public `siteAssets` documents, subject to document size and free quotas. Make a real test scan of each QR after upload to ensure the compression did not make it unreadable.

If old Firestore settings already include disabled payment methods or different accounts, the saved settings override these code defaults. Edit them in the Admin panel and click **Publish Fees, Payment Accounts & FAQs**.
