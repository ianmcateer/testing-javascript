function first() {
    console.log("first executed");
    return {
        second() {
            console.log("second executed");
        },
    };
}
first().second();
