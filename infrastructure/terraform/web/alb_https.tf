# Regional ACM + HTTPS ALB listener for encrypted CloudFront → origin traffic.
# Enable with enable_https_origin=true after adding Squarespace CNAME:
#   origin.shanvai.com → <alb_dns_name>

resource "aws_acm_certificate" "origin" {
  domain_name       = var.origin_hostname
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = { Name = var.origin_hostname }
}

resource "aws_acm_certificate_validation" "origin" {
  count = var.enable_https_origin ? 1 : 0

  certificate_arn = aws_acm_certificate.origin.arn
  validation_record_fqdns = [
    for dvo in aws_acm_certificate.origin.domain_validation_options : dvo.resource_record_name
  ]

  timeouts {
    create = "60m"
  }
}

resource "aws_lb_listener" "https" {
  count = var.enable_https_origin ? 1 : 0

  load_balancer_arn = aws_lb.this.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = aws_acm_certificate_validation.origin[0].certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.www.arn
  }
}
