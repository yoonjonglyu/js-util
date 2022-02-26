function Main() {
    const promise = new PromiseYou((resolve, reject) => {
        reject('test');
    });
    console.log(promise.catch((a) => a));
    const promise1 = promise
        .then((a) => {
            console.log(a);
            return a + 1;
        })
        .catch((b) => console.log(b));
    const promise3 = promise
        .then((a) => {
            console.log(a);
            return a + 1;
        })
        .catch((b) => console.log(b))
        .then((a) => {
            console.log(a);
        });
    const test = new Promise((resolve, reject) => setTimeout(resolve('test'), 500));
}

Main();