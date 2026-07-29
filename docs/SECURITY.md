# Security controls for Shanvai www (OWASP + AWS + web standards)

This document maps the practical hardening applied to `www.shanvai.com` and the shared AWS account.

## Amazon Web Services

| Control | Implementation |
|--------|----------------|
| Encryption at rest (KMS) | CMK `alias/shanvai-prod-web` encrypts CloudWatch Logs; ECR uses AES-256 + Inspector/scan-on-push (CMK would require empty-repo recreate) |
| GuardDuty | Account detector (`infrastructure/terraform/account_security` in Credit Bureau repo) — shared with Credit Bureau |
| Inspector | Inspector v2 ECR+EC2 enabler (same account stack) |
| CloudTrail | Multi-region trail → S3 with SSE-KMS |
| Perimeter | CloudFront + WAFv2 (AWS Managed CRS, Known Bad Inputs, SQLi) + rate limit `/api/leads` |
| ALB lock-down | Security group allows only CloudFront managed prefix list (80/443) |
| Traffic encryption | Viewer TLS 1.2+ via ACM; optional HTTPS origin via `origin.shanvai.com` (`enable_https_origin`) |
| IAM least privilege | GitHub OIDC deploy role scoped to ECR/ECS/CF; ECS task SES limited to `ses:FromAddress` |

## OWASP Top 10 (aligned controls)

| Risk | Mitigation |
|------|------------|
| A01 Broken Access Control | Public marketing site; lead API is unauthenticated by design but rate-limited and validated |
| A02 Cryptographic Failures | HTTPS redirect, HSTS, KMS at rest, SES TLS |
| A03 Injection | Zod validation on `/api/leads`; WAF SQLi/common rules |
| A04 Insecure Design | Minimal attack surface (single Next container); no admin UI on www |
| A05 Security Misconfiguration | Security response headers policy + Next.js headers |
| A06 Vulnerable Components | ECR scan-on-push + Inspector |
| A07 Auth Failures | N/A for anonymous marketing; CB apps use JWT separately |
| A08 Integrity Failures | CloudTrail + image scanning |
| A09 Logging Failures | CloudWatch Logs (KMS) + CloudTrail |
| A10 SSRF | No user-controlled server-side fetch to arbitrary URLs in lead path |

## W3C / WHATWG / IETF

| Standard area | Practice |
|---------------|----------|
| IETF HTTPS/TLS | CloudFront `redirect-to-https`, TLS 1.2_2021 minimum |
| WHATWG Fetch / HTML forms | Same-origin `POST /api/leads`, labeled form controls |
| W3C CSP / security headers | CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors` |
| Accessibility (WAI) | Semantic landmarks and labeled inputs on contact/demo forms |

## Enabling HTTPS origin

1. Add ACM validation CNAMEs from `terraform output origin_acm_validation_records`.
2. CNAME `origin.shanvai.com` → ALB DNS (`terraform output origin_hostname_cname`).
3. Set `enable_https_origin = true` in tfvars and `terraform apply`.
