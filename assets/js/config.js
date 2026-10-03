/**
 * Site configuration: the only file you need to edit to connect booking.
 */
window.SITE_CONFIG = {
  // Your scheduling page for Zoom interviews (Calendly, Cal.com, Acuity, etc.).
  // Example: "https://calendly.com/your-name/interview"
  schedulerUrl: "",

  // Optional: an endpoint that receives the form as JSON before the visitor picks a time
  // (Formspree, Zapier/Make webhook, your CRM). Leave empty to skip lead capture.
  // Example: "https://formspree.io/f/xxxxxxx"
  leadEndpoint: "",

  // Pass name and email to the scheduler so the visitor doesn't type them twice.
  // Calendly and Cal.com both read `name` and `email` query parameters.
  prefillScheduler: true,

  // Send the visitor straight to the scheduler after step 1 instead of showing the
  // "Choose your interview time" button first.
  autoRedirect: false,
};
