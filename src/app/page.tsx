import type { Metadata } from "next";
import Link from "next/link";
import { ApplyBand } from "@/components/apply-band";
import { Photo } from "@/components/photo";
import { Placeholder } from "@/components/placeholder";
import { ButtonLink } from "@/components/ui/button";
import { NewTabNote } from "@/components/new-tab-note";
import { applyLinkProps, applyTarget } from "@/lib/apply";
import { showPlaceholders } from "@/lib/site";

const chapters = [
  { title: "Explore the opportunity", href: "/opportunity" },
  { title: "Apply to join the team", href: "apply" },
  { title: "Talk it through with Cole", href: "/join#what-happens-next" },
  { title: "Get licensed, if you aren't yet", href: "/opportunity#licensing" },
  { title: "Build your business", href: "/opportunity#the-work" },
];

export const metadata: Metadata = {
  title: { absolute: "Independent Life Insurance Agent Careers — Secure Life Agency" },
  description:
    "Life insurance agent opportunities for people new to the industry and licensed agents looking for more independence. Independent, commission-based, part-time or full-time, from anywhere in the U.S.",
  alternates: { canonical: "/" },
};

const v = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Home() {
  const apply = applyTarget();
  return (
    <>
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="wrap pt-10 pb-20 sm:pt-16 md:pb-28">
          <h1 className="display text-[clamp(3.1rem,11.5vw,9.75rem)]">
            <span className="hero-line block" style={v(0)}>
              Your Next
            </span>
            <span className="hero-line block" style={v(1)}>
              Chapter
            </span>
            <span className="hero-line block" style={v(2)}>
              Starts Here.
            </span>
          </h1>

          <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12">
            <div className="hero-line lg:col-span-5" style={v(3)}>
              <p className="text-xl leading-snug font-medium text-white sm:text-2xl">
                Build relationships. Develop your skills. Create a business around your ambitions.
              </p>
              <p className="mt-5 max-w-md text-silver">
                Whether you&apos;re entering the life insurance industry or bringing years of experience, take the next
                step with Secure Life Agency.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/opportunity" variant="light">
                  Explore the Opportunity
                </ButtonLink>
                <ButtonLink {...applyLinkProps(apply)} variant="outlineLight">
                  Apply to Join Our Team
                  <NewTabNote show={apply.external} />
                </ButtonLink>
              </div>
              <p className="mt-6 text-[0.9rem] text-pewter">
                Independent, commission-based life insurance agent opportunities.
              </p>
            </div>

            <nav aria-labelledby="path-heading" className="lg:col-span-6 lg:col-start-7">
              <h2 id="path-heading" className="toc-item text-[0.95rem] text-silver" style={v(0)}>
                Contents of your next chapter
              </h2>
              <ol className="mt-4 border-t border-white/15">
                {chapters.map((c, i) => (
                  <li key={c.title} className="toc-item border-b border-white/15" style={v(i + 1)}>
                    <Link
                      {...(c.href === "apply" ? applyLinkProps(apply) : { href: c.href })}
                      className="group flex items-baseline gap-4 py-4 text-lg sm:text-xl"
                    >
                      <span className="w-5 shrink-0 text-[0.95rem] text-pewter tabular-nums">{i + 1}</span>
                      <span className="transition-colors group-hover:text-white sm:text-white/90">
                        {c.title}
                        <NewTabNote show={c.href === "apply" && apply.external} />
                      </span>
                      <span
                        aria-hidden
                        className="leader mb-1.5 hidden h-px flex-1 border-b border-dotted border-white/30 sm:block"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <dl className="mt-20 grid gap-x-10 gap-y-8 border-t border-white/15 pt-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.term}>
                <dt className="font-semibold">{f.term}</dt>
                <dd className="mt-1.5 text-[0.95rem] text-silver">{f.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The opportunity */}
      <section className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="heading text-[clamp(2rem,4.5vw,3.25rem)]">
              An independent life insurance career, with a team behind you.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-graphite">
              Independent life insurance agents help individuals and families choose coverage that protects the people
              they care about. You&apos;re paid by commission, you shape your own schedule and goals, and you grow a
              book of clients over time.
            </p>
            <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <div>
                <dt className="font-semibold">You run the business</dt>
                <dd className="mt-1.5 text-graphite">Your activity, your clients, your pace.</dd>
              </div>
              <div>
                <dt className="font-semibold">You earn by commission</dt>
                <dd className="mt-1.5 text-graphite">No salary. What you earn depends on the work you put in.</dd>
              </div>
              <div>
                <dt className="font-semibold">You need a state license</dt>
                <dd className="mt-1.5 text-graphite">Required before you sell. Requirements vary by state.</dd>
              </div>
              <div>
                <dt className="font-semibold">You start with a conversation</dt>
                <dd className="mt-1.5 text-graphite">Talk with Cole before you commit to anything.</dd>
              </div>
            </dl>
            <Link
              href="/opportunity"
              className="mt-10 inline-block font-semibold underline decoration-silver underline-offset-[6px] hover:decoration-black"
            >
              Read what the work really involves
            </Link>
          </div>
          <Photo
            src="/photos/cole.jpg"
            className="aspect-[4/5] lg:col-span-5 lg:col-start-8"
            alt="Cole, owner of Secure Life Agency, smiling outside in a black button-up shirt"
            caption="Cole, owner of Secure Life Agency"
            brief="Cole"
          />
        </div>
      </section>

      {/* Two audiences */}
      <section aria-labelledby="paths-heading" className="bg-fog py-20 md:py-28">
        <div className="wrap">
          <h2 id="paths-heading" className="heading max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
            For new and licensed life insurance agents.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-black/15 md:grid-cols-2">
            <article className="bg-white p-7 sm:p-10">
              <h3 className="heading text-2xl sm:text-[1.75rem]">New to life insurance</h3>
              <p className="mt-4 text-graphite">
                For people drawn to sales, entrepreneurship, and professional growth — and willing to learn the
                licensing process from the start.
              </p>
              <h4 className="mt-8 text-[0.95rem] font-semibold">Where you&apos;d begin</h4>
              <ul className="mt-3 space-y-3 text-graphite">
                <li className="flex gap-3">
                  <Dash />
                  Learn what the role involves before you commit.
                </li>
                <li className="flex gap-3">
                  <Dash />
                  Complete your state&apos;s pre-licensing steps and exam.
                </li>
                <li className="flex gap-3">
                  <Dash />
                  Learn the products, the process, and how to run a client conversation.
                </li>
              </ul>
              <ButtonLink href="/opportunity#new-agents" variant="outlineDark" className="mt-10">
                The path for new agents
              </ButtonLink>
            </article>
            <article className="bg-ink p-7 text-white sm:p-10">
              <h3 className="heading text-2xl sm:text-[1.75rem]">Already licensed</h3>
              <p className="mt-4 text-silver">
                For agents exploring a new team, or ready for more independence in how they build their own business.
              </p>
              <h4 className="mt-8 text-[0.95rem] font-semibold">What we&apos;d talk about</h4>
              <ul className="mt-3 space-y-3 text-silver">
                <li className="flex gap-3">
                  <Dash light />
                  Where you are now, and where you want your business to go.
                </li>
                <li className="flex gap-3">
                  <Dash light />
                  How our structure and support would work for you.
                </li>
                <li className="flex gap-3">
                  <Dash light />
                  What a transition would look like, step by step.
                </li>
              </ul>
              <ButtonLink href="/opportunity#licensed-agents" variant="outlineLight" className="mt-10">
                The path for licensed agents
              </ButtonLink>
            </article>
          </div>
        </div>
      </section>

      {/* Training, support, structure */}
      <section aria-labelledby="support-heading" className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="support-heading" className="heading text-[clamp(2rem,4.5vw,3.25rem)]">
              How the team works.
            </h2>
            <p className="mt-5 text-graphite">
              The specifics, in plain terms. Ask Cole about any of it in your first conversation.
            </p>
          </div>
          <dl className="divide-y divide-black/10 border-y border-black/10 lg:col-span-7 lg:col-start-6">
            {support
              .filter((item) => item.body || showPlaceholders)
              .map((item) => (
                <div key={item.term} className="grid gap-3 py-6 sm:grid-cols-3 sm:gap-8">
                  <dt className="font-semibold">{item.term}</dt>
                  <dd className="space-y-3 sm:col-span-2">
                    {item.body ? <p className="text-graphite">{item.body}</p> : null}
                    {item.todo ? <Placeholder>{item.todo}</Placeholder> : null}
                  </dd>
                </div>
              ))}
          </dl>
        </div>
      </section>

      <ApplyBand />
    </>
  );
}

const facts = [
  { term: "Part-time or full-time", body: "You choose how much time you put in." },
  { term: "Anywhere in the U.S.", body: "The agency serves clients in all 50 states." },
  { term: "Leads at every level of intent", body: "From people just browsing to people ready to buy." },
  { term: "Final expense focus", body: "Plus term, whole life, burial insurance, and annuities." },
];

/** `body` holds confirmed details; `todo` marks what still needs Cole's input. */
const support: { term: string; body?: string; todo?: string }[] = [
  { term: "Training", todo: "format (classroom, virtual, self-paced), length, and what it covers." },
  { term: "Mentorship", todo: "who new agents work alongside, and how often." },
  { term: "Licensing help", todo: "what support is offered for pre-licensing and the exam, and who pays for what." },
  {
    term: "What you'd offer",
    body: "Final expense life insurance is the focus. Agents also offer term life, whole life, burial insurance, and annuities.",
  },
  {
    term: "Carriers",
    body: "Multiple carriers, including Corebridge Financial, Transamerica, Lincoln Financial Group, Mutual of Omaha, and AIG.",
  },
  {
    term: "Clients and leads",
    body: "Agents have access to leads from multiple lead vendors, at low, medium, and high levels of intent.",
    todo: "how leads are distributed, and whether agents pay for them.",
  },
  {
    term: "Schedule and location",
    body: "Part-time or full-time. The agency serves clients in all 50 states, so you can work from anywhere in the U.S.",
  },
  { term: "Costs to the agent", todo: "any licensing, E&O insurance, technology, or lead costs agents cover." },
];

function Dash({ light }: { light?: boolean }) {
  return <span aria-hidden className={`mt-[0.8em] h-px w-4 shrink-0 ${light ? "bg-silver" : "bg-black"}`} />;
}
