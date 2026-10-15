import type { Metadata } from "next";
import { ApplyBand } from "@/components/apply-band";
import { PageIntro } from "@/components/page-intro";
import { Placeholder } from "@/components/placeholder";

export const metadata: Metadata = {
  title: "Become a Life Insurance Agent: Independent, Part-Time or Full-Time",
  description:
    "What a life insurance sales career with a final expense focus involves, how to become a licensed agent, how leads work, and the realities of independent, commission-based work — for new and experienced agents.",
  alternates: { canonical: "/opportunity" },
};

const sections = [
  { id: "the-work", label: "What the work involves" },
  { id: "products", label: "What you'd offer" },
  { id: "leads", label: "Leads" },
  { id: "new-agents", label: "If you're new" },
  { id: "licensed-agents", label: "If you're licensed" },
  { id: "licensing", label: "Licensing" },
  { id: "commission", label: "Commission-based work" },
  { id: "training", label: "Training and support" },
  { id: "questions", label: "Common questions" },
];

type Faq = { q: string } & ({ text: string; a?: never } | { a: React.ReactNode; text?: never });

/** `text` marks verified answers; only those are published as FAQ structured data. */
const faqs: Faq[] = [
  {
    q: "Do I need experience to apply?",
    text: "No. You don't need a background in insurance or sales. You do need to be willing to learn, comfortable talking with people, and ready to put real time into building the business.",
  },
  {
    q: "Do I need a life insurance license before I apply?",
    text: "No. You can apply whether you're already licensed, working toward your license, or just exploring the industry. You'll need a license from your state before you can sell.",
  },
  {
    q: "Is there a salary?",
    text: "No. Agents are independent and paid by commission. Income depends on your effort, skills, and other factors, varies from person to person, and is never guaranteed.",
  },
  {
    q: "How long does it take to get licensed?",
    text: "It depends on your state's education requirements, exam scheduling, and how long the state takes to process your application. Your state's department of insurance lists the exact steps.",
  },
  {
    q: "What would I be selling?",
    text: "Final expense life insurance is the focus. Agents also offer term life, whole life, burial insurance, and annuities.",
  },
  {
    q: "Are leads available?",
    text: "Yes. Agents have access to leads from multiple lead vendors, at low, medium, and high levels of intent.",
  },
  {
    q: "Can I do this part-time?",
    text: "Yes. Agents work part-time or full-time. The agency serves clients in all 50 states, so you can work from anywhere in the U.S.",
  },
  {
    q: "Does it cost anything to get started?",
    a: (
      <>
        <p>
          Getting licensed usually involves fees for pre-licensing courses, the exam, a background check, and the
          license application. Those amounts are set by your state and course providers.
        </p>
        <Placeholder className="mt-4">
          any other costs agents cover — including whether leads are paid for — and whether the agency helps with
          any of them.
        </Placeholder>
      </>
    ),
  },
  {
    q: "I'm already licensed. What would change if I joined?",
    a: <Placeholder>contracting, carrier access, how existing clients are handled, and any transition steps.</Placeholder>,
  },
  {
    q: "What happens on the introductory call?",
    text: "You and Cole talk through your background, your goals, and your questions about the work. It's a chance for both of you to decide whether it's a fit, and there's no commitment.",
  },
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
            <p>
              You can do this part-time or full-time, and from anywhere in the U.S. — the agency serves clients in all
              50 states.
            </p>
            <List
              items={[
                "Working leads and following up with prospective clients.",
                "Meeting with people — in person, by phone, or online — to understand their needs.",
                "Explaining coverage options and completing applications accurately.",
                "Staying in touch with clients as their lives change.",
                "Managing your own schedule, pipeline, and goals.",
              ]}
            />
          </Section>

          <Section id="products" title="What you'd offer">
            <p>
              The focus is final expense life insurance: whole life coverage with a smaller benefit, usually meant to
              cover funeral costs and other end-of-life expenses so families aren&apos;t left with the bill.
            </p>
            <p>Agents also offer:</p>
            <List items={["Term life insurance", "Whole life insurance", "Burial insurance", "Annuities"]} />
            <Placeholder>the carriers agents can write with.</Placeholder>
          </Section>

          <Section id="leads" title="Leads">
            <p>
              You don&apos;t have to build a client list from nothing. Agents have access to leads from multiple lead
              vendors, at three levels of intent:
            </p>
            <dl className="grid gap-px overflow-hidden rounded-sm border border-black/10 bg-black/10 sm:grid-cols-3">
              {[
                ["Low intent", "People just browsing."],
                ["Medium intent", "People gathering information."],
                ["High intent", "People ready to buy."],
              ].map(([term, desc]) => (
                <div key={term} className="bg-white p-5">
                  <dt className="font-semibold text-ink">{term}</dt>
                  <dd className="mt-1 text-base">{desc}</dd>
                </div>
              ))}
            </dl>
            <p>Higher-intent leads are closer to a decision; lower-intent leads take more follow-up.</p>
            <Placeholder>how leads are distributed, and whether agents pay for them.</Placeholder>
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
              Licenses must be renewed, usually with continuing education. Your first license comes from your home state.
              Because the agency serves clients in all 50 states, you can add non-resident licenses to help clients in
              other states. Check your state&apos;s department of insurance for exact requirements.
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
              technology, and team meetings.
            </Placeholder>
          </Section>

          <Section id="questions" title="Common questions">
            <div className="border-t border-black/10">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-black/10">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-45">
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </summary>
                  <div className="pb-6 text-base">{f.text ? <p>{f.text}</p> : f.a}</div>
                </details>
              ))}
            </div>
          </Section>
        </article>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs
              .filter((f) => f.text)
              .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.text } })),
          }),
        }}
      />
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
