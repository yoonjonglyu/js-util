class ModuleLoader {
    constructor() {
        this._config = {
            baseUrl: '/',
            paths: {},
            module: {}
        };
        this.isLoaded = false;
    }
    async require(modules, cb) {
        while (!this.isLoaded) {
            await new Promise((resolve) => setTimeout(resolve, 10));
        };
        cb(this._config.module[modules[modules.length - 1]]);
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
        modules.forEach((moduleName, idx) => {
            const url = this._config["paths"][moduleName];
            if (!this.isLoaded) {
                const script = this.createScript(moduleName, url);

                this.onScriptLoad(script.node, () => {
                    script.node.parentNode.removeChild(script.node);
                    if (idx === modules.length - 1) this.isLoaded = true;
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