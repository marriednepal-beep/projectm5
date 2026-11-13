# Married Nepal - official circular logo update

This update changes **only the website's logo artwork and the two small decorative symbols**. It keeps the same design, page layouts, fonts, payment settings, registration workflow and Firebase code.

## Uploading to GitHub

1. Extract `Married_Nepal_Logo_Update_GitHub_Only.zip` to your computer.
2. Open the **existing** GitHub repository connected to Vercel (for example `marriednepal-beep/projectm5`).
3. Choose **Add file -> Upload files**.
4. Drag the extracted `app`, `components`, and `public` folders to the GitHub upload area **at the repository root**.
5. Commit directly to `main`. Vercel should start another build automatically.
6. Hard-refresh the live site (`Ctrl+F5`) after the deployment is successful.

There is no need to upload `node_modules`, run a new Firebase setup, change Firestore security rules, or create a new Vercel project for this branding-only change.

## What changed

- Header and footer: replaces the rejected outline/tree mark with the supplied circular gold logo.
- Homepage: replaces the gold asterisk in the search strip with a small official logo, and reduces other star ornaments.
- Favicon assets: keeps the same official circular emblem; replaces older SVG paths that had an outdated symbol.
- Custom logo support remains in Admin Studio > Images & Logo.

## Important - older admin-uploaded logos

If you previously uploaded the rejected logo through Admin Studio > **Images & Logo**, that database image overrides the newly corrected default. In that case, open the owner panel and **remove the existing custom Official Logo** (to use the corrected default), or upload the official circular logo again. Do the same for Favicon if a custom favicon was uploaded.

The circular official logo is supplied in `public/images/married-nepal-logo.webp` and `public/icon-256.png`.

## Safety and status

Only the branding presentation changed. TypeScript syntax was checked for the edited TSX files and the ZIP archive was verified. Live deployment, browser rendering and Firebase behavior still need to be confirmed on your Vercel site. The accompanying owner guide is for your client and **should not be uploaded into the GitHub repository**.
