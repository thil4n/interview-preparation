# What is Amazon EC2 and what are its features?

Amazon EC2 (Elastic Compute Cloud) is a web service that provides resizable compute capacity in the cloud. It allows you to launch and manage virtual servers known as instances. Key features include:

- Scalability (auto scaling groups)
- Different instance types for various workloads
- Security groups and key pairs
- Elastic IP addresses
- Pay-as-you-go pricing

# What is the difference between S3 and EBS?

S3 (Simple Storage Service) is an object storage service for storing and retrieving any amount of data, typically used for backups, static website hosting, and big data analytics.

EBS (Elastic Block Store) is block-level storage designed for use with EC2 instances. It behaves like a hard drive and is suitable for databases and applications that require persistent storage.

# What are Security Groups in AWS?

Security Groups act as virtual firewalls for EC2 instances to control inbound and outbound traffic. Rules can be defined based on:

- IP protocols (TCP, UDP, ICMP)

- Port ranges

- Source/Destination IPs

They are stateful, meaning if you allow an incoming request, the response is automatically allowed.

# What is IAM and why is it important?

IAM (Identity and Access Management) allows you to control access to AWS resources securely. It enables:

- Creating users, groups, and roles

- Assigning fine-grained permissions using policies

- Using multi-factor authentication

- Enforcing least privilege principles

# What are the different types of load balancers in AWS?

AWS offers three types of load balancers via the Elastic Load Balancing (ELB) service:

- Application Load Balancer (ALB): Operates at Layer 7 (HTTP/HTTPS), supports advanced routing.

- Network Load Balancer (NLB): Operates at Layer 4 (TCP), suitable for high performance and low latency.

- Gateway Load Balancer (GLB): For deploying, scaling, and running third-party virtual appliances.

# How does Auto Scaling work in AWS?

Auto Scaling automatically adjusts the number of EC2 instances in a group based on conditions you define (e.g., CPU usage, memory, custom metrics). It includes:

Launch configurations or launch templates

Scaling policies (target tracking, step scaling, scheduled)

Health checks to replace unhealthy instances

# What is an AWS Lambda function?

AWS Lambda is a serverless compute service that runs your code in response to events (e.g., HTTP requests, S3 uploads). It:

- Automatically manages compute resources

- Scales automatically

- Supports multiple languages like Python, Node.js, Java, etc.

- Is event-driven and cost-effective (pay per invocation)

# What is the difference between Public and Private subnets in a VPC?

Public Subnet: Has a route to the internet via an Internet Gateway (IGW). Resources here can be accessed from the internet.

Private Subnet: No direct route to the internet. Typically used for databases or internal services.

# What is Route 53 and what are its routing policies?

Route 53 is AWS’s scalable DNS and domain name registration service. It supports:

Routing policies: Simple, Weighted, Latency-based, Failover, Geo-location, Multi-value answer

Health checks

Domain name registration

DNS management for public and private hosted zones

# How do you secure data in transit and at rest in AWS?

- In transit: Use SSL/TLS encryption for data moving between services or users and AWS.

- At rest: Use services like KMS to encrypt data stored in S3, EBS, RDS, and DynamoDB.

# What is Amazon RDS and what databases does it support?

Amazon RDS (Relational Database Service) is a managed service that makes it easier to set up, operate, and scale relational databases in the cloud. It supports:

Amazon Aurora

MySQL

PostgreSQL

MariaDB

Oracle

Microsoft SQL Server

RDS automates tasks like backups, patching, monitoring, and replication.

# What is Amazon CloudFront?

CloudFront is AWS’s content delivery network (CDN) that delivers content with low latency and high transfer speed. It:

Uses edge locations globally

Supports static and dynamic content

Integrates with services like S3 and EC2

Provides HTTPS and custom SSL support

Works with AWS WAF and Shield for security

# What is AWS CloudFormation?

CloudFormation is an Infrastructure as Code (IaC) service that lets you define and provision AWS resources using JSON or YAML templates. It allows:

Version-controlled infrastructure

Automated deployments

Dependency management

Reusability of templates using nested stacks

# What is the difference between Elastic Beanstalk and CloudFormation?

Elastic Beanstalk: A Platform-as-a-Service (PaaS) for deploying applications quickly using pre-configured environments.

CloudFormation: A low-level service for defining AWS infrastructure precisely and flexibly via code.

Elastic Beanstalk is opinionated and simpler, while CloudFormation gives full control over infrastructure.

# What is the Shared Responsibility Model in AWS?

In AWS’s Shared Responsibility Model:

AWS is responsible for: Security of the cloud (hardware, software, networking, facilities).

Customers are responsible for: Security in the cloud (data, IAM policies, configurations, applications).

# What is Amazon EKS?

Amazon EKS (Elastic Kubernetes Service) is a managed Kubernetes service that allows you to run Kubernetes without having to install and operate your own control plane or nodes. Features:

Integration with VPC, IAM, CloudWatch

High availability across AZs

Secure and scalable Kubernetes clusters

# What are Lifecycle Hooks in Auto Scaling?

Lifecycle Hooks allow you to perform custom actions before an instance transitions from one state to another (e.g., before termination or after launching). You can:

Pause the transition

Trigger a Lambda function or send an SNS message

Perform cleanup or initialization tasks

# What is Amazon SNS and how is it used?

Amazon Simple Notification Service (SNS) is a fully managed pub/sub messaging service. It allows you to:

Send notifications to multiple subscribers (email, SMS, Lambda, SQS)

Build event-driven architectures

Integrate with monitoring, alerting, and workflows

# What is Amazon SQS?

Amazon Simple Queue Service (SQS) is a fully managed message queuing service. It helps decouple microservices or distributed systems. It supports:

Standard queues (best-effort ordering, at-least-once delivery)

FIFO queues (exactly-once processing and order)

Dead-letter queues

Visibility timeouts and message delays

# What is the use of AWS Config?

AWS Config is a service that enables you to assess, audit, and evaluate the configurations of AWS resources. It provides:

Resource configuration history

Snapshot view of current configuration

Rule-based compliance auditing

Integration with AWS Organizations for multi-account setup
