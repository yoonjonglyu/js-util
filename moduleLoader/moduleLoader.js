class ModuleLoader {
    constructor() {
        this._config = {
            baseUrl: '/',
            paths: {},
            module: {}
        };
        this.isLoaded = {};
        this.load = {};
    }
    async require(modules, cb) {
        // 로딩된 모듈 가져와서 cb함수에 args로 넘기기
        const importModules = await this.waitModules(modules);
        await cb(...importModules);
    }
    async define(name, deps, module) { // 의존성 모듈이 없으면 deps가 module이 된다.
        const context = typeof deps === "function" ?
            deps :
            module;
        
        let importModules = [];
        if (typeof deps !== 'function') { // 의존성 모듈이 있을시 로드한다.
            importModules = await this.waitModules(deps);
        }

        // 모듈로드 완료
        this.isLoaded[name] = true;
        this._config.module[name] = context(...importModules);
    }
    config(config) {
        this._config = {
            ...this._config,
            ...config
        };
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
    async waitModules(modules) {
        const result = [];

        while (modules.length > 0) {
            const moduleName = modules.shift();
            if (!this.load[moduleName]) this.loadScript(moduleName);

            while (!this.isLoaded[moduleName]) { // 각 모듈의 로딩까지 기다리기
                await new Promise((resolve) => setTimeout(resolve, 7));
            };

            // 로딩 된 모듈 삽입
            result.push(this._config.module[moduleName]);
        };

        return result;
    }
    loadScript(moduleName) {
        const head = document.querySelector('head');
        const url = this._config["paths"][moduleName];

        if (!this.load[moduleName]) {
            const script = this.createScript(moduleName, url);

            this.onScriptLoad(script.node, () => {
                script.node.parentNode.removeChild(script.node);
            });

            this.load[moduleName] = true;
            head.appendChild(script.node);
        }
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