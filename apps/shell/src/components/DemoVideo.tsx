'use client';

import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

type DemoId = 'decision-core' | 'credit-bureau' | 'aiops';

const demos: Array<{
  id: DemoId;
  title: string;
  subtitle: string;
  caption: string;
}> = [
  {
    id: 'decision-core',
    title: 'Shanvai Decision Core',
    subtitle: 'Policy → score → explainable outcome',
    caption: 'Watch a lending decision path resolve in real time.',
  },
  {
    id: 'credit-bureau',
    title: 'Shanvai Credit Bureau',
    subtitle: 'Ingest → enrich → partner API',
    caption: 'See multi-source bureau signals assemble into a clean credit view.',
  },
  {
    id: 'aiops',
    title: 'Shanvai AIOps',
    subtitle: 'Detect → diagnose → automate',
    caption: 'Follow an ops anomaly from alert through AI-assisted remediation.',
  },
];

export function DemoVideo() {
  useEffect(() => {
    void fetch(`${API_BASE}/api/v1/health`).catch(() => undefined);
  }, []);

  return (
    <section id="demo" className="section-pad bg-canvas">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Demo</p>
          <h2 className="section-title mt-3">Product demos</h2>
          <p className="section-lead">
            Interactive walkthroughs for Decision Core, Credit Bureau, and AIOps — built for the
            browser while full recorded videos are prepared.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {demos.map((demo) => (
            <article key={demo.id} className="overflow-hidden rounded-xl border border-line bg-white shadow-lift">
              <div className="flex flex-col gap-1 border-b border-line px-5 py-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-inkStrong">{demo.title}</h3>
                  <p className="mt-1 text-sm text-mist">{demo.subtitle}</p>
                </div>
                <p className="text-sm text-mist sm:text-right">{demo.caption}</p>
              </div>
              <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-brandSoft via-white to-canvas">
                <ProductDemoStage product={demo.id} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductDemoStage({ product }: { product: DemoId }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  if (product === 'decision-core') {
    return (
      <div className="relative h-full w-full p-6 text-inkStrong sm:p-10">
        <div className="absolute inset-x-0 top-0 h-1 origin-left bg-brand animate-demo-bar" />
        <p className="font-display text-sm uppercase tracking-[0.2em] text-brand">Decision Core</p>
        <p className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Application #48291</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Policy pack', value: step >= 1 ? 'Retail Unsecured v3' : '…' },
            { label: 'Risk score', value: step >= 2 ? '742' : '…' },
            { label: 'Outcome', value: step >= 3 ? 'Approve · Limit ₹4.5L' : 'Evaluating' },
          ].map((item) => (
            <div key={item.label} className="border border-line bg-surface px-4 py-5 shadow-lift">
              <p className="text-sm text-mist">{item.label}</p>
              <p className="mt-2 font-display text-xl text-brand">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-8 top-16 h-24 w-[2px] bg-gradient-to-b from-brand/0 via-brand/70 to-brand/0 animate-demo-scan" />
        <p className="mt-8 text-base text-mist">
          Explainability trail: income stability · bureau depth · velocity checks
        </p>
      </div>
    );
  }

  if (product === 'credit-bureau') {
    const sources = ['Bank statements', 'Trade lines', 'Alternate data', 'Partner bureau'];
    return (
      <div className="relative h-full w-full p-6 text-inkStrong sm:p-10">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-brand">Credit Bureau</p>
        <p className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Unified credit profile</p>
        <div className="mt-8 space-y-3">
          {sources.map((source, i) => (
            <div
              key={source}
              className="flex items-center gap-3 border border-line bg-surface px-4 py-3 shadow-lift"
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  step >= i ? 'bg-brand animate-demo-pulse' : 'bg-brandWash'
                }`}
              />
              <span className="flex-1 text-base">{source}</span>
              <span className="text-sm text-mist">{step >= i ? 'Synced' : 'Queued'}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 font-display text-lg text-brand">
          {step >= 3 ? 'Bureau grade: A+ · API ready' : 'Enriching multi-source ledger…'}
        </p>
      </div>
    );
  }

  const alerts = ['Latency spike · inquiry API', 'Queue depth · ingestion', 'CPU · scoring workers'];
  return (
    <div className="relative h-full w-full p-6 text-inkStrong sm:p-10">
      <p className="font-display text-sm uppercase tracking-[0.2em] text-brand">AIOps</p>
      <p className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Ops intelligence desk</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <div
              key={alert}
              className={`border px-4 py-3 text-base ${
                step === i
                  ? 'border-brand bg-brandSoft text-inkStrong'
                  : 'border-line bg-surface text-mist'
              }`}
            >
              {alert}
            </div>
          ))}
        </div>
        <div className="border border-line bg-surface p-5 shadow-lift">
          <p className="text-sm uppercase tracking-wider text-mist">Recommended action</p>
          <p className="mt-3 font-display text-xl text-brand">
            {step === 0 && 'Scale inquiry pods · drain cache'}
            {step === 1 && 'Rebalance Kafka partitions'}
            {step === 2 && 'Warm standby scoring pool'}
            {step === 3 && 'Incident closed · SLO restored'}
          </p>
          <div className="mt-6 h-2 overflow-hidden bg-brandWash">
            <div className="h-full bg-brand animate-demo-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
