# Python OOP for Interviews

## Class Definition

```python
class Dog:
    # Class variable (shared by all instances)
    species = "Canis familiaris"
    
    def __init__(self, name, age):
        # Instance variables
        self.name = name
        self.age = age
    
    def bark(self):
        return f"{self.name} says: Woof!"

# Create instance
dog = Dog("Buddy", 3)
print(dog.name)  # "Buddy"
print(dog.bark())  # "Buddy says: Woof!"
```

## Inheritance

```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def make_sound(self):
        pass

class Dog(Animal):
    def make_sound(self):
        return "Woof!"

class Cat(Animal):
    def make_sound(self):
        return "Meow!"

# Usage
dog = Dog("Buddy")
cat = Cat("Whiskers")
print(dog.make_sound())  # "Woof!"
print(cat.make_sound())  # "Meow!"
```

## Multiple Inheritance

```python
class Flyable:
    def fly(self):
        return "Flying..."

class Walkable:
    def walk(self):
        return "Walking..."

class Bird(Flyable, Walkable):
    pass

bird = Bird()
print(bird.fly())   # "Flying..."
print(bird.walk())  # "Walking..."

# Method Resolution Order (MRO)
print(Bird.__mro__)  # Shows the order of inheritance
Bird.mro()          # Same information
```

## Polymorphism

```python
class Shape:
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        import math
        return math.pi * self.radius ** 2

# Polymorphic behavior
shapes = [Rectangle(4, 5), Circle(3)]
for shape in shapes:
    print(shape.area())
```

## Encapsulation

### Access Modifiers

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance      # Private (name mangling)
        self._internal = 0            # Protected (convention)
        self.public = 0               # Public
    
    def get_balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return True
        return False

account = BankAccount(100)
print(account.get_balance())  # 100
print(account.deposit(50))    # True
# account.__balance  # AttributeError (name mangling: _BankAccount__balance)
```

### Properties (Getters/Setters)

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

temp = Temperature(25)
print(temp.celsius)        # 25
print(temp.fahrenheit)     # 77.0
temp.celsius = 30          # Uses setter
# temp.celsius = -300      # ValueError
```

## Abstraction

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def start(self):
        pass
    
    @abstractmethod
    def stop(self):
        pass

class Car(Vehicle):
    def start(self):
        return "Car started"
    
    def stop(self):
        return "Car stopped"

# vehicle = Vehicle()  # TypeError: Cannot instantiate abstract class
car = Car()
print(car.start())  # "Car started"
```

## Magic Methods (Dunder Methods)

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __repr__(self):
        return f"Vector(x={self.x}, y={self.y})"
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __lt__(self, other):
        return (self.x**2 + self.y**2) < (other.x**2 + other.y**2)
    
    def __len__(self):
        import math
        return int(math.sqrt(self.x**2 + self.y**2))
    
    def __getitem__(self, index):
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        raise IndexError("Vector index out of range")
    
    def __iter__(self):
        yield self.x
        yield self.y

v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(v1)           # "Vector(3, 4)"
print(v1 + v2)      # Vector(4, 6)
print(v1 == v2)     # False
print(len(v1))      # 5
print(v1[0])        # 3
for val in v1:
    print(val)      # 3, then 4
```

## Class Methods and Static Methods

```python
class Counter:
    count = 0
    
    def __init__(self, name):
        self.name = name
        Counter.count += 1
    
    @classmethod
    def get_count(cls):
        return cls.count
    
    @classmethod
    def from_string(cls, name_str):
        # Factory method
        return cls(name_str.upper())
    
    @staticmethod
    def is_valid_name(name):
        return len(name) > 0

# Usage
c1 = Counter("Alice")
c2 = Counter("Bob")
print(Counter.get_count())  # 2
print(Counter.is_valid_name("John"))  # True

c3 = Counter.from_string("charlie")
print(c3.name)  # "CHARLIE"
```

## Inheritance and super()

```python
class Parent:
    def __init__(self, name):
        self.name = name
    
    def display(self):
        return f"Parent: {self.name}"

class Child(Parent):
    def __init__(self, name, age):
        super().__init__(name)  # Call parent constructor
        self.age = age
    
    def display(self):
        parent_info = super().display()  # Call parent method
        return f"{parent_info}, Age: {self.age}"

child = Child("John", 10)
print(child.display())  # "Parent: John, Age: 10"
```

## Composition vs Inheritance

```python
# Inheritance (is-a relationship)
class Animal:
    pass

class Dog(Animal):
    pass

# Composition (has-a relationship)
class Engine:
    def start(self):
        return "Engine started"

class Car:
    def __init__(self):
        self.engine = Engine()
    
    def start(self):
        return self.engine.start()

# Composition is often more flexible
car = Car()
print(car.start())  # "Engine started"
```

## Interview Questions

1. **What's the difference between class and instance variables?**
   - Class variables are shared across all instances
   - Instance variables are specific to each object

2. **Explain the concept of method overriding**
   - Child class provides its own implementation of a parent method

3. **What is a metaclass?**
   - A class whose instances are classes
   - Used to customize class creation

4. **Explain Python's Method Resolution Order (MRO)**
   - Order in which Python looks for a method in multiple inheritance
   - Follows C3 Linearization algorithm

5. **What's the difference between `__init__` and `__new__`?**
   - `__new__` creates the instance, `__init__` initializes it

6. **When would you use composition over inheritance?**
   - Composition is more flexible and avoids tight coupling
   - Better for "has-a" relationships

7. **What are decorators?**
   - Functions that modify other functions or classes
   - `@property`, `@classmethod`, `@staticmethod` are built-in decorators
