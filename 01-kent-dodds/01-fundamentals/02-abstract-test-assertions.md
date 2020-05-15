```js
const { sum, subtract } = require("./math");

let result, expected;

result = sum(3, 7);
expected = 10;

if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}

result = subtract(7, 3);
expected = 4;

if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}
```

our test is working but our code is a little imperative, it would be nice to write a little abstraction to make it read a little nicer

lets go ahead and write a simple abstraction to encapsulate this assertion

going to write a function which returns an object with some assertions on it

```js
function expect(actual) = {
    return {
        toBe(expected){
            if (actual != expected){
                throw new Error('error)
            }
        }
    }
}
```

```js
const { sum, subtract } = require("../math");

let result, expected;

result = sum(3, 7);
expected = 10;
expect(result).toBe(expected);

result = subtract(7, 3);
expected = 4;
expect(result).toBe(expected);

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

this function is like an assertion library, it takes in an actual value and returns an object that has methods for different assertions that we can make on that actual value

we could also have a toEqual(), toBeGreaterThan()
