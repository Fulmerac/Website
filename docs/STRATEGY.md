# Recruiting Site — Strategy & Design System

Prepared before build. This document explains *why* the site is structured and styled the way it is, so future edits stay consistent.

---

## 1. Site architecture

**Business objective:** turn qualified visitors into scheduled video interviews with the team leader (on Google Meet).

**Journey:** Visitor → Learn about opportunity → Understand benefits → Learn about the team → Build trust → Book interview → Google Meet

The site is a single long-form landing page (one goal, one path), plus three supporting pages.

| Order | Section | Job in the funnel | Primary question it answers |
|---|---|---|---|
| — | Header | Orientation + persistent CTA | "Where am I, and what do I do?" |
| 1 | Hero | Hook + first CTA + preview of the interview | "What is this, and is the next step safe?" |
| 2 | Why Join | Desire | "Why this team instead of anywhere else?" |
| 3 | Who We're Looking For | Self-qualification (fit / not a fit) | "Is this for someone like me?" |
| 4 | How It Works | Remove friction / uncertainty | "What happens after I click?" |
| 5 | Meet the Team Leader | Trust in a real person | "Who will I be talking to?" |
| 6 | The Opportunity | Facts, plainly stated | "What exactly is the role?" |
| 7 | Training & Support | De-risk the decision | "Will I be set up to succeed?" |
| 8 | Testimonials | Social proof | "Has this worked for people like me?" |
| 9 | FAQ | Objection handling | "What about…?" |
| 10 | Final CTA + booking form | Conversion | "Okay — how do I book?" |
| 11 | Footer | Legal, contact, secondary nav | "Is this legitimate?" |

**Supporting pages**

- `/thank-you.html` — post-booking confirmation (point your scheduler's redirect here). `noindex`.
- `/privacy.html` — privacy policy template (linked from the form consent + footer).
- `/404.html` — branded not-found page that routes back to the funnel. `noindex`.

**Booking flow (the conversion is a booked interview slot, not a form submission)**

1. Every "Book Your Interview" CTA anchors to `#book` and moves focus to the first form field.
2. **Step 1 — Your details:** name, email, state, licensing status and consent. Phone is optional. The button reads "Continue to pick a time" so nobody mistakes step 1 for a finished booking. Data goes to an optional lead endpoint so the leader can follow up if someone drops off at the calendar.
3. **Step 2 — Pick a time:** the scheduler (a Google Calendar appointment schedule; Calendly and Cal.com also supported) is **embedded in the same card**. The booking happens on the page, and the scheduler issues the Google Meet link.
4. **Escape hatch:** "Go straight to the calendar" lets visitors who don't want a form skip step 1.
5. The scheduler redirects to `thank-you.html`.

Both URLs are set in one file: `assets/js/config.js`.

---

## 2. Design system

**Principles**

1. **Editorial, not template.** Large serif headlines, generous whitespace and hairline rules instead of boxed SaaS cards and icon grids.
2. **One accent, used for action.** Copper means "do this". It's reserved for CTAs and small markers of progress, so the eye always finds the next step.
3. **Rhythm through contrast.** Light paper sections alternate with two deep-ink sections (The Opportunity, Book). The dark bands mark the two moments that matter most: the facts and the decision.
4. **Every element has a job.** No decorative blobs, gradients or stock photography. The hero's visual is a real preview of the interview agenda, because the main thing holding people back from booking is not knowing what happens on the call.
5. **Motion confirms, never performs.** Content fades up gently on first view, buttons respond on hover and press, and the header gains a surface once you scroll. All of it is disabled under `prefers-reduced-motion`.

**Spacing:** 4px base. Tokens `--space-1`…`--space-10` (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Section padding is fluid: `clamp(5rem, 10vw, 9rem)`.

**Layout:** 1200px max container, 24px fluid gutters (16px on mobile). 12-column CSS grid on desktop. A 720px measure for reading text.

**Radius:** 4px (inputs), 6px (buttons), 8px (photo, form card). Kept tight because large radii read as "app", not "firm".

**Elevation:** one shadow token (`--shadow-lg`), used in exactly two places: the hero agenda and the booking form. Those are the two surfaces that ask the visitor to act. Everything else is separated by hairline rules, not boxes.

---

## 3. Color palette

Taken from the Secure Life Agency logo (navy + sage). Values were matched by eye from the logo artwork; swap in exact brand values if a brand sheet exists.

| Token | Hex | Use |
|---|---|---|
| `--ink-950` | `#0A1D33` | Footer |
| `--ink-900` | `#10294A` | Primary text, dark sections (logo navy) |
| `--ink-700` | `#2E4258` | Secondary text on light |
| `--ink-500` | `#56657A` | Muted text on light |
| `--paper` | `#F7F6F3` | Page background (soft neutral, like the logo's ground) |
| `--paper-2` | `#EEF1EE` | Alternate section background (faint sage tint) |
| `--white` | `#FFFFFF` | Form surface |
| `--line` | `#DCDFDC` | Hairline rules on light |
| `--accent` | `#163F6B` | Primary CTA (logo mark navy; white text 10:1) |
| `--accent-strong` | `#0F3157` | CTA hover / pressed |
| `--sage` | `#8FB09F` | Logo sage: accents on dark, active-nav underline |
| `--sage-text` | `#4A7562` | Sage dark enough for text on light: hero italic, step numerals, check marks, quote marks |
| `--mist` | `#AEBCCB` | Muted text on dark |
| `--error` | `#B42318` | Form errors |

Navy fills the one action. Sage is reserved for small accents, so the CTA stays the strongest thing on the page. Placeholder highlights are amber, so unfinished content never blends into the brand.

---

## 4. Typography system

- **Display:** *Newsreader* (400–500, roman and italic), the face of a serious publication. It's steadier and more institutional than a trendy condensed serif. It's trimmed to one optical size and the Latin character set (36 KB and 39 KB).
- **Text / UI:** *Hanken Grotesk* (variable 400–600). A humanist grotesque, warmer than Inter and very readable at small sizes.
- Both are self-hosted with `font-display: swap`; the roman serif and the sans are preloaded.
- **Wordmark:** set in the style of the logo: bold "SECURE", regular "LIFE AGENCY", tracked capitals. Replace with the logo file (`.brand__logo`) when it is supplied.

| Token | Size (fluid) | Line height | Use |
|---|---|---|---|
| `--fs-display` | 2.5 → 4.5rem | 1.04 | Hero H1 |
| `--fs-h2` | 2 → 3.25rem | 1.08 | Section headlines |
| `--fs-quote` | 1.625 → 2.5rem | 1.22 | Cole's pull quote |
| `--fs-h3` | 1.1875 → 1.375rem | 1.3 | Item titles (sans, 600) |
| `--fs-lead` | 1.125 → 1.3125rem | 1.55 | Section intros |
| `--fs-body` | 1.0625rem | 1.65 | Body |
| `--fs-xs` | 0.8125rem | 1.4 | Labels (uppercase, +0.12–0.14em tracking) |

---

## 5. Component list

Reusable, class-based components (BEM-style naming in `assets/css/styles.css`):

- **Button** `.btn` — `--primary` (evergreen), `--secondary` (outline), `--ghost` (text link), `--sm`, `--lg`, `--block`. States: hover, active, focus-visible, loading (`aria-busy`), disabled.
- **Site header** `.site-header` — sticky, gains a solid surface and hairline on scroll (no blur), desktop nav with scroll-spy `aria-current`.
- **Mobile menu** `.mobile-nav` — full-screen sheet, focus-trapped, Esc / link / CTA to close, body scroll lock.
- **Sticky mobile CTA** `.sticky-cta` — appears after the hero leaves view and hides once the booking form is on screen.
- **Section head** `.section-head` — eyebrow (index + label), H2, lead.
- **Eyebrow** `.eyebrow`
- **Agenda card** `.agenda-card` — the hero's interview preview.
- **Fact bar** `.factbar` — role / location / experience / schedule at a glance, like a job-post header.
- **Feature list** `.features` — editorial title + text rows with hairline dividers.
- **Fit lists** `.fit` — "a fit" / "probably not a fit" columns.
- **Steps** `.steps` — numbered process with connecting rule.
- **Profile** `.profile` — portrait, bio, pull quote, fact row.
- **Spec grid** `.spec` — three-column definition list for the opportunity facts.
- **Pillars** `.pillars` — training, systems and community, separated by hairline rules.
- **Photo** `.photo` (`--portrait`, `--landscape`) — fixed aspect ratios, one consistent grade, captions.
- **Featured quote** `.featured-quote` + **supporting quotes** `.quote` — one large editorial testimonial instead of a card grid.
- **Accordion** `.faq` — native `<details>/<summary>`, so it's accessible and works without JS.
- **Form** `.form`, `.field`, `.choice`, `.form-steps`, `.form-success`, `.error-summary`
- **Placeholder marker** `.ph` — highlights unconfirmed content so nothing ships by accident.
- **Footer** `.site-footer`

---

## 6. Conversion strategy

1. **One action, many entry points.** "Book Your Interview" appears in the header, hero, after How It Works, in the Team Leader profile, after the FAQ, in the sticky mobile bar and in the final section. Every instance goes to the same place, so there's nothing to choose between.
2. **Reduce the fear of the click.** The hero card previews exactly what the call covers. "How It Works" shows the whole path. The form says how many steps there are before you start.
3. **Qualify, don't just attract.** "Probably not a fit if…" filters out poor-fit candidates, which protects the leader's calendar. It also raises credibility with the right candidates.
4. **Put a real person forward.** The team leader section uses a real name, face and voice. People book with a person, not a brand.
5. **Honesty as positioning.** "The opportunity, without the hype" states the facts plainly and defers compensation detail to the call, which is also the compliant approach. No invented numbers anywhere.
6. **Capture before the hand-off.** The short form submits the lead before sending the visitor to the scheduler. If they drop off at the calendar, the leader can still follow up.
7. **Minimal form.** Six required inputs, each with a reason to exist (contact, location for licensing, licensing status for prep). Inline validation explains how to fix each error. An error summary takes keyboard and screen-reader users to the problem fields.
8. **Clear CTA states.** Hover, press, focus, loading ("Saving…") and success are all designed, so the visitor always knows the click worked.
9. **Measurable.** CTAs carry `data-cta="<location>"` attributes, ready for analytics events (GA4 / Plausible) without extra markup.

---

## 7. Responsive strategy

Mobile-first CSS with three breakpoints:

| Breakpoint | Width | Changes |
|---|---|---|
| base | < 640px | Single column, 16px gutters, full-width CTAs, sticky bottom CTA bar, mobile menu |
| `sm` | ≥ 640px | Two-column fit lists / testimonials, side-by-side form fields |
| `md` | ≥ 960px | Desktop nav, split hero, sticky section heads, horizontal steps, profile split |
| `lg` | ≥ 1200px | Max container and full type scale |

- Type and spacing scale fluidly with `clamp()` between breakpoints, so there are no awkward in-between sizes.
- Tap targets are at least 44×44px. Form inputs are 16px+ so iOS doesn't zoom on focus.
- The sticky mobile CTA respects `env(safe-area-inset-bottom)`.
- No horizontal scrolling at 320px.
- Images are reserved with `aspect-ratio` to prevent layout shift once real photos are added.

---

## 8. Review log: decisions made in critique

These came out of the creative-director, CRO and "anti-AI" reviews. Keep them in mind before reintroducing a removed pattern.

| Removed / changed | Why |
|---|---|
| Section index numbers (01–09) on every eyebrow, numbered feature items and numbered hero agenda | Numbering everything is a template tell. Numbers now appear only where order matters (How It Works). |
| Italic accent word in every H2 | It had become a formula. Kept in two headlines only (hero, Opportunity). |
| Green "● Now interviewing" status pill | A stock AI-hero pattern. Replaced with a plain eyebrow. |
| Hero icon row (Zoom · 30 min · questions) | Repeated the agenda card and the booking section. Replaced with one line of factual reassurance under the CTA. |
| Vague H1 ("Your next career move deserves…") | Cold ad traffic couldn't tell what the job was. The H1 now names insurance sales. |
| Three equal testimonial cards | Looked empty and generic. Now one large pull quote with two supporting quotes. |
| "Support at a glance" box in Training | Duplicated the timeline. Replaced by a real-photo slot. |
| Opportunity as another sticky-split list | Too similar to Why Join. Now a full-width three-column spec grid. |
| Centred section heads | Too many centred blocks. Only the featured testimonial is centred, and only on larger screens. |
| Backdrop-blur header and sticky bar | Decorative glassmorphism. Solid surfaces now. |
| Optional "What's drawing you…" textarea; required phone | Form friction. Removed, and phone made optional. |
| Booking ended on a form submit | The real conversion is a booked slot. The scheduler is now embedded in step 2. |
| Cost and compensation FAQs at positions 7 and 4 | The main trust objections for insurance recruiting. Moved to the top. |

### Round 2 (agency audit)

| Changed | Why |
|---|---|
| Cream + terracotta + condensed serif | A recognisable AI-template look. Now cool paper, an evergreen accent and Newsreader. |
| Text-left / floating-card-right hero, Cole as a 44px avatar | The most predictable hero. Cole's portrait now leads, because people book calls with a person. |
| "SL" boxed monogram | Read as a placeholder logo. Replaced by a typographic wordmark. |
| 10–16px radii everywhere | Too soft for financial services. Now 4–8px. |
| Empty testimonial placeholders, hatched photo box | Looked unfinished. Testimonials are `hidden` until real ones exist; Training stands on its own without a photo. |
| Same photo in hero and Team Leader | Repetition. The Team Leader section is now quote-led. |
| Fade-in on nearly every block | The "repetitive animation" tell. Now only section heads, the spec grid, the FAQ and the booking block animate. |
| Agenda, "after you book" list and host card in three places | Consolidated into one "What we'll cover" block next to the form. |

### Round 3 (brand logo)

The client's logo (navy and sage, geometric sans wordmark) replaced the interim evergreen palette. The header and footer wordmark now follow the logo's lettering until the logo file itself is supplied.
