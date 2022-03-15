const loader = new ModuleLoader();
function Main() {
    loader.config({
        baseUrl: '../',
        paths: {
            'dom': 'styledInJs/domElements.js',
            'styledInJs': 'styledInJs/styledInJs.js',
        }
    });
    loader.require([
        'styledInJs'
    ], (styled) => {
        const tetris = new Tetris(document.querySelector('#app'), styled);
    });
}

Main();