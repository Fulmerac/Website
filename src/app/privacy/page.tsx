import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { Placeholder } from "@/components/placeholder";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects and uses the information you share when you apply.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro title="Privacy Policy" />
      <div className="wrap py-16 md:py-24">
        <div className="max-w-2xl space-y-10 text-lg leading-relaxed text-graphite">
          <section className="space-y-4">
            <h2 className="heading text-2xl text-black">What the website&apos;s application form collects</h2>
            <p>
              Your name, email address, phone number, state of residence, license status, previous experience, why
              you&apos;re interested, and when you&apos;re available for a call. We don&apos;t ask for Social Security
              numbers, dates of birth, or financial information.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="heading text-2xl text-black">How it&apos;s used</h2>
            <p>
              Your application is sent to {site.name} so the team can review it and contact you about next steps.
            </p>
            <p>
              Some applications are collected through Google Forms. Information you submit there is also handled under
              Google&apos;s privacy policy.
            </p>
          </section>
          <Placeholder>
            the full privacy policy, reviewed for your business: who receives applications, how long they&apos;re
            kept, whether they&apos;re shared with any partner, how applicants can ask for their information to be
            deleted, contact details for privacy questions, and the effective date.
          </Placeholder>
        </div>
      </div>
    </>
  );
}
