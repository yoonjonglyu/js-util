function Main() {
    const store = new Store();
    const [foo, bar] = store.useState({ test: 'a' });
    const [foo2, bar2] = store.useState({ test2: 'b' });
    console.log(foo, foo2, store);
    bar('ss');
    console.log(foo, foo2);
}

Main();