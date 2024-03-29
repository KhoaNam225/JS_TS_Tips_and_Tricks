# Promise

Promise was introduced in JavaScript ES6 (2015) as a new way to write clean async JavaScript code. Before diving into the technical aspect of Promise, let’s consider a real world example to understand how Promise works in general.

## 1. What is Promise?

Oliver and Nam are staffs in an ice-cream shop. Nam’s main responsibility is preparing ice-cream in the back kitchen while Oliver managing the cones and taking orders from customers. When an order is placed, the following steps are performed to serve that order:

1. Prepare a cone
2. Prepare ice-cream
3. Put ice-cream on the cone
4. Serve to customer

![ice-cream-shop.png](assets/content/promise_async_await/ice-cream-shop.png)

However, since preparing ice-cream is Nam’s responsibility and it would taking some time to prepare some, Oliver doesn’t know when there would be ice-cream ready to be put on the cone. He cannot take an empty cone to the back kitchen and wait there until Nam finishes preparing ice-cream because it might take forever (Nam is pretty slow sometimes) and the counter cannot be left unoccupied.

To solve this problem, Oliver decides to take an empty cone to the back kitchen and tells Nam to fill it whenever the ice-cream is ready, and bring it over to him when done. Nam promises Oliver that he would do that and if something wrong happens, he will also notify Oliver as well.

Oliver can now ensure that the counter won’t be left unoccupied for a long time and ice-cream will be served to customers right after it’s ready.

Promise in JavaScript works in a similar way. It performs some asynchronous tasks that we don’t know the exact moment when those tasks complete. With Promise, we give it some callbacks and it will run those callbacks whenever it finishes the asynchronous tasks.

The next section will discuss the Promise object more in-depth.

## 2. The Promise object

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

![promise-resolve-reject.svg](assets/content/promise_async_await/promise-resolve-reject.svg)

(Source: [https://javascript.info/article/promise-basics/promise-resolve-reject.svg](https://javascript.info/article/promise-basics/promise-resolve-reject.svg))

From the diagram above, we can easily see that calling `resolve()` will bring a Promise’s state to `fulfilled` and `reject()` will bring its state to `rejected`. When a Promise is either fulfilled or rejected, it is settled.

## 3. `.then()`, `.catch()` and `.finally()`

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

From the previous section, we can see some similarities between the `.catch()` method of Promise class with the `catch () { //... }` in a `try { } catch { }` block.

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
  const promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(value * 2), 1000);
  });

  return promise;
}

doAsync(1).then((result1) => {
  doAsync(result1).then((result2) => {
    doAsync(result2).then((result3) => {
      console.log("Result after 3 steps: " + result3); // Print 8 to the console
    });
  });
});
```

However, you can easily see that we still have that same problem of using callback. Our code still grows to the right, and the pyramid of doom still exists. So, what’s better about Promise then? It doesn’t seem to solve our original problem.

This is where promise chaining comes into play. With promise chaining, we can write the above code like this instead:

```typescript
function doAsync(value) {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(value * 2), 1000);
  });

  return promise;
}

doAsync(1)
  .then((result1) => doAsync(result1))
  .then((result2) => doAsync(result2)) // This won't execute until doAsync(result1) resolves
  .then((result) => console.log("Result after 3 steps: " + result));
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
