import { ButtonLink } from "@/components/ui/button";

export function ApplyBand({
  title = "Ready for your next chapter?",
  body = "Applying starts a conversation. You'll talk with Cole about your goals, your situation, and whether this is a fit — before you commit to anything.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-black text-white">
      <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:items-end md:py-28">
        <h2 className="display text-[clamp(2.5rem,7vw,5.5rem)] md:col-span-8">{title}</h2>
        <div className="md:col-span-4">
          <p className="max-w-sm text-silver">{body}</p>
          <ButtonLink href="/join" variant="light" className="mt-8">
            Apply to Join Our Team
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
