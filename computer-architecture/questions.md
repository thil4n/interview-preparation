# Computer Architecture - Interview Questions

## Fundamentals

### 1. What happens when a CPU executes an instruction?
The fetch, decode, execute, write back cycle. The PC gives the address, the instruction is loaded into the IR, the control unit decodes it, the ALU or memory unit executes it, the result is written back, and the PC moves to the next instruction (or a branch target).

### 2. What is the difference between RISC and CISC?
RISC uses a small set of simple, fixed-length instructions, with only load/store accessing memory, which makes pipelining easy. CISC has many complex, variable-length instructions that can access memory directly. Modern x86 translates CISC instructions into RISC-like micro-ops internally.

### 3. What is the Von Neumann bottleneck?
Instructions and data share one memory and bus, so the CPU can't fetch both at the same time, and the CPU is much faster than memory. Caches, separate L1 instruction/data caches, and prefetching reduce the impact.

### 4. What is the difference between a 32-bit and 64-bit processor?
Register and address width. A 32-bit address can reach 4 GB directly. 64-bit allows a far larger address space (current CPUs implement 48 or 57 bits), larger registers, and usually more registers in the ISA (x86-64 has 16 general purpose registers vs 8 in x86).

### 5. How do you calculate CPU time?
`CPU Time = Instruction Count x CPI / Clock Rate`. A faster clock does not guarantee better performance if CPI or instruction count goes up.

## Memory

### 6. Why do we need cache memory?
DRAM is much slower than the CPU. A small, fast SRAM cache close to the CPU holds frequently used data. It works because of temporal and spatial locality.

### 7. Explain direct mapped, set associative, and fully associative caches.
Direct mapped: each block has one possible location, fast but suffers conflict misses. Fully associative: a block can go anywhere, no conflict misses but expensive. N-way set associative: a block can go in any of N lines of one set, a balance used by most real caches.

### 8. What are the 3 Cs of cache misses?
Compulsory (first access), capacity (cache too small), conflict (too many blocks map to the same set). Multicore adds coherence misses.

### 9. Write-through vs write-back?
Write-through updates memory on every write, simple and consistent but more traffic. Write-back only updates the cache and marks the line dirty, writing to memory on eviction, which reduces traffic.

### 10. What is virtual memory and why is it useful?
Each process gets its own virtual address space mapped to physical memory via page tables. It gives isolation, lets programs use more memory than physically available, and simplifies memory management and sharing.

### 11. What is a TLB?
A cache of recent virtual-to-physical page translations. Without it, every memory access would require extra memory accesses to walk the page table.

### 12. What is a page fault? What is thrashing?
A page fault occurs when the requested page isn't in physical memory, so the OS loads it from disk. Thrashing happens when the working set doesn't fit in memory and the system spends most of its time swapping pages.

### 13. Why is iterating a 2D array row by row faster than column by column?
In row-major languages (C, Java), rows are contiguous in memory. Row-wise traversal uses every byte of each cache line; column-wise traversal jumps across lines and causes many more cache misses.

## Pipelining

### 14. What is pipelining and does it reduce instruction latency?
It overlaps the stages of multiple instructions to increase throughput. It does not reduce a single instruction's latency; it may even slightly increase it due to pipeline register overhead.

### 15. What are pipeline hazards and how are they handled?
- Structural: resource conflict, fixed by duplicating hardware
- Data: dependency on an earlier result, fixed by forwarding, stalling, or reordering
- Control: unknown next instruction after a branch, fixed by branch prediction

### 16. What is forwarding?
Passing a result directly from a later pipeline stage (e.g. EX output) to an earlier stage of a following instruction, without waiting for write back.

### 17. Why is processing a sorted array faster than an unsorted one?
In a loop with a data-dependent `if`, sorted data makes the branch predictable, so the branch predictor is almost always right. Random data causes frequent mispredictions, each one flushing the pipeline.

### 18. What is out-of-order execution?
The CPU executes instructions when their operands are ready rather than in program order, then commits results in order using a reorder buffer. Register renaming removes false (WAR/WAW) dependencies.

### 19. What are Spectre and Meltdown at a high level?
Attacks that abuse speculative execution. Speculatively executed instructions are rolled back architecturally, but they can change cache state, and that change can be measured through timing to leak secret data.

## Multicore and Concurrency

### 20. What is cache coherence and how is it maintained?
Keeping copies of the same memory location in different caches consistent. Maintained with protocols like MESI using bus snooping or directories.

### 21. Explain the MESI protocol.
Modified (dirty, only copy), Exclusive (clean, only copy), Shared (clean, may be in other caches), Invalid. Writing a shared line invalidates other copies.

### 22. What is false sharing and how do you fix it?
Threads writing different variables on the same cache line cause the line to bounce between cores. Fix by padding, aligning data to cache line boundaries, or using per-thread data and combining results at the end.

### 23. What is the difference between coherence and consistency?
Coherence concerns ordering of writes to one location. Consistency (the memory model) concerns ordering of reads and writes across different locations. Memory barriers and language constructs like `volatile` or atomics enforce the required order.

### 24. How is a lock implemented in hardware?
Using atomic instructions such as compare-and-swap, test-and-set, or load-linked/store-conditional. A spinlock loops on CAS until it succeeds; OS locks add sleeping and waking on top.

### 25. What does Amdahl's Law tell us?
The serial part of a program limits speedup. With 95% parallel code, the maximum speedup is 1 / 0.05 = 20x no matter how many cores you add.

### 26. Hyper-Threading: does 2 logical cores mean 2x performance?
No. Both threads share one core's execution units and caches. It helps when one thread stalls (e.g. on memory), giving a modest gain that depends on the workload.

### 27. CPU vs GPU?
CPUs have a few powerful cores optimized for low latency and complex control flow. GPUs have thousands of simpler cores optimized for throughput on data-parallel work such as graphics and matrix math.

## I/O

### 28. Polling vs interrupts vs DMA?
Polling: the CPU keeps checking the device. Interrupts: the device notifies the CPU when ready. DMA: a controller transfers blocks of data between device and memory without the CPU, interrupting only when done.

### 29. Interrupt vs exception?
Interrupts are external and asynchronous (timer, I/O). Exceptions are internal and synchronous, caused by the running instruction (divide by zero, page fault, system call).

## Quick Calculations to Practice

### 30. AMAT
Hit time 1 cycle, miss rate 10%, miss penalty 50 cycles.
`AMAT = 1 + 0.1 x 50 = 6 cycles`

### 31. Cache address bits
32-bit address, 64 KB 4-way set associative cache, 32-byte blocks.
- Offset = log2(32) = 5 bits
- Lines = 64 KB / 32 B = 2048; Sets = 2048 / 4 = 512; Index = 9 bits
- Tag = 32 - 9 - 5 = 18 bits

### 32. Pipeline speedup
1000 instructions, 5-stage pipeline, no hazards.
- Non-pipelined: 5000 cycles
- Pipelined: 5 + 999 = 1004 cycles
- Speedup ≈ 4.98x
