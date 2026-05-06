import { Topic } from "@/types/quiz";

export const topics: Topic[] = [
  {
    id: "git",
    name: "Git",
    description: "Version control fundamentals — commits, branches, merging, and collaboration.",
    icon: "Git",
    questions: [
      {
        id: "git-1",
        question: "What does 'git init' do?",
        options: [
          "Clones a remote repository",
          "Initializes a new Git repository in the current directory",
          "Installs Git on your machine",
          "Creates a new branch",
        ],
        correctIndex: 1,
      },
      {
        id: "git-2",
        question: "What is the staging area (index) in Git?",
        options: [
          "A remote server where code is stored",
          "An intermediate area where changes are prepared before committing",
          "The production environment",
          "A log of all past commits",
        ],
        correctIndex: 1,
      },
      {
        id: "git-3",
        question: "Which command creates a new branch and switches to it?",
        options: [
          "git branch new-branch",
          "git checkout -b new-branch",
          "git merge new-branch",
          "git push new-branch",
        ],
        correctIndex: 1,
      },
      {
        id: "git-4",
        question: "What happens during a merge conflict?",
        options: [
          "Git automatically picks the newer change",
          "The repository is deleted",
          "Git cannot automatically combine changes and requires manual resolution",
          "The branch is automatically deleted",
        ],
        correctIndex: 2,
      },
      {
        id: "git-5",
        question: "What does 'git pull' do?",
        options: [
          "Pushes local commits to the remote",
          "Fetches changes from the remote and merges them into the current branch",
          "Deletes a remote branch",
          "Creates a pull request",
        ],
        correctIndex: 1,
      },
      {
        id: "git-6",
        question: "What is the purpose of a .gitignore file?",
        options: [
          "To list contributors to the project",
          "To specify files and directories that Git should not track",
          "To configure Git settings",
          "To store environment variables",
        ],
        correctIndex: 1,
      },
      {
        id: "git-7",
        question: "What does 'git diff' show?",
        options: [
          "The commit history",
          "The difference between the working directory and the staging area",
          "A list of all branches",
          "The remote repository URL",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    description: "CI/CD pipelines — workflows, jobs, steps, runners, and automation.",
    icon: "GA",
    questions: [
      {
        id: "ga-1",
        question: "Where are GitHub Actions workflow files stored?",
        options: [
          ".github/actions/",
          ".github/workflows/",
          ".workflows/",
          "github/ci/",
        ],
        correctIndex: 1,
      },
      {
        id: "ga-2",
        question: "What is a 'runner' in GitHub Actions?",
        options: [
          "A person who reviews pull requests",
          "A server that executes the jobs in a workflow",
          "A type of Git branch",
          "A Docker container registry",
        ],
        correctIndex: 1,
      },
      {
        id: "ga-3",
        question: "What triggers a workflow to run?",
        options: [
          "Only manual clicks in the GitHub UI",
          "Events like push, pull_request, schedule, or manual dispatch",
          "Only commits to the main branch",
          "Only when a Dockerfile changes",
        ],
        correctIndex: 1,
      },
      {
        id: "ga-4",
        question: "What is the relationship between jobs and steps?",
        options: [
          "Jobs contain steps; steps are the individual commands or actions",
          "Steps contain jobs; jobs are individual commands",
          "They are the same thing",
          "Jobs run inside steps",
        ],
        correctIndex: 0,
      },
      {
        id: "ga-5",
        question: "How do you store sensitive values like API keys in GitHub Actions?",
        options: [
          "Hardcode them in the workflow YAML file",
          "Store them in a .env file in the repository",
          "Use GitHub Secrets and reference them with ${{ secrets.NAME }}",
          "Pass them as commit messages",
        ],
        correctIndex: 2,
      },
      {
        id: "ga-6",
        question: "What does 'needs: test' mean in a job definition?",
        options: [
          "The job is named 'test'",
          "The job will only run after the 'test' job completes successfully",
          "The job needs to be tested manually",
          "The job runs in parallel with 'test'",
        ],
        correctIndex: 1,
      },
      {
        id: "ga-7",
        question: "What does 'uses: actions/checkout@v4' do in a step?",
        options: [
          "Deploys the application",
          "Checks out the repository code so the workflow can access it",
          "Creates a new branch",
          "Runs the test suite",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "terraform",
    name: "Terraform",
    description: "Infrastructure as Code — providers, resources, state, and the plan/apply cycle.",
    icon: "TF",
    questions: [
      {
        id: "tf-1",
        question: "What is Terraform primarily used for?",
        options: [
          "Writing application code",
          "Defining and provisioning infrastructure as code",
          "Monitoring application performance",
          "Managing Git repositories",
        ],
        correctIndex: 1,
      },
      {
        id: "tf-2",
        question: "What does 'terraform plan' do?",
        options: [
          "Applies changes to infrastructure immediately",
          "Shows a preview of what changes Terraform will make",
          "Destroys all infrastructure",
          "Initializes the Terraform working directory",
        ],
        correctIndex: 1,
      },
      {
        id: "tf-3",
        question: "What is the Terraform state file used for?",
        options: [
          "Storing application logs",
          "Keeping track of the resources Terraform manages and their current state",
          "Defining input variables",
          "Configuring the CI/CD pipeline",
        ],
        correctIndex: 1,
      },
      {
        id: "tf-4",
        question: "What does 'terraform init' do?",
        options: [
          "Creates a new Terraform project from scratch",
          "Initializes the working directory, downloads providers and modules",
          "Destroys all resources",
          "Pushes state to a remote backend",
        ],
        correctIndex: 1,
      },
      {
        id: "tf-5",
        question: "What is a Terraform provider?",
        options: [
          "A CI/CD tool",
          "A plugin that lets Terraform interact with a specific cloud or service (e.g. AWS, Azure)",
          "A type of variable",
          "A monitoring dashboard",
        ],
        correctIndex: 1,
      },
      {
        id: "tf-6",
        question: "Why should Terraform state be stored remotely (e.g. in S3)?",
        options: [
          "It makes Terraform run faster",
          "It enables team collaboration and prevents state conflicts",
          "It is required by AWS",
          "It automatically backs up your application code",
        ],
        correctIndex: 1,
      },
      {
        id: "tf-7",
        question: "What does 'terraform destroy' do?",
        options: [
          "Deletes the Terraform configuration files",
          "Removes all resources managed by the current Terraform configuration",
          "Resets the state file to empty",
          "Uninstalls Terraform",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "docker",
    name: "Docker",
    description: "Containerization — images, containers, Dockerfiles, and registries.",
    icon: "Do",
    questions: [
      {
        id: "docker-1",
        question: "What is the difference between a Docker image and a container?",
        options: [
          "They are the same thing",
          "An image is a read-only template; a container is a running instance of an image",
          "A container is a template; an image is a running instance",
          "Images run on the cloud; containers run locally",
        ],
        correctIndex: 1,
      },
      {
        id: "docker-2",
        question: "What does the 'FROM' instruction in a Dockerfile do?",
        options: [
          "Copies files from the host",
          "Sets the base image for the build",
          "Exposes a network port",
          "Defines an environment variable",
        ],
        correctIndex: 1,
      },
      {
        id: "docker-3",
        question: "What is a multi-stage Docker build?",
        options: [
          "Building multiple Docker images at once",
          "A build that uses multiple FROM statements to create smaller final images",
          "Running multiple containers simultaneously",
          "A build that deploys to multiple environments",
        ],
        correctIndex: 1,
      },
      {
        id: "docker-4",
        question: "What does 'docker run -p 3000:3000 myapp' do?",
        options: [
          "Builds the image 'myapp'",
          "Runs a container from the 'myapp' image and maps port 3000 on the host to port 3000 in the container",
          "Pushes the image to a registry",
          "Exposes port 3000 in the Dockerfile",
        ],
        correctIndex: 1,
      },
      {
        id: "docker-5",
        question: "What is a Docker registry?",
        options: [
          "A tool for writing Dockerfiles",
          "A storage and distribution system for Docker images (e.g. Docker Hub, ECR)",
          "A container orchestration platform",
          "A logging service for containers",
        ],
        correctIndex: 1,
      },
      {
        id: "docker-6",
        question: "What does the COPY instruction do in a Dockerfile?",
        options: [
          "Downloads files from the internet",
          "Copies files or directories from the build context into the image",
          "Creates a symbolic link",
          "Moves files between containers",
        ],
        correctIndex: 1,
      },
      {
        id: "docker-7",
        question: "Why is it important to use a .dockerignore file?",
        options: [
          "It is required for Docker to work",
          "It excludes unnecessary files from the build context, making builds faster and images smaller",
          "It configures container networking",
          "It defines environment variables",
        ],
        correctIndex: 1,
      },
    ],
  },
];

export function getTopicById(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}

export function getAllTopicIds(): string[] {
  return topics.map((t) => t.id);
}
