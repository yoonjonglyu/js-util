function Main() {
    const store = new Store();
    const App = document.createElement('main');
    const Index = document.createElement('div');
    App.appendChild(Index);
    const renderIndex = () => {
        const [getTest, setTest] = store.useState({ test: 'a' });
        const [getTest2, setTest2] = store.useState({ test2: 'b' });
        Index.innerText = `${getTest} : ${getTest2}`;
        console.log('렌더링 되었다.');
        Index.onclick = () => {
            setTest('sss');
            setTest2(Math.random());
        };
        const [getTest3, setTest3] = store.useState('test3');
        console.log(getTest3, setTest3);
    }

    store.watch(renderIndex);


    render(document.querySelector('#app'), App);

    function render(root, components) {
        root.appendChild(components);
    }
}

Main();