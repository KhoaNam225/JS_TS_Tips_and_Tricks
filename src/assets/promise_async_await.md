# Promise Async/Await in JavaScript

This document explains the theory behind asynchronous operations in general and how it works in JavaScript.

## I. Synchronous vs Asynchronous Execution?

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

In the example above, `bar()` has to wait for foo() to finish before it can run. In other words, it is blocked by foo(). This could be very problematic in some situations like performing a long-running task while keeping the UI responsive to the user. To demonstrate this, refer to this example from Mozilla Web Doc: **[The trouble with long-running synchronous functions](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing#the_trouble_with_long-running_synchronous_functions)** section**.**

In order to efficiently handle long-running tasks while not blocking other tasks, we can leverage asynchronous programming. When code is running asynchronously, different tasks can be executed at the same time (NOTE: “At the same time” is not equivalent to parallel in this context). This will prevent code being blocked by those long-running tasks and make the application more responsive. Some examples of this is:

- Sending a request to a server.
- Reading a file from disk.
- Accessing devices like camera, webcam, etc.

To handle the above tasks, we usually call functions that do the job and have them return immediately. That way our application is not blocked and will remain responsive to the user. When those functions completes, they will notify us with the result (response from server, the file content, etc). An important characteristic of asynchronous functions is that we usually don’t know exactly when they will finish, we just know that they will EVENTUALLY finish.

## II. Asynchronous programming in JavaScript

### 1. Callback

Traditionally, JavaScript supports asynchronous programming mainly via callbacks.

Callbacks are just simply functions that are passed to other functions as argument. Usually, when providing a callback to a function, we want to perform some operations based on its status of execution (i.e. the callback is the way that we can ‘react’ to certain events that could happen in the main function). A classic example of this is event handlers:

```typescript
/* Assuming our HTML has a button element like this
	<button id="button">Click me!</button>
*/

const button = document.getElementById("button");

// Here, we are 'reacting' to a click event
button.addEventListener("click", () => console.log("Button clicked!"));
```

Here, we provide a callback to the `addEventListener` function, this callback will be triggered every time the user clicks on the button. This is how we ‘react’ to the event since we don’t really know exactly when the user will click the button.

Another popular use case of callback is sending a XHR request using `XMLHttpRequest`object:

```typescript
let logContent = "";

const xhr = new XMLHttpRequest();

// Adding a callback to log the response status when we receive it
xhr.addEventListener("loadend", () => {
  logContent = `${logContent}Finished with status: ${xhr.status}`; // This will only get logged when the response comes
  console.log(logContent);
});

// Start sending the request
xhr.open("GET", "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json");
xhr.send();

// This will get logged first
logContent = `${logContent}Started XHR request\n`;
console.log(logContent);

/** Final results

Started XHR request
Finished with status 200

*/
```

Again, in this example, we use a callback to ‘react’ to the response because we don’t know when it would come.

### 2. The downside of callbacks

From the examples above, it can be easily seen that reading and understanding code that has a lot of callbacks is not easy since the order of execution does not follow the same order that we write code (i.e. from top to bottom). Moreover, abusing callbacks can make our code degrade and become messy really quickly. Let’s consider a simple example to understand why that’s the case:

```typescript
function doStep1(init) {
  return init + 1;
}

function doStep2(init) {
  return init + 2;
}

function doStep3(init) {
  return init + 3;
}

function doOperation() {
  let result = 0;
  result = doStep1(result);
  result = doStep2(result);
  result = doStep3(result);
  console.log(`result: ${result}`);
}

doOperation();
```

In this example, we have a main operation (`doOperation()`) that is split into 3 smaller operations (`doStep1/2/3()`). An important thing to note here is that each operation depends on the previous one (i.e. `doStep1()` needs to finish before `doStep2()` can run and so on). Since these are all synchronous functions, we can just call them one by one in order to get the final result.

However, what if those smaller steps perform asynchronous operations? Of course the above code wouldn’t give expected output because `doSteps1` might not finish before we start `doStep2`. Using callbacks would solve the problem:

```typescript
function doStep1Async(init, callback) {
  const result = init + 1; // Asumming this is an aync operation
  callback(result);
}

function doStep2Async(init, callback) {
  const result = init + 2; // Asumming this is an aync operation
  callback(result);
}

function doStep3Async(init, callback) {
  const result = init + 3; // Asumming this is an aync operation
  callback(result);
}

function doOperationAsync() {
  doStep1Async(0, (result1) => {
    doStep2Async(result1, (result2) => {
      doStep3Async(result2, (result3) => {
        console.log(`result: ${result3}`);
      });
    });
  });
}

doOperationAsync();
```

The above piece of code does the exact same thing as the previous example and gives the same result. Nonetheless, it is significantly harder to read and understand as there are many nested code blocks. Note that we only have 3 steps in this case and haven’t even considered handling errors for each step, things would be a lot worse when we have many more steps, with proper errors handling.

As we have more nested callbacks, our code gradually ‘shifts’ to the right since we need some proper indentation. Eventually, this would form a pyramid-like structure, this is called “the pyramid of doom” or “the callback hell”.

To resolve this problem, Promise has come into place.

## III. Promise

Promise was introduced in JavaScript ES6 (2015) as a new way to write clean async JavaScript code. Before diving into the technical aspect of Promise, let’s consider a real world example to understand how Promise works in general.

### 1. What is Promise?

Oliver and Nam are staffs in an ice-cream shop. Nam’s main responsibility is preparing ice-cream in the back kitchen while Oliver managing the cones and taking orders from customers. When an order is placed, the following steps are performed to serve that order:

1. Prepare a cone
2. Prepare ice-cream
3. Put ice-cream on the cone
4. Serve to customer

![ice-cream-shop.png](Promise%20Async%20Await%20in%20JavaScript%20dc78927e1f5445f6b24bef8cfb3995bc/ice-cream-shop.png)

However, since preparing ice-cream is Nam’s responsibility and it would taking some time to prepare some, Oliver doesn’t know when there would be ice-cream ready to be put on the cone. He cannot take an empty cone to the back kitchen and wait there until Nam finishes preparing ice-cream because it might take forever (Nam is pretty slow sometimes) and the counter cannot be left unoccupied.

To solve this problem, Oliver decides to take an empty cone to the back kitchen and tells Nam to fill it whenever the ice-cream is ready, and bring it over to him when done. Nam promises Oliver that he would do that and if something wrong happens, he will also notify Oliver as well.

Oliver can now ensure that the counter won’t be left unoccupied for a long time and ice-cream will be served to customers right after it’s ready.

Promise in JavaScript works in a similar way. It performs some asynchronous tasks that we don’t know the exact moment when those tasks complete. With Promise, we give it some callbacks and it will run those callbacks whenever it finishes the asynchronous tasks.

The next section will discuss the Promise object more in-depth.

### 2. The Promise object

To create a Promise, we use the following syntax:

```typescript
let promise = new Promise(function (resolve, reject) {
  // Making ice-cream...
});
```

The constructor of Promise class accepts a function - called the executor. When a Promise is created, the executor that was passed to it will run immediately. The responsibility of the executor is to run the asynchronous task to produce the desired result or throw an error in case something wrong happen.

Also, as can be seen from the example, each executor accepts 2 parameters: `resolve` and `reject`. These are 2 built-in functions provided by JavaScript. When the executor finishes the async task and has some results ready, we can call `resolve(result)` to emit that result, in some other cases when an error occurs, we call `reject(error)` to throw an error instead.

An example of a successfully resolved Promise:

```typescript
const promise = new Promise(function (resolve, reject) {
  console.log("Making ice-cream for you ^^");
  setTimeout(() => resolve("Your ice-cream is ready"), 5000); // Return the string after 5 seconds
});

promise.then((result) => console.log(result));
```

Another example with a Promise throwing an error:

```typescript
const promise = new Promise(function (resolve, reject) {
  console.log("Making ice-cream for you ^^");
  setTimeout(() => reject(new Error("Oops! Something wrong happened :(")), 5000); // throw an error after 5 seconds
});

promise.then((result) => console.log(result));
```

To summarise: the executor runs automatically and attempts to perform a job when we create a Promise object. When it is finished with the attempt, it calls

`resolve(result)`- if it was successful or

`reject(error)`- if there was an error.

A Promise object has 2 internal properties to indicate its states.

`state`: Indicates the current state of the Promise (either `“pending”, “fulfilled”, “rejected”`)

`result`: Contains the result of the async task that needs to be returned.

![promise-resolve-reject.svg](Promise%20Async%20Await%20in%20JavaScript%20dc78927e1f5445f6b24bef8cfb3995bc/promise-resolve-reject.svg)

(Source: [https://javascript.info/article/promise-basics/promise-resolve-reject.svg](https://javascript.info/article/promise-basics/promise-resolve-reject.svg))

From the diagram above, we can easily see that calling `resolve()` will bring a Promise’s state to `fulfilled` and `reject()` will bring its state to `rejected`. When a Promise is either fulfilled or rejected, it is settled.

### 3. `.then()`, `.catch()` and `.finally()`

When initialising a Promise object, we give it a function that perform the async task to produce some results - the executor. Once the result is ready, we need a way to use that result, in other words, we need to consume it.

This can be done by using `.then()`, `.catch()` and `.finally()` methods of the Promise object.

### a. `.then()`

This method is the most important and popular method that is used from the Promise class.

The syntax of `.then()` is like follow:

```typescript
const promise = new Promise(function (resove, reject) {
  // Produce something...
  resolve("Done");
});

promise.then(
  function (result) {
    // Handle the result when the promise is successully resolved
  },
  function (error) {
    // Handle the error in case the promise is rejected
  }
);
```

The .then() method receives 2 callbacks as is parameters:

- The first callback is called when the promise object is resolved to handle the result.
- The second callback is called when the promise object is rejected and throws an error.

Both callbacks passed to .then() consume the result of the Promise object, no matter if it is resolved or rejected. We call these callbacks the consumers.

An example with the ice-cream shop:

```typescript
const promise = new Promise(function (resolve, reject) {
  console.log("Making ice-cream for you ^^");
  setTimeout(() => resolve("Your ice-cream is ready"), 5000); // Return the string after 5 seconds
});

// Successfully resolved
promise.then(
  (result) => console.log(result),
  (error) => console.error(error.message)
);
```

Rejected promise:

```typescript
const promise = new Promise(function (resolve, reject) {
  console.log("Making ice-cream for you ^^");
  setTimeout(() => reject(new Error("Oops! Something wrong happened :(")), 5000); // throw an error after 5 seconds
});

// Rejected
promise.then(
  (result) => console.log(result),
  (error) => console.error(error.message)
);
```

### b. `.catch()`

If we only care about handling the error of a Promise, we can use `.then()` but passing null to the first parameter, like this:

```typescript
const promise = new Promise(function (resolve, reject) {
  console.log("Making ice-cream for you ^^");
  setTimeout(() => reject(new Error("Oops! Something wrong happened :(")), 5000); // throw an error after 5 seconds
});

// Rejected
promise.then(null, (error) => console.error(error.message));
```

However, this piece of code can cause some confusion when someone reads it (why is there a null there???).

To handle this situation, we can use the `.catch()` method. This method will take a callback as its parameter, this callback will only be executed if the Promise object is rejected. Therefore, when reading a `.catch()` block, we know straight away that the function inside it is used to handle errors, like so:

```typescript
const promise = new Promise(function (resolve, reject) {
  console.log("Making ice-cream for you ^^");
  setTimeout(() => reject(new Error("Oops! Something wrong happened :(")), 5000); // throw an error after 5 seconds
});

// Rejected
promise.then((result) => console.log(result)).catch((error) => console.error(error.message));
```

From the example above, we can also see that using `.catch()` combined with `.then()` gives much cleaner and readable code. Therefore, in practice, we usually use `.then()` to only handle successful results and `.catch()` to handle errors. Also, consider these 2 examples:

```typescript
const promise = new Promise(...);

promise.then(f1, f2);
```

And:

```typescript
const promise = new Promise(...);

promise.then(f1).catch(f2);
```

In the first example, `f2` is used to handle errors thrown from the executor (the callback passed to construct the Promise object) but it won’t handle errors that happen in the `f1` function.

On the other hand, in the second example, `f2` can handle both errors in the executor and `f1` function, which makes it even more powerful.

### c. `.finally()`

From the previous section, we can see some similarities between the `.catch()` method of Promise class with the `catch () { //... }` in a `try { } catch {  }` block.

The same thing happens for .finally(), this method is used to perform some clean-up tasks after a Promise has settled (be it resolved or rejected). Some examples for clean-up tasks are: stopping the loading indicator, clearing the cache, closing unnecessary connections, etc.

For example:

```typescript
const promise = new Promise(function (resolve, reject) {
  console.log("Making ice-cream for you ^^");
  setTimeout(() => reject(new Error("Oops! Something wrong happened :(")), 5000); // throw an error after 5 seconds
});

// Rejected
promise
  .then((result) => console.log(result))
  .catch((error) => console.error(error.message))
  .finally(
    () => console.log("Promise settled!") // This is run no matter what happened.
  );
```

The callback passed to promise doesn’t take any arguments because we don’t know if the Promise object is resolved or rejected. We only want to clean up everything.

### d. Promise chaining

The examples for Promise so far only have one `.then()` method call. What if our task consists of many steps, each step must be performed one after another in order (just like the example task in the callback section above, which has 3 smaller steps)?

One possible solution for this problem is:

```typescript
function doAsync(value) {
	const promise = new Promise(function(resolve, reject) {
		setTimeout(() => resolve(value * 2), 1000);
	});
}

doAsync(1).then(result1 => {
	doAsync(result1).then(result2 => {
		doAsync(result2).then(result3 => {
			console.log("Result after 3 steps: " + result3);  // Print 8 to the console
		}
	}
}
```

However, you can easily see that we still have that same problem of using callback. Our code still grows to the right, and the pyramid of doom still exists. So, what’s better about Promise then? It doesn’t seem to solve our original problem.

This is where promise chaining comes into play. With promise chaining, we can write the above code like this instead:

```typescript
function doAsync(value) {
	const promise = new Promise(function(resolve, reject) {
		setTimeout(() => resolve(value * 2), 1000);
	});
}

doAsync(1)
.then(result1 => return doAsync(result1))
.then(result2 => return doAsync(result2)) // This won't execute until doAsync(result1) resolves
.then(result3 => return doAsync(result3)); // This won't execute until doAsync(result2) resolves
```

In the above example, in each callback passed to `.then()`, we call doAsync() once and return a Promise object that will resolve after 1 second. One good thing with using .then() is that, the callback passed to the later then() method calls will wait until the Promise returned by the previous call resolved to execute. Therefore, we can assure that each step is performed at the right moment, in the right order.

And, the code is much clearer and stays “flat”. It grows down instead of growing right, and there is no callback hell here.

So, as a final example to conclude this section, let’s see how the problem with ice-cream shop can be solved using Promise:

```typescript
const takeOrder = (customerName, iceCreamType) => {
  return new Promise((resolve, reject) => {
    console.log(`Customer ${customerName} has ordered a ${iceCreamType} ice-cream.`);
    console.log("Your ice-cream is being prepared...");

    setTimeout(() => resolve({ customerName, iceCreamType }), 2000);
  });
};

takeOrder("Bruno", "Chocolate")
  .then((result) => {
    const { iceCreamType } = result;
    console.log(`A ${iceCreamType} is ready, putting on a cone...`);

    return new Promise((resolve, reject) => setTimeout(() => resolve(result), 2000));
  })
  .then((result) => {
    const { customerName, iceCreamType } = result;
    console.log(`A ${iceCreamType} ice-cream for ${customerName} is ready. Enjoy!! :)`);
  })
  .catch((error) => {
    console.error("Oops! We had some problems preparing your ice-cream, please make another order.");
  });
```

### IV. Async/Await

As already demonstrated, using Promise along with `.then(), .catch(), .finally()` already reduces a lot of complexity when implementing asynchronous operations. However, to further improve the readability of asynchronous code, a new syntax has been introduced in Javascript in 2017, which uses 2 keywords: `async` and `await`.

### 1. Async

The `async` keyword is placed before a function signature. When placing before a function declaration, this means only one thing: The function after `async` will always return a Promise. For example, let’s consider a function that returns a random number in a Promise, without async keyword, we can write that function like this:

```typescript
function generateRandomNumber() {
  const result = Math.random();
  // This function will return a promise that immediately returns a random number
  return new Promise((resolve, reject) => resolve(result));
}

generateRandomNumber().then((result) => console.log(`Random number: ${result}`));
```

However, with the `async` keyword, we can make this function a bit cleaner like so:

```typescript
// This function behaves the same way as the above function
async function generateRandomNumber() {
  const result = Math.random();

  return result;
}

generateRandomNumber().then((result) => console.log(`Random number: ${result}`));
```

When placing `async` in front of the function, the result of that function will automatically be wrapped inside a Promise object. We can use the Promise object returned in the same way introduced in previous sections.

### 2. Await

While the `async` keyword makes the code to create a Promise object easier to read, the `await` keyword does the same thing but for the code that consumes the Promise.

Take the example of the random number generator above, without using the `await` keyword, we can consume the generated number like so:

```typescript
function generateRandomNumber() {
  const result = Math.random();
  // This function will return a promise that immediately returns a random number
  return new Promise((resolve, reject) => resolve(result));
}

function consumeRandomNumber() {
  generateRandomNumber()
    .then((result) => result * 2)
    .then((result) => result * 3)
    // ... Add more .then() here if we want to do more things
    .then((result) => console.log(result))
    .catch((error) => console.error(error.message));
}

consumeRandomNumber();
```

With the `await` keyword, things are a bit simpler:

```typescript
async function generateRandomNumber() {
  const result = Math.random();

  return result;
}

async function consumeRandomNumber() {
  try {
    let result = await generateRandomNumber();
    result = result * 2;
    result = result * 3;
    // ... More steps here but without .then()

    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

consumeRandomNumber();
```

As can be easily seen, the `await` keyword helps reducing the amount of `.then()` calls and the amount of callbacks we have to use, thus makes the code look a lot more like synchronous code.

### V. The Call Stack, Callback Queue, Event Loop

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

![async_js.png](Promise%20Async%20Await%20in%20JavaScript%20dc78927e1f5445f6b24bef8cfb3995bc/async_js.png)

This image demonstrates different parts of the browser to help it run our JavaScript code, including:

- **The JavaScript runtime engine** (part that is marked with the JS icon): This is where our JS code is executed, which includes the Heap and the Call Stack. The Call Stack is just a normal stack that will store items in LIFO order. Function calls will be pushed on popped out of this stack for execution. Note that the runtime engine will only run tasks that are pushed to this stack and not any where else. In other words, if you want your function to be executed, it must be pushed to this stack.
- **The WebAPIs:** This part contains some built-in functions that we usually use in our JS code (e.g. `setTimeout`, `fetch`, DOM manipulation methods, etc). Note that these functions are not part of JS runtime engine and is provided by the browser itself. When calling these methods in our JS code, we are just basically using the APIs that the browser provides.
- **The Callback Queue:** When using the asynchronous methods from the WebAPI such as setTimeout and fetch; or consuming a result of a Promise, we usually have to pass some callbacks to them to handle the result. These callbacks will be pushed to the Callback Queue (or the MicroTask Queue). This is just a normal queue that stores items in FIFO order. The special thing about this queue is that it will just store callbacks to asynchronous operations.
- **The Event Loop:** As the name suggests, this is a “simple” loop that runs infinitely in the browser. The main responsibility of this loop is to check if there are any tasks on the JS runtime engine call stack, if not, it will pop one callback from the callback queue and push it to the call stack.

After knowing about the event loop, we can see that: an async callback will only be executed if there is nothing on the call stack. This explains why our callback of the Promise in the previous example does not run before the `console.log()` at the end of the code block. That is because it still needs to wait in the Callback Queue to be pushed on to the Call Stack.

For more visual explanation, please visit this website:

[http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
