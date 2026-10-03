# Computer Architecture - Multicore and Parallel Architectures

## Why Multicore?

Around the mid 2000s, single-core clock speeds stopped scaling because of power and heat (the end of **Dennard scaling**). Transistor counts kept growing (Moore's Law), so manufacturers put multiple cores on one chip instead.

## Flynn's Taxonomy

| Type | Instruction Streams | Data Streams | Example |
|------|---------------------|--------------|---------|
| SISD | Single | Single | Classic single-core CPU |
| SIMD | Single | Multiple | Vector units (SSE, AVX, NEON), GPUs (roughly) |
| MISD | Multiple | Single | Rare, fault-tolerant systems |
| MIMD | Multiple | Multiple | Multicore CPUs, clusters |

## Levels of Parallelism

| Level | Description | Exploited by |
|-------|-------------|--------------|
| Instruction Level (ILP) | Independent instructions run together | Pipelining, superscalar, OoO |
| Data Level (DLP) | Same operation on many data items | SIMD, GPUs |
| Thread Level (TLP) | Multiple threads run at the same time | Multicore, SMT |
| Request Level | Independent requests | Servers, clusters |

## Multithreading in Hardware

| Type | How | Notes |
|------|-----|-------|
| Coarse-grained | Switch thread on a long stall (e.g. cache miss) | Simple, poor for short stalls |
| Fine-grained | Switch thread every cycle | Hides short stalls, slows single thread |
| SMT (Simultaneous Multithreading) | Issue instructions from multiple threads in the same cycle | Intel Hyper-Threading. One core appears as 2 logical CPUs |

**SMT note:** 2 logical cores do not give 2x performance. They share execution units and caches, so the gain depends on the workload.

## Shared Memory Architectures

| Aspect | UMA / SMP | NUMA |
|--------|-----------|------|
| Memory access time | Same for all processors | Depends on which node owns the memory |
| Scalability | Limited | Better |
| Example | Small multicore systems | Multi-socket servers |

**NUMA tip:** Keep a thread's data in memory attached to the socket it runs on. Remote memory access is slower.

## Cache Coherence

**Problem:** Each core has its own cache. If core 1 writes to `x`, core 2 might still read a stale copy of `x` from its cache.

**Coherence guarantees:** All cores eventually see writes to the same location, and in the same order.

### Approaches

- **Snooping:** Every cache watches (snoops) a shared bus for writes. Simple but doesn't scale to many cores
- **Directory-based:** A directory tracks which caches hold each block. Scales better, used in large systems

### MESI Protocol

Each cache line is in one of four states:

| State | Meaning | Clean? | Other copies? |
|-------|---------|--------|---------------|
| **M**odified | Only this cache has it, and it's changed | No (dirty) | No |
| **E**xclusive | Only this cache has it, unchanged | Yes | No |
| **S**hared | Possibly in multiple caches, unchanged | Yes | Maybe |
| **I**nvalid | Not valid | - | - |

**Key transitions:**
- Read miss, no other copy -> **E**
- Read miss, other copies exist -> **S**
- Write to **S** -> broadcast invalidate, move to **M**
- Write to **E** -> move to **M** silently (no bus traffic, the advantage of E)
- Another core reads an **M** line -> write back data, both go to **S**

Variants: **MOESI** (AMD, adds Owned), **MESIF** (Intel, adds Forward).

### False Sharing

Two threads write to **different variables that sit on the same cache line**. The line keeps bouncing between cores, even though the threads don't share data logically.

```java
// Problem: counters for two threads likely on the same 64-byte line
class Counters {
    volatile long counterA;  // written by thread A
    volatile long counterB;  // written by thread B
}

// Fix: pad or separate the fields
// (Java has @jdk.internal.vm.annotation.Contended, used in JDK classes like LongAdder)
```

**Symptom:** Adding threads makes a program slower instead of faster.

## Coherence vs Consistency

| Concept | Question it answers |
|---------|---------------------|
| Coherence | Do all cores agree on the order of writes to **one** memory location? |
| Consistency (memory model) | In what order can writes to **different** locations become visible? |

### Memory Consistency Models

- **Sequential consistency:** Results match some interleaving of all threads in program order. Intuitive but limits optimizations
- **Total Store Order (TSO):** x86. Stores can be delayed in a store buffer, so a later load can be seen before an earlier store
- **Relaxed / weak ordering:** ARM, RISC-V. Hardware can reorder more freely; programmers use **memory barriers (fences)**

**Language connection:** Java `volatile`, `synchronized`, and `java.util.concurrent` classes, and C++ `std::atomic`, insert the right barriers so you don't have to write them by hand.

## Synchronization Hardware

Atomic instructions that locks and lock-free structures are built on:
- **Test-and-set**
- **Compare-and-swap (CAS):** x86 `CMPXCHG`. Used by Java `AtomicInteger`, `ConcurrentHashMap`
- **Load-linked / Store-conditional (LL/SC):** ARM, RISC-V
- **Fetch-and-add**

```
CAS(address, expected, new):
    atomically {
        if (*address == expected) { *address = new; return true; }
        return false;
    }
```

## CPU vs GPU

| Aspect | CPU | GPU |
|--------|-----|-----|
| Cores | Few, powerful | Thousands, simple |
| Optimized for | Latency (finish one task fast) | Throughput (many tasks in parallel) |
| Control logic | Large (branch prediction, OoO) | Small |
| Cache | Large | Smaller per core, high bandwidth memory |
| Best for | General code, branching logic | Graphics, matrix math, ML training |
| Execution model | MIMD | SIMT (Single Instruction, Multiple Threads) |

**Branch divergence:** On a GPU, threads in a warp execute in lockstep. If they take different branches, both paths run one after the other, reducing throughput.
