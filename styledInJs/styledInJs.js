class StyledInJs {
    constructor() {
        domElements.forEach((tag) => {
            this[tag] = (styleSheets, ...args) => {
                const random = (Math.random() * 1000).toString().replace('.', '');
                const id = `${tag}-${random}`;
                const Components = (props) => {
                    const cb = args.map((el) => el(props));
                    const styles = styleSheets.map((el, idx) => cb[idx] ? el + cb[idx] : el).join('').split('&');

                    const css = styles.reduce((result, current, idx) => { // 선택자 처리
                        if (idx === 0) {
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
                // 컴포넌트 방식이 아니면 불편하기만 하므로 props 기능은 제공하지 않는다..
                return Components({});
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