import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { ApplyBand } from "@/components/apply-band";
import { PageIntro } from "@/components/page-intro";
import { Photo } from "@/components/photo";
import { Placeholder } from "@/components/placeholder";
import { showPlaceholders } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Cole",
  description:
    "Meet Cole, owner of Secure Life Agency, and learn how he leads the independent life insurance agents on his team.",
  alternates: { canonical: "/about" },
};

/** Drop Cole's portrait at public/photos/cole.jpg and it appears here on the next build. */
const portrait = existsSync(join(process.cwd(), "public/photos/cole.jpg")) ? "/photos/cole.jpg" : undefined;

export default function AboutPage() {
  return (
    <>
      <PageIntro title="About Cole">
        <p>The owner of Secure Life Agency, and the person you&apos;ll talk with first.</p>
      </PageIntro>

      <section className="py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Photo
            src={portrait}
            priority
            className="aspect-[4/5] lg:col-span-5"
            alt="Cole, owner of Secure Life Agency, standing outside in a black button-up shirt"
            brief="Cole, photographed where he actually works — office or client meeting — looking at the camera. Black and white or muted color."
          />

          <div className="space-y-12 lg:col-span-6 lg:col-start-7 lg:self-center">
            <div className="space-y-5 text-lg text-graphite">
              <h2 className="heading text-[clamp(1.75rem,3.5vw,2.5rem)] text-black">Meet Cole</h2>
              <p>
                Cole owns Secure Life Agency and leads its team of independent life insurance agents — new and
                experienced, part-time and full-time, across the U.S.
              </p>
              <p>
                If you apply, your introductory conversation is with Cole. It&apos;s your chance to talk through your
                goals, ask anything about the work — leads, carriers, licensing, commission — and decide together
                whether it&apos;s a fit.
              </p>
            </div>
            {showPlaceholders ? (
              <>
                <Block title="Background">
                  <Placeholder>
                    Cole&apos;s biography: where he&apos;s from, how he came to life insurance, and how long he&apos;s
                    been in the industry.
                  </Placeholder>
                </Block>
                <Block title="Experience and credentials">
                  <Placeholder>
                    licenses held, designations, years in the business, and roles held. Only verifiable facts.
                  </Placeholder>
                </Block>
                <Block title="Why he built Secure Life Agency">
                  <Placeholder>
                    Cole&apos;s personal story in his own words — what he wanted to build and for whom.
                  </Placeholder>
                </Block>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-labelledby="leadership-heading" className="bg-fog py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <h2 id="leadership-heading" className="heading text-[clamp(2rem,4.5vw,3.25rem)] lg:col-span-4">
            How Cole leads.
          </h2>
          <div className="space-y-6 lg:col-span-7 lg:col-start-6">
            <p className="text-lg text-graphite">
              Leadership here starts with honesty about the work — what it takes, what it pays, and what it asks of you
              — so every agent can make a clear decision.
            </p>
            <Placeholder>
              Cole&apos;s leadership approach in his own words: how he trains, how available he is to agents, what he
              expects, and what agents can expect from him. A short quote from Cole works well here.
            </Placeholder>
          </div>
        </div>
      </section>

      <ApplyBand title="Start with a conversation." />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="heading text-2xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
