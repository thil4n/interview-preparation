# Computer Architecture - Basics

## Architecture vs Organization

| Aspect | Architecture | Organization (Microarchitecture) |
|--------|--------------|----------------------------------|
| Definition | What the programmer sees | How the hardware implements it |
| Examples | Instruction set, registers, addressing modes, data types | Pipeline depth, cache size, branch predictor |
| Change impact | Breaks software compatibility | Transparent to software |
| Example | x86-64, ARMv8, RISC-V | Intel Core vs AMD Zen (both x86-64) |

## Von Neumann vs Harvard Architecture

| Aspect | Von Neumann | Harvard |
|--------|-------------|---------|
| Memory | Single memory for instructions and data | Separate memories for instructions and data |
| Buses | One shared bus | Separate buses |
| Bottleneck | Von Neumann bottleneck (can't fetch instruction and data at once) | Avoids that bottleneck |
| Used in | Most general purpose computers (at the main memory level) | Microcontrollers, DSPs |

**Modified Harvard:** Modern CPUs use a single main memory (Von Neumann) but have separate L1 instruction and data caches (Harvard style).

## Main Components of a CPU

```
+------------------------------------------+
|                   CPU                    |
|  +-------------+    +-----------------+  |
|  | Control Unit|    |      ALU        |  |
|  +-------------+    +-----------------+  |
|  +------------------------------------+  |
|  | Registers (PC, IR, MAR, MDR, GPRs) |  |
|  +------------------------------------+  |
+--------------------|---------------------+
                     | System Bus (address, data, control)
            +--------+--------+
            |                 |
         Memory             I/O
```

- **ALU (Arithmetic Logic Unit):** Performs arithmetic (add, sub) and logic (AND, OR, XOR, shifts)
- **Control Unit:** Decodes instructions and generates control signals
- **Registers:** Fastest storage, inside the CPU

### Important Registers

| Register | Purpose |
|----------|---------|
| PC (Program Counter) | Address of the next instruction |
| IR (Instruction Register) | Holds the instruction being executed |
| MAR (Memory Address Register) | Address to read/write in memory |
| MDR (Memory Data Register) | Data read from or written to memory |
| SP (Stack Pointer) | Top of the stack |
| Status / Flags | Zero, Carry, Overflow, Sign flags |

## Instruction Cycle (Fetch - Decode - Execute)

```
1. Fetch:    MAR <- PC; MDR <- Memory[MAR]; IR <- MDR; PC <- PC + 1
2. Decode:   Control unit interprets opcode and operands
3. Execute:  ALU operation, memory access, or branch
4. Write back: Store result in a register or memory
(Then check for interrupts and repeat)
```

## System Bus

| Bus | Direction | Carries |
|-----|-----------|---------|
| Address bus | CPU -> Memory/IO (unidirectional) | Memory address. Width decides addressable memory (32-bit = 4 GB) |
| Data bus | Bidirectional | Actual data. Width decides word size per transfer |
| Control bus | Both | Read/write, clock, interrupt, bus request signals |

## Instruction Set Architecture (ISA)

The ISA is the contract between hardware and software: instructions, registers, addressing modes, memory model.

### RISC vs CISC

| Aspect | RISC | CISC |
|--------|------|------|
| Instructions | Few, simple, fixed length | Many, complex, variable length |
| Cycles per instruction | Mostly 1 (pipelined) | Multiple |
| Memory access | Only load/store instructions | Many instructions can access memory |
| Registers | Many general purpose | Fewer |
| Decoding | Simple, hardwired | Complex, often microcoded |
| Code size | Larger | Smaller |
| Examples | ARM, RISC-V, MIPS | x86 |

**Note:** Modern x86 CPUs decode CISC instructions into RISC-like micro-operations (µops) internally, so the line is blurred.

### Addressing Modes

| Mode | Example | Meaning |
|------|---------|---------|
| Immediate | `ADD R1, #5` | Operand is the constant 5 |
| Register | `ADD R1, R2` | Operand is in register R2 |
| Direct | `LOAD R1, 1000` | Operand at memory address 1000 |
| Indirect | `LOAD R1, (R2)` | Address is stored in R2 |
| Indexed / Displacement | `LOAD R1, 8(R2)` | Address = R2 + 8 (arrays, struct fields) |
| PC-relative | `BEQ label` | Address = PC + offset (branches) |

## Performance

### CPU Time Equation

```
CPU Time = Instruction Count x CPI x Clock Cycle Time
         = (Instruction Count x CPI) / Clock Rate

CPI  = Cycles Per Instruction
IPC  = Instructions Per Cycle = 1 / CPI
```

- **Instruction count:** affected by ISA and compiler
- **CPI:** affected by microarchitecture (pipelining, caches)
- **Clock rate:** affected by hardware technology and pipeline depth

**Example:** 10^9 instructions, CPI = 2, clock = 2 GHz
CPU time = (10^9 x 2) / (2 x 10^9) = 1 second

### Amdahl's Law

Speedup is limited by the part that cannot be improved.

```
Speedup = 1 / ((1 - P) + P / S)

P = fraction that is improved (or parallelized)
S = speedup of that fraction
```

**Example:** 90% parallel code on 10 cores:
Speedup = 1 / (0.1 + 0.9/10) = 1 / 0.19 ≈ 5.3x (not 10x)

Maximum speedup with infinite cores = 1 / (1 - P) = 10x

## Data Representation

### Two's Complement

- Range for n bits: -2^(n-1) to 2^(n-1) - 1 (8-bit: -128 to 127)
- Negate: invert all bits and add 1
- Only one representation of zero, and addition works the same for signed and unsigned

```
 5 = 0000 0101
-5 = 1111 1010 + 1 = 1111 1011
```

### Overflow vs Carry

- **Carry:** unsigned result does not fit
- **Overflow:** signed result does not fit (adding two positives gives a negative, or two negatives gives a positive)

### Floating Point (IEEE 754)

| Format | Sign | Exponent | Mantissa | Precision |
|--------|------|----------|----------|-----------|
| Single (float) | 1 bit | 8 bits | 23 bits | ~7 decimal digits |
| Double | 1 bit | 11 bits | 52 bits | ~15-16 decimal digits |

```
Value = (-1)^sign x 1.mantissa x 2^(exponent - bias)
Bias: 127 (single), 1023 (double)
```

**Why `0.1 + 0.2 != 0.3`:** 0.1 has no exact binary representation, so rounding errors appear. Compare floats with a tolerance, and use decimal types (e.g. `BigDecimal`) for money.

### Endianness

Storing `0x12345678` at address 100:

| Address | Big Endian | Little Endian |
|---------|------------|---------------|
| 100 | 12 | 78 |
| 101 | 34 | 56 |
| 102 | 56 | 34 |
| 103 | 78 | 12 |

- **Little endian:** x86, most ARM configurations
- **Big endian:** Network byte order (TCP/IP), some older architectures
