import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Application received",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section className="bg-black text-white">
      <div className="wrap grid gap-12 pt-14 pb-24 sm:pt-20 md:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="display hero-line text-[clamp(2.75rem,8vw,6.5rem)]" style={{ "--i": 0 } as React.CSSProperties}>
            Application received.
          </h1>
          <p className="hero-line mt-8 max-w-xl text-lg text-silver" style={{ "--i": 1 } as React.CSSProperties}>
            Thanks for applying to {site.name}. Cole&apos;s team will review your application and contact you by phone
            or email about next steps.
          </p>
        </div>

        <div className="hero-line lg:col-span-4 lg:col-start-9 lg:self-end" style={{ "--i": 2 } as React.CSSProperties}>
          {site.schedulingUrl ? (
            <>
              <h2 className="heading text-2xl">Want to move faster?</h2>
              <p className="mt-3 text-silver">Pick a time for your introductory conversation with Cole now.</p>
              <ButtonLink href={site.schedulingUrl} variant="light" className="mt-6" target="_blank" rel="noopener">
                Book your introductory call
              </ButtonLink>
            </>
          ) : (
            <>
              <h2 className="heading text-2xl">What&apos;s next</h2>
              <p className="mt-3 text-silver">
                We&apos;ll reach out to schedule your introductory conversation at one of the times you chose.
              </p>
            </>
          )}
          <p className="mt-8 text-[0.95rem] text-silver">
            In the meantime, read{" "}
            <Link href="/opportunity" className="text-white underline underline-offset-4">what the work involves</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
