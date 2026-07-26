const badges = [
  'BFSI-grade security posture',
  'Audit-ready decision trails',
  'Multi-tenant data isolation',
  'API-first partner integration',
];

export function TrustBadges() {
  return (
    <section className="border-y border-navy/10 bg-navy text-white" aria-label="Trust signals">
      <div className="site-container flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5">
        {badges.map((badge) => (
          <p key={badge} className="flex items-center gap-2 text-sm text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-brandMuted" aria-hidden />
            {badge}
          </p>
        ))}
      </div>
    </section>
  );
}
