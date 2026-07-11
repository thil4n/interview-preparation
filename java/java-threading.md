# What are the different ways to create a thread in Java?

Extending Thread class

class MyThread extends Thread {
public void run() {
System.out.println("Thread running");
}
}
new MyThread().start();
Implementing Runnable interface

class MyRunnable implements Runnable {
public void run() {
System.out.println("Runnable running");
}
}
new Thread(new MyRunnable()).start();
Using ExecutorService (preferred)

ExecutorService executor = Executors.newFixedThreadPool(2);
executor.execute(() -> System.out.println("Thread pool task"));
executor.shutdown();

# What are the states in the thread lifecycle?

New

Runnable

Running

Blocked / Waiting / Timed Waiting

Terminated (Dead)

Use Thread.State enum to query a thread’s current state.

# What does the synchronized keyword do?

Ensures mutual exclusion—only one thread can access a critical section at a time.

synchronized (object) {
// critical section
}

# Difference between wait(), notify(), and notifyAll()?

wait() → causes the current thread to wait until another thread calls notify() or notifyAll()

notify() → wakes up one waiting thread

notifyAll() → wakes up all waiting threads

Must be called from within a synchronized block.

# What is a deadlock? How to prevent it?

Deadlock occurs when two or more threads wait on each other’s resources, creating a cycle.

Prevention:

Lock ordering

Try-lock pattern

Avoid nested locks when possible

# What is a race condition?

A race condition happens when two or more threads access shared data and try to change it at the same time, leading to unexpected results.

Fix: Use synchronization or atomic classes.

# What is starvation?

A thread is starved when it waits indefinitely for CPU or resource access, usually due to high-priority threads monopolizing access.

# What are thread-safe collection classes in Java?

Vector, Hashtable (legacy)

Collections.synchronizedList()

Concurrent Collections (preferred):

ConcurrentHashMap

CopyOnWriteArrayList

BlockingQueue

# What is volatile keyword?

volatile ensures changes to a variable are visible to all threads immediately. It prevents caching of the variable's value by any thread.

volatile boolean running = true;

# What is AtomicInteger and when to use it?

It allows lock-free thread-safe operations on integers. Commonly used for counters.

AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();

# What is ReentrantLock? How is it different from synchronized?

Explicit lock from java.util.concurrent.locks

More control than synchronized (e.g., tryLock, fairness policy)

Must be manually released

ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
// critical section
} finally {
lock.unlock();
}

# What is the Java Memory Model?

Defines how threads interact with memory. It specifies:

Visibility rules

Happens-before relationships

Instruction reordering

volatile, synchronized, and final interact with the JMM to ensure consistency.

# What is the difference between Runnable and Callable?

Feature Runnable Callable
Returns? No return value Returns a value (via Future)
Throws? Cannot throw checked excep. Can throw checked exceptions

# How do you use Callable with ExecutorService?

Callable<Integer> task = () -> 123;
Future<Integer> future = executor.submit(task);
Integer result = future.get(); // blocks until done

# What is CompletableFuture?

It’s an enhancement over Future that supports asynchronous, non-blocking programming.

CompletableFuture.supplyAsync(() -> {
return "Hello";
}).thenApply(str -> str + " World").thenAccept(System.out::println);
