# SES identities for enterprise demo notifications from the www container.
resource "aws_ses_domain_identity" "apex" {
  domain = var.apex_domain
}

resource "aws_ses_domain_dkim" "apex" {
  domain = aws_ses_domain_identity.apex.domain
}

resource "aws_ses_email_identity" "lead_notify" {
  email = var.lead_notify_email
}

resource "aws_ses_email_identity" "ses_from" {
  email = var.ses_from_email
}

resource "aws_iam_role_policy" "ecs_task_ses" {
  name = "${local.name_prefix}-ecs-task-ses"
  role = aws_iam_role.ecs_task.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid      = "SendLeadNotifications"
      Effect   = "Allow"
      Action   = ["ses:SendEmail", "ses:SendRawEmail"]
      Resource = "*"
      Condition = {
        StringEquals = {
          "ses:FromAddress" = var.ses_from_email
        }
      }
    }]
  })
}
