# Asynchronous programming in JavaScript

## 1. Callback

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

## 2. The downside of callbacks

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
  const result = init + 1; // Assuming this is an aync operation
  callback(result);
}

function doStep2Async(init, callback) {
  const result = init + 2; // Assuming this is an aync operation
  callback(result);
}

function doStep3Async(init, callback) {
  const result = init + 3; // Assuming this is an aync operation
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
