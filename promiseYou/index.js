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
        const container = styled.div`
            display: block;
            width: 100%;
            height: 99vh;
            border-radius: 3px;
            padding: 0;
            margin: 0;
            text-align: center;
            &:hover{
                background: tomato;
            }
        `;
        const messageBox = styled.div`
            display: block;
            width: 100%;
            height: 300px;
            border-radius: 3px;
            padding: 0;
            margin: 0;
            text-align: center;
            background: #fff;
        `;
        const button = styled.button`
            width: 300px;
            height: 100px;
            margin: 80px;
            color: ${(props) => props.color || "blue"};
            background: cyan;
            border: none;
            &:hover{
                background: blue;
                color: #fff;
            }
        `;

        button.innerText = 'promise 시작';
        button.addEventListener('click', promiseEvent);

        container.appendChild(button);
        container.appendChild(messageBox);
        document.querySelector('#app').appendChild(container);
        
        function promiseEvent() {
            button.removeEventListener('click', promiseEvent);
            messageBox.innerText = '';
            console.log('프로미스 스타트');
            const message = styled.p`
            width: 100%;
            height: 40px;
            background: purple;
            `;
            message.innerText = '프로미스 스타트';
            messageBox.appendChild(message);

            new PromiseYou((resolve, reject) => {
                setTimeout(() => resolve('첫번째 resolve'), 2000);
            })
                .then((res) => {
                    console.log(res);

                    const message = styled.p`
                    width: 100%;
                    height: 40px;
                    background: red;
                    `;
                    message.innerText = res;
                    messageBox.appendChild(message);
                    return "첫번째 then";
                })
                .then((res) => {
                    console.log(res);

                    const message = styled.p`
                    width: 100%;
                    height: 40px;
                    background: purple;
                    `;
                    message.innerText = res;
                    messageBox.appendChild(message);

                    throw "첫번째 에러";
                })
                .catch((res) => {
                    console.log(res);
                    const message = styled.p`
                    width: 100%;
                    height: 40px;
                    background: yellow;
                    `;
                    message.innerText = res;
                    messageBox.appendChild(message);
                })
                .then((a) => console.log('last', a))
                .finally(() => {
                    console.log('end');
                    const message = styled.p`
                    width: 100%;
                    height: 40px;
                    background: tomato;
                    `;
                    message.innerText = 'finally';
                    messageBox.appendChild(message);
                    button.addEventListener('click', promiseEvent);
                })
            const message2 = styled.p`
                width: 100%;
                height: 40px;
                background: blue;
                `;
            message2.innerText = '프로미스 다음 라인';
            messageBox.appendChild(message2);
        }
    });

}

Main();