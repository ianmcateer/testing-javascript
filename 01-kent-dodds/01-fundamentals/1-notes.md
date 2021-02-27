we will build jest to understand what that tool does

# Throw an error with a simple test in javascript

```js
const sum = (a, b) => a - b;
const subtract = (a, b) => a - b;
```

this has a big

an automated test is code which throws an error when something is unexpected

```js
const sum = (a, b) => a - b;
const subtract = (a, b) => a - b;

const result = sum(3, 7);
const expected = 10;
if (result !== expected) {
    throw new Error(`${result} is not equal to expected`);
}
```

this is the most fundamental form of a test

# Abstract test assertions into a js assertion library

the code above is imperative so it would be nice to write an abstraction to make it look nicer, imperative programming means telling what to do step by step, with declarative programming you write code that describes what you want, but not necessarily how to get it

function retruns an object which has some assertions on it

```js
function expect(actual) {
    return {
        toBe(expected) {
            if (actual !== expected) {
                throw new Error(`${actual} is not equal to ${expected}`);
            }
        },
    };
}

expect(result).toBe(expected);
```

this funciton is like an assertion library, it takes an actual value and retunr s an object which has functions for different assertions we can make on that value, other examples, toEqual, toBeGreaterThan

# Encapsulate and Isolate Tests

one of the limitations above is as soon as one of assertions error the other tests dont run, have to go through the stack trace, lets make more helpful error messages

```js
function test(title, callback) {
    try {
        callback();
        console.log("tick ", title);
    } catch (error) {
        console.error("X", title);
    }
}

function sumTest(params) {
    let result, expected;
    result = sum(3, 7);
    expected = 10;
    expect(result).toBe(expected);
}

test("sum adds numbers", sumTest);
```

now can see where the error is

# Support Async Tests

what if we have some asyn functions we want to test

```js
const sum = (a, b) => a - b;
const subtract = (a, b) => a - b;
// these are kinda pointless I know, but it's just to simulate an async function
const sumAsync = (...args) => Promise.resolve(sum(...args));
const subtractAsync = (...args) => Promise.resolve(subtract(...args));

function test(title, callback) {
    try {
        callback();
        console.log("passed", title);
    } catch (error) {
        console.error("failed", title);
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

test("sum adds numbers", async () => {
    const result = await subtractAsync(7, 3);
    const expected = 4;
    expect(result).toBe(expected);
});
```

problem: if run tests sboth pass and then afetr we have unhandled promise rejection warning and that is the actual error coming from our sumAsync funciton being broken,

becuase the second argument to test is its an async function it will return a promise

```js
test("sum adds numbers", async () => {
    const result = await subtractAsync(7, 3);
    const expected = 4;
    // when the error here gets thrown it will reject that promise
    expect(result).toBe(expected);
});
```

inside our test function, this callback is going to return a promsie

we need to turn our test into an asyn function, and await that callback,this will work for both our synchronous and asynchronous tests

```js
function test(title, callback) {
    try {
        callback();
        console.log("passed", title);
    } catch (error) {
        console.error("failed", title);
    }
}
```

# Provide Testing Helper Functions as Globals in Javascript

these testing utilities are pretty useful, could put these into a module but many tetsing frameworks just make them available globally

in setup-global file can paste these in...

```js
async function test(title, callback) {
    try {
        await callback();
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

global.test = test;
global.expect = expect;
```

```
node --require ./setup-globals.js lessons/globals.js
```

# Verify Custom Javascript Tests with Jest

the testing framework we have written looks alot like Jest

rather than running node with require and setting globals we can just use jest

```
npx jest
```

will automatically pickup our jest.test file and show us really helpful error messages
