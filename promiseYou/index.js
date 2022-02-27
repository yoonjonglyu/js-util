function Main() {
    const promise = new PromiseYou((resolve, reject) => {
        setTimeout(resolve('testr'), 300);
        setTimeout(reject('testj'), 200);
    })
    .finally(() => console.log('ss'));

    const promise1 = promise
        .then((a) => {
            console.log(a);
            return a + 1;
        }, (a) => console.log(a, 2))
        .catch((b) => console.log(b, "catch"))
        .finally(() => console.log('aa'));
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
        })
        .finally(() => console.log('bb'));

    const test = new Promise((resolve, reject) => {
        // setTimeout(resolve('testPro2'), 100);
        // setTimeout(reject('testPro'), 500);
    });
    const test1 = new Promise((resolve) => resolve('s'));
    
        console.log(test, test1, promise, promise1, promise2);
}

Main();