import { emailConfig } from "@/lib/email";
import { site } from "@/lib/site";

export type ApplyTarget = { href: string; external: boolean };

/**
 * Where "Apply to Join Our Team" buttons go: straight to Cole's Google Form while on-site email delivery
 * isn't configured, otherwise to the on-site application on /join.
 */
export function applyTarget(): ApplyTarget {
  if (emailConfig()) return { href: "/join", external: false };
  const form = site.applicationFormUrl();
  return form ? { href: form, external: true } : { href: "/join", external: false };
}

/** Link props for an apply target: external forms open in a new tab. */
export function applyLinkProps(target: ApplyTarget) {
  return target.external
    ? { href: target.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: target.href };
}
