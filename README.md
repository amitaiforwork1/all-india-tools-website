# All India Tools Supplying Agency — Website Starter

A responsive business website starter built with plain HTML, CSS and JavaScript. It can be hosted on GitHub Pages.

## Included
- Premium corporate-style homepage
- About, product catalogue, gallery and contact sections
- Product search and category filters
- Individual product detail popups
- WhatsApp contact button
- Enquiry form that prepares an email via `mailto:`
- Basic SEO metadata and Organization structured data
- Demo customer login/register interface
- Browser-only product editor at `admin.html`
- Privacy notice

## Important before going live
1. Edit `config.js` and enter the real business email, phone number and WhatsApp number. WhatsApp number must be digits only with country code, e.g. `91` + Indian mobile number.
2. Replace placeholder photos with your own product/company photos and ensure you have rights to use them.
3. Update the canonical URL and structured-data URL in `index.html` after you know the GitHub Pages URL.
4. Replace illustrative catalogue items with your actual products, specifications and brands.
5. Test every link and the enquiry process.

## GitHub Pages deployment
1. Sign in at https://github.com and create a new **public** repository, for example `all-india-tools-website`.
2. Upload all files and folders in this project to the repository root. Keep `index.html` at the root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then click **Save**.
6. Wait for GitHub Pages to publish. Your URL will look like `https://YOUR-USERNAME.github.io/all-india-tools-website/`.
7. Open the URL on desktop and mobile and test the site.
8. Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` in the canonical URL and JSON-LD URL in `index.html`, then commit the change.
9. In Google Search Console, add the site property and request indexing for the homepage. Indexing is not guaranteed and may take time.

## How the catalogue editor works
Open `/admin.html`. This demo can add/edit/delete products in the current browser's localStorage and export JSON. It does **not** update the public catalogue for all visitors. To publish changes made in this demo, edit the source or use a real backend.

## Security and functionality limitations
GitHub Pages only serves static files. The login/register UI is a demo and does not authenticate users securely. The admin page has no authorization. Do not enter real passwords or confidential data. There is no real payment processing or checkout in this starter.

For real customer accounts, a shared admin panel, cloud product management, enquiry storage and payments, add a backend/authentication/database service and a payment provider such as Razorpay or Stripe (availability and eligibility vary). Keep secret API keys on a server, never in front-end JavaScript. Payment integration requires merchant onboarding, a backend and testing; do not collect card details directly on this static site.

## File structure
- `index.html` — homepage and sections
- `styles.css` — responsive styling
- `app.js` — catalogue, forms, demo account UI
- `config.js` — business contact settings
- `admin.html` — browser-only catalogue editor demo
- `privacy.html` — starter privacy notice
- `assets/` — favicon and placeholder image
