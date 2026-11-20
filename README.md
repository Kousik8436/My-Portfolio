# Kousik Maity — Developer Portfolio

A black and neon developer portfolio built with Next.js 16 App Router, React 19, TypeScript, GSAP, and ScrollTrigger. The original biography, 18 projects, education results, skills, portrait, and social links are preserved.

## Motion and interactions

- A short theatre curtain intro on the first homepage entrance; deep links go directly to their content.
- Masked headline entrance, scroll reveals, portrait parallax, rotating accent, and a scrolling marquee.
- A pinned horizontal project showcase on large screens with a fine pointer; other screens use a normal grid or vertical layout.
- Aceternity-inspired pointer spotlights, glowing card edges, subtle 3D tilt, magnetic buttons, button shine, and click/tap ripples. These are implemented locally with GSAP and CSS.
- A visible pause/resume control, system reduced-motion support, and readable prerendered content with JavaScript disabled.

Animations use scoped GSAP contexts that clean up on navigation and preference changes. Pointer updates are coalesced with requestAnimationFrame. Repeating animations pause when their sections leave the viewport. Fonts preload locally, and assets remain self-hosted.

## Run locally

Use Node.js 20.9 or newer.

```sh
npm ci
```

Copy `.env.example` to `.env.local` and fill in the values below. The supplied EmailJS values are already configured in this workspace's ignored `.env.local`.

```dotenv
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_SITE_URL=https://your-public-domain.com
```

The original `VITE_SERVICE_ID`, `VITE_TEMPLATE_ID`, and `VITE_PUBLIC_KEY` are now the corresponding `NEXT_PUBLIC_EMAILJS_*` variables. Do not include the trailing backslashes from the original message. These EmailJS identifiers are intentionally browser public; keep private service keys out of `NEXT_PUBLIC_*` variables.

```sh
npm run dev
```

Open http://127.0.0.1:3000. To preview the production export:

```sh
npm run build
npm run preview
```

## Content and structure

- `src/data/profile.ts` — biography, social links, education, and skill groups.
- `src/data/projects.json` — all 18 original projects, descriptions, technologies, source links, and demo links.
- `src/app/page.tsx` — introduction, selected projects, about, toolkit, education, and contact.
- `src/app/projects/page.tsx` — searchable project archive with category filters.
- `src/app/globals.css` — responsive styling and reduced-motion support.
- `src/components/contact-form.tsx` — validation, accessible feedback, duplicate-submit prevention, honeypot, and EmailJS integration.
- `public/images/` — optimized portrait and social sharing card. Project cover artwork is decorative, not a screenshot of the deployed applications.

The original resume link was empty and there was no resume file, so no broken download link is displayed. Add a real PDF before introducing a resume button. No employer history or testimonials have been invented.

## Search engine optimization

The pages are prerendered to HTML, with unique titles and descriptions, canonical URLs, Open Graph and Twitter metadata, a social preview image, Person and project collection JSON-LD, a sitemap, robots.txt, and semantic headings. Fonts are self-hosted and the portrait is served as WebP.

Set `NEXT_PUBLIC_SITE_URL` to the final public HTTPS origin before building. It controls canonical URLs, structured data, sitemap entries, and absolute sharing images. When it is unset, canonical URLs and sitemap entries are deliberately omitted instead of pointing at a fake hostname. The local workspace and example file use the existing homepage listed in the GitHub repository. Update it if you change the domain. A private preview cannot be indexed by search engines; publish on a public domain for discovery.

## Contact form

The form preserves the original template parameters: `name`, `email`, `message`, `from_name`, and `reply_to`. Keep those variables in your EmailJS template. Check EmailJS's allowed-origin settings for your final domain. The public key is not an EmailJS private API key.

Automated tests intercept every email request, so they do not send real messages or verify inbox delivery. After publication, send one manual message to confirm the EmailJS account, template, domain permissions, and recipient are correct.

## Verification

```sh
npm run typecheck
npm run build
npm run test:e2e
npm audit
```

The Playwright suite checks desktop and mobile rendering, the curtain exit, pointer/tap effects, horizontal scrubbing, motion controls, route cleanup, reduced motion, JavaScript-disabled rendering, project filtering, mobile navigation, form behavior, accessibility with axe, SEO metadata, and crawler files. Tests use a production preview on port 3100 (override with `PORTFOLIO_TEST_PORT`) and locally installed Google Chrome by default. For a Playwright-managed browser, install Chromium and set `PLAYWRIGHT_CHANNEL=chromium` in your shell before testing:

```sh
npx playwright install chromium
```

`npm run format` formats the source. `node scripts/prepare-assets.mjs` rebuilds optimized image assets. With a production preview running on port 3100, `node scripts/capture-preview.mjs` captures responsive screenshots into ignored `artifacts/`. Set `PORTFOLIO_PREVIEW_URL` to capture another local URL. The screenshots use reduced motion so every section can be inspected; the browser tests exercise the full animation path.

## Deployment

`npm run build` creates a fully static Next.js export in `out/`. For static hosting, run `npm ci` and `npm run build`, and publish `out/`.

On Vercel, the committed `vercel.json` selects the Next.js framework, runs `npm run build`, and sets `outputDirectory` to `null` so Vercel automatically detects the Next.js output. This overrides an old `dist` setting left over from Vite. In Project Settings → Build and Deployment, select **Next.js** and turn off the **Output Directory** override. Vercel's Next.js integration handles the static export automatically; do not set its output directory to `dist` or `out`. If you see `[STATIC_BUILD_NO_OUT_DIR]`, deploy a new commit containing `vercel.json`; retrying an older deployment uses its older configuration. Add the four environment variables to the build environment and rebuild after changing them.

The `.openai/hosting.json` file identifies the private Sites preview and its `out` directory. It does not change the GitHub remote or publish this repository to GitHub.
