# MARRIED NEPAL — V8 | GitHub, Firebase, Vercel & Test Checklist

## Start here

This repository is the **source folder**. Upload its **contents** to the root of a private GitHub repository. Do not upload the ZIP itself, `node_modules`, `out`, `.next`, `.env.local`, or any secret keys.

### 1. Local preview before deployment

1. Install Node.js 22.
2. Extract the ZIP to a new folder; do not merge with V6 or V7.
3. In PowerShell, open this folder and run `npm install` and then `npm run dev` (or use `RUN-WEBSITE-WINDOWS.bat`).
4. Open **http://localhost:3000**, not port 8000. The old port-8000 application is a different Python website.
5. Verify Home, Services & Fees, Registration, Find Partner, Contact, and the admin sign-in form.
6. Run `npm run test:source`. The structural tests are **not** Firebase integration tests.
7. Run `npm run build` and resolve any errors before deployment. This could not be completed in the generation environment because npmjs.org DNS was unavailable.

### 2. Firebase project

Use project `marriednepal-282f5`. Your public Firebase Web App settings are already in `.env.example` and `.env.local.example` as examples. They are NOT server secrets.

**Authentication**: Firebase Console → Build → Authentication → Sign-in method → enable **Email/Password** (administrator only) AND **Anonymous** (background applicant submissions). There is **no customer login page and no customer password field**.

**Firestore**: Firebase Console → Firestore Database → Rules → paste the entire `firestore.rules` → Publish. The rules intentionally make all application, member, photograph, payment and consent documents **admin-read-only**. Temporary anonymous sessions have create-only permissions for a new submission. They cannot read private data after writing it.

**Bootstrap the owner manually:** Firebase Authentication → Users → create or verify `admin@marriednepal.com` with a strong password you choose. Copy the **actual** UID of that account. Firestore Database → Data → create collection `admins` → document ID = **actual UID** → fields `role` (string) `owner` and `email` (string) `admin@marriednepal.com`. **Never assume an old UID corresponds to the new auth account.** There is no public admin creation route.

**Do not** add an allow-all rule. Do not put a Firebase service-account JSON in GitHub. No Google Cloud Storage/Cloud Functions are used; photos are highly compressed and stored as limited-size private Firestore document fields. The Spark free tier is subject to quotas, and this is suitable only for a relatively small initial workload.

**Important security limitation:** Firestore Rules enforce access, but they are not a full spam-defense system. Anonymous signup can be abused. Before accepting real personal information, configure App Check where practical, test rules in Firebase Emulator, add anti-spam controls and data-retention/deletion procedures, and perform an independent security review. Admin deletion removes Firestore records; temporary Firebase Auth identities can require a separate console cleanup.

### 3. Vercel GitHub deployment

1. Create a **private** GitHub repository called `marriednepal` and add this source folder's contents to the repo root.
2. Vercel → Add New Project → import your repository → framework Next.js.
3. Settings → Environment Variables → copy the `NEXT_PUBLIC_*` variables in `.env.example`. Set `NEXT_PUBLIC_SITE_URL=https://marriednepal.com.np` for your production build.
4. Deploy and visit `https://marriednepal.vercel.app` **if that project name is available**. Confirm it renders the *new* code, not an old deployment.
5. Project Settings → Domains → add `marriednepal.com.np`, optionally `www.marriednepal.com.np`. Apply **the exact DNS records Vercel displays** at your domain registrar; do not guess A/CNAME values.
6. Firebase Authentication → Settings → Authorized domains → add `marriednepal.vercel.app`, `marriednepal.com.np`, and `www.marriednepal.com.np` only if used. Add localhost for development where appropriate.
7. Visit `/login` with your staff account and open `/admin`.

**Vercel Hobby is restricted to non-commercial personal use.** A business such as Married Nepal must use an eligible Vercel commercial plan or choose another permitted host. If strictly zero-cost commercial hosting is required, evaluate Firebase Hosting Spark using the included `firebase.json` and exported `out` directory. Do not violate provider terms.

### 4. Admin workspace checks

- Overview counts should be **0** on a blank database, not fake demo figures.
- Submit ONE **test** registration using a different browser from the admin session; a user should **not** be asked to create an account.
- Confirm **Profile Requests** shows the complete private data, not just the public name/photo.
- Confirm **Photo Approval** shows uploaded photographs, and **Payments & Receipts** displays private proof and allows manual verification.
- Approve the profile, approve one photo, check explicit public consent, then publish. Confirm public collection `publicProfiles/{submissionUid}` has **only `name` and `photo`**.
- Visit public search and profile. Confirm no age, phone, district, education, or payment info leaks to browser network or markup.
- Hide profile and verify public document disappears. Test rejecting and editing records.
- Submit an inquiry and confirm it appears in **Match Inquiries**. WhatsApp actions open a prefilled draft; a human must press Send.
- Test Theme Library → select a palette → Publish → revisit site; then **Restore original design** and verify the cream / maroon / gold appearance returns.
- Test Fees & FAQs → current defaults Rs 2,000 male, Rs 1,500 female, Rs 5,000 **joint** success fee (total Rs 8,500).
- Verify logo, QR images, page text, contact information, form labels, and color edits in the relevant admin sections.

### 5. SEO & Search Console

- Canonical preferred site: `https://marriednepal.com.np`.
- `https://marriednepal.com.np/robots.txt` and `/sitemap.xml` are generated by Next.js. Verify once deployed.
- Register the domain property with Google Search Console using DNS TXT verification, or configure the provided `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` variable and redeploy for an HTML tag verification.
- Submit `https://marriednepal.com.np/sitemap.xml`, request indexing of the homepage, About, Services & Fees, and matrimonial guide.
- `/login`, `/admin`, `/profile`, `/registration-submitted` and `/dashboard` should not be indexed; **do not put private details in metadata or sitemaps**.
- Public CMS SEO text changes after initial build do not update Google's static prerendered meta tag until a rebuild. The admin UI labels this limitation. Rank #1 is not guaranteed.

### 6. What the product does and does not do

**Included:** public bilingual pages, 6-step registration, anonymous submissions (no customer accounts), Firestore private applications, admin review/approve/reject/edit, separate photo approval, payment receipt review, private matchmaking inquiries, name/photo-only public profiles, image/logo/QR editor, theme library and original restore, admin-editable fees and FAQs, contact/social editor, baseline technical SEO.

**Not included:** automatic WhatsApp Business API notifications, live payment gateway validation, email confirmation for visitors, Firebase Storage on Spark, automated deletion of Firebase anonymous auth identities, fully general drag-and-drop page building, automatic dynamic SEO regeneration, guarantees of zero operating costs or #1 search ranking.

### 7. Admin login

- Staff URL: `/login` (e.g. `https://marriednepal.com.np/login`)
- Admin work area: `/admin`
- Login is **email and password only for authorized staff**; no username/password hints appear on the public login form.
- If login succeeds but admin permission is missing, verify `admins/{uid}` in Firestore, the corresponding Firebase Authentication user, and published rules.

**Do not accept real registrations until the live submission, admin approval, public privacy and rules-emulator checks have passed.**
