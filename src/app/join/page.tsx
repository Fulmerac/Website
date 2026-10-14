import type { Metadata } from "next";
import { ApplicationForm } from "@/components/application-form";
import { PageIntro } from "@/components/page-intro";
import { emailConfig } from "@/lib/email";
import { site } from "@/lib/site";

// Reads delivery settings at request time so the form never accepts input it can't send.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Apply: Independent Life Insurance Agent Opportunities",
  description:
    "Apply to join Secure Life Agency as an independent, commission-based life insurance agent — whether you're new to the industry or already licensed.",
  alternates: { canonical: "/join" },
};

const steps = [
  { title: "Submit your application", body: "Tell us about yourself, your license status, and what you're looking for." },
  { title: "We review it", body: "The team reviews your application and contacts you by phone or email about next steps." },
  {
    title: "Introductory conversation",
    body: "Book a time to talk with Cole about your goals, the work, and whether this is a good fit — both ways.",
  },
  { title: "Your next steps", body: "If it's a fit, you'll go over what getting started looks like, including licensing if you need it." },
];

export default function JoinPage() {
  return (
    <>
      <PageIntro title="Join Our Team">
        <p>
          We&apos;re looking for people who want to build a business helping others protect what matters — whether
          you&apos;re new to life insurance or already licensed.
        </p>
      </PageIntro>

      <div className="wrap grid gap-16 py-16 md:py-24 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-8">
            <h2 id="what-happens-next" className="heading scroll-mt-8 text-2xl">What happens after you apply</h2>
            <ol className="mt-6 border-t border-black/10">
              {steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[1.75rem_1fr] gap-x-2 border-b border-black/10 py-5">
                  <span className="text-steel tabular-nums">{i + 1}</span>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-1 text-[0.95rem] text-graphite">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[0.9rem] text-steel">
              {site.name} agents are independent and paid by commission. Income isn&apos;t guaranteed.
            </p>
          </div>
        </aside>

        <section aria-labelledby="form-heading" className="lg:col-span-7 lg:col-start-6">
          <h2 id="form-heading" className="heading text-[clamp(1.75rem,3.5vw,2.5rem)]">Application</h2>
          <div className="mt-8">
            <ApplicationForm accepting={emailConfig() !== null} />
          </div>
        </section>
      </div>
    </>
  );
}
