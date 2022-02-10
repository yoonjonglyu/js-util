const loader = new ModuleLoader();
function Main() {
    loader.config({
        baseUrl: '../',
        paths: {
            'dom': 'styledInJs/domElements.js',
            'styledInJs': 'styledInJs/styledInJs.js',
            'infinityScroll': 'infinityScroll/infinityScroll.js'
        }
    });
    loader.require([
        'styledInJs'
    ], (styled) => {
        styled.createGlobalStyle`
            button {
                border: none;
            }
            pre {
                background: tomato;
            }
        `;
        const div = styled.div`
            display: block;
            width: 100%;
            height: 100px;
            border-radius: 3px;
            padding: 0.5rem 0;
            margin: 0.5rem 1rem;
            background: red;
            &:active{
                background: tomato;
            }
        `;
        const button = styled.button`
            width: 300px;
            height: 100%;
            color: ${(props) => props.color || "gray"};
            background: cyan;
            &:hover{
                background: blue;
                color: #fff;
            }
        `;
        button.innerText = '동일한 모듈 1';
        div.appendChild(button);
        document.querySelector('#app').appendChild(div);
    });
    loader.require([
        'styledInJs'
    ], (styled) => {
        styled.createGlobalStyle`
            button {
                border: none;
            }
            pre {
                background: tomato;
            }
        `;
        const div = styled.div`
            display: block;
            width: 100%;
            height: 100px;
            border-radius: 3px;
            padding: 0.5rem 0;
            margin: 0.5rem 1rem;
            background: red;
            &:active{
                background: tomato;
            }
        `;
        const button = styled.button`
            width: 300px;
            height: 100%;
            color: ${(props) => props.color || "gray"};
            background: cyan;
            &:hover{
                background: blue;
                color: #fff;
            }
        `;
        button.innerText = '동일한 모듈 2';
        div.appendChild(button);
        document.querySelector('#app').appendChild(div);
    });
    loader.require([
        'infinityScroll'
    ], (infinityScroll) => {
        const init = new infinityScroll(document.querySelector('#app'));
    });

}

Main();