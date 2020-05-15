# Support Async Tests with JavaScripts Promises through async await

our testing framework works great for our asynchronous tests, what if we had some asynchronous functions that we wanted to test?

we could make our callback functions async, and then use the await keyword to wait for that to resolve

lets make our testing framework support promises so users can use async/await

```js
test("sumAsync adds numbers asynchronously", async () => {
  const result = await sumAsync(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});

test("subtractAsync subtracts numbers asynchronously", async () => {
  const result = await subtractAsync(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
});
```

This approach has a little bit of a problem though. If we run our test, we are going to see that they both pass,
and then after that, we have an UnhandledPromiseRejectionWarning. That is the actual error coming from our sumAsync function being broken.

because our second argument to test() is a async function, this callback function will return a promise.

when this error is thrown because one of our testing fails, its going to reject that promise.

here inside our test function this callback function is going to return a promise. if we turn this test into an async function, and then await that callback, if that promise is rejected then we will land in our catch block
