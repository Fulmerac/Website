import type { Metadata } from "next";
import { ApplyBand } from "@/components/apply-band";
import { PageIntro } from "@/components/page-intro";
import { Placeholder } from "@/components/placeholder";

export const metadata: Metadata = {
  title: "The Opportunity",
  description:
    "What independent life insurance agent work involves, how licensing works, and the realities of commission-based income.",
};

const sections = [
  { id: "the-work", label: "What the work involves" },
  { id: "new-agents", label: "If you're new" },
  { id: "licensed-agents", label: "If you're licensed" },
  { id: "licensing", label: "Licensing" },
  { id: "commission", label: "Commission-based work" },
  { id: "training", label: "Training and support" },
];

export default function OpportunityPage() {
  return (
    <>
      <PageIntro title="The Opportunity">
        <p>
          A clear look at independent life insurance work: what you&apos;d do, what it takes to get started, and what
          commission-based income really means.
        </p>
      </PageIntro>

      <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <nav aria-label="On this page" className="min-w-0 lg:col-span-3">
          <div className="lg:sticky lg:top-8">
            <h2 className="text-[0.95rem] text-steel">On this page</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] lg:flex-col">
              {sections.map((s) => (
                <li key={s.id} className="shrink-0">
                  <a href={`#${s.id}`} className="text-graphite hover:text-black hover:underline">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <article className="min-w-0 max-w-2xl space-y-20 lg:col-span-8 lg:col-start-5 [&_h2]:scroll-mt-8">
          <Section id="the-work" title="What the work involves">
            <p>
              Independent life insurance agents help people protect their families and finances. Most of the job is
              conversation: understanding someone&apos;s situation, explaining options clearly, and helping them choose
              coverage that fits.
            </p>
            <List
              items={[
                "Finding and following up with prospective clients.",
                "Meeting with people — in person, by phone, or online — to understand their needs.",
                "Explaining coverage options and completing applications accurately.",
                "Staying in touch with clients as their lives change.",
                "Managing your own schedule, pipeline, and goals.",
              ]}
            />
          </Section>

          <Section id="new-agents" title="If you're new to the industry">
            <p>
              You don&apos;t need an insurance background to apply. You do need to be coachable, comfortable talking with
              people, and ready to put real time into learning.
            </p>
            <List
              items={[
                "Earn your state life insurance license (see Licensing below).",
                "Learn the products, the process, and how to run a client conversation.",
                "Build the habits that drive a commission-based business: consistency, follow-up, and organization.",
              ]}
            />
          </Section>

          <Section id="licensed-agents" title="If you're already licensed">
            <p>
              You already know the work. The question is whether this team, structure, and level of independence fit how
              you want to build your business next.
            </p>
            <List
              items={[
                "Talk through your current book, your goals, and what you want to change.",
                "Review how our structure, support, and product access would work for you.",
                "Plan any appointments or transitions so nothing falls through the cracks.",
              ]}
            />
            <Placeholder>
              what&apos;s different for experienced agents here — e.g. contract levels, carrier access, ownership of
              your book, and leadership opportunities.
            </Placeholder>
          </Section>

          <Section id="licensing" title="Licensing">
            <p>
              Selling life insurance requires a license from the state where you live. Each state sets its own rules,
              but the path usually looks like this:
            </p>
            <ol className="space-y-4">
              {[
                ["Pre-licensing education", "Many states require a set number of course hours before the exam."],
                ["State licensing exam", "A proctored exam on insurance concepts and state law."],
                ["Background check", "Most states require fingerprinting or a background check."],
                ["License application", "Apply to your state's department of insurance and pay its fees."],
                ["Carrier appointments", "Insurance companies appoint you so you can offer their products."],
              ].map(([term, desc], i) => (
                <li key={term} className="grid grid-cols-[1.75rem_1fr] gap-x-2">
                  <span className="text-steel tabular-nums">{i + 1}</span>
                  <span>
                    <span className="font-semibold text-ink">{term}. </span>
                    {desc}
                  </span>
                </li>
              ))}
            </ol>
            <p>
              Licenses must be renewed, usually with continuing education. To sell in other states, agents typically add
              non-resident licenses. Check your state&apos;s department of insurance for exact requirements.
            </p>
          </Section>

          <Section id="commission" title="The realities of commission-based work">
            <p>
              This is the part worth reading twice. Commission-based work rewards effort and consistency, but it
              doesn&apos;t come with a paycheck you can count on.
            </p>
            <List
              items={[
                "There is no salary. You're paid when policies you write are issued.",
                "Income varies, especially early on, and is never guaranteed.",
                "As an independent agent, you may cover your own business costs, such as licensing fees.",
                "Your results depend on your activity, skills, follow-through, and the market.",
                "It takes time to build a client base — plan your finances with that in mind.",
              ]}
            />
            <p>
              If you want independence and you&apos;re motivated by building something, those trade-offs can be worth
              it. Cole will walk you through them honestly in your first conversation.
            </p>
          </Section>

          <Section id="training" title="Training and support">
            <p>What you can expect from Cole and the team once you join:</p>
            <Placeholder>
              verified details of training (format, length, topics), mentorship, licensing support, tools and
              technology, lead programs, and team meetings.
            </Placeholder>
          </Section>
        </article>
      </div>

      <ApplyBand title="Sound like your kind of work?" />
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="space-y-5 text-lg leading-relaxed text-graphite">
      <h2 id={id} className="heading text-[clamp(1.75rem,3.5vw,2.5rem)] text-black">
        {title}
      </h2>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.85em] h-px w-4 shrink-0 bg-black" />
          {item}
        </li>
      ))}
    </ul>
  );
}
