# What is Kubernetes and why is it used?

Kubernetes (K8s) is an open-source container orchestration platform that automates:

Deployment

Scaling

Load balancing

Management of containerized applications

It abstracts infrastructure and simplifies application operations in distributed environments.

# What is a Pod in Kubernetes?

A Pod is the smallest deployable unit in Kubernetes. It can contain one or more containers that share:

Network namespace (IP, port space)

Storage volumes

Lifecycle

All containers in a pod are co-located and scheduled together.

# What is the difference between a Deployment and a StatefulSet?

Deployment: Manages stateless applications, supports scaling and rolling updates.

StatefulSet: Manages stateful applications that require:

Persistent storage

Stable network identity

Ordered deployment and scaling

# What is a Service in Kubernetes?

A Service exposes a set of Pods as a network service. Types include:

ClusterIP: Internal-only access (default)

NodePort: Exposes service on each node’s IP at a static port

LoadBalancer: Uses external load balancer (e.g., in cloud)

ExternalName: Maps service to a DNS name

# What is a ConfigMap and a Secret?

ConfigMap: Stores non-confidential configuration data in key-value pairs.

Secret: Stores sensitive data (like passwords, tokens) in base64-encoded format.
Both are injected into Pods as environment variables or mounted files.

# How does Kubernetes handle container scheduling?

The Kube-scheduler assigns Pods to Nodes based on:

Resource requirements (CPU, memory)

Node selectors / affinity rules

Taints and tolerations

Availability and other policies

# What are Namespaces in Kubernetes?

Namespaces provide logical isolation within a cluster. They help:

Separate resources (like dev, test, prod)

Apply resource quotas and RBAC

Avoid naming collisions

# What are liveness and readiness probes?

Liveness probe: Checks if the container is running. If it fails, the container is restarted.

Readiness probe: Checks if the container is ready to accept traffic. If it fails, the pod is removed from the service endpoint.

# What is the role of etcd in Kubernetes?

etcd is a key-value store used as the backing store for all cluster data. It stores:

Cluster state

Configuration data

Metadata about nodes, pods, secrets, etc.

It must be highly available and consistent.

# How do you perform rolling updates and rollbacks in Kubernetes?

With kubectl and Deployments:

kubectl rollout restart deployment <name> — triggers rolling update

kubectl rollout undo deployment <name> — rolls back to the previous revision
Kubernetes ensures zero-downtime deployments by managing replicas and readiness.

# What is a DaemonSet?

A DaemonSet ensures that a copy of a Pod runs on every node in the cluster (or a subset). Useful for:

Log collection (e.g., Fluentd)

Node monitoring (e.g., Prometheus Node Exporter)

Storage daemons

# What is a Helm chart?

Helm is a package manager for Kubernetes. A Helm chart is a pre-configured Kubernetes resource template that simplifies deployment and versioning of applications.

# How do you secure a Kubernetes cluster?

Use RBAC (Role-Based Access Control)

Enable Pod Security Policies or Pod Security Admission

Use network policies to limit traffic

Secure etcd with TLS

Restrict access to Kubernetes API

Use image scanning and signed containers

# What is a Kubernetes Operator?

An Operator is a method of packaging, deploying, and managing a Kubernetes application using custom controllers and CRDs (Custom Resource Definitions). Operators automate complex application lifecycle tasks like backups, upgrades, and scaling.
