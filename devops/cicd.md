# What is CI/CD?

CI/CD stands for Continuous Integration and Continuous Delivery/Deployment.

CI is the practice of automatically integrating code changes from multiple contributors into a shared repository, often multiple times a day, and running automated tests to detect issues early.

CD refers to two related practices:

Continuous Delivery: Automatically preparing code changes for release to production.

Continuous Deployment: Automatically deploying every code change to production without manual intervention.

# What are the key benefits of CI/CD?

- Faster release cycles

- Early detection of bugs

- Improved code quality

- Reduced integration issues

- Consistent deployment process

- Better collaboration between development and operations

# What tools are commonly used for CI/CD?

- CI Tools: Jenkins, GitHub Actions, GitLab CI, CircleCI, Travis CI, Bamboo

- CD Tools: Spinnaker, Argo CD, Flux

- Supporting tools: Docker, Kubernetes, Terraform, Ansible, Helm

# What is the difference between Continuous Delivery and Continuous Deployment?

Continuous Delivery prepares code for production release but requires manual approval to deploy.

Continuous Deployment automatically deploys code to production without manual steps.

# What is a pipeline in CI/CD?

A pipeline is a set of automated steps that code goes through from commit to deployment. It typically includes stages like:

Code checkout

Build

Test

Package

Deploy

# How do you handle secrets and sensitive data in CI/CD pipelines?

Use secret management tools like HashiCorp Vault, AWS Secrets Manager, or GitHub/GitLab secrets.

Avoid hardcoding secrets in scripts or code.

Use environment variables securely provided by the CI/CD platform.

# What is the role of containers in CI/CD?

Containers (e.g., Docker) ensure that applications run in consistent environments across development, testing, and production. They help:

Speed up build and deployment

Simplify dependency management

Improve scalability and isolation

# How do you ensure quality and security in a CI/CD pipeline?

Add unit, integration, and end-to-end tests

Include linting and static code analysis

Use security scanners (e.g., Snyk, Trivy, SonarQube)

Conduct vulnerability checks for dependencies and containers

Apply approval workflows for production deployments

# What are some challenges you’ve faced in implementing CI/CD?

Long pipeline execution times

Flaky tests slowing down deployment

Environment mismatches between dev and prod

Managing secrets and credentials securely

Resistance to cultural change within teams

# How would you implement a rollback strategy in a CI/CD pipeline?

Maintain previous builds/artifacts for quick redeployment

Use blue-green deployments or canary releases

Automate rollback steps in case of failed health checks

Monitor production health post-deployment and trigger rollback on anomalies

# What is Infrastructure as Code (IaC) and how does it relate to CI/CD?

IaC is managing and provisioning infrastructure using code and automation tools like Terraform, CloudFormation, or Ansible.
In CI/CD, IaC ensures:

Consistent environments

Version-controlled infrastructure

Easy automation of infrastructure s
