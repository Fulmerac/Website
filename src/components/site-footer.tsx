import Link from "next/link";
import { Logo } from "@/components/logo";
import { Placeholder } from "@/components/placeholder";
import { site } from "@/lib/site";

export function SiteFooter() {
  const { email, phone, location } = site.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-silver">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo className="text-white" />
          <p className="mt-4 max-w-sm text-[0.95rem]">
            Recruiting independent life insurance agents, from first-time applicants to licensed professionals.
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-sm font-semibold text-white">Explore</h2>
          <ul className="mt-4 space-y-3 text-[0.95rem]">
            <li><Link className="hover:text-white" href="/opportunity">The Opportunity</Link></li>
            <li><Link className="hover:text-white" href="/about">About Cole</Link></li>
            <li><Link className="hover:text-white" href="/join">Apply to Join Our Team</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="text-sm font-semibold text-white">Contact</h2>
          <address className="mt-4 space-y-3 text-[0.95rem] not-italic">
            {email ? <a className="block hover:text-white" href={`mailto:${email}`}>{email}</a> : null}
            {phone ? <a className="block hover:text-white" href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a> : null}
            {location ? <p>{location}</p> : null}
            {!email || !phone || !location ? (
              <Placeholder tone="dark">agency email, phone number, and office location.</Placeholder>
            ) : null}
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap space-y-4 py-8 text-[0.8rem] leading-relaxed text-steel">
          <p className="max-w-4xl">
            Agents with {site.name} work independently and are paid by commission. There is no salary, and income
            depends on individual effort, skill, and other factors. Nothing on this site is a promise or guarantee of
            income. A state-issued insurance license is required to sell life insurance; requirements vary by state.
          </p>
          <Placeholder tone="dark" className="max-w-4xl">
            agency licensing details (resident state and license number), carrier or marketing-organization
            affiliation, and any disclosures required by those partners or by state regulators.
          </Placeholder>
          <p>© {year} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
