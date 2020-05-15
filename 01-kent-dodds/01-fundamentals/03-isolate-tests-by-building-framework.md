# Encapsulate and Isolate Tests by building a JavaScript Testing Framework

One of the limitaitons of our previous tests is that as soon as one of these assertions experiences an error
the other tests are not run . can help if developer can see the results of all of the tests

looking at stack trace not apparent where the error is happening

a testing framework is to help identify whats broken as quickly as possible

by making more helpful error messages

```js
function test(title, callback) {
  try {
    callback();
  } catch (error) {
    console.error(error);
  }
}
```

because it could throw an error going to wrap it in a try catch
if the callback throws an error then i will log the error

```js
function test(title, callback) {
  try {
    callback();
    console.log(`✓ ${title}`);
  } catch (error) {
    console.error(`✕ ${title}`);
    console.error(error);
  }
}
```

then make a function called sumTest, we'll more this code into sumTest

```js
function sumTest() {
  result = sum(3, 7);
  expected = 10;
  expect(result).toBe(expected);
}
```

```js
const { sum, subtract } = require("../math");

test("sum adds numbers", () => {
  const result = sum(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});

test("subtract subtracts numbers", () => {
  const result = subtract(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
});

function test(title, callback) {
  try {
    callback();
    console.log(`✓ ${title}`);
  } catch (error) {
    console.error(`✕ ${title}`);
    console.error(error);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
  };
}
```
