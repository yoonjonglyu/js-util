function Main() {
    const store = new Store();
    function App() {
        const root = document.createElement('main');
        root.appendChild(Index());
        root.appendChild(Sub());

        return root;
    }
    function Index() {
        const root = document.createElement('div');
        root.style.background = 'cyan';
        const renderIndex = () => {
            const [Test, setTest] = store.useState({ test: 'a' });
            const [Test2, setTest2] = store.useState({ test2: 'b' });
            root.innerText = `${Test} : ${Test2}`;
            console.log('인덱스가 렌더링 되었다.');
            root.onclick = () => {
                setTest('sss');
                setTest2(Math.random());
            };
        };
        store.watch(renderIndex);

        return root;
    }
    function Sub() {
        const root = document.createElement('div');
        store.watch(() => {
            const [Test2, setTest2] = store.useState('test2');
            const [Test3, setTest3] = store.useState({ test3: 'c' });
            root.innerText = `${Test3} : ${Test2}`;
            console.log('서브가 렌더링 되었다.');
            root.onclick = () => {
                setTest3('공유 되지 않는 상태 변화');
            };
        });

        return root;
    }

    render(document.querySelector('#app'), App());

    function render(root, components) {
        root.appendChild(components);
    }
}

Main();