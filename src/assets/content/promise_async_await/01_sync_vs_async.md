# Synchronous vs Asynchronous Execution?

Let’s consider this example:

```typescript
function foo() {
  console.log("foo");
}

function bar() {
  console.log("bar");
}

bar(); // bar
foo(); // foo
```

In the example above, since `bar()` is called before `foo()`, it will be executed first and foo() will have to wait until it finishes to be able to run. If `bar()` is still running, `foo()` cannot be run. When a block of code has to wait for another block to finish before it can be executed, we say the code is running **synchronously**.

The above style of executing code is very intuitive and easy to understand. However, this could bring us some problems if we are synchronously running some functions that take a long time to run. Consider this example:

```typescript
function foo() {
  // Do some crazy stuffs that take 10 seconds to finish
}

function bar() {
  console.log("bar");
}

foo(); // Go get a coffee! This will take some time to run
bar(); // Oops! bar() cannot run because it is blocked by foo()
```

In the example above, `bar()` has to wait for foo() to finish before it can run. In other words, it is blocked by foo(). This could be very problematic in some situations like performing a long-running task while keeping the UI responsive to the user. To demonstrate this, refer to this example from Mozilla Web Doc: **[The trouble with long-running synchronous functions](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing#the_trouble_with_long-running_synchronous_functions)** section.

In order to efficiently handle long-running tasks while not blocking other tasks, we can leverage asynchronous programming. When code is running asynchronously, different tasks can be executed at the same time (NOTE: “At the same time” is not equivalent to parallel in this context). This will prevent code being blocked by those long-running tasks and make the application more responsive. Some examples of this is:

- Sending a request to a server.
- Reading a file from disk.
- Accessing devices like camera, webcam, etc.

To handle the above tasks, we usually call functions that do the job and have them return immediately. That way our application is not blocked and will remain responsive to the user. When those functions completes, they will notify us with the result (response from server, the file content, etc). An important characteristic of asynchronous functions is that we usually don’t know exactly when they will finish, we just know that they will EVENTUALLY finish.
