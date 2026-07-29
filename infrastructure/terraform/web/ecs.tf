resource "aws_ecr_repository" "www" {
  name                 = "shanvai/www"
  image_tag_mutability = "MUTABLE"
  force_delete         = false

  image_scanning_configuration {
    scan_on_push = true
  }

  # Encryption at rest: AWS-managed AES-256 (changing to CMK requires empty-repo recreate).
  # Continuous scanning: Inspector v2 (account_security) + scan_on_push.

  tags = { Name = "shanvai/www" }
}

resource "aws_ecr_lifecycle_policy" "www" {
  repository = aws_ecr_repository.www.name
  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 10 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 10
      }
      action = { type = "expire" }
    }]
  })
}

resource "aws_cloudwatch_log_group" "www" {
  name              = "/ecs/${local.name_prefix}"
  retention_in_days = 14
  kms_key_id        = aws_kms_key.www.arn
}

resource "aws_iam_role" "ecs_execution" {
  name = "${local.name_prefix}-ecs-exec"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy" "ecs_execution_kms" {
  name = "${local.name_prefix}-ecs-exec-kms"
  role = aws_iam_role.ecs_execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid      = "LogsKms"
      Effect   = "Allow"
      Action   = ["kms:Encrypt", "kms:Decrypt", "kms:GenerateDataKey", "kms:DescribeKey"]
      Resource = [aws_kms_key.www.arn]
    }]
  })
}

resource "aws_iam_role" "ecs_task" {
  name = "${local.name_prefix}-ecs-task"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_ecs_cluster" "this" {
  name = "${local.name_prefix}-cluster"

  setting {
    name  = "containerInsights"
    value = "disabled"
  }

  tags = {
    Name    = "${local.name_prefix}-cluster"
    Project = "shanvai"
  }
}

resource "aws_ecs_cluster_capacity_providers" "this" {
  cluster_name       = aws_ecs_cluster.this.name
  capacity_providers = ["FARGATE", "FARGATE_SPOT"]

  default_capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    weight            = 1
    base              = 0
  }
}

resource "aws_lb" "this" {
  name               = substr("${local.name_prefix}-alb", 0, 32)
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id

  tags = { Name = "${local.name_prefix}-alb" }
}

resource "aws_lb_target_group" "www" {
  name        = substr("${local.name_prefix}-tg", 0, 32)
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.this.id
  target_type = "ip"

  health_check {
    enabled             = true
    path                = "/"
    matcher             = "200-399"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.this.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.www.arn
  }
}

resource "aws_ecs_task_definition" "www" {
  family                   = "${local.name_prefix}-www"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.task_cpu
  memory                   = var.task_memory
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = "www"
      image     = local.has_image ? var.container_image : "${aws_ecr_repository.www.repository_url}:pending"
      essential = true
      portMappings = [{
        containerPort = 3000
        hostPort      = 3000
        protocol      = "tcp"
      }]
      environment = [
        { name = "NODE_ENV", value = "production" },
        { name = "PORT", value = "3000" },
        { name = "HOSTNAME", value = "0.0.0.0" },
        { name = "NEXT_PUBLIC_SITE_URL", value = "https://${var.domain_name}" },
        { name = "LEAD_NOTIFY_EMAIL", value = var.lead_notify_email },
        { name = "SES_FROM_EMAIL", value = var.ses_from_email },
        { name = "EMAIL_PROVIDER", value = "ses" },
        { name = "AWS_REGION", value = var.aws_region }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.www.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "www"
        }
      }
      healthCheck = {
        command     = ["CMD-SHELL", "wget -qO- http://127.0.0.1:3000/ > /dev/null || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 40
      }
    }
  ])
}

resource "aws_ecs_service" "www" {
  name            = "${local.name_prefix}-www"
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.www.arn
  desired_count   = local.has_image ? var.desired_count : 0
  launch_type     = null

  capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    weight            = 1
  }

  network_configuration {
    subnets          = aws_subnet.public[*].id
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.www.arn
    container_name   = "www"
    container_port   = 3000
  }

  # Keep at least one task during rollouts when desired_count >= 1 (avoids ALB 503 gaps).
  deployment_minimum_healthy_percent = local.has_image ? 50 : 0
  deployment_maximum_percent         = 200
  health_check_grace_period_seconds  = 60

  depends_on = [aws_lb_listener.http]

  tags = {
    Name    = "${local.name_prefix}-www"
    Project = "shanvai"
  }

  lifecycle {
    ignore_changes = [task_definition, desired_count]
  }
}
