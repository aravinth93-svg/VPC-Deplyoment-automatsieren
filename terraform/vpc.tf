data "aws_availability_zones" "available" {
  state = "available"
}

locals {
  az_count      = 3
  azs           = slice(data.aws_availability_zones.available.names, 0, local.az_count)
  public_cidrs  = [for i in range(local.az_count) : cidrsubnet(var.vpc_cidr, 8, i)]
  private_cidrs = [for i in range(local.az_count) : cidrsubnet(var.vpc_cidr, 8, i + local.az_count)]
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = { Name = "${var.app_name}-vpc" }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "${var.app_name}-igw" }
}

resource "aws_subnet" "public" {
  count                   = local.az_count
  vpc_id                  = aws_vpc.main.id
  cidr_block              = local.public_cidrs[count.index]
  availability_zone       = local.azs[count.index]
  map_public_ip_on_launch = true

  tags = { Name = "${var.app_name}-public-${local.azs[count.index]}" }
}

resource "aws_subnet" "private" {
  count             = local.az_count
  vpc_id            = aws_vpc.main.id
  cidr_block        = local.private_cidrs[count.index]
  availability_zone = local.azs[count.index]

  tags = { Name = "${var.app_name}-private-${local.azs[count.index]}" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = { Name = "${var.app_name}-public-rtb" }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  tags = { Name = "${var.app_name}-private-rtb" }
}

resource "aws_route_table_association" "public" {
  count          = local.az_count
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count          = local.az_count
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private.id
}

output "vpc_id" {
  value       = aws_vpc.main.id
  description = "ID of the VPC"
}

output "public_subnet_ids" {
  value       = aws_subnet.public[*].id
  description = "IDs of the public subnets"
}

output "private_subnet_ids" {
  value       = aws_subnet.private[*].id
  description = "IDs of the private subnets"
}
