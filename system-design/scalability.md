# System Design - Scalability

## What is Scalability?

Scalability is the ability of a system to handle an increasing amount of work or traffic without degrading performance. It's a key aspect of system design that determines how well a system can grow to meet demand.

## Types of Scalability

### Horizontal Scalability (Scale Out)
- Adding more machines/servers to handle the load
- Distributing the workload across multiple servers
- Better for distributed systems
- Example: Adding more web servers behind a load balancer

**Advantages:**
- No physical limits (can add infinite servers)
- Better fault tolerance
- Cost-effective (use commodity hardware)

**Challenges:**
- Increased complexity in managing distributed systems
- Network latency and partitioning issues
- Data consistency challenges

### Vertical Scalability (Scale Up)
- Adding more resources (CPU, RAM, storage) to a single machine
- Making the server more powerful
- Example: Upgrading from 8GB to 64GB RAM

**Advantages:**
- Simpler to implement
- No distributed system complexity
- Easier to maintain data consistency

**Challenges:**
- Physical hardware limits exist
- Single point of failure
- Expensive (requires high-end servers)

## Load Balancing

### Purpose
Distributes incoming requests across multiple servers to ensure no single server becomes a bottleneck.

### Load Balancing Algorithms

1. **Round Robin**: Distributes requests evenly in a circular manner
2. **Least Connections**: Routes to the server with fewest active connections
3. **Weighted Round Robin**: Favors servers with more capacity
4. **IP Hash**: Routes based on client IP (ensures session persistence)
5. **Least Response Time**: Routes to server with fastest response time

### Load Balancer Types

- **Layer 4 (Transport)**: Operates at TCP/UDP level - faster, less intelligent
- **Layer 7 (Application)**: Operates at HTTP level - can make routing decisions based on request content

## Caching Strategies

### Cache Levels

1. **Client-side**: Browser cache, local storage
2. **CDN**: Distributed globally, serves static content
3. **Application cache**: In-memory (Redis, Memcached)
4. **Database cache**: Query caches

### Cache Invalidation Strategies

1. **TTL (Time To Live)**: Automatic expiration
2. **Event-based**: Invalidate when data changes
3. **Write-through**: Update cache when database is updated
4. **Write-behind**: Queue writes and update asynchronously

### Cache Eviction Policies

- **LRU (Least Recently Used)**: Remove least recently accessed item
- **LFU (Least Frequently Used)**: Remove least frequently accessed item
- **FIFO (First In First Out)**: Remove oldest item
- **Random**: Random removal

## Database Scaling

### Read Replicas
- Create read-only copies of the database
- Distribute read queries across replicas
- Improves read performance
- Challenges: Replication lag, eventual consistency

### Database Sharding
- Horizontal partitioning of data
- Each shard contains a subset of data
- Routes queries to appropriate shard
- Challenges: Complex joins, resharding when adding capacity

### Caching Database Queries
- Cache frequently accessed queries
- Use cache aside pattern
- Reduces database load

## Message Queues for Scalability

- Decouple components to handle load independently
- Buffer requests during traffic spikes
- Enable asynchronous processing
- Example: RabbitMQ, Kafka, AWS SQS

## Auto-scaling

- Automatically add/remove resources based on metrics
- Metrics: CPU usage, memory, request rate, response time
- Scaling policies: scale out when metric exceeds threshold, scale in when below threshold
- Cold start time is a consideration

## Common Scalability Patterns

### 1. Database per Service
- Each microservice has its own database
- Improves horizontal scalability
- Challenges: Distributed transactions, eventual consistency

### 2. API Gateway Pattern
- Single entry point for all requests
- Handles routing, authentication, rate limiting
- Easier to scale services independently

### 3. Event-Driven Architecture
- Services communicate via events
- Loose coupling allows independent scaling
- Example: Event streams in Kafka

### 4. CQRS (Command Query Responsibility Segregation)
- Separate read and write models
- Can scale read and write paths independently
- Increases complexity

## Interview Questions

1. **How would you design a URL shortener to handle billions of URLs?**
   - Discuss sharding strategy, caching, CDN for redirects

2. **Design a system to handle 1 million concurrent users.**
   - Load balancing, horizontal scaling, caching, database optimization

3. **How do you handle database scaling?**
   - Read replicas, sharding, caching strategies

4. **Explain the trade-offs between horizontal and vertical scaling.**
   - Advantages and disadvantages of each approach

5. **What happens when your cache goes down? How do you handle cache miss?**
   - Cache stampede problem, solutions like locks or queues

6. **How would you design a real-time notification system?**
   - Message queues, pub/sub patterns, WebSockets

7. **Design a recommendation system for an e-commerce platform.**
   - Data processing, caching recommendations, real-time updates

8. **How would you handle rate limiting in your API?**
   - Token bucket algorithm, sliding window, per-user limits
