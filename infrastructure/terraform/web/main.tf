terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Uncomment after first local apply if you want remote state in the shared account bucket:
  # backend "s3" {
  #   bucket  = "<fill-from-cb-bootstrap>"
  #   key     = "shanvai/prod/web/terraform.tfstate"
  #   region  = "ap-south-1"
  #   profile = "credit-bureau-dev"
  # }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  default_tags {
    tags = local.common_tags
  }
}

provider "aws" {
  alias   = "us_east_1"
  region  = "us-east-1"
  profile = var.aws_profile

  default_tags {
    tags = local.common_tags
  }
}

data "aws_caller_identity" "current" {}
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_ec2_managed_prefix_list" "cloudfront" {
  name = "com.amazonaws.global.cloudfront.origin-facing"
}

# Reuse the account GitHub OIDC provider created by Credit Bureau (one per account).
data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

locals {
  name_prefix = "${var.project_name}-${var.environment}-web"
  # Distinct from Credit Bureau 10.40.0.0/16
  vpc_cidr    = var.vpc_cidr
  azs         = slice(data.aws_availability_zones.available.names, 0, 2)

  common_tags = {
    Project     = "shanvai"
    Environment = var.environment
    Component   = "website"
    ManagedBy   = "Terraform"
    Repository  = "Shanvai-Website-Development"
    CostCenter  = "shanvai-web"
  }

  # Use digest/tag from variable; empty means service stays at desired_count=0 until first image push.
  has_image = var.container_image != ""
}
