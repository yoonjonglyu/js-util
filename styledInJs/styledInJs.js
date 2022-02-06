class StyledInJs {
    constructor() {
        domElements.forEach((tag) => {
            this[tag] = (args) => {
                const random = (Math.random() * 1000).toString().replace('.', '');
                const id = `${tag}-${random}`;

                const styles = args.join('').split('&');
                const css = styles.reduce((result, current, idx) => { // 선택자 처리
                    if(idx === 0){
                        result += `.${id} {${current}}\n`;
                    } else {
                        result += `.${id}${current}\n`;
                    }

                    return result;
                }, '');
                this.addStyle(id, css);

                const tagElement = document.createElement(tag);
                tagElement.className = id;

                return tagElement;
            }
        });
    }
    createGlobalStyle(args) {
        const random = (Math.random() * 1000).toString().replace('.', '');
        const id = `global-${random}`;
        const css = `${args.join('')}`;

        this.addStyle(id, css);
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