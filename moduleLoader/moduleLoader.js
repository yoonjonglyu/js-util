class ModuleLoader {
    constructor(config) {
        this.config = config;
    }
    require(modules, cb) {
        const head = document.querySelector('head');

        const loader = modules.map((name, idx) => {
            const url = this.config["paths"][name];
            const id = `${name}-${idx}`;

            return this.getScript(id, url);
        });

        loader.forEach((script, idx) => {
            if (idx === modules.length - 1) {
                this.onScriptLoad(script.node, () => {
                    cb();
                    loader.forEach((script) => script.node.parentNode.removeChild(script.node));
                });
            }
            head.appendChild(script.node);
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
    getScript(id, url) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.id = id;
        script.src = url;

        return {
            id: id,
            node: script
        };
    }
}