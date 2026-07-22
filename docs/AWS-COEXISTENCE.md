# AWS coexistence: Shanvai website vs Credit Bureau

## Goal

Host **https://www.shanvai.com** as **one container** in the **same AWS account** used for Credit Bureau (`ap-south-1`, profile `credit-bureau-dev`), without breaking Credit Bureau isolation.

## How effective is coexistence?

| Dimension | Effectiveness | Notes |
|-----------|---------------|-------|
| **Same AWS account** | High | Fine for cost/billing consolidation and shared SSO. |
| **Shared VPC / ECS cluster / ALB** | Low–Medium | Couples blast radius, security groups, and Credit Bureau DEV scale-down workflows. **Not recommended.** |
| **Separate project prefix (`shanvai-*`)** | High | Matches Credit Bureau’s own isolation model (`credit-bureau-dev-*`). |
| **Own CloudFront + ACM + Route53 for shanvai.com** | High | Credit Bureau has no Route53 yet; Shanvai needs custom DNS anyway. |
| **One website container (Next.js)** | High for marketing site | Landing, products, presence, chatbot fallback. |
| **Leads/chat API + Postgres** | Medium unless added | Contact/chat need API+DB (2nd service) or Next.js API routes + RDS later. |
| **Cost isolation** | Medium–High | Use `Project=shanvai` tags + separate budget filter; account-level budget is still shared. |
| **Operational risk to Credit Bureau** | Low if isolated | Own VPC/cluster/ALB/ECR; do not register into `credit-bureau-dev.internal`. |

**Verdict:** Same-account coexistence is **effective and recommended** when Shanvai is a **parallel mini-stack** (`shanvai-prod-web`), not a guest on Credit Bureau’s ECS/ALB. Sharing Credit Bureau’s VPC/cluster saves a little money but fights this account’s DEV cost-control design and raises change risk.

## Target architecture (one container)

```
Browser
  → Route53  www.shanvai.com
  → CloudFront (ACM in us-east-1)
  → ALB
  → ECS Fargate service (desired=1)  image: shanvai/www
```

Build locally:

```bash
docker build -t shanvai/www:local -f Dockerfile .
docker compose -f docker-compose.web.yml up --build
# http://localhost:3080
```

Terraform scaffold: `infrastructure/terraform/web/`

## Explicitly do not reuse from Credit Bureau

- `credit-bureau-dev` VPC (`10.40.0.0/16`), ECS cluster, ALB, CloudFront, Cloud Map
- ECR namespace `credit-bureau/*`
- RDS/Kafka/Redis/dependency host
- Path prefixes `/api/v1/*` owned by Control Center

## DNS prerequisites (outside Terraform initially)

1. Register / control **shanvai.com** in Route53 (or external DNS with alias to CloudFront).
2. Request ACM certificate for `www.shanvai.com` (and optionally apex) in **us-east-1**.
3. Point `www` to the Shanvai CloudFront distribution only.
