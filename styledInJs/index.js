function Main() {
    const styled = new StyledInJs();
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
    `;
    const button = styled.button`
        width: 300px;
        height: 100%;
        background: cyan;
    `;
    button.innerText = '스타일드';
    div.appendChild(button);

    document.querySelector('#app').appendChild(div);
}

Main();