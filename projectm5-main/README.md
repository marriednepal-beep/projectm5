# Married Nepal — GitHub-ready final source (V8)

**This ZIP contains the repository files, not `node_modules`.** Extract it and upload the contents to a **private** GitHub repository. The website uses Next.js, Firebase Authentication (admin account only; background anonymous visitor submissions), Cloud Firestore and static-output hosting.

**Local preview:** `npm install` → `npm run dev` → <http://localhost:3000>. A full build must be run and verified on your computer or Vercel because the package registry was unavailable in the generation environment.

**Next steps:** Read [DEPLOY-AND-TEST.md](DEPLOY-AND-TEST.md), publish `firestore.rules`, enable Firebase Authentication Email/Password + Anonymous, create/verify the admin UID manually, run test registrations, then deploy. Never accept private matrimonial data until live security testing is complete.

The established Playfair/DM Sans typography, Boudhanath hero, cream background and maroon/gold identity have been retained. Theme Library in `/admin` can switch palettes and restore the original.
