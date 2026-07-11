# What is the difference between a class and an object?

 • A class is a blueprint or template.
 • An object is an instance of a class.


# Can we have a class without any object in Java?
 Yes. A class can have only static methods/fields and still be used (like Math class).



# What is Encapsulation in Java?

Encapsulation is the process of wrapping data (variables) and methods together into a single unit (class) and restricting direct access to some of the object’s components.


# What is Inheritance?

Inheritance allows a class to acquire the properties and behavior (methods) of another class.
Syntax: class Child extends Parent


# Explain Polymorphism.

Polymorphism allows one interface to be used for different underlying data types.
 • Compile-time polymorphism: Method Overloading
 • Run-time polymorphism: Method Overriding


# What is Abstraction?

Abstraction hides internal implementation details and shows only the necessary features.
Implemented using abstract classes and interfaces.


# What is a constructor?

A constructor is a special method that is called when an object is created. It has the same name as the class and no return type.


# What are the types of constructors?

 • Default constructor (no arguments)
 • Parameterized constructor (with arguments)
 • Copy constructor (not provided by default in Java; created manually)



# What is this keyword used for?

 • Refers to the current instance of the class
 • Used to differentiate between local and instance variables


# What is super keyword used for?

 • Refers to the parent class instance
 • Used to access parent class methods, variables, and constructors


# What is the difference between static and non-static members?

 • Static: Belongs to the class, shared across all objects. Can be accessed without creating an object.
 • Non-static: Belongs to the object. Each object has its own copy.


# Can a static method access non-static data?
 No. Static methods cannot access non-static variables/methods directly because non-static members belong to objects, and static methods do not have access to instance context.