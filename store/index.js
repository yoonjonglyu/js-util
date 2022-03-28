function Main() {
    const store = new Store();
    const App = document.createElement('main');
    const Index = document.createElement('div');
    App.appendChild(Index);
    const [getTest, setTest] = store.useState({ test: 'a' });
    const [getTest2, setTest2] = store.useState({ test2: 'b' });
    const renderIndex = () => {
        const foo = getTest();
        const foo2 = getTest2();
        Index.innerText = `${foo} : ${foo2}`;
        console.log(foo, foo2);
    }
    setTest('ss');
    store.watch(renderIndex);

    render(document.querySelector('#app'), App);

    function render(root, components) {
        root.appendChild(components);
    }
}

Main();