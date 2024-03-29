# The Call Stack, Callback Queue, Event Loop

Let’s consider the following piece of code, which contains a Promise that immediately resolves after it is created. Can you guess what the output would be?

```typescript
const promise = new Promise((resolve, reject) => {
  resolve("Promised resolved"); // Resolve immediately
});

promise.then((message) => console.log(message));
console.log("Code ended");
```

The result of the above code would be:

```typescript
Code ended
Promised resolved
```

That is pretty confusing right? Even though our promise resolves immediately, the consumer that we pass to it still runs after the ‘Code ended’ `console.log()`. Why is that happening?

The reason for this “strange” behaviour lies in the way JavaScript executes async tasks. In order to understand how it works, we need to know about different parts of the browser including: the JavaScript runtime engine (for example V8 in Chrome, SpiderMonkey in Firefox), the callback queue, the event loop and the WebAPIs.

Let’s look at the following image:

![async_js.png](assets/content/promise_async_await/async_js.png)

This image demonstrates different parts of the browser to help it run our JavaScript code, including:

- **The JavaScript runtime engine** (part that is marked with the JS icon): This is where our JS code is executed, which includes the Heap and the Call Stack. The Call Stack is just a normal stack that will store items in LIFO order. Function calls will be pushed on popped out of this stack for execution. Note that the runtime engine will only run tasks that are pushed to this stack and not any where else. In other words, if you want your function to be executed, it must be pushed to this stack.
- **The WebAPIs:** This part contains some built-in functions that we usually use in our JS code (e.g. `setTimeout`, `fetch`, DOM manipulation methods, etc). Note that these functions are not part of JS runtime engine and is provided by the browser itself. When calling these methods in our JS code, we are just basically using the APIs that the browser provides.
- **The Callback Queue:** When using the asynchronous methods from the WebAPI such as setTimeout and fetch; or consuming a result of a Promise, we usually have to pass some callbacks to them to handle the result. These callbacks will be pushed to the Callback Queue (or the MicroTask Queue). This is just a normal queue that stores items in FIFO order. The special thing about this queue is that it will just store callbacks to asynchronous operations.
- **The Event Loop:** As the name suggests, this is a “simple” loop that runs infinitely in the browser. The main responsibility of this loop is to check if there are any tasks on the JS runtime engine call stack, if not, it will pop one callback from the callback queue and push it to the call stack.

After knowing about the event loop, we can see that: an async callback will only be executed if there is nothing on the call stack. This explains why our callback of the Promise in the previous example does not run before the `console.log()` at the end of the code block. That is because it still needs to wait in the Callback Queue to be pushed on to the Call Stack.

For more visual explanation, please visit this website:

[http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
