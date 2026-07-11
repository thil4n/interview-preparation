# Microservices Architecture

## What is Microservices?

An architectural approach where a large application is broken down into small, independent, loosely coupled services that communicate over the network.

### Monolithic vs Microservices

| Aspect | Monolithic | Microservices |
|--------|-----------|---------------|
| Architecture | Single codebase | Multiple codebases |
| Deployment | Deploy entire app | Deploy services independently |
| Scaling | Scale entire app | Scale individual services |
| Technology | Same tech stack | Mixed tech stacks |
| Complexity | Simpler initially | More complex |
| Team Structure | Single team | Multiple teams per service |
| Performance | Low latency | Network latency |
| Failure | One failure can crash app | Isolated failures |

## Microservices Principles

### 1. Single Responsibility Principle
Each microservice should have one reason to change, focused on a specific business capability.

```
Example: E-commerce platform
- User Service (user management)
- Product Service (catalog)
- Order Service (order management)
- Payment Service (payments)
- Notification Service (emails/SMS)
```

### 2. Autonomy
Services should:
- Independently deployable
- Have their own database (database per service)
- Owned by a single team
- Make decisions independently

### 3. Observable
- Centralized logging
- Distributed tracing
- Metrics collection
- Health checks

### 4. Resilient
- Handle failures gracefully
- Circuit breakers for dependencies
- Retry logic with exponential backoff
- Fallback mechanisms

## Communication Patterns

### Synchronous Communication (RPC)
Services make direct calls to each other, waiting for response.

```
Pros:
- Simple to understand
- Immediate response
- Easy to track flows

Cons:
- Tight coupling
- Slower performance
- Cascading failures
- Not suitable for high-latency

Example:
HTTP REST, gRPC
```

### Asynchronous Communication (Event-Driven)
Services communicate through events or message queues.

```
Pros:
- Loose coupling
- Better scalability
- Resilient to failures
- Good for high-latency

Cons:
- Complex debugging
- Eventual consistency
- Hard to track data flow

Example:
Message Queues (RabbitMQ, Kafka)
```

## API Gateway Pattern

```
Clients → API Gateway → Microservices
```

### Responsibilities
- **Routing**: Route requests to appropriate service
- **Authentication**: Centralized authentication
- **Rate Limiting**: Prevent abuse
- **Load Balancing**: Distribute load
- **Response Aggregation**: Combine responses from multiple services
- **Protocol Translation**: Convert between protocols

### Implementation Example

```java
@RestController
@RequestMapping("/api")
public class APIGateway {
    @Autowired
    private RestTemplate restTemplate;
    
    @GetMapping("/orders/{id}")
    public OrderResponse getOrder(@PathVariable String id) {
        // Call Order Service
        Order order = restTemplate.getForObject(
            "http://order-service/orders/" + id, 
            Order.class
        );
        
        // Call Product Service
        Product product = restTemplate.getForObject(
            "http://product-service/products/" + order.getProductId(), 
            Product.class
        );
        
        // Aggregate response
        return new OrderResponse(order, product);
    }
}
```

## Service Discovery

Problem: Services' locations change dynamically (containers, cloud)

### Client-Side Discovery
Client queries service registry to find service location.

```
Client → Service Registry → Get service location → Call service
```

### Server-Side Discovery
Load balancer queries service registry to route request.

```
Client → Load Balancer → Service Registry → Route to service
```

### Tools
- Consul
- Eureka
- etcd
- Kubernetes (built-in)

## Circuit Breaker Pattern

Prevents cascading failures when a service is unavailable.

```
States:
1. Closed: Requests pass through (normal)
2. Open: Requests fail immediately (service down)
3. Half-Open: Some requests allowed to test recovery

          Failure threshold exceeded
                      ↓
    Closed ─────────→ Open
      ↑               ↓ (timeout)
      │          Half-Open
      └─────────────→
         Success
```

### Implementation (Java)

```java
@Component
public class OrderServiceClient {
    @CircuitBreaker(name = "orderService", 
                   fallbackMethod = "fallback")
    public Order getOrder(String id) {
        return restTemplate.getForObject(
            "http://order-service/orders/" + id, 
            Order.class
        );
    }
    
    public Order fallback(String id, Exception e) {
        // Return cached data or default response
        return new Order();
    }
}
```

## Retry Logic

Retry failed requests with exponential backoff.

```java
@Retry(maxAttempts = 3, delay = 1000, 
       multiplier = 2.0)  // 1s, 2s, 4s
public OrderResponse callOrderService() {
    // Will retry with exponential backoff
}
```

## Data Consistency in Microservices

### Challenge
Database per service means no ACID transactions across services.

### Eventual Consistency
Accept that data will be consistent eventually, not immediately.

### Saga Pattern
Long-running transaction coordinated across services.

#### Orchestration-based Saga

```
Order Service → Payment Service → Inventory Service

OrderService orchestrates:
1. Call PaymentService to charge
2. If success, call InventoryService to reserve
3. If inventory fails, compensate payment
```

#### Choreography-based Saga

```
Order Created → Payment Service emits "Payment Processed" 
→ Inventory Service emits "Item Reserved"
→ Order Service emits "Order Confirmed"
```

## Monitoring and Logging

### Distributed Tracing

```
Request with trace-id
↓
Service A (log with trace-id)
↓ (call Service B with trace-id)
Service B (log with trace-id)
↓ (call Service C with trace-id)
Service C (log with trace-id)

Can reconstruct full request flow across services
```

Tools: Jaeger, Zipkin

### Centralized Logging

```
Services → Log Aggregation → ELK (Elasticsearch, Logstash, Kibana)
```

### Metrics

```
Services → Metrics Collection → Prometheus/Grafana

Metrics:
- Request rate
- Error rate
- Latency percentiles
- Resource usage
```

## Challenges of Microservices

1. **Complexity**: Distributed system problems, network latency
2. **Data Consistency**: Managing distributed transactions
3. **Testing**: Integration testing across services
4. **Deployment**: Coordinating deployment of multiple services
5. **Debugging**: Tracing issues across services
6. **Organizational**: Requires mature engineering culture
7. **Performance**: Network calls have overhead
8. **Monitoring**: Need comprehensive observability

## When to Use Microservices

**Good fit:**
- Large, complex applications
- Multiple teams
- Different scalability needs per component
- Need independent deployments
- Polyglot persistence or technology

**Bad fit:**
- Small applications
- Single team
- Need strict ACID transactions
- Performance-critical systems with tight latency requirements
- Early-stage products (use monolith, migrate later)

## Interview Questions

1. **What are the advantages and disadvantages of microservices?**
2. **How do you ensure data consistency across microservices?**
3. **Explain the Circuit Breaker pattern and when to use it**
4. **How would you design a payment processing system with microservices?**
5. **What is the difference between choreography and orchestration in saga pattern?**
6. **How do you handle service-to-service authentication?**
7. **Design a notification system using microservices**
8. **How would you implement distributed tracing?**
9. **What are the challenges of debugging in a microservices environment?**
10. **When should you use microservices vs monolithic architecture?**
