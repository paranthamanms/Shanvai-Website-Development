const badges = [
  'BFSI-grade security posture',
  'Audit-ready decision trails',
  'Multi-tenant data isolation',
  'API-first partner integration',
];

export function TrustBadges() {
  return (
    <section className="border-y border-white/10 bg-abyss/80" aria-label="Trust signals">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        {badges.map((badge) => (
          <p
            key={badge}
            className="flex items-center gap-2 text-sm text-mist"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-electric" aria-hidden />
            {badge}
          </p>
        ))}
      </div>
    </section>
  );
}
