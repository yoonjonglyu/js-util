function Main() {
    const store = new Store();
    const App = document.createElement('main');
    const Index = document.createElement('div');
    App.appendChild(Index);
    const [getTest, setTest] = store.useState({ test: 'a' });
    const [getTest2, setTest2] = store.useState({ test2: 'b' });
    const renderIndex = () => {
        Index.innerText = `${getTest()} : ${getTest2()}`;
        console.log(getTest(), getTest2());
    }
    store.watch(renderIndex);
    App.addEventListener('click', () => {
        setTest('sss');
        setTest2(Math.random());
    });
    
    render(document.querySelector('#app'), App);

    function render(root, components) {
        root.appendChild(components);
    }
}

Main();