# Insurance Sales Team — Recruiting Site

A single-goal recruiting site: turn qualified visitors into **booked Google Meet interviews** with the team leader.

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

Interviews run on **Google Meet**, booked through a free **Google Calendar appointment schedule** on coledillon76@gmail.com.

1. In Google Calendar (on a computer), choose **Create → Appointment schedule**.
2. Name it (e.g. "Secure Life Agency Interview"), set the duration to **30 minutes**, and set Cole's available hours.
3. Under location and conferencing, choose **Google Meet**, so every booking gets its own Meet link.
4. Save, then **Share → Website embed → Inline** and copy the `src` link. It starts with `https://calendar.google.com/calendar/appointments/schedules/`.
5. Paste it into `schedulerUrl` in `assets/js/config.js`.

| Setting | What it does |
|---|---|
| `schedulerUrl` | The booking page. A full `calendar.google.com` link is embedded in step 2 of the booking card. A short `calendar.app.google` link can't be embedded, so it opens as a button instead. A "Go straight to the calendar" link also appears above the form. Calendly and Cal.com links work too. |
| `leadEndpoint` | Optional. Receives step 1 as JSON (Formspree, a Zapier/Make webhook or a CRM) so you can follow up with people who don't finish booking. |
| `prefillScheduler` | Passes name and email to Calendly / Cal.com. Google appointment pages don't support this, so visitors re-enter them there. |
| `autoRedirect` | Sends visitors to the booking page instead of embedding it. |

Notes on Google appointment schedules:
- After booking, visitors see Google's own confirmation screen and get a calendar invite with the Meet link. `thank-you.html` is only used with schedulers that support a custom redirect.
- The site tells visitors to email Cole if they need a different time.
- Some extras (such as reminder emails) may need a paid Google plan.

Until `schedulerUrl` is set, step 2 shows a visible setup note instead of a calendar.

## Before launch: content you need to supply

Everything unconfirmed is wrapped in `<span class="ph">…</span>` and shows with a copper highlight, so nothing ships by accident. Search the HTML for `class="ph"` and for `PLACEHOLDER` comments.

**Done:** team leader (Cole Dillon: portrait, headshot, bio, quote, 5 years, Pennsylvania), contact email, Facebook/TikTok/Instagram links, share image, experience not required, agency name (Secure Life Agency), product focus (life insurance), 1099 contractor status, commission starting level, remote or in person in all 50 states, full-time or part-time, licensing requirement and support, low-cost leads, training / systems / community, 30-minute interview length.

**Still needed**
- [ ] **Google Calendar booking link** for `schedulerUrl` in `assets/js/config.js` (steps under "Connect booking")
- [ ] Production domain: replace `www.example.com` in the canonical URL, `og:url`, `og:image`, schema, `robots.txt` and `sitemap.xml`
- [ ] Real testimonials with written permission. Delete the `#testimonials` section if none are ready at launch.
- [ ] Logo, to replace the "SL" monogram (optional)
- [ ] Photo: a candid training or team-call shot (3:2, at least 1600×1067) for Training & Support. Real people, natural light, no stock. Export as WebP or JPEG under ~200 KB.
- [ ] Review Cole's drafted bio and quote, and confirm the "Team Leader" title
- [ ] Optional: a phone number for the footer
- [ ] Compliance: consent checkbox wording, income disclaimer, state licensing disclosures, carrier/IMO affiliation statement, a reviewed privacy policy, and sign-off on the "commission level of at least 100%" wording

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
