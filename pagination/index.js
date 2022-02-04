function Main() {
    const items = Array.from({ length: 949 }, (_, idx) => idx);
    const init = new Pagination(items, document.querySelector('#app'));
}

Main();