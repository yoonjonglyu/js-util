class StyledInJs {
    constructor() {
        domElements.forEach((tag) => {
            this[tag] = (args) => {
                const random = (Math.random() * 1000).toString().replace('.', '');
                const id = `${tag}-${random}`;
                const css = `.${id} {${args.join('')}}`;
                this.addStyle(id, css);

                const tagElement = document.createElement(tag);
                tagElement.className = id;

                return tagElement;
            }
        });
    }
    addStyle(id, css) {
        const checkOver = document.querySelector(`#${id}`);

        if (checkOver === null) {
            const style = document.createElement('style');
            style.id = id;
            style.innerHTML = css;
            document.querySelector('head').appendChild(style);
        }
    }
}