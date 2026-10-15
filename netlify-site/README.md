# Secure Life Agency: single-file recruiting site

`index.html` is the whole website: HTML, CSS and JavaScript, with the logo and Cole's photo built in. The only outside file it loads is the Archivo font from Google Fonts.

## Settings

Open `index.html` in any text editor and find **SITE SETTINGS** near the top:

```js
window.SITE_CONFIG = {
  bookingUrl: "",    // Cole's Google Calendar appointment link
  contactEmail: "",  // shown in the footer
  contactPhone: "",
  formEndpoint: ""   // only if you use a form service other than Netlify
};
```

Until `bookingUrl` is filled in:
- The booking section says "Online booking isn't connected yet."
- **Schedule an Interview** scrolls to that section instead of opening a calendar.

## How applications are collected

The form uses **Netlify Forms**, which collects submissions automatically on a site hosted by Netlify. There's nothing to connect.

The page checks whether it's running on Netlify:
- **On Netlify:** submissions are sent, and the applicant sees a confirmation. If Cole's booking link is set, that confirmation includes a **Book your interview** button.
- **Anywhere else** (opened as a file, or on another host): the form shows a notice that applications aren't being collected, and it never claims to send anything.
- **If a submission fails:** the applicant sees an error and keeps everything they typed.

## Publish on Netlify

1. Sign up at https://app.netlify.com. It's free.
2. Go to **Add new site → Deploy manually**.
3. Drag this `netlify-site` folder (or a folder containing only `index.html`) onto the page.
4. Netlify gives you an address like `https://secure-life-agency.netlify.app`. Rename it under **Site configuration → Change site name**.
5. Turn on form detection: go to **Forms**, click **Enable form detection**, then drag the folder in again (**Deploys → drag and drop**) so Netlify finds the form.
6. Send yourself a test application. It appears under **Forms → application**.
7. Get an email for every new application:
   1. Go to **Site configuration → Notifications → Emails and webhooks → Form submission notifications**.
   2. Click **Add notification → Email notification**.
   3. Choose the **application** form and enter Cole's email address.

To update the site later, edit `index.html` and drag the folder onto **Deploys** again.

## Connect a custom domain

1. In Netlify, open **Domain management → Add a domain**.
2. Enter your domain, such as `securelifeagency.com`, and confirm.
3. Point the domain at Netlify. Choose one option:
   - **Netlify DNS (simplest):** choose **Set up Netlify DNS**. At your domain registrar (GoDaddy, Namecheap, Squarespace and so on), replace the nameservers with the four Netlify shows you.
   - **Keep your current DNS:** at your registrar, add two records:
     - a **CNAME** record for `www` pointing to `your-site-name.netlify.app`
     - an **A** record for `@` pointing to `75.2.60.5`
4. Wait for the DNS change to take effect. This is usually under an hour, and can take up to 48.
5. Netlify issues a free HTTPS certificate automatically. Check **Domain management → HTTPS** for it.

## Add Cole's Google Calendar booking link

1. In Google Calendar, click **Create → Appointment schedule**.
2. Set the length and Cole's availability, then click **Save**.
3. Open the schedule, click **Share**, and copy the **booking page** link.
4. Paste it into `bookingUrl` in the settings and redeploy.

If the link starts with `https://calendar.google.com/calendar/appointments/`, the calendar also appears embedded on the page.

## Before launch

- Add the contact email and phone in the settings.
- Add the agency's license number(s), resident state, and any carrier or state-required disclosures in the footer. Search for "To be added".
- Have the privacy policy and disclosures reviewed for your business.
