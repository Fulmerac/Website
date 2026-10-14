/**
 * Site-wide settings. Anything set to `null` renders as a visible placeholder
 * until Cole supplies verified information — see README.md for the checklist.
 */
export const site = {
  name: "Secure Life Agency",
  owner: "Cole",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Put the original logo at public/brand/ and set its path, e.g. "/brand/logo.svg". */
  logo: null as null | { src: string; width: number; height: number },

  contact: {
    email: null as string | null,
    phone: null as string | null,
    location: null as string | null,
  },

  /** Calendly, Cal.com, or similar booking link shown after someone applies. */
  schedulingUrl: process.env.NEXT_PUBLIC_SCHEDULING_URL || null,
} as const;

export const nav = [
  { href: "/opportunity", label: "The Opportunity" },
  { href: "/about", label: "About Cole" },
] as const;
