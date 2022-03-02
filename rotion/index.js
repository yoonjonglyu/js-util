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
        console.log(styled);
    });
}

Main();