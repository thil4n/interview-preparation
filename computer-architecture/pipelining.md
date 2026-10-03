# Computer Architecture - Pipelining and Instruction Level Parallelism

## What is Pipelining?

Split instruction execution into stages so that multiple instructions are in progress at the same time, like an assembly line. It improves **throughput**, not the latency of a single instruction.

### Classic 5-Stage RISC Pipeline

| Stage | Name | Work |
|-------|------|------|
| IF | Instruction Fetch | Read instruction from memory at PC |
| ID | Instruction Decode | Decode, read registers |
| EX | Execute | ALU operation or address calculation |
| MEM | Memory Access | Load/store data |
| WB | Write Back | Write result to register file |

```
Cycle:    1    2    3    4    5    6    7    8
Instr 1:  IF   ID   EX   MEM  WB
Instr 2:       IF   ID   EX   MEM  WB
Instr 3:            IF   ID   EX   MEM  WB
Instr 4:                 IF   ID   EX   MEM  WB
```

### Pipeline Speedup

```
Non-pipelined time = n x k cycles
Pipelined time     = k + (n - 1) cycles

n = number of instructions, k = number of stages
Ideal speedup approaches k for large n
```

**Example:** 100 instructions, 5 stages
- Non-pipelined: 100 x 5 = 500 cycles
- Pipelined: 5 + 99 = 104 cycles
- Speedup ≈ 4.8x

In reality, speedup is lower because of hazards and stage imbalance (the clock is set by the slowest stage).

## Pipeline Hazards

### 1. Structural Hazards

Two instructions need the same hardware resource in the same cycle.
- **Example:** A single memory port used for both instruction fetch and data access
- **Fix:** Duplicate resources (separate instruction and data caches), or stall

### 2. Data Hazards

An instruction depends on the result of an earlier instruction still in the pipeline.

| Type | Meaning | Example |
|------|---------|---------|
| RAW (Read After Write) | True dependency | `ADD R1, R2, R3` then `SUB R4, R1, R5` |
| WAR (Write After Read) | Anti dependency | `SUB R4, R1, R5` then `ADD R1, R2, R3` |
| WAW (Write After Write) | Output dependency | Two instructions write R1 |

In a simple in-order 5-stage pipeline, only RAW causes problems. WAR and WAW matter in out-of-order execution.

**Fixes:**
- **Forwarding (bypassing):** Send the ALU result directly to the next instruction's EX stage without waiting for WB
- **Stalling (bubbles):** Insert no-ops until data is ready
- **Load-use hazard:** Even with forwarding, a load followed immediately by an instruction using the loaded value needs 1 stall cycle
- **Compiler scheduling:** Reorder independent instructions to fill the gap

```
LW   R1, 0(R2)
ADD  R3, R1, R4   <- needs R1, must stall 1 cycle even with forwarding
```

### 3. Control Hazards (Branch Hazards)

The pipeline doesn't know which instruction to fetch next until the branch is resolved.

**Fixes:**
- **Stall** until the branch resolves (simple, slow)
- **Branch prediction:** Guess and continue; flush the pipeline if wrong
- **Delayed branch:** Always execute the instruction after the branch (used in MIPS, rarely in modern ISAs)
- Resolve branches earlier in the pipeline

## Branch Prediction

### Static Prediction
- Always predict not taken, or always taken
- **Backward taken, forward not taken (BTFN):** loops branch backward and are usually taken

### Dynamic Prediction

**1-bit predictor:** Remember the last outcome. Mispredicts twice per loop (at exit and on re-entry).

**2-bit saturating counter:** Must mispredict twice before changing the prediction.

```
Strongly Taken (11) <-> Weakly Taken (10) <-> Weakly Not Taken (01) <-> Strongly Not Taken (00)
```

**Advanced:** Correlating/global history predictors, tournament predictors, TAGE. Modern CPUs reach very high accuracy on typical code.

**Branch Target Buffer (BTB):** Caches the target address of taken branches so fetch can continue without waiting for decode.

### Why it matters for programmers

```java
// Sorting the data first makes this loop much faster on large arrays:
// the branch becomes predictable (all false, then all true)
for (int x : data) {
    if (x >= 128) sum += x;
}
```

This is the well-known "why is processing a sorted array faster" question. The fix without sorting is branchless code (conditional moves or arithmetic tricks).

## Beyond Simple Pipelining

### Superscalar

Issue and execute **multiple instructions per cycle** using multiple execution units. IPC can exceed 1.

### Out-of-Order Execution (OoO)

Execute instructions as soon as their operands are ready, not in program order, then **commit in order** so the program sees correct results.

Key structures:
- **Register renaming:** Maps architectural registers to many physical registers, removing WAR and WAW hazards
- **Reservation stations / issue queue:** Instructions wait here for operands (Tomasulo's algorithm)
- **Reorder Buffer (ROB):** Keeps instructions in program order for in-order commit and precise exceptions

### Speculative Execution

Execute instructions past a predicted branch before knowing if the prediction is correct. Results are discarded if wrong.

**Security note:** Spectre and Meltdown (2018) showed that speculatively executed instructions can leave traces in the cache that leak data through timing side channels, even though their architectural results are discarded.

### VLIW (Very Long Instruction Word)

The **compiler** packs independent operations into one wide instruction. Simpler hardware, but performance depends heavily on the compiler. Example: Intel Itanium, many DSPs.

## Pipeline Depth Trade-off

| Deeper pipeline | Shallower pipeline |
|-----------------|--------------------|
| Higher clock frequency | Lower clock frequency |
| Larger branch misprediction penalty | Smaller penalty |
| More pipeline register overhead and power | Less overhead |

Intel's Pentium 4 (very deep pipeline) is a common example of the limits: high clock rates but large misprediction costs and heat.

## Interrupts and Exceptions

| Type | Source | Example |
|------|--------|---------|
| Interrupt | External, asynchronous | Keyboard, timer, network card |
| Exception / Trap | Internal, synchronous | Divide by zero, page fault, system call |

**Precise exceptions:** All instructions before the faulting one complete, none after it change state. The ROB makes this possible in OoO CPUs.

### Polling vs Interrupts vs DMA

| Method | How | Best for |
|--------|-----|----------|
| Polling | CPU repeatedly checks device status | Very fast devices, simple systems |
| Interrupt-driven | Device signals the CPU when ready | Infrequent events |
| DMA (Direct Memory Access) | DMA controller moves data between device and memory, interrupts CPU when done | Large transfers (disk, network) |
