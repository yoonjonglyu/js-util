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
                script.onload = () => {
                    cb();
                    loader.forEach((script) => head.removeChild(script));
                }
            }
            head.appendChild(script);
        });
    }
    getScript(id, url, cb) {
        const sciprt = document.createElement('script');
        sciprt.id = id;
        sciprt.src = url;

        return sciprt;
    }
}