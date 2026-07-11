# What is the difference between String, StringBuilder, and StringBuffer?

Feature
String
StringBuilder
StringBuffer
Mutability
Immutable
Mutable
Mutable
Thread-safe
No
No
Yes
Performance
Slow (for changes)
Fast
Slower than StringBuilder
Use case
Constant strings
Single-threaded string manipulation
Multi-threaded environments

# Why is String immutable in Java?

• For security (used in class loading, file paths, network connections)
• For performance (string literals are interned)
• For thread safety (shared across threads safely)
• Because hashCode is cached, it improves the performance of HashMap

# What happens when you modify a String?

A new String object is created. Original string remains unchanged.
String s = "hello";
s = s + " world"; // New object created

# How does immutability help with string pooling?

Since strings are immutable, multiple references can safely point to the same object in the string pool without worrying about changes.

# What are some commonly used String methods?

• length()
• charAt(index)
• substring(start, end)
• indexOf(), lastIndexOf()
• equals(), equalsIgnoreCase()
• contains(), startsWith(), endsWith()
• replace(), replaceAll()
• split(delimiter)
• toLowerCase(), toUpperCase()
• trim()

# What is the difference between == and .equals() with strings?

• == checks reference equality (memory address)
• .equals() checks actual content of the string

# What is string interning?

Interning is a method of storing only one copy of each distinct string literal in a pool. When a string is interned using intern(), it is added to the string pool.

# What is the use of intern() method?

It returns a canonical representation of the string from the string pool. Useful in memory optimization.

String a = new String("hello");
String b = a.intern();
String c = "hello";
System.out.println(b == c); // true

# How are regular expressions used in Java?

Using the Pattern and Matcher classes from java.util.regex.

Pattern pattern = Pattern.compile("\\d+");
Matcher matcher = pattern.matcher("123abc");
System.out.println(matcher.find()); // true

# What are some common regex patterns?

• . – any character
• \\d – digit
• \\D – non-digit
• \\w – word character
• \\s – whitespace
• \* – zero or more
• + – one or more
• ? – zero or one
• [abc] – a, b, or c
• ^, $ – beginning or end of line

# Difference between replace() and replaceAll() in String?

• replace() works with characters or strings (literal values)
• replaceAll() works with regular expressions

"abc123".replace("123", ""); // "abc"
"abc123".replaceAll("\\d+", ""); // "abc"
