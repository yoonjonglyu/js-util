class StyledInJs {
    constructor(domElements) {
        this.cssom = [];
        this.domElements = domElements;
        this.provideElements();
    }
    provideElements() {
        this.domElements.forEach((tag) => {
            this[tag] = (styleSheets, ...args) => {
                const Components = (props) => {
                    const random = (Math.random() * 1000).toString().replace('.', '');
                    const id = `${tag}-${random}`;
                    const cb = args.map((el) => typeof el === 'function' ? el(props) : el);
                    const styles = styleSheets
                        .map((el, idx) => cb[idx] ? el + cb[idx] : el)
                        .join('').
                        split('&');

                    const findCss = this.checkOverCss(id, styles);
                    if (!findCss) {
                        // 선택자 처리
                        const css = styles.reduce((result, current, idx) =>
                            idx === 0 ?
                                result += `.${id} {${current}}\n` :
                                result += `.${id}${current}\n`
                            , '');
                        this.addStyle(id, css);
                    }

                    const tagElement = document.createElement(tag);
                    tagElement.className = findCss ?
                        findCss.id :
                        id;

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
        
        if (!this.checkOverCss(id, args)) {
            this.addStyle(id, css);
        }

    }
    checkOverCss(id, styles) { // 아이디를 통해서 식별하는게 더 효율적이긴하다.
        const checkOver = this.cssom.find((css) => css.style === styles.join(''));

        if (!checkOver) {
            this.cssom.push({
                id: id,
                style: styles.join('')
            });
        }

        return checkOver;
    }
    addStyle(id, css) {
        const style = document.createElement('style');
        style.id = id;
        style.innerHTML = css;

        document.querySelector('head').appendChild(style);
    }
}

loader.define("styledInJs", ["dom"], function (domElements2) {
    return new StyledInJs(domElements2);
});