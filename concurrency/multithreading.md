# Concurrency - Multithreading and Parallelism

## Processes vs Threads

| Aspect | Process | Thread |
|--------|---------|--------|
| Memory | Separate address space | Shared memory within process |
| Creation | Slower | Faster |
| Communication | Inter-process communication | Shared memory (careful!) |
| Overhead | High | Low |
| Isolation | Isolated from each other | Less isolated |
| Context Switch | Expensive | Less expensive |

## Java Threading

### Creating Threads

```java
// Method 1: Extend Thread class
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread is running");
    }
}

MyThread thread = new MyThread();
thread.start();  // NOT thread.run()

// Method 2: Implement Runnable interface
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Thread is running");
    }
}

Thread thread = new Thread(new MyRunnable());
thread.start();

// Or with Lambda (Java 8+)
new Thread(() -> System.out.println("Thread is running")).start();
```

### Thread Lifecycle

```
New → Runnable → Running → Blocked/Waiting → Terminated

States:
1. New: Thread object created, not started
2. Runnable: Thread ready to run, waiting for scheduler
3. Running: Thread is executing
4. Blocked/Waiting: Thread waiting for resource/time
5. Terminated: Thread execution complete
```

## Synchronization

### Synchronized Blocks and Methods

```java
class Counter {
    private int count = 0;
    
    // Synchronized method
    synchronized void increment() {
        count++;
    }
    
    // Alternative: synchronized block
    void incrementBlock() {
        synchronized(this) {
            count++;
        }
    }
    
    synchronized int getCount() {
        return count;
    }
}

// Multiple threads can't execute synchronized methods simultaneously
```

### Problems Without Synchronization

```
Race Condition:
Thread 1: Read count (5)
Thread 2: Read count (5)
Thread 1: Increment to 6, Write
Thread 2: Increment to 6, Write
Result: count = 6 (should be 7)
```

## Locks

### ReentrantLock

```java
import java.util.concurrent.locks.ReentrantLock;

class BankAccount {
    private double balance = 1000;
    private final ReentrantLock lock = new ReentrantLock();
    
    void withdraw(double amount) {
        lock.lock();
        try {
            if (balance >= amount) {
                balance -= amount;
            }
        } finally {
            lock.unlock();  // Always unlock
        }
    }
}
```

### ReadWriteLock

```java
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

class Cache {
    private Map<String, String> data = new HashMap<>();
    private final ReadWriteLock lock = new ReentrantReadWriteLock();
    
    String get(String key) {
        lock.readLock().lock();
        try {
            return data.get(key);  // Multiple reads allowed
        } finally {
            lock.readLock().unlock();
        }
    }
    
    void put(String key, String value) {
        lock.writeLock().lock();
        try {
            data.put(key, value);  // Exclusive write
        } finally {
            lock.writeLock().unlock();
        }
    }
}
```

## Deadlock

### Definition
Situation where two or more threads are blocked forever, waiting for each other to release resources.

### Example

```java
class Account {
    private double balance;
    
    synchronized void transfer(Account other, double amount) {
        // Thread 1: Locks this, then waits for other
        // Thread 2: Locks other, then waits for this (this)
        // Result: Deadlock!
        synchronized(other) {
            this.balance -= amount;
            other.balance += amount;
        }
    }
}

// Solution: Always acquire locks in the same order
```

### Deadlock Conditions (All Must Be True)

1. **Mutual Exclusion**: Resource can only be held by one thread
2. **Hold and Wait**: Thread holds resource while waiting for others
3. **No Preemption**: Resource can't be forcibly taken
4. **Circular Wait**: Circular chain of threads waiting for resources

### Preventing Deadlock

1. **Lock Ordering**: Always acquire locks in same order
2. **Timeout**: Use lock with timeout
3. **Try-Lock**: Use tryLock() instead of lock()
4. **Resource Allocation**: Allocate all resources upfront

```java
// Deadlock prevention with lock ordering
void transfer(Account other, double amount) {
    Account first = this.id < other.id ? this : other;
    Account second = this.id < other.id ? other : this;
    
    synchronized(first) {
        synchronized(second) {
            // Safe transfer
        }
    }
}

// Or with timeout
boolean transfer(Account other, double amount) {
    Lock lock1 = this.getLock();
    Lock lock2 = other.getLock();
    
    try {
        if (lock1.tryLock(1, TimeUnit.SECONDS)) {
            try {
                if (lock2.tryLock(1, TimeUnit.SECONDS)) {
                    try {
                        // Perform transfer
                        return true;
                    } finally {
                        lock2.unlock();
                    }
                }
            } finally {
                lock1.unlock();
            }
        }
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
    return false;
}
```

## Livelock

Similar to deadlock, but threads actively try to resolve it, wasting CPU cycles.

```java
// Livelock example
class Person {
    private Direction direction;
    
    void walk(Person other) {
        while (weAreFacingEachOther(other)) {
            if (shouldIGoLeft()) {
                // Thread 1: tries to go left
                // Thread 2: also tries to go left
                // Both change direction, still facing
                direction = Direction.LEFT;
            }
        }
    }
}
```

## Thread Communication

### Wait/Notify

```java
class MessageQueue {
    private String message = null;
    
    synchronized void put(String msg) throws InterruptedException {
        while (message != null) {
            wait();  // Wait until message is consumed
        }
        message = msg;
        notifyAll();  // Wake up waiting threads
    }
    
    synchronized String take() throws InterruptedException {
        while (message == null) {
            wait();  // Wait for message
        }
        String msg = message;
        message = null;
        notifyAll();  // Wake up waiting threads
        return msg;
    }
}
```

## Executor Framework

```java
ExecutorService executor = Executors.newFixedThreadPool(3);

// Submit tasks
for (int i = 0; i < 10; i++) {
    executor.submit(() -> {
        System.out.println("Task executed by: " + 
                         Thread.currentThread().getName());
    });
}

executor.shutdown();  // No new tasks accepted
// executor.shutdownNow();  // Cancel current tasks

// Wait for completion
executor.awaitTermination(1, TimeUnit.MINUTES);
```

### Types of Executor Services

```java
// Single thread
ExecutorService single = Executors.newSingleThreadExecutor();

// Fixed thread pool
ExecutorService fixed = Executors.newFixedThreadPool(4);

// Cached thread pool
ExecutorService cached = Executors.newCachedThreadPool();

// Scheduled executor
ScheduledExecutorService scheduled = 
    Executors.newScheduledThreadPool(2);

// Schedule tasks
scheduled.schedule(() -> System.out.println("After 5 seconds"), 
                   5, TimeUnit.SECONDS);
scheduled.scheduleAtFixedRate(() -> System.out.println("Periodic"), 
                              1, 2, TimeUnit.SECONDS);
```

## Thread-Safe Collections

```java
// Synchronized versions
Map<String, String> syncMap = Collections.synchronizedMap(
    new HashMap<>()
);

// Concurrent collections
ConcurrentHashMap<String, String> concurrentMap = 
    new ConcurrentHashMap<>();

CopyOnWriteArrayList<String> cowList = 
    new CopyOnWriteArrayList<>();

BlockingQueue<String> queue = new LinkedBlockingQueue<>();
```

## Common Interview Questions

1. **What's the difference between synchronized and Lock?**
   - Lock provides more control, can be used with try-with-resources
   - Synchronized is simpler but less flexible

2. **Explain race condition and how to prevent it**
   - Multiple threads access shared resource simultaneously
   - Prevent with synchronization, locks, or atomic operations

3. **What is a deadlock and how to prevent it?**
   - See deadlock section above

4. **Explain wait(), notify(), and notifyAll()**
   - wait(): Thread waits until notified
   - notify(): Wakes one waiting thread
   - notifyAll(): Wakes all waiting threads

5. **What is the difference between sleep() and wait()?**
   - sleep(): Pauses thread for specified time, doesn't release lock
   - wait(): Releases lock and waits to be notified

6. **How does ConcurrentHashMap work?**
   - Uses segmented locks for better concurrency
   - Multiple threads can write to different segments simultaneously

7. **What is thread pooling?**
   - Reusing threads from a pool instead of creating new ones
   - Improves performance and resource management
