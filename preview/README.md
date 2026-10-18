# A to Z Horse Cookies — local website review

A separate, static before-and-after prototype. Nothing here modifies WordPress, Shopify, customer subscriptions, DNS, or the production website. No real sign-in, messages, checkout, tracking, or billing is connected.

## Run locally

Requires Node.js 18 or later. No package installation or build is needed.

```sh
cd /Users/erik/Documents/ChatGPT/A-to-Z/preview
npm run dev
```

Open http://127.0.0.1:4173. The server binds only to this computer. Stop it with Ctrl+C. Set `PORT` if 4173 is occupied.

## Review the proposal

- Switch between **Current site** and **Proposed updates**.
- Choose a page using **Explore**; test the **Mobile** width as well.
- Open **Review notes** for the rationale and scope limits.
- In the proposed account, click **Explore sample account**, then try skipping, pausing, resuming, cancelling, changing schedule, editing the sample shipping address, or changing the fictional payment method.
- Open either product, choose a one-time or recurring sample purchase, and add it to the disconnected bag.
- **Reset demo** restores the current proposed frame’s in-memory data. Reloading or switching between current and proposed also starts a fresh sample account.

Example deep links:

- Homepage: http://127.0.0.1:4173/#mode=proposed&page=home
- Subscription demo: http://127.0.0.1:4173/#mode=proposed&page=account
- Saved current homepage: http://127.0.0.1:4173/#mode=current&page=home

## What is real and what is illustrative

The current home, product listing, contact, story, testimonials, retailer directory, blog index, and eight article pages are saved public HTML with locally saved branding, images, and styles. They were retrieved on October 16, 2026. Scripts, external navigation, forms, and embedded frames are removed. The original JavaScript mobile menu and carousel behavior are therefore absent; font rendering can differ. These are reference copies, not a full functional backup of WordPress.

The before view for **Product details** uses the original product listing. The before view for **Manage subscription** uses the contact page with an explanatory notice: no real authenticated customer account was inspected. The shop’s authenticated backend is not reconstructed from public pages.

The proposed version is a clickable design concept informed by the supplied reviews. All new wording is a draft. Prices, dates, delivery intervals, payment methods, address data, and account actions are samples. Verify the live subscription app’s capabilities, access flow, policies, and actual product/variant pricing before implementation. Customer data is not imported. Demo edits are held in browser memory and disappear on reload.

The expanded visual design is not an agreement to implement a complete redesign within the earlier 5–8-hour initial scope. That scope remains focused on subscription access and essential cleanup.

## Rea’s role

Rea 6.5.0 ran through its CLI with the bundled Node 24 runtime, using a separate temporary Chrome profile. It passively captured the public homepage’s structure and accessibility information, plus a reference screenshot. Rea evidence is in `evidence/`. No Codex MCP settings or global skill installations were changed. The static reference capture and preview code were created separately; Rea does not automatically recover a WordPress or Shopify backend.

`dist/assets/sources.json` records the original URLs for downloaded public assets. The two legacy theme icon URLs returning 404 are recorded with empty values; no replacement was invented for the before view.

## Later Vercel preview

This project is ready for static hosting, but has not been deployed.

For a Vercel project connected to this repository:

- Root directory: `preview`
- Framework preset: **Other**
- Build command: leave empty / override with no command
- Output directory: `dist`
- Install command: no installation required

`vercel.json` sets the output directory and `X-Robots-Tag: noindex, nofollow`. The pages also carry noindex metadata. Noindex is not access control: enable deployment protection if review access should be restricted. A separate preview deployment can be shared without changing the client’s domain or store.

Only `dist/` is served. Supporting documents, source scripts, and Rea evidence remain outside the deployed output. Deployment is a later step, not part of this local-only run.

## Checks

```sh
npm run check
```

See `QA.md` for browser verification and known limits.

## Added content pages

Testimonials, Where to buy, and Horse care blog are available in both versions, including eight local article pages. See [page additions and verification](../docs/pages-expansion.md).

## GitHub Pages review deployment

The public review repository is https://github.com/DayTripReady/atoz. The Pages workflow runs syntax checks, copies `dist/` to `pages-dist/`, and rewrites root asset paths for `/atoz/`. Local preview files stay unchanged. Push reviewed changes to `main` to update the hosted review. Only `pages-dist/` is published; internal documents and capture evidence are excluded.

Build locally with `node scripts/build-pages.mjs` from `preview/`. The generated folder is ignored by Git.
