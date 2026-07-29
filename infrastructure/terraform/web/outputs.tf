output "name_prefix" {
  value = local.name_prefix
}

output "aws_account_id" {
  value = data.aws_caller_identity.current.account_id
}

output "ecr_repository_url" {
  value = aws_ecr_repository.www.repository_url
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.this.name
}

output "ecs_service_name" {
  value = aws_ecs_service.www.name
}

output "alb_dns_name" {
  value = aws_lb.this.dns_name
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.www.domain_name
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.www.id
}

output "github_deploy_role_arn" {
  value = aws_iam_role.github_ecr_deploy.arn
}

output "acm_validation_records" {
  description = "Add these CNAME records in Squarespace DNS, then wait for ACM ISSUED."
  value = {
    for dvo in aws_acm_certificate.www.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }
}

output "squarespace_www_cname" {
  description = "After CloudFront is ready, set www CNAME in Squarespace to this value."
  value       = aws_cloudfront_distribution.www.domain_name
}

output "ses_domain_verification_txt" {
  description = "Add this TXT record in Squarespace DNS to verify shanvai.com for SES."
  value = {
    name  = "_amazonses.${var.apex_domain}"
    type  = "TXT"
    value = aws_ses_domain_identity.apex.verification_token
  }
}

output "ses_dkim_records" {
  description = "Add these CNAMEs in Squarespace DNS to verify shanvai.com for SES sending."
  value = [
    for token in aws_ses_domain_dkim.apex.dkim_tokens : {
      name  = "${token}._domainkey.${var.apex_domain}"
      type  = "CNAME"
      value = "${token}.dkim.amazonses.com"
    }
  ]
}

output "lead_notify_email" {
  value = var.lead_notify_email
}

output "ses_from_email" {
  value = var.ses_from_email
}

output "next_steps" {
  value = <<-EOT
    1. aws sso login --profile ${var.aws_profile}
    2. cd infrastructure/terraform/web && terraform init && terraform apply
    3. While ACM waits: add acm_validation_records CNAMEs in Squarespace DNS
    4. After apply: set www CNAME → ${aws_cloudfront_distribution.www.domain_name}
    5. Add GitHub secret AWS_ROLE_ARN = ${aws_iam_role.github_ecr_deploy.arn}
    6. Push to main (or run workflow) to build/push shanvai/www and start the ECS service
    7. Add ses_dkim_records CNAMEs in Squarespace; confirm admin@shanvai.com SES verification email
  EOT
}
