export type TrendingCategory = 'news' | 'video' | 'insight';

export type TrendingItem = {
  slug: string;
  title: string;
  summary: string;
  category: TrendingCategory;
  date: string; // ISO date
  tags: string[];
  /** Self-hosted MP4 under /public (plays on shanvai.com) */
  videoSrc?: string;
  posterSrc?: string;
  /** Longer body for article pages */
  body: string[];
  featured?: boolean;
};

export const TRENDING_CATEGORIES: { id: 'all' | TrendingCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'news', label: 'Industry news' },
  { id: 'video', label: 'Spotlights' },
  { id: 'insight', label: 'Insights' },
];

export const TRENDING_ITEMS: TrendingItem[] = [
  {
    slug: 'aiops-cost-compliance-demand',
    title: 'Why AIOps demand is rising: cost, compliance, and regulation',
    summary:
      'Industry news — BFSI platforms face mounting run-cost pressure and stricter operational resilience rules, accelerating investment in AIOps.',
    category: 'news',
    date: '2026-07-25',
    tags: ['AIOps', 'Cost', 'Compliance', 'Regulation'],
    body: [
      'Cost perspective: Always-on decisioning, bureau APIs, and data pipelines burn cloud and people cost when incidents are handled manually. AIOps that detect drift early, recommend runbooks, and automate safe remediation reduce mean-time-to-recover and idle over-provisioning — a direct lever on unit cost per inquiry and per decision.',
      'Compliance perspective: Auditability is no longer optional. Regulators and internal control functions expect evidence of how production systems behaved during incidents — who approved a change, what was automated, and when SLOs recovered. AIOps platforms that retain action trails beside Decision Core and Credit Bureau help institutions demonstrate control.',
      'Regulatory perspective: Operational resilience guidance (including expectations around ICT risk, outsourcing, and service continuity) pushes banks and NBFCs to prove they can detect, respond, and restore critical credit and inquiry services. Shanvai AIOps is designed for that reality: anomaly detection, gated automation, and SLO recovery beside the platforms that move money and credit decisions.',
    ],
  },
  {
    slug: 'bfsi-demand-bureau-decision-core',
    title: 'BFSI demand for Credit Bureau and Decision Core keeps climbing',
    summary:
      'Industry news — sector growth, customer expectations for instant credit, and partner ecosystems are driving deeper need for bureau intelligence and governed decision engines.',
    category: 'news',
    date: '2026-07-24',
    tags: ['Credit Bureau', 'Decision Core', 'BFSI', 'Customers'],
    body: [
      'Sector demand: Banks, NBFCs, and fintechs are expanding digital lending, MSME credit, and embedded finance. That growth multiplies the volume of credit files, partner data, and real-time inquiries — raising the bar for multi-source Credit Bureau platforms that can ingest, resolve identity, and serve clean profiles at scale.',
      'Customer needs: Borrowers and merchants expect faster yes/no outcomes with clear reasons. Decision Core addresses that with policy packs, explainable scores, and approve / review / decline paths that officers and customers can understand — while keeping deterministic control for regulated institutions.',
      'Institutional needs: Risk, compliance, and product teams want one governed decision surface wired to bureau-grade data — not fragmented spreadsheets and opaque models. Shanvai highlights the combined Credit Bureau + Decision Core pattern as the foundation for trustworthy digital credit in BFSI.',
    ],
  },
  {
    slug: 'decision-core-e2e-journey',
    title: 'Decision Core: end-to-end lending decision',
    summary:
      'Shanvai Spotlight — application intake through policy, score, explainable approve, and reason codes.',
    category: 'video',
    date: '2026-07-26',
    tags: ['Decision Core', 'Spotlight', 'Demo'],
    videoSrc: '/media/demos/decision-core-e2e.mp4',
    posterSrc: '/media/demos/decision-core-e2e.jpg',
    featured: true,
    body: [
      'This product journey walks a retail unsecured application through Decision Core: intake, policy pack selection, risk scoring, deterministic outcome, and an explainability trail.',
      'GenAI may assist narratives; policy packs own approve / review / decline. Request a live demo to see your institution’s policy model.',
    ],
  },
  {
    slug: 'credit-bureau-e2e-journey',
    title: 'Credit Bureau: end-to-end bureau pipeline',
    summary:
      'Shanvai Spotlight — SFTP ingest through ETL, identity resolution, unified profile, and partner inquiry APIs.',
    category: 'video',
    date: '2026-07-26',
    tags: ['Credit Bureau', 'Spotlight', 'Demo'],
    videoSrc: '/media/demos/credit-bureau-e2e.mp4',
    posterSrc: '/media/demos/credit-bureau-e2e.jpg',
    featured: true,
    body: [
      'Follow member data from SFTP drop into raw storage, deterministic ETL, identity resolution (Global Bureau ID), unified profile, and online inquiry APIs.',
      'Built for banks, NBFCs, and partners that need bureau-grade data with audit evidence.',
    ],
  },
  {
    slug: 'aiops-e2e-journey',
    title: 'AIOps: end-to-end ops intelligence',
    summary:
      'Shanvai Spotlight — detect anomalies, diagnose, recommend runbooks, remediate, and restore SLOs.',
    category: 'video',
    date: '2026-07-26',
    tags: ['AIOps', 'Spotlight', 'Demo'],
    videoSrc: '/media/demos/aiops-e2e.mp4',
    posterSrc: '/media/demos/aiops-e2e.jpg',
    featured: true,
    body: [
      'See how Shanvai AIOps watches Decision Core and Credit Bureau platforms: latency and queue signals, AI-assisted recommendations, gated automation, and SLO recovery.',
      'Designed as ops intelligence beside your decision and bureau stack — not a generic monitor.',
    ],
  },
  {
    slug: 'genai-in-the-credit-lifecycle',
    title: 'GenAI in the credit lifecycle: from hype to governed impact',
    summary:
      'Shanvai highlights how banks and NBFCs move GenAI from pilots into underwriting and collections — without losing regulatory control.',
    category: 'insight',
    date: '2026-07-18',
    tags: ['GenAI', 'Credit', 'Governance'],
    featured: true,
    body: [
      'Generative AI is reshaping how institutions draft policy narratives, summarize bureau files, and support credit officers — but production value depends on guardrails, audit trails, and human-in-the-loop design.',
      'Shanvai Decision Core treats GenAI as an assistive layer on top of deterministic policy packs: models propose, policies decide, and every outcome remains explainable for regulators and customers.',
      'Institutions that win are pairing retrieval-grounded assistants with existing risk engines, not replacing scorecards overnight. The near-term opportunity is faster analyst productivity and cleaner exception handling.',
    ],
  },
  {
    slug: 'introduction-to-generative-ai',
    title: 'GenAI foundations for credit teams',
    summary:
      'A Shanvai Spotlight briefing on generative AI foundations for technology and risk leaders evaluating enterprise use cases.',
    category: 'video',
    date: '2026-07-12',
    tags: ['GenAI', 'Technology', 'Spotlight'],
    videoSrc: '/media/trending/genai-foundations.mp4',
    posterSrc: '/media/trending/genai-foundations.jpg',
    featured: true,
    body: [
      'This Shanvai Spotlight frames the GenAI basics our product, risk, and compliance stakeholders align on before any pilot.',
      'Use it as a shared baseline before deeper discussions on credit decisioning, bureau enrichment, and AIOps automation — then explore Decision Core for governed production paths.',
    ],
  },
  {
    slug: 'india-digital-credit-infrastructure',
    title: 'India’s digital credit infrastructure keeps raising the bar',
    summary:
      'Highlighted by Shanvai: account aggregators, alternate data, and real-time decisioning are compressing loan journeys.',
    category: 'news',
    date: '2026-07-08',
    tags: ['India', 'Digital credit', 'Data'],
    body: [
      'India’s public digital infrastructure continues to accelerate consumer and MSME credit delivery. Lenders that integrate cleanly with alternate data and bureau signals can cut time-to-yes while meeting RBI expectations for fair lending.',
      'Shanvai Credit Bureau and Decision Core are built for this environment: multi-source ingestion, enrichment, and policy-driven outcomes that stay transparent to auditors.',
    ],
  },
  {
    slug: 'large-language-models-for-bfsi',
    title: 'Large language models in BFSI',
    summary:
      'Shanvai Spotlight: where LLMs help BFSI teams — and where deterministic decision engines must remain in control.',
    category: 'video',
    date: '2026-07-02',
    tags: ['LLM', 'BFSI', 'GenAI', 'Spotlight'],
    videoSrc: '/media/trending/llm-for-bfsi.mp4',
    posterSrc: '/media/trending/llm-for-bfsi.jpg',
    featured: true,
    body: [
      'Large language models power many enterprise copilots. For credit and operations teams, the critical questions are grounding, latency, PII handling, and when to fall back to deterministic systems.',
      'Shanvai positions LLMs as assistants beside Decision Core — never as the sole authority on approve, review, or decline.',
    ],
  },
  {
    slug: 'aiops-for-decision-platforms',
    title: 'AIOps for decision platforms: spotting drift before customers feel it',
    summary:
      'Shanvai highlights why observability and automated remediation are becoming mandatory for always-on decisioning APIs.',
    category: 'insight',
    date: '2026-06-26',
    tags: ['AIOps', 'Reliability', 'Platforms'],
    body: [
      'When decision APIs slow down or score distributions drift, revenue and trust erode quickly. AIOps connects telemetry, anomaly detection, and recommended actions so platform teams can remediate before SLAs breach.',
      'Shanvai AIOps is designed beside Decision Core and Credit Bureau — not as a generic monitoring bolt-on.',
    ],
  },
  {
    slug: 'responsible-ai-in-lending',
    title: 'Responsible AI in lending',
    summary:
      'A Shanvai Spotlight on fairness, transparency, and accountability when AI touches lending decisions.',
    category: 'video',
    date: '2026-06-20',
    tags: ['Responsible AI', 'Compliance', 'Spotlight'],
    videoSrc: '/media/trending/responsible-ai-lending.mp4',
    posterSrc: '/media/trending/responsible-ai-lending.jpg',
    featured: true,
    body: [
      'Responsible AI is not optional in regulated lending. This Spotlight frames the principles Shanvai embeds into product design: explainability, human oversight, and measurable control.',
      'Watch on-site, then talk to our solutions team about how Decision Core operationalises those principles.',
    ],
  },
  {
    slug: 'enterprise-partnerships-co-build',
    title: 'Co-building decision journeys with banks and fintechs',
    summary:
      'Highlighted by Shanvai: partnership models that move beyond vendor RFP cycles into shared roadmaps and measurable pilots.',
    category: 'news',
    date: '2026-06-14',
    tags: ['Partnerships', 'Enterprise'],
    body: [
      'Enterprise institutions increasingly prefer co-built journeys: shared success metrics, sandbox pilots, and staged production cutovers.',
      'Shanvai Enterprise Partnerships packages Decision Core, Credit Bureau, and AIOps into collaborative delivery models for banks, NBFCs, and fintechs.',
    ],
  },
  {
    slug: 'explainable-approve-review-decline',
    title: 'Explainable approve / review / decline is the new table stakes',
    summary:
      'Shanvai highlights why regulators and customers expect clear reasons — and how GenAI can help draft them without owning the outcome.',
    category: 'insight',
    date: '2026-06-05',
    tags: ['Explainability', 'Decisioning'],
    body: [
      'Opaque model scores are no longer enough. Institutions need structured reason codes, narrative summaries, and appeal-ready documentation.',
      'Decision Core keeps the decision path auditable while optional GenAI assistants help officers communicate outcomes clearly.',
    ],
  },
];

export function getTrendingBySlug(slug: string): TrendingItem | undefined {
  return TRENDING_ITEMS.find((item) => item.slug === slug);
}

export function formatTrendingDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function categoryLabel(category: TrendingCategory): string {
  switch (category) {
    case 'news':
      return 'News';
    case 'video':
      return 'Spotlight';
    case 'insight':
      return 'Insight';
  }
}
