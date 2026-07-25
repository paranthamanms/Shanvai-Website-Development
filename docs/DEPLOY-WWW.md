# Deploy www.shanvai.com (PROD)

Public site only · one ECS Fargate task · new VPC `10.50.0.0/16` · same AWS account as Credit Bureau (`credit-bureau-dev`).

## Architecture

```
Squarespace DNS (shanvai.com)
  www CNAME → CloudFront
CloudFront (HTTPS, ACM us-east-1)
  → ALB :80 (ap-south-1, CloudFront prefix-list only)
  → ECS Fargate Spot × 1 (public subnet, no NAT)
  → Next.js container shanvai/www :3000
```

Estimated cost target: **~$30–50/mo** (ALB is the largest line item; no NAT Gateway).

## Prerequisites

1. Refresh SSO:
   ```bash
   aws sso login --profile credit-bureau-dev
   aws sts get-caller-identity --profile credit-bureau-dev
   ```
2. Terraform ≥ 1.6, Docker (for local image smoke tests).
3. Squarespace admin access for DNS.

## Step A — Terraform apply (infra)

```bash
cd "/Users/amp/Projects/Shanvai Website Development/infrastructure/terraform/web"
cp terraform.tfvars.example terraform.tfvars   # if needed
terraform init
terraform plan
terraform apply
```

**While ACM is pending**, open another terminal and print validation records:

```bash
terraform output -json acm_validation_records
```

### Squarespace — ACM validation CNAMEs

In Squarespace → Domains → shanvai.com → DNS:

| Type | Host | Data |
|------|------|------|
| CNAME | *(from output `name`, often like `_abc…`)* | *(from output `value`)* |

Add **one CNAME per domain** in the output (`www.shanvai.com` and `shanvai.com`).  
Do **not** add a trailing dot if Squarespace adds it automatically.

Terraform waits up to **60 minutes** for ACM to become `ISSUED`, then creates CloudFront with the custom cert.

## Step B — Squarespace — point www to CloudFront

After apply succeeds:

```bash
terraform output squarespace_www_cname
terraform output cloudfront_distribution_id
terraform output github_deploy_role_arn
```

In Squarespace DNS:

| Type | Host | Data |
|------|------|------|
| CNAME | `www` | *(cloudfront domain, e.g. `dxxxxx.cloudfront.net`)* |

Remove any conflicting `www` A/AAAA records first.

Apex (`shanvai.com`) can redirect to `www` later in Squarespace forwarding (optional).

## Step C — GitHub Actions OIDC

1. Repo **Settings → Environments → `prod`** (create if missing).
2. Secrets:
   - `AWS_ROLE_ARN` = `terraform output -raw github_deploy_role_arn`
   - `CLOUDFRONT_DISTRIBUTION_ID` = `terraform output -raw cloudfront_distribution_id` (optional)
3. Push to `main` or run **Deploy www.shanvai.com** manually.

First successful deploy sets ECS `desired_count=1` and rolls out the image.

## Step D — Verify

```bash
curl -I https://www.shanvai.com
aws ecs describe-services \
  --profile credit-bureau-dev \
  --region ap-south-1 \
  --cluster shanvai-prod-web-cluster \
  --services shanvai-prod-web-www \
  --query 'services[0].{desired:desiredCount,running:runningCount,status:status}'
```

## Coexistence reminders

- VPC `10.50.0.0/16` — does **not** share Credit Bureau `10.40.0.0/16`.
- ECR `shanvai/www` — not under `credit-bureau/*`.
- Tags `Project=shanvai` + $50 monthly budget filter.
- Public site only for now (no leads API / Postgres).

## Local container smoke test

```bash
docker build -t shanvai/www:local -f Dockerfile .
docker compose -f docker-compose.web.yml up --build
# http://localhost:3080
```
