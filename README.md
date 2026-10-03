# Insurance Sales Team — Recruiting Site

A single-goal recruiting site: turn qualified visitors into **booked Zoom interviews** with the team leader.

- Static HTML, CSS and vanilla JS. No framework, no build step, no runtime dependencies.
- Total page weight is about 130 KB, including self-hosted fonts.
- Design rationale, the design system and review decisions are in [`docs/STRATEGY.md`](docs/STRATEGY.md).

```
index.html            Landing page (all 11 sections)
thank-you.html        Post-booking confirmation (point your scheduler's redirect here)
privacy.html          Privacy policy template
404.html              Not-found page
assets/css/styles.css Design tokens, components, sections
assets/js/config.js   ← booking settings (the only JS you need to edit)
assets/js/main.js     Navigation, reveal, sticky CTA, form validation, scheduler embed
assets/fonts/         Instrument Serif + Hanken Grotesk (Latin, OFL)
assets/img/           Favicon; add photography here
docs/STRATEGY.md      Architecture, design system, conversion and responsive strategy
```

## Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Connect booking

Edit `assets/js/config.js`:

| Setting | What it does |
|---|---|
| `schedulerUrl` | Your Calendly / Cal.com / Acuity event link. It's embedded in step 2 of the booking card, and a "Go straight to the calendar" link appears above the form. |
| `leadEndpoint` | Optional. Receives step 1 as JSON (Formspree, a Zapier/Make webhook or a CRM) so you can follow up with people who don't finish booking. |
| `prefillScheduler` | Passes name and email to the scheduler. |
| `autoRedirect` | Sends visitors to the scheduler page instead of embedding it. |

In your scheduler:
- Connect Zoom so every booking generates a meeting link automatically.
- Set the confirmation redirect to `https://yourdomain.com/thank-you.html`.
- Turn on reschedule/cancel links in the confirmation email. The site tells visitors they can reschedule that way.

Until `schedulerUrl` is set, step 2 shows a visible setup note instead of a calendar.

## Before launch: content you need to supply

Everything unconfirmed is wrapped in `<span class="ph">…</span>` and shows with a copper highlight, so nothing ships by accident. Search the HTML for `class="ph"` (index: 73, privacy: 9, other pages: 2 each) and for `PLACEHOLDER` comments.

**Identity**
- [ ] Team name (header, footer, title tags, schema) and a real logo mark to replace the "TN" monogram
- [ ] Team leader: name, title, agency, location, years in industry, licensed states, two bio paragraphs, personal quote
- [ ] Contact email and phone
- [ ] Production domain: canonical URL, `og:url`, schema, `robots.txt`, `sitemap.xml`

**Opportunity facts** (hero fact bar, The Opportunity, FAQ)
- [ ] Role title, location / remote policy, experience requirements, schedule options
- [ ] Product lines
- [ ] Compensation structure. **No income figures** unless compliance approves them.
- [ ] How agents find clients, and any associated costs
- [ ] Licensing requirements, timeline, costs and support
- [ ] Any start-up costs (answer honestly in the FAQ)
- [ ] Interview length (currently `[30]` minutes, in four places)

**Training & support:** phase names and descriptions, how mentorship works, growth path.

**Testimonials:** real quotes from team members, with written permission. If any mention results, add the required disclaimer. If you don't have at least one real testimonial yet, delete the `#testimonials` section rather than launching with placeholders.

**Photography** (natural light, real people, no stock)
- [ ] Team leader portrait: 4:5, at least 1200×1500 → `assets/img/team-leader.jpg`
- [ ] Candid training / team-call photo: 3:2, at least 1600×1067 → `assets/img/team-training.jpg`
- [ ] Small headshot for the booking card (square, 112px+)
- [ ] Share image for social links: 1200×630 → `assets/img/og-image.jpg`, then uncomment the `og:image` tag
- Export as WebP or high-quality JPEG under ~200 KB. Use the `<img>` snippets in the HTML comments (they include `width`/`height`, `loading="lazy"` and alt text).

**Compliance / legal:** consent checkbox wording, income disclaimer, licensing/regulatory disclosures, affiliation statement, and a reviewed privacy policy.

**Final step:** once every placeholder is replaced, delete the `.ph` rules in `styles.css` (search for "Placeholder marker").

## Deploying

The site works on any static host: Netlify, Vercel, Cloudflare Pages, GitHub Pages or S3.

`404.html` uses root-relative paths (`/assets/...`) so it renders correctly at any URL depth. That requires the site to be served from the domain root. On a GitHub Pages *project* subpath, either use a custom domain or change those paths.

## Analytics

Every CTA has `data-cta="<location>"` (header, hero, how-it-works, leader, faq, sticky-mobile, scheduler-direct and so on), so one delegated click listener in GA4 or Plausible can report which placement drives bookings.

## Quality checks performed

Automated in a real browser (Chromium) before handoff:
- No horizontal overflow at 320, 375, 430, 768, 1024, 1280 or 1920px, on all four pages
- Zero console errors; every internal link, anchor and icon reference resolves; no duplicate IDs
- axe-core WCAG 2.1 AA + best practice: no violations
- One H1 per page, no skipped heading levels, title + description on every page
- Keyboard: skip link, focus-trapped mobile menu (Esc closes and returns focus), visible focus states
- Form: error summary with field links, inline messages, `aria-invalid`, optional phone, honeypot
- Booking: lead POST, scheduler embed with prefill, direct-to-calendar link, setup note when unconfigured
- Sticky mobile CTA hidden over the hero and the booking form
- Cumulative layout shift: 0.001
- Fully readable with JavaScript disabled; reveal animation off under `prefers-reduced-motion`
