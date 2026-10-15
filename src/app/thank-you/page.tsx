import type { Metadata } from "next";
import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Application received",
  robots: { index: false },
};

const v = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function ThankYouPage() {
  return (
    <section className="bg-black text-white">
      <div className="wrap grid gap-14 pt-14 pb-24 sm:pt-20 md:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="display hero-line text-[clamp(2.75rem,8vw,6.5rem)]" style={v(0)}>
            Application received.
          </h1>
          <p className="hero-line mt-8 max-w-xl text-lg text-silver" style={v(1)}>
            Thanks for applying to {site.name}. The team will review your application and contact you by phone or email
            about next steps.
          </p>
        </div>

        <div className="hero-line lg:col-span-4 lg:col-start-9 lg:self-end" style={v(2)}>
          {site.schedulingUrl ? (
            <>
              <h2 className="heading text-2xl">Book your introductory call</h2>
              <p className="mt-3 text-silver">
                Pick a time to talk with Cole about your goals and whether this opportunity is a fit.
              </p>
              <ButtonLink href={site.schedulingUrl} variant="light" className="mt-6 w-full sm:w-auto">
                Book your introductory call
              </ButtonLink>
            </>
          ) : (
            <>
              <h2 className="heading text-2xl">Your introductory call</h2>
              <p className="mt-3 text-silver">
                The team will reach out to set up a time for you to talk with Cole about your goals and whether this
                opportunity is a fit.
              </p>
              <Placeholder tone="dark" className="mt-6">
                Cole&apos;s scheduling link (Calendly, Cal.com, or similar). Until it&apos;s added, the team contacts
                applicants to book a time.
              </Placeholder>
            </>
          )}
          <p className="mt-8 text-[0.95rem] text-silver">
            In the meantime, read{" "}
            <Link href="/opportunity" className="text-white underline underline-offset-4">
              what the work involves
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
