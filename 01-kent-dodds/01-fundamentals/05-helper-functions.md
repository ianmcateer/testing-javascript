# Provide Testing Helper Functions as Globals in JavaScript

These testing utilities that we built are pretty useful. We want to be able to use them throughout our application in every single one of our test files.

Some testing frameworks provide their helpers as global variables. Let’s implement this functionality to make it easier to use our testing framework and assertion library. We can do this by exposing our test and expect functions on the global object available throughout the application.

We could put these into a module that we would require an import into every single one of our test files, but many testing frameworks embrace the fact that you're going to be using these in every single one of your test files, and so they just make them available globally.

I am going to cut this out of our testing file. I am going to go to setup-global.js file, and I will paste it into here, and then I will say global.test = test, and global.expect = expect.

make a setup-globa.js file

```js
async function test(title, callback) {
  try {
    await callback()
    console.log(`✓ ${title}`)
  } catch (error) {
    console.error(`✕ ${title}`)
    console.error(error)
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`)
      }
    }
  }
}

global.test = test
global.expect = expect
```

```
node --require ./setup-globals.js lessons/globals.js
```

we get the same result as we did before

the testing framework we have written looks alit like jest 

we could just use tets instead of using our globals

```
npm jest
```

It will show us really helpful error messages, and even a code frame to show us exactly where in our code that error was thrown.

These are some of the things that make jest such an awesome testing framework because the error messages are so clear.