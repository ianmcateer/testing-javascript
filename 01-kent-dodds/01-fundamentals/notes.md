## Intro

going to build miniature version of Jest, so you get an understanding of what the tool does and how it works at a fundamental level

the way this porject is structured is we have this lessons directory that has a file for each one of the lessons and then a math module that we will be testing throughout the course of this module

its important for people to understand how their abstracitons work, so they can use them effectively

## Throw an Error in a Simple test

a test is code that throws an error when the actual result of something does not match the expected output

tests can get more complicated when you're dealing with code that depends on some state to be set up first (like a browser needs to be rendered to the document before you can fire browser events, or there needs to be users in the database)

however, it is relatively easy to test pure functions- functions which will always return the same output for a given input and not change the state of the world around them)

```js
const sum = (a, b) => a - b;
const subtract = (a, b) => a - b;
```

we have a bug in the sum function. its doing subtraction instead of addition. we could easily fix this but lets go ahead and write an automated test that can make sure that this bug never surfaces again.

an automated test is code that throws an error when things are unexpected

```js
const sum = (a, b) => a - b;
const subtract = (a, b) => a - b;

const result = sum(3, 7);
const expected = 10;
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}
```

we will get our error. if we replace it with correct + sign our script passes without running errors

this is the most fundamental form of a test in javascript, its simply code that will throw an error when the result is not what we expect

## Abstract Test Assertions into a Javascript Assertion Library
