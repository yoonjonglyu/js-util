const loader = new ModuleLoader();

function Main() {
    loader.config({
        baseUrl: '../',
        paths: {
            'dom': 'styledInJs/domElements.js',
            'styledInJs': 'styledInJs/styledInJs.js',
            'infinityScroll': 'infinityScroll/infinityScroll.js'
        }
    });

    loader.require([
        'styledInJs'
    ], (styled) => {


        render(
            document.querySelector('#app'),
            Wrap()
        );

        function render(root, components) {
            root.appendChild(components);
        }
        function Wrap() {
            const wrap = styled.div`
                display: flex;
                flex: 1;
                width: 100%;
                height: 100vh;
                background: #f1f1f1;
            `;
            wrap.id = 'wrap';
            return wrap;
        }
    });
}

Main();