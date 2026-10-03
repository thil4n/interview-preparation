# Computer Architecture - Memory Hierarchy

## The Hierarchy

```
        Faster, smaller, more expensive per byte
                      ^
   Registers          |   < 1 ns       bytes to KB
   L1 Cache           |   ~1 ns        32-64 KB per core
   L2 Cache           |   ~3-5 ns      256 KB - few MB per core
   L3 Cache           |   ~10-20 ns    MBs, shared
   Main Memory (DRAM) |   ~50-100 ns   GBs
   SSD                |   ~10-100 µs   hundreds of GB - TB
   HDD                |   ~5-10 ms     TBs
                      v
        Slower, larger, cheaper per byte
```

Latencies are rough orders of magnitude and vary by hardware. The key interview point is the ratio: DRAM is roughly 100x slower than L1, and disk is far slower than DRAM.

## Principle of Locality

The reason caches work.

- **Temporal locality:** Recently accessed data is likely to be accessed again soon (loop counters, hot variables)
- **Spatial locality:** Data near recently accessed data is likely to be accessed soon (arrays, sequential code)

```java
// Good spatial locality: row-major traversal (Java/C store rows contiguously)
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        sum += matrix[i][j];

// Poor spatial locality: column-major traversal, jumps between rows
for (int j = 0; j < n; j++)
    for (int i = 0; i < n; i++)
        sum += matrix[i][j];
```

Both loops do the same work, but the first one is usually much faster on large matrices because each cache line fetched is fully used.

## SRAM vs DRAM

| Aspect | SRAM | DRAM |
|--------|------|------|
| Storage | Flip-flops (about 6 transistors) | Capacitor + 1 transistor |
| Speed | Fast | Slower |
| Refresh | Not needed | Needs periodic refresh |
| Density / Cost | Low density, expensive | High density, cheap |
| Used for | Caches | Main memory |

## Cache Basics

- **Cache line (block):** Unit of transfer between cache and memory, typically 64 bytes
- **Hit:** Data found in cache
- **Miss:** Data must be fetched from the next level
- **Hit rate:** hits / total accesses

### Average Memory Access Time (AMAT)

```
AMAT = Hit Time + Miss Rate x Miss Penalty
```

**Example:** Hit time = 1 ns, miss rate = 5%, miss penalty = 100 ns
AMAT = 1 + 0.05 x 100 = 6 ns

### Address Breakdown

```
| Tag | Index | Offset |

Offset bits = log2(block size)
Index bits  = log2(number of sets)
Tag bits    = address bits - index bits - offset bits
```

**Example:** 32-bit address, 32 KB direct mapped cache, 64-byte blocks
- Offset = log2(64) = 6 bits
- Number of lines = 32 KB / 64 B = 512, Index = 9 bits
- Tag = 32 - 9 - 6 = 17 bits

## Cache Mapping Techniques

| Mapping | Where a block can go | Pros | Cons |
|---------|---------------------|------|------|
| Direct mapped | Exactly one line | Simple, fast lookup | Conflict misses |
| Fully associative | Any line | No conflict misses | Expensive, must compare all tags |
| N-way set associative | Any line within one set of N lines | Good balance | More complex than direct mapped |

Most real L1/L2 caches are set associative (for example 8-way).

## Types of Cache Misses (The 3 Cs)

| Miss Type | Cause | Reduce by |
|-----------|-------|-----------|
| Compulsory (cold) | First access to a block | Larger blocks, prefetching |
| Capacity | Cache too small for the working set | Larger cache |
| Conflict | Too many blocks map to the same set | Higher associativity |

A fourth type in multicore systems is the **coherence miss**, caused by another core invalidating the line.

## Replacement Policies

- **LRU (Least Recently Used):** Evict the block unused for the longest time. Good but costly to track exactly
- **Pseudo-LRU:** Approximation used in real hardware
- **FIFO:** Evict the oldest block
- **Random:** Simple, surprisingly effective at high associativity

## Write Policies

### On a write hit

| Policy | Behaviour | Pros | Cons |
|--------|-----------|------|------|
| Write-through | Write to cache and memory | Memory always up to date | More memory traffic (use a write buffer) |
| Write-back | Write to cache only, mark dirty; write to memory on eviction | Less traffic | More complex, memory may be stale |

### On a write miss

| Policy | Behaviour | Usually paired with |
|--------|-----------|---------------------|
| Write-allocate | Load the block into cache, then write | Write-back |
| No-write-allocate | Write directly to memory | Write-through |

## Virtual Memory

Each process gets its own large, contiguous virtual address space. The OS and hardware map virtual pages to physical frames.

**Benefits:**
- Isolation and protection between processes
- Programs can use more memory than physically available (swapping)
- Simplifies loading and sharing (shared libraries)

### Paging

```
Virtual Address:  | Virtual Page Number (VPN) | Page Offset |
                              |
                        Page Table
                              v
Physical Address: | Physical Frame Number (PFN) | Page Offset |
```

- Common page size: 4 KB (offset = 12 bits)
- **Page table entry** holds: frame number, valid bit, dirty bit, access/reference bit, protection bits
- Modern 64-bit systems use **multi-level page tables** to save memory

### TLB (Translation Lookaside Buffer)

- Small, fast cache of recent virtual-to-physical translations
- Without a TLB, every memory access would need extra memory accesses to walk the page table
- **TLB miss:** walk the page table (in hardware or via the OS) and fill the TLB
- On a context switch, the TLB must be flushed or entries tagged with an address space ID (ASID/PCID)

### Page Fault

Occurs when the page is not in physical memory:
1. CPU traps to the OS
2. OS finds the page on disk (or allocates a new one)
3. If no free frame, evicts a page (writes it back if dirty)
4. Loads the page, updates the page table
5. Restarts the faulting instruction

**Thrashing:** The system spends more time swapping pages than executing, because the working set does not fit in memory.

### Paging vs Segmentation

| Aspect | Paging | Segmentation |
|--------|--------|--------------|
| Unit size | Fixed (pages) | Variable (segments) |
| Fragmentation | Internal | External |
| Visible to programmer | No | Yes (code, data, stack segments) |

## Memory Access Order: Putting It Together

```
CPU issues virtual address
  -> TLB lookup (miss: page table walk; page not present: page fault)
  -> Physical address
  -> L1 -> L2 -> L3 -> DRAM
```

In practice, L1 caches are often virtually indexed, physically tagged (VIPT), so the TLB lookup and L1 lookup happen in parallel.
