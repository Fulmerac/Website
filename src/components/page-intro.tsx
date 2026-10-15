export function PageIntro({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <section className="bg-black text-white">
      <div className="wrap pt-14 pb-20 sm:pt-20 md:pb-28">
        <h1 className="display hero-line max-w-5xl text-[clamp(2.75rem,8vw,6.5rem)]" style={{ "--i": 0 } as React.CSSProperties}>
          {title}
        </h1>
        {children ? (
          <div className="hero-line mt-8 max-w-2xl space-y-4 text-lg text-silver" style={{ "--i": 1 } as React.CSSProperties}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
