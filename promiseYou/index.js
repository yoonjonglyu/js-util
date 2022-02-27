const loader = new ModuleLoader();
function Main() {
    const promise = new PromiseYou((resolve, reject) => {
        // setTimeout(resolve('testr'), 300);
        // setTimeout(reject('testj'), 200);
        throw 'ss';
    })
        .catch((a) => console.log(a, 55))
        .finally(() => console.log('final'));

    const promise1 = promise
        .then((a) => {
            console.log(a);
            throw 'sd';
            setTimeout(console.log('asd'), 100);
            return a + 1;
        }, (a) => console.log(a, 2))
        .catch((b) => console.log(b, "catch"))
        .then((a) => console.log(a))
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
    const a = new Promise((resolve, reject) => {
        // setTimeout(resolve('testr'), 300);
        reject('ss');
    })
        a.catch((a) => {
            console.log(a, 12);
            return a;
        })
        .then((a) => {
            console.log(a, 12);
            throw 'bb';
        })
        .catch((a) => console.log(a, 12))
        .finally(() => {
            throw 'error';
        })
        .catch((e) => console.log(e));
        console.log(a);
}

Main();