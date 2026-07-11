# What is the difference between checked and unchecked exceptions?

Feature Checked Exception Unchecked Exception
Inheritance Extends Exception Extends RuntimeException
Compile-time check Required Not required
Must handle? Yes (try-catch or throws) No, optional
Examples IOException, SQLException NullPointerException, ArithmeticException

# Why are some exceptions checked and others unchecked?

Checked exceptions are meant to force the programmer to handle recoverable errors, like file not found. Unchecked exceptions indicate programming bugs, like null pointer access, that should be fixed rather than caught.

# What is the purpose of finally block in Java?

The finally block always executes, whether an exception occurs or not. It is used to release resources, like closing files, database connections, etc.

```java
try {
// risky code
} catch (Exception e) {
// handle exception
} finally {
// cleanup code
}
```

# Can a finally block override a return value?

Yes. If both the try and finally blocks have return statements, the return from finally overrides the one from try. But this is discouraged.

# Difference between throw and throws?

Feature throw throws
Purpose To actually throw an exception To declare an exception
Location Inside a method In method signature
Syntax throw new IOException(); public void read() throws IOException

# Can you throw multiple exceptions using throw?

No. throw is used to throw only one exception at a time.

# How do you create a custom exception in Java?

```java
public class MyCustomException extends Exception {
public MyCustomException(String message) {
super(message);
}
}

if (age < 18) {
throw new MyCustomException("Age must be 18+");
}
```

# Should custom exceptions extend Exception or RuntimeException?

Depends on the use case:

Extend Exception for checked custom exceptions (require handling).

Extend RuntimeException for unchecked ones (optional handling).

# What are some best practices in exception handling?

Catch only those exceptions you can handle meaningfully.

Avoid catching Exception or Throwable unless absolutely necessary.

Always clean up resources in finally or use try-with-resources.

Use custom exceptions for business logic clarity.

Log exceptions properly — don’t silently ignore them.

Don't use exceptions for flow control.

# What is try-with-resources?

Introduced in Java 7, it automatically closes resources (e.g. InputStream, BufferedReader).

try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
String line = br.readLine();
}
