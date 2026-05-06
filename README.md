# Quiz-App Deployment automatisieren

**Aufgabe 1** (VPC) + **Aufgabe 2** (ECR + Docker Push, 2026-05-06) aus [`tomschiffmann-teaching/03-draft-quiz-app`](https://github.com/tomschiffmann-teaching/03-draft-quiz-app):

1. Terraform-Files für AWS-VPC mit 3 Public + 3 Private Subnets, IGW, Route Tables (in [`terraform/`](terraform/))
2. **NEU 2026-05-06:** ECR-Repository per Terraform ([`terraform/ecr.tf`](terraform/ecr.tf)) mit Lifecycle Policy (keep last 5 images)
3. **NEU 2026-05-06:** Outputs ([`terraform/outputs.tf`](terraform/outputs.tf)) — `ecr_repository_name` und `ecr_repository_url` werden im CI/CD ausgelesen
4. **NEU 2026-05-06:** Next.js Quiz-App + [`Dockerfile`](Dockerfile) im Repo-Root
5. GitHub-Actions-Workflow [`deploy.yml`](.github/workflows/deploy.yml) – `terraform apply` + ECR-Login + Docker Build/Tag/Push auf Push/Merge auf `main`
6. GitHub-Actions-Workflow [`destroy.yml`](.github/workflows/destroy.yml) – manuell triggerbar (`workflow_dispatch`) für `terraform destroy`
7. Remote State in S3-Bucket `aravinth93-svg-tfstate` (oder neuem Bucket nach Sandbox-Reset)
8. AWS-Credentials in GitHub Repository Secrets

## Setup

### 1. AWS-Sandbox starten und Keys holen

In der Pluralsight Cloud-Sandbox (oder anderem AWS-Account):
- AWS-Konsole öffnen → IAM → User → Security credentials → Access Keys
- `AWS_ACCESS_KEY_ID` und `AWS_SECRET_ACCESS_KEY` notieren

### 2. S3-Bucket für Terraform State manuell anlegen

```bash
aws s3 mb s3://aravinth93-svg-tfstate --region us-east-1
aws s3api put-bucket-versioning \
  --bucket aravinth93-svg-tfstate \
  --versioning-configuration Status=Enabled
```

Oder via Web-Konsole: S3 → Create bucket → Name `aravinth93-svg-tfstate`, Region `us-east-1`, Versioning aktivieren.

### 3. GitHub Repository Secrets eintragen

Im GitHub-Repo: **Settings → Secrets and variables → Actions → New repository secret**

| Name | Wert |
|------|------|
| `AWS_ACCESS_KEY_ID` | aus Schritt 1 |
| `AWS_SECRET_ACCESS_KEY` | aus Schritt 1 |

### 4. Branch Protection für `main` aktivieren

**Settings → Rules → Rulesets → New branch ruleset**

- Name: „Block direct push to main"
- Enforcement Status: **Active**
- Target branches: **Default branch**
- Rules: **Require a pull request before merging** ✅

### 5. Workflow auslösen

```bash
git checkout -b feature/initial-vpc
git add .
git commit -m "feat: VPC mit 3 public + 3 private Subnets, IGW, Route Tables"
git push -u origin feature/initial-vpc
```

Auf GitHub:
1. Pull Request erstellen → `feature/initial-vpc` → `main`
2. Mergen
3. **Actions**-Tab → `Deploy Infrastructure`-Run beobachten

### 6. Verifizieren

In der AWS-Konsole prüfen:
- **VPC** → `quiz-app-vpc` mit CIDR `10.16.0.0/16` existiert
- **Subnets** → 6 Stück, je 3 in `us-east-1a/b/c` (3 public, 3 private)
- **Internet Gateway** → `quiz-app-igw` an VPC gehängt
- **Route Tables** → `quiz-app-public-rtb` mit Route zu `0.0.0.0/0` über IGW

### 7. Aufräumen (sehr wichtig wegen Sandbox-Threshold)

GitHub: **Actions → Destroy Infrastructure → Run workflow** → in das Confirm-Feld `DESTROY` eintippen → Run.

Der `destroy.yml` läuft nur, wenn das Eingabefeld **exakt** `DESTROY` enthält – Schutz vor versehentlichem Klick.

## Lokal testen (vor dem Push)

```bash
cd terraform/
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
export AWS_REGION=us-east-1

terraform init
terraform validate
terraform plan
# Bei Bedarf:
terraform apply
```

## Layout

```
vpc-deplyoment/
├── README.md                         # diese Datei
├── .gitignore                        # Terraform/IDE-Ignores
├── Dockerfile                        # Next.js multi-stage build
├── package.json / package-lock.json  # Node-Dependencies
├── next.config.ts / tsconfig.json    # Next.js / TS-Config
├── postcss.config.mjs                # PostCSS für Tailwind
├── eslint.config.mjs                 # ESLint
├── vitest.config.ts                  # Vitest
├── src/                              # App-Code (Next.js)
├── public/                           # Statische Assets
├── terraform/
│   ├── main.tf                       # Provider + S3-Backend
│   ├── variables.tf                  # vpc_cidr, app_name, region
│   ├── vpc.tf                        # VPC, Subnets, IGW, Route Tables
│   ├── ecr.tf                        # ECR-Repo + Lifecycle Policy
│   └── outputs.tf                    # ecr_repository_name + _url
└── .github/
    └── workflows/
        ├── deploy.yml                # apply + ECR-Login + Docker Build/Push
        └── destroy.yml               # manueller destroy (workflow_dispatch)
```

## Aufgabe 2 — ECR + Docker Push (2026-05-06)

### Voraussetzungen vor dem Push

1. **AWS Credentials in GitHub Secrets aktualisieren** (Sandbox vergibt neue Keys):
   - GitHub → Repo → Settings → Secrets and variables → Actions
   - `AWS_ACCESS_KEY_ID` → Update → neuen Wert einfügen
   - `AWS_SECRET_ACCESS_KEY` → Update → neuen Wert einfügen

2. **S3-Bucket prüfen / neu anlegen** (Sandbox löscht Buckets):
   - AWS Console → S3 → prüfen ob `aravinth93-svg-tfstate` existiert
   - Falls nicht: `aws s3 mb s3://aravinth93-svg-tfstate --region us-east-1`
   - Oder neuen Bucket anlegen und Namen in `terraform/main.tf` (Zeile `bucket = "..."`) eintragen

### Ablauf nach `git push`

GitHub Actions führt aus:
1. Test-Job (Echo)
2. Build-Job (Echo)
3. Deploy-Job:
   - `terraform init/plan/apply` → ECR-Repo `quiz-app` wird angelegt
   - `terraform output -raw ecr_repository_name` → "quiz-app"
   - `aws-actions/amazon-ecr-login@v2` → ECR-Login
   - `docker build` mit zwei Tags: `latest` + Git-SHA
   - `docker push` beide Tags ins ECR

### Verifikation

- AWS Console → ECR → Private registry → Repositories → `quiz-app`
  - Lifecycle policy "Keep last 5 images" sichtbar
  - Zwei Image-Tags: `latest` + Git-SHA
- AWS Console → S3 → dein Bucket → `terraform.tfstate` öffnen
  - JSON enthält unter `outputs`: `ecr_repository_name` und `ecr_repository_url`

## Quellen

- Aufgabe: [`03-draft-quiz-app/001-tasks/01-VPC-deplyoment-auromatisieren.md`](https://github.com/tomschiffmann-teaching/03-draft-quiz-app/blob/main/001-tasks/01-VPC-deplyoment-auromatisieren.md)
- Terraform-Vorlage: [`03-draft-quiz-app/terraform/`](https://github.com/tomschiffmann-teaching/03-draft-quiz-app/tree/main/terraform)
- CI/CD-Vorlage: [`terraform-01/.github/workflows/`](https://github.com/tomschiffmann-teaching/terraform-01/tree/main/.github/workflows) und [`terraform-01/Terraform_CI_CD.md`](https://github.com/tomschiffmann-teaching/terraform-01/blob/main/Terraform_CI_CD.md)
