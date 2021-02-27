# Mocking

some popel find this confusing

taking jest mock funcitonality and comparing it to how we would implemnent it in user land in node, good insight into how it works

idea is: youve got this module that is doing something and want to test it but this module is using another module that is doing something, maybe its sending request to a credit card company
you dont want to actually make this call

we willl mock out this module

# Override Object Properties to Mock with Monkey-Patching in Javascript

we have a thumbwar module

see inside the code folder

this module is calling a util file, that util module, we want to mock out the getWinner function

look at no-framework.monkey-patching

```js
const assert = require("assert");
const thumbWar = require("../thumb-war");

const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
assert.strictEqual(winner, "Kent C. Dodds");
```

if we run the test... get mixed results sometimes passing sometimes failing

we can mock out getWinner which is being used by this module

```js
const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

const originalGetWinner = utils.getWinner;
utils.getWinner = (p1, p2) => p1;

const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
assert.strictEqual(winner, "Kent C. Dodds");

// important to cleanup after yourself
utils.getWinner = originalGetWinner;
```

now our monkey-patching means we have mocked out the getWinner function, which returns p1 each time

# Ensure Functions Are Called Correctly with Js Mocks

using mock-fn.js now inside src/**tests**

would be nice to make more assertions about how getWinner is being called because we can actually break the implementation but our tests couldnt catch that

example, inside thumb-war.js

```js
const winner = utils.getWinner(player1);
if (winner === player1) {
    player1Wins++;
} else if (winner === player2) {
    player2Wins++;
}
```

our tests will still pass but the implentaiton will fail, going to reveal this bug in our test
jest has built in function called jest.fn which is short for function and you can provide it an implenmtation, it keeps track of what arguments it is called with

```js
const thumbWar = require("../thumb-war");
const utils = require("../utils");

test("returns winner", () => {
    const originalGetWinner = utils.getWinner;
    utils.getWinner = jest.fn((p1, p2) => p1);

    const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
    expect(winner).toBe("Kent C. Dodds");
    console.log(utils.getWinner);
    expect(utils.getWinner.mock.calls).toEqual([
        ["Kent C. Dodds", "Ken Wheeler"],
        ["Kent C. Dodds", "Ken Wheeler"],
    ]);
    // could also do these assertions:
    expect(utils.getWinner).toHaveBeenCalledTimes(2);
    expect(utils.getWinner).toHaveBeenNthCalledWith(
        1,
        "Kent C. Dodds",
        "Ken Wheeler"
    );
    expect(utils.getWinner).toHaveBeenNthCalledWith(
        2,
        "Kent C. Dodds",
        "Ken Wheeler"
    );

    // cleanup
    utils.getWinner = originalGetWinner;
});
```

if we also do

```js
console.log(utils.getWinner);
```

we can see its a function that has a whole bunch of properties on it, it has a mock property, its an object with calls proeprties which holds array of the arguments this function is called with
