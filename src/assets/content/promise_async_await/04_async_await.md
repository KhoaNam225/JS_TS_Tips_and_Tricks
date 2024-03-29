# Async/Await

As already demonstrated, using Promise along with `.then(), .catch(), .finally()` already reduces a lot of complexity when implementing asynchronous operations. However, to further improve the readability of asynchronous code, a new syntax has been introduced in Javascript in 2017, which uses 2 keywords: `async` and `await`.

## 1. Async

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

## 2. Await

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
