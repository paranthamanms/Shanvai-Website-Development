const products = [
  {
    name: 'Shanvai Decision Core',
    blurb:
      'Real-time policy orchestration, risk scoring, and explainable outcomes across lending, onboarding, and fraud workflows.',
  },
  {
    name: 'Shanvai Credit Bureau',
    blurb:
      'Multi-source credit intelligence with resilient ingestion pipelines and partner-ready bureau analytics APIs.',
  },
  {
    name: 'Enterprise Partnerships',
    blurb:
      'Pilot programs, co-built decision journeys, and integration support for banks, NBFCs, and regulated fintechs.',
  },
];

export function ProductShowcase() {
  return (
    <section id="products" className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-electric">
        Products
      </p>
      <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-snow sm:text-4xl">
        Platforms built for regulated decisioning
      </h2>
      <p className="mt-4 max-w-2xl text-mist">
        One composition of decision, bureau, and partnership capabilities — designed for institutions
        that ship under scrutiny.
      </p>
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {products.map((p) => (
          <article key={p.name} className="border-t border-electric/30 pt-6">
            <h3 className="font-display text-xl font-semibold text-snow">{p.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">{p.blurb}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
