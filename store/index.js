function Main() {
    const store = new Store();
    const App = document.createElement('main');
    const Index = document.createElement('div');
    App.appendChild(Index);
    const renderIndex = () => {
        const [Test, setTest] = store.useState({ test: 'a' });
        const [Test2, setTest2] = store.useState({ test2: 'b' });
        Index.innerText = `${Test} : ${Test2}`;
        console.log('렌더링 되었다.');
        Index.onclick = () => {
            setTest('sss');
            setTest2(Math.random());
        };
    }
    store.watch(renderIndex);
    const [Test3, setTest3] = store.useState('test2');
    setTest3('외부에서 호출시 watch 이후에 useState를 호출해야한다.');
    console.log(store);


    render(document.querySelector('#app'), App);

    function render(root, components) {
        root.appendChild(components);
    }
}

Main();