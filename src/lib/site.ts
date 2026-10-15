/**
 * Site-wide settings. Anything set to `null` renders as a visible placeholder
 * until Cole supplies verified information — see README.md for the checklist.
 */
export const site = {
  name: "Secure Life Agency",
  owner: "Cole",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  contact: {
    email: null as string | null,
    phone: null as string | null,
    location: null as string | null,
  },

  /**
   * Cole's Google Form, used for applications whenever on-site email delivery isn't configured.
   * Override with APPLICATION_FORM_URL (an empty value turns it off). Read at request time.
   */
  applicationFormUrl: () => process.env.APPLICATION_FORM_URL ?? "https://forms.gle/NGGHfFpWZJK7Vk4y6",

  /** Calendly, Cal.com, or similar booking link shown after someone applies. */
  schedulingUrl: process.env.NEXT_PUBLIC_SCHEDULING_URL || null,
} as const;

export const nav = [
  { href: "/opportunity", label: "The Opportunity" },
  { href: "/about", label: "About Cole" },
] as const;
