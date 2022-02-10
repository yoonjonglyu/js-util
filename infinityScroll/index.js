const loader = new ModuleLoader();
function Main (){
        loader.config({
        baseUrl: '../',
        paths: {
            'dom': 'styledInJs/domElements.js',
            'styledInJs': 'styledInJs/styledInJs.js'
        }
    });
    const init = new InfinityScroll(document.querySelector('#app'));
}

Main();