# System Design - API Design

## Designing Effective APIs

### Core Principles

1. **Clarity**: API should be intuitive and self-documenting
2. **Consistency**: Naming conventions and patterns should be consistent
3. **Backward Compatibility**: Changes shouldn't break existing clients
4. **Flexibility**: Support various use cases and query patterns
5. **Performance**: Minimize latency and bandwidth
6. **Security**: Protect data and prevent unauthorized access

## RESTful API Design Best Practices

### Resource Naming

```
Good:
GET /api/v1/users/123
GET /api/v1/users/123/posts
GET /api/v1/users/123/posts/456

Bad:
GET /api/getUser?id=123
GET /api/getUserPosts?userId=123
```

### Versioning Strategies

1. **URL Path**: `/api/v1/users`, `/api/v2/users`
2. **Query Parameter**: `/api/users?version=1`
3. **Header**: Custom header like `X-API-Version: 1`
4. **Content Negotiation**: Via Accept header

### Pagination

```
/api/users?page=2&limit=20
/api/users?offset=40&limit=20
/api/users?cursor=next_page_token

Response:
{
  "data": [...],
  "pagination": {
    "page": 2,
    "total": 500,
    "limit": 20
  }
}
```

### Filtering and Sorting

```
GET /api/posts?status=published&category=tech
GET /api/posts?sort=-created_at,title
GET /api/posts?filter[status]=published&filter[author]=john

Use matrix parameters for complex filters:
GET /api/posts;status=published;category=tech
```

### Field Selection (Sparse Fieldsets)

```
GET /api/users/123?fields=name,email,phone

Reduces payload size, improves performance
```

### Error Responses

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "User not found",
    "details": {
      "user_id": "123 is not a valid user ID"
    },
    "request_id": "abc-123-def"
  }
}
```

### Standard HTTP Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| 200  | OK | Successful GET, PUT, PATCH |
| 201  | Created | Successful POST |
| 204  | No Content | Successful DELETE |
| 400  | Bad Request | Invalid parameters |
| 401  | Unauthorized | Authentication required |
| 403  | Forbidden | Authenticated but not authorized |
| 404  | Not Found | Resource doesn't exist |
| 409  | Conflict | Duplicate resource, version mismatch |
| 429  | Too Many Requests | Rate limit exceeded |
| 500  | Internal Server Error | Server error |
| 503  | Service Unavailable | Temporary server issue |

## API Authentication & Authorization

### Authentication Methods

1. **API Keys**: Simple but less secure, good for internal/non-critical APIs
2. **OAuth 2.0**: Industry standard, best for user-facing applications
3. **JWT (JSON Web Tokens)**: Stateless, scalable, good for microservices
4. **mTLS**: Mutual TLS, best for service-to-service communication

### Authorization Patterns

1. **Role-Based Access Control (RBAC)**: Users have roles with permissions
2. **Attribute-Based Access Control (ABAC)**: Fine-grained permissions based on attributes
3. **OAuth Scopes**: Define what an API key can do

## Rate Limiting

### Algorithms

**Token Bucket**:
- Tokens are added at a fixed rate
- Request consumes a token
- If no tokens, request is rejected
- Allows burst traffic

**Sliding Window**:
- Count requests in a time window
- If count exceeds limit, reject
- Simpler but less burst-friendly

**Leaky Bucket**:
- Fixed rate of request processing
- Excess requests are queued/rejected
- Smooth traffic

### Response Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1372700873
```

## Caching in APIs

### HTTP Caching Headers

```
Cache-Control: public, max-age=3600
Cache-Control: private, max-age=300
Cache-Control: no-cache (validate with server)
Cache-Control: no-store (never cache)

ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"

Last-Modified: Wed, 21 Oct 2024 07:28:00 GMT
If-Modified-Since: Wed, 21 Oct 2024 07:28:00 GMT
```

## API Documentation

### Essential Elements

1. **Base URL**: `https://api.example.com/v1`
2. **Authentication**: How to authenticate
3. **Endpoints**: All available endpoints with methods
4. **Parameters**: Required and optional parameters
5. **Responses**: Example responses and schemas
6. **Error Codes**: Possible error responses
7. **Rate Limits**: Request limits
8. **Changelog**: Version history and breaking changes

### Documentation Tools

- OpenAPI/Swagger
- Postman
- GraphQL Schema (for GraphQL APIs)
- API Blueprint

## Webhooks for Real-time Events

```
Setup:
POST /api/webhooks
{
  "url": "https://client.example.com/callback",
  "events": ["user.created", "user.updated"]
}

Delivery:
POST https://client.example.com/callback
{
  "event": "user.created",
  "data": { "id": 123, "name": "John" },
  "timestamp": "2024-01-20T10:00:00Z"
}

Security:
- Sign webhooks with HMAC
- Include timestamp to prevent replay attacks
- Implement exponential backoff for retries
```

## GraphQL as an Alternative

### Advantages over REST

- Single endpoint, no over/under-fetching
- Strongly typed schema
- Real-time subscriptions
- Better for mobile clients (reduced payload)

### Disadvantages

- Steeper learning curve
- Caching is more complex
- More complex queries can be expensive

## Deprecating API Versions

1. **Announce**: Communicate deprecation plans early
2. **Support Window**: Maintain old version for 6-12 months
3. **Migration Guide**: Provide clear upgrade instructions
4. **Tools**: Offer tools to help migrate
5. **Monitoring**: Track usage of old versions

## Interview Questions

1. **How would you design an API for a real-time chat application?**
   - WebSockets vs HTTP, message ordering, scalability

2. **Design a payment processing API**
   - Idempotency, webhooks, error handling, security

3. **How would you handle API versioning for a large-scale API?**
   - Trade-offs of different versioning strategies

4. **Design an API that handles file uploads efficiently**
   - Chunked uploads, progress tracking, security

5. **How do you prevent abuse in your API?**
   - Rate limiting, authentication, input validation

6. **Design a search API that's scalable and performant**
   - Pagination, filtering, indexing, caching

7. **How would you implement a webhook system?**
   - Delivery guarantees, retries, security
