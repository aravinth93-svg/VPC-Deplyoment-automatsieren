output "ecr_repository_name" {
  description = "Name of the ECR repository for the application"
  value       = aws_ecr_repository.app_ecr_repo.name
}

output "ecr_repository_url" {
  description = "Full URL of the ECR repository (registry/repo)"
  value       = aws_ecr_repository.app_ecr_repo.repository_url
}
output "app_url" {
  description = "Public URL of the quiz app"
  value       = "http://${aws_lb.app.dns_name}"
}
