# What are the main interfaces in the Java Collections Framework?

List – Ordered collection, allows duplicates. (ArrayList, LinkedList)

Set – Unordered, no duplicates. (HashSet, LinkedHashSet, TreeSet)

Map – Key-value pairs, keys are unique. (HashMap, TreeMap, LinkedHashMap)

Queue – FIFO structure. (PriorityQueue, LinkedList)

# Difference between Collection and Collections?

Collection is the root interface for lists, sets, and queues.

Collections is a utility class with static methods like sort(), reverse(), synchronizedList().

# Difference between ArrayList and LinkedList?

Feature ArrayList LinkedList
Data structure Dynamic array Doubly linked list
Access time Fast (O(1) for index) Slow (O(n))
Insert/delete Slow (shifting needed) Fast at head/tail
Memory usage Less More (due to node links)

# Difference between HashSet and TreeSet?

Feature HashSet TreeSet
Order No order Sorted (natural or custom)
Performance Faster (O(1)) Slower (O(log n))
Nulls Allows one null Allows one null if comparator supports it

# Difference between HashMap, TreeMap, and LinkedHashMap?

Feature HashMap TreeMap LinkedHashMap
Order No order Sorted by keys Insertion order
Null keys One null key No null keys One null key
Performance Fast (O(1)) Slower (O(log n)) Slower than HashMap

# What’s the difference between Comparable and Comparator?

Feature Comparable Comparator
Interface method compareTo(Object o) compare(Object o1, o2)
Location Implemented in the class itself Implemented in separate class
Used for Natural ordering Custom ordering

class Student implements Comparable<Student> {
int age;
public int compareTo(Student s) {
return this.age - s.age;
}
}

# How do you sort a list using Comparator?

Collections.sort(list, (a, b) -> a.name.compareTo(b.name));

# Ways to iterate over a collection?

-   For-each loop
-   Iterator
-   ListIterator (supports reverse)
-   Streams (forEach)
-   Traditional for-loop (index-based)

# What’s the benefit of streams?

They allow functional-style operations like filtering, mapping, and collecting, often making code shorter and more readable.

list.stream().filter(s -> s.startsWith("A")).forEach(System.out::println);
