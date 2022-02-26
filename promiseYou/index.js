function Main() {
    const promise = new PromiseYou((resolve, reject) => {
        reject('test');
    });
    const promise1 = promise
        .then((a) => {
            console.log(a);
            return a + 1;
        })
        .catch((b) => console.log(b, "catch"));
    const promise2 = promise
        .then((a) => {
            console.log(a);
            return a + 1;
        }, (a) => {
            console.log(a, 'then catch');
            return a + 2;
        })
        .catch((b) => console.log(b))
        .then((a) => {
            console.log(a);
        });

    const test = new Promise((resolve, reject) => setTimeout(reject('test'), 500))
        .then((a) => console.log(a, 1), (a) => console.log(a, 2))
        .catch((a) => a)
        .then((a) => console.log(a, 3));
}

Main();