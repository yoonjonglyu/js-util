class ModuleLoader {
    constructor() {
        this._config = {
            baseUrl: '/',
            paths: {},
            module: {}
        };
        this.isLoaded = {};
    }
    async require(modules, cb) {
        const importModules = [];

        while (modules.length > 0) {
            const name = modules.shift();

            while (!this.isLoaded[name]) { // 각 모듈의 로딩까지 기다리기
                await new Promise((resolve) => setTimeout(resolve, 7));
            };

            // 로딩 된 모듈 삽입
            importModules.push(this._config.module[name]);
        };

        // 로딩된 모듈 가져와서 cb함수에 args로 넘기기
        await cb(...importModules);
    }
    define(name, module) {
        this._config.module[name] = module();
    }
    config(config) {
        const head = document.querySelector('head');
        this._config = {
            ...this._config,
            ...config
        };
        const modules = Object.keys(config.paths);
        modules.forEach((moduleName) => {
            const url = this._config["paths"][moduleName];
            if (!this.isLoaded[moduleName]) {
                const script = this.createScript(moduleName, url);

                this.onScriptLoad(script.node, () => {
                    script.node.parentNode.removeChild(script.node);
                    this.isLoaded[moduleName] = true;
                });

                head.appendChild(script.node);
            }
        });
    }
    onScriptLoad(node, cb) {
        return node.addEventListener('load', (e) => {
            cb();
            this.removeEvent(e.target, 'load', cb);
        });
    }
    removeEvent(node, event, func) {
        node.removeEventListener(event, func);
    }
    createScript(id, url) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.id = id;
        script.src = `${this._config.baseUrl}${url}`;

        return {
            id: id,
            node: script
        };
    }
}