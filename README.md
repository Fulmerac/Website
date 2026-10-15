# Secure Life Agency — recruiting website

A recruiting site for independent, commission-based life insurance agents. Its job is to turn visitors into qualified applicants and applicants into introductory calls with Cole.

**Funnel:** Home → The Opportunity → Join Our Team (application) → Application received → Book an introductory call

## Pages

| Page | Path | Purpose |
|---|---|---|
| Home | `/` | Who it's for, what the work is, the two paths in (new / licensed), how the team works, apply. |
| The Opportunity | `/opportunity` | What the work involves, new vs. licensed paths, licensing steps, commission realities, training, FAQ. |
| About Cole | `/about` | Cole's background and leadership approach (placeholders until supplied). |
| Join Our Team | `/join` | What happens after you apply, and the application form. |
| Application received | `/thank-you` | Confirmation and the interview-booking step. Not indexed. |
| Privacy Policy | `/privacy` | What the form collects and why (full policy to be supplied). |

The primary conversion action is always labelled **Apply to Join Our Team**; the hero's first button, **Explore the Opportunity**, leads into the funnel.

## How applications are delivered

The form posts to `/api/apply`, which validates the answers and emails them to Cole using [Resend](https://resend.com). Replying to that email goes straight to the applicant.

**Cole's Google Form.** Until email delivery is set up, the Join page sends applicants to Cole's Google Form (https://forms.gle/NGGHfFpWZJK7Vk4y6) instead of the on-site form. Google Forms stores the responses, and Cole can turn on email notifications for new responses in the form's **Responses** settings.

Applicants who use the Google Form see Google's confirmation screen, not this site's confirmation page and booking step. You can add Cole's booking link to the Google Form's confirmation message.

Once email delivery is configured, the on-site form (with validation, the confirmation page, and the booking step) takes over automatically.

**The site never claims an application was sent unless the email was actually delivered.**

- **Neither email nor a Google Form:** the Join page says applications aren't open yet, and the submit button is disabled. The API refuses submissions with a `503` error.
- **Delivery fails:** the applicant stays on the form with an explanation, and nothing is lost from what they typed.

The form collects only what's needed to follow up. It asks for no Social Security number, date of birth, or financial details.

## Run it locally

Requires Node.js 20 or later.

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev                  # http://localhost:3000
```

## Settings

Set these in `.env.local` locally, or in your host's environment variables in production.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes | API key from Resend. |
| `APPLICATION_TO_EMAIL` | Yes | Cole's designated business email. Separate multiple addresses with commas. |
| `APPLICATION_FROM_EMAIL` | Yes | Sender on a domain verified in Resend, e.g. `Secure Life Agency <applications@yourdomain.com>`. |
| `APPLICATION_FORM_URL` | No | Overrides the Google Form link used while email delivery isn't set up. Set it to an empty value to turn the Google Form off. |
| `NEXT_PUBLIC_SCHEDULING_URL` | No | Cole's booking link (Calendly, Cal.com, …). Until it's set, the confirmation page shows a marked placeholder. |
| `NEXT_PUBLIC_SITE_URL` | Yes, in production | The live URL, e.g. `https://securelifeagency.com`. Used for the sitemap, canonical links, and share previews. |

## Deploy (Vercel)

Vercel is the simplest host for this project. It runs the `/api/apply` function the form needs.

1. **Import the repository.** In Vercel, choose **Add New → Project**, import this repository, and keep the detected Next.js settings.
2. **Set up email.**
   1. Create a Resend account.
   2. Add and verify your domain. This means adding the DNS records Resend gives you wherever your domain is managed.
   3. Create an API key.
3. **Add the settings above** in **Project → Settings → Environment Variables**, then deploy.
4. **Connect your domain** in **Project → Settings → Domains**.
5. **Send a test application** from the live site and confirm it arrives in Cole's inbox.
6. **Add the scheduling link.** When Cole has one, set `NEXT_PUBLIC_SCHEDULING_URL` and redeploy. `NEXT_PUBLIC_` values are built into the pages, so they only take effect after a redeploy.

The site also runs on any host that supports Next.js server functions, such as Netlify or a Node server running `npm run build && npm start`.

A static-only host such as GitHub Pages can't run the form. On one of those, applications won't be delivered.

## Tests

```bash
npm run lint
npm run test:e2e   # builds, then runs Playwright on desktop and mobile
```

The end-to-end tests cover:

- **Every page:** exactly one `h1`, a title and meta description, no sideways scrolling on a phone, and no serious accessibility issues (axe).
- **Navigation:** the header, the mobile menu, and the hero buttons.
- **Validation:** every required-field error, and focus moving to the first problem.
- **Submission:** a delivered application reaching the confirmation page, and a failed delivery keeping the applicant on the form.
- **Not configured:** the site refusing applications instead of pretending to send them.

## Before launch: information that must come from Cole

Anything unverified appears on the site as a dashed **"To confirm"** box, so nothing invented can go live looking like a real claim. Search the code for `<Placeholder` to find each one.

- [ ] **Vector logo.** The logo in `public/brand/` was cut from a 2000×2000 image and looks sharp at web sizes. If an SVG or larger original exists, swap it in for the crispest result.
- [ ] **Contact details.** Business email, phone, and location go in `src/lib/site.ts`.
- [ ] **Training, support, and costs.**
  - Training, mentorship, licensing help, and costs to the agent, on the homepage (`src/app/page.tsx`).
  - The matching section on the Opportunity page (`src/app/opportunity/page.tsx`).
- [ ] **Carrier logos (optional).** Carriers are listed by name. Showing their logos usually needs each carrier's permission.
- [ ] **Lead details.** How leads are distributed, and whether agents pay for them.
- [ ] **Experienced-agent specifics.** Contracting, carrier access, how existing clients are handled, and transition steps (Opportunity page and FAQ).
- [ ] **FAQ answers** marked "To confirm": costs, and what changes for licensed agents.
- [ ] **Cole's biography, credentials, personal story, and leadership approach** (`src/app/about/page.tsx`).
- [ ] **Disclosures.**
  - The agency's license details.
  - Any carrier or marketing-organization affiliation.
  - Any state-required insurance disclosures (footer).
- [ ] **Privacy policy**, reviewed for your business (`src/app/privacy/page.tsx`).
- [ ] **Cole's portrait.** Save it as `public/photos/cole.jpg`; the About page picks it up automatically on the next build.
- [ ] **Other photos.** Real photos of the team go in `public/photos/`, passed as `src` to each `<Photo>` slot. Each slot describes the shot it needs. Next.js resizes and compresses them automatically.
- [ ] **Compliance review.** Have the commission, licensing, and contact-consent wording reviewed for your state(s) and partners.

## Confirmed facts used on the site

These are confirmed. Update them here and in the code if anything changes.

- Agents can work part-time or full-time.
- The agency serves clients in all 50 states, and agents can work from anywhere in the U.S.
- Agents have access to leads from multiple lead vendors, at low, medium, and high levels of intent.
- Final expense life insurance is the focus. Agents also offer term life, whole life, burial insurance, and annuities.
- Agents work with multiple carriers, including Corebridge Financial, Transamerica, Lincoln Financial Group, Mutual of Omaha, and AIG.

## Brand assets (`public/brand/`)

| File | Use |
|---|---|
| `logo-original.webp` | The original logo as supplied. |
| `mark-white.png`, `wordmark-white.png` | Header lockup on black. |
| `mark-black.png`, `wordmark-black.png` | For light backgrounds. |
| `logo-stacked-white.png` | Footer. |

The browser-tab icons (`src/app/icon.png`, `src/app/apple-icon.png`) and the share image use the same mark.

## Stack

| Part | Choice |
|---|---|
| Framework | Next.js 15 (App Router), TypeScript |
| Styling | Tailwind CSS 4 |
| Form validation | React Hook Form and Zod, with one schema shared by the form and the API |
| Email | Resend |
| Tests | Playwright and axe |
| Typeface | Archivo from Google Fonts, self-hosted by Next.js; its width axis is used for the large display type |
