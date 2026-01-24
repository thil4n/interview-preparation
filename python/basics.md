# Python Basics for Interviews

## Data Types

### Immutable Types
- `int`: Integer numbers (unlimited precision)
- `float`: Floating-point numbers
- `str`: Strings (immutable sequences)
- `tuple`: Immutable collections
- `frozenset`: Immutable set
- `bool`: True or False

### Mutable Types
- `list`: Ordered, mutable collections
- `dict`: Key-value pairs
- `set`: Unordered, unique elements

## List vs Tuple vs Dict vs Set

| Feature | List | Tuple | Dict | Set |
|---------|------|-------|------|-----|
| Ordered | Yes | Yes | Keys ordered (3.7+) | No |
| Mutable | Yes | No | Yes | Yes |
| Hashable | No | Yes (if contents are) | Keys only | No |
| Syntax | `[]` | `()` | `{}` | `{}` or `set()` |
| Use Case | Collections | Immutable records | Mapping | Unique items |

```python
# List - mutable, ordered
my_list = [1, 2, 3]
my_list[0] = 10

# Tuple - immutable, ordered
my_tuple = (1, 2, 3)
# my_tuple[0] = 10  # TypeError

# Dictionary - mutable, key-value
my_dict = {"name": "John", "age": 30}

# Set - mutable, unique, unordered
my_set = {1, 2, 3, 3}  # {1, 2, 3}
```

## Python String Methods

```python
# Important methods
s = "Hello World"
s.lower()           # "hello world"
s.upper()           # "HELLO WORLD"
s.replace("World", "Python")  # "Hello Python"
s.split(" ")        # ["Hello", "World"]
s.strip()           # Remove leading/trailing whitespace
s.find("World")     # 6 (index)
s.startswith("Hello")  # True
"".join(["a", "b", "c"])  # "abc"

# Check if character in string
"a" in "abc"        # True
```

## Python String Formatting

```python
# Old style
"Hello %s, you are %d years old" % ("John", 30)

# Format method
"Hello {}, you are {} years old".format("John", 30)
"Hello {name}, you are {age} years old".format(name="John", age=30)

# F-strings (Python 3.6+)
name = "John"
age = 30
f"Hello {name}, you are {age} years old"

# With formatting
f"Price: ${100.456:.2f}"  # "Price: $100.46"
```

## List Comprehensions

```python
# Basic
[x for x in range(10)]  # [0, 1, 2, ..., 9]

# With condition
[x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]

# Transformation
[x*2 for x in range(5)]  # [0, 2, 4, 6, 8]

# Nested
[(x, y) for x in range(3) for y in range(3)]

# Dictionary comprehension
{x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Set comprehension
{x%3 for x in range(10)}  # {0, 1, 2}
```

## Lambda Functions

```python
# Lambda syntax: lambda arguments: expression
square = lambda x: x ** 2
square(5)  # 25

# With map
numbers = [1, 2, 3, 4]
doubled = list(map(lambda x: x*2, numbers))  # [2, 4, 6, 8]

# With filter
evens = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4]

# With sorted
points = [(1, 2), (3, 1), (5, 1)]
sorted(points, key=lambda p: p[1])  # [(3, 1), (5, 1), (1, 2)]
```

## Common Functions

```python
# map, filter, reduce
from functools import reduce

numbers = [1, 2, 3, 4, 5]
sum_all = reduce(lambda a, b: a + b, numbers)  # 15

# zip
list(zip([1, 2, 3], ["a", "b", "c"]))
# [(1, 'a'), (2, 'b'), (3, 'c')]

# enumerate
for i, value in enumerate(["a", "b", "c"]):
    print(i, value)  # 0 a, 1 b, 2 c

# range
range(5)        # 0 to 4
range(2, 5)     # 2 to 4
range(0, 10, 2) # 0, 2, 4, 6, 8

# sorted vs sort
sorted([3, 1, 2])  # Returns new list
my_list = [3, 1, 2]
my_list.sort()     # Sorts in-place
```

## Dictionaries

```python
d = {"a": 1, "b": 2}

# Access
d["a"]           # 1
d.get("c")       # None (safe access)
d.get("c", 0)    # 0 (default value)

# Update
d.update({"c": 3})
d["d"] = 4

# Iteration
for key in d:
    print(key, d[key])

for key, value in d.items():
    print(key, value)

# Methods
d.keys()      # All keys
d.values()    # All values
d.items()     # All key-value pairs
d.pop("a")    # Remove and return value
```

## Sets

```python
s = {1, 2, 3}

# Add/Remove
s.add(4)
s.remove(1)    # KeyError if not found
s.discard(1)   # No error if not found

# Set operations
a = {1, 2, 3}
b = {2, 3, 4}

a.union(b)          # {1, 2, 3, 4}
a.intersection(b)   # {2, 3}
a.difference(b)     # {1}
a.symmetric_difference(b)  # {1, 4}

a | b  # Union
a & b  # Intersection
a - b  # Difference
```

## Exception Handling

```python
try:
    # Code that might raise an exception
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
except (ValueError, TypeError):
    print("Value or Type error")
except Exception as e:
    print(f"Error: {e}")
else:
    # Executed if no exception
    print("Success")
finally:
    # Always executed
    print("Cleanup")

# Raise exceptions
raise ValueError("Invalid value")
```

## Common Interview Questions

1. **What's the difference between `==` and `is`?**
   - `==` compares values, `is` compares object identity

2. **Explain mutable vs immutable types**
   - Immutable: int, str, tuple (cannot be changed after creation)
   - Mutable: list, dict, set (can be modified)

3. **What is a lambda function?**
   - Anonymous function using `lambda` keyword, used for small operations

4. **Explain list comprehension**
   - Concise way to create lists using a single expression

5. **What does the `*args` and `**kwargs` mean?**
   - `*args`: Variable number of positional arguments
   - `**kwargs`: Variable number of keyword arguments

6. **What is GIL (Global Interpreter Lock)?**
   - Prevents multiple threads from executing Python bytecode simultaneously
   - Limits multithreading benefits in CPU-bound tasks

7. **Difference between deep copy and shallow copy**
   - Shallow copy: References to nested objects are copied
   - Deep copy: Nested objects are recursively copied
