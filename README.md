# Secure Life Agency — recruiting website

Next.js site for recruiting independent, commission-based life insurance agents.

Funnel: **Home → The Opportunity → Join Our Team (application) → Thank you → Interview scheduling**

## Run it

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev                  # http://localhost:3000
```

Without email settings, applications submitted in development are printed to the terminal. In production they're rejected with a message until email is configured.

## Configuration (`.env.local` or your host's environment variables)

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | API key from [Resend](https://resend.com), which sends application emails. |
| `APPLICATION_TO_EMAIL` | Cole's inbox. Comma-separate multiple addresses. |
| `APPLICATION_FROM_EMAIL` | Sender on a domain verified in Resend, e.g. `Secure Life Agency <applications@yourdomain.com>`. |
| `NEXT_PUBLIC_SCHEDULING_URL` | Optional booking link (Calendly, Cal.com). Adds a "Book your introductory call" button to the thank-you page. |
| `NEXT_PUBLIC_SITE_URL` | The live site URL, used in page metadata. |

Each application email includes every answer, and replying to it goes straight to the applicant.

## Before launch: content to supply

Anything unverified shows on the site as a dashed **"To confirm"** box, so nothing invented can go live looking like a real claim. Search the code for `<Placeholder` to find them all.

- [ ] **Logo** — add the original file to `public/brand/` and set `logo` in `src/lib/site.ts`. Until then the agency name is shown as text.
- [ ] **Contact details** — email, phone, location in `src/lib/site.ts`.
- [ ] **Training, support, and structure** — homepage "How the team works" (`src/app/page.tsx`) and Opportunity → Training and support.
- [ ] **Experienced-agent specifics** — Opportunity → If you're already licensed.
- [ ] **Cole's bio, credentials, story, and leadership approach** — `src/app/about/page.tsx`.
- [ ] **Disclosures** — agency license details and any carrier/IMO or state-required language (footer).
- [ ] **Photos** — real photos of Cole and the team in `public/photos/`, passed as `src` to each `<Photo>` slot. Each slot describes the shot it needs.
- [ ] Have the commission and licensing copy reviewed for your state(s) and partners.

## Stack

Next.js 15 (App Router), TypeScript, Tailwind CSS 4, React Hook Form + Zod (validation shared by the form and the API), Resend for email. Typeface: Archivo (Google Fonts), using its width axis for display type.
