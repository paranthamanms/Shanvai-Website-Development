variable "aws_region" {
  type    = string
  default = "ap-south-1"
}

variable "aws_profile" {
  type    = string
  default = "credit-bureau-dev"
}

variable "environment" {
  type    = string
  default = "prod"
}

variable "project_name" {
  type    = string
  default = "shanvai"
}

variable "domain_name" {
  type    = string
  default = "www.shanvai.com"
}

variable "apex_domain" {
  type    = string
  default = "shanvai.com"
}

variable "vpc_cidr" {
  type        = string
  default     = "10.50.0.0/16"
  description = "Must not overlap Credit Bureau 10.40.0.0/16"
}

variable "container_image" {
  type        = string
  default     = ""
  description = "ECR image URI (tag or digest). Leave empty for first apply (desired_count=0)."
}

variable "desired_count" {
  type    = number
  default = 1
}

variable "task_cpu" {
  type    = number
  default = 256
}

variable "task_memory" {
  type    = number
  default = 512
}

variable "monthly_budget_usd" {
  type    = number
  default = 50
}

variable "budget_email" {
  type        = string
  default     = ""
  description = "Optional email for AWS Budget alerts"
}

variable "github_org" {
  type    = string
  default = "paranthamanms"
}

variable "github_repo" {
  type    = string
  default = "Shanvai-Website-Development"
}

variable "github_branch" {
  type    = string
  default = "main"
}

# Required when the GitHub org customizes OIDC subjects with numeric IDs
# (repo:ORG@OWNER_ID/REPO@REPO_ID:...). From: gh api repos/ORG/REPO --jq '{owner_id:.owner.id,id}'
variable "github_owner_id" {
  type        = string
  description = "GitHub owner/user numeric ID for OIDC sub claims"
}

variable "github_repo_id" {
  type        = string
  description = "GitHub repository numeric ID for OIDC sub claims"
}
