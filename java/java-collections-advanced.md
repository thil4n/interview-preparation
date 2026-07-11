# Java Collections - Comprehensive Guide

## Main Interfaces

### Collection Hierarchy

```
Collection
├── List (ordered, allows duplicates)
│   ├── ArrayList
│   ├── LinkedList
│   └── Vector (legacy)
├── Set (unordered, no duplicates)
│   ├── HashSet
│   ├── LinkedHashSet
│   └── TreeSet
└── Queue (FIFO)
    ├── LinkedList
    └── PriorityQueue

Map (key-value pairs, keys are unique)
├── HashMap
├── LinkedHashMap
├── TreeMap
├── ConcurrentHashMap
└── WeakHashMap
```

## List Implementations

### ArrayList

```java
List<String> list = new ArrayList<>();
list.add("apple");
list.add(0, "banana");      // Insert at index
list.remove(0);             // Remove by index
list.remove("apple");       // Remove by value
list.get(0);               // O(1) access
list.size();

// Time Complexity
// Get: O(1)
// Add (end): O(1) amortized
// Add (middle): O(n) - requires shifting
// Remove: O(n)
```

### LinkedList

```java
LinkedList<String> list = new LinkedList<>();
list.addFirst("apple");     // O(1)
list.addLast("banana");     // O(1)
list.add(1, "cherry");      // O(n) - must traverse
list.removeFirst();         // O(1)
list.removeLast();          // O(1)
list.getFirst();            // O(1)
list.get(1);                // O(n)

// Time Complexity
// Get: O(n) - must traverse from head
// Add (ends): O(1)
// Add (middle): O(n)
// Remove (ends): O(1)
// Remove (middle): O(n)
```

### ArrayList vs LinkedList

| Operation | ArrayList | LinkedList |
|-----------|-----------|-----------|
| Access by index | O(1) | O(n) |
| Insert at end | O(1) | O(1) |
| Insert at beginning | O(n) | O(1) |
| Insert in middle | O(n) | O(n)* |
| Remove from end | O(1) | O(1) |
| Remove from beginning | O(n) | O(1) |
| Remove from middle | O(n) | O(n)* |
| Memory usage | Less | More (pointers) |

## Set Implementations

### HashSet

```java
Set<String> set = new HashSet<>();
set.add("apple");
set.add("apple");           // Duplicate, not added
set.contains("apple");      // O(1)
set.remove("apple");        // O(1)

// Iterating
for (String item : set) { }  // Order not guaranteed

// Time Complexity: O(1) average, O(n) worst case

// Initialize with values
Set<String> set = new HashSet<>(Arrays.asList("a", "b", "c"));
```

### LinkedHashSet

```java
// Like HashSet but maintains insertion order
Set<String> set = new LinkedHashSet<>();
set.add("c");
set.add("a");
set.add("b");
// Iteration: c, a, b (insertion order)

// Time Complexity: Same as HashSet but with insertion order maintained
```

### TreeSet

```java
// Maintains sorted order
Set<String> set = new TreeSet<>();
set.add("c");
set.add("a");
set.add("b");
// Iteration: a, b, c (sorted order)

// Navigable operations
set.first();           // "a"
set.last();            // "c"
set.lower("b");        // "a"
set.higher("b");       // "c"
set.subSet("a", "c");  // {a, b}
set.headSet("b");      // {a}
set.tailSet("b");      // {b, c}

// Custom sorting
Set<String> set = new TreeSet<>((a, b) -> b.compareTo(a));  // Reverse order

// Time Complexity: O(log n) for all operations
```

## Map Implementations

### HashMap

```java
Map<String, Integer> map = new HashMap<>();
map.put("apple", 5);
map.get("apple");           // 5
map.getOrDefault("banana", 0);  // 0
map.containsKey("apple");   // true
map.remove("apple");
map.size();

// Iteration
for (String key : map.keySet()) { }
for (Integer value : map.values()) { }
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    entry.getKey();
    entry.getValue();
}

// Functional operations
map.put("apple", 1);
map.putIfAbsent("banana", 2);
map.compute("apple", (k, v) -> v == null ? 1 : v + 1);
map.computeIfAbsent("cherry", k -> 3);
map.computeIfPresent("apple", (k, v) -> v + 10);

// Time Complexity
// Get/Put/Remove: O(1) average, O(n) worst
// Contains: O(1) average

// Internal Implementation
// - Uses array of buckets
// - Collision handling: separate chaining
// - Java 8+: TreeMap for buckets with > 8 elements
// - Load factor 0.75 (resizes when size > capacity * 0.75)
```

### ConcurrentHashMap

```java
// Thread-safe alternative to synchronized HashMap
Map<String, Integer> map = new ConcurrentHashMap<>();

// Segment-level locking (multiple threads can write to different buckets)
map.put("apple", 1);
map.putIfAbsent("banana", 2);

// Iteration is fail-safe
for (String key : map.keySet()) { }  // Won't throw ConcurrentModificationException

// Time Complexity: Same as HashMap, but thread-safe
```

### LinkedHashMap

```java
// Maintains insertion order
Map<String, Integer> map = new LinkedHashMap<>();
map.put("c", 3);
map.put("a", 1);
map.put("b", 2);
// Iteration: c, a, b

// Access order mode (LRU cache)
Map<String, Integer> lru = new LinkedHashMap<String, Integer>(16, 0.75f, true) {
    protected boolean removeEldestEntry(Map.Entry eldest) {
        return size() > 3;  // Keep only 3 entries
    }
};
```

### TreeMap

```java
// Maintains sorted order
Map<String, Integer> map = new TreeMap<>();
map.put("c", 3);
map.put("a", 1);
map.put("b", 2);
// Iteration: a → 1, b → 2, c → 3

// Navigable operations
map.firstKey();          // "a"
map.lastKey();           // "c"
map.floorKey("b");       // "b"
map.ceilingKey("b");     // "b"
map.lowerKey("b");       // "a"
map.higherKey("b");      // "c"
map.subMap("a", "c");    // [a, c)
map.headMap("b");        // < b
map.tailMap("b");        // >= b

// Custom comparator
Map<String, Integer> map = new TreeMap<>((a, b) -> b.compareTo(a));

// Time Complexity: O(log n) for all operations
```

## Set Operations

```java
Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3));
Set<Integer> set2 = new HashSet<>(Arrays.asList(2, 3, 4));

// Union
set1.addAll(set2);  // {1, 2, 3, 4}

// Intersection
set1.retainAll(set2);  // Keep only common {2, 3}

// Difference
set1.removeAll(set2);  // Remove common {1}

// Check subset
set1.containsAll(set2);  // Is set1 superset of set2
```

## Comparable vs Comparator

### Comparable

```java
// Implement in the class
class Student implements Comparable<Student> {
    String name;
    int age;
    
    public int compareTo(Student other) {
        return this.age - other.age;  // Natural order: by age
    }
}

// Use with Collections.sort()
List<Student> students = new ArrayList<>();
Collections.sort(students);  // Uses natural order
```

### Comparator

```java
// Separate class or lambda
Comparator<Student> byName = (a, b) -> a.name.compareTo(b.name);
Comparator<Student> byAge = (a, b) -> a.age - b.age;

List<Student> students = new ArrayList<>();
Collections.sort(students, byName);
Collections.sort(students, byAge);

// Chaining
Comparator<Student> complex = 
    Comparator.comparing(Student::getAge)
              .thenComparing(Student::getName)
              .reversed();
```

## Iteration Methods

```java
List<String> list = Arrays.asList("a", "b", "c");

// 1. For-each loop
for (String item : list) { }

// 2. Traditional for-loop
for (int i = 0; i < list.size(); i++) {
    String item = list.get(i);
}

// 3. Iterator
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String item = it.next();
    if (item.equals("b")) {
        it.remove();  // Safe removal
    }
}

// 4. Streams
list.stream().forEach(System.out::println);

// 5. ListIterator (for reversing)
ListIterator<String> it = list.listIterator(list.size());
while (it.hasPrevious()) {
    System.out.println(it.previous());
}

// Fail-fast iteration
for (String item : list) {
    if (item.equals("b")) {
        list.remove(item);  // ConcurrentModificationException
    }
}
```

## Streams API

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// Filtering and mapping
numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .forEach(System.out::println);  // 4, 8

// Collecting
List<Integer> evens = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());

// Reducing
int sum = numbers.stream()
    .reduce(0, (a, b) -> a + b);

// Terminal operations
numbers.stream().count();
numbers.stream().max(Comparator.naturalOrder());
numbers.stream().min(Comparator.naturalOrder());
numbers.stream().anyMatch(n -> n > 3);
numbers.stream().allMatch(n -> n > 0);

// Grouping
Map<Integer, List<Integer>> grouped = numbers.stream()
    .collect(Collectors.groupingBy(n -> n % 2));

// Parallel streams
numbers.parallelStream()
    .filter(n -> n % 2 == 0)
    .forEach(System.out::println);
```

## Common Interview Questions

1. **What's the difference between HashSet and TreeSet?**
   - HashSet: O(1) operations, unordered
   - TreeSet: O(log n) operations, maintains sorted order

2. **When would you use LinkedList over ArrayList?**
   - When you frequently insert/delete from ends: use LinkedList
   - When you need random access: use ArrayList

3. **How does HashMap handle collisions?**
   - Separate chaining with linked lists
   - Java 8+: Converts to TreeMap for O(log n) if chain > 8

4. **What's the difference between fail-fast and fail-safe iterators?**
   - Fail-fast: Throws exception on modification (ArrayList)
   - Fail-safe: Works with snapshot (ConcurrentHashMap, CopyOnWriteArrayList)

5. **Explain the load factor in HashMap**
   - Default 0.75, resizes when size > capacity * loadFactor
   - New capacity = old * 2

6. **How does ConcurrentHashMap provide better concurrency than synchronized HashMap?**
   - Uses segment-level locking instead of object-level
   - Multiple threads can write to different segments

7. **What is the time complexity of various operations?**
   - ArrayList.get(): O(1)
   - LinkedList.get(): O(n)
   - HashMap.get(): O(1) average
   - TreeMap.get(): O(log n)
