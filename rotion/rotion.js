class Rotion {
    constructor(root, styled) {
        this.root = root;
        this.styled = styled;
        this.pages = [];
        this.views = {};
        this.loadData();
        this.container = this.createContainer();
    }
    createContainer() {
        const container = this.styled.article`
            display: flex;
            flex-flow: column;
            flex: 1;
        `;
        container.id = "rotion-container";
        this.createArea(container);
        this.root.appendChild(container);

        return container;
    }
    createArea(container) {
        const pageList = this.styled.ul`
            margin: 0;
            padding: 12px;
            &:hover {
                border-bottom: 1px solid green;
            }
        `;
        this.renderPageList(pageList);
        container.appendChild(pageList);

        const contents = this.styled.div`
            height: 100%;
            background: tomato;
        `;
        container.appendChild(contents);
    }

    renderPageList(list) {
        this.pages.map((item) => {
            const page = this.styled.li`
                display: inline-block;
                margin-right: 12px;
                color: #8f8f8f;
                &:hover {
                    color: cyan;
                }
            `;
            page.innerText = item.title;
            list.appendChild(page);
        });
    }

    loadData() {
        const check = localStorage.getItem('rotions');
        if (check === null) this.initData();
        const { pages, views } = JSON.parse(localStorage.getItem('rotions'));
        this.pages = pages;
        this.views = views;
    }
    initData() {
        const initState = {
            pages: [
                {
                    idx: 1,
                    title: '기본페이지'
                },
                {
                    idx: 2,
                    title: 'page1'
                },
                {
                    idx: 3,
                    title: 'page2'
                }
            ],
            views: {}
        };
        localStorage.setItem('rotions', JSON.stringify(initState));
    }
}