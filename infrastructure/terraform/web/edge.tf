# ACM (us-east-1) + CloudFront → ALB (ap-south-1)
#
# During first apply Terraform waits up to 60 minutes for ACM DNS validation.
# Add the CNAME records from `terraform output acm_validation_records` in Squarespace
# as soon as the certificate resource is created (or run apply twice — see DEPLOY-WWW.md).

resource "aws_acm_certificate" "www" {
  provider          = aws.us_east_1
  domain_name       = var.domain_name
  validation_method = "DNS"

  subject_alternative_names = [var.apex_domain]

  lifecycle {
    create_before_destroy = true
  }

  tags = { Name = var.domain_name }
}

resource "aws_acm_certificate_validation" "www" {
  provider        = aws.us_east_1
  certificate_arn = aws_acm_certificate.www.arn
  validation_record_fqdns = [
    for dvo in aws_acm_certificate.www.domain_validation_options : dvo.resource_record_name
  ]

  timeouts {
    create = "60m"
  }
}

data "aws_cloudfront_cache_policy" "caching_disabled" {
  name = "Managed-CachingDisabled"
}

data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_origin_request_policy" "all_viewer" {
  name = "Managed-AllViewer"
}

resource "aws_cloudfront_distribution" "www" {
  enabled         = true
  is_ipv6_enabled = true
  comment         = "${local.name_prefix} ${var.domain_name}"
  aliases         = [var.domain_name]
  price_class     = "PriceClass_200"

  origin {
    domain_name = aws_lb.this.dns_name
    origin_id   = "alb"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  # Next.js HTML/SSR + API routes (POST /api/leads) — do not cache at edge
  default_cache_behavior {
    allowed_methods          = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods           = ["GET", "HEAD"]
    target_origin_id         = "alb"
    viewer_protocol_policy   = "redirect-to-https"
    compress                 = true
    cache_policy_id          = data.aws_cloudfront_cache_policy.caching_disabled.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.all_viewer.id
  }

  # Static assets — cache aggressively
  ordered_cache_behavior {
    path_pattern             = "/_next/static/*"
    allowed_methods          = ["GET", "HEAD", "OPTIONS"]
    cached_methods           = ["GET", "HEAD"]
    target_origin_id         = "alb"
    viewer_protocol_policy   = "redirect-to-https"
    compress                 = true
    cache_policy_id          = data.aws_cloudfront_cache_policy.caching_optimized.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.all_viewer.id
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.www.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = { Name = "${local.name_prefix}-cf" }
}
