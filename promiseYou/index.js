function Main() {
    const promise = new PromiseYou((resolve, reject) => {
        resolve('test');
    })
        .then((a) => {
            console.log(a);
            return a + 1;
        })
        .catch((b) => console.log(b))
        .then((a) => console.log(a))
        .catch((b) => console.log(b));
    console.log(promise);
    const test = new Promise((resolve, reject) => { resolve('test') }).then((a) => {
        console.log(a);
        return a;
    });
    console.log(test);
}

Main();