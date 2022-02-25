function Main () {
    const promise = new PromiseYou((resolve, reject) => {
        
        setTimeout(resolve('asd'), 200);
        setTimeout(reject('b'), 100);
    }).then((a) => console.log(a)).catch((b) => console.log(b));

    console.log(promise);
    console.log(new Promise((resolve, reject) => {}));
}

Main();