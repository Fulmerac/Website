/**
 * Site configuration: the only file you need to edit to connect booking.
 */
window.SITE_CONFIG = {
  // Your booking page for video interviews.
  // Google Calendar appointment schedule: use the full link from Share → Website embed, e.g.
  // "https://calendar.google.com/calendar/appointments/schedules/AcZssZ..." (embeds on the page).
  // A short calendar.app.google link also works, but opens as a button instead of embedding.
  // Calendly / Cal.com links work too, e.g. "https://calendly.com/your-name/interview".
  schedulerUrl: "",

  // Optional: an endpoint that receives the form as JSON before the visitor picks a time
  // (Formspree, Zapier/Make webhook, your CRM). Leave empty to skip lead capture.
  // Example: "https://formspree.io/f/xxxxxxx"
  leadEndpoint: "",

  // Pass name and email to the scheduler so the visitor doesn't type them twice.
  // Calendly and Cal.com read `name` and `email`; Google appointment pages ignore this.
  prefillScheduler: true,

  // Send the visitor straight to the scheduler after step 1 instead of showing the
  // "Choose your interview time" button first.
  autoRedirect: false,
};
