# Shanvai Technologies — website hosting (www.shanvai.com)
# Same AWS account as Credit Bureau, isolated project prefix.
#
# Intended shape:
#   Route53 www.shanvai.com → CloudFront (ACM) → ALB → ECS Fargate (1 task)
#
# Apply from this directory after filling terraform.tfvars.
# Do NOT reuse credit-bureau-dev VPC/cluster/ALB without an explicit decision.

terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Prefer a dedicated state key (example):
  # backend "s3" {
  #   bucket = "<account>-tfstate"
  #   key    = "shanvai/web/terraform.tfstate"
  #   region = "ap-south-1"
  # }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  default_tags {
    tags = {
      Project     = "shanvai"
      Environment = var.environment
      Component   = "website"
      ManagedBy   = "Terraform"
      Repository  = "Shanvai-Website-Development"
    }
  }
}

# CloudFront custom certs must be in us-east-1
provider "aws" {
  alias   = "us_east_1"
  region  = "us-east-1"
  profile = var.aws_profile
}

variable "aws_region" {
  type    = string
  default = "ap-south-1"
}

variable "aws_profile" {
  type    = string
  default = "credit-bureau-dev"
  description = "SSO profile for the shared Credit Bureau AWS account"
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

variable "container_image" {
  type        = string
  description = "ECR image URI with digest or tag, e.g. <account>.dkr.ecr.ap-south-1.amazonaws.com/shanvai/www@sha256:..."
  default     = ""
}

variable "desired_count" {
  type    = number
  default = 1
}

locals {
  name_prefix = "${var.project_name}-${var.environment}-web"
}

output "guidance" {
  value = <<-EOT
    Scaffold only — wire networking/ECS/ALB/CloudFront modules next.

    Coexistence rules (same AWS account as Credit Bureau):
    1. Use name_prefix=${local.name_prefix} and tags Project=shanvai (never credit-bureau-*).
    2. Prefer a dedicated VPC/CIDR (do not share 10.40.0.0/16 credit-bureau-dev VPC).
    3. Own ECS cluster + ALB + CloudFront for ${var.domain_name}.
    4. ECR repository: shanvai/www (not credit-bureau/*).
    5. ACM certificate for CloudFront in us-east-1; Route53 alias A/AAAA for ${var.domain_name}.
    6. One Fargate task (desired_count=${var.desired_count}) serving the Next.js container on :3000.

    AWS profile default: ${var.aws_profile} / region ${var.aws_region}
  EOT
}

output "name_prefix" {
  value = local.name_prefix
}

output "domain_name" {
  value = var.domain_name
}
